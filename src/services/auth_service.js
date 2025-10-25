const { param } = require("express-validator");
const prisma = require("../../prisma/client");
const bcrypt = require("bcryptjs");

function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
}

const registerUser = async (email, password, userName) => {
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: passwordHash,
        userName: userName,
      },
    });

    return exclude(newUser, ["password"]);
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target.includes("email")) {
      throw new Error("Este e-mail já está em uso");
    }
    throw error;
  }
};

module.exports = {
  registerUser,
};
