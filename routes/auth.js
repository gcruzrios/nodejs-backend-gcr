const router = require('express').Router();
const { body } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validar } = require('../middlewares/validar');

router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Password requerido'),
  validar
], login);

module.exports = router;
