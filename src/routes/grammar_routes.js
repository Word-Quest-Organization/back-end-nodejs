const express = required('express')
const router = express.Router();
const authMiddlewre = require('../middlewares/auth_middleware');
const adminMiddleware = require('../middlewares/admin_middleware');
const grammarController = require('../controllers/grammar_controller');

router.post('/upload',
    authMiddleware,
    adminMiddleware,
    grammarController.uploadGrammar
);

module.exports = router;