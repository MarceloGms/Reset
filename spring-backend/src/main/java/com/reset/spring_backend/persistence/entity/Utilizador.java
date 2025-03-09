package com.reset.spring_backend.persistence.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("UTILIZADORES")
public class Utilizador {
    
    @Id
    private Long id;
    private String username;
    private String password;
    private String tipo; // "tecnico" ou "logistica"
}
