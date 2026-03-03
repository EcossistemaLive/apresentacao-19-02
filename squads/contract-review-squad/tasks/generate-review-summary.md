---
task: generateReviewSummary()
responsavel: "Brief"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: structuredClauses
    tipo: file
    origen: "extractClauses() — cláusulas extraídas"
    obrigatorio: true
  - campo: riskReport
    tipo: file
    origen: "flagRisks() — relatório de riscos"
    obrigatorio: true
  - campo: complianceReport
    tipo: file
    origen: "enforcePlaybook() — relatório de compliance (opcional em quick review)"
    obrigatorio: false
  - campo: redlinedDocument
    tipo: file
    origen: "draftRedlines() — documento redlinado (opcional em quick review)"
    obrigatorio: false
  - campo: reviewMetadata
    tipo: object
    origen: "Pipeline — metadados da revisão (reviewer, data, versão)"
    obrigatorio: false

Saida:
  - campo: executiveSummary
    tipo: file
    destino: "executive-summary.md, stakeholders"
    persistido: true
  - campo: riskDashboard
    tipo: object
    destino: "risk-dashboard.json, stakeholders"
    persistido: true
  - campo: recommendations
    tipo: array
    destino: "executive-summary.md"
    persistido: true
  - campo: decisionMatrix
    tipo: object
    destino: "decision-matrix.json, stakeholders"
    persistido: true

Checklist:
  pre-conditions:
    - "[ ] Cláusulas estruturadas disponíveis"
    - "[ ] Risk report disponível"
  post-conditions:
    - "[ ] Sumário executivo gerado em linguagem acessível"
    - "[ ] Risk dashboard com dados quantitativos"
    - "[ ] Recomendações priorizadas e acionáveis"
    - "[ ] Decision matrix com opções claras"
  acceptance-criteria:
    - blocker: true
      criteria: "Sumário executivo compreensível por não-advogados"
    - blocker: true
      criteria: "Risk score total calculado e contextualizado"
    - blocker: true
      criteria: "Recomendação clara: aprovar / negociar / rejeitar"
    - blocker: false
      criteria: "Dashboard com visualização de riscos por categoria e severidade"

Performance:
  duration_expected: "5-10 minutos"
  cost_estimated: "~0 (processamento local)"
  cacheable: true
  parallelizable: false

Error Handling:
  strategy: retry
  retry:
    max_attempts: 2
    delay: "exponential(base=2s, max=15s)"
  fallback: "Gerar sumário parcial com dados disponíveis"
  notification: "summary-reporter"

Metadata:
  version: "1.0.0"
  dependencies:
    - extractClauses()
    - flagRisks()
  author: "contract-review-squad"
  created_at: "2026-02-24T00:00:00Z"
---

# Generate Review Summary

## Flow

```
1. Receber todos os outputs das fases anteriores
2. Consolidar dados: clauses + risks + compliance + redlines
3. Calcular métricas:
   a. Total risk score
   b. Riscos por categoria e severidade
   c. Compliance rate (approved vs total)
   d. Número de redlines propostas
4. Gerar sumário executivo
5. Construir risk dashboard
6. Formular recomendações priorizadas
7. Criar decision matrix
8. Produzir relatório final
```
