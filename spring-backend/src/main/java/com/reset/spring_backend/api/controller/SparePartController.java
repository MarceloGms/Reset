package com.reset.spring_backend.api.controller;

import com.reset.spring_backend.persistence.entity.SparePart;
import com.reset.spring_backend.persistence.service.SparePartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/spareParts")
public class SparePartController {

    @Autowired
    private SparePartService sparePartService;

    @GetMapping("/codigo/{codigo}")
    public Flux<SparePart> getByCodigo(@PathVariable String codigo) {
        return sparePartService.findByCodigo(codigo);
    }

    @GetMapping("/descricao/{descricao}")
    public Flux<SparePart> getByDescricao(@PathVariable String descricao) {
        return sparePartService.findByDescricao(descricao);
    }
}
