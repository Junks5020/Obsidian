---
id: BUG-20261012-001
type: bug
status: completed
commit: uncommitted-wip
source_branch: ng-design:ljx-7.0
created: 2026-10-12
updated: 2026-10-16
report_web_commit: e32392416a5e21b15419b6aa1ec86cd7bdaa7e6f
target_versions: [ljx-7.0]
repositories: [ng-design, report-web]
tags: [version-change, bug, ng-design, report-web, udp-report-table, runtime-layout, query-default]
---

# BUG-20261012-001：ljx-7.0 最近同步内容的七项风险修复

相关：[[report-table-同步术语表]]、[[report-table-ADR-0001-跟随上游功能型同步]]、[[work-items/report-table-style-boundary/spec]]、[[变更记录/BUG-20260904-001-calc-preview-reload-loop]]。

## 范围与交付状态

- 用户要求审查 ljx-7.0 的未提交内容及最近同步提交，随后授权修复审查发现。
- 组件工作区：`C:\Users\jinxu\workspace\xzd\ng-design.worktrees\sync_branch`，分支 `ljx-7.0`，修复前 HEAD `f281093f8245e0d53de27b5d2b36c7dd14d1a3df`。
- 宿主工作区：`C:\Users\jinxu\workspace\xzd\report-web.worktree\ljx-7.0`，分支 `ljx-7.0`，修复前 HEAD `d53dc36dd11ac4aa2a0430a79af1b2a9915b682b`。
- 审查涉及组件同步提交 `e9b08a8e3`、`9b2103636`、`f281093f8`；参考上游 `report-web:6.5.2-dev@5bca1453` 的最终行为。
- 2026-10-12 记录：两边修复均为本地未提交改动，未推送、发布或同步至其他分支；当时组件版本为 `7.0.15`，锁文件未变。后续宿主提交状态见文末 2026-10-16 补记。
- 原有 `getSelectedRange()` API、文档及测试工作保留，原有未跟踪日志与临时目录保留。

## 问题、根因与修复

| 审查项 | 触发与影响 | 根因与最终修复 |
| --- | --- | --- |
| P1：多实例布局串写 | A、B 同时预览，冻结 A 却调用 B 的回调并记录 B 的 sheetKey；两份数据也可能串用 | 全局预览 store 被后挂载实例覆盖。每个 ReportTable 创建独立 store，用 HOT 的 WeakMap 绑定所有布局、筛选、链接及加载消费者，卸载时释放绑定 |
| P2：冻结边框作用于另一报表 | 冻结 B 时 A 的克隆表格被加边框 | 全局 document.querySelector 命中首个表。冻结、边框处理限定在所属 hot.rootElement，设计态调用点也传入实例根 |
| P1：代理配置含本地凭据改动 | 待提交差异带入本地账号、密码和 ucode | ngproxy.ini 恢复为 HEAD 内容；最终该文件无差异，不在记录中复制凭据 |
| P2：当前时间保存后固定 | 日期时间格式选择 current_time，保存请求提前转成当时的时间戳 | 保存和运行时解析共用同一路径。保存保留动态标记；运行时才计算当前时间 |
| P2：既有具体日期被清空 | 打开查询设置再确认，把普通日期字符串清空 | 归一化把非时间点枚举一律判为无效。改为只清理已删除的区间枚举，保留具体日期及显式空值 |
| P1：布局变化重置交互状态 | 筛选、树折叠或调整数据之后，冻结/隐藏/尺寸变化触发全量 loadData | userLayouts 进入全量加载依赖。相同 HOT、sheets 引用及 sheetKey 只应用布局；新数据或切换 sheet 才全量加载，并以请求版本守卫避免异步旧加载落回 |
| P2：计算预览遗漏十字高亮开关 | Global.crossHairHighlight 返回值未作用于计算预览 | 只取 Data，已存在的设置解析函数未接入。计算成功后按响应 Global 优先、设计配置回退的规则，把开关写入预览 sheets |

保存动态日期后还发现宿主消费缺口：report-web 原先直接把 `current_time` 送入 Moment 日期格式化，生成 `Invalid date`。新增最小日期初始化 helper，接入数据集初始查询和最终查询控件两条路径；保持 URL 链接参数优先、具体日期不变、显式 `null`/空字符串不回退，非日期系统参数继续走原有 handleMergeValue。

## 验证与证据

