---
tags:
  - project/catpic
  - issue
date: 2026-10-29
---

# 06 首页：上传、选风格、建任务

Status: resolved
Blocked by: 04, 05

相关：[[../spec]]

## 目标

用户能在首页完成一次提交，并被带到任务页。

## 范围

- 单图上传（字段按数组存储，UI 明确只接受 1 张）
- 风格卡片（封面 + 名称），仅展示 `enabled = true`
- 提交：原子扣额 + 建 `pending` 任务 → 跳转 `/g/[id]`
- 展示剩余额度

## 验收

- 重复点击提交 → 不产生两条任务、不重复扣额
- 额度不足 → 明确提示，不建任务
- 未登录 → 引导登录且不丢已选图（或明确说明会丢）
- **风格卡片必须容忍 `cover_path = null`**（0002 的 seed 全部为 null，封面图来源仍是开放问题）

## Events

- 交接自 02：`styles` 的 `prompt` 列对 anon 可读。风格查询**必须显式列出字段**（slug/name/cover_path），禁止 `select *`，否则提示词模板泄露。

## Comments — 完成

合入 main（`7cfdf78`）。`tsc` / `eslint` / `next build` 通过；`verify:generation-flow` 全绿。

执行器（`src/lib/jobs/run-generation.ts`）的认领方式是条件更新 `update ... where id = ? and status = 'pending'`，并发两个执行器只有一个能拿到行，不会重复调模型或重复上传。失败文案按阶段固定，异常原文只进服务端日志，不入库。

封面图裁决：首页**不查** `cover_path`（无封面桶，查了只能丢弃），卡片用 `slug` 派生的稳定渐变占位。**"风格封面图"仍是一期开放问题，不属于本任务。**
