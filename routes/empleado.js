const router = require('express').Router();
const { body } = require('express-validator');
const { verificarToken } = require('../middlewares/auth');
const { validar } = require('../middlewares/validar');
const ctrl = require('../controllers/empleado.controller');

const validarCrear = [
  body('nombre').notEmpty().trim().withMessage('Nombre requerido'),
  body('id_empresa').notEmpty().withMessage('id_empresa requerido'),
  validar
];

// GET /api/empleados?id_empresa=xxx para filtrar por empresa
router.post('/',       validarCrear,   ctrl.crearEmpleado);
router.get('/',        verificarToken, ctrl.obtenerEmpleados);
router.get('/:id',     verificarToken, ctrl.obtenerEmpleado);
router.put('/:id',     verificarToken, ctrl.actualizarEmpleado);
router.delete('/:id',  verificarToken, ctrl.eliminarEmpleado);

module.exports = router;
