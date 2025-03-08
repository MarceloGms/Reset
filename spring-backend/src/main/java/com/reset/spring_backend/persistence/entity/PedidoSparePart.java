package com.reset.spring_backend.persistence.entity;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("pedido_spare_part")
public class PedidoSparePart {
    
    @Id
    private Long id;
    private Long pedidoId; // Referência ao pedido
    private Long sparePartId; // Referência à spare part
    private int quantidade;
}