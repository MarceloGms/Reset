package com.reset.spring_backend.persistence.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("spare_part")
public class SparePart {
    
    @Id
    private Long id;
    private String codigo;
    private String descricao;
}