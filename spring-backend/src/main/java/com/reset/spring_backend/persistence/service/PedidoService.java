package com.reset.spring_backend.persistence.service;

import com.reset.spring_backend.persistence.entity.Pedido;
import com.reset.spring_backend.persistence.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public Flux<Pedido> findByOrderNumber(String orderNumber) {
        return pedidoRepository.findByOrderNumber(orderNumber);
    }

    public Flux<Pedido> findBySparePartId(Long sparePartId) {
        return pedidoRepository.findBySparePartId(sparePartId);
    }
}