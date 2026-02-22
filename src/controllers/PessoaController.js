import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const criarPessoa = async (req, res) => {
  try {
    const { nome, email, telefone, descricao, senha, role } = req.body;

    if (!nome || !email || !telefone || !senha || !role) {
      return res
        .status(400)
        .json({ erro: "Nome, email, telefone e senha são obrigatórios" });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const pessoa = await prisma.pessoa.create({
      data: { nome, email, telefone, descricao, senhaHash, role },
    });

    res.status(201).json(pessoa);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ erro: "Email já cadastrado!" });
    }
    res
      .status(500)
      .json({ erro: "Erro ao criar usuario", detalhe: error.message });
  }
};

export const listarPessoas = async (req, res) => {
  try {
    const pessoas = await prisma.pessoa.findMany({
      include: { ofertas: true },
    });
    res.status(200).json(pessoas);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar pessoas", detalhe: error.message });
  }
};

export const atualizarPessoa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, descricao } = req.body;

    const pessoa = await prisma.pessoa.update({
      where: { id: Number(id) },
      data: { nome, telefone, descricao },
    });

    res.status(200).json(pessoa);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao atualizar pessoa", detalhe: error.message });
  }
};

export const deletarPessoa = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.pessoa.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao deletar pessoa", detalhe: error.message });
  }
};
