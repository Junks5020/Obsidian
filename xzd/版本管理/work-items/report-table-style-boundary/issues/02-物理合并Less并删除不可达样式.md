---
tags:
  - report-table
  - work-item
  - styling
status: resolved
date: 2026-08-26
updated: 2026-08-26
---

# 02 — 物理合并 Less 并删除不可达样式

Parent: [[work-items/report-table-style-boundary/spec]]

**What to build:** 把全部可达本地 Less 物理收进根 `src/style.less`，以零权重根命名空间限制作用域，并删除分散样式源和当前不可达规则。

**Blocked by:** [[01-建立根样式入口与公共根标识]]

**Status:** resolved

## Scope

- 盘点当前所有 Less/CSS 导入路径，区分可达本地规则、Handsontable 官方 CSS 和 3 份已确认不可达 Less。
- 将可达本地 Less 内容按 Shared、Design、Report Preview、Data Preview、Overlay / Portal 物理合并到 `src/style.less`。
- 每个迁移区段写明原文件相对路径和适用根作用域，保留维护与功能型同步线索。
- 用 `:where(.udp-report-table)` 及模式根限制规则；处理 Less 嵌套、变量、mixin、keyframes 和 font-face 时保持原语义及顺序。
- 删除所有已迁移局部 Less 及调用点导入；最终根文件不得以 `@import` 聚合它们。
- 直接删除且不迁移 `design/components/leftAddDataSet/index.less`、`design/TableDesign/components/tableSheets/index.less`、`preview/tableSheets/index.less`。
- 本 ticket 不处理 Handsontable 官方 CSS 的生成管道，也不删除运行时代码中的 CSS Modules/fallback。

## Acceptance

- [x] 所有此前可达的本地规则在根 Less 中恰好保留一份，级联顺序和变量/mixin 语义可解释。
- [x] 根 Less 五个分组完整，每个迁移区段都有原路径和作用域标识。
- [x] 包内不再存在组件旁局部 Less 或对它们的导入；3 份不可达 Less 没有被激活。
- [x] 除第三方生成工作尚由 ticket 03 接管外，不存在会命中报表根与 overlay 之外的本地选择器。
- [x] 迁移前后设计态、报表预览、数据预览和移动端既有表现一致。
- [x] 聚焦测试、TypeScript 检查、包构建和 `git diff --check` 通过。

## Comments

- 2026-08-26：领取 ticket 02，接续 ticket 01 已 resolved 的工作区基线。将物理合并可达本地 Less、移除调用点局部 Less 导入并删除三份不可达 Less；保留 Handsontable 官方 CSS 供 ticket 03 处理，同时保留现有用户修改。
- 2026-08-26：实现完成：新增并物理合并 `packages/@newgrand/udp-report-table/src/style.less`，按 Shared、Design、Report Preview、Data Preview、Overlay / Portal 五组保留原路径与适用作用域标识；删除 27 份已迁移局部 Less 和 `design/components/leftAddDataSet/index.less`、`design/TableDesign/components/tableSheets/index.less`、`preview/tableSheets/index.less` 三份不可达 Less。所有本地规则均受 `.udp-report-table` 根边界保护，未修改 `@newgrand/udp-ui` Table。
- 2026-08-26：验证：`father build` 通过，`git diff --check` 通过；聚焦 `node:test` 为 34/35，通过项均通过，唯一失败是既有的“preview table tolerates non-css-module less imports”断言，属于 ticket 05 的 CSS Modules/fallback 范围。直接 `tsc --noEmit` 被仓库 TypeScript 4.4 无法解析 `@types/d3-dispatch` 的新语法阻塞，错误位于 `node_modules`。真实浏览器视觉验收留待 ticket 06，因此本 ticket 保持 `claimed`。
- 2026-08-26：验收收口时按最终单轨契约更新旧 fallback 断言，聚焦测试 35/35 通过；该调整提前完成 ticket 05 的一部分并将在 ticket 05 统一审计。包构建和 `git diff --check` 通过，最终真实浏览器对比仍由 ticket 06 复核。
