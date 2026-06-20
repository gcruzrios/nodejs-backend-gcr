// Este archivo se mantiene por compatibilidad. La conexión principal es config/db.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_CNN);
}

const objetodb = mongoose.connection;

objetodb.on('connected', () => { console.log('Conexión correcta a DB'); });
objetodb.on('error', () => { console.log('Error en la conexión a DB'); });

module.exports = mongoose;