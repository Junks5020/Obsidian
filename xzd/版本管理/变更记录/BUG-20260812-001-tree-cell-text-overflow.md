---
id: BUG-20260812-001
type: bug
status: completed
commit: fd2480793f96a5451ef34caef19a2abf07152163
source_branch: 6.5.2-dev
created: 2026-08-12
updated: 2026-08-12
target_versions: [6.5.1-dev, 6.5.1, 6.5.2-dev, 6.5.2, ljx-7.0]
tags: [version-change, bug, report-web, preview, tree-report, text-overflow]
---

# BUG-20260812-001：树状单元格文字溢出与悬浮全文缺失

相关：[[BUG-20260804-001-preview-table-regression]]、[[SYNC-20260731-001-report-tree-performance-to-6.5.2]]

## 问题与修复

- 问题现象：树状报表单元格中的长文字超过单元格宽度后没有省略；鼠标悬浮时也不显示完整文字，与普通单元格行为不一致。
- 根因：树渲染器使用独立 React 节点，没有接入普通文本单元格的 `.text` 溢出目标；预览表的悬浮全文逻辑还显式排除了树类型。
- 修复内容：树文本使用专用文本标记；树容器与文本增加 flex 收缩、溢出隐藏和省略样式；树类型接入统一溢出 title 判定；保留显式自动换行语义。
- 影响范围：报表预览树状单元格及溢出全文提示；不涉及接口、数据结构、数据库或设计态保存格式。

## Git 信息

- 来源分支：`6.5.2-dev`
- 来源 Commit：`fd2480793f96a5451ef34caef19a2abf07152163`
- 目标分支：`6.5.2`
- 目标 Commit：`014fbe8af8dd2e5de17127b9faf195cf21cd5ade`
- 合并方式：在独立 worktree `.worktree/sync-6.5.2` 无冲突 cherry-pick。
- 等价校验：来源与目标补丁的 stable patch-id 均为 `051fee5ad004ee7e6f8424110dbd562309d046e7`。
- 6.5.1-dev 来源 Commit：`8f7cf8aca6e532640964f7f323c9ccf8a29f29a2`
- 6.5.1 目标 Commit：`89c67d17ee302c9b72a8d5ce88fc7dd414d5504b`
- 6.5.1 合并方式：在独立 worktree `report-web.worktrees/sync-6.5.1` cherry-pick；`treeRender/index.tsx` 因目标分支仍保留旧 `useMemo` 包裹层而发生单文件冲突，按来源提交移除不完整依赖的 `useMemo`，保留叶子节点不绑定点击事件及 `.treeText` 溢出目标。
- 6.5.1 等价说明：冲突适配导致 stable patch-id 不同；目标提交包含来源提交的 6 个文件和完整行为，聚焦测试及全部树预览回归通过。

## 版本同步

| 版本名称 | 是否需要同步 | 当前状态 | 合入 Commit | 验证结果 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 6.5.1-dev | 是 | 验证中 | `8f7cf8aca6e532640964f7f323c9ccf8a29f29a2` | 聚焦测试、全部树预览测试和预览表回归测试通过 | 来源提交，已存在于 `origin/6.5.1-dev` |
| 6.5.1 | 是 | 已同步 | `89c67d17ee302c9b72a8d5ce88fc7dd414d5504b` | 聚焦测试、全部树预览测试、预览表回归测试及 `git diff --check HEAD^ HEAD` 通过 | 本地提交，尚未推送；保留工作树原有 `ngproxy.ini` 未提交改动 |
| 6.5.2-dev | 是 | 验证中 | `fd2480793f96a5451ef34caef19a2abf07152163` | 聚焦测试与全部树预览测试通过 | 来源提交，已存在于 `origin/6.5.2-dev` |
| 6.5.2 | 是 | 已同步 | `014fbe8af8dd2e5de17127b9faf195cf21cd5ade` | 聚焦测试、全部树预览测试、预览表回归测试及 `git diff --check` 通过 | 本地提交，尚未推送 |
| ljx-7.0 | 待确认 | 待关联 | - | - | 本次用户仅指定同步到 `6.5.2` |

## 验证

- `tests/tree-preview-cell-overflow.test.ts`（6.5.1 分支）与 `tests/tree-preview-overflow.test.ts`（6.5.2 分支）：通过。
- `tests/tree-preview-collapse.test.ts`：通过。
- `tests/tree-preview-filter-range.test.ts`：通过。
- `tests/tree-preview-first-render.test.ts`：通过。
- `tests/tree-preview-indent.test.ts`：通过。
- `tests/tree-preview-schema-level.test.ts`：通过。
- `tests/preview-table-regression.test.ts`：通过。
- `git diff --check HEAD^ HEAD`：通过。
- 来源与目标 stable patch-id 一致。

## 同步结论

修复已同步到本地 `6.5.1` 与 `6.5.2` 分支；目标提交分别为 `89c67d17ee302c9b72a8d5ce88fc7dd414d5504b` 与 `014fbe8af8dd2e5de17127b9faf195cf21cd5ade`，均尚未推送远端。
