package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final GoogleAuthenticator gAuth = new GoogleAuthenticator();

    public User createUser(User user) {
        if (user.getRoles().contains(Role.ADMIN)) {
            Optional<User> adminUser = userRepository.findAll().stream()
                    .filter(u -> u.getRoles().contains(Role.ADMIN))
                    .findFirst();
            if (adminUser.isPresent()) {
                throw new IllegalStateException("Admin user already exists.");
            }
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public String generate2FASecret(User user) {
        final GoogleAuthenticatorKey key = gAuth.createCredentials();
        user.setTwoFactorAuthSecret(key.getKey());
        userRepository.save(user);
        return key.getKey();
    }

    public boolean validate2FACode(User user, int code) {
        return gAuth.authorize(user.getTwoFactorAuthSecret(), code);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
