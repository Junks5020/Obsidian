---
tags:
  - report-table
  - ADR
status: proposed
date: 2026-08-26
---

# ADR-0010：报表样式采用严格边界并由组件自动加载

`udp-report-table` 的样式只允许命中报表组件根节点及其拥有的弹层根节点，同页其他 Handsontable、Ant Design 弹层和普通 DOM 不得受到影响。样式继续由 `DesignReportTable` 与 `ReportTable` 自动加载，不要求业务应用显式导入样式入口，以保持现有组件消费契约。两个公共根组件统一使用 `.udp-report-table` 作为稳定归属标识，并分别使用 `.udp-report-table--design` 与 `.udp-report-table--preview` 表达模式；现有内部类名在迁移期间保留。具体样式组织、弹层归属和过渡策略仍待访谈确认。

相关：[[report-table-同步术语表]] · [[00-版本总览]]
