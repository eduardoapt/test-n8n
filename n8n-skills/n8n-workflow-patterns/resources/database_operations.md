# Guia de Operações de Banco de Dados n8n

**Caso de Uso**: Ler, escrever, sincronizar e gerenciar dados em bancos de dados (Postgres, MySQL, MongoDB, etc.).

---

## 🏗️ Estrutura do Padrão

```
Trigger → [Consulta/Leitura] → [Transformar] → [Escrita/Atualização] → [Verificar]
```

**Característica Chave**: Persistência de dados e sincronização entre sistemas.

---

## 1. Gatilho (Trigger)

*   **Schedule**: Sincronização periódica ou manutenção (mais comum).
*   **Webhook**: Escritas baseadas em eventos (ex: novo pedido no site).
*   **Manual**: Operações únicas de migração ou limpeza.

---

## 2. Leitura e Consulta

Fórmulas para consultas eficientes:
*   **SEMPRE use LIMIT**: Evite carregar milhões de linhas de uma vez.
    *   `SELECT * FROM tabela LIMIT 1000`
*   **Filtros de Data**: Use para sincronização incremental.
    *   `SELECT * FROM tabela WHERE updated_at > $1`

---

## 🛡️ Segurança (CRÍTICO)

1.  **Parâmetros de Query (Prevenir SQL Injection)**:
    *   ❌ **NUNCA** concatene strings: `"SELECT * FROM users WHERE id = '{{ $json.id }}'"`
    *   ✅ **SEMPRE** use parâmetros: `query: "SELECT * FROM users WHERE id = $1"`, `parameters: ["{{ $json.id }}"]`.
2.  **Menor Privilégio**: Crie um usuário de banco de dados específico para o n8n com permissões limitadas apenas às tabelas necessárias.

---

## ⚡ Performance em Larga Escala

Se precisar processar milhares de registros:
*   **Split In Batches**: Divida o processamento em lotes (ex: 100 por vez).
*   **Escrita em Lote (Bulk Insert)**: O n8n permite enviar um array de objetos para os nós de banco de dados, realizando um único comando INSERT para múltiplos registros.

---

## 🔄 Transações

Para operações multi-etapa onde "tudo ou nada" deve ser aplicado:
1.  Inicie com um nó de query executando `BEGIN`.
2.  Execute suas operações (`INSERT`, `UPDATE`).
3.  Finalize com `COMMIT` ou, em caso de erro (usando um Error Trigger), execute `ROLLBACK`.

---

## ✅ Checklist de Banco de Dados

- [ ] Usei consultas parametrizadas ($1, $2) para evitar SQL Injection?
- [ ] Adicionei um `LIMIT` nas minhas consultas `SELECT`?
- [ ] O usuário do banco tem apenas as permissões necessárias?
- [ ] Se o volume for alto, usei o nó `Split In Batches`?
- [ ] Validei os dados (limpeza de strings, tipos de data) antes de escrever?
