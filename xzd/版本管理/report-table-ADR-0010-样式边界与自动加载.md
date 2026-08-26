---
tags:
  - report-table
  - ADR
status: proposed
date: 2026-08-26
---

# ADR-0010：报表样式采用严格边界并由组件自动加载

`udp-report-table` 的样式只允许命中报表组件根节点及其拥有的弹层根节点，同页其他 Handsontable、Ant Design 弹层和普通 DOM 不得受到影响。样式继续由 `DesignReportTable` 与 `ReportTable` 自动加载，不要求业务应用显式导入样式入口，以保持现有组件消费契约。两个公共根组件统一使用 `.udp-report-table` 作为稳定归属标识，并分别使用 `.udp-report-table--design` 与 `.udp-report-table--preview` 表达模式；现有内部类名在迁移期间保留。现有局部 Less 的内容物理合并到一个根样式文件，不保留“单一入口加分散源文件”的组织方式。Handsontable 官方 CSS 保持单一依赖来源，在构建阶段加报表命名空间前缀并合入最终样式输出，不将第三方压缩 CSS 复制进根 Less。每个报表根实例创建一个挂到 `body` 的 `.udp-report-table.udp-report-table--overlay` 弹层宿主，Ant Design 与 Handsontable 的报表自有弹层统一渲染到该宿主，并在实例卸载时清理。命名空间使用 `:where(.udp-report-table)` 限定匹配而不增加选择器权重。迁移一次性切换到命名空间样式：保留现有内部 DOM 类名，但不提供旧全局样式、兼容开关或双份 CSS。

## Considered Options

- 选择：一个根样式文件物理持有报表组件的 Less 内容，使样式所有权集中可见。
- 选择：第三方 Handsontable CSS 作为依赖输入，经命名空间前缀化后合入输出，避免仓库维护重复副本。
- 选择：每个报表实例拥有独立的 `body` 弹层宿主，通过容器归属统一覆盖各类弹层，而不是逐个依赖样式类标记。
- 选择：一次性切换到严格样式边界，避免新旧两套样式并存。
- 选择：使用 `:where()` 提供零权重命名空间，避免作用域前缀压过宿主已有的报表定制样式。
- 放弃：由一个根 Less 聚合组件旁的局部 Less；该方案维护归属更局部，但不满足本次物理合并目标。
- 放弃：把 Handsontable 压缩 CSS 物理复制进根 Less；该方案会重复维护第三方源码。
- 放弃：逐个为弹层添加 `popupClassName` 或 `rootClassName`；调用点多，遗漏会重新产生边界外样式。
- 放弃：旧全局样式兼容开关或双份 CSS；它们会延续污染并扩大样式体积和测试矩阵。

相关：[[report-table-同步术语表]] · [[00-版本总览]]
