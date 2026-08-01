---
id: SYNC-20260731-001
type: sync
status: completed
source_branch: 6.5.2-dev
target_branch: 6.5.2
created: 2026-07-31
tags:
  - version-change
  - sync
  - report-web
  - tree-report
  - performance
---

# SYNC-20260731-001：树状报表与预览性能优化同步到 6.5.2

## 同步概述

将 `6.5.2-dev` 上 8 个树状报表修复与预览性能优化提交同步到 `6.5.2` 发布分支。提交 `19b4f8e5`（修复报表管理预览发送两次接口）在目标分支上变更已存在，产生空补丁，已跳过。

## 提交映射

| 来源 Commit（6.5.2-dev） | 目标 Commit（6.5.2） | 标题 | 说明 |
| --- | --- | --- | --- |
| `b9a557b6` | `902e893a` | fix: 优化报表预览大合并单元格渲染 | 合并虚拟化重构。 |
| `a3354fd9` | `06a4fdf2` | fix: 修复树状报表首行折叠节点首次渲染 | 新增 `renderCellReactRoot` 等 deferred render 逻辑。 |
| `dd46f74e` | `0007670e` | fix: 优化报表性能2 | 预览资源生命周期管理；**已在 6.5.2 中移除浮动图片相关引用**。 |
| `bd5661be` | `e072dbf6` | fix: 避免预览单元格根节点重复卸载 | 依赖 `cellRootLifecycle`。 |
| `d80175f4` | `8fb9c4fb` | feat: 增加预览树状表格全部展开收起 | 树报表工具栏展开/收起。 |
| `c524dc9b` | `0de8cbff` | fix: 修复表头过滤问题。 | 新增 `filterRender/range.ts`。 |
| `42d37ff5` | `3841fb05` | fix: 兼容父子树完整筛选范围 | 修复树筛选范围逻辑；恢复 `references/*` 文档。 |
| `adee3848` | `bec15c25` | fix: 统一树报表多列级联筛选 | 多列级联筛选统一处理。 |

## 冲突处理

### `dd46f74e` 在 6.5.2 上的适配

该提交在 `6.5.2-dev` 中引用了尚未同步到 `6.5.2` 的浮动图片组件 `PreviewFloatImageLayer`。同步时做了以下适配：

- `src/components/report/preview/table/index.tsx` 中保留了 `visibilityRootRef` 与 `tableMounted` 的渲染控制结构，但移除了 `PreviewFloatImageLayer` 的 JSX 引用。
- 其余性能与资源生命周期改动（`cellRootLifecycle.ts`、`tableRegistry.ts`、`usePreviewTableDormancy.ts`、`styleSheetRegistry.ts` 等）完整保留。

### `42d37ff5` 文档恢复

`references/blind-spots.md`、`references/bug-patterns.md`、`references/bug-records.md` 在 `6.5.2` 原分支上不存在，同步时按提交内容恢复。

## 验证

- `npx tsx tests/preview-merge-virtualization.test.ts`：通过
- `npx tsx tests/preview-resource-lifecycle.test.ts`：通过
- `npx tsx tests/tree-preview-collapse.test.ts`：通过
- `npx tsx tests/tree-preview-filter-range.test.ts`：通过
- `npx tsx tests/tree-preview-first-render.test.ts`：通过
- `git diff --check`：通过

## 版本同步

| 版本名称 | 是否需要同步 | 当前状态 | 合入 Commit | 验证结果 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 6.5.2-dev | 是 | 来源分支 | 见上方来源 Commit | - | 来源分支 |
| 6.5.2 | 是 | 已同步 | `bec15c25` | 测试通过 | 本次同步目标 |
