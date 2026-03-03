# 🧠 Gestor de Projeto (AIOS Consultant Agent)

Este projeto implementa um **Agente Consultor Inteligente** integrado ao Telegram, Google Drive e ferramentas de gestão (Next Fit/GitHub). O objetivo é atuar como um "Braço Direito" para consultoria estratégica, recrutamento e gestão de projetos.

## 🚀 Funcionalidades Principais

### 1. 🗣️ Interface Fluida (NLP Router)
O bot não depende mais de botões rígidos. Ele utiliza um "cérebro" (Router) para entender a intenção do usuário:
*   **Consultoria (C.R.A.F.T.):** "Estou com dúvida sobre a estratégia X..."
*   **Recrutamento:** "Analise este currículo..." (Suporte a PDF)
*   **Propostas:** "Crie uma proposta M.A.P.C.A para o cliente Y..."
*   **Status de Projetos:** "Como está o projeto da Casa Goianita?" (Busca em JSON e Drive)
*   **Documentos:** "Ache o contrato X no Drive"

### 2. 📂 RAG (Retrieval-Augmented Generation)
*   Integrado ao **Google Drive** para buscar documentos reais e usá-los como contexto.
*   Integrado ao **Google Calendar** para verificar agenda.
*   Base de Dados Local (`project_status.json`) para status oficiais de projetos (ex: Casa Goianita, Plur).

### 3. 📄 Análise de Currículos (PDF)
*   O bot aceita uploads de arquivos `.pdf`.
*   Extrai o texto automaticamente e envia para o Agente Recrutador analisar perfil, pontos fortes e gaps.

### 4. 🛡️ Protocolos de Qualidade
*   **Start Seguro:** Script `npm run bot` mata processos antigos (`taskkill`) para evitar duplicidade.
*   **Quality Gate:** Arquivo `QUALITY_GATE.md` define regras para deploy (UX, Segurança, Fluidez).

---

## 🛠️ Como Iniciar

### Pré-requisitos
*   Node.js 18+
*   Arquivo `.env` configurado com:
    *   `TELEGRAM_BOT_TOKEN`
    *   `GEMINI_API_KEY`
    *   `GOOGLE_APPLICATION_CREDENTIALS` (JSON Service Account)

### Comandos
*   **Iniciar Bot:**
    ```bash
    npm run bot
    ```
    *(Este comando mata processos 'node.exe' travados e inicia o bot limpo)*

---

## 📅 Log da Sessão (15/02/2026) -> "O Dia da Interface Fluida"

### ✅ O que foi feito hoje:
1.  **Atualização do Core:** Atualizamos o AIOS Core e corrigimos dependências do Next.js.
2.  **Fim dos Botões:** Substituímos o menu rígido por um **Router Inteligente** (`router.md`) que classifica intenções.
3.  **PDF Parsing:** Adicionamos a biblioteca `pdf-parse` para ler currículos diretamente no Telegram.
4.  **Base de Conhecimento:**
    *   Integração do Dashboard **Casa Goianita**.
    *   Integração do Dashboard **PLUR Movimento** (Status, Gaps, SOPs).
5.  **Correções Críticas:**
    *   **Duplicidade:** Criado script de auto-kill para evitar "bot duplo".
    *   **Crash de Startup:** Downgrade do `node-fetch` para v2 (compatibilidade CommonJS) e adição de timeouts na API.
    *   **Quality Gate:** Criação de protocolo para prevenir erros futuros.

### 🐛 Status Atual:
*   ⚠️ **Instável:** O bot apresenta erro de inicialização/execução (`fetch` vs `AbortController`). Necessário correção prioritária na próxima sessão.
*   Dependência `node-fetch` em v2 (CommonJS).
*   Interface (Router) implementada, mas pendente de validação final.

---
**Desenvolvido por:** Antigravity Agent & Cléber
