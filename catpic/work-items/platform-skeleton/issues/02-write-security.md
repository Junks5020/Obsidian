---
tags:
  - project/catpic
  - issue
date: 2026-10-29
---

# 02 额度函数与写入安全收紧

Status: resolved
Blocked by: 01

相关：[[../spec]] · [[../../catpic-ADR-0006-一期邀请制公测额度用credits预扣失败退回]]

## 目标

堵住 `profiles` 本人可改 `credits`、`generations` 本人可改 `status` 这两个现成漏洞，并实现原子扣额/退款/兑换。

## 范围

- **新增 `0003_*.sql`，不修改 `0001` / `0002`**
- **styles / invites 的 RLS 归本任务**（01 未认领，01 报告中已转交）：
  - `styles` 开 RLS，anon/authenticated 仅可 select 且 `enabled = true`；客户端无写策略
  - `invites` 开 RLS 且**不给客户端任何策略**，仅 service_role / RPC 可达
- 需要在 `generations` 增加幂等标记列（如 `refunded_at`）以支撑退款幂等，这是 02 自己的迁移内容

- RPC：`deduct_credits` / `refund_credits` / `redeem_invite`，事务 + 行锁 + 幂等键，禁用客户端自报余额或终态
- 收紧 `profiles`：禁止客户端改 `credits`；封住自建 profile 提额路径
- 收紧 `generations`：客户端不得写 `status` / `image_path` / `style_id` / `published_at`
- Storage 策略：上传路径必须绑定 `auth.uid()`，禁止跨目录写入
- 建任务 + 预扣原子化；写终态 + 退款原子化（两组分开，不合并）

## 验收（全部要实测，不接受读代码判定）

- 用户改自己 `credits` → 失败
- 用户改自己记录 `status` 为 `failed` 骗退款 → 失败
- 同一邀请码并发兑换两次 → 只有一次成功
- 并发重复退款 → 只退一次
- 扣额成功但建任务失败、或反之 → 不存在

## Comments

2026-10-29 01 已完成并合入 main，本任务接手 styles / invites 的 RLS。

已定 RPC 契约（实现可微调命名，但语义与原子性不得变）：

| 函数 | 作用 | 原子性 |
| --- | --- | --- |
| `create_generation(style_id, input_path)` | 扣额度 + 建 `pending` 任务，返回任务 id | 两者同事务，不允许一半成功 |
| `finish_generation(id, status, output_path, error)` | 写终态；失败/被拒时退款 | 写终态与退款同事务，重复调用不二次退款 |
| `refund_credits(id)` | 幂等退款，靠 `refunded_at` 兜底 | 重复调用只退一次 |
| `redeem_invite(code)` | 兑换邀请码加额度 | 同码并发只成功一次 |

本地验证配方（01 已验证可行）：python venv 装 `pgserver` 起本地 PostgreSQL 16 → 应用 `0001` 副本（去掉 `create extension pgcrypto` 一行）→ 应用 `0002` → 应用本任务的 `0003`，全程 `ON_ERROR_STOP=1`。不要尝试给本地装 pgcrypto，不要连远端库。

## Comments — 2026-10-29 完成

合入 main（`ae6847e`，fast-forward）。`tsc` / `eslint` / `next build` 均通过；本地 PostgreSQL 16.2 上 29 项越权与并发实测 **29 PASS / 0 FAIL**（含 `set local role authenticated` + 伪造 `request.jwt.claims` 模拟用户）。

关键取舍：`generations` **直接移除** UPDATE 策略并收回 INSERT/UPDATE 授权，不做"限制到非敏感列"——因为客户端已无任何合法直接写路径（建任务走 `create_generation`、终态走服务端 `finish_generation`、发布走 `publish_generation`/`unpublish_generation`）。`finish_generation` / `refund_credits` 仅授 `service_role`。

### 遗留风险与去向

| # | 风险 | 去向 |
| --- | --- | --- |
| 1 | `create_generation` 不校验 `p_input_path` 是否落在调用者目录（存储 scheme 未定，硬编码会做错） | **03**：定 scheme 时用 `0004` 回填函数内校验 |
| 2 | `finish_generation` 固定退 1，历史未付额度的行若被回收会凭空 +1 | **10**：只回收 `input_paths` 非空的行 |
| 3 | `styles.prompt` 对 anon 可读（提示词模板泄露） | **06**：查询必须显式列，禁止 `select *`；列级收紧留待与前端一起改 |
| 4 | 保留本人 DELETE：删 pending 行会作废那 1 额度，worker 随后 `finish_generation` 会报"任务不存在" | **10**：把该错误视为良性 |
| 5 | `finish_generation` 对不同终态改写选择报错而非静默 | **10**：重试只重放同一终态 |
| 6 | `profiles` select 仍全公开（含 credits），`likes` 仍保留客户端写（一期休眠） | 接受。无画廊、无用户列表 UI，枚举需直连 API；记为一期已知暴露面 |
| 7 | 未验证 PostgREST/JWT 层报错形状、连接池下的行锁行为 | 上线前在真实 Supabase 上补一次冒烟 |

### 未验证项（诚实记录）

- PostgREST 层错误形状与 HTTP 码（本地只有裸 PG）
- Supavisor/PgBouncer 事务模式下的锁等待与超时
- 并发用例是"两会话 + 人为持锁 1s"的确定性复现，不是压测
