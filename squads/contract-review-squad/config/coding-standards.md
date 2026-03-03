# Coding Standards — contract-review-squad

## Linguagem
- TypeScript para lógica de análise e parsing
- Python para pipelines de NLP e modelos de classificação
- YAML/JSON para configurações de playbook e regras
- Markdown para relatórios e sumários

## Convenções de Nomes
- Variáveis e funções: camelCase (`extractedClauses`, `flagRisks`)
- Constantes: UPPER_SNAKE_CASE (`MAX_RISK_SCORE`, `CLAUSE_TYPES`)
- Arquivos: kebab-case (`extract-clauses.ts`, `risk-report.json`)
- Tipos de cláusula: UPPER_SNAKE_CASE (`INDEMNIFICATION`, `LIMITATION_OF_LIABILITY`)
- Níveis de risco: lowercase (`low`, `medium`, `high`, `critical`)

## Segurança & Confidencialidade
- NUNCA logar conteúdo de contratos em texto claro
- Todos os documentos processados devem ser tratados como confidenciais
- Não armazenar contratos originais fora do diretório de trabalho
- Sanitizar outputs antes de exibir dados sensíveis
- Metadados de partes (nomes, endereços) são PII — tratar adequadamente

## Estrutura de Dados
- Cláusulas extraídas SEMPRE em formato estruturado (JSON)
- Risk scores SEMPRE com justificativa textual
- Compliance reports SEMPRE com referência à regra do playbook
- Redlines SEMPRE com rationale para cada modificação
- Sumários SEMPRE com seções: findings, risks, recommendations

## Análise de Contratos
- Sempre identificar tipo de contrato antes de análise
- Preservar numeração original das cláusulas
- Manter rastreabilidade: cada finding liga à cláusula original
- Risk scores: 1-10 (low: 1-3, medium: 4-6, high: 7-8, critical: 9-10)
- Playbook compliance: approved / fallback / dealbreaker / not-covered

## Testes
- Testar com contratos de exemplo para cada tipo (NDA, MSA, SLA)
- Validar extração contra contratos anotados manualmente
- Verificar que risk scores são consistentes entre execuções
- Testar playbook enforcement com regras conhecidas
- Validar formato de redlines para compatibilidade DOCX

## Encoding
- Todos os arquivos em UTF-8
- Suporte a caracteres especiais (acentos, símbolos legais: §, ¶, ©)
- Preservar formatação original do contrato quando possível
