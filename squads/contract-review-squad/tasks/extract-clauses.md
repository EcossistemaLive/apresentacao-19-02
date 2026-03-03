---
task: extractClauses()
responsavel: "Lexer"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: contractDocument
    tipo: file
    origen: "Usuário (PDF, DOCX ou texto puro do contrato)"
    obrigatorio: true
  - campo: contractType
    tipo: string
    origen: "Usuário (NDA, MSA, SLA, employment, lease)"
    obrigatorio: true
  - campo: extractionRules
    tipo: object
    origen: "Configuração de regras de extração (opcional, usa defaults por tipo)"
    obrigatorio: false

Saida:
  - campo: structuredClauses
    tipo: file
    destino: "extracted-clauses.json, risk-flagger, playbook-enforcer"
    persistido: true
  - campo: partiesIdentified
    tipo: array
    destino: "parties.json, summary-reporter"
    persistido: true
  - campo: keyDates
    tipo: array
    destino: "key-dates.json, summary-reporter"
    persistido: true
  - campo: obligationMatrix
    tipo: object
    destino: "obligation-matrix.json, summary-reporter"
    persistido: true

Checklist:
  pre-conditions:
    - "[ ] Documento do contrato fornecido em formato suportado (PDF, DOCX, texto)"
    - "[ ] Tipo de contrato identificado"
  post-conditions:
    - "[ ] Todas as cláusulas extraídas e numeradas"
    - "[ ] Partes contratantes identificadas com papéis"
    - "[ ] Datas relevantes extraídas (vigência, renovação, notificação)"
    - "[ ] Matriz de obrigações construída"
    - "[ ] Output em formato JSON estruturado"
  acceptance-criteria:
    - blocker: true
      criteria: "Todas as cláusulas do contrato extraídas sem perda de conteúdo"
    - blocker: true
      criteria: "Partes contratantes corretamente identificadas"
    - blocker: true
      criteria: "Classificação de tipo por cláusula (obrigação, direito, restrição, definição)"
    - blocker: false
      criteria: "Numeração original preservada com referência à posição no documento"

Performance:
  duration_expected: "5-15 minutos"
  cost_estimated: "~0 (processamento local)"
  cacheable: true
  parallelizable: false

Error Handling:
  strategy: retry
  retry:
    max_attempts: 3
    delay: "exponential(base=2s, max=30s)"
  fallback: "Solicitar ao usuário formato alternativo do documento"
  notification: "clause-extractor"

Metadata:
  version: "1.0.0"
  dependencies: []
  author: "contract-review-squad"
  created_at: "2026-02-24T00:00:00Z"
---

# Extract Clauses

## Flow

```
1. Receber documento do contrato
2. Detectar formato (PDF, DOCX, texto puro)
3. Extrair texto bruto do documento
4. Identificar tipo de contrato e aplicar regras de extração
5. Segmentar cláusulas por estrutura (numeração, headings)
6. Classificar cada cláusula (obrigação, direito, restrição, definição)
7. Extrair entidades: partes, datas, valores, jurisdições
8. Construir matriz de obrigações por parte
9. Gerar output estruturado (JSON)
```

## Chains To

- `flagRisks()` — Cláusulas estruturadas alimentam análise de riscos
- `enforcePlaybook()` — Cláusulas estruturadas alimentam verificação de playbook
