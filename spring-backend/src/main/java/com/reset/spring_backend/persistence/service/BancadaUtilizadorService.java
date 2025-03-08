package com.reset.spring_backend.persistence.service;

import com.reset.spring_backend.persistence.entity.BancadaUtilizador;
import com.reset.spring_backend.persistence.repository.BancadaUtilizadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class BancadaUtilizadorService {

    @Autowired
    private BancadaUtilizadorRepository bancadaUtilizadorRepository;

    public Flux<BancadaUtilizador> findByUtilizadorId(Long utilizadorId) {
        return bancadaUtilizadorRepository.findByUtilizadorId(utilizadorId);
    }

    public Flux<BancadaUtilizador> findByBancadaId(Long bancadaId) {
        return bancadaUtilizadorRepository.findByBancadaId(bancadaId);
    }
}