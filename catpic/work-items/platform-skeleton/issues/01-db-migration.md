---
tags:
  - project/catpic
  - issue
date: 2026-10-29
---

# 01 数据库迁移 0002 与风格种子

Status: resolved
Blocked by: -

相关：[[../spec]] · [[../../catpic-ADR-0003-风格库存于数据库由seed维护不建运营后台]]

## 目标

让 schema 能表达本产品：输入图、所选风格、发布状态、卡死回收判据、输入不合格终态、邀请码。

## 范围

- **新增 `0002_*.sql`，不修改 `0001_init.sql`**
- `styles`：`slug` / `name` / `cover_path` / `prompt` / `enabled` / `sort`，含首批 seed
- `generations` 扩展：`input_paths text[]`、`style_id`（`on delete restrict`）、`is_public` 默认改 `false`、`published_at`、`processing_started_at`、`reject_reason`、`status` 增加 `rejected`
- `invites`：`code` / `credits` / `redeemed_by` / `redeemed_at` / `created_at`
- 重新生成 `src/types/database.ts`

## 不做

- 不改任何 RLS 策略（属于 02）
- 不写 seed 的业务内容决策（风格清单见 spec 开放问题）

## 验收

- 在已有 0001 的库上可执行；执行后 types 与表结构一致
- `styles` 至少有 1 条 `enabled = true` 可被匿名读取
- `generations.prompt` 语义切换后，旧行不会导致读路径报错

## Comments

2026-10-29 完成并合入 main（commit `6db2e8f`，merge `ba99f7f`）。`tsc --noEmit` 通过；迁移在本地 PostgreSQL 16 上连跑 3 次幂等通过（`create extension pgcrypto` 行在本地副本中剔除，目标环境 Supabase 本身可用）。

执行者提出的 6 处含糊，裁决如下：

1. **styles / invites 的 RLS 归属** → 交 02。收敛为：styles 开 RLS、仅 `enabled = true` 可被 anon/authenticated 读；invites 开 RLS 且**不给客户端任何策略**（仅 service_role/RPC）。已写入 02 的范围。
2. **`invites.redeemed_by` 的 `on delete`** → 保留默认 `no action`。本期没有删用户的功能，删用户被已兑换码阻塞是可接受的诚实行为；将来真需要删号时再改。
3. **`input_paths` 不加"长度恒为 1"的 check** → 接受。历史行只能是 `{}`，加 check 会阻断迁移；一期单图约束靠注释与代码保证。
4. **`status` 在 TS 里仍是 `string`** → 接受。DB 是 text + check，生成类型自然是 string；不手改生成文件。
5. **历史行 `is_public` 回落为 false** → 接受，符合 ADR-0004；仅翻转未发布的行。
6. **seed 4 个画风、`cover_path` 为 null** → 接受为占位。首页/风格卡片必须容忍 `cover_path = null`，这条并入 06 验收。
