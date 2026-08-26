---
tags:
  - report-table
  - work-item
  - overlay
status: claimed
date: 2026-08-26
updated: 2026-08-26
---

# 04 — 建立实例 overlay 并迁移可视弹层

Parent: [[work-items/report-table-style-boundary/spec]]

**What to build:** 为每个报表实例建立独立 overlay 宿主，让所有脱离组件 DOM 树的可视 UI 仍处于所属实例的样式边界内。

**Blocked by:** [[01-建立根样式入口与公共根标识]]

**Status:** claimed

## Scope

- 每个公共报表实例创建并拥有一个挂到 `body` 的 `.udp-report-table.udp-report-table--overlay` 宿主，建立实例到宿主的明确上下文。
- 在实例卸载、模式切换或初始化失败的生命周期中正确清理宿主、监听器和引用，不影响其他实例。
- 盘点并迁移所有 Ant Design overlays、Handsontable 菜单、筛选弹窗、拖拽镜像及其他可视 portal 到所属宿主。
- 弹层 API 从统一实例上下文获取宿主，避免调用点各自推断或逐个只加样式类。
- 宿主缺失时开发环境明确报错；生产环境阻止打开并记录错误，不回退到裸 `body`。
- 仅允许复制用、无样式且创建后立即移除的临时 `textarea` 短暂挂载裸 `body`，并以测试锁定例外边界。
- 本 ticket 不调整弹层外观、层级策略或交互内容。

## Acceptance

- [ ] 同页两个报表实例各自只有一个 overlay 宿主，弹层 DOM 不串到另一实例。
- [ ] 所有可视报表弹层和拖拽镜像均进入所属宿主；除临时复制 textarea 外无报表 UI 直接挂裸 `body`。
- [ ] 卸载任一实例会移除其宿主及子节点，不删除或干扰另一实例宿主。
- [ ] 缺失宿主在开发与生产环境分别符合显式失败契约，且没有 silent fallback。
- [ ] 现有弹层打开、关闭、定位、焦点、层级和交互行为不变。
- [ ] 生命周期/归属聚焦测试、TypeScript 检查、包构建和 `git diff --check` 通过。

## Comments
