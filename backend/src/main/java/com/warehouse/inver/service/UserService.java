package com.warehouse.inver.service;

import com.warehouse.inver.model.User;
import com.warehouse.inver.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(String username, String password, String email, String firstName, String lastName, String role) {
        User user = new User(username, passwordEncoder.encode(password), email, firstName, lastName, role);
        return userRepository.save(user);
    }
}
