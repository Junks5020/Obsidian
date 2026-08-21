---
tags:
  - ng-design
  - commit-tracking
  - bug
  - udp-mobile-ui
  - attachment
status: active
date: 2026-08-21
updated: 2026-08-21
---

# 移动端附件切换单据后显示旧内容

## 症状

客户先审批一条附件金额为 2800 的单据，过一段时间打开另一条附件金额应为 4810 的单据时，仍看到金额 2800 的旧附件。同一时间使用该客户账号登录可看到正确附件；卸载重装 App 后恢复正常。

## 根因

附件组件复用时保留了上一条单据的组件内状态。`editRef` 在首次初始化后持续阻止后续 `value` 对应附件重新加载，因此切换单据后仍展示旧文件与预览状态。

## 修复

- 增加稳定的附件绑定键，绑定变化时重新加载附件。
- 重新初始化前清理旧文件、预览及分类状态。
- 保留 `initRequestIdRef` 请求竞态保护和列附件 session GUID，避免旧请求回写或产生重复初始请求。

## 影响范围

- `packages/@newgrand/udp-mobile-ui/src/component/Attachment/attachment.tsx`

## Source Commit

- Branch: `ljx-6.5.2`
- Commit: `c6cffd9a84410b4648d6b31bcb8e7210ed3b5583`
- Subject: `fix: 修复移动附件缓存`
- Date: 2026-08-21

## Branch Matrix

| Branch | Status | Commit | Verification | Notes |
| --- | --- | --- | --- | --- |
| `sync_branch` | 不适用 | - | - | 7.0 开发线，本次未指定同步 |
| `ljx-7.0` | 不适用 | - | - | 7.0 发布线，本次未指定同步 |
| `ljx-6.5.2` | 验证中 | `c6cffd9a84410b4648d6b31bcb8e7210ed3b5583` | 附件测试 6/6 通过；移动组件库构建通过 | 本地提交，尚未推送；仅包含附件组件核心代码 |
| `6.5.2` | 待同步 | - | - | 发布分支不包含源提交，待确认是否同步 |

## Validation

- `npm run test:mobile-attachment`：6/6 通过。
- `npm run build --workspace=@newgrand/udp-mobile-ui`：通过，ESM/CJS 各生成 553 个文件。
- `git diff --check`：通过。
- 提交钩子 `lint-staged`：通过。
- 独立 `tsc --noEmit` 受仓库现有 `udp-core` 与 TypeScript 4.4 对 `export type *` 的兼容问题影响，非本次变更引入。
- 自动化测试源码已从组件库提交中移除并归档到 [[../测试用例/移动端附件切换单据缓存回归测试]]，供后续回归复用。

## Synchronization

- `ljx-6.5.2`：已提交，尚未推送。
- `6.5.2`：待确认是否需要同步。
- 关联需求：未找到匹配记录，本 Bug 独立登记。
- 提交整理：`b19495448725d1bd383d50e75b0a0f07cb03c5c8` 已通过 amend 被 `c6cffd9a84410b4648d6b31bcb8e7210ed3b5583` 取代；测试源码未进入最终提交。

Related: [[../01-提交覆盖矩阵]]
