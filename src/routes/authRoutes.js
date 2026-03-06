import express from "express";
import { login, trocarSenha } from "../controllers/AuthController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";
import { validarSenhaForte } from "../middlewares/validacaoMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post(
  "/trocar-senha/:id",
  verificarToken,
  validarSenhaForte,
  trocarSenha,
);
export default router;
