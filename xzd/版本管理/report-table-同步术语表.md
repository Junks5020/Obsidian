---
tags:
  - report-table
  - 术语表
  - 领域模型
updated: 2026-08-05
---

# udp-report-table 术语表

基于 Handsontable 封装的报表组件包（7.0），由 report-web 的报表组件抽离而来，与上游保持功能型同步。

相关：[[report-table-6.5.2-7.0-功能同步计划]] · [[report-table-ADR-0001-跟随上游功能型同步]]

## Language

**上游 (Upstream)**:
report-web 仓库的 `6.5.2-dev` 分支（`src/components/report/`）。report-table 功能与修复的唯一事实来源。
_Avoid_: 源仓库、6.5.2 分支、report-web 主分支

**功能型同步 (Functional Sync)**:
从上游到本包的单向移植：上游的新增、修复、**移除**都要跟随；目标是功能等价，不是逐行一致（7.0 的状态管理、样式引用、服务适配层结构不同）。
_Avoid_: 代码同步、合并、cherry-pick

**同步点 (Sync Point)**:
本包已同步到的上游提交。每次同步任务以此为基础计算增量。

**7.0 原生功能 (7.0-Native Feature)**:
7.0 需求线上的功能，上游没有对应物（如条形码、ribbon 工具栏、报表字体系统、data 模式）。不参与同步，上游的变更不影响其存废。
_Avoid_: 7.0 独有功能、新增功能

**功能血缘 (Feature Lineage)**:
判断一个功能跟随上游还是独立演进的依据：血缘在上游（从 6.5.x 同步而来，含本地小幅扩展）→ 跟随上游，包括跟随移除；血缘在 7.0（原生需求）→ 独立演进。判断看血缘，不看本地代码被改了多少。
