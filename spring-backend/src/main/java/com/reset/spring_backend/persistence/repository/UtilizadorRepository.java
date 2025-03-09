package com.reset.spring_backend.persistence.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.reset.spring_backend.persistence.entity.Utilizador;
import reactor.core.publisher.Mono;

@Repository
public interface UtilizadorRepository extends ReactiveCrudRepository<Utilizador, Long> {
    Mono<Utilizador> findByUsername(String username);
}