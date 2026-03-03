# Tech Stack — contract-review-squad

## Parsing de Documentos
- **pdf-parse / pdf.js** — Extração de texto de PDFs
- **mammoth** — Conversão de DOCX para texto/HTML
- **Tesseract.js** — OCR para documentos digitalizados
- **Apache Tika** — Extração universal de metadados e texto

## NLP & Análise de Texto
- **Legal NER (Named Entity Recognition)** — Identificação de partes, datas, valores, jurisdições
- **Clause Segmentation** — Segmentação de cláusulas por padrões estruturais (numeração, headings)
- **spaCy (legal models)** — Pipeline de NLP para domínio legal
- **LangChain** — Orquestração de prompts para análise semântica de cláusulas

## Gestão de Contratos
- **Playbook Engine** — Motor de regras para validação contra posições corporativas
- **Clause Library** — Biblioteca de cláusulas aprovadas e linguagem alternativa
- **Obligation Tracker** — Rastreamento de obrigações, prazos e renovações

## Redlining & Track Changes
- **diff-match-patch** — Algoritmo de diff para geração de redlines
- **Track Changes XML** — Formato de marcação compatível com Word/DOCX
- **Redline Markup** — Padrão de marcação (inserções, deleções, comentários)

## Compliance & Frameworks Legais
- **Playbook YAML/JSON Schema** — Definição estruturada de posições corporativas
- **Risk Scoring Matrix** — Matriz de pontuação de riscos por categoria
- **Jurisdictional Rules** — Regras específicas por jurisdição (LGPD, GDPR, UCC)

## Formatos de Saída
- **Markdown** — Relatórios executivos e sumários
- **JSON** — Dados estruturados (cláusulas, riscos, compliance)
- **YAML** — Configurações de playbook e regras
- **DOCX (redlined)** — Documento com track changes para advogados
- **PDF** — Relatórios finais formatados

## Armazenamento & Persistência
- **File System** — Documentos de entrada e saída
- **SQLite / JSON Store** — Cache de análises e histórico de revisões
- **Template Store** — Modelos de cláusulas e linguagem padrão
