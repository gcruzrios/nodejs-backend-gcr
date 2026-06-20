const router = require('express').Router();
const { body } = require('express-validator');
const { verificarToken } = require('../middlewares/auth');
const { validar } = require('../middlewares/validar');
const ctrl = require('../controllers/sector.controller');

const validarCrear = [
  body('nombre').notEmpty().trim().withMessage('Nombre requerido'),
  validar
];

router.post('/',       validarCrear,   ctrl.crearSector);
router.get('/',        verificarToken, ctrl.obtenerSectores);
router.get('/:id',     verificarToken, ctrl.obtenerSector);
router.put('/:id',     verificarToken, ctrl.actualizarSector);
router.delete('/:id',  verificarToken, ctrl.eliminarSector);

module.exports = router;
