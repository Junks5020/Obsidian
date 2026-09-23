---
tags:
  - report-table
  - work-item
status: implemented
date: 2026-09-23
updated: 2026-09-23
---

# udp-report-table 当前设计快照与详情加载时机

相关：[[00-版本总览]] · [[report-table-ADR-0011-报表设计流程宿主执行器接管]]

## 已确认范围

- 在 `DesignReportTableAPI` 顶层提供同步 `getValue()`，返回当前尚未保存设计对应的保存请求结构；表格设计使用 `SaveReportDesignPayload`，打印设计使用 `PrintDesignSavePayload`。
- 设计详情、当前工作表或 Handsontable 尚未就绪时，以及处于计算模式时，`getValue()` 返回 `null`。快照从当前内存状态生成，不提交保存请求。
- 表格设计默认自动调用 `findReportDesignDetail`。宿主传入 `autoLoad={false}` 可关闭自动读取，并在合适时机调用 `ref.current.load()`。
- `load()` 读取当前 `id` 对应的设计详情，返回 `Promise<boolean>`：当前请求收到并应用 `Code === 200` 响应时为 `true`；无标识、非 200 或已过期请求为 `false`；网络异常向调用方 reject。
- 打印设计继续自动读取打印详情；`autoLoad` 不控制打印详情加载。
- 手动加载复用当前 `apiExecutor.findReportDesignDetail`（如已配置）和已有的过期请求保护。

## 验收条件

- [x] TypeScript 公共类型、包入口导出、设计器 ref 与组件文档均包含新 API。
- [x] table 与 print 模式均返回保存形状的未保存快照；未就绪时返回 `null`。
- [x] `autoLoad` 默认为 `true`；关闭后 table 不自动读取，手动 `load()` 可读取；print 仍自动读取。
- [x] 自动与手动读取共用 stale-request 与 loading 生命周期保护。
- [x] `udp-report-table` 全量测试和 ESM/CJS/声明构建通过。

## Comments

- 2026-09-23：按确认的 API 形状与加载策略实施，细节和验证记录见 [[work-items/report-design-current-value-load/issues/01-当前设计快照与详情手动加载]]。
