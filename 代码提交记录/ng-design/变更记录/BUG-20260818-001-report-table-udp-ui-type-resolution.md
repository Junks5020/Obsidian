---
tags:
  - ng-design
  - commit-tracking
  - bug
  - report-table
status: active
date: 2026-08-18
updated: 2026-08-18
---

# report-table udp-ui 类型解析与依赖边界修复

## 症状

`udp-report-table` 在 IDE 中从 `@newgrand/udp-ui` 导入 `borderStyle`、`NGLayout` 和 `IToolBarProps` 时出现 `TS2305`；干净安装后问题稳定出现。

## 根因

- `udp-report-table/tsconfig.json` 重新声明 `paths` 后覆盖了根配置，却没有保留 `@newgrand/udp-core` 源码映射。
- 干净安装会移除 workspace 中被忽略的 `udp-core/es` 与 `udp-ui/es` 构建产物，导致 `udp-ui` 的 `export * from '@newgrand/udp-core'` 无法展开。
- `udp-report-table` 源码直接引用 `udp-core`，但包清单只声明了 `udp-ui` peer dependency，依赖边界不一致。

## 修复

- 将 `IToolBarProps` 统一从 `@newgrand/udp-ui` 导入，源码与测试中不再直接引用 `udp-core`。
- 将 `@newgrand/udp-ui` peer dependency 最低版本提升到 `^7.0.28`，并同步 lockfile。
- 在组件 TypeScript 配置中补齐 `udp-core` 与 `udp-ui` 源码映射，使 IDE 不依赖本地构建产物。

## 影响范围

- `package-lock.json`
- `packages/@newgrand/udp-report-table/package.json`
- `packages/@newgrand/udp-report-table/src/design/index.tsx`
- `packages/@newgrand/udp-report-table/src/design/types.ts`
- `packages/@newgrand/udp-report-table/tsconfig.json`

## Source Commit

- Branch: `ljx-7.0`
- Commit: `057ae6d70d0a4aca3a3c4b4e80d5c835d22fd018`
- Subject: `fix(report-table): 修复 udp-ui 类型解析与依赖边界`
- Date: 2026-08-18

## Branch Matrix

| Branch | Status | Commit | Verification | Notes |
| --- | --- | --- | --- | --- |
| `sync_branch` | 待关联 | - | - | 尚未指定是否反向同步到开发分支 |
| `ljx-7.0` | 已同步 | `057ae6d70d0a4aca3a3c4b4e80d5c835d22fd018` | TypeScript 5.4.2 `--noEmit` 通过；pre-commit lint-staged 通过 | 本地提交，尚未推送 |

## Validation

- `node node_modules/father/node_modules/typescript/bin/tsc -p packages/@newgrand/udp-report-table/tsconfig.json --noEmit --pretty false` 通过。
- `git diff --check` 通过。
- 提交钩子 `lint-staged --allow-empty` 通过。
- Git 文件范围确认仅包含上述 5 个核心文件。

## Synchronization

- `ljx-7.0`：已提交，尚未推送。
- `sync_branch`：待确认是否需要同步。
- 关联需求：发现多个 functional-sync 记录提到相同类型依赖阻塞，因匹配不唯一暂不自动关联。

Related: [[../01-提交覆盖矩阵]]
