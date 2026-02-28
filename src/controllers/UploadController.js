import multer from "multer";
import path from "path";
import prisma from "../config/prisma.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export const uploadAvatar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ erro: "Nenhuma imagem foi enviada." });
    }

    const urlFoto = `http://localhost:3000/uploads/${req.file.filename}`;

    const pessoa = await prisma.pessoa.update({
      where: { id: parseInt(id) },
      data: { avatar_url: urlFoto },
    });

    res.status(200).json({
      mensagem: "Avatar atualizado!",
      avatar_url: pessoa.avatar_url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao salvar o avatar", detalhe: error.message });
  }
};

export const uploadCapa = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ erro: "Nenhuma imagem foi enviada." });
    }

    const urlCapa = `http://localhost:3000/uploads/${req.file.filename}`;

    const pessoa = await prisma.pessoa.update({
      where: { id: parseInt(id) },
      data: { capa_url: urlCapa },
    });

    res.status(200).json({
      mensagem: "Capa atualizada!",
      capa_url: pessoa.capa_url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao salvar a capa", detalhe: error.message });
  }
};

export const uploadMiddleware = upload.single("foto");
