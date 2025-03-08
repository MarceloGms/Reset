-- Criação das tabelas
-- Tabela de Utilizadores
CREATE TABLE UTILIZADORES (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('tecnico', 'logistica'))
);

-- Tabela de Departamentos
CREATE TABLE DEPARTAMENTO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    picking_point_id INTEGER NULL,
    FOREIGN KEY (picking_point_id) REFERENCES LOCALIZACAO(id)
);

-- Tabela de Localizações
CREATE TABLE LOCALIZACAO (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('picking', 'stock_out', 'picking_point', 'bancada'))
);

-- Tabela de Tipos de Reparo
CREATE TABLE TIPO_REPARO (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    departamento_id INTEGER NOT NULL,
    FOREIGN KEY (departamento_id) REFERENCES DEPARTAMENTO(id)
);

-- Tabela de Bancadas
CREATE TABLE BANCADA (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    departamento_id INTEGER NOT NULL,
    FOREIGN KEY (departamento_id) REFERENCES DEPARTAMENTO(id)
);

-- Tabela de Associação entre Bancadas e Usuários
CREATE TABLE BANCADA_UTILIZADOR (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    bancada_id INTEGER NOT NULL,
    data_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_fim DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES USUARIO(id),
    FOREIGN KEY (bancada_id) REFERENCES BANCADA(id)
);

-- Tabela de Pedidos
CREATE TABLE PEDIDO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id VARCHAR(50) NOT NULL UNIQUE,
    order_number VARCHAR(50) NOT NULL,
    tipo_reparo_id INTEGER NOT NULL,
    localizacao_atual_id INTEGER NOT NULL,
    tecnico_id INTEGER NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    finalizado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (tipo_reparo_id) REFERENCES TIPO_REPARO(id),
    FOREIGN KEY (localizacao_atual_id) REFERENCES LOCALIZACAO(id),
    FOREIGN KEY (tecnico_id) REFERENCES USUARIO(id)
);

-- Tabela de Peças de Reposição
CREATE TABLE SPARE_PART (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT
);

-- Tabela de Associação entre Pedidos e Peças
CREATE TABLE PEDIDO_SPARE_PART (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id INTEGER NOT NULL,
    spare_part_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (pedido_id) REFERENCES PEDIDO(id),
    FOREIGN KEY (spare_part_id) REFERENCES SPARE_PART(id)
);

-- Tabela de Movimentos
CREATE TABLE MOVIMENTO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id INTEGER NOT NULL,
    localizacao_origem_id INTEGER NOT NULL,
    localizacao_destino_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    data_movimento DATETIME DEFAULT CURRENT_TIMESTAMP,
    observacoes TEXT,
    FOREIGN KEY (pedido_id) REFERENCES PEDIDO(id),
    FOREIGN KEY (localizacao_origem_id) REFERENCES LOCALIZACAO(id),
    FOREIGN KEY (localizacao_destino_id) REFERENCES LOCALIZACAO(id),
    FOREIGN KEY (usuario_id) REFERENCES USUARIO(id)
);

-- Atualizar a referência ao picking_point após a criação das tabelas
ALTER TABLE DEPARTAMENTO
ADD CONSTRAINT fk_picking_point
FOREIGN KEY (picking_point_id) REFERENCES LOCALIZACAO(id);

-- Inserção dos dados iniciais

-- Localizações padrão
INSERT INTO LOCALIZACAO (id, nome, tipo) VALUES (200, 'Picking', 'picking');
INSERT INTO LOCALIZACAO (id, nome, tipo) VALUES (201, 'Stock Out', 'stock_out');

-- Localizações para pontos de recolha de departamentos (exemplo)
INSERT INTO LOCALIZACAO (id, nome, tipo) VALUES (300, 'Picking Point - Major', 'picking_point');
INSERT INTO LOCALIZACAO (id, nome, tipo) VALUES (301, 'Picking Point - Middle', 'picking_point');
INSERT INTO LOCALIZACAO (id, nome, tipo) VALUES (302, 'Picking Point - Minor', 'picking_point');
INSERT INTO LOCALIZACAO (id, nome, tipo) VALUES (303, 'Picking Point - Surgical', 'picking_point');
INSERT INTO LOCALIZACAO (id, nome, tipo) VALUES (304, 'Picking Point - Electronics', 'picking_point');

-- Localizações para bancadas
INSERT INTO LOCALIZACAO (id, nome, tipo) VALUES (1100, 'WSB100', 'bancada');
INSERT INTO LOCALIZACAO (id, nome, tipo) VALUES (1200, 'WSB200', 'bancada');

-- Departamentos
INSERT INTO DEPARTAMENTO (id, nome, picking_point_id) VALUES (1, 'Major Department', 300);
INSERT INTO DEPARTAMENTO (id, nome, picking_point_id) VALUES (2, 'Middle Department', 301);
INSERT INTO DEPARTAMENTO (id, nome, picking_point_id) VALUES (3, 'Minor Department', 302);
INSERT INTO DEPARTAMENTO (id, nome, picking_point_id) VALUES (4, 'Surgical Department', 303);
INSERT INTO DEPARTAMENTO (id, nome, picking_point_id) VALUES (5, 'Electronics Department', 304);

-- Tipos de reparo
INSERT INTO TIPO_REPARO (id, nome, categoria, departamento_id) VALUES (100, 'Major Type 1', 'Major', 1);
INSERT INTO TIPO_REPARO (id, nome, categoria, departamento_id) VALUES (101, 'Major Type 2', 'Major', 1);
INSERT INTO TIPO_REPARO (id, nome, categoria, departamento_id) VALUES (102, 'Major Type 3', 'Major', 1);
INSERT INTO TIPO_REPARO (id, nome, categoria, departamento_id) VALUES (103, 'Middle Type', 'Middle', 2);
INSERT INTO TIPO_REPARO (id, nome, categoria, departamento_id) VALUES (104, 'Minor Type', 'Minor', 3);
INSERT INTO TIPO_REPARO (id, nome, categoria, departamento_id) VALUES (117, 'Surgical Type', 'Surgical', 4);
INSERT INTO TIPO_REPARO (id, nome, categoria, departamento_id) VALUES (111, 'Electronics Type', 'Electronics', 5);

-- Bancadas
INSERT INTO BANCADA (id, nome, departamento_id) VALUES (1100, 'WSB100', 1);
INSERT INTO BANCADA (id, nome, departamento_id) VALUES (1200, 'WSB200', 2);

-- Usuários de exemplo (senha: 'password')
INSERT INTO USUARIO (nome, username, password_hash, tipo) 
VALUES ('Técnico Exemplo', 'tecnico1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'tecnico');

INSERT INTO USUARIO (nome, username, password_hash, tipo) 
VALUES ('Logística Exemplo', 'logistica1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'logistica');