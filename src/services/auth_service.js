const { param } = require("express-validator");
const { user: _user } = require("../config/database.js");
const { hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");


function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
}

const registerUser = async (email, password, name, role) => {
  try {
    const saltRounds = 10;
    const passwordHash = await hash(password, saltRounds);

    const newUser = await _user.create({
      data: {
        email: email,
        passwordHash: passwordHash,
        name: name,
        role: role || "USER",
      },
    });

    return exclude(newUser, ["passwordHash"]);
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target.includes("email")) {
      throw new Error("Este e-mail já está em uso");
    }
    throw error;
  }
};

const loginUser = async (email, password) => {
  const user = await _user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const passwordMatch = await compare(password, user.passwordHash);
  if (!passwordMatch) {
    throw new Error("Credenciais inválidas");
  }

  const token = sign(
    { id: user.id, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return { token: token };
};

module.exports = {
  registerUser,
  loginUser,
};
