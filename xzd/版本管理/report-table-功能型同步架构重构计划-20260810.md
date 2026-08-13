---
tags:
  - report-table
  - refactor
  - architecture
  - plan
status: completed
date: 2026-08-10
updated: 2026-08-11
target_repo: ng-design
target_branch: sync_branch
upstream_repo: report-web
upstream_branch: 6.5.2-dev
upstream_sha: 6636f93207d701517e78de9af46cc8dd57548fda
spec_issue: http://gitlab.newgrand.com/newgrand.techcenter/map/ng-design/-/issues/1
local_work_items: work-items/report-table-functional-sync-refactor/spec.md
---

# report-table 功能型同步架构重构计划

相关：[[report-table-ADR-0001-跟随上游功能型同步]] · [[report-table-同步术语表]] · [[变更记录/BUG-20260730-03-tree-filter-cascade]]

本地执行规格：[[work-items/report-table-functional-sync-refactor/spec|保持功能型同步并深化树拓扑与筛选提交模块]]

执行 tickets：[[work-items/report-table-functional-sync-refactor/issues/01-冻结双基线与行为护栏|01]] · [[work-items/report-table-functional-sync-refactor/issues/02-树折叠复用统一拓扑|02]] · [[work-items/report-table-functional-sync-refactor/issues/03-树筛选范围复用统一拓扑|03]] · [[work-items/report-table-functional-sync-refactor/issues/04-收拢筛选提交事务|04]] · [[work-items/report-table-functional-sync-refactor/issues/05-调查轴向无关筛选|05]] · [[work-items/report-table-functional-sync-refactor/issues/06-收口与双基线验收|06]]

