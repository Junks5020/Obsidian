---
tags:
  - report-table
  - ADR
status: accepted
date: 2026-08-18
---

# ADR-0009：第一阶段只提供打印数据，默认由 pdfmake 消费

第一阶段不在 `ng-design` 中实现打印引擎、Supcan 运行时或浏览器打印流程。组件只负责输出稳定的打印数据、模板/业务主键传递、失败状态和使用说明，默认以 `pdfmake` 作为消费方，由业务应用自行组装 `documentDefinition` 并完成 PDF/打印实现。现有 `PrintPlugin` 作为旧引擎兼容参考保留，不作为本阶段验收条件。

打印数据沿用现有 `formdata + Grids` 结构；本阶段不重新设计一套新的打印数据模型。

本阶段只提供 TypeScript 数据类型和独立 `pdfmake` 使用示例，不新增公共 `buildPdfMakeDocumentDefinition()` 转换函数。

相关：[[report-table-同步术语表]] · [[research/2026-08-18-硕正报表第一阶段对接范围]] · [[report-table-ADR-0006-第一阶段采用最小兼容API集]] · [[00-版本总览]]

## Considered Options

- 组件内置 Supcan/PrintPlugin 打印：不采用，运行时依赖重且把旧引擎锁定到组件库。
- 组件内置完整 PDF 排版：不采用，业务模板和排版规则差异大，超出组件库边界。
- 提供打印数据 + `pdfmake` 使用方式：本阶段采用，组件与打印引擎解耦，业务方可替换消费方案。

## Consequences

- 第一阶段验收重点转为数据结构、模板参数、业务主键和错误状态，而不是打印机或 PDF 像素结果。
- `pdfmake` 不进入组件库运行时依赖；使用方自行维护其版本、字体、页面布局、分页和浏览器下载/打印策略。
- PDF 预览、下载和浏览器打印 UI 由业务应用负责，组件库不维护打印展示生命周期。
- 若未来需要统一打印效果或服务端打印，再单独立项，不回填为本阶段组件职责。
- 若 `pdfmake` 后续需要专用排版模型，新增显式转换层，不破坏现有 `formdata + Grids` 输入契约。
- 业务模板和 PDF 排版规则不进入组件库公共 API，避免把单一业务的文档布局固化为组件能力。
