# Guia de Processamento de Webhooks n8n

**Caso de Uso**: Receber requisições HTTP de sistemas externos e processá-las instantaneamente.

---

## 🏗️ Estrutura do Padrão

```
Webhook → [Validar] → [Transformar] → [Ação] → [Resposta/Notificar]
```

**Característica Chave**: Processamento instantâneo orientado a eventos.

---

## 1. Nó Webhook (Gatilho)

**Objetivo**: Criar um endpoint HTTP para receber dados.

**Configuração Típica**:
*   **Caminho (Path)**: `caminho-do-webhook` (Ex: `https://n8n.exemplo.com/webhook/caminho-do-webhook`)
*   **Método HTTP**: `POST` (mais comum para envio de dados).
*   **Modo de Resposta**:
    *   `onReceived`: Responde imediatamente com 200 OK.
    *   `lastNode`: Espera o fim do workflow para enviar uma resposta personalizada.

**🚨 ATENÇÃO: ONDE ESTÁ O DADO?**
O erro mais comum é tentar acessar o dado diretamente. No nó Webhook, os dados estão sempre dentro de `$json.body`.
*   ❌ Incorreto: `{{ $json.email }}`
*   ✅ Correto: `{{ $json.body.email }}`

---

## 2. Validação (Recomendado)

**Objetivo**: Verificar se os dados recebidos são válidos antes de processar.

*   **Nó IF**: Verifique se campos obrigatórios existem.
*   **Nó Code**: Lógica de validação complexa ou verificação de assinaturas (ex: Stripe/GitHub).

---

## 3. Transformação

**Objetivo**: Mapear os dados do webhook para o formato desejado.

*   **Nó Set**: Para mapeamento simples de campos.
*   **Nó Code**: Para transformações complexas ou cálculos.

---

## 4. Resposta Personalizada

Se você definiu `responseMode: "lastNode"`, use o nó **Webhook Response** ao final do fluxo.

```javascript
{
  "statusCode": 200,
  "body": {
    "status": "sucesso",
    "mensagem": "Dados recebidos e processados corretamente."
  }
}
```

---

## 🛡️ Segurança

1.  **Token via Query**: Simples, mas menos seguro. Verifique `{{ $json.query.token }}`.
2.  **Chave na Header**: Mais seguro. Verifique `{{ $json.headers['x-api-key'] }}`.
3.  **Verificação de Assinatura**: O melhor método para webhooks oficiais (Stripe, GitHub, etc.). Use um nó **Code** para validar o HMAC.

---

## ✅ Checklist de Implementação

- [ ] Defini um caminho de webhook descritivo e único?
- [ ] Lembrei que os dados estão em `$json.body`?
- [ ] Configurei uma resposta (200 OK ou customizada)?
- [ ] Adicionei validação para campos obrigatórios?
- [ ] Implementei tratamento de erros para não deixar o chamador esperando para sempre (timeout)?
