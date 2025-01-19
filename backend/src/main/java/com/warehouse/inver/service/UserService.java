package com.warehouse.inver.service;

import com.warehouse.inver.model.User;
import com.warehouse.inver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null) {
            System.out.println("Użytkownik znaleziony: " + username);
            System.out.println("Zakodowane hasło w bazie: " + user.getPassword());
            System.out.println("Hasło pasuje: " + passwordEncoder.matches(password, user.getPassword()));
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        System.out.println("Użytkownik nie został znaleziony lub hasło jest nieprawidłowe.");
        return null;
    }

    public User register(String username, String password, String email, String firstName, String lastName) {
        User user = new User(username, passwordEncoder.encode(password), email, firstName, lastName);
        return userRepository.save(user);
    }
}
