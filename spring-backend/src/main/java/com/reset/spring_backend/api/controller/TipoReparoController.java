package com.reset.spring_backend.api.controller;

import com.reset.spring_backend.persistence.entity.TipoReparo;
import com.reset.spring_backend.persistence.service.TipoReparoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/tipoReparos")
public class TipoReparoController {

    @Autowired
    private TipoReparoService tipoReparoService;

    @GetMapping("/nome/{nome}")
    public Mono<TipoReparo> getByNome(@PathVariable String nome) {
        return tipoReparoService.findByNome(nome);
    }
}