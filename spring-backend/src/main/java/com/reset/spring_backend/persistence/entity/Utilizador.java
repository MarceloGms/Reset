package com.reset.spring_backend.persistence.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("ustilizador")
public class Utilizador {
    
    @Id
    private Long id;
    private String nome;
    private String username;
    private String passwordHash;
    private String tipo; // "tecnico" ou "logistica"
}
