package com.reset.spring_backend.api.controller;

import com.reset.spring_backend.persistence.entity.BancadaUtilizador;
import com.reset.spring_backend.persistence.service.BancadaUtilizadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/bancadaUtilizadores")
public class BancadaUtilizadorController {

    @Autowired
    private BancadaUtilizadorService bancadaUtilizadorService;

    @GetMapping("/utilizadorId/{utilizadorId}")
    public Flux<BancadaUtilizador> getByUtilizadorId(@PathVariable Long utilizadorId) {
        return bancadaUtilizadorService.findByUtilizadorId(utilizadorId);
    }

    @GetMapping("/bancadaId/{bancadaId}")
    public Flux<BancadaUtilizador> getByBancadaId(@PathVariable Long bancadaId) {
        return bancadaUtilizadorService.findByBancadaId(bancadaId);
    }
}