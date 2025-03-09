package com.reset.spring_backend.persistence.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.reset.spring_backend.persistence.entity.Utilizador;
import reactor.core.publisher.Mono;

@Repository
public interface UtilizadorRepository extends ReactiveCrudRepository<Utilizador, Long> {
    Mono<Utilizador> findByUsername(String username);
    Mono<Utilizador> findByUsernameAndPassword(String username, String password);
    Mono<Utilizador> findByUsernameAndTipo(String username, String tipo);
    Mono<Utilizador> findByUsernameAndTipoAndIdNot(String username, String tipo, Long id);
    Mono<Utilizador> findByUsernameAndIdNot(String username, Long id);
}