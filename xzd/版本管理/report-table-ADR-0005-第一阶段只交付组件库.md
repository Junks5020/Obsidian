---
tags:
  - report-table
  - ADR
status: accepted
date: 2026-08-18
---

# ADR-0005：第一阶段只交付组件库

硕正报表第一阶段前端交付限定在 `ng-design` 的报表设计/预览组件、API 适配、工具栏与权限交互、打印插件联调和边界测试；不在本仓库实现 `msgfi-frc` / `msgfi-gc` 的业务路由、菜单页面或业务列表。业务应用只消费组件库并单独负责页面、菜单权限和业务数据编排。

相关：[[report-table-同步术语表]] · [[research/2026-08-18-硕正报表第一阶段对接范围]] · [[report-table-ADR-0004-第一阶段复用现有服务适配层]] · [[00-版本总览]]

## Consequences

- 组件库阶段可以独立验收公共 API、交互权限和打印联调，不被业务页面排期阻塞。
- `/frc/reportForm/form`、`/frc/report/batchPrint/printPlan` 等路由只作为消费方验收场景，不产生本仓库页面代码。
- 业务应用仍需另行安排页面接入、菜单权限、列表接口和业务打印数据的联调。
