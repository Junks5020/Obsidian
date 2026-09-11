---
tags:
  - ng-design
  - commit-tracking
  - bug
  - report-table
  - floating-image
status: active
date: 2026-09-09
updated: 2026-09-09
---

# 浮动图片选中态全局样式隔离

## 症状

`udp-report-table` 的透明浮动图片在 report-web 设计器中被选中时，图片容器显示整块主色蓝底；同一配置在 report-web 6.5.2-dev 中只显示轮廓与轻微阴影。

## 根因

组件库以全局 Less 输出裸类名 `selected`，而 report-web 全局 CSS 也定义了 `.selected { background-color: var(--primary-color) }`。6.5.2 使用 CSS Modules 生成哈希类名，因此不受该宿主选择器影响。

## 修复

- 将浮动图片选中态从 `selected` 改为组件专用的 `floatImageSelected`。
- 保留 6.5.2 原有的 `outline` 与轻微 `box-shadow`，不改变 Handsontable 普通单元格选区规则。
- 在 `feature-sync.test.cjs` 中固定专用类名和样式存在性回归检查。

## 影响范围

- `packages/@newgrand/udp-report-table/src/floatingImage/index.tsx`
- `packages/@newgrand/udp-report-table/src/floatingImage/index.less`
- `packages/@newgrand/udp-report-table/tests/feature-sync.test.cjs`

## Source Commit

- Branch: `ljx-7.0`
- Commit: `1d6daf681ecb256306a4b96d9bd5a63d8caded8e`
- Subject: `fix(report-table): isolate floating image selected style`
- Date: 2026-09-09

## Branch Matrix

| Branch | Status | Commit | Verification | Notes |
| --- | --- | --- | --- | --- |
| `sync_branch` | 待关联 | - | - | 未指定是否需要反向同步到开发分支 |
| `ljx-7.0` | 已同步 | `1d6daf681ecb256306a4b96d9bd5a63d8caded8e` | `feature-sync` 15/15、组件库构建、本地包哈希校验、report-web 架构测试 23/23、8473 运行态 CSS 校验通过 | 本地提交；远端跟踪分支当前不可用 |
| `ljx-6.5.2` | 不适用 | - | - | 6.5.2 使用 CSS Modules，不存在该全局类名冲突 |
| `6.5.2` | 不适用 | - | - | 同上 |

## Validation

- `node packages/@newgrand/udp-report-table/tests/feature-sync.test.cjs`：15/15 通过。
- `npm run sync:udp-report-table`：组件库构建完成，源与 report-web 本地包产物哈希一致。
- `npm run test:architecture`（report-web）：23/23 通过。
- 8473 运行态资源确认 `floatImageSelected` 存在，旧的 `.floatImage.selected` 不存在。
- 提交钩子 `lint-staged --allow-empty` 通过。

## Synchronization

- `ljx-7.0`：已提交，尚未推送；`origin/ljx-7.0` 当前不可用。
- `sync_branch`：待确认是否需要同步。
- 关联需求：`FEATURE-20260731-001-report-floating-image`。

Related: [[../01-提交覆盖矩阵]]
