const { Schema, model } = require('mongoose');

const schemaContacto = new Schema({
  nombre:   { type: String, required: true, trim: true },
  email:    { type: String, required: true, lowercase: true, trim: true },
  telefono: { type: String, trim: true },
  empresa:  { type: String, trim: true }
}, { timestamps: true });

module.exports = model('contactos', schemaContacto);
