import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    const tipoReparo = await prisma.tipoReparo.findFirst(); // Ou usa where para um tipo específico
    const localizacao1 = await prisma.localizacao.findFirst({ where: { id: 2 } }); // Localização existente
    const localizacao2 = await prisma.localizacao.findFirst({ where: { id: 3 } }); 
    const utilizador = await prisma.utilizador.findFirst(); // Busca um utilizador válido


  // Create first Pedido with finalizado set to true
  const pedido1 = await prisma.pedido.create({
    data: {
      requestId: 'R456',
      orderNumber: 'OR56',
      tipoReparoId: tipoReparo.id,
      localizacaoAtualId: localizacao1.id,
      tecnicoId: utilizador.id,
      finalizado: true,
      PedidoSparePart: {
        create: [
          {
            sparePart: {
              create: {
                codigo: 'S3',
                descricao: 'Spare Part 123',
              },
            },
            quantidade: 2,
          },
        ],
      },
      Movimento: {
        create: [
          {
            localizacaoOrigemId: localizacao1.id,
            localizacaoDestinoId: localizacao1.id,
            usuarioId: utilizador.id,
            observacoes: 'Movimento inicial',
          },
        ],
      },
    },
  });

  // Create second Pedido with finalizado set to false
  const pedido2 = await prisma.pedido.create({
    data: {
      requestId: 'REQ654321',
      orderNumber: 'ORD654321',
      tipoReparoId: tipoReparo.id,
      localizacaoAtualId: localizacao2.id,
      tecnicoId: utilizador.id,
      finalizado: false,
      PedidoSparePart: {
        create: [
          {
            sparePart: {
              create: {
                codigo: 'S6',
                descricao: 'Spare Part 456',
              },
            },
            quantidade: 1,
          },
        ],
      },
      Movimento: {
        create: [
          {
            localizacaoOrigemId: localizacao2.id,
            localizacaoDestinoId: localizacao2.id,
            usuarioId: utilizador.id,
            observacoes: 'Movimento inicial',
          },
        ],
      },
    },
  });

  console.log('Pedidos created:', { pedido1, pedido2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });