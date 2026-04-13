# Guia de Workflows de Agentes de IA n8n

**Caso de Uso**: Construir agentes de IA que podem usar ferramentas, acessar memória e realizar raciocínio multi-etapa.

---

## 🏗️ Estrutura do Padrão

```
Gatilho → Agente de IA (Modelo + Ferramentas + Memória) → [Processar Resposta] → Saída
```

**Característica Chave**: Tomada de decisão baseada em IA com uso dinâmico de ferramentas.

---

## 🔗 Tipos de Conexão de IA

O n8n usa portas de conexão específicas para IA:
1.  **ai_languageModel**: O cérebro (OpenAI, Anthropic, Gemini, etc.).
2.  **ai_tool**: Funções que o agente pode chamar (qualquer nó do n8n!).
3.  **ai_memory**: Contexto da conversa (Buffer, Window Buffer).
4.  **ai_vectorStore**: Para busca em documentos (RAG).

---

## 🛠️ Transformando QUALQUER Nó em Ferramenta

Este é o "superpoder" do n8n:
*   Conecte qualquer nó (HTTP Request, Postgres, Slack) na porta **ai_tool** do Agente de IA.
*   **Descrição da Ferramenta**: O campo mais importante. É aqui que você explica para a IA *quando* e *como* usar aquele nó.
    *   *Exemplo*: "Use esta ferramenta para buscar pedidos de clientes pelo e-mail. Retorna ID do pedido e status."

---

## 🧠 Memória e Contexto

*   **Window Buffer Memory**: Recomendado para a maioria dos casos. Mantém as últimas N mensagens da conversa.
*   **Session Key**: Use `{{ $json.body.sessionId }}` para garantir que cada usuário tenha sua própria memória isolada.

---

## 🛡️ Segurança (MUITO IMPORTANTE)

1.  **Acesso Somente Leitura**: Se der uma ferramenta de Banco de Dados para a IA, use um usuário de banco com permissão apenas de `SELECT`.
2.  **Validação de Input**: A IA pode tentar "alucinar" comandos SQL. Use nós intermediários para validar os parâmetros antes de executar a ferramenta.
3.  **Prompt de Sistema**: Defina limites claros. "Você é um assistente de suporte. Nunca execute comandos de deleção ou alteração de dados."

---

## ✅ Checklist de Agente de IA

- [ ] Conectei o modelo de linguagem (LLM) na porta correta?
- [ ] As descrições das ferramentas estão claras e concisas?
- [ ] Adicionei um nó de memória (`Window Buffer`) para manter o contexto?
- [ ] O prompt de sistema define claramente o que o agente PODE e NÃO PODE fazer?
- [ ] Testei o agente com perguntas fora do escopo para ver como ele reage?
- [ ] Configurei limites de tokens para evitar custos inesperados?
