package com.reset.spring_backend.persistence.service;

import com.reset.spring_backend.persistence.entity.Departamento;
import com.reset.spring_backend.persistence.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class DepartamentoService {

    @Autowired
    private DepartamentoRepository departamentoRepository;

    public Flux<Departamento> findByNome(String nome) {
        return departamentoRepository.findByNome(nome);
    }
}