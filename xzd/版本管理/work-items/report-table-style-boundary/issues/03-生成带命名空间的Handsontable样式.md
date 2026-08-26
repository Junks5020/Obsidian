---
tags:
  - report-table
  - work-item
  - build
  - styling
status: resolved
date: 2026-08-26
updated: 2026-08-26
---

# 03 — 生成带命名空间的 Handsontable 样式

Parent: [[work-items/report-table-style-boundary/spec]]

**What to build:** 以依赖中的 Handsontable 官方 CSS 为唯一输入，建立可重复、不会污染全局的 PostCSS AST 生成与消费链。

**Blocked by:** [[01-建立根样式入口与公共根标识]]

**Status:** resolved

## Scope

- 在 `@newgrand/udp-report-table` 声明直接开发依赖 `postcss-prefix-selector`，并更新必要的 lockfile。
- 从已安装 `handsontable` 包解析官方 CSS，不继续维护 `src/design/css/handsontable.full.min.css` 副本。
- 使用 PostCSS 与 parser-backed 转换为 `:where(.udp-report-table)` / overlay 可消费的命名空间样式；禁止正则和通用字符串替换。
- 为 `html`、`body`、`:root`、`body > ...`、逗号列表、伪类及特殊 at-rules 定义明确转换或保留规则。keyframes、font-face 等不得被错误前缀化。
- 生成到确定的包内临时路径，加入忽略规则，不提交生成物；根样式/构建链只消费该生成结果。
- 包构建、Dumi dev、Dumi build 自动先生成；生成命令可单独运行并具有确定性。
- CI 或现有 `node:test` 入口校验输入版本、生成可重复性、禁止裸选择器及生成物未入库。

## Acceptance

- [x] Handsontable CSS 只有依赖包一个事实来源，仓库内压缩副本已移除。
- [x] 普通和特殊选择器经 AST 正确进入报表根或 overlay 边界，无无效选择器和裸全局选择器。
- [x] 连续生成两次字节一致，依赖版本变化时可稳定重建。
- [x] 直接执行包构建、Dumi 启动和文档构建均无需人工预生成。
- [x] 清理生成目录后仍可完成构建；Git 状态不出现生成 CSS。
- [x] 生成器结构测试、TypeScript 检查、包构建、文档构建和 `git diff --check` 通过。

## Comments

- 2026-08-26：完成 ticket 03。新增 `scripts/generate-handsontable-css.cjs`，以已安装 `handsontable/dist/handsontable.full.min.css` 为唯一输入，使用 `postcss-prefix-selector` 和 `postcss-selector-parser` 通过 AST 生成 `:where(.udp-report-table)` 命名空间 CSS；覆盖普通、逗号列表、`html`、`body`、`:root`、`body > ...`、伪类及 keyframes/font-face 边界，并提供 `--check` 确定性校验。
- 2026-08-26：根入口自动加载 `src/style.less` 和生成的 `src/generated/handsontable.css`；包构建、根项目 `start`/`analyze`/`docs` 前置命令以及 `.dumirc.ts` 均会自动生成样式。生成目录已加入 `.gitignore`，旧的 `src/design/css/handsontable.full.min.css` 已删除，生成物不进入 Git。
- 2026-08-26：验证通过：`npm run check:styles --workspace=@newgrand/udp-report-table`；Handsontable AST 结构及边界测试；`node node_modules/father/node_modules/typescript/bin/tsc --noEmit -p packages/@newgrand/udp-report-table/tsconfig.json`；`npm run build --workspace=@newgrand/udp-report-table`；`npx dumi build`；`git diff --check`。
