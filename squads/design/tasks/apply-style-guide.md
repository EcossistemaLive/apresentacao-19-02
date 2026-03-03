# Task: Apply Style Guide (Live Consultoria)
id: apply-style-guide
trigger: /design-check [arquivo]

## Description
Verifica se um documento HTML gerado para a Live Consultoria segue integralmente o Sistema de Design Unificado V6.0.

## Validation Criteria
1. **Cores:** Usa tokens CSS corretos (`--live-deep`, `--live-accent`, `--live-glass`)
2. **Tipografia:** Poppins (interface) + Merriweather (analítico)
3. **Assets:** Logo e textura dos links oficiais GitHub
4. **Física:** Botões com spring-bounce, cards com halo hover
5. **Mobile:** Coluna única, abas horizontais, sem efeitos de mouse
6. **Rodapé:** `© 2026 Live Consultoria` + `₢ Powered by Cléber Donato`
7. **Performance:** Critical CSS inline, Lazy Loading ativo

## Output
Relatório de conformidade com indicação de OK / CORRIGIR para cada critério.
