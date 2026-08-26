---
tags:
  - report-table
  - work-item
  - styling
status: ready-for-agent
date: 2026-08-26
updated: 2026-08-26
---

# 02 — 物理合并 Less 并删除不可达样式

Parent: [[work-items/report-table-style-boundary/spec]]

**What to build:** 把全部可达本地 Less 物理收进根 `src/style.less`，以零权重根命名空间限制作用域，并删除分散样式源和当前不可达规则。

**Blocked by:** [[01-建立根样式入口与公共根标识]]

**Status:** ready-for-agent

## Scope

- 盘点当前所有 Less/CSS 导入路径，区分可达本地规则、Handsontable 官方 CSS 和 3 份已确认不可达 Less。
- 将可达本地 Less 内容按 Shared、Design、Report Preview、Data Preview、Overlay / Portal 物理合并到 `src/style.less`。
- 每个迁移区段写明原文件相对路径和适用根作用域，保留维护与功能型同步线索。
- 用 `:where(.udp-report-table)` 及模式根限制规则；处理 Less 嵌套、变量、mixin、keyframes 和 font-face 时保持原语义及顺序。
- 删除所有已迁移局部 Less 及调用点导入；最终根文件不得以 `@import` 聚合它们。
- 直接删除且不迁移 `design/components/leftAddDataSet/index.less`、`design/TableDesign/components/tableSheets/index.less`、`preview/tableSheets/index.less`。
- 本 ticket 不处理 Handsontable 官方 CSS 的生成管道，也不删除运行时代码中的 CSS Modules/fallback。

## Acceptance

- [ ] 所有此前可达的本地规则在根 Less 中恰好保留一份，级联顺序和变量/mixin 语义可解释。
- [ ] 根 Less 五个分组完整，每个迁移区段都有原路径和作用域标识。
- [ ] 包内不再存在组件旁局部 Less 或对它们的导入；3 份不可达 Less 没有被激活。
- [ ] 除第三方生成工作尚由 ticket 03 接管外，不存在会命中报表根与 overlay 之外的本地选择器。
- [ ] 迁移前后设计态、报表预览、数据预览和移动端既有表现一致。
- [ ] 聚焦测试、TypeScript 检查、包构建和 `git diff --check` 通过。

## Comments

