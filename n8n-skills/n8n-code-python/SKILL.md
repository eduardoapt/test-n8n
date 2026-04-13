---
name: n8n-codigo-python
description: Orientação especializada para escrita de código Python em nós Code do n8n (com ressalvas). Use ao escrever código Python, acessar dados de entrada (_input), formatar objetos de retorno ([{'json': {...}}]) ou determinar o melhor modo de execução (All Items vs Each Item). Também use ao comparar Python vs JavaScript no n8n.
---

# Expert em Código Python n8n

Guia para escrita de scripts em Python no nó **Code** do n8n.

---

## ⚠️ Leia Antes de Usar (Python vs JS)

O n8n suporta Python, mas com limitações importantes:
*   **Sem Bibliotecas Externas**: Você **NÃO** pode usar `pandas`, `requests`, `numpy` ou qualquer outra biblioteca que não faça parte da biblioteca padrão do Python.
*   **JS é Preferível**: Para 90% das tarefas (manipulação de JSON, chamadas de API), o JavaScript é mais fluido e possui melhores helpers integrados no n8n.

Use Python apenas se tiver uma lógica de processamento de strings ou algoritmos matemáticos complexos que você já possui escritos em Python.

---

## 🏗️ Estrutura de Retorno (OBRIGATÓRIO)

O retorno deve ser uma lista de dicionários com a chave `json`.

```python
# ✅ Correto: Retornando um único item
return [{
  "json": {
    "resultado": "sucesso",
    "dados": { "id": 1 }
  }
}]

# ✅ Correto: Retornando múltiplos itens
return [
  { "json": { "id": 1 } },
  { "json": { "id": 2 } }
]
```

---

## 🔍 Acessando Dados

*   **Entradas**: `_input.all()`, `_input.item.json.campo`.
*   **Outros Nós**: `_node["Nome"].json.campo`.
*   **Variáveis de Ambiente**: `_env["NOME_VAR"]`.

---

## 🛠️ Modos de Execução

1.  **Run Once for All Items (RECOMENDADO)**
    *   `data = _input.all()` retorna uma lista de todos os itens.
2.  **Run Once for Each Item**
    *   `item = _input.item` refere-se ao item atual sendo processado.

---

## 🛡️ Segurança e Performance

*   **Recursão**: Evite funções recursivas profundas para não estourar a memória.
*   **Tipagem**: Python no n8n é sensível a tipos. Se estiver transformando dados vindos de JSON, certifique-se de converter números (`int`/`float`) se necessário para cálculos.
*   **Sanitização**: Mesmas regras do JS — sanitize dados antes de passar para outros nós de escrita ou comunicação.

---

## ✅ Checklist de Código Python

- [ ] O retorno é uma lista no formato `[{ "json": { ... } }]`?
- [ ] Verifiquei se não estou tentando importar bibliotecas externas proibidas?
- [ ] Considerei se essa lógica seria mais simples em JavaScript?
- [ ] Escolhi o modo de execução correto?
- [ ] Tratei possíveis erros de tipos (`TypeError`) ao acessar chaves de dicionários?
