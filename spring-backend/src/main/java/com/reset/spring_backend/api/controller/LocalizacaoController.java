package com.reset.spring_backend.api.controller;

import com.reset.spring_backend.persistence.entity.Localizacao;
import com.reset.spring_backend.persistence.service.LocalizacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/localizacoes")
public class LocalizacaoController {

    @Autowired
    private LocalizacaoService localizacaoService;

    @GetMapping("/nome/{nome}")
    public Flux<Localizacao> getByNome(@PathVariable String nome) {
        return localizacaoService.findByNome(nome);
    }
}