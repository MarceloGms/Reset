package com.reset.spring_backend.persistence.service;

import com.reset.spring_backend.persistence.entity.Localizacao;
import com.reset.spring_backend.persistence.repository.LocalizacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class LocalizacaoService {

    @Autowired
    private LocalizacaoRepository localizacaoRepository;

    public Flux<Localizacao> findByNome(String nome) {
        return localizacaoRepository.findByNome(nome);
    }
}