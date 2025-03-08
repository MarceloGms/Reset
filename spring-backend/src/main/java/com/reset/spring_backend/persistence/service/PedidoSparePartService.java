package com.reset.spring_backend.persistence.service;

import com.reset.spring_backend.persistence.entity.PedidoSparePart;
import com.reset.spring_backend.persistence.repository.PedidoSparePartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class PedidoSparePartService {

    @Autowired
    private PedidoSparePartRepository pedidoSparePartRepository;

    public Flux<PedidoSparePart> findByPedidoId(Long pedidoId) {
        return pedidoSparePartRepository.findByPedidoId(pedidoId);
    }

    public Flux<PedidoSparePart> findBySparePartId(Long sparePartId) {
        return pedidoSparePartRepository.findBySparePartId(sparePartId);
    }
}