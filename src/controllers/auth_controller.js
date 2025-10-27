const authService = require("../services/auth_service");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name } = req.body;

  try {
    const newUser = await authService.registerUser(email, password, name);

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
};
