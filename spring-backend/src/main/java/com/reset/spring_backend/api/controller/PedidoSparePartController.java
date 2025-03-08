package com.reset.spring_backend.api.controller;

import com.reset.spring_backend.persistence.entity.PedidoSparePart;
import com.reset.spring_backend.persistence.service.PedidoSparePartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/pedidoSpareParts")
public class PedidoSparePartController {

    @Autowired
    private PedidoSparePartService pedidoSparePartService;

    @GetMapping("/pedidoId/{pedidoId}")
    public Flux<PedidoSparePart> getByPedidoId(@PathVariable Long pedidoId) {
        return pedidoSparePartService.findByPedidoId(pedidoId);
    }

    @GetMapping("/sparePartId/{sparePartId}")
    public Flux<PedidoSparePart> getBySparePartId(@PathVariable Long sparePartId) {
        return pedidoSparePartService.findBySparePartId(sparePartId);
    }
}