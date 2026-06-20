const { Schema, model } = require('mongoose');

const schemaUsuario = new Schema({
  nombre:   { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  telefono: { type: String, trim: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });

module.exports = model('usuarios', schemaUsuario);
