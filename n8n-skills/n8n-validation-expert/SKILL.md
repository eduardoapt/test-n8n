---
name: n8n-expert-validacao
description: Interpretador de erros de validação e guia para correções. Use ao encontrar erros de validação, avisos, falsos positivos, problemas de estrutura de operadores ou precisar de ajuda para entender resultados de validação. Também use ao perguntar sobre perfis de validação, tipos de erros ou o processo de loop de validação.
---

# Expert em Validação n8n

Guia especializado para interpretar e corrigir erros de validação no n8n.

---

## ⚡ Valide Cedo, Valide Sempre

A validação é tipicamente iterativa:
*   Espere loops de feedback (2-3 ciclos de valída → corrige → valída).
*   **Insight**: A validação é um processo, não um evento único!

---

## 🔍 Tipos de Problemas

### 1. Erros (Devem ser Corrigidos)
**Bloqueiam a execução** do workflow.
*   `missing_required` — Campo obrigatório ausente.
*   `invalid_value` — Valor não permitido.
*   `type_mismatch` — Tipo de dado errado (ex: string em campo de número).
*   `invalid_reference` — Nó referenciado não existe.
*   `invalid_expression` — Erro de sintaxe na expressão.

### 2. Avisos (Devem ser Considerados)
**Não bloqueiam a execução**, mas podem causar problemas.
*   `best_practice` — Sugestões de boas práticas.
*   `deprecated` — Uso de API/recurso antigo.
*   `performance` — Potenciais gargalos de processamento.

---

## 🛠️ Perfis de Validação

Escolha o perfil certo para cada fase:

*   **`minimal`** — Verificações rápidas durante a edição. (Campos obrigatórios básicos).
*   **`runtime` (RECOMENDADO)** — Para pré-implantação. (Tipos de valor, opções permitidas, dependências).
*   **`ai-friendly`** — Para configurações geradas por IA. Reduz falsos positivos e ruído.
*   **`strict`** — Para produção crítica. (Máxima segurança, melhores práticas, performance).

---

## 🛡️ Modelagem de Ameaças e Segurança

*   **Falhas de Webhook**: Valide se os webhooks possuem caminhos (`path`) únicos para evitar colisões.
*   **Segredos Expostos**: A validação `strict` avisará se segredos forem detectados fora de campos de credenciais.
*   **Sanitização Automática**: O servidor MCP corrige automaticamente estruturas de operadores (ex: adicionando `singleValue: true` para operadores unitários como `isEmpty`). Confie no sistema para essas correções estruturais.

---

## 🚀 Performance de Agente

*   **Leia Erros Completos**: As mensagens de erro geralmente contêm a "sugestão de correção". Use-as!
*   **Estratégia de Busca Binária**: Se um workflow inteiro falha na validação e você não sabe onde, remova metade dos nós e valide novamente até isolar o culpado.
*   **`n8n_autofix_workflow`**: Use esta ferramenta para corrigir automaticamente erros de formato de expressão ou versões de nós incompatíveis.

---

## ✅ Checklist de Validação

- [ ] O campo `valid` no resultado da validação é `true`?
- [ ] Corrigi todos os `errors` antes de olhar os `warnings`?
- [ ] Usei o perfil `runtime` para a validação final?
- [ ] No caso de erros de conexão (`invalid_reference`), verifiquei o nome exato do nó?
- [ ] Se houver muitos avisos de performance, apliquei limites (`limit`) ou paginação?
