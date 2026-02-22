import prisma from "../config/prisma.js";

export const criarOferta = async (req, res) => {
  try {
    const { titulo, descricao, categoria, nivel } = req.body;

    if (!titulo || !descricao || !categoria || !nivel) {
      return res
        .status(400)
        .json({ erro: "Todos os campos são obrigatórios!" });
    }

    const pessoa_id = req.usuarioId;

    const oferta = await prisma.oferta.create({
      data: { titulo, descricao, categoria, nivel, pessoa_id },
    });
    res.status(201).json(oferta);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao criar oferta!",
      detalhe: error.message,
    });
  }
};

export const listarOferta = async (req, res) => {
  try {
    const { categoria, nivel, busca } = req.query;

    const filtro = {};
    if (categoria)
      filtro.categoria = { contains: categoria, mode: "insensitive" };
    if (nivel) filtro.nivel = nivel;
    if (busca) {
      filtro.OR = [
        { titulo: { contains: busca, mode: "insensitive" } },
        { descricao: { contains: busca, mode: "insensitive" } },
      ];
    }

    const ofertas = await prisma.oferta.findMany({
      where: filtro,
      include: {
        pessoa: {
          select: { nome: true, email: true, telefone: true },
        },
      },
    });

    res.status(200).json(ofertas);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao listar ofertas", detalhe: error.message });
  }
};

export const atualizarOferta = async (req, res) => {
  try {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    const ofertaExistente = await prisma.oferta.findUnique({
      where: { id: Number(id) },
    });
    if (!ofertaExistente) {
      return res.status(404).json({ erro: "oferta não encontrada!" });
    }
    if (ofertaExistente.pessoa_id !== req.usuarioId) {
      return res
        .status(403)
        .json({ erro: "Você não tem permissão para editar esta oferta!" });
    }
    const ofertaAtualizada = await prisma.oferta.update({
      where: { id: Number(id) },
      data: dadosAtualizados,
    });
    res.status(200).json(ofertaAtualizada);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao atualizar a oferta", detalhe: error.message });
  }
};

export const deletarOferta = async (req, res) => {
  try {
    const { id } = req.params;

    const oferta = await prisma.oferta.findUnique({
      where: { id: Number(id) },
    });

    if (!oferta) {
      return res.status(404).json({ erro: "Oferta não encontrada!" });
    }

    if (oferta.pessoa_id !== req.usuarioId) {
      return res
        .status(403)
        .json({ erro: "Você não tem permissão para deletar esta oferta!" });
    }

    await prisma.oferta.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao deletar a oferta", detalhe: error.message });
  }
};
