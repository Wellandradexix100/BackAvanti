import express from "express";
import {
  criarOferta,
  listarOferta,
  atualizarOferta,
  deletarOferta,
} from "../controllers/OfertaController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", listarOferta);

router.post("/", verificarToken, criarOferta);
router.put("/:id", verificarToken, atualizarOferta);
router.delete("/id", verificarToken, deletarOferta);

export default router;
