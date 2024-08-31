package com.app.webnongsan.controller;

import com.app.webnongsan.domain.User;
import com.app.webnongsan.service.UserService;
import com.app.webnongsan.util.annotation.ApiMessage;
import com.app.webnongsan.util.exception.IdInvalidException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v2")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("users")
    @ApiMessage("Create new user")
    public ResponseEntity<User> createNewUser(@Valid @RequestBody User user) throws IdInvalidException {
        if (this.userService.isExistedEmail(user.getEmail())){
            throw new IdInvalidException("Email " + user.getEmail() + " đã tồn tại");
        }
        User newUser = this.userService.create(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @DeleteMapping("users/{id}")
    @ApiMessage("Delete user")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") long id) throws IdInvalidException{
        boolean check = this.userService.isExistedId(id);
        if (!check){
            throw new IdInvalidException("Người dùng với id " + id + " không tồn tại");
        }
        this.userService.delete(id);
        return ResponseEntity.ok(null);
    }
}
