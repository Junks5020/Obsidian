---
tags:
  - report-table
  - ADR
status: proposed
date: 2026-08-26
---

# ADR-0010：报表样式采用严格边界并由组件自动加载

`udp-report-table` 的样式只允许命中报表组件根节点及其拥有的弹层根节点，同页其他 Handsontable、Ant Design 弹层和普通 DOM 不得受到影响。样式继续由 `DesignReportTable` 与 `ReportTable` 自动加载，不要求业务应用显式导入样式入口，以保持现有组件消费契约。两个公共根组件统一使用 `.udp-report-table` 作为稳定归属标识，并分别使用 `.udp-report-table--design` 与 `.udp-report-table--preview` 表达模式；现有内部类名在迁移期间保留。现有局部 Less 的内容物理合并到一个根样式文件，不保留“单一入口加分散源文件”的组织方式。具体依赖样式、弹层归属和过渡策略仍待访谈确认。

## Considered Options

- 选择：一个根样式文件物理持有报表组件的 Less 内容，使样式所有权集中可见。
- 放弃：由一个根 Less 聚合组件旁的局部 Less；该方案维护归属更局部，但不满足本次物理合并目标。

相关：[[report-table-同步术语表]] · [[00-版本总览]]
