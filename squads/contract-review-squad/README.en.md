# contract-review-squad

Specialist squad for automated legal contract review.

## Overview

The **contract-review-squad** is a complete squad that automates the contract review pipeline, reducing the average time from 3.2 hours to minutes:

1. **Extraction** — Contract parsing (PDF, DOCX, text) and extraction of clauses, parties, dates, and obligations
2. **Risk Analysis** — Identification of legal risks, unfavorable terms, and missing protections with scoring
3. **Compliance** — Verification against corporate playbook with approved/fallback/dealbreaker classification
4. **Redlines** — Alternative language generation with tracked changes and rationale per modification
5. **Report** — Executive summary, risk dashboard, and decision matrix for stakeholders

## Problem It Solves

Corporate lawyers spend 40-60% of their time reviewing contracts. The average time per contract is 3.2 hours, with risk of missing problematic clauses due to fatigue or volume. This squad automates the structural analysis, allowing lawyers to focus on strategic decisions.

## Agents

| Agent | ID | Role |
|---|---|---|
| 📄 Lexer | `clause-extractor` | Clause extraction and structuring |
| ⚠️ Vigil | `risk-flagger` | Legal risk analysis and scoring |
| 📘 Codex | `playbook-enforcer` | Corporate playbook compliance verification |
| ✏️ Quill | `redline-drafter` | Redline generation and alternative language |
| 📊 Brief | `summary-reporter` | Executive reports and dashboards |

## Available Commands

| Command | Description |
|---------|-------------|
| `*review-contract` | Full contract review pipeline |
| `*full-review` | Alias for full pipeline |
| `*quick-review` | Quick assessment (extraction + risks + summary) |
| `*assess-contract` | Alias for quick assessment |
| `*extract-clauses` | Clause extraction only |
| `*parse-contract` | Quick contract parsing |
| `*flag-risks` | Risk analysis only |
| `*assess-risk` | Single clause risk assessment |
| `*enforce-playbook` | Playbook verification only |
| `*check-compliance` | Quick compliance check |
| `*draft-redlines` | Redline generation only |
| `*suggest-changes` | Suggest alternative language |
| `*generate-summary` | Executive summary only |
| `*create-report` | Create stakeholder report |

## Workflows

| Workflow | Command | Duration | Description |
|---|---|---|---|
| Full Contract Review | `*review-contract` | 30-60 min | Complete pipeline with all 5 phases |
| Quick Risk Assessment | `*quick-review` | 10-20 min | Quick assessment without playbook or redlines |

## Quick Start

```
# Activate the orchestrator (summary-reporter)
/crs:agents:summary-reporter

# Full contract review
*review-contract

# Quick risk assessment
*quick-review

# Extract clauses only
/crs:agents:clause-extractor
*extract-clauses

# Flag risks only
/crs:agents:risk-flagger
*flag-risks
```

## Playbook Customization

The squad supports corporate playbooks in YAML format for compliance verification. Example structure:

```yaml
rules:
  indemnification:
    approved: "Cap limited to 1x contract value"
    fallback: "Cap of 2x contract value"
    dealbreaker: "Unlimited indemnification"
  limitation_of_liability:
    approved: "Liability limited to fees from last 12 months"
    fallback: "Liability limited to 2x fees"
    dealbreaker: "Unlimited liability"
  governing_law:
    approved: "Laws of [preferred jurisdiction]"
    fallback: "Laws of [acceptable jurisdiction]"
    dealbreaker: "Foreign jurisdiction without justification"
```

Each legal department can customize the playbook with their specific corporate positions.

## Supported Contract Types

- **NDA** — Non-Disclosure Agreements
- **MSA** — Master Service Agreements
- **SLA** — Service Level Agreements
- **Employment** — Employment contracts
- **Lease** — Lease agreements

## Requirements

- Contracts in PDF, DOCX, or plain text format
- Corporate playbook in YAML or JSON (optional, for compliance)
