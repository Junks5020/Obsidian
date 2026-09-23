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

# 报表设计流程宿主执行器

## Request

- 移除报表设计 `apiUrl`/`apiTransform` 配置，改用 `apiExecutor` 接管读取、计算预览和保存流程。
- 执行器接收标准入参并返回 `{ Code, Msg, Data }`；未配置的流程继续使用内置请求。

## Scope

- `udp-report-table/src/design/apiUrls.ts`、`service.ts`、`store.tsx` 与公共类型/入口导出。
- 与详情手动加载共用的读取执行器接线。
- 相关工程规格：[[work-items/report-design-api-executor/spec]] 与 [[report-table-ADR-0011-报表设计流程宿主执行器接管]]。

## Requirement Commits

| Commit | Branch | Date | Purpose | Validation |
| --- | --- | --- | --- | --- |
| `1ddaa7aa0810c10390dfe1398c1a90d8537bfed9` | `ljx-7.0` | 2026-09-23 | 宿主执行器核心源码及详情手动加载集成 | 实施记录：128 项测试与 ESM/CJS/类型声明构建通过；本次提交钩子 Prettier 通过，提交时未重跑测试 |

## Related Bug Fixes

暂无。

## Branch Matrix

| Branch | Status | Commit | Verification | Notes |
| --- | --- | --- | --- | --- |
| `sync_branch` | 待同步 | - | - | 尚未包含该提交 |
| `ljx-7.0` | 已同步 | `1ddaa7aa0810c10390dfe1398c1a90d8537bfed9` | 已有实施记录：测试与构建通过 | 本次提交位于该分支 |
| `ljx-6.5.2` | 不适用 | - | - | 未纳入本次范围 |
| `6.5.2` | 不适用 | - | - | 未纳入本次范围 |

## Validation

- 实施工作项记录 `node --test packages/@newgrand/udp-report-table/tests/*.test.cjs`：123 项通过；`father build` 通过。
- 当前合并实现的实施记录为 128 项测试与 ESM/CJS/类型声明构建通过；本次提交钩子仅运行 Prettier，未重跑测试。

Related: [[../01-提交覆盖矩阵]]
