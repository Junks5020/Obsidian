---
id: BUG-20260819-001
type: bug
status: completed
commit: pending
source_branch: sync_branch
created: 2026-08-19
updated: 2026-08-19
target_versions: [ljx-7.0]
tags: [version-change, bug, ng-design, report-table, docs, performance]
---

# BUG-20260819-001：报表 API 演示持续触发布局重排告警

相关：[[report-table-文档同步计划-20260813]] · [[report-table-同步术语表]] · [[00-版本总览]]

## 问题与修复

- 问题现象：打开报表组件文档后，Chrome 控制台持续输出 `[Violation] Forced reflow while executing JavaScript took <N>ms`。
- 根因：Dumi 会同时挂载同一文档页中的设计器、数据预览、报表预览和树节点控制演示，导致视口外仍有 4 套重型报表实例持续参与渲染；API 按钮演示最初又额外挂载了一套 `ReportTable`。此外，预览单元格悬停路径通过 `scrollWidth/clientWidth` 同步读取布局，鼠标移动时会放大强制重排。
- 修复内容：API 演示改用轻量 HTML 表格，不再实例化 `ReportTable`；新增 `ViewportReportDemo`，通过 `IntersectionObserver` 只在接近视口时挂载设计器、数据预览、报表预览和树节点控制演示，离开视口后卸载并保留稳定占位高度；预览单元格悬停不再同步测量布局，直接为非换行文本提供完整值 `title`；移除 `ReportTable` 卸载时对 Handsontable 的重复手动销毁，交由 `@handsontable/react` 生命周期处理。
- 影响范围：报表组件文档演示的挂载生命周期，以及预览单元格的原生标题提示；不改变 `ReportTableMinApi`、组件公共导出或业务数据契约。

## 验证

- `node --test tests/report-docs-reflow.test.cjs tests/report-api-demo.test.cjs packages/@newgrand/udp-report-table/tests/report-table-min-api.test.cjs packages/@newgrand/udp-report-table/tests/udp-report-table-boundaries.test.cjs`：61/61 通过。
- 浏览器实际打开 `http://localhost:8000/#/excel-table/excel`：修复前整页存在 4 个 Handsontable 主实例、32 个渲染层；修复后任一时刻仅挂载视口附近的 0-1 个主实例、0-8 个渲染层。
- 在 API 演示区点击 `getRows`，控制台输出 `[ReportTable API] getRows 4`；滚动切换演示和移动鼠标经过预览单元格后，没有新增 `Forced reflow`、重复销毁警告或运行时错误。
- Chrome DevTools 的 `[Violation]` 消息不通过普通 Console API 暴露，因此同时以实例数量变化、同步布局读取源码边界测试和交互期间新增日志为运行时证据。

## Git 信息

- 分支：`sync_branch`
- Commit：待提交
