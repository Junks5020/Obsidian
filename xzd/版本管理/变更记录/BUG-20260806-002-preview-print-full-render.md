---
id: BUG-20260806-002
type: bug
status: verifying
source_commit: f6289e600c3657a8fc4bd86979eee68950ed64a6
source_branch: 6.5.1-dev
target_commit: e7923f7bcf92ca3fb87bfd4c961305b81859bf94
created: 2026-08-06
updated: 2026-08-28
target_versions: [6.5.1]
tags: [version-change, bug, report-web, preview, print, pdf, virtualization]
---

# BUG-20260806-002：虚拟化预览打印前未全量渲染

相关：[[BUG-20260804-001-preview-table-regression]]、[[02-6.5.1-dev至6.5.1修复同步审计-20260727]]、[[00-版本总览]]

## 问题与修复

- 问题现象：预览表格启用行列虚拟化后，打印和 PDF 导出生成表格前没有临时扩大渲染范围，屏外行列可能尚未完成渲染。
- 根因：打印入口直接调用 `generatePDFByHandsontable`，没有在生成期间临时覆盖 Handsontable 的视口渲染偏移量。
- 来源提交：`f6289e600c3657a8fc4bd86979eee68950ed64a6` 同时包含全量渲染修复和全局打印设置规范化修复，两者前置功能不同，不能整体 cherry-pick 到 `6.5.1`。
- 修复范围：打印和 PDF 导出都通过 `withFullTableRendering` 临时渲染全部行列；任务完成或失败后恢复原视口偏移量，实例已销毁时不再恢复。

## 选择性回溯决定

`6.5.1` 的 `ac333dd8410338a9855fc8ebc6b3edd731556c1f` 已启用 `renderAllRows={false}` 和 `renderAllColumns={false}`，因此需要回溯全量渲染保护及对应测试。

首次选择性回溯未包含 `normalizeGlobalSettings`。2026-08-12 曾随行列隐藏功能补入，随后因该功能决定不在 `6.5.1` 实现，通过 `63a5f6fafed8f45c497dc10429768a5b802f53b2` 回退；打印前全量渲染核心修复仍保留。

该决定不建立 ADR：它是一次可回退的分支适配，没有形成难以逆转的架构取舍。

## 版本同步

| 版本名称 | 是否需要同步 | 当前状态 | 合入 Commit | 验证结果 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 6.5.1-dev | 是 | 验证中 | `f6289e600c3657a8fc4bd86979eee68950ed64a6`<br>`548f3c7d78997431e630d48c55874b3d4cd60de9` | `print-full-render.test.ts` 通过 | 回滚行列隐藏功能时误删规范化函数定义，但后续调用仍保留；本提交已恢复为 6.5.1 的直接配置处理 |
| 6.5.1 | 是 | 已同步 | `e7923f7bcf92ca3fb87bfd4c961305b81859bf94` | 聚焦测试、格式与差异检查、生产构建通过 | 全量渲染保护保留；规范化补充由 `63a5f6fafed8f45c497dc10429768a5b802f53b2` 回退；本地分支尚未推送 |

## 2026-08-28 回归修复

- 现象：点击预览页面的打印时，`generatePDFByHandsontable` 抛出 `ReferenceError: normalizeGlobalSettings is not defined`。
- 根因：`3990e962ef81dd8ffa573efbbfb209ec41189d47` 回滚行列隐藏功能时删除了 `normalizeGlobalSettings` 定义；`f6289e600c3657a8fc4bd86979eee68950ed64a6` 的调用仍遗留在 `6.5.1-dev`。
- 修复：`548f3c7d78997431e630d48c55874b3d4cd60de9` 删除遗留调用及其过时测试，使 `6.5.1-dev` 的 PDF 打印配置处理与 `6.5.1` 保持一致。
- 验证：`node_modules/.bin/tsx tests/print-full-render.test.ts` 通过；未执行真实业务模板的浏览器打印验收。

## 验收决定

- 运行全量渲染聚焦测试。
- 运行现有预览虚拟化与打印相关回归测试。
- 执行格式检查、`git diff --check` 和生产构建。
- 真实业务报表的浏览器打印验收不作为本轮选择性回溯的完成门槛；未执行时必须作为残余风险保留在验证结论中。

## 交付决定

验证通过后在 `6.5.1` 创建独立的选择性回溯提交，提交主题为 `fix: 修复虚拟化预览打印和 PDF 导出异常`。不整体 cherry-pick 来源提交，目标分支记录必须填写新提交的实际完整哈希。

## 验证结果

- `6.5.1` 目标提交：`e7923f7bcf92ca3fb87bfd4c961305b81859bf94`；Git 已确认该提交被本地 `6.5.1` 包含，分支相对 `origin/6.5.1` 领先 1 个提交，尚未推送。
- `tests/*.test.ts` 共 13 个测试文件全部通过，覆盖新增全量渲染保护、预览虚拟化、资源生命周期、强制分页和 PDF rowSpan 等回归。
- `npx --no-install max setup` 通过；`npm run build` 通过，Webpack 生产构建成功。
- 两个新增文件通过 Prettier；全部暂存差异通过 `git diff --check`。`print/index.ts` 的来源文件保留目标分支既有 Promise 链格式，避免为满足全文件 Prettier 夹带无关重排。
- 依赖按仓库历史口径使用 `npm ci --legacy-peer-deps` 安装；严格模式会被锁文件中既有的 `antd` / `@newgrand/udp-ui` peer 版本冲突阻断。
- 未执行真实业务报表的浏览器打印验收，此项仍为残余风险。
