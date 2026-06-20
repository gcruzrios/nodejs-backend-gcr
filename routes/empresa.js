const router = require('express').Router();
const { body } = require('express-validator');
const { verificarToken } = require('../middlewares/auth');
const { validar } = require('../middlewares/validar');
const ctrl = require('../controllers/empresa.controller');

const validarCrear = [
  body('nombre').notEmpty().trim().withMessage('Nombre requerido'),
  validar
];

router.post('/',       validarCrear,   ctrl.crearEmpresa);
router.get('/',        verificarToken, ctrl.obtenerEmpresas);
router.get('/:id',     verificarToken, ctrl.obtenerEmpresa);
router.put('/:id',     verificarToken, ctrl.actualizarEmpresa);
router.delete('/:id',  verificarToken, ctrl.eliminarEmpresa);

module.exports = router;
