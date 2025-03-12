import prisma from "../../lib/prisma.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, password, tipo } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const existingUser = await prisma.utilizador.findFirst({
      where: {
        OR: [{ username: username }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or Username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.utilizador.create({
      data: {
        username,
        password: hashedPassword,
        tipo,
      },
    });

    res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error, message: "Something went wrong" });
  }
};
