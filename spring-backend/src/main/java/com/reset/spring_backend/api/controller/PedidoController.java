package com.reset.spring_backend.api.controller;

import com.reset.spring_backend.persistence.entity.Pedido;
import com.reset.spring_backend.persistence.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping("/orderNumber/{orderNumber}")
    public Flux<Pedido> getByOrderNumber(@PathVariable String orderNumber) {
        return pedidoService.findByOrderNumber(orderNumber);
    }

    @GetMapping("/sparePartId/{sparePartId}")
    public Flux<Pedido> getBySparePartId(@PathVariable Long sparePartId) {
        return pedidoService.findBySparePartId(sparePartId);
    }
}