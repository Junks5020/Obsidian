---
id: REQ-20260727-001
type: requirement
status: implemented-uncommitted
commit: 待关联
source_branch: 6.5.1-dev
created: 2026-07-27
target_versions: [6.5.1-dev, 6.5.1]
tags: [version-change, requirement, report-web, performance, qiankun]
---

# REQ-20260727-001：qiankun 子应用报表标签切换性能优化

## 背景与目标

- 前置优化：`3a9b35a9ee1a34617cf49cbb66a38b9290510f68` 已解决大合并单元格预览时的滚动卡顿。
- 现存问题：报表预览作为 qiankun 子应用中的一个标签页，切换到其他主应用标签页时仍会卡顿。
- 权限边界：只能修改 `report-web` 子应用，不能修改主应用的标签管理、缓存或 qiankun 容器逻辑。
- 优化目标：子应用不可见时主动释放重资源，恢复显示时使用已有报表状态重建，同时降低长期运行中的 React Root 和动态样式泄漏风险。

## 根因分析

标签切换后，主应用通常只隐藏子应用容器，并不会卸载子应用。原实现中的 Handsontable 实例、单元格 React Root、事件监听和动态 CSSStyleSheet 会继续保留：

1. Handsontable 仍持有大量 DOM、插件、监听器和内部计算状态。
2. 虚拟滚动复用 `td` 时，旧坐标对应的 React Root 没有稳定卸载。
3. 部分 renderer 的 `unmount` 条件反向或缺失，造成残留组件实例。
4. 预览样式按规则不断创建 constructable stylesheet，缺少去重和销毁释放。
5. 设计态样式预加载存在嵌套 `forEach`，规则生成复杂度被意外放大。
6. 页面清理只依赖单个 `window.handsonTable`，多预览实例无法完整回收。

## 实现内容

### 1. 子应用隐藏休眠与恢复

- 新增 `usePreviewTableDormancy`，综合监听：
  - `IntersectionObserver`：检测报表区域是否离开可见区域。
  - `ResizeObserver`：检测容器尺寸归零或恢复。
  - `MutationObserver`：检测祖先节点的 `class`、`style`、`hidden`、`aria-hidden` 变化。
  - `document.visibilitychange`：处理浏览器页面切到后台的情况。
- 隐藏时立即关闭筛选浮层，调用 Handsontable 的 `unlisten()` 和 `suspendExecution()`。
- 持续隐藏 300ms 后，在浏览器空闲时卸载 HotTable，释放 DOM、插件、事件和单元格渲染资源。
- 重新可见时从现有 DVA 报表状态重新挂载 HotTable；短暂切换在卸载前恢复时直接继续执行。
- 可见性根节点保留在 DOM 中，确保表格卸载后仍能监测主应用容器重新显示。

### 2. 单元格 React Root 生命周期治理

- 统一使用 `row + col` 生成单元格 Root Key。
- Handsontable 复用 `td` 到新坐标前，卸载旧坐标对应的 React Root。
- 同一坐标重复渲染时复用现有 Root，避免重复 `createRoot`。
- 表格 `beforeDestroy` 时遍历可见单元格并卸载全部 Root。
- 修正文本、图片、斜线、树形和图表等 renderer 中遗漏或反向的卸载判断。

### 3. 动态样式表治理

- 使用共享规则注册表替代“每条规则创建一个 CSSStyleSheet”。
- 相同 CSS 规则全局去重，通过引用计数支持多个报表实例共享。
- 一个 constructable stylesheet 承载当前有效规则集合。
- HotTable 销毁时释放该实例持有的规则，最后一个使用者释放后移除 stylesheet。
- 修复设计态样式预加载的嵌套循环，避免规则数量增加时出现二次方级创建。

### 4. 表格实例与虚拟化

- 所有预览 HotTable 实例统一注册，页面清理时逐个销毁，不再只清理 `window.handsonTable` 指向的最后一个实例。
- 预览表格统一启用行、列虚拟化：`renderAllRows=false`、`renderAllColumns=false`。
- `window.handsonTable` 继续保留为兼容入口，但不再作为唯一生命周期来源。

## 主要代码范围

| 模块 | 作用 |
| --- | --- |
| `src/components/report/preview/table/usePreviewTableDormancy.ts` | 检测子应用可见性并驱动休眠/恢复 |
| `src/components/report/preview/table/index.tsx` | 暂停、延迟卸载、重新挂载和虚拟化配置 |
| `src/components/report/preview/table/tableRegistry.ts` | 管理全部预览表格实例 |
| `src/components/report/preview/plugins/cellRootLifecycle.ts` | 管理单元格 React Root 生命周期 |
| `src/components/report/preview/tableSheets/styleSheetRegistry.ts` | 动态 CSS 规则去重、引用计数和释放 |
| `src/components/report/preview/plugins/*` | 修正各类 renderer 的 Root 卸载路径 |
| `src/components/report/design/utils/classname.ts` | 动态样式去重及样式预加载循环修复 |
| `src/app.tsx` | 页面退出时销毁全部预览表格实例 |

## Git 信息

- 当前 Commit：`待关联`
- 原因：本次优化仍在 `6.5.1-dev` 工作区中，尚未形成可确认的 Git 提交；当前 `HEAD` 与本次改动无关，不能作为来源提交。
- 来源分支：`6.5.1-dev`
- 前置优化提交：`3a9b35a9ee1a34617cf49cbb66a38b9290510f68`
- 合并方式：提交后补充。

## 版本同步

| 版本名称 | 是否需要同步 | 当前状态 | 合入 Commit | 验证结果 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 6.5.1-dev | 是 | 待同步 | 待关联 | 子应用单测、构建和独立预览验证通过 | 工作区已实现，尚未提交，不能标记为已同步 |
| 6.5.1 | 是 | 待同步 | - | 未验证 | 待来源提交形成后评估 cherry-pick |

## 验证结果

- `preview-resource-lifecycle.test.ts`：通过。
- `preview-merge-virtualization.test.ts`：通过。
- `tree-preview-collapse.test.ts`：通过。
- `design-cell-line-break.test.ts`：通过。
- `npm run build`：Webpack 构建成功。
- 真实报表“合同签订情况--含未签”：数据和表格渲染正常。
- 浏览器控制台：本次改动未产生新的异常；现有嵌套 `button` 警告来自原 `TableSheets` 代码。
- 本次改动文件 `git diff --check`：通过。

## 已知限制与验收建议

- 独立子应用开发环境无法完整模拟主应用真实标签页容器的隐藏方式，最终性能收益必须在 qiankun 主应用中验收。
- 建议记录以下对比数据：标签点击到可交互耗时、Long Task 数量、切换前后 DOM/Handsontable 实例数、JS Heap、连续切换 10 次后的资源增长。
- 300ms 延迟用于避免快速来回切换时频繁销毁重建；如主应用切换动画超过该时间，应结合实际数据调整。
- 完整 TypeScript 检查仍受项目既有第三方声明及无关源码错误影响，不属于本次优化引入。

## 后续动作

- [ ] 在 qiankun 主应用中完成标签切换性能验收。
- [ ] 形成 Git 提交后，将本记录和版本矩阵中的 `待关联` 替换为完整提交哈希。
- [ ] 合入 `6.5.1` 后补充目标分支实际提交哈希和验证结论。

