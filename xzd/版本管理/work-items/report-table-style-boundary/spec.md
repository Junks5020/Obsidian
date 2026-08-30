---
tags:
  - report-table
  - spec
  - work-item
  - styling
status: resolved
date: 2026-08-26
updated: 2026-08-27
---

# udp-report-table 严格样式边界与自动加载规格

相关：[[report-table-ADR-0010-样式边界与自动加载]] · [[report-table-同步术语表]] · [[00-版本总览]]

## Problem Statement

`@newgrand/udp-report-table` 当前把多份 Less 分散在设计态、预览态、插件和子组件目录中，并同时存在 CSS Modules 映射、普通类名回退、裸全局选择器以及直接加载 Handsontable CSS 的情况。样式来源和归属不集中，报表规则可能命中同页其他 Handsontable、Ant Design 弹层或普通 DOM；弹层挂到裸 `body` 后也脱离了报表根节点的样式边界。

组件使用方仍需要保持现有消费方式：引入 `DesignReportTable` 或 `ReportTable` 后样式自动可用，不额外导入 CSS。迁移本身只能修复样式越界，不得改变报表内部的视觉和交互，也不得连带修改 `@newgrand/udp-ui` Table。

## Solution

采用 [[report-table-ADR-0010-样式边界与自动加载]] 确认的一次性迁移方案：包根新增唯一 `src/style.less`，物理合并所有可达本地 Less，并由公共根组件自动加载一次。报表实例统一带 `.udp-report-table` 归属标识，设计态、报表预览、数据预览分别带稳定的模式标识；所有本地规则使用 `:where(.udp-report-table)` 或对应 overlay 根限定，避免增加选择器权重。

Handsontable 官方 CSS 继续以依赖包为唯一来源，通过直接开发依赖 `postcss-prefix-selector` 和 PostCSS AST 在开发、文档与构建前生成带命名空间的临时样式。每个报表实例创建独立的 `body` overlay 宿主，把报表拥有的 Ant Design 弹层、Handsontable 菜单、筛选窗口和拖拽镜像统一渲染到该宿主，并随实例卸载清理。

## User Stories

1. 作为组件使用方，我希望报表样式继续自动加载，以便现有业务应用无需增加样式导入。
2. 作为同页其他组件的使用者，我希望报表样式不命中外部 Handsontable、Ant Design 控件和普通 DOM。
3. 作为设计态、报表预览或数据预览用户，我希望迁移前后的视觉和交互保持一致。
4. 作为同时打开两个报表实例的用户，我希望每个实例的弹层只归属于自己的报表样式边界。
5. 作为维护者，我希望全部报表 Less 集中在一个根文件，并能从区段注释追溯原文件和适用作用域。
6. 作为构建维护者，我希望 Handsontable 样式从依赖可重复生成并由 CI 校验，而不是在仓库维护第三方 CSS 副本。
7. 作为集成维护者，我希望稳定根标识可用于宿主定制，同时不把内部类名误当公共契约。

## Implementation Decisions

- 实施范围仅为 `packages/@newgrand/udp-report-table` 及其必要的根级依赖锁文件、开发/文档/构建命令配置；不修改 `@newgrand/udp-ui` Table。
- 唯一本地样式源为 `packages/@newgrand/udp-report-table/src/style.less`。最终状态不保留子组件局部 Less，也不以 `@import` 聚合分散源文件。
- `style.less` 按 Shared、Design、Report Preview、Data Preview、Overlay / Portal 分组。每个迁移区段标注原 Less 路径和适用根作用域。
- 公共根钩子为 `.udp-report-table`、`.udp-report-table--design`、`.udp-report-table--report-preview`、`.udp-report-table--data-preview`。它们是稳定契约；迁移期间保留的其他内部类名不是公共契约。
- 本地选择器以 `:where(.udp-report-table)` 为基本边界，并按模式进一步缩小；禁止把 `html`、`body`、通用标签、Ant Design 或 Handsontable 裸选择器留在边界外。
- `DesignReportTable` 和 `ReportTable` 的公共入口负责自动加载根样式；最终消费链只有一个本地样式入口，不要求业务应用显式导入。
- 物理合并所有当前可达 Less。删除当前不可达且不得被迁移激活的 `design/components/leftAddDataSet/index.less`、`design/TableDesign/components/tableSheets/index.less`、`preview/tableSheets/index.less`。
- 取消 CSS Modules 映射与普通类名 fallback 的双轨逻辑，统一使用受根命名空间保护的全局普通类名。不得提供旧全局样式、兼容开关或双份 CSS。
- Handsontable CSS 仍来自安装依赖，新增直接开发依赖 `postcss-prefix-selector`。生成过程使用 PostCSS AST；禁止正则或通用字符串替换选择器。
- 特殊 `body > ...`、根选择器、逗号选择器、伪类和 keyframes 必须按 CSS 语义处理。需要把宿主关系改写到 overlay 时使用 parser/AST 能力，不拼接无效前缀。
- 生成文件不提交。包构建、Dumi 启动和文档构建命令自动生成，CI/结构测试校验生成可重复且所有可见选择器均受边界保护。
- 每个报表实例拥有一个挂到 `body` 的 `.udp-report-table.udp-report-table--overlay` 宿主。所有可视报表 UI，包括 Ant Design overlays、Handsontable 菜单、筛选弹窗和拖拽镜像，进入所属实例宿主。
- overlay 宿主在实例卸载时清理。宿主缺失时禁止回退到裸 `body`：开发环境明确抛错，生产环境阻止打开并记录错误。
- 复制用、无样式且创建后立即移除的临时 `textarea` 是唯一可短暂挂到裸 `body` 的例外。
- 迁移不改变视觉、布局、交互、公开 props/events/types 或持久化数据。发现既有样式缺陷时另建 bug，不夹带修复。

