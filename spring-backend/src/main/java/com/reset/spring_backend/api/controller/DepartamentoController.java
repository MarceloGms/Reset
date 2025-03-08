package com.reset.spring_backend.api.controller;

import com.reset.spring_backend.persistence.entity.Departamento;
import com.reset.spring_backend.persistence.service.DepartamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/departamentos")
public class DepartamentoController {

    @Autowired
    private DepartamentoService departamentoService;

    @GetMapping("/nome/{nome}")
    public Flux<Departamento> getByNome(@PathVariable String nome) {
        return departamentoService.findByNome(nome);
    }
}