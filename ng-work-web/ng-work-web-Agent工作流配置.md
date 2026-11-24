---
tags:
  - ng-work-web
  - agent-workflow
status: active
date: 2026-11-17
updated: 2026-11-17
---

# ng-work-web Agent 工作流配置

相关：[[00-ng-work-web索引]]

## Issue tracker

使用本地 Markdown，根目录：
/Users/jinxu/workspace/obsidian/ng-work-web/work-items/

- 每个功能一个 <feature-slug>/ 目录。
- 规格：<feature-slug>/spec.md。
- 任务：<feature-slug>/issues/<NN>-<slug>.md，从 01 编号。
- 任务分类记录在文件顶部的 Status: 行。
- 依赖记录在 Blocked by: 行，先处理阻塞任务。
- 评论追加至文件末尾的 ## Comments。
- “发布”指写入本地文件；“获取任务”指读取对应文件。
- 新增规格时更新项目索引，使用 Obsidian wiki-links。

Wayfinding 使用 map.md 和独立决策任务文件；
任务以 Type: 记录类型，以 claimed/resolved 记录处理状态。
领取前检查依赖，完成后将结论及链接回填 map.md。

## Triage labels

- needs-triage：待评估
- needs-info：待补充信息
- ready-for-agent：可交给 Agent 实施
- ready-for-human：需要人工实施
- wontfix：不处理

## Domain docs

采用单一领域文档布局，权威来源为当前 Obsidian 项目目录。

探索前读取项目索引、已有术语表及相关 ADR。
讨论、任务和测试使用术语表中的领域语言；
遇到与 ADR 冲突的方案时，明确指出冲突。

- 术语表：[[ng-work-web-术语表]]
- 决策：ng-work-web-ADR-NNNN-主题.md，平铺存放
- 文档按需创建，新增或修改后同步项目索引。
- Obsidian 不可用时报告阻塞，不在仓库创建替代副本。

## 本地使用边界

此工作流仅供本人使用。
仓库中的 AGENTS.md 仅作为本地入口，由 Git 本地排除规则忽略。
不将该入口或个人工作流配置提交、推送至远程仓库。
