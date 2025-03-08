package com.reset.spring_backend.persistence.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.reset.spring_backend.persistence.entity.Localizacao;
import reactor.core.publisher.Flux;

@Repository
public interface LocalizacaoRepository extends ReactiveCrudRepository<Localizacao, Long> {
    Flux<Localizacao> findByNome(String nome);
}