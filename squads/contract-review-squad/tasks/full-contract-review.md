---
task: fullContractReview()
responsavel: "Brief"
responsavel_type: Agente
atomic_layer: Page
elicit: true

Entrada:
  - campo: contractDocument
    tipo: file
    origen: "Usuário (PDF, DOCX ou texto puro do contrato)"
    obrigatorio: true
  - campo: contractType
    tipo: string
    origen: "Usuário (NDA, MSA, SLA, employment, lease)"
    obrigatorio: true
  - campo: corporatePlaybook
    tipo: file
    origen: "Usuário — playbook corporativo (opcional, omitir para quick review)"
    obrigatorio: false

Saida:
  - campo: reviewPackage
    tipo: object
    destino: "Usuário — pacote completo de revisão"
    persistido: true
  - campo: extractedClauses
    tipo: file
    destino: "extracted-clauses.json"
    persistido: true
  - campo: riskReport
    tipo: file
    destino: "risk-report.json"
    persistido: true
  - campo: complianceReport
    tipo: file
    destino: "compliance-report.json"
    persistido: true
  - campo: redlinedDocument
    tipo: file
    destino: "redlined-document.md"
    persistido: true
  - campo: executiveSummary
    tipo: file
    destino: "executive-summary.md"
    persistido: true

Checklist:
  pre-conditions:
    - "[ ] Documento do contrato fornecido em formato suportado"
    - "[ ] Tipo de contrato informado pelo usuário"
    - "[ ] Playbook corporativo fornecido (opcional)"
  post-conditions:
    - "[ ] Cláusulas extraídas e estruturadas"
    - "[ ] Riscos identificados e pontuados"
    - "[ ] Conformidade com playbook verificada (se fornecido)"
    - "[ ] Redlines geradas para cláusulas flaggadas (se playbook fornecido)"
    - "[ ] Sumário executivo gerado com recomendações"
  acceptance-criteria:
    - blocker: true
      criteria: "Pipeline completo executado sem erros"
    - blocker: true
      criteria: "Sumário executivo com recomendação clara"
    - blocker: true
      criteria: "Risk score total calculado"
    - blocker: false
      criteria: "Todas as fases com output persistido em arquivo"

Performance:
  duration_expected: "30-60 minutos (completo) / 10-20 minutos (quick)"
  cost_estimated: "~0 (processamento local)"
  cacheable: false
  parallelizable: false

Error Handling:
  strategy: retry
  retry:
    max_attempts: 3
    delay: "exponential(base=5s, max=60s)"
  fallback: "Pausar pipeline, reportar erro com fase e contexto"
  notification: "summary-reporter"

Metadata:
  version: "1.0.0"
  dependencies: []
  author: "contract-review-squad"
  created_at: "2026-02-24T00:00:00Z"
---

# Full Contract Review

## Pipeline

```
Fase 1: Extração     → @clause-extractor   → extractClauses()
Fase 2: Riscos       → @risk-flagger       → flagRisks()
Fase 3: Compliance   → @playbook-enforcer  → enforcePlaybook()    [se playbook fornecido]
Fase 4: Redlines     → @redline-drafter    → draftRedlines()      [se playbook fornecido]
Fase 5: Relatório    → @summary-reporter   → generateReviewSummary()
```

## Elicitation

### Fase 1 — Documento
- "Qual o documento do contrato para revisão? (PDF, DOCX ou texto)"
- "Qual o tipo de contrato? (NDA, MSA, SLA, employment, lease)"
- "Há algum contexto adicional sobre o negócio?"

### Fase 2 — Playbook (opcional)
- "Possui playbook corporativo para verificação de conformidade?"
- "Se sim, forneça o caminho do arquivo (YAML ou JSON)"
- "Deseja revisão completa (com redlines) ou rápida (apenas riscos)?"

### Fase 3 — Jurisdição
- "Qual a jurisdição aplicável? (ex: Brasil, EUA, UK, EU)"
- "Há alguma regulamentação específica a considerar? (LGPD, GDPR, etc.)"

### Fase Final — Resultado
- "Revisão concluída. Deseja exportar o relatório em algum formato específico?"
- "Há alguma cláusula que deseja analisar em mais detalhe?"
