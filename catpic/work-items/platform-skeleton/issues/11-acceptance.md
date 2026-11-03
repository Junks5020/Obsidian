---
tags:
  - project/catpic
  - issue
date: 2026-10-29
---

# 11 一期验收：隐私、越权与占位标识

Status: in-progress
Blocked by: 01, 02, 03, 04, 05, 06, 07, 08, 09, 10

相关：[[../spec]]

## 目标

按 spec 第六节逐条实测，不靠读代码。

## 检查项

- 匿名与他人分别直连原图、未发布定稿 → 均失败
- 用户改 `credits`、改 `status`、自建 profile、重复/并发兑换邀请码、并发退款 → 均被拒
- 失败/被拒/超时回收三条路径都不扣额度
- 卡死记录被回收且用户看到明确原因
- 占位标识在任务页、历史、分享页、OG、下载文件五处都存在
- 每个页面在手机宽度下可用

## 不验证

- 主体一致与结构对齐的阈值：真实模型未接入，候选指标（IoU / 关键点 / 人眼通过率）留待真实产物实测后确定

## Comments — 验收启动

代码层面已全部落地（01–10 均已合入 main）。本地可执行项全绿：`tsc` / `eslint` / `next build` / 8 个 verify 脚本。

### 已确认的诚实缺口（不是缺陷，是范围）

**`rejected` 终态在一期不可达。** 内容判定按 spec 是 mock（`run-generation.ts` 里没有任何内容判定），因此没有任何代码路径会写入 `rejected`。后果：
- `07` 的 `rejected` 展示分支是**目前走不到的分支**，保留是为将来接内容判定；
- 数据库层的 `finish_generation('rejected')` 退款路径**已在 02 实测**，缺的是产品层触发器；
- 因此"输入不合格被拒且不扣额度"这条**无法端到端验证**，只能验证数据库层那一段。

**验收时必须检查的衍生风险**：UI 不得向用户承诺"会自动拦截不合格输入"——一期没有这个能力。

### 未在本地验证（需真实 Supabase）

- storage 桶与 `storage.objects` 策略（本地裸 PG 无 storage schema）
- 真实签名 URL 的签发与失效
- JWT / PostgREST 层的错误形状与 HTTP 码
- 连接池下的行锁行为
- 真实邮件投递（Supabase 邮件服务需 Dashboard 配置）
- 端到端：上传 → 建任务 → 执行 → 轮询 → 发布 → 分享 → 撤回

## Comments — 2026-10-30 验收完成（两路独立审查 + 修复）

两路独立只读审查：**规格符合性**（9 条决策逐条对代码）与**安全攻防**（10 条攻击面，按"攻破它"做）。结论一致为 **BLOCK**，共 2 阻断 + 1 高 + 4 中 + 8 低。全部已修，提交 `64edd98`（另 `469a471` 修 `.env.example` 未入库）。

### 阻断项（已修 + 已实测）

**F1 跨用户读取他人原图。** `create_generation` 只比路径首段，`<myUid>/../<victimUid>/inputs/x.jpg` 可过；而下游 `signInputUrl` / `run-generation` 用 service_role **无条件信任库里的字符串**。叠加 F2（公开行把 `input_paths` 交给匿名读者）构成完整攻击链。修复：SQL 侧改整串正则 + 显式拒 `..`；应用侧新增 `isOwnedObjectPath`，凡把库内路径交给 service_role 前必须校验。

**F2 `generations` 整表对匿名可读。** 已发布行的 `input_paths`（原图存储坐标）被批量泄露，也是 F1 的弹药。修复：按角色列级授权（anon 只读展示列），可见性改由 `published_at` 单独决定，不再依赖 `is_public`。

### 已修的其余项

