---
id: BUG-20260819-002
type: bug
status: completed
commit: pending
source_branch: sync_branch
created: 2026-08-19
updated: 2026-08-19
target_versions: [ljx-7.0]
tags: [version-change, bug, ng-design, report-table, handsontable, api]
---

# BUG-20260819-002：ReportTableMinApi 结构编辑动作名不兼容 Handsontable 15

相关：[[report-table-文档同步计划-20260813]] · [[report-table-同步术语表]] · [[report-table-ADR-0006-第一阶段采用最小兼容API集]] · [[00-版本总览]]

## 问题与修复

- 现象：在 `DesignReportTable` 文档演示中点击 `insertRows(1, 1)` 抛出 `There is no such action "insert_row"`，列插入也使用了同类无效动作名。
- 根因：`ReportTableMinApi` 适配层沿用了旧版 Handsontable 的 `insert_row` / `insert_col`，而当前 Handsontable 15 的 `alter` 只接受 `insert_row_above`、`insert_row_below`、`insert_col_start`、`insert_col_end`、`remove_row`、`remove_col`。
- 修复：将按索引插入映射为 `insert_row_above` 和 `insert_col_start`，保持 API 在指定索引处插入的语义；删除动作保持不变。
- 影响范围：`packages/@newgrand/udp-report-table/src/api/reportTableApi.ts` 与对应最小 API 回归测试；不改变公共 API 名称或权限语义。

## 验证

- `node --test packages/@newgrand/udp-report-table/tests/report-table-min-api.test.cjs packages/@newgrand/udp-report-table/tests/report-toolbar-permissions.test.cjs packages/@newgrand/udp-report-table/tests/udp-report-table-boundaries.test.cjs tests/report-api-demo.test.cjs`：71/71 通过。
- `npx lerna run build --scope @newgrand/udp-report-table`：通过。
- `npx -p typescript@5.6.3 tsc -p packages/@newgrand/udp-report-table/tsconfig.check.json --noEmit --pretty false`：通过。
- 浏览器打开 `http://localhost:8001/#/excel-table/excel`，依次点击 `insertRows`、`insertCols`、`deleteRows`、`deleteCols`：均返回 `true`，未再出现结构编辑动作异常。

## Git 信息

- 分支：`sync_branch`
- Commit：待提交
