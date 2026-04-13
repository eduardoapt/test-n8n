const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());

// Helper para ler o banco
const readDB = async () => {
    try {
        const data = await fs.readJson(DB_PATH);
        return data;
    } catch (err) {
        return { users: [] };
    }
};

// Helper para escrever no banco
const writeDB = async (data) => {
    await fs.writeJson(DB_PATH, data, { spaces: 2 });
};

// Rota de Cadastro
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    const db = await readDB();

    if (db.users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Usuário já existe' });
    }

    db.users.push({ username, password });
    await writeDB(db);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
});

// Rota de Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const db = await readDB();

    const user = db.users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    res.json({ message: 'Login realizado', user: { username } });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
