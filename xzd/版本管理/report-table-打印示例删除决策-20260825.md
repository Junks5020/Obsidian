---
tags:
  - report-table
  - decision
  - pdfmake
status: accepted
date: 2026-08-25
updated: 2026-08-25
---

# report-table 打印示例删除决策

相关：[[report-table-ADR-0009-第一阶段只提供打印数据默认pdfmake消费]] · [[work-items/report-table-phase1/issues/04-pdfmake使用示例与组件边界文档]] · [[00-版本总览]]

## 决策

删除 `packages/@newgrand/udp-report-table/examples/` 下的独立 `pdfmake` 示例代码和 README。组件库继续保留 `ReportPrintData`、打印数据校验/序列化能力以及打印数据边界定义。

## 影响评估

- 不影响组件库运行时代码、公共 API、构建产物或 npm 包发布；`package.json` 本来只发布 `lib` 和 `es`。
- 不影响业务页面，仓库内没有其他代码引用该示例。
- 会失去一份可直接复制的 `formdata + Grids` 到 `documentDefinition` 的接入样例，以及仓库内的打印边界说明。
- 示例本身只是最小演示，不包含生产所需的模板排版、字体注册、分页、列宽、下载和打印流程；保留为代码文件的收益有限。

## 保留边界

打印数据仍由组件库输出，`pdfmake` 或其他打印引擎仍由业务应用选择和组装。相关接入原则保留在 Obsidian 的 ADR、术语表和本决策记录中；后续如需要完整打印接入示例，应作为独立文档或业务应用示例重新建设。

## 与历史记录的关系

ticket 04 记录的是 2026-08-18 的示例交付事实，本决策记录 2026-08-25 的后续移除，不改写历史验收结果。
