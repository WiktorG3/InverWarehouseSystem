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
import org.springframework.http.HttpStatus;

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
        System.out.println("Logowanie użytkownika: " + user.getUsername());
        User authenticatedUser = userService.login(user.getUsername(), user.getPassword());
        if (authenticatedUser != null) {
            String token = jwtUtil.generateToken(authenticatedUser.getUsername());
            System.out.println("Wygenerowano token dla: " + authenticatedUser.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));
        }
        System.out.println("Nieudana próba logowania dla użytkownika: " + user.getUsername());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
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
