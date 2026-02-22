import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Acesso negado. Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);

    req.usuarioId = decodificado.id;

    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token invalido ou expirado!" });
  }
};
