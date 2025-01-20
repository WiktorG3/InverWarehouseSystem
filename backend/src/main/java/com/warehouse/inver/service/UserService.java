package com.warehouse.inver.service;

import com.warehouse.inver.model.User;
import com.warehouse.inver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public boolean existsByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
}
