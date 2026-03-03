# Task: Generate Status Report
id: status-report
trigger: /pm-status

## Description
Gera um relatório consolidado de status do projeto, combinando dados do `project_status.json` local com informações do ClickUp (se conectado).

## Input
- `project_status.json` (raiz do projeto)
- Dados do ClickUp (opcional, via API)

## Output
- Relatório em Markdown com:
  - Resumo executivo
  - Tasks em progresso, concluídas e pendentes
  - Blockers e riscos
  - Próximos passos

## Steps
1. Ler `project_status.json`
2. Conectar ao ClickUp e buscar tasks do workspace (se API key configurada)
3. Consolidar dados locais + ClickUp
4. Gerar relatório formatado em Markdown
