import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  const login_name = username;

  try {
    if (!login_name || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await prisma.utilizador.findFirst({
      where: {
        OR: [{ username: login_name }],
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const expiresIn = 1000 * 60 * 60 * 24 * 7; // 7 days

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn,
    });

    const { password: userPassword, ...rest } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: expiresIn,
      })
      .status(200)
      .json({ user: rest, token });
  } catch (error) {
    console.error("Error in login route:", error);
    res
      .status(500)
      .json({ error: error.message, message: "Something went wrong" });
  }
};
