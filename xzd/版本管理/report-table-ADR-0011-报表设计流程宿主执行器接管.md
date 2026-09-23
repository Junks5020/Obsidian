---
tags:
  - report-table
  - ADR
status: accepted
date: 2026-09-22
---

# ADR-0011：报表设计三流程由宿主执行器接管

2026-09-17 交付的 `apiUrl` 三接口换地址与 `apiTransform` 入参/出参拦截，交付后宿主反馈真正需要的是整体接管保存与取数预览的请求流程（含读取，保证存取闭环），而不是在组件的 `NG.request` 前后做变换。决定移除这两个 prop，改为单一 `apiExecutor` 对象：读取设计、保存设计、计算取数预览三个流程各提供一个可选执行器函数，接收包内构造的标准入参，返回平台信封 `{Code, Msg, Data}`；不传或部分传时对应流程走内置默认实现。这是 [[report-table-ADR-0004-第一阶段复用现有服务适配层]] 当年明确推迟的"宿主注入 API"方案在三个报表设计流程上的落地。

相关：[[report-table-同步术语表]] · [[work-items/report-design-api-executor/spec]] · [[work-items/report-design-api-transforms/spec]] · [[00-版本总览]]

## Considered Options

- 保留 `apiTransform` 并叠加执行器：不采用。`transformRequest`/`transformResponse` 的能力被执行器内部完全覆盖，两套定制入口语义重叠，维护与文档成本高。
- 只开保存 + 取数预览两个流程：不采用。宿主替换持久化后读取仍走平台默认地址，存取闭环断裂，设计会在下次打开时静默回退。
- 执行器接管全部编排（含提示 UI、loading、后续动作）：不采用。契约过大，每个宿主都要重实现校验与交互，默认与自定义路径行为漂移。
- 导出内置默认执行器供宿主组合调用：不采用（2026-09-22 决策）。宿主自行发送对应请求，包不提供默认实现的公共出口。

## Consequences

- `apiUrl`/`apiTransform` 为破坏性移除。该能力交付数日、仓库内无业务消费者，影响可控。
- 宿主后端必须适配平台信封与各流程 `Data` 契约：保存返回 `remainSheetCount`，计算预览返回计算报表数据（经包内 `normalizeCalculationReportSheets` 正规化），读取返回设计详情。
- 入参构造与出参正规化函数（`build*` / `normalize*`）维持公共导出，供宿主在执行器内外使用。
- 打印流程与本地发布订阅预览（`table_preview`）维持内部，不因本决策扩大开放面。
