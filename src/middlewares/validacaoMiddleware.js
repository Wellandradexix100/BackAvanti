export const validarSenhaForte = (req, res, next) => {
  const { novaSenha, senha } = req.body;
  const senhaParaValidar = novaSenha || senha;

  if (!senhaParaValidar) {
    return res.status(400).json({ erro: "A senha é obrigatória." });
  }

  const regexSenhaForte = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!regexSenhaForte.test(senhaParaValidar)) {
    return res.status(400).json({
      erro: "A senha deve ter pelo menos 8 caracteres, contendo letras e números.",
    });
  }

  next();
};
