package com.reset.spring_backend.persistence.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.reset.spring_backend.persistence.entity.SparePart;
import reactor.core.publisher.Flux;

@Repository
public interface SparePartRepository extends ReactiveCrudRepository<SparePart, Long> {
    Flux<SparePart> findByCodigo(String codigo);
    Flux<SparePart> findByDescricao(String descricao);
}