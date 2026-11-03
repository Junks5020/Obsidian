---
tags:
  - ng-design
  - udp-report-table
status: completed
date: 2026-10-09
updated: 2026-10-09
---

# 报表设计器公开选区读取 API

相关：[[../../00-版本总览]] · [[../../research/2026-10-09-新版报表计算选区与数值能力答复]] · [[../../report-table-ADR-0006-第一阶段采用最小兼容API集]]

业务需要读取完整区域，例如 B2:D6，而不是仅获取焦点单元格。新增 `ref.current.reportApi.getSelectedRange()`，避免宿主依赖内部页面观察器和 Handsontable。

- 返回公开类型 `ReportSelectedRange | null`，字段为 `startRow`、`startCol`、`endRow`、`endCol`。
- 坐标从 0 开始，包含结束行列；反向拖选统一为左上至右下的边界。
- 读取最后一个选区，多区域数组读取不在本次范围。
- 整行、整列及全选返回实际单元格边界，排除行列头的 `-1`。
- 尚未初始化、未选中或选区无效返回 `null`；只读状态仍可读取。
- 保持现有 `getCurrentCell()`、区域选择、编辑权限及设计保存结构的行为。
- 补充公共类型导出、API 文档和现有设计器演示；完成针对性测试和组件构建。

实施：[[issues/01-公开选区读取接口]]。

## 实施结果

当前工作树已完成 API、公开类型导出、组件文档和设计器演示，API 行为及组件边界 48 项测试通过，组件 ESM/CommonJS 构建与类型声明生成通过。未进行浏览器实机验收；尚未提交、发布。
