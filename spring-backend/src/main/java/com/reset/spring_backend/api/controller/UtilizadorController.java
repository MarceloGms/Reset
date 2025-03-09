package com.reset.spring_backend.api.controller;

import com.reset.spring_backend.persistence.entity.Utilizador;
import com.reset.spring_backend.persistence.service.UtilizadorService;
import com.reset.spring_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/utilizadores")
public class UtilizadorController {

    @Autowired
    private UtilizadorService utilizadorService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/authenticate")
    public Mono<ResponseEntity<Utilizador>> authenticate(@RequestParam String username, @RequestParam String password, HttpServletResponse response) {
        return utilizadorService.authenticate(username, password)
                .map(utilizador -> {
                    String token = jwtUtil.generateToken(username);
                    Cookie cookie = new Cookie("token", token);
                    cookie.setHttpOnly(true);
                    cookie.setPath("/");
                    cookie.setMaxAge(86400); // 1 day in seconds
                    response.addCookie(cookie);
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