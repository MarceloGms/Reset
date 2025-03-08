package com.reset.spring_backend.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.reset.spring_backend.persistence.entity.User;
import com.reset.spring_backend.persistence.repository.UserRepository;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/save")
    public Mono<User> saveUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
