const authService = require("../services/auth_service");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name, role } = req.body;

  try {
    const newUser = await authService.registerUser(email, password, name, role);

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: newUser,
    });
  } catch (error) {
    console.log("Registration failed :", email);
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const result = await authService.loginUser(email, password);

    res.status(200).json(result);
  } catch (error) {
    console.log("Login failed for email:", email);
    res.status(401).json({
      
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
