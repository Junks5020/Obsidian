---
tags:
  - report-table
  - 术语表
  - 领域模型
updated: 2026-08-13
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

**双基线验收 (Dual-Baseline Acceptance)**:
有上游功能血缘的行为用固定上游 SHA 的 parity fixtures 验收；7.0 原生行为用目标分支现有 characterization tests 验收。两类基线都必须保持绿色。
_Avoid_: 只跑本地测试、只对比上游代码

**报表树拓扑 (Report Tree Topology)**:
由配置 `treeRows` 与响应 tree cells 合并得到的不可变树事实快照，包含标准化节点、父子索引、可见层级和范围证明。它不持有 Handsontable 或 store，也不执行 UI 副作用。
_Avoid_: 树缓存、树渲染状态

**可见性 owner (Visibility Owner)**:
对隐藏行列的独立来源，例如持久设计状态、树折叠和某个筛选 key。最终隐藏集合是各 owner 的并集；更新一个 owner 不自动授权清除其他 owner。
_Avoid_: hiddenRows 状态、当前隐藏项

**筛选提交事务 (Filter Commit Transaction)**:
一次筛选确认或重置的包内成功路径编排，包含 loading、筛选计算、cells/global settings 重载、tree 重建、visibility 应用和 render。此术语不隐含失败回滚或重试。
_Avoid_: 数据库事务、自动回滚

**数据预览 (Data Preview)**:
使用二维矩阵直接展示表头和数据的轻量预览，不依赖报表 sheet schema 或设计态配置。
_Avoid_: 报表预览、基础预览

**报表预览 (Report Preview)**:
消费 `sheetKey`、`sheetName`、`cells` 和 `globalSettings` 等报表 sheet schema 的预览模式，支持 sheet 切换以及树、筛选、样式等报表行为。
_Avoid_: 多 Sheet 数据表、ExcelTableSheet
