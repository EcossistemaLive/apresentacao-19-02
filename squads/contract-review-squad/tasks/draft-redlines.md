---
task: draftRedlines()
responsavel: "Quill"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: riskReport
    tipo: file
    origen: "flagRisks() — relatório de riscos"
    obrigatorio: true
  - campo: complianceReport
    tipo: file
    origen: "enforcePlaybook() — relatório de compliance"
    obrigatorio: true
  - campo: originalClauses
    tipo: file
    origen: "extractClauses() — cláusulas originais para referência"
    obrigatorio: true

Saida:
  - campo: redlinedDocument
    tipo: file
    destino: "redlined-document.md, summary-reporter"
    persistido: true
  - campo: changeLog
    tipo: array
    destino: "change-log.json, summary-reporter"
    persistido: true
  - campo: alternativeLanguage
    tipo: object
    destino: "alternative-language.json, summary-reporter"
    persistido: true

Checklist:
  pre-conditions:
    - "[ ] Risk report disponível (output de flagRisks)"
    - "[ ] Compliance report disponível (output de enforcePlaybook)"
    - "[ ] Cláusulas originais disponíveis para referência"
  post-conditions:
    - "[ ] Redlines geradas para todas as cláusulas flaggadas"
    - "[ ] Cada redline com rationale documentado"
    - "[ ] Linguagem alternativa em múltiplos níveis (preferred/alternative/minimum)"
    - "[ ] Change log completo com todas as modificações"
    - "[ ] Tracked changes markup consistente"
  acceptance-criteria:
    - blocker: true
      criteria: "Todas as cláusulas high/critical com redline proposta"
    - blocker: true
      criteria: "Cada redline com rationale explicando o motivo da mudança"
    - blocker: true
      criteria: "Linguagem alternativa juridicamente precisa"
    - blocker: false
      criteria: "Múltiplas opções de linguagem por cláusula (preferred, alternative, minimum)"

Performance:
  duration_expected: "10-20 minutos"
  cost_estimated: "~0 (processamento local)"
  cacheable: true
  parallelizable: false

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "exponential(base=2s, max=15s)"
  fallback: "Gerar redlines para cláusulas critical/high, listar medium para revisão manual"
  notification: "redline-drafter"

Metadata:
  version: "1.0.0"
  dependencies:
    - flagRisks()
    - enforcePlaybook()
    - extractClauses()
  author: "contract-review-squad"
  created_at: "2026-02-24T00:00:00Z"
---

# Draft Redlines

## Flow

```
1. Receber risk report, compliance report e cláusulas originais
2. Consolidar lista de cláusulas que precisam de redline
3. Priorizar por severidade (critical > high > medium > low)
4. Para cada cláusula flaggada:
   a. Analisar o problema específico (risco e/ou desvio de playbook)
   b. Gerar linguagem alternativa preferred
   c. Gerar linguagem alternativa alternative
   d. Gerar linguagem alternativa minimum
   e. Criar tracked changes markup
   f. Escrever rationale
5. Compilar documento redlinado
6. Gerar change log completo
```

## Chains To

- `generateReviewSummary()` — Redlines e change log alimentam relatório executivo
