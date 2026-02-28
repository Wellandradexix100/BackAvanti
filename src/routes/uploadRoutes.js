import express from "express";
import {
  uploadAvatar,
  uploadCapa,
  uploadMiddleware,
} from "../controllers/UploadController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/avatar/:id", verificarToken, uploadMiddleware, uploadAvatar);
router.post("/capa/:id", verificarToken, uploadMiddleware, uploadCapa);
export default router;
