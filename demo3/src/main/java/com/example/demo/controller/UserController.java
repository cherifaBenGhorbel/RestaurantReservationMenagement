package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) throws AccountNotFoundException {
        return userRepository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException("User not found with id: " + id));
    }

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }
    
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User updateUser(@PathVariable String id, @RequestBody User userDetails) throws AccountNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException("User not found with id: " + id));

        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        user.setRoles(userDetails.getRoles());
        user.setRestaurants(userDetails.getRestaurants()); 
        user.setReservations(userDetails.getReservations()); 

        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable String id) throws AccountNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException("User not found with id: " + id));

        userRepository.delete(user);
    }
    
    @GetMapping("/login")
    public User loginUser(@RequestParam String username, @RequestParam String password) throws AccountNotFoundException {
        Optional<User> optionalUser = Optional.ofNullable(userRepository.findByUsername(username));
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        throw new AccountNotFoundException("Invalid username or password");
    }


    @ExceptionHandler(AccountNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleUserNotFoundException(AccountNotFoundException e) {
        return e.getMessage();
    }
}

