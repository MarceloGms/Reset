package com.reset.spring_backend.persistence.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@Table("bancada_utilizador")
public class BancadaUtilizador {
    
    @Id
    private Long id;
    private Long utilizadorId; // Referência ao usuário
    private Long bancadaId; // Referência à bancada
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
}