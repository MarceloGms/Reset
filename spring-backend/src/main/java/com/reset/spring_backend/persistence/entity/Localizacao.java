package com.reset.spring_backend.persistence.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("localizacao")
public class Localizacao {
    
    @Id
    private Long id;
    private String nome;
    private String tipo; // "picking", "stock_out", "picking_point", "bancada"
}
