const prisma = require("../config/database");

const getMyProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erro ao buscar perfil do usuário.",
        error: error.message,
      });
  }
};

module.exports = {
  getMyProfile,
};
