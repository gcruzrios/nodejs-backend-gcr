const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log('Conexión correcta a DB');
  } catch (err) {
    console.error('Error en la conexión a DB:', err.message);
    process.exit(1);
  }
};

module.exports = { conectarDB };
