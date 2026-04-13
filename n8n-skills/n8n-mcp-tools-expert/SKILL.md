---
name: n8n-expert-ferramentas-mcp
description: Orientação especializada para o uso das ferramentas MCP de n8n. Use ao construir workflows com ferramentas MCP, descobrir nós, validar configurações, gerenciar ativação/desativação de workflows ou perguntar sobre operações específicas de ferramentas como search_nodes, get_node, validate_node e n8n_update_partial_workflow.
---

# Expert em Ferramentas MCP n8n

Guia mestre para o uso eficiente das ferramentas do servidor MCP (`n8n-mcp`).

---

## 🛠️ Ferramentas Principais

### 🔍 Descoberta de Nós
*   **`search_nodes({query: "..."})`**: Comece sempre por aqui para encontrar o nó certo.
    *   *Exemplo*: `search_nodes({query: "google sheets"})`.
*   **`get_node({nodeType: "..."})`**: Use para entender o que um nó específico pode fazer.
    *   **DICA**: O detalhe padrão (`standard`) cobre 95% das necessidades. Use `detail: "full"` apenas se precisar do esquema completo.

### ✅ Validação
*   **`validate_node`**: Valide a configuração de um nó individual antes de aplicá-la.
    *   Use o perfil `runtime` para validação pré-implantação.
*   **`validate_workflow`**: Valide a estrutura completa do workflow (conexões + nós).

### 🚀 Gerenciamento de Workflows
*   **`n8n_create_workflow`**: Crie um novo fluxo a partir de um objeto de definição.
*   **`n8n_update_partial_workflow`**: A ferramenta mais potente para atualizar partes de um workflow sem sobrescrever tudo.
    *   Use `patchNodeField` para correções cirúrgicas em campos grandes (ex: código JS extenso).

---

## ⚡ Fluxo de Trabalho Recomendado

1.  **PLANEJAR**: Entenda a necessidade do usuário.
2.  **DESCOBRIR**: Use `search_nodes` para encontrar os nós.
3.  **CONFIGURAR**: Obtenha os detalhes com `get_node`.
4.  **VALIDAR**: Use `validate_node` recursivamente até o nó estar pronto.
5.  **CRIAR/ATUALIZAR**: Aplique as mudanças no workflow.
6.  **ATIVAR**: Use `activateWorkflow` para colocar o fluxo em produção.

---

## 🛡️ Segurança por Padrão

*   **Menor Privilégio**: Ao pesquisar por modelos ou nós, prefira opções oficiais da base do n8n (`nodes-base`).
*   **Sanitização Automática**: O servidor MCP sanitiza automaticamente estruturas de operadores em nós IF/Switch. Confie na automação e não tente "corrigir" estruturas complexas que o sistema já valida.
*   **Secrets**: Nunca salve chaves de API diretamente em parâmetros de texto. Use a ferramenta de credenciais se disponível ou os campos de credencial do nó.

---

## 🚀 Performance de Agente

*   **Evite Respostas Gigantes**: Não peça `detail: "full"` no `get_node` se quiser apenas saber os campos obrigatórios. Isso economiza até 6.000 tokens por chamada!
*   **Iteração Rápida**: É normal demorar 2-3 ciclos de `validate_node` até acertar todos os campos obrigatórios de um nó complexo (como Slack ou HTTP Request).

---

## ✅ Checklist de Ferramentas

- [ ] Usei `search_nodes` antes de assumir o nome do nó?
- [ ] Validei o nó (`validate_node`) antes de salvá-lo?
- [ ] Se o nó tiver recursos/operações (ex: Slack), verifiquei se os campos mudaram conforme a operação escolhida?
- [ ] O workflow está ativo (`activateWorkflow`)?
