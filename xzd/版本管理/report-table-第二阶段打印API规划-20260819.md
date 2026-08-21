---
tags:
  - report-table
  - phase2
  - print
  - api
status: proposed
date: 2026-08-19
updated: 2026-08-19
---

# udp-report-table 第二阶段打印 API 规划

相关：[[report-table-同步术语表]] · [[report-table-ADR-0006-第一阶段采用最小兼容API集]] · [[work-items/report-table-phase1/spec]] · [[report-table-文档同步计划-20260813]] · [[00-版本总览]]

## 结论

第一阶段已完成并由用户验证通过。下一阶段建议优先实现打印 API，但交付目标应是 `@newgrand/udp-report-table` 的宿主无关打印边界，不是把 `@newgrand/udp-ui` 的 Supcan `PrintPluginApi` 原样复制到报表组件包。

当前状态要区分两层：

1. `@newgrand/udp-ui` 已有 `PrintPluginApi`，并支持 `loadTemplate`、`beginBatchPrint`、`loadBatchPage`、`endBatchPrint` 等流程，但它依赖 Supcan 和浏览器运行时。
2. `@newgrand/udp-report-table` 第一阶段已经交付 `ReportPrintData`、`validatePrintData`、`serializePrintData` 和 pdfmake 消费示例，但没有打印运行时编排 API。

因此，“打印对应 API”是下一阶段的首要候选，但要通过注入适配器接入打印引擎，避免组件库绑定 Supcan、PDF 或浏览器打印实现。打印数据 API 不是 `type="print"` 专属能力，`type="table"` 也必须可用。

## 两层能力边界

### 通用打印能力（`table` 与 `print` 都提供）

`DesignReportTable` 的 ref 应提供统一的 `printApi`，至少负责把当前设计器上下文转换为外部可消费的打印数据：

- 读取当前报表/工作表数据、打印模板标识和业务主键；
- 输出或校验第一阶段冻结的 `ReportPrintData`；
- 将打印数据交给宿主注入的 `ReportPrintAdapter`；
- 提供单次打印、批量打印所需的生命周期编排，但不直接调用具体打印引擎。

在 `type="table"` 下，数据来源是当前报表设计/报表数据；在 `type="print"` 下，数据来源是打印设计上下文。两种模式的打印数据输出入口保持一致，不能要求业务方为了打印切换到另一种组件类型。

### 打印设计能力（仅 `print` 提供）

页面尺寸、边距、页眉页脚、分页、打印区域等可视化编辑仍属于 `type="print"` 的设计能力。它影响打印数据中的模板/布局上下文，但不改变通用 `printApi` 的调用方式。

## 第二阶段建议顺序

### P0：打印数据与运行时边界

- 冻结并继续复用第一阶段的 `formdata + grids + templateId + businessKey` 数据契约，不重新发明打印数据结构。
- 新增在 `table`、`print` 两种模式均可访问的 `ReportPrintApi`，并新增宿主可注入的 `ReportPrintAdapter` 类型边界，至少覆盖：
  - `loadTemplate(templateId)`
  - `loadPrintData(data)`
  - `beginBatchPrint(options?)`
  - `loadBatchPage({ data, businessKey? })`
  - `endBatchPrint()`
  - `print(options?)` 或由宿主通过回调处理
  - `export(options?)` 或由宿主通过回调处理
- 明确每个方法的异步返回值、失败结果和调用顺序；禁止把 Supcan 的 `doFunc`、全局状态或具体引擎对象泄漏到公共类型。
- 在 `udp-report-table` 中只负责数据校验、生命周期编排和宿主回调；具体模板加载、PDF 排版、浏览器打印由宿主适配器负责。
- 增加 fake adapter 的单元测试、调用顺序测试、失败恢复测试和只读/权限边界测试。

### P0：打印设计器接线与文档

- `DesignReportTable` 无论 `type="table"` 还是 `type="print"` 都通过 `ref.printApi` 暴露通用打印 API；不要把打印 API 混入现有 `reportApi`。
- `type="print"` 只额外提供打印设计编辑能力，不得成为业务获取打印数据的前置条件。
- 在文档中补充单次打印、批量打印、模板加载和宿主接管示例。
- 标注 Supcan 适配器为可选宿主实现，不作为 `udp-report-table` 的默认依赖。

### P1：有真实调用样例后再做的能力

- `getPrintPages()`：只有业务确实需要页数/分页信息时立项；不能因为原生 API 清单存在就自动兼容。
- `print(options)` 与 `export(options)`：先确认宿主的 PDF、浏览器打印或旧引擎选择，再冻结参数，避免绑定某一种输出引擎。
- 工作表管理：`setWorksheetName`、`deleteWorksheet` 等只在拿到真实业务调用样例后加入；第一阶段已有读取 API，不应无样例扩大范围。
- 公式和计算：`calc`、`parseExp`、`runExp`、用户函数等暂缓，除非出现明确的设计态实时计算需求和可接受的计算引擎边界。

### P2：暂缓

- 原生事件锁：`subscribeEvent`、`enableEventLock`、`eventLock`、`eventUnLock`。
- 未确认的工具栏常量和业务菜单路由（批量计算、批量打印列表、合并报表等）。
- `findCell`、`getCellName`、`addEditAbleOnly` 等未被真实业务消费的原生 API。
- Supcan 运行时替换、后端打印接口、业务页面和菜单接入；这些不属于组件库公共 API 阶段。

## 立项前必须确认

- 业务应用实际需要的是旧 `PrintPlugin` 兼容，还是 pdfmake/浏览器打印等新宿主能力。
- 模板加载、打印数据加载和批量页之间的真实调用顺序及错误处理要求。
- 单次打印、批量打印、预览和导出是否需要统一返回值。
- `printApi` 的公共数据入口是否按 `table`/`print` 统一返回 `ReportPrintData`，以及模板标识如何由宿主传入或由当前设计上下文解析。
- 业务宿主是否通过 `printAdapter` 注入引擎，还是由宿主直接消费 `printApi` 输出的数据。
- 是否存在真实的页数、分页设置或打印回调消费者。

## 推荐的第一个交付切片

先实现两种模式共用的 `ReportPrintApi` 数据出口、`ReportPrintAdapter` 类型、生命周期编排和一个 fake adapter 示例，不接入 Supcan，不增加后端接口，不实现 PDF 排版。该切片验证 `table` 与 `print` 的统一调用边界后，再接入一个真实宿主适配器。

## 验收标准

- `@newgrand/udp-report-table` 不新增 Supcan、pdfmake 或浏览器打印运行时依赖。
- 打印数据契约与第一阶段 `ReportPrintData` 保持兼容。
- fake adapter 能覆盖成功、失败、重复调用、未加载模板和批量打印顺序场景。
- 文档明确组件库、宿主适配器、打印引擎和业务路由的责任边界。
- 用户真实调用样例确认后，再决定是否实现 `getPrintPages`、工作表变更和公式计算 API。
