---
name: n8n-configuracao-nos
description: Guia de configuração de nós baseado em operação. Use ao configurar nós, entender dependências de propriedades, determinar campos obrigatórios, escolher entre níveis de detalhe do get_node ou aprender padrões de configuração comuns por tipo de nó.
---

# Expert em Configuração de Nós n8n

Orientação especializada para configuração de nós baseada em operações e dependências de propriedades.

---

## 🏗️ Configuração Baseada em Operação

**Nem todos os campos são sempre obrigatórios** — depende da operação!

*   **Exemplo**: Nó do Slack
    *   Para `operation='post'`: Precisa de `channel` e `text`.
    *   Para `operation='update'`: Precisa de `messageId` e `text` (o `channel` não é obrigatório aqui!).

**DICA**: O par `Resource` + `Operation` determina quais campos finais aparecerão na interface (e na API).

---

## 🔗 Dependências de Propriedades

**Campos aparecem/desaparecem conforme os valores de outros campos.**

*   **Exemplo**: Nó HTTP Request
    *   Se `method='GET'`: Campo `body` não aparece.
    *   Se `method='POST'`: Ao definir `sendBody=true`, o campo `body` torna-se visível e obrigatório.

---

## 🔍 Descoberta Progressiva

Use o nível de detalhe certo para economizar tokens e tempo:

1.  **`get_node({detail: "standard"})`** — PADRÃO
    *   Visão rápida (1-2K tokens).
    *   Campos obrigatórios + opções comuns.
    *   **Use primeiro** — cobre 95% das necessidades.
2.  **`get_node({mode: "search_properties", propertyQuery: "..."})`**
    *   Encontre propriedades específicas pelo nome (ex: "auth", "body", "headers").
3.  **`get_node({detail: "full"})`**
    *   Esquema completo (3-8K tokens).
    *   Use apenas se `standard` não for suficiente.

---

## 🚀 Processo Recomendado

1.  **Identifique** o tipo de nó e a operação.
2.  Use **`get_node`** (detalhe standard é o padrão).
3.  Configure os campos obrigatórios.
4.  **Valide** a configuração com `validate_node`.
5.  Se um campo não estiver claro, use `mode: "search_properties"`.
6.  Adicione campos opcionais conforme necessário.
7.  **Valide novamente** e implante.

---

## ⚠️ Armadilhas Comuns & Casos Especiais

### 1. O Problema do "Nó Vazio" (Early Termination)
Nós de busca (como Google Drive `Search`, Airtable `Search`, SQL `Select`) retornam uma lista vazia `[]` se não encontrarem nada.
*   **O Erro**: O n8n interrompe o fluxo ali mesmo em vez de continuar e cair na rota "False" de um nó IF.
*   **A Solução**: Vá nas configurações do nó e ative a flag **`alwaysOutputData: true`**. Isso fará o nó entregar um `[{}]` vazio em vez de parar o fluxo, permitindo que os nós IF avaliem a inexistência dos dados.

### 2. Nomenclatura e Tipos de Nós Modernos (n8n v1+)
*   **Nós de LangChain / IA**: Devem utilizar o prefixo do pacote oficial instalado, geralmente `@n8n/n8n-nodes-langchain.*` (ex: `@n8n/n8n-nodes-langchain.chainSummarization`). Referências antigas causarão erro de _"Unrecognized node type"_.
*   **Operações de Search (Drive, Cloud)**: Recurso de busca frequentemente não está em `file` nem em `folder`, mas sim no recurso combinado **`fileOrFolder`** (ou `fileFolder`).

---

## 🛡️ Segurança e Performance

*   **Menos é Mais**: Não configure campos opcionais se não for usá-los. Isso torna o workflow mais limpo e rápido de carregar.
*   **Segurança de Credenciais**: Sempre verifique se a operação exige autenticação (`authentication != "none"`) e garanta que as credenciais corretas estão associadas ao nó.
*   **Validação Iterativa**: É normal errar na primeira tentativa. Deixe que os erros do `validate_node` guiem você para a configuração correta.

---

## ✅ Checklist de Configuração

- [ ] Defini primeiro o Resource e a Operation?
- [ ] Verifiquei se novos campos obrigatórios apareceram após mudar a operação?
- [ ] Usei o `validate_node` com o perfil `runtime`?
- [ ] Se o campo for uma expressão, usei a sintaxe `{{ }}`?
- [ ] O nó tem a credencial correta associada?
