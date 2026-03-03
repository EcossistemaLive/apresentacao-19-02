# contract-review-squad

专业自动化法律合同审查小组。

## 概述

**contract-review-squad** 是一个完整的小组，可自动化合同审查流程，将平均审查时间从3.2小时缩短至几分钟：

1. **提取** — 合同解析（PDF、DOCX、文本）并提取条款、当事方、日期和义务
2. **风险分析** — 识别法律风险、不利条款和缺失保护，并进行评分
3. **合规性** — 根据企业手册进行验证，分类为批准/备选/否决
4. **修改建议** — 生成替代语言，带有修订标记和每项修改的理由
5. **报告** — 执行摘要、风险仪表板和利益相关者决策矩阵

## 解决的问题

企业律师将40-60%的时间花在审查合同上。每份合同的平均审查时间为3.2小时，由于疲劳或工作量大，存在遗漏问题条款的风险。该小组自动化结构性分析，使律师能够专注于战略决策。

## 代理

| 代理 | ID | 角色 |
|---|---|---|
| 📄 Lexer | `clause-extractor` | 条款提取和结构化 |
| ⚠️ Vigil | `risk-flagger` | 法律风险分析和评分 |
| 📘 Codex | `playbook-enforcer` | 企业手册合规验证 |
| ✏️ Quill | `redline-drafter` | 修改建议和替代语言生成 |
| 📊 Brief | `summary-reporter` | 执行报告和仪表板 |

## 可用命令

| 命令 | 描述 |
|------|------|
| `*review-contract` | 完整合同审查流程 |
| `*full-review` | 完整流程别名 |
| `*quick-review` | 快速评估（提取+风险+摘要） |
| `*assess-contract` | 快速评估别名 |
| `*extract-clauses` | 仅提取条款 |
| `*flag-risks` | 仅风险分析 |
| `*enforce-playbook` | 仅手册验证 |
| `*draft-redlines` | 仅生成修改建议 |
| `*generate-summary` | 仅执行摘要 |
| `*create-report` | 创建利益相关者报告 |

## 工作流

| 工作流 | 命令 | 时长 | 描述 |
|---|---|---|---|
| 完整合同审查 | `*review-contract` | 30-60分钟 | 包含全部5个阶段的完整流程 |
| 快速风险评估 | `*quick-review` | 10-20分钟 | 不含手册和修改建议的快速评估 |

## 快速开始

```
# 激活协调器（summary-reporter）
/crs:agents:summary-reporter

# 完整合同审查
*review-contract

# 快速风险评估
*quick-review
```

## 手册自定义

该小组支持YAML格式的企业手册进行合规验证。每个法律部门可以根据自己的企业立场自定义手册。

## 支持的合同类型

- **NDA** — 保密协议
- **MSA** — 主服务协议
- **SLA** — 服务级别协议
- **Employment** — 劳动合同
- **Lease** — 租赁合同

## 要求

- PDF、DOCX或纯文本格式的合同
- YAML或JSON格式的企业手册（可选，用于合规检查）
