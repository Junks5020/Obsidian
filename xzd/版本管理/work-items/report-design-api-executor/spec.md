---
tags:
  - report-table
  - work-item
status: resolved
date: 2026-09-22
updated: 2026-09-22
---

# udp-report-table 报表设计流程宿主执行器

相关：[[00-版本总览]] · [[report-table-ADR-0011-报表设计流程宿主执行器接管]] · [[work-items/report-design-api-transforms/spec]]

## 已确认范围

移除 `apiUrl`（三接口 URL 替换）与 `apiTransform`（三接口入参/出参拦截）公共能力及类型 `DesignReportTableApiUrls`、`DesignReportTableApiTransforms`；新增单一对象 prop `apiExecutor`：

- 三个可选键沿用接口名：`findReportDesignDetail` / `previewReportData` / `saveReportDesign`，三键独立可选，未提供的键走内置默认实现（`NG.request` + 平台地址）。
- 执行器契约为 1:1 替换服务层函数：入参为包内构造的标准入参（`FindReportDesignDetailRequest` / `PreviewReportDataPayload` / `SaveReportDesignPayload`），返回平台信封 `{Code, Msg, Data}`。
- 入参修改、请求发送、出参适配全部发生在执行器内部；组件保留前置校验、标准入参构造、`Code` 判定、保存成功提示与剩余许可数提醒、计算数据正规化与计算态切换。
- 不导出内置默认执行器；宿主自行发送对应请求。
- 入参构造与出参正规化函数（`build*` / `normalize*`）维持公共导出不变。
- 打印流程与 `table_preview`（本地发布订阅预览）维持内部，不开放。

## 已确认验收

- 包内 `node --test tests` 与 `@newgrand/udp-report-table` 构建通过。
- 现有 `apiUrl`/`apiTransform` 相关测试更新为 `apiExecutor` 用例：不传走默认、部分传/全传走自定义、信封 `Code` 判定。
- 文档 `docs/excelTable/excel.md` 移除 `apiUrl`/`apiTransform` 条目，新增 `apiExecutor` 说明与示例。

## Comments

- 2026-09-22：实施完成（`ng-design:ljx-7.0`）。`apiUrls.ts` 移除 `apiUrl`/`apiTransform` 与变换机制，新增 `DesignReportTableApiEnvelope`/`DesignReportTableApiExecutor`；`service.ts` 三流程执行器优先、缺省走内置 `NG.request`；store/props/入口导出同步。执行器键查找保留三流程守卫（print 键即使误传 store 也不解析，测试覆盖该边界）。测试 `node --test tests/*.test.cjs` 123 全过；`father build` 通过，`lib/index.d.ts` 仅导出新类型。文档 `docs/excelTable/excel.md` 已更新。
