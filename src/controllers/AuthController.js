import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha obrigatórios!" });
    }

    const pessoa = await prisma.pessoa.findUnique({ where: { email } });

    if (!pessoa || !pessoa.senhaHash) {
      return res.status(401).json({ erro: "Credenciais inválidas!" });
    }

    const senhaValida = await bcrypt.compare(senha, pessoa.senhaHash);

    if (!senhaValida) {
      return res.status(401).json({ erro: "Credenciais inválidas!" });
    }

    const token = jwt.sign(
      { id: pessoa.id, role: pessoa.id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
    );

    res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token,
      usuario: { id: pessoa.id, nome: pessoa.nome, email: pessoa.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "erro ao realizar login", detalhe: error.message });
  }
};
