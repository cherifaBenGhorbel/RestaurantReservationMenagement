package com.example.demo.service;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import org.springframework.stereotype.Service;

@Service
public class TwoFactorAuthService {

    private final GoogleAuthenticator gAuth = new GoogleAuthenticator();

    public String generateSecretKey() {
        final GoogleAuthenticatorKey key = gAuth.createCredentials();
        return key.getKey();
    }

    public boolean validateCode(String secretKey, int verificationCode) {
        return gAuth.authorize(secretKey, verificationCode);
    }

    public String getQRBarcodeURL(String username, String secretKey) {
        String issuer = "YourAppName"; // replace with your app's name
        return String.format(
            "otpauth://totp/%s:%s?secret=%s&issuer=%s",
            issuer, username, secretKey, issuer
        );
    }
}
