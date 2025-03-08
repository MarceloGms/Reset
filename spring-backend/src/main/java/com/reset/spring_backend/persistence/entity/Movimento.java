package com.reset.spring_backend.persistence.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@Table("movimento")
public class Movimento {
    
    @Id
    private Long id;
    private Long pedidoId; // Referência ao pedido
    private Long localizacaoOrigemId; // Referência à localização de origem
    private Long localizacaoDestinoId; // Referência à localização de destino
    private Long usuarioId; // Referência ao usuário
    private LocalDateTime dataMovimento;
    private String observacoes;
}