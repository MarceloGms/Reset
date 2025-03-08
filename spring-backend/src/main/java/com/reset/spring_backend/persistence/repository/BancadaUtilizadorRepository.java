package com.reset.spring_backend.persistence.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.reset.spring_backend.persistence.entity.BancadaUtilizador;
import reactor.core.publisher.Flux;

@Repository
public interface BancadaUtilizadorRepository extends ReactiveCrudRepository<BancadaUtilizador, Long> {
    Flux<BancadaUtilizador> findByUtilizadorId(Long utilizadorId);
    Flux<BancadaUtilizador> findByBancadaId(Long bancadaId);
}