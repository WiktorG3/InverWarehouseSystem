package com.warehouse.inver.service;

import com.warehouse.inver.dto.user.UserRequest;
import com.warehouse.inver.model.User;
import com.warehouse.inver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Invalid username"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        return user;
    }

    public User register(String username, String password, String email, String firstName, String lastName) {
        User user = new User(username, passwordEncoder.encode(password), email, firstName, lastName);
        return userRepository.save(user);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public User updateUserByFields(String username, Map<String, Object> updates) {
        User user = getUserByUsername(username);

        updates.forEach((userField, value) -> {
            switch (userField) {
                case "username":
                    user.setUsername((String) value);
                    break;
                case "password":
                    user.setPassword(passwordEncoder.encode((String) value));
                    break;
                case "email":
                    user.setEmail((String) value);
                    break;
                case "firstName":
                    user.setFirstName((String) value);
                    break;
                case "lastName":
                    user.setLastName((String) value);
                    break;
                default:
                    throw new IllegalArgumentException("Invalid field: " + userField);
            }
        });

        return userRepository.save(user);
    }

    public void deleteUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        userRepository.delete(user);
    }
}
