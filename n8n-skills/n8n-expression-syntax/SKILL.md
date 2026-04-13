---
name: n8n-sintaxe-expressoes
description: Orientação especializada para a sintaxe de expressões do n8n ({{ }}) e acesso a dados. Use ao escrever expressões, acessar dados de webhook ($json.body), referenciar outros nós ($node) ou solucionar erros de expressão.
---

# Expert em Sintaxe de Expressões n8n

Guia mestre para sintaxe de expressões do n8n ({{ }}) e padrões de acesso a dados.

---

## ⚡ Princípios Fundamentais

*   **Tudo dentro de `{{ }}` é JavaScript**: O n8n avalia o conteúdo entre as chaves como código JS.
*   **Prefixo `=`**: Campos de expressão devem começar com `=` (o n8n mcp lida com isso automaticamente na maioria das vezes).
*   **Encadeamento Opcional**: Use `?.` para evitar erros de "undefined" (ex: `{{ $json.body?.name }}`).

---

## 🔍 Padrões de Acesso a Dados

### 1. Dados do Nó Atual (`$json`)
Acessa os dados de entrada do nó atual.

*   **Padrão Geral**: `{{ $json.campo }}`
*   **🚨 ERRO COMUM (Webhook)**: Dados de Webhook estão sob `.body`!
    *   ❌ Incorreto: `{{ $json.email }}`
    *   ✅ Correto: `{{ $json.body.email }}`

### 2. Dados de Outros Nós (`$node` e `$()`)
Acessa a saída de um nó anterior específico pelo nome.

*   **Sintaxe Clássica**: `{{ $node["Nome do Nó"].json.campo }}` (útil para referenciar o primeiro item processado em lotes inteiros).
*   **Sintaxe Robusta (Item Atual)**: `{{ $('Nome do Nó').item.json.campo }}`
    *   *Por que usar?*: O n8n moderno lida melhor com essa sintaxe em workflows ramificados (ex: após nós condicional IF/Switch) porque força a leitura do item correlato correto, evitando herdar dados de nós errados.
*   **Exemplo**: `{{ $('Prepare Data').item.json.user_id }}`

---

## 🛠️ Funções Úteis

*   **Datas**: O n8n usa Luxon.
    *   `{{ $now }}` - Data/hora atual.
    *   `{{ $now.plus({ days: 1 }) }}` - Amanhã.
*   **Transformações**:
    *   `{{ $json.campo.toLower() }}` - Minúsculas.
    *   `{{ typeof $json.campo }}` - Verificar tipo.

---

## 🛡️ Modelagem de Ameaças e Segurança

*   **Injeção de Expressão**: Nunca confie cegamente em dados de entrada em expressões que executam lógica crítica.
*   **Exposição de Segredos**: Evite colocar credenciais ou tokens em expressões de texto plano. Use as credenciais do nó.
*   **Sanitização**: Se estiver construindo uma query SQL via expressão, prefira usar parâmetros do nó de banco de dados em vez de concatenar strings em uma expressão.

---

## 🚀 Dicas de Performance

*   **Mantenha Simples**: Expressões muito complexas são difíceis de depurar. Se precisar de lógica pesada, use um nó **Code**.
*   **Acesso Direto**: Em nós que processam muitos itens, evite referências a nós muito distantes no fluxo se puder passar o dado adiante via nós intermediários.

---

## ✅ Checklist de Validação

- [ ] A expressão está envolvida em `{{ }}`?
- [ ] Se for dados de Webhook, usei `$json.body`?
- [ ] O nome do nó em `$node["..."]` está exatamente igual ao nome no workflow?
- [ ] Usei `?.` para campos que podem ser nulos?
