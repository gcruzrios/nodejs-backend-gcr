const router = require('express').Router();
const { body } = require('express-validator');
const { verificarToken } = require('../middlewares/auth');
const { validar } = require('../middlewares/validar');
const ctrl = require('../controllers/pais.controller');

const validarCrear = [
  body('nombre').notEmpty().trim().withMessage('Nombre requerido'),
  validar
];

router.post('/',       validarCrear,   ctrl.crearPais);
router.get('/',        verificarToken, ctrl.obtenerPaises);
router.get('/:id',     verificarToken, ctrl.obtenerPais);
router.put('/:id',     verificarToken, ctrl.actualizarPais);
router.delete('/:id',  verificarToken, ctrl.eliminarPais);

module.exports = router;
