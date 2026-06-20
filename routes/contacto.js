const router = require('express').Router();
const { body } = require('express-validator');
const { verificarToken } = require('../middlewares/auth');
const { validar } = require('../middlewares/validar');
const ctrl = require('../controllers/contacto.controller');

const validarCrear = [
  body('nombre').notEmpty().trim().withMessage('Nombre requerido'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  validar
];

router.post('/',       validarCrear,   ctrl.crearContacto);
router.get('/',        verificarToken, ctrl.obtenerContactos);
router.get('/:id',     verificarToken, ctrl.obtenerContacto);
router.put('/:id',     verificarToken, ctrl.actualizarContacto);
router.delete('/:id',  verificarToken, ctrl.eliminarContacto);

module.exports = router;
