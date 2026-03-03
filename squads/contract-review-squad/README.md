# contract-review-squad

Squad especialista em revisão automatizada de contratos legais.

## Visão Geral

O **contract-review-squad** é um squad completo que automatiza o pipeline de revisão de contratos, reduzindo o tempo médio de 3.2 horas para minutos:

1. **Extração** — Parsing de contratos (PDF, DOCX, texto) e extração de cláusulas, partes, datas e obrigações
2. **Análise de Riscos** — Identificação de riscos legais, termos desfavoráveis e proteções ausentes com scoring
3. **Conformidade** — Verificação contra playbook corporativo com classificação approved/fallback/dealbreaker
4. **Redlines** — Geração de linguagem alternativa com tracked changes e rationale por modificação
5. **Relatório** — Sumário executivo, dashboard de riscos e matriz de decisão para stakeholders

## Problema que Resolve

Advogados corporativos gastam 40-60% do tempo revisando contratos. O tempo médio por contrato é de 3.2 horas, com risco de perder cláusulas problemáticas por fadiga ou volume. Este squad automatiza a análise estrutural, permitindo que o advogado foque na decisão estratégica.

## Agentes

| Agente | ID | Papel |
|---|---|---|
| 📄 Lexer | `clause-extractor` | Extração e estruturação de cláusulas |
| ⚠️ Vigil | `risk-flagger` | Análise e scoring de riscos legais |
| 📘 Codex | `playbook-enforcer` | Verificação de conformidade com playbook |
| ✏️ Quill | `redline-drafter` | Geração de redlines e linguagem alternativa |
| 📊 Brief | `summary-reporter` | Relatórios executivos e dashboards |

## Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `*review-contract` | Pipeline completo de revisão de contrato |
| `*full-review` | Alias para pipeline completo |
| `*quick-review` | Avaliação rápida (extração + riscos + sumário) |
| `*assess-contract` | Alias para avaliação rápida |
| `*extract-clauses` | Apenas extração de cláusulas |
| `*parse-contract` | Parsing rápido do contrato |
| `*flag-risks` | Apenas análise de riscos |
| `*assess-risk` | Avaliação de risco de uma cláusula |
| `*enforce-playbook` | Apenas verificação de playbook |
| `*check-compliance` | Verificação rápida de compliance |
| `*draft-redlines` | Apenas geração de redlines |
| `*suggest-changes` | Sugerir linguagem alternativa |
| `*generate-summary` | Apenas sumário executivo |
| `*create-report` | Criar relatório para stakeholders |

## Workflows

| Workflow | Comando | Duração | Descrição |
|---|---|---|---|
| Full Contract Review | `*review-contract` | 30-60 min | Pipeline completo com todas as 5 fases |
| Quick Risk Assessment | `*quick-review` | 10-20 min | Avaliação rápida sem playbook nem redlines |

## Quick Start

```
# Ativar o orquestrador (summary-reporter)
/crs:agents:summary-reporter

# Revisão completa de contrato
*review-contract

# Avaliação rápida de riscos
*quick-review

# Apenas extrair cláusulas
/crs:agents:clause-extractor
*extract-clauses

# Apenas verificar riscos
/crs:agents:risk-flagger
*flag-risks
```

## Customização de Playbook

O squad suporta playbooks corporativos em formato YAML para verificação de conformidade. Exemplo de estrutura:

```yaml
rules:
  indemnification:
    approved: "Cap limitado a 1x o valor do contrato"
    fallback: "Cap de 2x o valor do contrato"
    dealbreaker: "Indenização ilimitada"
  limitation_of_liability:
    approved: "Liability limitada a fees dos últimos 12 meses"
    fallback: "Liability limitada a 2x fees"
    dealbreaker: "Liability ilimitada"
  governing_law:
    approved: "Leis do Brasil, foro de São Paulo"
    fallback: "Leis do Brasil, foro da sede da empresa"
    dealbreaker: "Jurisdição estrangeira sem justificativa"
```

Cada departamento jurídico pode customizar o playbook com suas posições corporativas específicas.

## Tipos de Contrato Suportados

- **NDA** — Acordos de confidencialidade
- **MSA** — Master Service Agreements
- **SLA** — Service Level Agreements
- **Employment** — Contratos de trabalho
- **Lease** — Contratos de locação

## Requisitos

- Contratos em formato PDF, DOCX ou texto puro
- Playbook corporativo em YAML ou JSON (opcional, para conformidade)
