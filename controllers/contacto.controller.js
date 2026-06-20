const Contacto = require('../models/contacto.model');

const crearContacto = async (req, res, next) => {
  try {
    const { nombre, email, telefono, empresa } = req.body;
    const contacto = new Contacto({ nombre, email, telefono, empresa });
    await contacto.save();
    res.status(201).json({ ok: true, data: contacto });
  } catch (err) {
    next(err);
  }
};

const obtenerContactos = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip  = (page - 1) * limit;

    const [total, contactos] = await Promise.all([
      Contacto.countDocuments(),
      Contacto.find().skip(skip).limit(limit)
    ]);

    res.json({ ok: true, data: contactos, total, page, limit });
  } catch (err) {
    next(err);
  }
};

const obtenerContacto = async (req, res, next) => {
  try {
    const contacto = await Contacto.findById(req.params.id);
    if (!contacto) {
      return res.status(404).json({ ok: false, error: 'Contacto no encontrado' });
    }
    res.json({ ok: true, data: contacto });
  } catch (err) {
    next(err);
  }
};

const actualizarContacto = async (req, res, next) => {
  try {
    const { nombre, email, telefono, empresa } = req.body;
    const contacto = await Contacto.findByIdAndUpdate(
      req.params.id,
      { nombre, email, telefono, empresa },
      { new: true, runValidators: true }
    );
    if (!contacto) {
      return res.status(404).json({ ok: false, error: 'Contacto no encontrado' });
    }
    res.json({ ok: true, data: contacto });
  } catch (err) {
    next(err);
  }
};

const eliminarContacto = async (req, res, next) => {
  try {
    const contacto = await Contacto.findByIdAndDelete(req.params.id);
    if (!contacto) {
      return res.status(404).json({ ok: false, error: 'Contacto no encontrado' });
    }
    res.json({ ok: true, data: { mensaje: 'Contacto eliminado correctamente' } });
  } catch (err) {
    next(err);
  }
};

module.exports = { crearContacto, obtenerContactos, obtenerContacto, actualizarContacto, eliminarContacto };
