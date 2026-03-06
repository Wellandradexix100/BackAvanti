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
      { id: pessoa.id, role: pessoa.role },
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
    );

    res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token,
      usuario: {
        id: pessoa.id,
        nome: pessoa.nome,
        email: pessoa.email,
        avatar_url: pessoa.avatar_url,
        capa_url: pessoa.capa_url,
        role: pessoa.role,
        telefone: pessoa.telefone,
        descricao: pessoa.descricao,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "erro ao realizar login", detalhe: error.message });
  }
};
export const trocarSenha = async (req, res) => {
  try {
    const { id } = req.params;
    const { senhaAtual, novaSenha } = req.body;
    const pessoa = await prisma.pessoa.findUnique({
      where: { id: parseInt(id) },
    });

    if (!pessoa) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senhaAtual, pessoa.senhaHash);

    if (!senhaValida) {
      return res.status(400).json({ erro: "A senha atual está incorreta." });
    }

    const novaSenhaHash = await bcrypt.hash(novaSenha, 10);

    await prisma.pessoa.update({
      where: { id: parseInt(id) },
      data: { senhaHash: novaSenhaHash },
    });

    res.status(200).json({ mensagem: "Senha atualizada com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao trocar a senha", detalhe: error.message });
  }
};
