# n8n Webhook Test Project

Este é um projeto simples de login para testar o gatilho de webhook do n8n.

## Como rodar localmente

### 1. Backend
```bash
cd server
npm install
node index.js
```
O servidor rodará em `http://localhost:3001`.

### 2. Frontend
```bash
cd client
npm install
npm run dev
```
O frontend rodará em `http://localhost:3000`.

## Como disparar o Webhook do n8n

1. Certifique-se de que o seu workflow n8n está em modo **"Listen for event"** (ou ativado).
2. Adicione esta pasta ao seu repositório Git.
3. Faça o `push` para o GitHub.
4. **Crie um Pull Request** no GitHub para a branch `main`.
5. O n8n deverá receber o evento e o Gemini fará o review automático deste código de login!
