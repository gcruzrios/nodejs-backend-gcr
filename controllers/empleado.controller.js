const Empleado = require('../models/empleado.model');

const crearEmpleado = async (req, res, next) => {
  try {
    const { nombre, email, telefono, empresa, id_empresa, salario, puesto, tipo_contrato } = req.body;
    const empleado = new Empleado({ nombre, email, telefono, empresa, id_empresa, salario, puesto, tipo_contrato, estatus: true });
    await empleado.save();
    res.status(201).json({ ok: true, data: empleado });
  } catch (err) {
    next(err);
  }
};

const obtenerEmpleados = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip  = (page - 1) * limit;

    const filtro = {};
    if (req.query.id_empresa) filtro.id_empresa = req.query.id_empresa;

    const [total, empleados] = await Promise.all([
      Empleado.countDocuments(filtro),
      Empleado.find(filtro).skip(skip).limit(limit)
    ]);

    res.json({ ok: true, data: empleados, total, page, limit });
  } catch (err) {
    next(err);
  }
};

const obtenerEmpleado = async (req, res, next) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ ok: false, error: 'Empleado no encontrado' });
    }
    res.json({ ok: true, data: empleado });
  } catch (err) {
    next(err);
  }
};

const actualizarEmpleado = async (req, res, next) => {
  try {
    const { nombre, email, telefono, empresa, id_empresa, salario, puesto, tipo_contrato, estatus } = req.body;
    const empleado = await Empleado.findByIdAndUpdate(
      req.params.id,
      { nombre, email, telefono, empresa, id_empresa, salario, puesto, tipo_contrato, estatus },
      { new: true, runValidators: true }
    );
    if (!empleado) {
      return res.status(404).json({ ok: false, error: 'Empleado no encontrado' });
    }
    res.json({ ok: true, data: empleado });
  } catch (err) {
    next(err);
  }
};

const eliminarEmpleado = async (req, res, next) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleado) {
      return res.status(404).json({ ok: false, error: 'Empleado no encontrado' });
    }
    res.json({ ok: true, data: { mensaje: 'Empleado eliminado correctamente' } });
  } catch (err) {
    next(err);
  }
};

module.exports = { crearEmpleado, obtenerEmpleados, obtenerEmpleado, actualizarEmpleado, eliminarEmpleado };
