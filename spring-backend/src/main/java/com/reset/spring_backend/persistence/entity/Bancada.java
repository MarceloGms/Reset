package com.reset.spring_backend.persistence.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("bancada")
public class Bancada {
    
    @Id
    private Long id;
    private String nome;
    private Long departamentoId; // Referência ao departamento
}