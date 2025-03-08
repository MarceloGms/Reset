package com.reset.spring_backend.persistence.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.reset.spring_backend.persistence.entity.Departamento;
import reactor.core.publisher.Flux;

@Repository
public interface DepartamentoRepository extends ReactiveCrudRepository<Departamento, Long> {
    Flux<Departamento> findByNome(String nome);
}