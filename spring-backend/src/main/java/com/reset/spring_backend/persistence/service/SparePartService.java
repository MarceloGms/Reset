package com.reset.spring_backend.persistence.service;

import com.reset.spring_backend.persistence.entity.SparePart;
import com.reset.spring_backend.persistence.repository.SparePartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class SparePartService {

    @Autowired
    private SparePartRepository sparePartRepository;

    public Flux<SparePart> findByCodigo(String codigo) {
        return sparePartRepository.findByCodigo(codigo);
    }

    public Flux<SparePart> findByDescricao(String descricao) {
        return sparePartRepository.findByDescricao(descricao);
    }
}