require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { conectarDB } = require('./config/db');
const { errorHandler } = require('./middlewares/error');

const app = express();

conectarDB();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/auth',      require('./routes/auth'));
app.use('/api/usuarios',  require('./routes/usuario'));
app.use('/api/contactos', require('./routes/contacto'));
app.use('/api/empresas',  require('./routes/empresa'));
app.use('/api/sectores',  require('./routes/sector'));
app.use('/api/paises',    require('./routes/pais'));
app.use('/api/empleados', require('./routes/empleado'));

app.get('/', (req, res) => {
  res.json({ ok: true, mensaje: 'API NodeJS funcionando correctamente' });
});

app.use(errorHandler);

module.exports = app;
