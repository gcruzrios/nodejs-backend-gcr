const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ ok: false, error: err.message });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ ok: false, error: `El campo '${field}' ya está registrado` });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ ok: false, error: 'ID inválido' });
  }

  res.status(500).json({ ok: false, error: 'Error interno del servidor' });
};

module.exports = { errorHandler };
