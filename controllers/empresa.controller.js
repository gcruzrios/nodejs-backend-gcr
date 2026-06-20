const Empresa = require('../models/empresa.model');

const crearEmpresa = async (req, res, next) => {
  try {
    const { nombre, email, telefono, pais, sector } = req.body;
    const empresa = new Empresa({ nombre, email, telefono, pais, sector });
    await empresa.save();
    res.status(201).json({ ok: true, data: empresa });
  } catch (err) {
    next(err);
  }
};

const obtenerEmpresas = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip  = (page - 1) * limit;

    const [total, empresas] = await Promise.all([
      Empresa.countDocuments(),
      Empresa.find().skip(skip).limit(limit)
    ]);

    res.json({ ok: true, data: empresas, total, page, limit });
  } catch (err) {
    next(err);
  }
};

const obtenerEmpresa = async (req, res, next) => {
  try {
    const empresa = await Empresa.findById(req.params.id);
    if (!empresa) {
      return res.status(404).json({ ok: false, error: 'Empresa no encontrada' });
    }
    res.json({ ok: true, data: empresa });
  } catch (err) {
    next(err);
  }
};

const actualizarEmpresa = async (req, res, next) => {
  try {
    const { nombre, email, telefono, pais, sector } = req.body;
    const empresa = await Empresa.findByIdAndUpdate(
      req.params.id,
      { nombre, email, telefono, pais, sector },
      { new: true, runValidators: true }
    );
    if (!empresa) {
      return res.status(404).json({ ok: false, error: 'Empresa no encontrada' });
    }
    res.json({ ok: true, data: empresa });
  } catch (err) {
    next(err);
  }
};

const eliminarEmpresa = async (req, res, next) => {
  try {
    const empresa = await Empresa.findByIdAndDelete(req.params.id);
    if (!empresa) {
      return res.status(404).json({ ok: false, error: 'Empresa no encontrada' });
    }
    res.json({ ok: true, data: { mensaje: 'Empresa eliminada correctamente' } });
  } catch (err) {
    next(err);
  }
};

module.exports = { crearEmpresa, obtenerEmpresas, obtenerEmpresa, actualizarEmpresa, eliminarEmpresa };
