package com.app.webnongsan.controller;

import com.app.webnongsan.domain.User;
import com.app.webnongsan.domain.request.EmailRequestDTO;
import com.app.webnongsan.domain.request.LoginDTO;
import com.app.webnongsan.domain.request.ResetPasswordDTO;
import com.app.webnongsan.domain.response.user.CreateUserDTO;
import com.app.webnongsan.domain.response.user.ResLoginDTO;
import com.app.webnongsan.service.AuthService;
import com.app.webnongsan.service.EmailService;
import com.app.webnongsan.service.FileService;
import com.app.webnongsan.service.UserService;
import com.app.webnongsan.util.SecurityUtil;
import com.app.webnongsan.util.annotation.ApiMessage;
import com.app.webnongsan.util.exception.ResourceInvalidException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("api/v2")
public class AuthController {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityUtil securityUtil;
    private final UserService userService;
    private final EmailService emailService;
    private final FileService fileService;
    private final AuthService authService;
    @Value("${jwt.refreshtoken-validity-in-seconds}")
    private long refreshTokenExpiration;

    public AuthController(AuthenticationManagerBuilder authenticationManagerBuilder, SecurityUtil securityUtil, UserService userService, EmailService emailService, AuthService authService,FileService fileService) {
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityUtil = securityUtil;
        this.userService = userService;
        this.emailService = emailService;
        this.authService = authService;
        this.fileService = fileService;
    }

    @PostMapping("auth/login")
    @ApiMessage("Login")
    public ResponseEntity<ResLoginDTO> login(@RequestBody LoginDTO loginDTO) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        ResLoginDTO res = new ResLoginDTO();

        User currentUserDB = this.userService.getUserByUsername(loginDTO.getEmail());
        if (currentUserDB != null) {
            ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(currentUserDB.getId(), currentUserDB.getEmail(), currentUserDB.getName(), currentUserDB.getRole());
            res.setUser(userLogin);
        }

        String accessToken = this.securityUtil.createAccessToken(authentication.getName(), res);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        res.setAccessToken(accessToken);
        String refresh_token = this.securityUtil.createRefreshToken(loginDTO.getEmail(), res);
        this.userService.updateUserToken(refresh_token, loginDTO.getEmail());
        ResponseCookie responseCookie = ResponseCookie.from("refresh_token", refresh_token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(refreshTokenExpiration)
                .sameSite("Lax")
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(res);
    }

    @GetMapping("auth/account")
    @ApiMessage("Get user")
    public ResponseEntity<ResLoginDTO.UserGetAccount> getAccount() {
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        // Lấy thông tin người dùng trong db
        User currentUserDB = this.userService.getUserByUsername(email);
        ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin();
        ResLoginDTO.UserGetAccount userGetAccount = new ResLoginDTO.UserGetAccount();

        if (currentUserDB != null) {
            userLogin.setId(currentUserDB.getId());
            userLogin.setEmail(currentUserDB.getEmail());
            userLogin.setName(currentUserDB.getName());
            userLogin.setRole(currentUserDB.getRole());
            userGetAccount.setUser(userLogin);
        }
        return ResponseEntity.ok(userGetAccount);
    }

    @GetMapping("auth/refresh")
    @ApiMessage("Get new token")
    public ResponseEntity<ResLoginDTO> getNewRefreshToken(@CookieValue(name = "refresh_token", defaultValue = "none") String refreshToken) throws ResourceInvalidException {
        if (refreshToken.equals("none")) {
            throw new ResourceInvalidException("Vui lòng đăng nhập");
        }

        // Check RFtoken hợp lệ
        Jwt decodedToken = this.securityUtil.checkValidToken(refreshToken);
        String email = decodedToken.getSubject();
        User currentUser = this.userService.getUserByRFTokenAndEmail(email, refreshToken);
        if (currentUser == null) {
            throw new ResourceInvalidException("Refresh token không hợp lệ");
        }

        // Tạo lại RF token và set cookies
        ResLoginDTO res = new ResLoginDTO();
        User currentUserDB = this.userService.getUserByUsername(email);
        if (currentUserDB != null) {
            ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(
                    currentUserDB.getId(),
                    currentUserDB.getEmail(),
                    currentUserDB.getName(),
                    currentUserDB.getRole());
            res.setUser(userLogin);
        }

        // create access token
        String access_token = this.securityUtil.createAccessToken(email, res);
        res.setAccessToken(access_token);

        // create refresh token
        String new_refresh_token = this.securityUtil.createRefreshToken(email, res);

        // update user
        this.userService.updateUserToken(new_refresh_token, email);

        // set cookies
        ResponseCookie resCookies = ResponseCookie
                .from("refresh_token", new_refresh_token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(refreshTokenExpiration)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, resCookies.toString())
                .body(res);
    }

