package com.app.webnongsan.service;

import com.app.webnongsan.domain.User;
import com.app.webnongsan.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User create(User user) {
        //hash password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return this.userRepository.save(user);
    }

    public boolean isExistedEmail(String email){
        return this.userRepository.existsByEmail(email);
    }

    public boolean isExistedId(long id){
        return this.userRepository.existsById(id);
    }

    public void delete(long id){
        this.userRepository.deleteById(id);
    }
}

