const adminMiddleware = (req, res, next) => {
  try {
    const userRole = req.user.role;
    if (userRole !== "ADMIN") {
      return res.status(403).json({
        error: "Acesso negado: privilégios de administrador necessários.",
      });
    }
    next();
  } catch (error) {
    console.error("Erro no middleware de administrador:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

module.exports = adminMiddleware;
