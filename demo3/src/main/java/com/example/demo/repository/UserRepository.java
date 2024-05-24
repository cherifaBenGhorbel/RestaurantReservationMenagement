package com.example.demo.repository;

import com.example.demo.model.User;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
	User findByUsername(String username);
    
    Optional<User> findByUsernameAndPassword(String username, String password);
	void deleteByUsername(String username);
}
