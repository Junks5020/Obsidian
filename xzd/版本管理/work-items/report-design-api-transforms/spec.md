---
tags:
  - report-table
  - work-item
status: resolved
date: 2026-09-17
updated: 2026-09-17
---

# udp-report-table 报表设计入参/出参 API

相关：[[00-版本总览]] · [[report-table-ADR-0005-第一阶段只交付组件库]]

## 已确认范围

在已有 `apiUrl` 字符串替换之上，为 `findReportDesignDetail`、`previewReportData`、`saveReportDesign` 增加 `apiTransform` 钩子，并把入参构造、出参正规化导出为公共 API。组件仍使用 `NG.request`。打印接口和工具栏拦截不开放。

处理顺序：包内构造标准入参 → `transformRequest` → `NG.request` → `transformResponse` → 包内正规化 `Data`。

## 已确认验收

- 包内 `node --test tests` 与 `@newgrand/udp-report-table` 构建通过。
- 文档 `docs/excelTable/excel.md` 描述 `apiTransform` 与导出函数。

## 后续变更

2026-09-22：本规格交付的 `apiUrl`/`apiTransform` 能力被 [[report-table-ADR-0011-报表设计流程宿主执行器接管|ADR-0011]] 移除，由 `apiExecutor` 三流程执行器取代；后续见 [[work-items/report-design-api-executor/spec]]。