| 编号 | 问题 | 修复 |
| --- | --- | --- |
| F3 高 | `credits` 默认 100 + 开放注册 ⇒ 邀请制死路径 | 默认值归零（`0005`） |
| F4 中 | `/api/cron` 不在 middleware 白名单 ⇒ 每日兜底从未执行 | 加入白名单 + `CRON_SECRET` 写入 `.env.example` |
| F5 中 | 上传在校验前整包读入内存 | `Content-Length` 预检 + body 上限 |
| F6 中 | 15 分钟阈值会打断真模型并留孤儿 | 提至 30 分钟 + 终态冲突时清理孤儿产物 |
| F7 低 | 缺客户端边界护栏 | ESLint `no-restricted-imports`（`server-only` 包会打挂验证脚本，故不用它） |
| F8 低 | `finish_generation` 信任调用方产物路径 | 校验 `<uid>/outputs/<安全文件名>` |
| F9 低 | health/upload 回显上游错误原文 | 固定文案 + 服务端日志 |
| F10 低 | OG 图地址用未校验 Host 头拼绝对 URL | 改用 `NEXT_PUBLIC_SITE_ORIGIN`，未配置则相对路径 |
| F12 低 | `0001` 公开桶仍存活 | `0005` 删策略 + 删桶 |
| F13 低 | `profiles` 全员可读（含 credits） | 改为仅本人 |
| F14 低 | `styles.prompt` 对 anon 表级可读 | 列级授权移除 `prompt` |

### 规格符合性另修三处

- **下载文件名这个占位出口原本不生效**：跨源 URL 上的 `download` 属性会被浏览器忽略。改为同源路由 `/api/generations/[id]/download`，由服务端写 `Content-Disposition`。原 verify 脚本只断言函数返回值，属**假绿**。
- **"内容判定未检测"的诚实说明缺失**：首页补上明示。
- **分享页措辞过强**："此链接立即失效" → "平台不再提供此链接（已被保存或缓存的图片无法追回）"。

### 本地实测（真跑，非采信报告）

- `tsc --noEmit` / `eslint` / `next build` 全绿
- 8 个 verify 脚本全绿
- **`0005` 在本地 PostgreSQL 16 上实测 26/26 PASS**：不合法路径 7 种全部被拒、产物路径归属被拒、`styles.prompt` 对 anon/authenticated 均不可读而 `name` 可读、`generations.input_paths` 对 anon 不可读、未发布行对 anon 不可见而已发布可见、`profiles` anon 0 行本人 1 行、公开桶与相关策略已清除、`0005` 连跑两次幂等
- 修测试夹具时发现 `psycopg` 在 autocommit 下 `set local role` 不生效（RLS 未真正应用），已改为 `set role`

### 仍未验证（需真实 Supabase，不因此判定为漏洞）

1. storage 边缘对含 `..` 路径是否归一化（F1 的关键假设；即使边缘拒绝，DB 层闸门也必须校验）
2. `finish_generation` 带普通用户 JWT 直调应 401/403
3. `PATCH /rest/v1/profiles` 改 credits 应 42501
4. 带 `CRON_SECRET` 打线上 `/api/cron/reap` 应 200 而非 307
5. `GET /rest/v1/styles?select=prompt` 应被拒
6. 真实签名 URL 签发与失效、真实邮件投递、连接池下锁行为

### 一期仍未闭合的能力缺口

`rejected` 终态不可达（内容判定为 mock）。UI 未向用户承诺"会自动拦截"，首页已明示"未检测"。

## Comments — 2026-10-30 远程环境探测结果

用 `scripts/smoke-remote.mjs`（提交 `d28aa50`）打真实 Supabase 项目做了只读探测，结论：

**线上库只应用了 `0001`，`0002`–`0005` 全部缺失。**

| 探测 | 结果 |
| --- | --- |
| `/rest/v1/profiles` | 200（0001 已应用） |
| `/rest/v1/generations` | 200（0001 已应用） |
| `/rest/v1/styles` | 404 `PGRST205` 表不存在 → 0002 未应用 |
| `/rest/v1/invites` | 404 → 0002 未应用 |
| `rpc/create_generation` | 404 `PGRST202` 函数不存在 → 0003/0004 未应用 |

因此**当前线上是完全不可用的**（首页读不到风格、建不了任务），且 `0005` 的隐私与额度加固全部未生效。这不是代码缺陷，是部署步骤未执行。

### 待办（需人工批准后执行）

