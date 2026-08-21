---
tags:
  - report-table
  - 文档
  - 同步
status: accepted
date: 2026-08-13
updated: 2026-08-19
---

# udp-report-table 文档同步计划（2026-08-13）

以 `ng-design:sync_branch` 当前工作树为文档基线，`/excel-table/excel` 是唯一完整接入入口，名称统一为“ReportTable 报表组件”。设计器示例继续使用真实接口；数据预览与报表预览使用各自合法、确定性的示例契约，公共 API 从源码类型自动生成。基础组件目录中的重复 ReportTable 页面不再作为第二事实源。

## 2026-08-19 第一阶段设计同步

在保持 `/excel-table/excel` 为唯一完整接入入口的前提下，将 [[work-items/report-table-phase1/spec|硕正报表第一阶段前端对接]] 已交付设计同步到仓库 docs：

- 补充 `ReportTableMinApi` 的行列、单元格、选区、合并和工作表读取能力表与本地确定性示例。
- 补充 `REPORT_TOOL_BAR_FUNC`、`REPORT_LIMIT`、`readOnly` / `isView` 总开关及工具栏、右键菜单、命令式 API 三入口一致性。
- 明确公式字段保留只保证加载、编辑、保存和导入导出不丢失，不包含公式引擎或实时计算。
- 补充 `ReportPrintData`、`validatePrintData`、`serializePrintData`、`formdata + Grids` 与默认 `pdfmake` 消费边界。
- 设计器示例继续访问真实报表接口；新增 API、权限与打印示例均使用本地确定性数据。
- 不新建第二套报表文档页面，避免形成重复事实源。

相关：[[report-table-同步术语表]] · [[work-items/report-table-phase1/spec]] · [[report-table-ADR-0006-第一阶段采用最小兼容API集]] · [[report-table-ADR-0007-第一阶段权限仅作前端交互控制]] · [[report-table-ADR-0008-第一阶段不实现公式引擎]] · [[report-table-ADR-0009-第一阶段只提供打印数据默认pdfmake消费]] · [[00-版本总览]]
## 2026-08-19 API 交互演示补充

在 `/excel-table/excel` 的现有报表文档页面中新增 API 按钮演示区，继续复用第一阶段最小兼容 API 集，不新增独立报表文档页面。

- 每个稳定的 `ReportTableMinApi` 方法对应一个固定参数按钮，覆盖读取、变更、选区、合并和工作表读取能力。
- 读取类按钮将方法名和返回值输出到浏览器控制台，并在页面显示最近一次调用结果；变更类按钮只操作本地确定性演示数据并刷新表格。
- 底部 API 区域改为引用真实公开类型，保持与其他组件文档的 `<API>` 展示约定一致；未支持 API 不创建演示按钮。

相关：[[report-table-同步术语表]] · [[report-table-ADR-0006-第一阶段采用最小兼容API集]] · [[00-版本总览]]

## 2026-08-19 DesignReportTable 单入口收敛

`/excel-table/excel` 收敛为 `DesignReportTable` 的单一文档入口。删除 `ReportTable` 数据预览、报表预览、树控制、权限和打印数据等独立章节与示例；仍需公开的已交付 API 演示合并到 `DesignReportTable` 示例，不再以脱离设计器的本地模拟表格作为文档主体验。

- 文档标题、介绍、代码演示和公共类型展示均以 `DesignReportTable` 为主语。
- `ReportTable` 及其独立示例不再出现在该文档页面。
- `ReportTableMinApi` 仅通过 `DesignReportTable` 的 `ref.reportApi` 操作真实设计器，不再使用独立本地模拟表格。
- 公开导出 `DesignReportTableAPI` ref 类型，文档和业务接入不使用 `any` 访问 `reportApi`。
- “已交付 API”明确限定为 `ref.reportApi` 暴露的全部 `ReportTableMinApi` 方法；树控制函数、打印数据工具函数和独立权限判断工具不纳入本页演示。
- 同一个 `DesignReportTable` 演示提供“空白设计”和“真实报表”两种可切换数据源：空白设计用于安全执行完整变更 API，真实报表用于验证加载已有设计后的 API 行为。
- 真实报表模式允许输入报表 ID，默认值为当前示例 ID `7980000000000008`；报表 ID 变化时重新挂载设计器，隔离前后两份设计状态。
- 文档演示中的 `handleToolBarAction` 对保存、删除布局、导入、导出、预览等宿主动作统一返回 `true`，只记录 action/payload，不继续执行组件默认后端操作；真实报表模式的 API 变更仅停留在浏览器内存。
- 27 个 `ReportTableMinApi` 演示按钮统一放在 `DesignReportTable` 页面内的紧凑操作区，按行列、显示与尺寸、单元格、选区与合并、工作表读取分组；切换分组不重新挂载设计器，调用结果显示在操作区顶部。
- API 因设计器未初始化、坐标无效或权限禁止而返回 `false` / `null` 时，演示区统一显示方法名、调用结果和原始返回值，不弹出错误提示，以明确呈现 fail-soft 契约。
- 保留 `DesignReportTable` 的表格设计、打印设计和只读查看模式；模式切换时重新挂载设计器，避免设计状态混用，并以只读模式验证变更 API 的权限返回。
- 删除文档移除章节后不再被引用的 `preview.tsx`、`sheets.tsx`、`tree.tsx`、`minApi.tsx`、`permission.tsx`、`printData.tsx` 和旧 `apiDemo.tsx`；新的 API 操作区合并进 `design.tsx`，`ViewportReportDemo.tsx` 仅在新示例继续使用时保留。
- 页面底部自动 API 类型表只保留 `DesignReportTableProps`、`DesignReportTableAPI` 和 `ReportTableMinApi`；移除 `ReportTableProps`、`ReportTableAPI` 等预览组件类型。
- “重置演示”通过重新挂载当前 `DesignReportTable` 实例恢复：空白模式回到默认工作表，真实报表模式重新请求当前 ID 的设计数据，并同时清空最近一次 API 与工具栏调用结果。

### 实施结果

状态：已完成（2026-08-19）。结构编辑 API 的 Handsontable 15 动作兼容性修复记录见 [[变更记录/BUG-20260819-002-report-table-alter-action-compatibility]]。

- `/excel-table/excel` 已收敛为 `DesignReportTable` 单入口，页面仅保留一个真实设计器示例和三个公开类型表。
- `DesignReportTableAPI` 已作为公开类型导出，`ref.reportApi` 覆盖全部 27 个 `ReportTableMinApi` 方法。
- 示例已实现空白设计/真实报表、表格设计/打印设计/只读查看、报表 ID 输入、分组 API 操作区、安全工具栏拦截和重新挂载重置。
- 已删除 `ReportTable` 预览、树控制和独立 API/权限/打印数据示例；测试明确约束这些重复示例不得恢复。
- 聚焦自动化测试 76/76 通过；`@newgrand/udp-report-table` 包构建和 dumi 正式构建通过。
- 仓库锁定的 TypeScript 4.9.5 无法解析当前 `@types/d3-dispatch` 声明语法；以 TypeScript 5.6.3 运行同一包级配置检查通过。
- 浏览器验收覆盖桌面与窄屏：真实报表 ID 加载成功，`getRows()` 返回 `20`，保存动作只记录 `table_save` payload；窄屏结果区已改为上下堆叠，按钮无重叠。

相关：[[report-table-同步术语表]] · [[report-table-ADR-0006-第一阶段采用最小兼容API集]] · [[00-版本总览]]
