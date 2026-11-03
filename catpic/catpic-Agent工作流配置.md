---
tags:
  - project/catpic
  - workflow
status: active
date: 2026-10-29
updated: 2026-10-29
---

# catpic Agent 工作流配置

相关：[[00-catpic索引]] · [[catpic-术语表]]

## Issue tracker: Local Markdown in Obsidian

规格与任务存放在本项目 Obsidian 目录的 `work-items/`。**不使用 GitHub Issues**：规格已在 Obsidian，任务若放在别处会让 Agent 每次跨两个源对齐。

- 每个功能一个目录；规格为 `work-items/<feature-slug>/spec.md`
- 实现任务为 `work-items/<feature-slug>/issues/<NN>-<slug>.md`，从 `01` 编号
- 不创建合并的任务清单文件

任务文件顶部用 `Status:` 记录状态；讨论追加在文件底部 `## Comments`。
阻塞关系用顶部 `Blocked by: NN, NN` 表示，所列任务全部 resolved 后才解除阻塞。

## 验证要求

每个任务完成前必须实际运行受影响路径（`npm run build` / 本地 dev 手测），不得只读代码判定通过。涉及 RLS、Storage 策略、额度扣减的变更必须实测越权与重复退款路径。

## 领域文档

Obsidian 是术语表、ADR、规格、工作项的唯一归档位置。

工程工作开始前读取 [[00-catpic索引]]、[[catpic-术语表]] 与相关 ADR。**不在仓库创建 `CONTEXT.md`、`CONTEXT-MAP.md` 或 `docs/adr/`。**

## 仓库边界

仓库 `Junks5020/catpic` 只保留代码；如需发现指针，可在仓库放一份最小 `AGENTS.md` 指向本文件与该索引。其余持久文档一律留在 Obsidian。

## 质量门槛

- 生成能力只能经适配器调用，产品代码不得直接 import 任何模型 SDK。
- 额度扣减/退款必须走数据库函数，禁止应用层 read-modify-write。
- 验收口径中禁止出现"逐像素"，见 [[catpic-ADR-0001-生成路线由通用大模型主导]]。
