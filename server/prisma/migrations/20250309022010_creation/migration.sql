-- CreateTable
CREATE TABLE "Localizacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Departamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "pickingPointId" INTEGER,
    CONSTRAINT "Departamento_pickingPointId_fkey" FOREIGN KEY ("pickingPointId") REFERENCES "Localizacao" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Utilizador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tipo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TipoReparo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "departamentoId" INTEGER NOT NULL,
    CONSTRAINT "TipoReparo_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bancada" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "departamentoId" INTEGER NOT NULL,
    CONSTRAINT "Bancada_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BancadaUtilizador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "bancadaId" INTEGER NOT NULL,
    "dataInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFim" DATETIME,
    CONSTRAINT "BancadaUtilizador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Utilizador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BancadaUtilizador_bancadaId_fkey" FOREIGN KEY ("bancadaId") REFERENCES "Bancada" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "requestId" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "tipoReparoId" INTEGER NOT NULL,
    "localizacaoAtualId" INTEGER NOT NULL,
    "tecnicoId" INTEGER NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" DATETIME NOT NULL,
    "finalizado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Pedido_tipoReparoId_fkey" FOREIGN KEY ("tipoReparoId") REFERENCES "TipoReparo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pedido_localizacaoAtualId_fkey" FOREIGN KEY ("localizacaoAtualId") REFERENCES "Localizacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pedido_tecnicoId_fkey" FOREIGN KEY ("tecnicoId") REFERENCES "Utilizador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SparePart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "PedidoSparePart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedidoId" INTEGER NOT NULL,
    "sparePartId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "PedidoSparePart_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PedidoSparePart_sparePartId_fkey" FOREIGN KEY ("sparePartId") REFERENCES "SparePart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Movimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedidoId" INTEGER NOT NULL,
    "localizacaoOrigemId" INTEGER NOT NULL,
    "localizacaoDestinoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "dataMovimento" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observacoes" TEXT,
    CONSTRAINT "Movimento_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Movimento_localizacaoOrigemId_fkey" FOREIGN KEY ("localizacaoOrigemId") REFERENCES "Localizacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Movimento_localizacaoDestinoId_fkey" FOREIGN KEY ("localizacaoDestinoId") REFERENCES "Localizacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Movimento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Utilizador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Localizacao_nome_tipo_key" ON "Localizacao"("nome", "tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_pickingPointId_key" ON "Departamento"("pickingPointId");

-- CreateIndex
CREATE UNIQUE INDEX "Utilizador_username_key" ON "Utilizador"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_requestId_key" ON "Pedido"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "SparePart_codigo_key" ON "SparePart"("codigo");
