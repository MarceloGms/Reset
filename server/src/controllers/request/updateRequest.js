import prisma from "../../lib/prisma.js";

export const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      orderNumber,
      tipoReparoId,
      localizacaoAtualId,
      tecnicoId,
      finalizado,
    } = req.body;

    // Verifica se o pedido existe
    const existingRequest = await prisma.pedido.findUnique({
      where: { id: Number.parseInt(id) },
    });

    if (!existingRequest) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    // Atualiza o pedido com os novos dados
    const updatedRequest = await prisma.pedido.update({
      where: { id: Number.parseInt(id) },
      data: {
        orderNumber,
        tipoReparoId,
        localizacaoAtualId,
        tecnicoId,
        finalizado,
        dataAtualizacao: new Date(),
      },
    });

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error("Error updating request:", error);
    res
      .status(500)
      .json({ error: error.message, message: "Something went wrong" });
  }
};
