---
id: BUG-20260807-002
type: bug
status: completed
requirement: REQ-20260807-001
source_branch: 6.5.2-dev
source_commit: ad3589d8a8111cebc1e826a3208ffbb53ac2d341
target_branch: 6.5.2
target_commit: ed7eb1f1d84497f6f95f2f5e26298f2c6cbd72f5
created: 2026-08-07
updated: 2026-08-07
---

# BUG-20260807-002：隐藏行列未拦截运行时合并区域

## 症状

选择与合并单元格相交的行或列执行隐藏时，没有弹出阻止提示，可能破坏合并区域。

## 根因

校验读取 `hot.getSettings().mergeCells`。该值只表示插件是否启用；用户通过 API 创建的实际合并范围保存在 `mergeCells` 插件的 `mergedCellsCollection` 中。

## 修复

隐藏前读取实时 MergeCells 插件集合，并保留序列化数组输入兼容；增加运行时集合、空集合和行列相交回归断言。

## 关联需求

该 bug 是 [[变更记录/REQ-20260807-001-report-row-column-visibility\|REQ-20260807-001]] 的后续修复，归入行列隐藏需求，不单独作为无关功能。

## 分支覆盖

| 分支 | 状态 | 提交 |
| --- | --- | --- |
| `6.5.2-dev` | ✅ 已验证 | `ad3589d8a8111cebc1e826a3208ffbb53ac2d341` |
| `6.5.2` | ✅ 已同步 | `ed7eb1f1d84497f6f95f2f5e26298f2c6cbd72f5` |

## 验证

`tests/row-column-visibility.test.ts`、`tests/context-menu-hidden-axes.test.ts` 和 `npm run build` 通过；全量 TypeScript/ESLint 的既有依赖问题不影响本次构建结果。