- 红灯复现：真实 React 挂载两个预览暴露回调串写及边框串用；布局变更暴露树/筛选重置；日期保存/重开链暴露固定时间与 Invalid date；计算分支用实际 AST 执行验证开关未接入。
- 组件包全部 `*.test.cjs`：**156/156** 通过。新增/扩展测试覆盖双实例、冻结/隐藏/取消隐藏/尺寸变化保留过滤 owner 与折叠、数据顺序、日期保存与重开、计算响应高亮及计算失败处理。
- `npm run build --prefix packages/@newgrand/udp-report-table`：ESM、CJS 与声明文件均生成成功。
- 使用仓库已安装的 father TypeScript **5.4.2** 执行包级 `tsconfig.check.json --noEmit`：通过。根目录 TypeScript 4.9.5 与已安装 @types/d3-dispatch 的新泛型语法存在既有兼容问题，本次未升级依赖。
- report-web `npm run test:architecture`：**24/24** 通过，新增日期消费测试已加入该脚本。该工作区未安装依赖，测试使用主仓 node_modules 的进程级 NODE_PATH；没有创建链接或改变依赖配置。
- 宿主新增日期 helper 及其传递依赖：采用临时 tsconfig 提供实际 `@/*` 别名，TypeScript 5.4.2 检查通过。
- 跨仓链路复核：组件保存 current_time → JSON 重载 → 查询设置确认 → 再次保存仍为 current_time → 宿主初始化为 `2026-10-12 10:30:00` → 实际 buildSheetQueryParamList 输出同值；具体日期、null/空字符串及 URL 覆盖维持原有含义。
- 本地浏览器加载真实 React、Handsontable 和 @handsontable/react，UDP UI、弹层等外围用测试 stub，数据为静态夹具：A 冻结回调 sheetKey=0、B 回调 sheetKey=1；A 折叠及筛选后隐藏第 6 行，最终隐藏物理行 `[1,2,4,5]`、expanded=false，B 隐藏集为空；冻结边框限定各自根节点；选中 A 单元格产生 htCrossHair，B 未染色。
- 最终 `git diff --check` 两边通过；ngproxy.ini 与 HEAD 一致。
- 验证边界：未进行 report-web 整应用构建、真实后端查询/保存联调或发布后验证。截图为本地夹具验证，不能作为线上业务数据或实际宿主主题样式的证明。

截图：[双报表冻结与隐藏回归证据](C:/Users/jinxu/.codex/visualizations/2026/10/12/01a12e03-55af-7f23-b11a-2d7ec74b768f/report-regression.jpg)。

## 复核与自评

- Standards 轴：未发现本轮新增的可行动问题，确认内部 store 和 DOM 所有权、公有导出兼容与实例清理。
- Spec 轴：组件日期、布局、计算行为复核通过；宿主日期消费链复现已关闭。
- 独立追加验证：相同 sheets 的新布局不全量加载；替换 sheets 数据会重新加载并清除旧筛选；切换 activeSheetKey 能加载正确工作表。

| 自评维度 | 分数 | 依据 |
| --- | --- | --- |
| 首次正确性 | 4/5 | 核心行为测试通过；新 store 工厂的空数组推断与旧测试格式断言经类型/全量检查纠正 |
| 范围准确性 | 5/5 | 七项均处理，并补齐 report-web 对新日期持久化值的消费 |
| 最小改动 | 4/5 | 实例隔离必须覆盖所有 store 读取点；宿主仅新增日期 helper 和两处调用 |
| 副作用预测 | 4/5 | 覆盖交互状态、多实例和新数据加载；首次并行构建清理产物影响边界测试，最终改为构建结束后执行 |
| 根因深度 | 5/5 | 修复状态所有权、布局/数据生命周期和持久化/运行态边界 |
| 合计 | 22/25 | 本地实现完成，发布与业务联调仍按上述边界说明 |

预防措施：持久化语义改动应先列出所有消费者；测试若依赖 es/lib 产物，应在构建完成后运行；结构性源码断言应容忍合法空白格式。

## 2026-10-16：report-web 宿主提交收口

- 仓库与分支：`report-web:ljx-7.0`；提交 `e32392416a5e21b15419b6aa1ec86cd7bdaa7e6f`，`fix: 修复报表多语言加载、预览跳转及动态日期默认值`。
- 本记录对应范围：`queryDateDefaultValue.ts`、预览页两处日期初始化调用、`tests/query-date-runtime.test.cjs` 与测试脚本。动态标记仅在运行时解析，保持链接参数优先、具体日期及显式空值。
- 本次验证：宿主架构及回归测试 42/42、生产构建通过；日期 helper 与测试仅做格式整理后，3 项日期测试再次通过。源文件、测试与 JSON 暂存格式以及差异检查通过。
- 本地 `ngproxy.ini` 存在用户配置差异，本次原样保留且未提交；`.idea/` 和 `.umirc.local.ts` 同样未提交。
- 本次只确认宿主提交，不把本节作为 ng-design 组件当前提交或发布状态的证明；上文 2026-10-12 组件验证保留为历史记录。
- Git 确认本地 `ljx-7.0` 包含该提交，`master` 不包含；未推送、部署或同步其他分支，真实后端查询及浏览器验收待执行。

| 仓库分支 | 状态 | 分支内提交 | 说明 |
| --- | --- | --- | --- |
| `report-web:ljx-7.0` | 验证中 | `e32392416a5e21b15419b6aa1ec86cd7bdaa7e6f` | 宿主日期消费部分已提交并通过本地测试、构建 |
| `report-web:master` | 待同步 | - | 当前不包含该提交 |

相关：[[代码提交记录/report-web/变更记录/REQ-20260902-001-报表多语言配置同步]] · [[代码提交记录/report-web/变更记录/BUG-20261016-001-design-preview-navigation]]