原始规格：[GitLab #1](http://gitlab.newgrand.com/newgrand.techcenter/map/ng-design/-/issues/1)

## 目标

在不改变 `@newgrand/udp-report-table` 对外功能与接口的前提下，按架构报告的三个候选推进：

1. 实施报表树拓扑模块深化。
2. 实施筛选提交与预览可见性模块深化。
3. 调查轴向无关筛选计算；只有证据门槛全部通过才另行实施。

重构目标是提高树规则与筛选事务的 locality、leverage 和可测试性，不是重写筛选功能，也不是追求与上游逐行一致。

## 固定基线

| 项目 | 基线 |
| --- | --- |
| 上游功能基线 | `report-web:origin/6.5.2-dev` at `6636f93207d701517e78de9af46cc8dd57548fda` |
| 目标代码基线 | `ng-design:sync_branch` at `2114199ab95244262404e76ac8776aca3b0fa0d2` |
| 上游血缘验收 | parity fixtures |
| 7.0 原生验收 | 当前 characterization tests |
| 当前自动测试 | 54/54 通过 |
| 当前类型检查 | `udp-report-table` TypeScript 检查通过 |
| 工作树 | 干净 |

架构报告生成后，上游仍有树、筛选与可见性相关提交。已知本地同步映射包括：

- `ng-design 9270a59ea` 对应上游 `c524dc9b`、`42d37ff5`、`adee3848`。
- `ng-design d4277c05b` 对应上游 `02615117`、`42169a88`、`ad3589d8`。
- `ng-design 30a85d620` 对应上游 `dd46f74e`、`bd5661be`。

这些映射只证明提交血缘，不替代行为核对。开始重构前必须以固定 SHA 再做一次相关路径审计；发现未同步行为时，先建立独立同步工作项，不能夹入重构提交。

## 范围边界

### 包含

- 统一解释 `globalSettings.treeRows` 与响应 tree cells。
- 集中父子关系、`treeLevel`、`children`、`treeParent`、`showLevel` 与筛选范围证明。
- 收拢筛选成功路径中对 store、cell meta、全局设置、tree state 与 visibility 的操作顺序。
- 为上述行为补充 characterization/parity fixtures 和公共边界测试。
- 调查横向筛选的可达性、功能血缘和行为矩阵。

### 不包含

- 不改变 `src/index.tsx` 的公开导出、props、事件或数据结构。
- 不改变 7.0 原生功能；继续保留已确认的卸载 `destroy` 清理。
- 不在重构中修复新发现的既有 bug。
- 不新增失败回滚、重试、吞错或新的 loading 异常语义。
- 不引入全局拓扑缓存、新 `WeakMap` 或新测试框架。
- 不因纵横代码相似而默认实现轴向统一。
- 不在源码仓库创建 ADR 或计划副本；Obsidian 是唯一持久文档来源。

## 目标模块

### 1. 报表树拓扑

建议位置：`packages/@newgrand/udp-report-table/src/preview/treeTopology.ts`。

包内构造入口：

```ts
createTreeTopology({ configuredRows, responseCells }): TreeTopology
```

职责：

- 合并并标准化配置树元数据与响应 cells。
- 构造节点、根节点和父子索引。
- 根据 `showLevel` 计算初始折叠集合。
- 根据折叠集合计算隐藏行。
- 为筛选范围提供树相交判断和纵向范围证明。

明确不负责：

- 不持有 Handsontable、store 或 cell meta。
- 不执行 hide/show、render 或 loading 操作。
- 不保存跨 sheet 生命周期的缓存。

`treeRender/utils.ts` 保留折叠交互和 Handsontable adapter；`filterRender/range.ts` 保留筛选领域的薄适配，但不再自行解释树元数据。

### 2. 筛选提交事务

建议位置：`packages/@newgrand/udp-report-table/src/preview/plugins/filterRender/filterModal/filterCommit.ts`。

包内入口：

```ts
commitFilter({ hot, filterInfo, range, isReset }, adapter): Promise<void>
```

事务成功路径必须保持：

```text
delay(200)
  -> loading=true
  -> 计算筛选结果
  -> 重载 global settings / cells
  -> 重建 tree state
  -> 应用当前 filter owner
  -> render
  -> loading=false
```

adapter 隔离 store 与 Handsontable 操作，使测试能验证最终 cells、隐藏集合和必要顺序。是否保留全部 visibility owners 必须由上游 parity fixture 证明；若现状与上游不一致，另立 bug 或同步任务。

### 3. 轴向无关筛选计算

本轮默认只调查。转为实现必须同时取得：

1. UI 能产生 `expand === 'right'` 的完整可达调用路径。
2. `report-web:6.5.2-dev` 中的对应实现或明确需求依据。
3. 单条件、多条件、重置、持久隐藏列叠加的横向 parity fixtures。

任一证据缺失即停止，不新增轴向抽象。调查结果写入 Obsidian；只有产生 characterization fixture 时才形成 ng-design Git 提交，不创建空提交或仓库内调查文档。

## 实施步骤与提交

### 提交 1：锁定功能型同步重构基线

建议提交信息：`test(report-table): 锁定功能型同步重构基线`

- 对比固定上游 SHA 与本地相关同步提交的最终行为。
- 在 `tests/feature-sync.test.cjs` 增加重构前 fixtures。
- 覆盖配置树与响应树合并、父子树完整范围、多列级联、`showLevel`、持久隐藏与 tree/filter 隐藏叠加。
- 若任何 fixture 暴露现有同步缺口，停止重构，另立同步任务；本提交保持绿色。

### 提交 2：引入不可变 TreeTopology

建议提交信息：`refactor(report-table): 引入不可变报表树拓扑`

- 新增 `preview/treeTopology.ts` 与纯契约测试。
- 暂不迁移生产调用点。
- 覆盖无效数字、重复节点、显式/推断父节点、断裂树和来源优先级。

### 提交 3：迁移 tree renderer

建议提交信息：`refactor(report-table): 让树渲染复用统一拓扑`

- 修改 `treeRender/utils.ts`，使用 `TreeTopology` 计算折叠与隐藏行。
- 修改 `tableSheets/utils.ts`，在 sheet 加载边界构建新快照。
- 保留现有 `treeStateByHot`，其中只存交互状态与当前快照，不把缓存职责下沉到拓扑模块。
- 验证展开、收起、初始 `showLevel` 与 filter hidden rows 不互相揭露。

### 提交 4：迁移筛选范围判断

建议提交信息：`refactor(report-table): 让筛选范围复用统一树事实`

- 修改 `filterRender/range.ts` 与 `filterRender/util.tsx`。
- 将树相交、父子范围与响应范围证明交给 `TreeTopology`。
- 保留 `FilterRange` key、合并单元格校验和 UI 告警语义。
- 精确对比迁移前后允许/拒绝结果与标准化后的 `from/to`。

### 提交 5：删除重复树解释逻辑

建议提交信息：`refactor(report-table): 删除重复树拓扑解释`

- 删除 renderer 与 filter range 中已被拓扑模块取代的合并、父子推断和层级解释代码。
- 保留调用端特有的 adapter 与 UI 规则。
- 用源码边界断言阻止后续再次散落解释 `children`、`treeParent`、`treeLevel`。

阶段一结束后运行完整门禁，并复核固定 SHA 之后的相关上游提交。

### 提交 6：建立筛选事务 adapter 与测试

建议提交信息：`test(report-table): 锁定筛选提交事务`

- 新增 `FilterCommitAdapter` 和事务契约测试，暂不迁移入口。
- 锁定最终 cells、行列隐藏集合、loading 成功路径和必要副作用顺序。
- 不对失败路径添加新预期。

### 提交 7：迁移筛选提交入口

建议提交信息：`refactor(report-table): 收拢筛选提交与可见性更新`

- 让 `filterModal/utils/render.ts` 成为兼容入口或改为调用 `commitFilter`。
- 保持 `xtype.tsx` 的调用方式和 modal 销毁时机。
- 通过 adapter 调用 `handleLoadGlobalSettings`、tree 初始化、filter visibility 与 render。
- 行列分支保持现有行为，不在此提交统一计算算法。

### 提交 8：删除旧的分散事务逻辑

建议提交信息：`refactor(report-table): 删除旧筛选提交编排`

- 删除已经迁移的 store、loader、reload、visibility 和 render 编排。
- 保留仍有功能血缘的纵向/横向计算实现。
- 确认调用者不再依赖隐含顺序。

阶段二结束后运行完整门禁，并再次复核上游。

### 工作项 9：调查轴向无关计算

- 在本地和上游使用 CodeGraph 记录入口到 `renderCol` 的调用路径。
- 用 `git log --follow`、`git blame` 和需求记录确认功能血缘。
- 三道门槛全部通过：先提交横向 parity fixtures，再另开实现计划。
- 任一门槛不通过：只在 Obsidian 记录“不实施”结论与重新评估条件。

## 执行结果（2026-08-11）

- 报表树拓扑与筛选提交事务已成为包内唯一稳定边界，公共 runtime/type exports、props、事件和持久化结构保持不变。
- renderer 最后遗留的父子事实解释已在最终验收中移入 `TreeTopology`；仅响应数据证明的 `treeParent` 参与既有 `isLast` 渲染语义，保持固定上游 parity。
- 候选三结论为本轮不实施：横向计算具有上游功能血缘，但用户入口不可达且行为基线不足。证据与重新评估条件见 [[research/2026-08-11-横向筛选实施资格调查]]。
- 最终四文件双基线回归 62/62 通过；TypeScript 检查、包构建、Prettier 与 `git diff --check` 通过。
- 固定上游 SHA 后相关路径仅新增 `54f90c9f` 的树缩进 CSS 调整，不构成本轮同步缺口。
- 最终 Standards/Spec 双轴代码审查均为 0 findings。收口记录见 [[work-items/report-table-functional-sync-refactor/issues/06-收口与双基线验收]]。

## 验证命令

聚焦验证：

```powershell
node --test packages/@newgrand/udp-report-table/tests/feature-sync.test.cjs packages/@newgrand/udp-report-table/tests/udp-report-table-boundaries.test.cjs
```

阶段完整验证：

```powershell
node --test packages/@newgrand/udp-report-table/tests/feature-sync.test.cjs packages/@newgrand/udp-report-table/tests/udp-report-table-boundaries.test.cjs packages/@newgrand/udp-report-table/tests/migration-parity.test.cjs packages/@newgrand/udp-report-table/tests/print-design-payload.test.cjs
npx tsc -p packages/@newgrand/udp-report-table/tsconfig.check.json --noEmit
npx lerna run build --scope @newgrand/udp-report-table
git diff --check
```

上游阶段复核：

```powershell
git -C C:\Users\jinxu\workspace\xzd\report-web log --oneline 6636f93207d701517e78de9af46cc8dd57548fda..origin/6.5.2-dev -- src/components/report/preview/plugins/treeRender src/components/report/preview/plugins/filterRender src/components/report/preview/utils/visibility.ts src/components/report/preview/tableSheets/utils.ts
```

## 完成条件

- 两个实施模块均为包内边界，公共 runtime/type exports 不变。
- 树渲染与筛选范围只通过 `TreeTopology` 解释树事实。
- 筛选调用者不再编排跨 store、reload、tree、visibility 的严格顺序。
- 上游 parity fixtures 与 7.0 characterization tests 全绿。
- 类型检查、包构建和 `git diff --check` 通过。
- 唯一既有偏离仍是 7.0 卸载 `destroy` 清理。
- 候选三有明确的实施或不实施证据，不留下“为了对称以后再看”的模糊状态。

## 停止与回退条件

- 发现当前代码与固定上游 SHA 存在未登记行为差异：停止，另立同步任务。
- 发现重构需要改变公开 API：停止，另作 API 设计决策。
- visibility owner 预期无法由上游或现有测试证明：保持现状并登记问题。
- 任一提交无法独立保持绿色：缩小提交，不依赖后续提交修复。
- 阶段回退直接 revert 对应提交；阶段之间不混入上游同步，避免连带回退。

## 文档交付

- 架构决策更新：[[report-table-ADR-0001-跟随上游功能型同步]]。
- 领域语言更新：[[report-table-同步术语表]]。
- 候选三调查完成后，在本目录新增独立调查记录并链接回本计划。
