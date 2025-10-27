const { param } = require("express-validator");
const prisma = require("../config/database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
}

const registerUser = async (email, password, name) => {
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        passwordHash: passwordHash,
        name: name,
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
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    throw new Error("Credenciais inválidas");
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token: token };


}

module.exports = {
  registerUser,
  loginUser,
};
