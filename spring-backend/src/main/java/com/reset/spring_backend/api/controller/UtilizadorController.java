package com.reset.spring_backend.api.controller;

import com.reset.spring_backend.persistence.entity.Utilizador;
import com.reset.spring_backend.persistence.service.UtilizadorService;
import com.reset.spring_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/utilizadores")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080" }, allowCredentials = "true")
public class UtilizadorController {

    @Autowired
    private UtilizadorService utilizadorService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/authenticate")
    public Mono<ResponseEntity<Utilizador>> authenticate(@RequestBody String username, @RequestBody String password,
            HttpServletResponse response) {
        Utilizador credentials = new Utilizador();
        credentials.setUsername(username);
        credentials.setPassword(password);
        return utilizadorService.authenticate(username, password)
                .map(utilizador -> {
                    String token = jwtUtil.generateToken(credentials.getUsername());
                    response.setHeader("Authorization", token);
                    return new ResponseEntity<>(utilizador, HttpStatus.OK);
                })
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
    }

    @PostMapping("/register")
    public Mono<ResponseEntity<Utilizador>> registerUser(@RequestBody Utilizador utilizador) {
        return utilizadorService.registerUser(utilizador)
                .map(savedUser -> new ResponseEntity<>(savedUser, HttpStatus.CREATED))
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }
}
