# contract-review-squad

Squad especialista en revisión automatizada de contratos legales.

## Descripción General

El **contract-review-squad** es un squad completo que automatiza el pipeline de revisión de contratos, reduciendo el tiempo promedio de 3.2 horas a minutos:

1. **Extracción** — Parsing de contratos (PDF, DOCX, texto) y extracción de cláusulas, partes, fechas y obligaciones
2. **Análisis de Riesgos** — Identificación de riesgos legales, términos desfavorables y protecciones faltantes con scoring
3. **Conformidad** — Verificación contra playbook corporativo con clasificación approved/fallback/dealbreaker
4. **Redlines** — Generación de lenguaje alternativo con tracked changes y fundamento por modificación
5. **Reporte** — Resumen ejecutivo, dashboard de riesgos y matriz de decisión para stakeholders

## Problema que Resuelve

Los abogados corporativos gastan 40-60% de su tiempo revisando contratos. El tiempo promedio por contrato es de 3.2 horas, con riesgo de perder cláusulas problemáticas por fatiga o volumen. Este squad automatiza el análisis estructural, permitiendo que el abogado se enfoque en la decisión estratégica.

## Agentes

| Agente | ID | Rol |
|---|---|---|
| 📄 Lexer | `clause-extractor` | Extracción y estructuración de cláusulas |
| ⚠️ Vigil | `risk-flagger` | Análisis y scoring de riesgos legales |
| 📘 Codex | `playbook-enforcer` | Verificación de conformidad con playbook |
| ✏️ Quill | `redline-drafter` | Generación de redlines y lenguaje alternativo |
| 📊 Brief | `summary-reporter` | Reportes ejecutivos y dashboards |

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `*review-contract` | Pipeline completo de revisión de contrato |
| `*full-review` | Alias para pipeline completo |
| `*quick-review` | Evaluación rápida (extracción + riesgos + resumen) |
| `*assess-contract` | Alias para evaluación rápida |
| `*extract-clauses` | Solo extracción de cláusulas |
| `*flag-risks` | Solo análisis de riesgos |
| `*enforce-playbook` | Solo verificación de playbook |
| `*draft-redlines` | Solo generación de redlines |
| `*generate-summary` | Solo resumen ejecutivo |
| `*create-report` | Crear reporte para stakeholders |

## Workflows

| Workflow | Comando | Duración | Descripción |
|---|---|---|---|
| Full Contract Review | `*review-contract` | 30-60 min | Pipeline completo con las 5 fases |
| Quick Risk Assessment | `*quick-review` | 10-20 min | Evaluación rápida sin playbook ni redlines |

## Inicio Rápido

```
# Activar el orquestador (summary-reporter)
/crs:agents:summary-reporter

# Revisión completa de contrato
*review-contract

# Evaluación rápida de riesgos
*quick-review
```

## Personalización de Playbook

El squad soporta playbooks corporativos en formato YAML para verificación de conformidad. Cada departamento legal puede personalizar el playbook con sus posiciones corporativas específicas.

## Tipos de Contrato Soportados

- **NDA** — Acuerdos de confidencialidad
- **MSA** — Master Service Agreements
- **SLA** — Service Level Agreements
- **Employment** — Contratos laborales
- **Lease** — Contratos de arrendamiento

## Requisitos

- Contratos en formato PDF, DOCX o texto plano
- Playbook corporativo en YAML o JSON (opcional, para conformidad)
