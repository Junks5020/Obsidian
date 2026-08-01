---
id: BUG-20260731-01
type: bug
status: completed
commit: 7ddb2737768d55aaf9ca70c15cad3ab5efe370ce
source_branch: 6.5.2-dev
created: 2026-07-31
target_versions:
  - 6.5.2-dev
  - 6.5.2
  - master
tags:
  - version-change
  - bug
  - report-web
  - rich-help
  - query-condition
---

# BUG-20260731-01：通用帮助（Rich Help）多选字段被渲染为单选

## 问题与修复

- 问题现象：数据集字段已标记为多选且操作符不是 `in` 时，预览态的通用帮助（Rich Help）查询参数仍只能单选。
- 根因：预览代码仅根据 `bw` 和 `in` 操作符决定帮助组件类型，忽略了查询字段元数据中的 `multiSelectStatus` 标志。
- 修复内容：
  - 新增 `src/pages/TableManager/preview/utils/queryHelp.ts`，集中处理 Rich Help 的选择模式解析。
  - 当 `multiSelectStatus: 1` 时统一渲染为 `MultipleHelp`。
  - 保留动态参数（`paramType: 1`）在 `in` 操作符下的单选例外行为。
  - `src/pages/TableManager/preview/index.tsx` 调用新的 `shouldUseMultipleHelp` 工具函数替换原有内联判断。
- 影响范围：报表管理预览页的通用帮助查询参数渲染。

## Git 信息

- Commit：`7ddb2737768d55aaf9ca70c15cad3ab5efe370ce`
- 分支：`6.5.2-dev`
- 作者：liujinxu
- 时间：2026-07-31 13:22:24 +0800
- 标题：修复通用帮助查询参数多选

## 关键文件

- `src/pages/TableManager/preview/utils/queryHelp.ts` — 新增 Rich Help 多选判定工具。
- `src/pages/TableManager/preview/index.tsx` — 接入 `shouldUseMultipleHelp`。
- `tests/query-rich-help-multiselect.test.ts` — 新增单元测试。
- `references/bug-records.md` — BUG-20260731-01 记录。

## 版本同步

| 版本名称 | 是否需要同步 | 当前状态 | 合入 Commit | 验证结果 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 6.5.2-dev | 是 | 已合入 | `7ddb2737` | `npx tsx tests/query-rich-help-multiselect.test.ts` 通过 | 来源分支 |
| 6.5.2 | 是 | 待同步 | - | - | 暂未同步到 6.5.2 |
| master | 是 | 待同步 | - | - | 7.0 版本暂未同步 |

## 验证

- `npx tsx tests/query-rich-help-multiselect.test.ts`：通过。
- 测试覆盖场景：
  - 多选数据集字段在非 `in` 操作符下渲染为 `MultipleHelp`
  - `multiSelectStatus` 支持序列化 API 值（字符串/数字）
  - 单选字段保持单选
  - `bw` 区间帮助保持多选
  - 普通 `in` 查询保持多选
  - 未标记多选的动态参数 `in` 查询保持单选例外
  - 已标记多选的动态参数 `in` 查询渲染为 `MultipleHelp`
- Prettier、diff check、生产构建通过。
