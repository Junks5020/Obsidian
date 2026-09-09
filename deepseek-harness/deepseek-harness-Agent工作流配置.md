---
tags:
  - project/deepseek-harness
  - workflow
status: active
date: 2026-09-09
updated: 2026-09-09
---

# DeepSeek Harness Agent 工作流配置

相关：[[00-deepseek-harness索引]]

## Issue tracker: Local Markdown in Obsidian

规格与任务存放在本项目 Obsidian 目录的 `work-items/`。

每个功能使用一个目录；规格为 `work-items/<feature-slug>/spec.md`。

实现任务位于 `work-items/<feature-slug>/issues/<NN>-<slug>.md`，从 `01` 编号，且不创建合并的任务清单文件。

任务在顶部使用 `Status:` 记录状态；讨论追加在文件底部的 `## Comments`。

阻塞关系通过顶部的 `Blocked by: NN, NN` 表示；所列任务全部为 `resolved` 后才解除阻塞。

## Triage 标签

| 工作流角色 | GitHub 标签 | 含义 |
| --- | --- | --- |
| `needs-triage` | `needs-triage` | 维护者需要评估。 |
| `needs-info` | `needs-info` | 等待报告人补充信息。 |
| `ready-for-agent` | `ready-for-agent` | 规格完整，可由 Agent 实现。 |
| `ready-for-human` | `ready-for-human` | 需要人工实现。 |
| `wontfix` | `wontfix` | 不再处理。 |

## Domain Docs

Obsidian 是术语表、ADR、调研、交接和本地工作项的唯一归档位置。

工程工作开始前读取项目索引、已有术语表和与改动相关的 ADR；缺失时可继续，由领域建模流程按需创建。

不在仓库创建 `CONTEXT.md`、`CONTEXT-MAP.md` 或 `docs/adr/`。
