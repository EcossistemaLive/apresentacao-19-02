---
task: flagRisks()
responsavel: "Vigil"
responsavel_type: Agente
atomic_layer: Molecule
elicit: false

Entrada:
  - campo: structuredClauses
    tipo: file
    origen: "extractClauses() — cláusulas extraídas e estruturadas"
    obrigatorio: true
  - campo: riskCriteria
    tipo: file
    origen: "Configuração de critérios de risco (opcional, usa defaults)"
    obrigatorio: false
  - campo: jurisdiction
    tipo: string
    origen: "Usuário ou extractClauses() (ex: BR, US, UK, EU)"
    obrigatorio: false

Saida:
  - campo: riskReport
    tipo: file
    destino: "risk-report.json, redline-drafter, summary-reporter"
    persistido: true
  - campo: flaggedClauses
    tipo: array
    destino: "flagged-clauses.json, redline-drafter"
    persistido: true
  - campo: totalRiskScore
    tipo: number
    destino: "summary-reporter"
    persistido: true

Checklist:
  pre-conditions:
    - "[ ] Cláusulas estruturadas disponíveis (output de extractClauses)"
    - "[ ] Tipo de contrato identificado"
  post-conditions:
    - "[ ] Cada cláusula analisada contra categorias de risco"
    - "[ ] Risk scores atribuídos (1-10) com justificativa"
    - "[ ] Riscos classificados por severidade (low/medium/high/critical)"
    - "[ ] Proteções ausentes identificadas"
    - "[ ] Total risk score calculado"
  acceptance-criteria:
    - blocker: true
      criteria: "Todas as cláusulas analisadas — nenhuma ignorada"
    - blocker: true
      criteria: "Cada risco com score, categoria e justificativa"
    - blocker: true
      criteria: "Riscos critical destacados com prioridade"
    - blocker: false
      criteria: "Sugestões de mitigação para cada risco high/critical"

Performance:
  duration_expected: "5-15 minutos"
  cost_estimated: "~0 (processamento local)"
  cacheable: true
  parallelizable: false

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "exponential(base=2s, max=15s)"
  fallback: "Gerar relatório parcial com cláusulas analisadas até o ponto de falha"
  notification: "risk-flagger"

Metadata:
  version: "1.0.0"
  dependencies:
    - extractClauses()
  author: "contract-review-squad"
  created_at: "2026-02-24T00:00:00Z"
---

# Flag Risks

## Flow

```
1. Receber cláusulas estruturadas de extractClauses()
2. Carregar critérios de risco (default ou customizados)
3. Para cada cláusula:
   a. Analisar contra categorias de risco (financial, operational, legal, IP, data)
   b. Identificar termos desfavoráveis
   c. Verificar proteções ausentes
   d. Atribuir risk score (1-10)
   e. Classificar severidade (low/medium/high/critical)
   f. Documentar justificativa
4. Calcular total risk score ponderado
5. Gerar risk report estruturado
```

## Chains To

- `draftRedlines()` — Cláusulas flaggadas alimentam geração de redlines
