import express from "express";
import {
  criarOferta,
  listarOferta,
  atualizarOferta,
  deletarOferta,
  adquirirOferta,
  listarMinhasAquisicoes,
} from "../controllers/OfertaController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", listarOferta);

router.post("/", verificarToken, criarOferta);
router.put("/:id", verificarToken, atualizarOferta);
router.delete("/:id", verificarToken, deletarOferta);
router.post("/:oferta_id/adquirir", verificarToken, adquirirOferta);
router.get("/minhas-aquisicoes", verificarToken, listarMinhasAquisicoes);
export default router;
