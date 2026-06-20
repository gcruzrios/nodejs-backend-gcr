const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ ok: false, error: 'Credenciales incorrectas' });
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(401).json({ ok: false, error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre, role: usuario.role },
      process.env.SECRET_JWT_SEED,
      { expiresIn: '24h' }
    );

    res.json({
      ok: true,
      data: { nombre: usuario.nombre, id: usuario._id, role: usuario.role },
      token
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
