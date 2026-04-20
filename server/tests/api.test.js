const request = require('supertest');
const fs = require('fs-extra');
const path = require('path');

const DB_PATH = path.join(__dirname, '../database.json');
const DB_BACKUP_PATH = path.join(__dirname, '../database.backup.json');

let app;

beforeAll(async () => {
    // Faz backup do banco real e usa um banco limpo para os testes
    const exists = await fs.pathExists(DB_PATH);
    if (exists) {
        await fs.copy(DB_PATH, DB_BACKUP_PATH);
    }
    await fs.writeJson(DB_PATH, { users: [] });

    app = require('../index');
});

afterAll(async () => {
    // Restaura o banco original após os testes
    const backupExists = await fs.pathExists(DB_BACKUP_PATH);
    if (backupExists) {
        await fs.copy(DB_BACKUP_PATH, DB_PATH);
        await fs.remove(DB_BACKUP_PATH);
    } else {
        await fs.writeJson(DB_PATH, { users: [] });
    }
});

beforeEach(async () => {
    await fs.writeJson(DB_PATH, { users: [] });
});

// -------------------------------------------------------------------
// Teste 1: Cadastro de novo usuário com sucesso
// -------------------------------------------------------------------
describe('POST /api/signup', () => {
    it('deve cadastrar um novo usuário e retornar 201', async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({ username: 'joao', password: '123456' });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Usuário cadastrado com sucesso');
    });

    // -------------------------------------------------------------------
    // Teste 2: Impedir cadastro de usuário duplicado
    // -------------------------------------------------------------------
    it('deve retornar 400 ao tentar cadastrar usuário já existente', async () => {
        await request(app)
            .post('/api/signup')
            .send({ username: 'joao', password: '123456' });

        const res = await request(app)
            .post('/api/signup')
            .send({ username: 'joao', password: 'outrasenha' });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Usuário já existe');
    });
});

// -------------------------------------------------------------------
// Teste 3: Login com credenciais corretas
// -------------------------------------------------------------------
describe('POST /api/login', () => {
    it('deve autenticar o usuário com credenciais corretas e retornar 200', async () => {
        await request(app)
            .post('/api/signup')
            .send({ username: 'maria', password: 'senha123' });

        const res = await request(app)
            .post('/api/login')
            .send({ username: 'maria', password: 'senha123' });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Login realizado');
        expect(res.body.user.username).toBe('maria');
    });

    // -------------------------------------------------------------------
    // Teste 4: Rejeitar login com credenciais inválidas
    // -------------------------------------------------------------------
    it('deve retornar 401 ao fazer login com senha incorreta', async () => {
        await request(app)
            .post('/api/signup')
            .send({ username: 'maria', password: 'senha123' });

        const res = await request(app)
            .post('/api/login')
            .send({ username: 'maria', password: 'senhaerrada' });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Credenciais inválidas');
    });
});
