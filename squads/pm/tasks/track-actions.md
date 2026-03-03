# Task: Track Action Plans (5W2H)
id: track-actions
trigger: /pm-track [ata.md]

## Description
Extrai a tabela de plano de ação 5W2H (Seção 5) das atas de reunião geradas pelo Squad Comms e cria tasks correspondentes no ClickUp com responsáveis e prazos.

## Input
- Arquivo de ata `.md` gerado pelo agente Secretary

## Output
- Tasks criadas no ClickUp com: título, responsável, prazo, status inicial
- Confirmação de criação para o usuário

## Steps
1. Ler arquivo da ata
2. Localizar e parsear tabela 5W2H (Seção 5)
3. Para cada linha da tabela:
   - Criar task no ClickUp com título = "O que (Ação)"
   - Atribuir ao responsável = "Quem"
   - Definir prazo = "Quando"
   - Status = "A iniciar"
4. Gerar relatório de tasks criadas
