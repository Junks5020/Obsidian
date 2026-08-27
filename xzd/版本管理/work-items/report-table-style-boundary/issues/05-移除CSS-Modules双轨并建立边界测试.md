---
tags:
  - report-table
  - work-item
  - testing
  - styling
status: claimed
date: 2026-08-26
updated: 2026-08-26
---

# 05 — 移除 CSS Modules 双轨并建立边界测试

Parent: [[work-items/report-table-style-boundary/spec]]

**What to build:** 完成单轨命名空间全局样式切换，删除 CSS Modules/fallback 兼容，并用结构与边界测试阻止全局污染回归。

**Blocked by:** [[02-物理合并Less并删除不可达样式]]、[[03-生成带命名空间的Handsontable样式]]、[[04-建立实例overlay并迁移可视弹层]]

**Status:** claimed

## Scope

- 删除代码中对 CSS Modules 映射、`styles.foo || 'foo'`、普通类名回退及相关类型/loader 假设的依赖。
- 统一使用根命名空间保护的确定普通类名，保留迁移所需内部 DOM 类名但不把它们声明为公共契约。
- 清除旧全局样式入口、重复 CSS、兼容开关和无用构建配置，确保最终只有一个本地样式消费链。
- 扩展现有 `node:test` 边界测试，扫描 Less/CSS、导入图和关键运行时代码。
- 测试禁止：包内残留局部 Less、CSS Modules/fallback、未授权裸全局选择器、提交生成 CSS、第三方 CSS 副本、可视 UI 裸 `body` fallback。
- 测试允许并明确列举：keyframes/font-face 等合法 at-rules，以及复制临时 textarea 的受控例外。

## Acceptance

- [ ] CSS Modules 与普通类名 fallback 代码为零，运行时只使用命名空间全局类名。
- [ ] 本地样式只有根 `src/style.less`，第三方样式只有自动生成消费链，公共组件只自动加载一个入口。
- [ ] 自动测试能对故意加入的越界选择器、局部 Less、生成物或 fallback 可靠失败。
- [ ] 四个稳定根标识持续受公共边界测试保护，内部类名未新增公共导出承诺。
- [ ] 全部现有 `node:test`、TypeScript 检查、包构建、文档构建和 `git diff --check` 通过。
- [ ] 与迁移前相比，除边界外元素不再被命中外无视觉或交互变化。

## Comments
