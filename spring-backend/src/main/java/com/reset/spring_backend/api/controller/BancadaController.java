package com.reset.spring_backend.api.controller;

import com.reset.spring_backend.persistence.entity.Bancada;
import com.reset.spring_backend.persistence.service.BancadaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/bancadas")
public class BancadaController {

    @Autowired
    private BancadaService bancadaService;

    @GetMapping("/nome/{nome}")
    public Flux<Bancada> getByNome(@PathVariable String nome) {
        return bancadaService.findByNome(nome);
    }
}