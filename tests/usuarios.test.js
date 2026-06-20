const request = require('supertest');
const jwt = require('jsonwebtoken');

jest.mock('../config/db', () => ({ conectarDB: jest.fn() }));
jest.mock('../models/usuario.model');

const Usuario = require('../models/usuario.model');
const app = require('../server');

const token = jwt.sign(
  { id: 'abc123', nombre: 'Admin', role: 'admin' },
  process.env.SECRET_JWT_SEED
);

describe('GET /api/usuarios', () => {
  it('debe retornar 401 sin token', async () => {
    const res = await request(app).get('/api/usuarios');
    expect(res.statusCode).toBe(401);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toBe('Token requerido');
  });

  it('debe retornar lista de usuarios con token válido', async () => {
    Usuario.countDocuments.mockResolvedValue(2);
    Usuario.find.mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([
        { _id: '1', nombre: 'Ana', email: 'ana@test.com', role: 'user' },
        { _id: '2', nombre: 'Luis', email: 'luis@test.com', role: 'admin' }
      ])
    });

    const res = await request(app)
      .get('/api/usuarios')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.total).toBe(2);
  });
});

describe('POST /api/usuarios', () => {
  it('debe crear un usuario con datos válidos', async () => {
    Usuario.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(),
      toObject: jest.fn().mockReturnValue({
        _id: 'new123',
        nombre: 'Nuevo Usuario',
        email: 'nuevo@test.com',
        role: 'user',
        password: 'hashed'
      })
    }));

    const res = await request(app)
      .post('/api/usuarios')
      .send({
        nombre: 'Nuevo Usuario',
        email: 'nuevo@test.com',
        telefono: '12345678',
        password: 'password123',
        role: 'user'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.data.password).toBeUndefined();
  });

  it('debe retornar 400 si falta el nombre', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .send({ email: 'test@test.com', password: 'pass123' });

    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
  });

  it('debe retornar 400 si el password tiene menos de 6 caracteres', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .send({ nombre: 'Test', email: 'test@test.com', password: '123' });

    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
  });
});

describe('Middleware de token inválido', () => {
  it('debe retornar 401 con token malformado', async () => {
    const res = await request(app)
      .get('/api/usuarios')
      .set('Authorization', 'Bearer token_invalido');

    expect(res.statusCode).toBe(401);
    expect(res.body.ok).toBe(false);
    expect(res.body.error).toBe('Token inválido o expirado');
  });
});
