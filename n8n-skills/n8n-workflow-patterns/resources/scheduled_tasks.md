# Guia de Tarefas Agendadas (Cron) n8n

**Caso de Uso**: Automações que precisam rodar sozinhas em horários específicos (relatórios, backups, limpezas).

---

## 🏗️ Estrutura do Padrão

```
Schedule Trigger → [Buscar Dados] → [Processar] → [Entregar] → [Log/Notificar]
```

**Característica Chave**: Execução automática baseada no tempo.

---

## 1. Nó Schedule (Gatilho)

O n8n oferece três modos principais de agendamento:
1.  **Interval**: Executa a cada X minutos/horas/dias.
2.  **Days & Hours**: Dias e horários específicos (Ex: toda segunda às 09:00).
3.  **Cron (Avançado)**: Expressões complexas.
    *   *Exemplo*: `0 9 * * 1-5` (Toda segunda a sexta às 09:00).

---

## 🌍 Fuso Horário (Timezone)

Um erro comum é ignorar o fuso horário.
*   **SEMPRE** configure o `Timezone` nas configurações do seu workflow no n8n.
*   Isso garante que o agendamento respeite o horário local (incluindo horário de verão).

---

## 🛡️ Tratamento de Sobreposições

Se o seu processo demora 10 minutos para rodar, mas você o agendou para cada 5 minutos, você terá execuções sobrepostas.
*   **Dica**: Use um nó de banco de dados ou Redis para criar uma "trava" (lock) no início do fluxo e liberá-la ao final.

---

## ⚠️ Monitoramento de Falhas

Como essas tarefas rodam "nos bastidores", você pode não perceber se elas falharem.
*   **Error Trigger**: Crie um workflow de erro que envie uma notificação para o Slack ou Email se a tarefa agendada falhar.
*   **Log de Execução**: Salve o resultado de cada execução em uma tabela de log para auditoria futura.

---

## ✅ Checklist de Tarefas Agendadas

- [ ] Escolhi o modo de agendamento correto (Intervalo ou Cron)?
- [ ] Configurei o Fuso Horário (Timezone) nas definições do workflow?
- [ ] O workflow possui tratamento de erros (Error Trigger)?
- [ ] Verifiquei se o tempo de execução é menor que o intervalo entre agendamentos?
- [ ] Adicionei um nó `Manual Trigger` para facilitar os testes?
- [ ] Ativei o workflow no painel do n8n (Ativação manual necessária)?
