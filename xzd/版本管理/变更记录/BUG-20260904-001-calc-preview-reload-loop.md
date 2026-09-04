---
id: BUG-20260904-001
type: bug
status: completed
commit: uncommitted-wip
source_branch: ng-design:ljx-7.0
created: 2026-09-04
updated: 2026-09-04
target_versions: [ljx-7.0]
tags: [version-change, bug, ng-design, udp-report-table, calculation-preview, reload-loop, tree-report]
---

# BUG-20260904-001：计算预览打开后页面卡死、树节点收起自动复原

相关：[[work-items/report-table-sync-20260902/spec]]、[[report-table-同步术语表]]

## 问题与修复

- 问题现象：报表设计器点击「计算」打开计算预览后，整页变得非常卡（多列报表尤其明显）；此时点击树状节点的展开/收起不生效——点击收起后节点自动又展开。
- 根因：`ReportTable` 的预览 store 同步 effect（`src/preview/table/index.tsx`）把 `filterRangeMap`/`userLayouts` 的**默认 props（`= {}` / `= []`）**同时写入依赖数组和预览 store。每次渲染都产生新的空对象/空数组引用 → effect 重跑 → store notify → 组件重渲染 → 新引用 → effect 再跑，形成无限渲染循环（React 报 `Maximum update depth exceeded`）；循环的每一轮都会经由 `PreviewTableSheets` 的重载 effect 触发一次全量 `handleLoadGlobalSettings`（loadData + 4 次 updateSettings + 样式/树重建），多列报表下每轮代价极高，直接卡死页面。
- 树节点收起自动复原：每次重载都会调用 `initializeTreeRows`，把折叠状态重置回 `getInitialCollapsedNodeKeys()` 的初始态（showLevel 较高时为全部展开），用户刚做的收起被下一轮循环抹掉。
- 修复内容：把 `filterRangeMap`/`userLayouts` 的默认值改为无默认 props + `useRef` 稳定的空对象/空数组，仅当宿主显式传入时才使用传入值；sync effect 一律使用稳定引用。循环被掐断在源头，页面一次加载即稳定。
- 影响范围：`src/preview/table/index.tsx`；所有使用 `ReportTable` 的预览（计算预览、报表预览页）。行为语义不变——未传 props 时仍按空对象/空数组处理，只是引用稳定。

## 回归测试

`packages/@newgrand/udp-report-table/tests/calc-mode-reload-loop.test.cjs`

- 用 jsdom + React 18 挂载**真实** `ReportTable` + `PreviewTableSheets`（Handsontable 以 stub 实例代替），复刻计算模式挂载方式。
- 测试 1：挂载后观察 3 秒，断言全量加载 ≤ 2（修复前：数百~数千次 loadData）。
- 测试 2：折叠根节点后空闲 1 秒，断言折叠保持（修复前：`toggled: [] → after idle: [1,2]`，即自动展开）。
- 修复前（临时回退修复源码）确认两条均 red；修复后全绿。包内全部 89 条测试通过。

## 术语对照

- 「收起自动复原」= 树可见性 owner（树折叠）被重载期的 `initializeTreeRows` 重置为初始折叠集。
- 卡顿 = `筛选提交事务/加载`路径被无限重复执行的「全量加载」放大；本包术语「可见性 owner」制衡被打破。

## 后续建议

共享 store hook（`src/context/index.tsx` 的 `useContext`）对 selector 结果不做浅比较，任何 store 通知都会重渲染所有订阅组件；本次循环被源头修复掩盖，但该放大器仍建议在架构改造中处理（见 [[ng-design-Agent工作流配置]] 的领域文档约定）。