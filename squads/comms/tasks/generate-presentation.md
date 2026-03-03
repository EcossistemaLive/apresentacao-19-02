# Task: Generate HTML Presentation
id: generate-presentation
agent: presentation-creator
trigger: /apresentacao

## Description
Recebe dados estruturados (ata de reunião, relatório, proposta, dados brutos) e gera uma apresentação HTML profissional seguindo o Sistema de Design Unificado V3 da Live Consultoria.

## Input
- Arquivo Markdown com conteúdo a ser apresentado (ata, relatório, proposta, etc.)

## Output
- Arquivo `.html` único (CSS e JS embutidos) pronto para abrir no navegador

## Steps
1. Classificar tipo de documento (Proposta, Dashboard, Relatório/Manual)
2. Refinar copy para tom profissional
3. Montar estrutura HTML com header fixo, seções com cards, footer © 2026
4. Implementar visuais com CSS puro (barras de progresso, tabelas estilizadas)
5. Revisão de UX (contraste, tipografia, verde vibrante nos destaques)

## Command
```bash
node .aios-core/scripts/run-prompt.js .aios-core/prompts/presentation-creator.md <input.md> -o <output.html>
```
