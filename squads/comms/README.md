****# 📢 Squad: Comms (Comunicação)

Squad responsável pela **documentação formal e comunicação visual** da Live Consultoria.

## 🎯 Missão
Transformar informações brutas (transcrições, anotações, dados) em documentos profissionais e apresentações visuais de alto impacto, mantendo a identidade visual e os padrões de governança corporativa.

## 👥 Agentes

### 1. Secretary (`/ata`, `/secretary`)
- **Papel:** Secretário Executivo / Auditor de Governança
- **Função:** Gera atas de reunião com rigor jurídico e executivo
- **Output:** Markdown estruturado (metadados, hierarquia, deliberações, 5W2H)

### 2. Presentation Creator (`/apresentacao`, `/slides`)
- **Papel:** Front-End Engineer & Copywriter Corporativo
- **Função:** Transforma dados em apresentações HTML profissionais
- **Output:** Arquivo HTML único (Dark Mode, Live Consultoria design system)

## 🔄 Workflow Principal

```
Transcrição → [Secretary] → Ata (MD) → [Presentation Creator] → Apresentação (HTML)
```

O pipeline é **automático**: ao gerar uma ata, a apresentação é gerada em sequência.

## 🚀 Início Rápido

```bash
# Ata de reunião
node .aios-core/scripts/run-prompt.js .aios-core/prompts/secretary-minutes.md <input.md> -o Ata.md

# Apresentação HTML
node .aios-core/scripts/run-prompt.js .aios-core/prompts/presentation-creator.md <ata.md> -o Apresentacao.html
```

## 📋 Requisitos
- `GEMINI_API_KEY` configurada no `.env`
- `@google/generative-ai` instalado
- Modelo: `gemini-2.5-flash`
