# Task: Generate Meeting Minutes
id: generate-minutes
agent: secretary
trigger: /ata

## Description
Recebe uma transcrição de reunião (texto bruto ou arquivo .md) e gera uma Ata de Reunião formal seguindo o protocolo de governança corporativa.

## Input
- Transcrição de reunião em texto ou arquivo Markdown

## Output
- Arquivo `.md` com ata estruturada (Cabeçalho, Pauta, Hierarquia, Deliberações, Plano 5W2H, Pontos de Atenção)

## Steps
1. Extrair lista de presença e hierarquia
2. Identificar pautas discutidas
3. Registrar deliberações e votações
4. Gerar plano de ação 5W2H
5. Listar pontos de incerteza para revisão humana
6. **Auto-trigger:** Gerar apresentação HTML (Seção 7 do prompt)

## Command
```bash
node .aios-core/scripts/run-prompt.js .aios-core/prompts/secretary-minutes.md <input> -o <output.md>
```
