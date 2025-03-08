package com.reset.spring_backend.persistence.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.reset.spring_backend.persistence.entity.PedidoSparePart;
import reactor.core.publisher.Flux;

@Repository
public interface PedidoSparePartRepository extends ReactiveCrudRepository<PedidoSparePart, Long> {
    Flux<PedidoSparePart> findByPedidoId(Long pedidoId);
    Flux<PedidoSparePart> findBySparePartId(Long sparePartId);
}