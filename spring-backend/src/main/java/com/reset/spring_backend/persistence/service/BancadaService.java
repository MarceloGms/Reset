package com.reset.spring_backend.persistence.service;

import com.reset.spring_backend.persistence.entity.Bancada;
import com.reset.spring_backend.persistence.repository.BancadaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class BancadaService {

    @Autowired
    private BancadaRepository bancadaRepository;

    public Flux<Bancada> findByNome(String nome) {
        return bancadaRepository.findByNome(nome);
    }
}