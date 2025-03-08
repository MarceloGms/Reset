package com.reset.spring_backend.api.controller;

import com.reset.spring_backend.persistence.entity.Movimento;
import com.reset.spring_backend.persistence.service.MovimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/movimentos")
public class MovimentoController {

    @Autowired
    private MovimentoService movimentoService;

    @GetMapping("/pedidoId/{pedidoId}")
    public Flux<Movimento> getByPedidoId(@PathVariable Long pedidoId) {
        return movimentoService.findByPedidoId(pedidoId);
    }

    @GetMapping("/localizacaoId/{localizacaoId}")
    public Flux<Movimento> getByLocalizacaoId(@PathVariable Long localizacaoId) {
        return movimentoService.findByLocalizacaoId(localizacaoId);
    }
}