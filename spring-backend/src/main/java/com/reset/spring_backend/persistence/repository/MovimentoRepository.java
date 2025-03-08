package com.reset.spring_backend.persistence.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.reset.spring_backend.persistence.entity.Movimento;
import reactor.core.publisher.Flux;

@Repository
public interface MovimentoRepository extends ReactiveCrudRepository<Movimento, Long> {
    Flux<Movimento> findByPedidoId(Long pedidoId);
    Flux<Movimento> findByLocalizacaoId(Long localizacaoId);
}