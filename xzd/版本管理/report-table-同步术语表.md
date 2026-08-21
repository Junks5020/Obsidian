---
tags:
  - report-table
  - 术语表
  - 领域模型
updated: 2026-08-19
---

# udp-report-table 术语表

基于 Handsontable 封装的报表组件包（7.0），由 report-web 的报表组件抽离而来，与上游保持功能型同步。

相关：[[report-table-6.5.2-7.0-功能同步计划]] · [[report-table-文档同步计划-20260813]] · [[report-table-第二阶段打印API规划-20260819]] · [[report-table-ADR-0001-跟随上游功能型同步]] · [[report-table-ADR-0002-报表字体字段兼容双写]] · [[report-table-ADR-0003-字体清单与静态资源契约]] · [[report-table-ADR-0004-第一阶段复用现有服务适配层]] · [[research/2026-08-18-硕正报表第一阶段对接范围]] · [[work-items/report-table-phase1/spec]] · [[work-items/report-font-integration/spec]]

## Language

**第一阶段前端对接 (Phase-1 Frontend Integration)**:
本阶段仅交付前端组件、适配器、交互权限和既有后端接口联调；不包含新增或修改后端接口。后端缺口单独记录，不以 Mock 结果替代真实联调。

**后端介入 (Backend Involvement)**:
指新增或修改服务端接口、数据模型、持久化、权限校验或打印数据生成逻辑；仅消费既有接口、整理契约和联调不视为本阶段后端开发。

**组件库交付边界 (Component-Library Delivery Boundary)**:
报表组件库负责可复用组件、公共 API、交互权限和联调验证；业务应用负责路由、菜单、列表页面和业务数据编排。业务路由不是组件库交付物。

**最小兼容 API 集 (Minimum Compatibility API Set)**:
为已确认的 P0 报表设计和打印场景提供的稳定公共能力集合。未被真实业务调用证明必要的原生 API 不自动纳入本阶段。

**前端交互权限 (Frontend Interaction Permission)**:
控制报表组件的工具栏、右键菜单和命令式 API 是否可执行的前端约束，不等同于服务端安全授权。服务端鉴权仍是最终权限来源。

**公式字段保留 (Formula Field Preservation)**:
报表设计数据中的公式内容在加载、编辑、保存和导入导出过程中保持可读且不丢失；该术语不包含公式解析或实时计算。

**打印数据交付 (Print Data Delivery)**:
组件输出供业务应用消费的打印数据、模板标识和业务主键，并提供使用方式；组件不负责具体 PDF 排版、浏览器打印或打印机适配。

**默认 pdfmake 消费 (Default pdfmake Consumer)**:
第一阶段推荐业务应用使用 `pdfmake` 将组件打印数据组装为 `documentDefinition` 并生成 PDF；该推荐不限制业务应用选择其他打印方案。

**打印引擎无关 (Print-Engine Agnostic)**:
组件库不依赖或内置具体 PDF/打印引擎，提供可被不同消费方转换的数据契约和使用方式。

**现有打印数据结构 (Existing Print Data Shape)**:
第一阶段沿用 `formdata + Grids` 作为单据和表格打印输入；新打印引擎通过显式转换消费，不直接改变该输入契约。

**打印使用示例 (Print Usage Example)**:
面向业务应用的独立 TypeScript/`pdfmake` 示例，不属于组件库运行时公共 API，也不规定业务模板排版。

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

**报表字体 (Report Font)**:
经报表系统批准，可在设计、预览和服务端打印/导出链路中保持一致字形的字体族。
_Avoid_: 系统字体、字体文件

**字体标准名称 (Font Standard Name)**:
跨前后端识别同一个报表字体的稳定名称，不随字体文件名、中文展示名或前端内部标识变化。
_Avoid_: 字体 ID、字体文件名、中文名称
