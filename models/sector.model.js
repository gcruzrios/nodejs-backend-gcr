const { Schema, model } = require('mongoose');

const schemaSector = new Schema({
  nombre:      { type: String, required: true, trim: true },
  descripcion: { type: String, trim: true }
}, { timestamps: true });

module.exports = model('sector', schemaSector);
