---
name: n8n-codigo-javascript
description: Orientação especializada para escrita de código JavaScript em nós Code do n8n. Use ao escrever código JS, acessar dados de entrada ($input), formatar objetos de retorno ({json: {...}}) ou determinar o melhor modo de execução (All Items vs Each Item).
---

# Expert em Código JavaScript n8n

Melhores práticas para escrever scripts eficientes em nós **Code** do n8n.

---

## ⚡ Modos de Execução

1.  **Run Once for All Items (RECOMENDADO)**
    *   Executa uma única vez para todos os dados de entrada.
    *   Ideal para: Agregações, filtros complexos e performance.
    *   *Acesso*: `$input.all()` retorna um array de objetos.
2.  **Run Once for Each Item**
    *   Executa o script repetidamente para cada item individual.
    *   Ideal para: Lógicas simples aplicadas a cada linha separadamente.
    *   *Acesso*: `$input.item` refere-se ao item atual.

---

## 🏗️ Estrutura de Retorno (OBRIGATÓRIO)

O n8n exige que o retorno seja sempre um array de objetos com a chave `json`.

```javascript
// ✅ Correto: Retornando um único item
return [{
  json: {
    resultado: "sucesso",
    dados: { id: 1 }
  }
}];

// ✅ Correto: Retornando múltiplos itens
return [
  { json: { id: 1 } },
  { json: { id: 2 } }
];
```

---

## 🔍 Acessando Dados

*   **Entradas**: `$input.all()`, `$input.item.json.campo`.
*   **Outros Nós**: `$node["Nome"].json.campo`.
*   **Variáveis de Ambiente**: `$env.NOME_VAR`.

---

## 🛠️ Helpers e Bibliotecas

*   **Luxon**: Pré-carregada para manipulação de datas.
    *   `DateTime.now().toLocaleString()`
*   **Acesso a Binários**:
    *   `$input.item.binary.data_campo`

---

## 🛡️ Segurança e Performance

*   **Evite Loops Infinitos**: Cuidado com recursão ou loops complexos sem condição de saída clara.
*   **Sanitização**: Ao construir strings para outros nós (ex: SQL), sanitize os dados de entrada.
*   **Batching**: Se estiver processando milhares de itens, prefira o modo "All Items" e use métodos de array nativos (`map`, `filter`, `reduce`) para performance.

---

## ✅ Checklist de Código JS

- [ ] O retorno está no formato `[{ json: { ... } }]`?
- [ ] Escolhi o modo de execução correto (All Items vs Each Item)?
- [ ] Usei o encadeamento opcional (`?.`) para evitar erros de campos nulos?
- [ ] Se o código for longo, comentei as partes principais para facilitar a manutenção?
- [ ] Testei o fluxo com pelo menos um item de entrada real?
