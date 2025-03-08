package com.reset.spring_backend.api.controller;


import com.reset.spring_backend.persistence.entity.Utilizador;
import com.reset.spring_backend.persistence.service.UtilizadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/utilizadores")
public class UtilizadorController {

    @Autowired
    private UtilizadorService utilizadorService;

    @GetMapping("/username/{username}")
    public Mono<Utilizador> getByUsername(@PathVariable String username) {
        return utilizadorService.findByUsername(username);
    }

    @PostMapping("/authenticate")
    public Mono<Utilizador> authenticate(@RequestParam String username, @RequestParam String passwordHash) {
        return utilizadorService.authenticate(username, passwordHash);
    }
}