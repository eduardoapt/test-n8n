# Guia de Integração de APIs HTTP n8n

**Caso de Uso**: Buscar dados de APIs REST, transformá-los e utilizá-los no seu fluxo de trabalho.

---

## 🏗️ Estrutura do Padrão

```
Gatilho → HTTP Request → [Transformar] → [Ação] → [Tratamento de Erros]
```

**Característica Chave**: Busca de dados externos com tratamento robusto de falhas.

---

## 1. Gatilho (Trigger)

*   **Schedule**: Busca periódica (ex: a cada 1 hora).
*   **Webhook**: Disparado por um evento externo.
*   **Manual**: Execução sob demanda para testes.

---

## 2. Nó HTTP Request

**Objetivo**: Chamar APIs REST externas.

**Configuração Típica**:
*   **Método**: `GET`, `POST`, `PUT`, `DELETE`.
*   **URL**: `https://api.exemplo.com/recurso`.
*   **Autenticação**: Use o sistema de **Credentials** do n8n (Header Auth, Basic Auth, OAuth2).
*   **Parâmetros**:
    *   `Query Parameters`: Para filtros e paginação no GET.
    *   `Body`: Para envio de dados no POST/PUT (geralmente JSON).

---

## 3. Paginação

Se a API retornar muitos dados, você precisará de um loop de paginação:
1.  **Offset/Page**: Incrementar um contador a cada chamada.
2.  **Cursor**: Usar um token retornado pela API para buscar a próxima página.

---

## 🛡️ Segurança e Autenticação

1.  **NUNCA** escreva chaves de API diretamente nos parâmetros.
2.  Use **Predefined Credential Type** para que o n8n gerencie a renovação de tokens (especialmente importante para OAuth2).
3.  **HTTPS**: Sempre utilize endpoints seguros.

---

## ⚠️ Tratamento de Erros

APIs podem falhar (limite de taxa, erro 500, rede).
*   **`continueOnFail: true`**: Permite que o workflow continue mesmo se a chamada falhar, para que você possa tratar o erro com um nó **IF**.
*   **Retry on Fail**: Configure o nó para tentar novamente automaticamente em caso de falhas temporárias de rede.

---

## ✅ Checklist de Integração

- [ ] Testei a API fora do n8n (ex: Postman/Curl) primeiro?
- [ ] Usei o sistema de Credenciais do n8n?
- [ ] Configurei o nó para lidar com erros (`continueOnFail`)?
- [ ] Se a resposta for uma lista grande, implementei paginação?
- [ ] Verifiquei se os cabeçalhos (`headers`) necessários (ex: `Content-Type: application/json`) estão presentes?
