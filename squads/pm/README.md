# 📋 Squad: PM (Project Management)

Squad de **Gestão de Projetos**, responsável por integrar ferramentas de gerenciamento, gerar relatórios de status e acompanhar planos de ação extraídos das reuniões.

## 🎯 Missão
Garantir visibilidade completa do progresso dos projetos, sincronizando informações entre o sistema AIOS, ClickUp e as atas de reunião geradas pelo Squad Comms.

## 🔗 Integração com ClickUp
- **API:** ClickUp v2
- **Autenticação:** Personal Access Token (`CLICKUP_API_KEY`)
- **Validação:** `node squads/pm/validate-clickup.js`

## 🔧 Comandos

| Comando | Descrição |
|---------|-----------|
| `/pm-sync` | Sincronizar tasks com ClickUp |
| `/pm-status` | Gerar relatório de status do projeto |
| `/pm-track [ata.md]` | Extrair plano 5W2H da ata e criar tasks no ClickUp |
| `/pm-validate` | Validar conexão com ClickUp API |

## 🔄 Integração entre Squads

```
[comms] Ata com 5W2H → [pm] Track Actions → [ClickUp] Tasks criadas
                                           → [live-ops] Status no Telegram
```

## 🚀 Início Rápido

1. Configurar no `.env`:
   ```
   CLICKUP_API_KEY=seu_personal_access_token
   ```

2. Validar conexão:
   ```bash
   node squads/pm/validate-clickup.js
   ```

3. Usar os comandos acima para gerenciar o projeto.

## 📋 Requisitos
- Node.js instalado
- Conta no ClickUp com PAT configurado
- Squad Comms ativo (para extração de 5W2H das atas)
