---
id: BUG-20260908-001
type: bug
status: completed
commit: uncommitted-wip
source_branch: ng-design:sync_branch
created: 2026-09-08
updated: 2026-09-08
target_versions: [report-web-local, udp-report-table-7.0.15]
tags: [version-change, bug, report-web, udp-report-table, report-design, handsontable, route-switch]
---

# BUG-20260908-001：切换报表设计时加载了上一份报表的 schema

相关：[[report-web-术语表]]、[[report-table-同步术语表]]

## 问题与修复

- 问题现象：在报表管理中打开 A 报表、返回列表、再进入 B 报表时，地址和标题已经是 B，但表格画布仍显示 A 的合同内容；浮动图片也会随 A 的 schema 一起残留。
- 根因：`DesignReportTable` 使用跨路由复用的设计 store 和 Handsontable 实例。切换到 B 时，`TableSheets` 的首次 effect 可先观察到 store 中 A 的 `reportDetail`，却只判断“详情是否存在”，没有核对该详情是否属于当前路由；同时旧的字体/图片异步加载可在路由变更后继续回写画布。
- 修复内容：`canInitializeReportDesign` 现在强制校验详情的 `reportId`（表格）或 `printId`（打印）与当前路由相同；已有报表在详情尚未返回或身份缺失时保持等待。`TableSheets` 通过布局 effect 在首帧前清空复用的 HOT 实例，并为初始化、Sheet 切换和数据集回填传递同一版本取消令牌；`loadSheet` 在每个异步边界检查令牌，旧任务不能加载数据或关闭新路由的 loading。首挂载时未完成初始化的 mergeCells/hidden-axis 插件也被安全跳过。
- 影响范围：报表设计和打印设计共享同一初始化门禁；新建空白报表、同一报表的数据集回填和已启用的 HOT 插件重置仍保持原有契约。额外修正批量加载时无效字段/数据集单元格被误标为有效的问题。

## 回归测试

`packages/@newgrand/udp-report-table/tests/design-detail-wait-state.test.cjs`

- 修复前：新增断言失败，说明旧详情可通过初始化条件。
- 修复后：详情归属、打印 `printId`、保留 HOT 画布、取消旧异步加载、未就绪插件和无效单元格行为均有可执行回归覆盖；切换相关测试共 17/17 通过。
- 构建：`npm run build` 通过，并同步至 `report-web/.local-packages/udp-report-table`。
- 运行时：在本地浏览器完整复现 `7980000000000035 → 列表 → 7980000000000036`；最终 B 仅显示“公告标题”数据，没有 A 的合同内容或浮动图片。

## 预防

共享 store 的详情对象必须带有并校验其所属实体 ID；“详情已存在”不是“详情属于当前路由”的充分条件。所有会操作复用 UI 实例的异步路径都必须绑定路由版本，并在每个 `await` 后复核；可从 HOT 取得的插件对象不代表其内部状态已初始化。
