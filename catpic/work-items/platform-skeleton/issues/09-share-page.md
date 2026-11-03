---
tags:
  - project/catpic
  - issue
date: 2026-10-29
---

# 09 分享页与 OG 卡片

Status: resolved
Blocked by: 07

相关：[[../spec]] · [[../../catpic-ADR-0005-一期不建公开画廊与审核]]

## 目标

把"发到群里"这条传播路径做通。

## 范围

- `/p/[id]`：已发布定稿的只读页
- OG 标题/描述/预览图，含占位效果标注
- 与未来画廊卡片复用同一个展示组件

## 验收

- 未发布或已撤回 → 404
- OG 在至少两个平台（微信/Telegram 或 X）实测抓取正确
- 记录国内访问场景下的可达性实测结论

## Comments — 完成

合入 main（`44590b4`）。`tsc` / `eslint` / `next build` 通过；`verify:share-visibility` 全绿（9 个可见性用例 + OG 文案断言）。

分享页与 `/p/[id]/image` **共用同一个** `loadShareGeneration` 与同一可见性判定，因此"页面看不到但图还能取"在结构上不可能发生。图片始终留在私有桶、现签 600s URL，307 重定向，三个分支都带 `Cache-Control: no-store`。
