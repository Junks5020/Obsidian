---
tags:
  - project/catpic
  - issue
date: 2026-10-29
---

# 07 任务页：轮询、对比、重试、发布

Status: resolved
Blocked by: 06

相关：[[../spec]] · [[../../catpic-ADR-0008-生成走异步任务前端轮询cron兜底]]

## 目标

用户能看到生成过程、判断结果、决定是否对外分享。

## 范围

- 轮询 `status`（约 1.5s），终态停止
- 原图 / 定稿左右对比
- 重试（再次扣额、建新任务）
- 下载；占位期文件名与内容都标注"占位效果"
- 发布开关（发布前明示：撤回无法追回已被缓存/抓取的副本）
- 失败原因区分：模型失败、输入不合格（`rejected` + `reject_reason`）、超时回收

## 验收

- 离开页面再回来 → 状态与产物一致
- `rejected` 与 `failed` 的文案与额度结果不同且正确
- 发布后 `/p/[id]` 可达；未发布 → 404

## Comments — 完成

合入 main（`4d72fa2e`）。`tsc` / `eslint` / `next build` 通过；`verify:task-view` 全绿（轮询停止条件、状态映射、按钮可见性、下载文件名、签名失败降级）。

`reapOne` 已接在轮询路径上（`src/lib/task/load.ts` 内：pending/processing 时先回收再重读），`ADR-0008` 的两层回收第一层落地。
