import express from "express";
import {
  criarPessoa,
  listarPessoas,
  atualizarPessoa,
  deletarPessoa,
} from "../controllers/PessoaController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", criarPessoa);
router.get("/", listarPessoas);

router.put("/:id", verificarToken, atualizarPessoa);
router.delete("/:id", verificarToken, deletarPessoa);

export default router;
