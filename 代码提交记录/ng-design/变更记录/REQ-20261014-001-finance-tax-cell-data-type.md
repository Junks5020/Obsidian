---
tags:
  - ng-design
  - commit-tracking
  - requirement
  - report-table
status: implemented-uncommitted
date: 2026-10-14
updated: 2026-10-14
---

# 财税报表单元格数据类型选择

相关：[[../01-提交覆盖矩阵]] · [[../../../xzd/版本管理/00-版本总览]]

## Request

在组件库的财税模式中，按用户提供的属性面板截图增加“单元格类型”下拉框。用户确认选项为“文本 / 数值 / 日期”，默认文本。

## Scope

- `DesignReportTable` 的 `type="table"` 且 `financeTax={true}` 时，在文本、字段、表达式、财税单元格的“数据”页签追加下拉框；打印设计与非财税模式隐藏，沿用设计器只读控制。
- 前端新增类型标记 `cellData.dataType`，取值为 `text` / `number` / `date`；缺省按文本展示。该标记不改变已有业务 `cellType`，不转换内容值，不新增服务接口。
- 文本渲染与表单写回保留完整 `cellData`，避免内容更新时覆盖类型；两条保存路径保留只有类型配置、没有内容的单元格。
- 更新现有设计器 API 表及 TypeScript 类型说明。

## 需求提交

| Commit | Branch | Date | Purpose | Validation |
| --- | --- | --- | --- | --- |
| 未提交 | `ljx-7.0` | 2026-10-14 | 财税单元格数据类型下拉框、配置保留与回归测试 | 89 项聚焦测试、组件 ESM/CJS/声明构建、浏览器交互验证通过 |

当前工作目录为 `ng-design.worktrees/sync_branch`，Git 实际检出的分支是 `ljx-7.0`。本需求尚未提交、推送或发布，没有可登记的提交哈希。

## 关联 Bug 修复

实现验收中发现旧文本 renderer 每次执行 `cellProperties.cellData = { value }`，导致新增类型立即丢失。本次改为保留现有数据后更新 `value`，并先用失败测试复现，再验证修复。

## Branch Matrix

| Branch | Status | Commit | Verification | Notes |
| --- | --- | --- | --- | --- |
| `sync_branch` | 待关联 | - | 未审计 | 本次没有同步该分支 |
| `ljx-7.0` | 待关联 | - | 本地测试、构建、浏览器通过 | 未提交、未发布，后端未联调 |
| `ljx-6.5.2` | 不适用 | - | - | 未纳入本次范围 |
| `6.5.2` | 不适用 | - | - | 未纳入本次范围 |
| `ljx-6.5.1` | 不适用 | - | - | 未纳入本次范围 |
| `6.5.1` | 不适用 | - | - | 未纳入本次范围 |

## Validation

- `node --test` 执行 `finance-tax-cell-data-type`、`design-current-value`、`report-design-payload`、`report-i18n`、`bulk-cell-load`、`feature-sync`、`udp-report-table-boundaries` 七个测试文件：89/89 通过。新增用例覆盖模式开关、适用单元格、三项取值、动态多语言、文本重绘、空内容与 0 在两条序列化路径中的保留。
- `npm run build`（`packages/@newgrand/udp-report-table`）：ESM、CJS 与声明文件构建成功。
- 浏览器 Dumi 独立演示：非财税模式隐藏；开启后出现三个选项；数值和日期在切换单元格后保留；内容编辑与 `reportApi.setCellData()` 后保留日期类型；独立财税单元格保留数值类型；只读模式禁用；打印模式隐藏。
- Prettier 检查与 `git diff --check` 通过。
- 浏览器截图：`C:/Users/jinxu/.codex/visualizations/2026/10/14/01a1395f-cd82-70d2-83e2-3e2da83c4467/finance-tax-cell-type.jpg`。
- 本机代理后端 `localhost:8888` 不可达；新增工作表的许可查询、打印设计字段查询返回 504。未执行真实后端保存、服务端重新读取或计算/导出消费验收。`cellData.dataType` 是本次前端新增约定，后端字段消费尚待对接确认。

## 后端对接契约（当前源码核对）

- 字段为单元格元数据 `cellData.dataType?: 'text' | 'number' | 'date'`，UI 默认 `text`；历史数据未带 `dataType` 时按 `text` 兼容。它不是单元格业务类型 `cellType`，也不是设计器功能开关 `financeTax`。
- 数据页签选择值写入当前选中单元格的 `cellData.dataType`。适用范围仍由财税表格模式控制：`financeTax=true` 时，文本、字段、表达式、财税单元格显示该选择器。
- 保存请求没有独立的顶层 `dataType` 参数；字段位于 `schema` JSON 字符串内：`JSON.parse(payload.schema)[sheetIndex].cells[cellIndex].cellData.dataType`。解析后的单元格示例：

  ```json
  {
    "row": 0,
    "col": 0,
    "cellName": "A1",
    "cellType": "text",
    "cellData": { "value": "123.45", "dataType": "number" }
  }
  ```

  `schema` 是整份 sheets 数组的 JSON 字符串，不是以上单元格对象本身；保存 body 其余字段沿用现有契约。内置保存地址为 `/reportcenter/reportDesign/saveReportDesign`；若配置 `apiExecutor.saveReportDesign`，则标准 payload 由宿主执行器接管。计算预览也以同一 `schema` 结构传值。
- 服务端应在保存与详情读取之间原样保留嵌套的 `cellData.dataType`。不要因 `cellData.value` 为空而过滤只有类型配置的单元格；`0` 也应保留。选择 `number` 或 `date` 只是类型标记，前端不转换 `cellData.value`，后端的解析、格式及计算/导出消费规则需另行约定。
- 关键源码：`packages/@newgrand/udp-report-table/src/design/TableDesign/components/cusToolbar/rightCellProperties/cellProperiesForms/cellDataTypeForm.ts`、`src/design/types.ts`、`src/design/reportPayload.ts`、`src/design/apiUrls.ts`、`src/design/service.ts`。流程执行器契约另见 [[../../../xzd/版本管理/report-table-ADR-0011-报表设计流程宿主执行器接管]]。
- 当前工作树尝试重跑财税类型与保存 payload 两个专项测试，因环境缺少 `typescript` 依赖而未能启动；此前记录中的 89 项测试通过结果是原需求实施时的历史验收，不能视作本次后端联调或当前环境复测。