## Testing Decisions

- 沿用 `packages/@newgrand/udp-report-table/tests` 下的 `node:test` 体系，不引入 Playwright、Cypress、Jest 或 Vitest。
- 结构测试验证：唯一根 Less、无残留局部 Less 导入、无 CSS Modules/fallback、公共根标识、自动加载入口、禁止的裸选择器、生成文件未入库。
- 生成器测试至少覆盖普通选择器、逗号列表、`html/body`、`body > ...`、伪类、keyframes/font-face 等非普通规则，并验证重复生成无差异。
- 保留一个可持续运行的 Dumi 隔离场景，覆盖外部 Handsontable、普通 Ant Design 控件、两个报表实例、独立 overlay、实例卸载和宿主清理。
- 实施验收使用真实浏览器完成设计态/预览态关键交互、弹层归属、隔离和截图对比；不把截图自动化框架加入仓库。
- 每张 ticket 至少运行其聚焦 `node:test`、TypeScript 检查、包构建和 `git diff --check`；最终 ticket 运行全部现有报表测试和文档构建。

## Out of Scope

- 修改或修复 `@newgrand/udp-ui` Table 的全局样式。
- 调整报表视觉、主题、间距、颜色、布局、动画或交互。
- 激活当前不可达 Less 中的旧规则。
- 改变公开组件 API、数据结构或现有业务应用的导入方式。
- 提交生成后的 Handsontable CSS 或复制第三方压缩 CSS 到根 Less。
- 提供旧全局样式兼容模式、迁移开关或双轨输出。
- 引入新的端到端测试框架。

## Stop Conditions

- 任何规则无法在报表根或所属 overlay 下表达，必须先记录具体选择器和运行时归属，回到 ADR 复核，不能以裸全局规则通过。
- 某个弹层无法确定所属报表实例时停止该调用点迁移，不能回退到 `body`。
- 迁移需要改变视觉或交互才能继续时，单独登记问题并保持本规格行为不变。
- 第三方选择器无法用现有 AST 管道正确转换时，先补充 parser 方案与测试，禁止改用正则。

## Tickets

1. [[issues/01-建立根样式入口与公共根标识]]
2. [[issues/02-物理合并Less并删除不可达样式]]
3. [[issues/03-生成带命名空间的Handsontable样式]]
4. [[issues/04-建立实例overlay并迁移可视弹层]]
5. [[issues/05-移除CSS-Modules双轨并建立边界测试]]
6. [[issues/06-隔离场景与最终验收]]

依赖图：`01 → (02, 03, 04) → 05 → 06`。

Frontier：[[issues/01-建立根样式入口与公共根标识]]。

## Final Implementation

2026-08-27 已完成 01-06 全部 tickets：报表包样式集中到 `src/style.less`，Handsontable 样式由 PostCSS AST 生成并自动校验，所有可视弹层归属实例 overlay；Dumi 隔离场景已完成真实浏览器桌面/移动视口验收，包测试、样式检查、包构建、Dumi 构建和 `git diff --check` 均通过。Ticket 06 已记录完整 DOM 归属、卸载/重挂和截图证据。
