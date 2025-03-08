package com.reset.spring_backend.persistence.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.reset.spring_backend.persistence.entity.TipoReparo;
import reactor.core.publisher.Mono;

@Repository
public interface TipoReparoRepository extends ReactiveCrudRepository<TipoReparo, Long> {
    Mono<TipoReparo> findByNome(String nome);
}