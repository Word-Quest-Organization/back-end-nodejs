const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const authMiddleware = require("../middlewares/auth_middleware");

router.get("/profile", authMiddleware, userController.getMyProfile);

module.exports = router;
