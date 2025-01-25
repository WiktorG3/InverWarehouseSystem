package com.warehouse.inver.controller;

import com.warehouse.inver.dto.user.UserRequest;
import com.warehouse.inver.dto.user.UserResponse;
import com.warehouse.inver.model.AuthResponse;
import com.warehouse.inver.model.User;
import com.warehouse.inver.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.warehouse.inver.security.JwtUtil;

import java.util.Map;

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

    @GetMapping
    public ResponseEntity<UserResponse> getUserDetails(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.substring(7));
        User user = userService.getUserByUsername(username);

        UserResponse response = new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update")
    public ResponseEntity<UserResponse> updateUser(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> updates) {
        String username = jwtUtil.extractUsername(token.substring(7));
        User updatedUser = userService.updateUserByFields(username, updates);

        UserResponse response = new UserResponse(
                updatedUser.getId(),
                updatedUser.getUsername(),
                updatedUser.getFirstName(),
                updatedUser.getLastName(),
                updatedUser.getEmail()
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.substring(7));
        userService.deleteUserByUsername(username);
        return ResponseEntity.ok("Account deleted successfully.");
    }
}
