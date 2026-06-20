const { Schema, model } = require('mongoose');

const schemaEmpleado = new Schema({
  nombre:        { type: String, required: true, trim: true },
  email:         { type: String, lowercase: true, trim: true },
  telefono:      { type: String, trim: true },
  empresa:       { type: String, trim: true },
  id_empresa:    { type: String, required: true },
  salario:       { type: Number, min: 0 },
  puesto:        { type: String, trim: true },
  tipo_contrato: { type: String, trim: true },
  estatus:       { type: Boolean, default: true }
}, { timestamps: true });

schemaEmpleado.index({ id_empresa: 1 });

module.exports = model('empleados', schemaEmpleado);
