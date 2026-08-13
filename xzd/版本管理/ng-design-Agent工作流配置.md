---
tags:
  - ng-design
  - agent-workflow
status: active
date: 2026-08-11
updated: 2026-08-11
---

# ng-design Agent 工作流配置

相关：[[00-版本总览]]

## Issue Tracker

Issues 与规格使用 Obsidian 本地 Markdown tracker，位于本项目目录的 `work-items/` 下。

- 每项功能使用独立目录：`work-items/<feature-slug>/`。
- 规格文件为 `work-items/<feature-slug>/spec.md`。
- 实施 tickets 位于 `work-items/<feature-slug>/issues/<NN>-<slug>.md`，按依赖顺序从 `01` 编号。
- ticket 状态使用文件顶部附近的 `Status:` 行。
- 评论与执行记录追加到文件底部的 `## Comments`。
- 当技能要求“发布到 issue tracker”时，在 Obsidian 创建对应文件并更新项目索引。
- 当技能要求“读取 ticket”时，读取用户给出的本地 ticket 文件。

## Blocking

每个 ticket 使用 `Blocked by:` 行列出其依赖的 ticket 编号与 wikilink。只有所有 blocker 的 `Status:` 都是 `resolved`，且当前 ticket 尚未被领取时，才可实施。

frontier 是所有未阻塞、未领取 ticket 中编号最小的一项。领取时先把 `Status:` 改为 `claimed`；完成时改为 `resolved`，勾选验收条件并在 `## Comments` 记录结果。

## Triage Labels

| 角色 | 本地 Status 值 | 含义 |
| --- | --- | --- |
| `needs-triage` | `needs-triage` | 等待维护者评估 |
| `needs-info` | `needs-info` | 等待报告者补充信息 |
| `ready-for-agent` | `ready-for-agent` | 规格完整，可由 agent 执行 |
| `ready-for-human` | `ready-for-human` | 需要人工实施 |
| `wontfix` | `wontfix` | 不予处理 |

## Domain Docs

Obsidian 是术语表、ADR、research、handoff 与本地工作项的唯一来源。

工程工作开始前：

1. 阅读项目索引。
2. 阅读存在的项目术语表。
3. 阅读相关 ADR。
4. 在 issue、测试和代码说明中使用术语表定义的语言。
5. 遇到与 ADR 冲突的要求时明确报告，不静默覆盖。

不要在仓库创建 `CONTEXT.md`、`CONTEXT-MAP.md` 或 `docs/adr/`。
