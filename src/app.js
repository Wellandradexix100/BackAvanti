import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import pessoaRoutes from "./routes/pessoaRoutes.js";
import ofertaRoutes from "./routes/ofertaRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

app.get("/", (req, res) => res.json({ message: "Servidor a todo vapor" }));

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/ofertas", ofertaRoutes);
app.use("/pessoas", pessoaRoutes);
app.use("/upload", uploadRoutes);
app.use("/uploads", express.static("uploads"));
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
