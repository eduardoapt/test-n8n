---
name: n8n-padroes-workflow
description: Padrões arquiteturais comprovados de workflows reais do n8n. Use ao criar novos workflows, projetar a estrutura do fluxo, escolher padrões arquiteturais ou perguntar sobre processamento de webhooks, integração de APIs HTTP, operações de banco de dados, fluxos de agentes de IA ou tarefas agendadas.
---

# Expert em Padrões de Workflow n8n

Arquiteturas e padrões comprovados para construir workflows n8n eficientes.

---

## 🏗️ Os 5 Padrões Principais

1.  **Processamento de Webhook** (Mais Comum)
    *   Receber requisição HTTP → Processar → Responder.
2.  **Integração de API HTTP**
    *   Buscar dados de APIs REST → Transformar → Armazenar/Usar.
3.  **Operações de Banco de Dados**
    *   Ler/Escrever/Sincronizar dados do banco.
4.  **Workflow de Agente de IA**
    *   Agentes de IA com ferramentas (`tools`) e memória.
5.  **Tarefas Agendadas** (Cron)
    *   Automações recorrentes (relatórios, limpezas).

---

## 🛠️ Blocos de Construção Comuns

*   **Gatilhos (Triggers)**: Webhook (instantâneo), Schedule (periódico), Manual.
*   **Fontes de Dados**: HTTP Request, Nós de Banco (Postgres, etc.), Nós de Serviço (Slack, Sheets).
*   **Transformação**: Set (mapeamento), Code (lógica complexa), IF/Switch (condicional), Merge (combinar).
*   **Saídas**: HTTP Request, Banco de Dados, Comunicação (Email, Slack, Discord).

---

## ⚡ Fluxo de Criação (Checklist)

### Fase de Planejamento
- [ ] Identifique o padrão (webhook, api, db, ai, cron).
- [ ] Liste os nós necessários (`search_nodes`).
- [ ] Mapeie o fluxo de dados (entrada → transforma → saída).

### Fase de Implementação
- [ ] Crie o workflow com o gatilho correto.
- [ ] Configure autenticação e credenciais (NUNCA coloque nomes/senhas em texto plano).
- [ ] Adicione nós de transformação e saída.
- [ ] Configure o tratamento de erros (Error Trigger ou Continue on Fail).

---

## 🛡️ Segurança e Performance

*   **Proteção de Webhook**: Para produção, use caminhos de webhook aleatórios e autenticação básica/token.
*   **Controle de Itens**: Cuidado com nós que processam cada item separadamente. Verifique a configuração de "Batch Size" se estiver lidando com milhares de linhas.
*   **Error Handler**: Sempre implemente um fluxo de erro para ser notificado se algo falhar no meio do caminho.

---

## 📂 Recursos Detalhados

Para guias aprofundados sobre cada padrão, consulte:
*   [Processamento de Webhooks](resources/webhook_processing.md)
*   [Integração de APIs HTTP](resources/http_api_integration.md)
*   [Operações de Banco de Dados](resources/database_operations.md)
*   [Workflows de Agentes de IA](resources/ai_agent_workflow.md)
*   [Tarefas Agendadas (Cron)](resources/scheduled_tasks.md)

---

## ✅ Checklist Final

- [ ] Escolhi o Gatilho correto?
- [ ] Validei a estrutura completa com `validate_workflow`?
- [ ] Testei com dados de exemplo antes de ativar?
- [ ] Configurei o fuso horário (Timezone) se for uma tarefa agendada?
- [ ] O fluxo de erro está configurado?
