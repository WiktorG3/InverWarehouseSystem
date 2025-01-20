package com.warehouse.inver.controller;

import com.warehouse.inver.model.AuthResponse;
import com.warehouse.inver.model.User;
import com.warehouse.inver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.warehouse.inver.security.JwtUtil;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public UsersController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        User authenticatedUser = userService.login(user.getUsername(), user.getPassword());
        String token = jwtUtil.generateToken(authenticatedUser.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register")
    public User register(@RequestBody User user){
        return userService.register(
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
        );
    }
}
