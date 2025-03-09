package com.reset.spring_backend.persistence.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@Table("pedido")
public class Pedido {

    @Id
    private Long id;
    private String requestId;
    private String orderNumber;
    private Long tipoReparoId; // Referência ao tipo de reparo
    private Long localizacaoAtualId; // Referência à localização atual
    private Long tecnicoId; // Referência ao técnico
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAtualizacao;
    private boolean finalizado;
    private Long sparePartId; // Add this property
    private Long clienteId;
    private LocalDateTime dataPedido;
    private String status;
}