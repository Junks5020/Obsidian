---
tags:
  - ng-design
  - commit-tracking
  - requirement
  - report-table
status: active
date: 2026-09-23
updated: 2026-09-23
---

# 报表设计当前值与详情手动加载

## Request

- 在 `DesignReportTableAPI` 提供同步 `getValue()`，返回当前未保存设计的保存请求结构；未就绪时返回 `null`。
- table 模式支持 `autoLoad={false}` 并通过无参 `load()` 读取当前设计详情；print 模式继续自动读取。
- `load()` 复用详情读取执行器、过期请求保护与 loading 生命周期。

## Scope

- `udp-report-table/src/design/currentValue.ts` 与 `detailLoading.ts`。
- 设计器 ref API、公共类型导出、活动 Handsontable 获取及详情加载接线。
- 相关工程规格：[[work-items/report-design-current-value-load/spec]]。

## Requirement Commits

| Commit | Branch | Date | Purpose | Validation |
| --- | --- | --- | --- | --- |
| `1ddaa7aa0810c10390dfe1398c1a90d8537bfed9` | `ljx-7.0` | 2026-09-23 | 当前设计快照与详情手动加载核心源码 | 实施记录：128 项测试与 ESM/CJS/类型声明构建通过；本次提交钩子 Prettier 通过，提交时未重跑测试 |
| `e77fabd31878468ea481ef4019f15d0be2c264e3` | `ljx-7.0` | 2026-09-23 | 对应需求测试 | 已有实施记录：128 项测试通过；本次仅提交测试文件，未重跑测试 |

## Related Bug Fixes

暂无。

## Branch Matrix

| Branch | Status | Commit | Verification | Notes |
| --- | --- | --- | --- | --- |
| `sync_branch` | 待同步 | - | - | 尚未包含该提交 |
| `ljx-7.0` | 已同步 | `e77fabd31878468ea481ef4019f15d0be2c264e3` | 已有实施记录：测试与构建通过 | 本次提交位于该分支 |
| `ljx-6.5.2` | 不适用 | - | - | 未纳入本次范围 |
| `6.5.2` | 不适用 | - | - | 未纳入本次范围 |

## Validation

- 实施工作项记录 `node --test`：128 项通过；`npm run build --workspace @newgrand/udp-report-table`：ESM、CJS 与类型声明构建通过。
- 本次提交钩子运行 staged TypeScript 文件 Prettier；提交操作未重跑测试。

Related: [[../01-提交覆盖矩阵]]
