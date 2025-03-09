import prisma from "../lib/prisma.js";

export const getLocalizacao = async (req, res) => {
  try {
    const localizacoes = await prisma.pedido.findMany({
        where: {
            finalizado: false,
        },
        select: {
            id: true,
            requestId: true,
            orderNumber: true,
            tipoReparoId: true,
            localizacaoAtualId: true,
            tecnicoId: true,
            finalizado: true,
            PedidoSparePart: {
            select: {
                id: true,
                sparePartId: true,
                quantidade: true,
            },
            },
            Movimento: {
            select: {
                id: true,
                localizacaoOrigemId: true,
                localizacaoDestinoId: true,
                usuarioId: true,
                observacoes: true,
            },
            },
        },
        });
    res.status(200).json(localizacoes);
  } catch (error) {
    console.error("Error fetching localizacao data:", error);
    res.status(500).json({ error: error.message, message: "Something went wrong" });
  }
};