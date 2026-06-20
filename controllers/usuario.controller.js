const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');

const crearUsuario = async (req, res, next) => {
  try {
    const { nombre, email, telefono, role, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const usuario = new Usuario({ nombre, email, telefono, role, password: hash });
    await usuario.save();
    const { password: _, ...datos } = usuario.toObject();
    res.status(201).json({ ok: true, data: datos });
  } catch (err) {
    next(err);
  }
};

const obtenerUsuarios = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip  = (page - 1) * limit;

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(),
      Usuario.find({}, '-password').skip(skip).limit(limit)
    ]);

    res.json({ ok: true, data: usuarios, total, page, limit });
  } catch (err) {
    next(err);
  }
};

const obtenerUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id, '-password');
    if (!usuario) {
      return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
    }
    res.json({ ok: true, data: usuario });
  } catch (err) {
    next(err);
  }
};

const actualizarUsuario = async (req, res, next) => {
  try {
    const { nombre, email, telefono, role } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, telefono, role },
      { new: true, runValidators: true, select: '-password' }
    );
    if (!usuario) {
      return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
    }
    res.json({ ok: true, data: usuario });
  } catch (err) {
    next(err);
  }
};

const eliminarUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
    }
    res.json({ ok: true, data: { mensaje: 'Usuario eliminado correctamente' } });
  } catch (err) {
    next(err);
  }
};

module.exports = { crearUsuario, obtenerUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario };
