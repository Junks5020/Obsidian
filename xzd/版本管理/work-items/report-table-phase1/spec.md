---
tags:
  - report-table
  - spec
  - work-item
status: ready-for-agent
date: 2026-08-18
updated: 2026-08-18
---

# 硕正报表第一阶段前端对接

相关：[[research/2026-08-18-硕正报表第一阶段对接范围]] · [[report-table-ADR-0004-第一阶段复用现有服务适配层]] · [[report-table-ADR-0005-第一阶段只交付组件库]] · [[report-table-ADR-0006-第一阶段采用最小兼容API集]] · [[report-table-ADR-0007-第一阶段权限仅作前端交互控制]] · [[report-table-ADR-0008-第一阶段不实现公式引擎]] · [[report-table-ADR-0009-第一阶段只提供打印数据默认pdfmake消费]]

## Problem Statement

`ng-design` 已具备报表设计器、预览组件和服务适配，但尚未形成面向硕正 P0 场景的最小前端兼容边界。第一阶段需要让组件库可被业务应用消费，同时明确后端、业务路由和打印引擎不属于本仓库交付物。

## Goal

交付一套可测试、可复用的前端组件库能力：报表设计基础 API、工具栏和前端权限映射、公式字段保留、现有打印数据契约的类型与使用示例，并保持现有服务适配层和公开组件边界稳定。

## Scope

- `udp-report-table` 最小兼容 API：行列、单元格、合并、选区、当前单元格、工作表读取。
- `REPORT_TOOL_BAR_FUNC` P0 映射和 `REPORT_LIMIT` 前端交互控制。
- 公式字段保留，不实现公式解析、用户函数或实时计算。
- 现有 `formdata + Grids` 打印结构的 TypeScript 类型、字段说明和独立 `pdfmake` 使用示例。
- 既有 `/reportcenter/*`、`/RW/Print/*` 接口的前端消费和契约测试，不新增或修改后端接口。
- 现有 `node:test`、TypeScript 检查、包构建和组件边界测试。

## Out of Scope

- `msgfi-frc` / `msgfi-gc` 业务路由、菜单和列表页面。
- 后端接口、数据模型、持久化、服务端权限和业务打印数据生成。
- Supcan、PrintPlugin 打印运行时、PDF 预览/下载/浏览器打印 UI。
- `pdfmake` 运行时依赖和公共 `buildPdfMakeDocumentDefinition()` 导出。
- 公式引擎、原生事件锁、完整工作表管理、查找替换和用户函数。

## External Dependencies

- 既有报表设计和打印服务接口必须可消费；接口缺口记录为后续后端工作项。
- 业务应用负责路由、菜单权限、模板标识、业务主键和 `pdfmake` 排版/打印实现。
- 现有请求运行时 `NG.request` / `core.request` 保持可用。

## Acceptance

1. 业务代码可通过组件公共 API 完成 P0 报表设计基础操作，不直接依赖 Handsontable。
2. 工具栏、右键菜单和命令式 API 对同一 `REPORT_LIMIT` 配置表现一致。
3. 加载、编辑、保存、导入导出过程中公式字段不丢失、不被隐式改写。
4. `formdata + Grids` 类型和序列化契约有测试，示例可说明如何交给 `pdfmake` 消费。
5. 既有测试、TypeScript 检查和包构建通过；不要求 PDF 像素、Supcan 或浏览器打印验收。

## Tickets

1. [[issues/01-报表最小兼容API适配]]
2. [[issues/02-工具栏与前端权限映射]]
3. [[issues/03-打印数据类型与契约]]
4. [[issues/04-pdfmake使用示例与组件边界文档]]
5. [[issues/05-集成边界测试与收口验收]]

## Comments

- 2026-08-18：确认第一阶段为前端组件库交付，不包含后端开发和业务页面。
- 2026-08-18：确认打印由使用方实现，默认 `pdfmake`；组件只提供 `formdata + Grids` 数据和使用方式。
- 2026-08-18：ticket 01（最小兼容 API）与 03（打印契约）已交付并验收；`callFunc`/`setProp`
  的“受控白名单子集”因尚无真实业务调用样例，按 ADR-0006 暂缓，待真实调用样例后单独立项，
  不创建空壳实现。剩余 ticket 02/04/05 仍待实施。
- 2026-08-18：ticket 02/04/05 亦已交付并验收，**第一阶段（ticket 01–05）完成**。收口后全量
  node:test 120/120、包级 tsc（src/examples）0 错误、father build 成功；工具栏/右键菜单/命令式
  API 三入口共用 `REPORT_LIMIT` 门禁；示例置于 `examples/` 不进入运行时/公共导出。
