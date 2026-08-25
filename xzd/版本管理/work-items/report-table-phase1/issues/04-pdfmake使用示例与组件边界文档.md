Status: resolved

# 04 pdfmake 使用示例与组件边界文档

Blocked by: [[issues/03-打印数据类型与契约]]

相关：[[../spec]] · [[report-table-ADR-0009-第一阶段只提供打印数据默认pdfmake消费]]

## Goal

提供独立的 TypeScript/`pdfmake` 消费示例，说明业务应用如何把 `formdata + Grids` 转成 `documentDefinition`，同时明确组件不负责 PDF 预览、下载和浏览器打印 UI。

## Acceptance

- [x] 示例不进入组件库运行时依赖和公共导出。
- [x] 示例能消费 ticket 03 的类型和数据结构。
- [x] 文档明确字体、分页、模板排版、下载和打印由业务应用负责。
- [x] PrintPlugin/Supcan 仅作为旧引擎兼容说明，不作为实现路径。

## Comments

### 2026-08-18 实施完成（claimed → resolved）

交付：

- 新增 `packages/@newgrand/udp-report-table/examples/print-pdfmake/example.ts`：
  独立 TypeScript 示例 `buildDocumentDefinition(input: ReportPrintData)`，把 ticket 03 冻结的
  `formdata + Grids` 契约转换为 `documentDefinition` 形状的纯对象：
  - `formdata` 字段输出为文本行；每个 `grid` 输出一个 pdfmake 表格（表头取首行键，支持
    `id`/`containerId`，行兼容对象或 JSON 字符串）；
  - 仅 `import type` 引入 `ReportPrintData`/`PrintTableRow`，**不 import pdfmake**、
    **不在 `src/` 下、不进入公共导出**（father 只构建 `src`，`examples/` 不产出到 es/lib）。
- 新增 `examples/print-pdfmake/README.md` 边界文档：明确**字体加载/注册、分页与页面布局、
  模板排版、下载与浏览器打印 UI 均由业务应用负责**；`PrintPlugin`/Supcan（旧打印封装）仅作
  历史兼容说明，**不作为本示例与本阶段交付的实现路径**；引用 Obsidian 对应 ADR-0009。
- 组件库仍不新增 `pdfmake` 依赖、不新增 `buildPdfMakeDocumentDefinition` 等公共排版转换函数。

验证：

- 新增 `tests/report-print-pdfmake-example.test.cjs` 5 项全绿：example 在 `examples/` 而非 `src`、
  无 pdfmake import/require、仅 type import 包、`buildDocumentDefinition` 产出合法
  documentDefinition（formdata 文本 + grid 表格 + header），`containerId` 变体与空数据正常、
  README 边界词存在。
- 全量 `node --test` 120/120；包级类型检查 0 错误（src/examples 均覆盖）；`father build` 成功，
  es/lib 不含 `examples/`。

说明：

- 示例以 `@newgrand/udp-report-table` 包名导入，类型对应发布后的新版本（含 ticket 03/01/02 的
  新增导出）；当前工作树内由测试以 `ts.transpileModule` 验证结构正确性。
- 边界说明已同时落 Obsidian（本 ticket）与仓库示例 README（示例旁文档属于代码交付物）。

### 2026-08-25 后续决策

仓库中的 `examples/print-pdfmake/` 已移除。上述内容记录 2026-08-18 的历史交付与验收结果；本次移除不影响 `ReportPrintData`、打印数据校验/序列化或组件库公共 API。删除原因与影响见 [[report-table-打印示例删除决策-20260825]]。
