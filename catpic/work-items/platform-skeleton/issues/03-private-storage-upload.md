---
tags:
  - project/catpic
  - issue
date: 2026-10-29
---

# 03 私有存储与上传契约

Status: todo
Blocked by: 01, 02

相关：[[../spec]] · [[../../catpic-ADR-0004-原图永远私有定稿默认私有需显式发布]]

## 目标

原图只有本人可读，定稿默认私有；上传有技术校验。

## 范围

- 新建 `0004_*.sql`（不改 0001/0002/0003）：桶、`storage.objects` 策略、以及用 `create or replace` 回填 `create_generation` 的**路径归属校验**（见下方交接事项）

- 存储划分与上传 API（原图私有区、定稿私有区）
- 展示走带时效签名 URL；签名 URL 不落库、不进日志
- 技术校验：类型（jpeg/png/webp）、大小上限、最小边长、EXIF 方向纠正
- 「公开桶里的私有前缀」已排除，不得采用

## 不做

- 内容判定（本期 mock，不调用视觉模型）
- 发布/撤回的公开副本机制（待设计，见 spec 第四节）

## 验收

- 匿名会话与另一个登录用户分别直连原图 → 均失败
- 超大文件、非图片、超小图 → 被拒且不扣额度
- 竖拍带 EXIF 的照片 → 方向正确

## Events

- 交接自 02：`create_generation` 目前不校验 `p_input_path` 是否在调用者目录内。你定下存储路径 scheme 后，必须在 `0004` 里 `create or replace function create_generation` 补上该校验（路径首段必须等于 `auth.uid()`），否则用户可引用他人原图路径。
- 交接自 02：`styles.prompt` 对 anon 可读，前端查询须显式列。

## 上传阈值（2026-10-29 裁定，唯一口径）

派单时"8MB 上限"与"6MB 图应被拒绝"互相矛盾，以此表为准：

| 项 | 值 | 原因码 |
| --- | --- | --- |
| 字节上限 | 8 MiB | `too_large` |
| 像素总量上限 | 4000 万（40000000，解压炸弹防护） | `too_many_pixels` |
| 最小边长 | 256 px | `too_small` |
| MIME 白名单 | image/jpeg、image/png、image/webp | `unsupported_type` |

校验顺序固定：**字节数 → metadata 可读性 → 类型白名单 → 像素总量 → 最小边长 → 解码 + EXIF 纠正 → 重新编码**，返回第一个失败项，不合并多原因文案。

所有阈值单点定义在 `src/lib/storage/limits.ts`，路由与测试都必须引用它，禁止两处各写字面量。6MB 输入必须被**接受**。
