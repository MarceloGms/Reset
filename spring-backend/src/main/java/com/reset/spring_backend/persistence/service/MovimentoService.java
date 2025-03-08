package com.reset.spring_backend.persistence.service;

import com.reset.spring_backend.persistence.entity.Movimento;
import com.reset.spring_backend.persistence.repository.MovimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class MovimentoService {

    @Autowired
    private MovimentoRepository movimentoRepository;

    public Flux<Movimento> findByPedidoId(Long pedidoId) {
        return movimentoRepository.findByPedidoId(pedidoId);
    }

    public Flux<Movimento> findByLocalizacaoId(Long localizacaoId) {
        return movimentoRepository.findByLocalizacaoId(localizacaoId);
    }
}