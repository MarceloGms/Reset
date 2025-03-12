import prisma from "../../lib/prisma.js";

export const getUserBenches = async (req, res) => {
  const { id } = req.params;

  const tecnicoId = Number.parseInt(id);
  if (Number.isNaN(tecnicoId)) {
    return res.status(400).json({ error: "Invalid id format" });
  }

  try {
    const benches = await prisma.bancada.findMany({
      where: {
        tecnicoId,
      },
      select: {
        id: true,
        nome: true, // Selecionando apenas o id e o nome
      },
    });

    res.status(200).json(benches);
  } catch (error) {
    console.error("Error fetching bench data:", error);
    res
      .status(500)
      .json({ error: error.message, message: "Something went wrong" });
  }
};
