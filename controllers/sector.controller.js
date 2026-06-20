const Sector = require('../models/sector.model');

const crearSector = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;
    const sector = new Sector({ nombre, descripcion });
    await sector.save();
    res.status(201).json({ ok: true, data: sector });
  } catch (err) {
    next(err);
  }
};

const obtenerSectores = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip  = (page - 1) * limit;

    const [total, sectores] = await Promise.all([
      Sector.countDocuments(),
      Sector.find().skip(skip).limit(limit)
    ]);

    res.json({ ok: true, data: sectores, total, page, limit });
  } catch (err) {
    next(err);
  }
};

const obtenerSector = async (req, res, next) => {
  try {
    const sector = await Sector.findById(req.params.id);
    if (!sector) {
      return res.status(404).json({ ok: false, error: 'Sector no encontrado' });
    }
    res.json({ ok: true, data: sector });
  } catch (err) {
    next(err);
  }
};

const actualizarSector = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;
    const sector = await Sector.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion },
      { new: true, runValidators: true }
    );
    if (!sector) {
      return res.status(404).json({ ok: false, error: 'Sector no encontrado' });
    }
    res.json({ ok: true, data: sector });
  } catch (err) {
    next(err);
  }
};

const eliminarSector = async (req, res, next) => {
  try {
    const sector = await Sector.findByIdAndDelete(req.params.id);
    if (!sector) {
      return res.status(404).json({ ok: false, error: 'Sector no encontrado' });
    }
    res.json({ ok: true, data: { mensaje: 'Sector eliminado correctamente' } });
  } catch (err) {
    next(err);
  }
};

module.exports = { crearSector, obtenerSectores, obtenerSector, actualizarSector, eliminarSector };
