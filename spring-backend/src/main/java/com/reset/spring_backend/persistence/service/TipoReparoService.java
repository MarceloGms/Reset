package com.reset.spring_backend.persistence.service;

import com.reset.spring_backend.persistence.entity.TipoReparo;
import com.reset.spring_backend.persistence.repository.TipoReparoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class TipoReparoService {

    @Autowired
    private TipoReparoRepository tipoReparoRepository;

    public Mono<TipoReparo> findByNome(String nome) {
        return tipoReparoRepository.findByNome(nome);
    }
}