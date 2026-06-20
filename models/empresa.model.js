const { Schema, model } = require('mongoose');

const schemaEmpresa = new Schema({
  nombre:   { type: String, required: true, trim: true },
  email:    { type: String, lowercase: true, trim: true },
  telefono: { type: String, trim: true },
  pais:     { type: String, trim: true },
  sector:   { type: String, trim: true }
}, { timestamps: true });

module.exports = model('empresa', schemaEmpresa);
