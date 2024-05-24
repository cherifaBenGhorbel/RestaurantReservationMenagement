package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.TwoFactorAuthService;
import com.example.demo.service.UserService;
import com.example.demo.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @SuppressWarnings("unused")
	@Autowired
    private TwoFactorAuthService twoFactorAuthService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setRoles(userDTO.getRoles());

        User newUser = userService.createUser(user);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password, @RequestParam int code) throws AccountNotFoundException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userService.findByUsername(username);
        if (user == null) {
            throw new AccountNotFoundException("User not found");
        }

        if (userService.validate2FACode(user, code)) {
            String token = jwtTokenUtil.generateToken(username);
            return token;
        } else {
            throw new RuntimeException("Invalid 2FA code");
        }
    }
}
