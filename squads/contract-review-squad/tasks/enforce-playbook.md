---
task: enforcePlaybook()
responsavel: "Codex"
responsavel_type: Agente
atomic_layer: Molecule
elicit: false

Entrada:
  - campo: structuredClauses
    tipo: file
    origen: "extractClauses() — cláusulas extraídas e estruturadas"
    obrigatorio: true
  - campo: corporatePlaybook
    tipo: file
    origen: "Usuário — playbook corporativo em YAML/JSON"
    obrigatorio: true
  - campo: dealContext
    tipo: object
    origen: "Usuário — contexto do negócio (valor, prioridade, relação com contraparte)"
    obrigatorio: false

Saida:
  - campo: complianceReport
    tipo: file
    destino: "compliance-report.json, redline-drafter, summary-reporter"
    persistido: true
  - campo: deviations
    tipo: array
    destino: "deviations.json, redline-drafter"
    persistido: true
  - campo: clauseStatus
    tipo: object
    destino: "playbook-status.json, summary-reporter"
    persistido: true

Checklist:
  pre-conditions:
    - "[ ] Cláusulas estruturadas disponíveis (output de extractClauses)"
    - "[ ] Playbook corporativo fornecido em formato YAML ou JSON"
  post-conditions:
    - "[ ] Cada cláusula mapeada à regra correspondente do playbook"
    - "[ ] Status atribuído: approved / fallback / dealbreaker / not-covered"
    - "[ ] Desvios documentados com referência à regra do playbook"
    - "[ ] Gaps no playbook identificados (cláusulas not-covered)"
  acceptance-criteria:
    - blocker: true
      criteria: "Todas as cláusulas verificadas contra o playbook"
    - blocker: true
      criteria: "Deal-breakers identificados e destacados"
    - blocker: true
      criteria: "Cada desvio referencia a regra exata do playbook"
    - blocker: false
      criteria: "Sugestão de posição fallback para cada desvio"

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
  fallback: "Reportar cláusulas que não puderam ser mapeadas como not-covered"
  notification: "playbook-enforcer"

Metadata:
  version: "1.0.0"
  dependencies:
    - extractClauses()
  author: "contract-review-squad"
  created_at: "2026-02-24T00:00:00Z"
---

# Enforce Playbook

## Flow

```
1. Receber cláusulas estruturadas de extractClauses()
2. Carregar playbook corporativo
3. Para cada cláusula:
   a. Identificar regra correspondente no playbook
   b. Comparar com posição aprovada
   c. Se não atende aprovada, comparar com fallback
   d. Se não atende fallback, verificar se é deal-breaker
   e. Se não há regra, classificar como not-covered
   f. Documentar desvio com referência à regra
4. Consolidar status por cláusula
5. Gerar compliance report estruturado
```

## Chains To

- `draftRedlines()` — Desvios alimentam geração de linguagem alternativa