按 `README.md` 的顺序在 Supabase SQL Editor 应用 0002 → 0003 → 0004 → 0005，然后：

1. `node scripts/smoke-remote.mjs`（只读，应全 PASS）
2. `node scripts/smoke-remote.mjs --write`（会建/删一个临时账号，验证 credits 不可自造、`..` 路径被拒、status 不可伪造）
3. 逐个用户回归：登录 → 上传 → 生成 → 发布 → 分享页 OG → 撤回

### 远程仍未验证的项（迁移应用后才能跑）

见本文件的"仍未验证"清单 1–6 条。其中**第 4 条（cron 是否被 307）**建议在新版部署后用 `curl -i` 单独确认一次，因为这是唯一一个"配置漏了会静默失效且没有任何报错"的项。

## Comments — 2026-10-30 迁移已应用到线上项目

已通过 MCP 在真实项目（`qsssxivvjydnpebogheeu`）应用 `0002` → `0006`，全部记录在 `supabase_migrations.schema_migrations`。应用前确认过库是空的（0 profiles / 0 generations / 公开桶 0 objects），无存量数据风险。

### 真实库上的实测结果（JWT 模拟 + 整体回滚，零残留）

| 检查 | 结果 |
| --- | --- |
| 新账号 `profiles.credits` 默认值 | **0** |
| `create_generation` 拒绝 `<uid>/../<victim>/inputs/x.png` | **42501** |
| `create_generation` 拒绝 `<uid>//inputs/x.png` | **42501** |
| `create_generation` 接受本人合法路径 | 返回任务 id |
| 客户端 `update generations.status = 'failed'` | **42501 permission denied for table** |
| 客户端 `insert into generations` | **42501** |
| 客户端 `update profiles.credits = 9999` | **42501** |
| 客户端 `update profiles.display_name` | 允许（未过度收紧） |
| 客户端调 `finish_generation` | **42501 permission denied for function** |
| 客户端调 `refund_credits` | **42501 permission denied for function** |
| anon 读 `generations` / `profiles` | 各 **0 行** |
| anon 读 `styles.prompt` / `generations.input_paths` | **401** |
| anon 读 `styles.name`（对照组） | 200，1 行 |

验证脚本 `node scripts/smoke-remote.mjs`（只读）：**5 PASS / 0 FAIL / 3 SKIP**（SKIP 项需要 service_role key 与站点地址）。

### 迁移过程中的两个真实发现

1. **`delete from storage.buckets` 在 Supabase 上被禁**：`storage.protect_delete()` 抛 42501「Direct deletion from storage tables is not allowed」，而本地裸 PostgreSQL 可以删。`0005` 因此改为「置 `public = false` + 清空该桶全部策略」，安全效果等价（无策略的私有桶客户端完全不可达）。这正是"本地全绿不等于线上可用"的实例。
2. **测试脚本自身两次假阴性**：`psycopg` 在 autocommit 下 `set local role` 不生效导致 RLS 未应用；以及 `DO` 块里把 uuid 存成 text 导致 `42883 undefined_function` 被误读为权限被拒。两处都修正后才是真结论——**看到 FAIL 时先怀疑夹具**。

### Supabase advisor 的两条告警（都是有意设计，已用 comment 钉住）

- `invites` 开 RLS 但没有策略 → INFO。这是正确状态：没有策略 + 已收回客户端权限 = 客户端完全不可达。**加策略会直接破坏额度闸门。**
- 4 个 SECURITY DEFINER 函数可被 authenticated 调用 → WARN。这些就是给登录用户的业务入口，安全性由函数体自证（身份取 `auth.uid()`、归属自校验）。`finish_generation` / `refund_credits` 已只授 service_role。

已由 `0006_document_intentional_lints.sql` 写入数据库注释，防止后人把告警当缺陷修掉。

### 现在仍缺的一步（需产品决策）

`invites` 表是空的。**没有任何邀请码，就没有人能获得额度**（新账号默认 0）。需要决定每个邀请码赠予几次额度，再插入：

```sql
insert into public.invites (code, credits) values ('<自定义码>', <次数>);
```
