# Task: Review External Document
id: review-external
trigger: /design-review [arquivo]

## Description
Audita documentos gerados por outros squads fora do contexto da Live Consultoria, aplicando critérios universais de design e UX.

## Validation Criteria
1. **Consistência Visual:** Paleta coerente, sem cores conflitantes
2. **Hierarquia:** Títulos, subtítulos e corpo com peso visual correto
3. **Legibilidade:** Linhas com máx 75 caracteres, contraste adequado
4. **Responsividade:** Layout funciona em mobile (320px+)
5. **Acessibilidade:** Contraste WCAG AA, Focus Visible, alt-text em imagens
6. **Performance:** Sem bibliotecas pesadas desnecessárias

## Output
Relatório de revisão com sugestões de melhoria categorizadas por severidade (Crítico / Importante / Sugestão).
