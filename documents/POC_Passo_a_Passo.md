# POC: Code Review Automatizado com IA e Notificação por Gmail

Este guia detalha como configurar sua Prova de Conceito (POC) usando as versões mais recentes dos nós do n8n (**HTTP Request v4.4** e **IF v2.3**), garantindo compatibilidade total com sua instância.

> [!IMPORTANT]
> **Plug-and-Play:** As chaves do **GitHub (PAT)** e do **Google Gemini** já estão embutidas no arquivo JSON para que você possa testar imediatamente sem configurar credenciais manuais nestes nós.

## 1. Preparação das Conexões

### A. Token do GitHub (Já no JSON)
O seu token `ghp_...` foi inserido no nó "Obter Diff via API GitHub". Ele permite que o n8n leia o conteúdo das suas Pull Requests de forma privada.

### B. Chave de API do Gemini (Já no JSON)
A chave gerada no Google AI Studio já está configurada no nó de análise. O fluxo utiliza o modelo `gemini-1.5-pro` com um prompt especializado em **Clean Architecture** e **DDD**.

### C. Conexão do Gmail e Google Chat
Usamos os nós nativos do Google (v2.2) para garantir uma integração fluida.
1. **Gmail:** No nó **"Gmail (Notificação)"**, selecione sua conta Google vinculada. O e-mail será enviado para `slynkon@gmail.com`.
2. **Google Chat:** No nó **"Google Chat (Notificação)"**, você precisará:
   *   Conectar sua conta Google Chat.
   *   Inserir a **ID do Space** (ou a ID do usuário para DM).
   *   *Dica:* Para pegar a ID de um Space, abra o Google Chat no navegador e copie o final da URL (ex: `spaces/AAAA...`).

---

## 2. Passo a Passo de Execução

### Passo 1: Importar o Fluxo
1. No n8n, clique em **Add Workflow** > menu lateral direito > **Import from File**.
2. Carregue o arquivo `n8n_code_review_poc.json`.

### Passo 2: Configurar o Webhook no GitHub
1. No n8n, abra o nó **"GitHub Webhook Trigger"**.
2. Copie a **Test URL** (ex: `https://seu-n8n.com/webhook-test/...`).
3. No seu repositório GitHub, vá em **Settings** > **Webhooks** > **Add webhook**.
4. **Payload URL:** Cole a URL do n8n.
5. **Content type:** `application/json`.
6. **Events:** Escolha **Let me select individual events** e marque apenas **Pull requests**.
7. Clique em **Add webhook**.

### Passo 3: Testar a Automação
1. No n8n, clique em **Execute Workflow** (o nó inicial ficará aguardando o evento).
2. No GitHub, crie uma nova branch, altere algum arquivo `.ts` e abra um **Pull Request**.
3. O n8n receberá o evento, baixará o código, o Gemini fará a revisão técnica e você receberá as notificações (Email + Chat) em instantes!

---

> [!NOTE]
> **Por que atualizar para v4.4?** Esta versão dos nós lida melhor com grandes volumes de dados (como diffs de código extensos) e possui uma estrutura de dados mais estável na saída, evitando erros de importação em versões recentes do n8n.
