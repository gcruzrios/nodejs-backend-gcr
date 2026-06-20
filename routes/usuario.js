const router = require('express').Router();
const { body } = require('express-validator');
const { verificarToken } = require('../middlewares/auth');
const { validar } = require('../middlewares/validar');
const ctrl = require('../controllers/usuario.controller');

const validarCrear = [
  body('nombre').notEmpty().trim().withMessage('Nombre requerido'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Password mínimo 6 caracteres'),
  validar
];

router.post('/',          validarCrear,    ctrl.crearUsuario);
router.get('/',           verificarToken,  ctrl.obtenerUsuarios);
router.get('/:id',        verificarToken,  ctrl.obtenerUsuario);
router.put('/:id',        verificarToken,  ctrl.actualizarUsuario);
router.delete('/:id',     verificarToken,  ctrl.eliminarUsuario);

module.exports = router;
