-- Criação das tabelas
-- Tabela de Localizações
CREATE TABLE IF NOT EXISTS LOCALIZACAO (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('picking', 'stock_out', 'picking_point', 'bancada'))
);

-- Tabela de Utilizadores
CREATE TABLE IF NOT EXISTS UTILIZADORES (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('tecnico', 'logistica'))
);

-- Tabela de Departamentos
CREATE TABLE IF NOT EXISTS DEPARTAMENTO (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    picking_point_id INTEGER NULL,
    FOREIGN KEY (picking_point_id) REFERENCES LOCALIZACAO(id)
);

-- Tabela de Tipos de Reparo
CREATE TABLE IF NOT EXISTS TIPO_REPARO (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    departamento_id INTEGER NOT NULL,
    FOREIGN KEY (departamento_id) REFERENCES DEPARTAMENTO(id)
);

-- Tabela de Bancadas
CREATE TABLE IF NOT EXISTS BANCADA (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    departamento_id INTEGER NOT NULL,
    FOREIGN KEY (departamento_id) REFERENCES DEPARTAMENTO(id)
);

-- Tabela de Associação entre Bancadas e Usuários
CREATE TABLE IF NOT EXISTS BANCADA_UTILIZADOR (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    bancada_id INTEGER NOT NULL,
    data_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_fim TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES UTILIZADORES(id),
    FOREIGN KEY (bancada_id) REFERENCES BANCADA(id)
);

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS PEDIDO (
    id SERIAL PRIMARY KEY,
    request_id VARCHAR(50) NOT NULL UNIQUE,
    order_number VARCHAR(50) NOT NULL,
    tipo_reparo_id INTEGER NOT NULL,
    localizacao_atual_id INTEGER NOT NULL,
    tecnico_id INTEGER NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    finalizado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (tipo_reparo_id) REFERENCES TIPO_REPARO(id),
    FOREIGN KEY (localizacao_atual_id) REFERENCES LOCALIZACAO(id),
    FOREIGN KEY (tecnico_id) REFERENCES UTILIZADORES(id)
);

-- Tabela de Peças de Reposição
CREATE TABLE IF NOT EXISTS SPARE_PART (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT
);

-- Tabela de Associação entre Pedidos e Peças
CREATE TABLE IF NOT EXISTS PEDIDO_SPARE_PART (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL,
    spare_part_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (pedido_id) REFERENCES PEDIDO(id),
    FOREIGN KEY (spare_part_id) REFERENCES SPARE_PART(id)
);

-- Tabela de Movimentos
CREATE TABLE IF NOT EXISTS MOVIMENTO (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL,
    localizacao_origem_id INTEGER NOT NULL,
    localizacao_destino_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    data_movimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacoes TEXT,
    FOREIGN KEY (pedido_id) REFERENCES PEDIDO(id),
    FOREIGN KEY (localizacao_origem_id) REFERENCES LOCALIZACAO(id),
    FOREIGN KEY (localizacao_destino_id) REFERENCES LOCALIZACAO(id),
    FOREIGN KEY (usuario_id) REFERENCES UTILIZADORES(id)
);