const { Schema, model } = require('mongoose');

const schemaPais = new Schema({
  nombre:     { type: String, required: true, trim: true },
  continente: { type: String, trim: true }
}, { timestamps: true });

module.exports = model('pais', schemaPais);
