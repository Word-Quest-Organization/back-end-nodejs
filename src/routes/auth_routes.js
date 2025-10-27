const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');
const { body } = require('express-validator');

router.get('/test', (req, res) => {
    res.status(200).json({ message: "Test route is working!" });
});

router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Por favor, insira um e-mail válido.'),
        body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.'),
        body('name').notEmpty().withMessage('O nome de usuário é obrigatório.'),
    ],
    authController.register
);

module.exports = router;