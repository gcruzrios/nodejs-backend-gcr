const Pais = require('../models/pais.model');

const crearPais = async (req, res, next) => {
  try {
    const { nombre, continente } = req.body;
    const pais = new Pais({ nombre, continente });
    await pais.save();
    res.status(201).json({ ok: true, data: pais });
  } catch (err) {
    next(err);
  }
};

const obtenerPaises = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip  = (page - 1) * limit;

    const [total, paises] = await Promise.all([
      Pais.countDocuments(),
      Pais.find().skip(skip).limit(limit)
    ]);

    res.json({ ok: true, data: paises, total, page, limit });
  } catch (err) {
    next(err);
  }
};

const obtenerPais = async (req, res, next) => {
  try {
    const pais = await Pais.findById(req.params.id);
    if (!pais) {
      return res.status(404).json({ ok: false, error: 'País no encontrado' });
    }
    res.json({ ok: true, data: pais });
  } catch (err) {
    next(err);
  }
};

const actualizarPais = async (req, res, next) => {
  try {
    const { nombre, continente } = req.body;
    const pais = await Pais.findByIdAndUpdate(
      req.params.id,
      { nombre, continente },
      { new: true, runValidators: true }
    );
    if (!pais) {
      return res.status(404).json({ ok: false, error: 'País no encontrado' });
    }
    res.json({ ok: true, data: pais });
  } catch (err) {
    next(err);
  }
};

const eliminarPais = async (req, res, next) => {
  try {
    const pais = await Pais.findByIdAndDelete(req.params.id);
    if (!pais) {
      return res.status(404).json({ ok: false, error: 'País no encontrado' });
    }
    res.json({ ok: true, data: { mensaje: 'País eliminado correctamente' } });
  } catch (err) {
    next(err);
  }
};

module.exports = { crearPais, obtenerPaises, obtenerPais, actualizarPais, eliminarPais };
