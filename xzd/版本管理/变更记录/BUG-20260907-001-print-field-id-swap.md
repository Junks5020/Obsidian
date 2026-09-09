---
id: BUG-20260907-001
type: bug
status: completed
commit: uncommitted-wip
source_branch: ng-design:ljx-7.0
created: 2026-09-07
updated: 2026-09-07
target_versions: [ljx-7.0]
tags: [version-change, bug, ng-design, udp-report-table, print-design, field-binding]
---

# BUG-20260907-001：打印设计打开时误报“单元格绑定的字段不存在”

相关：[[work-items/report-table-sync-20260902/spec]]、[[report-table-同步术语表]]

## 问题与修复

- 问题现象：组件以打印设计模式打开已有模板时，即使 `listField` 已返回绑定字段，页面仍弹出“单元格绑定的字段不存在”。同一模板在 `report-web` 6.5.2 中不会误报。
- 根因：`normalizePrintDataSetFields` 仍沿用旧兼容逻辑，把接口字段的 `fieldId` 与 `fieldName` 互换，并额外生成 `realFieldId`。模板加载校验使用 `cellData.fieldId === dataSetFieldInfoVO.fieldId` 精确匹配，因此保存的后端字段编码无法命中被替换成显示名称的 `fieldId`。
- 修复内容：与 `report-web` 6.5.2 的字段契约对齐，打印 `listField` 标准化时原样保留后端 `fieldId` 和 `fieldName`，不再人为交换或生成 `realFieldId`；拖拽、字段属性、图表、树、查询、过滤和联查链路统一用 `fieldId` 持久化、用显示名称渲染。
- 兼容性：已有模板保存的是后端字段编码，加载后可直接匹配；普通报表路径未改动。两条保存路径仍会把升级前内存数据里的 `realFieldId` 转回 `fieldId` 并移除兼容字段，避免热更新或未保存草稿写入错误字段。

## 回归测试

`packages/@newgrand/udp-report-table/tests/print-design-payload.test.cjs`

- 修复前：打印字段标准化与 `getPrintListField` 两项契约测试失败，可稳定复现字段编码被换成显示名称。
- 修复后：增加“标准化字段必须命中已有单元格绑定”、字段消费链路统一契约、显示名称/字段编码分离及旧内存字段重新选择断言；打印专项测试 14/14 通过。
- 包内全量测试 94/94 通过，完整 `father build` 通过，`git diff --check` 通过。

## 参考实现

- `report-web` 6.5.2 修复提交：`4424e0448dfb06caab33a640a2441dda4d3c81e9`（`fix: 修复fieldId和fieldName互换的历史遗留问题`）。
