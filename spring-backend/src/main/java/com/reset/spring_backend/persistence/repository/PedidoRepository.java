package com.reset.spring_backend.persistence.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.reset.spring_backend.persistence.entity.Pedido;
import reactor.core.publisher.Flux;

@Repository
public interface PedidoRepository extends ReactiveCrudRepository<Pedido, Long> {
    Flux<Pedido> findByOrderNumber(String orderNumber);
    Flux<Pedido> findBySparePartId(Long sparePartId);
}