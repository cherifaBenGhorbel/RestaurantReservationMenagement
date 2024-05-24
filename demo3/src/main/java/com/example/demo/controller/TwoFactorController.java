package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.TwoFactorAuthService;

@RestController
@RequestMapping("/2fa")
public class TwoFactorController {

    @Autowired
    private TwoFactorAuthService googleAuthenticatorService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/setup")
    public ResponseEntity<String> setup2FA(@RequestParam String username) {
        try {
            User user = userRepository.findByUsername(username);
            if (user == null) {
                return ResponseEntity.status(404).body("User not found");
            }
            String secret = googleAuthenticatorService.generateSecretKey();
            user.setTwoFactorAuthSecret(secret);
            user.setIs2FAEnabled(true);
            userRepository.save(user);
            String qrCodeUrl = googleAuthenticatorService.getQRBarcodeURL(username, secret);
            return ResponseEntity.ok(qrCodeUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error setting up 2FA. Please try again later.");
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verify2FA(@RequestParam String username, @RequestParam int code) {
        try {
            User user = userRepository.findByUsername(username);
            if (user == null) {
                return ResponseEntity.status(404).body("User not found");
            }
            boolean isValid = googleAuthenticatorService.validateCode(user.getTwoFactorAuthSecret(), code);
            return isValid ? ResponseEntity.ok("2FA verified successfully") : ResponseEntity.status(400).body("Invalid 2FA code");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error verifying 2FA. Please try again later.");
        }
    }
}
