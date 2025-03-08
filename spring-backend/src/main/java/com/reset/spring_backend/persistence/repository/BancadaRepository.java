package com.reset.spring_backend.persistence.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.reset.spring_backend.persistence.entity.Bancada;
import reactor.core.publisher.Flux;

@Repository
public interface BancadaRepository extends ReactiveCrudRepository<Bancada, Long> {
    Flux<Bancada> findByNome(String nome);
}