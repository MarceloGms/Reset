package com.reset.spring_backend.persistence.service;

import com.reset.spring_backend.persistence.entity.Utilizador;
import com.reset.spring_backend.persistence.repository.UtilizadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UtilizadorService {

    @Autowired
    private UtilizadorRepository utilizadorRepository;

    public Mono<Utilizador> findByUsername(String username) {
        return utilizadorRepository.findByUsername(username);
    }

    public Mono<Utilizador> authenticate(String username, String passwordHash) {
        return utilizadorRepository.findByUsernameAndPasswordHash(username, passwordHash);
    }
}