    @PostMapping("auth/logout")
    @ApiMessage("Logout")
    public ResponseEntity<Void> logout() throws ResourceInvalidException {
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        if (email.isEmpty()) {
            throw new ResourceInvalidException("Accesstoken không hợp lệ");
        }

        this.userService.updateUserToken(null, email);

        //Xóa cookie
        ResponseCookie deleteSpringCookie = ResponseCookie
                .from("refresh_token", null)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, deleteSpringCookie.toString()).body(null);
    }

    @PostMapping("auth/register")
    @ApiMessage("Register a user")
    public ResponseEntity<CreateUserDTO> register(@Valid @RequestBody User user) throws ResourceInvalidException {
        if (this.userService.isExistedEmail(user.getEmail())) {
            throw new ResourceInvalidException("Email " + user.getEmail() + " đã tồn tại");
        }

        User newUser = this.userService.create(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.userService.convertToCreateDTO(newUser));
    }

    @PostMapping("auth/forgot")
    @ApiMessage("Forgot password")
    public ResponseEntity<Void> forgotPassword(@RequestBody EmailRequestDTO emailRequest) throws ResourceInvalidException {
        if (!this.userService.isExistedEmail(emailRequest.getEmail())) {
            throw new ResourceInvalidException("Email " + emailRequest.getEmail() + " không tồn tại");
        }
        String uuid = String.valueOf(UUID.randomUUID());
        String token = this.securityUtil.createResetPasswordToken(emailRequest.getEmail(), uuid);
        this.authService.storeForgotToken(token, emailRequest.getEmail());
        this.emailService.sendEmailFromTemplateSync(emailRequest.getEmail(), "Reset password", "forgotPassword", emailRequest.getEmail(), token);
        return ResponseEntity.ok(null);
    }

    @PutMapping("auth/reset-password")
    @ApiMessage("Reset password")
    public ResponseEntity<Void> resetPassword(
            @RequestParam("token") String token,
            @RequestBody ResetPasswordDTO request) throws ResourceInvalidException {
        Jwt decodedToken = this.securityUtil.checkValidToken(token);
        String email = decodedToken.getClaim("email");
        this.userService.resetPassword(email, request.getNewPassword());
        this.authService.deleteToken(token);
        return ResponseEntity.ok(null);
    }

    @GetMapping("auth/validate-token")
    @ApiMessage("validate token")
    public ResponseEntity<Map<String, Boolean>> validateToken(@RequestParam("token") String token) {
        try {
            Jwt decodedToken = securityUtil.checkValidToken(token);
            String email = decodedToken.getClaim("email");
            boolean check = authService.checkValidToken(token, email);
            return ResponseEntity.ok(Map.of("valid", check));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("valid", false));
        }
    }

    @PutMapping("auth/account")
    @ApiMessage("Update User Information")
    public ResponseEntity<ResLoginDTO.UserGetAccount> udateUser(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("address") String address,
            @RequestParam(value = "avatarUrl", required = false) MultipartFile avatar) throws IOException {
        String emailLoggedIn = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        // Lấy thông tin người dùng trong db
        User currentUserDB = userService.getUserByUsername(emailLoggedIn);
        ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin();
        ResLoginDTO.UserGetAccount userGetAccount = new ResLoginDTO.UserGetAccount();

        // Cập nhật thông tin người dùng
        currentUserDB.setName(name);
        currentUserDB.setEmail(email);
        currentUserDB.setPhone(phone);
        currentUserDB.setAddress(address);
        // Kiểm tra nếu có avatar mới được upload
        if (avatar != null && !avatar.isEmpty()) {
            // Lưu file ảnh vào server hoặc storage và cập nhật URL
            String avatarUrl = fileService.store(avatar,"avatar");
            currentUserDB.setAvatarUrl(avatarUrl);
        }
        userService.update(currentUserDB);
        // Lấy thông tin người dùng sau khi cập nhật

        userLogin.setId(currentUserDB.getId());
        userLogin.setEmail(currentUserDB.getEmail());
        userLogin.setName(currentUserDB.getName());
        userLogin.setRole(currentUserDB.getRole());

        return ResponseEntity.ok(userGetAccount);
    }
}
