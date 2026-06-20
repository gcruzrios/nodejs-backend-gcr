const request = require('supertest');
const bcrypt = require('bcryptjs');

jest.mock('../config/db', () => ({ conectarDB: jest.fn() }));
jest.mock('../models/usuario.model');

const Usuario = require('../models/usuario.model');
const app = require('../server');

describe('POST /api/auth/login', () => {
  it('debe retornar token con credenciales válidas', async () => {
    const hash = await bcrypt.hash('password123', 10);
    Usuario.findOne.mockResolvedValue({
      _id: 'abc123',
      nombre: 'Test User',
      email: 'test@test.com',
      password: hash,
      role: 'user'
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.data.nombre).toBe('Test User');
  });

  it('debe retornar 401 cuando el usuario no existe', async () => {
    Usuario.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'noexiste@test.com', password: 'password123' });

    expect(res.statusCode).toBe(401);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toBe('Credenciales incorrectas');
  });

  it('debe retornar 401 con contraseña incorrecta', async () => {
    const hash = await bcrypt.hash('correcta', 10);
    Usuario.findOne.mockResolvedValue({
      _id: 'abc123',
      nombre: 'Test User',
      email: 'test@test.com',
      password: hash,
      role: 'user'
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'incorrecta' });

    expect(res.statusCode).toBe(401);
    expect(res.body.ok).toBe(false);
  });

  it('debe retornar 400 si el email tiene formato inválido', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'no-es-un-email', password: '123456' });

    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.errors).toBeDefined();
  });

  it('debe retornar 400 si faltan campos requeridos', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com' });

    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
  });
});
