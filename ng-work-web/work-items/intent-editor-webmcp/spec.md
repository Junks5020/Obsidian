---
tags:
  - ng-work-web
  - spec
  - webmcp
status: ready-for-agent
date: 2026-11-17
updated: 2026-11-17
---

# 意图配置编辑页 WebMCP

Status: ready-for-agent

相关：[[00-ng-work-web索引]]、[[ng-work-web-Agent工作流配置]]、[[ng-work-web-术语表]]、[[work-items/intent-config-webmcp/spec|意图配置管理页只读 WebMCP]]

## Problem Statement

用户希望 Agent 在已登录的前端会话内，不仅能浏览和只读查看意图配置管理列表（`/list/ai_query_intent`），还能在打开意图配置新增／编辑／复制／查看页（`/list/ai_query_intent/add`）时，可靠地读取当前页面草稿、检索合法的业务类型／智能体／元数据／问数来源／关联意图候选、分步修改提问设置、参数定义与功能样式，并在确认后完成校验保存。

当前编辑页存在表单与多子表格分离存储、多种阻塞式 `NG.confirm` 弹窗（切换意图类型、变更业务类型、关闭问数来源开关时触发）、以及列表页与多个编辑页签在浏览器中同时保活缓存的问题。直接暴露原始按钮或依赖人工点击弹窗会导致工具调用卡死、误丢已有配置或串页签误操作。

## Solution

为当前活动的意图配置编辑页（`/list/ai_query_intent/add`）提供 **6 个聚合 WebMCP 工具**，复用当前用户登录会话和 `canAccessConsoleRoute` 权限校验，并与列表页（`/list/ai_query_intent`）及多个缓存页签共享单活动页签互斥注册机制：

1. `get_intent_editor_context`（只读）：读取当前模式（`add`/`edit`/`copy`/`view` 及内置意图只读锁定）、加载状态、页签、意图类型、`isChanged` 以及表单、问数来源、参数行与功能样式的实时页面草稿。
2. `list_intent_config_options`（只读）：检索智能体、关联业务类型树、业务元数据字段、问数来源（数据集／报表／BI 看板及其参数）、关联意图及字段，以及静态枚举字典，避免 Agent 盲填标识。
3. `update_intent_question_draft`（草稿修改）：修改提问设置主表单字段、切换意图类型（仅 `add`/`copy` 允许）或启停／配置问数来源，并自动同步当前可见页签。
4. `configure_intent_parameters`（草稿修改）：对目标参数表（`query` 主参数表或 `askNumber` 下的 `Dataset`/`Report`/`Bi` 参数表）执行 `import_metadata`、`add`、`update`、`remove`、`replace` 增量或整表操作。
5. `update_intent_style_draft`（草稿修改）：设置 `supportPage`（支持分页）并对功能样式操作按钮表执行 `add`、`update`、`remove`、`replace`。
6. `save_intent_config`（高影响写操作）：执行页面同款表单校验与配置组装；默认仅做校验并返回待保存摘要，仅当显式传入 `confirm: true` 时调用 `saveData` 落库，默认保存后广播列表刷新并关闭当前页签（`closeAfterSave: true`）。

所有 WebMCP 路径严禁弹出阻塞式 `NG.confirm` 弹窗；涉及级联清空已有参数或子配置的操作，要求显式传入 `clearExisting: true`，否则明确返回受影响范围提醒而非静默清空。`otype=view` 或内置意图（`userModFlg === '0'`）强制锁定为只读，拒绝草稿修改与保存。

## User Stories

1. As an 已登录管理员, I want Agent 复用当前浏览器会话与 `canAccessConsoleRoute` 权限进入编辑页配置, so that 无需额外登录且权限边界与人工页面一致。
2. As an 用户, I want 工具自动识别 `add`/`edit`/`copy`/`view` 及内置意图只读降级, so that 内置意图或只读视图绝不会被工具篡改。
3. As an Agent 使用者, I want 读取当前编辑页的完整草稿上下文, so that 能基于已有字段、参数与样式继续增量修改。
4. As an Agent 使用者, I want 在编辑前检索合法的业务类型、智能体、业务元数据、数据集／报表／BI 与关联意图候选, so that 不会填入无效的业务标识。
5. As an 用户, I want Agent 修改草稿时同步更新页面表单、表格并切到对应可见页签, so that 可以直观看到每一步改动。
6. As an 用户, I want 编辑已存在意图时支持对参数表和样式表进行局部增删改及导入元数据, so that 无需重传整张表即可调整单个字段提示词或按钮。
7. As an 用户, I want 切换意图类型、变更业务类型或关闭问数来源时不会因模态确认框阻塞且需显式确认清空, so that 工具调用可靠完成且不会意外丢失原有配置。
8. As an 用户, I want 保存前能先做校验摘要预览并仅在显式 `confirm: true` 时落库保存, so that 避免未核对完成就误提交。
9. As an 用户, I want 列表页与多个编辑页签之间按实际激活页签互斥注册 WebMCP 工具, so that 切换页签时不会错调后台缓存页签的工具。

## Implementation Decisions

### 业务范围与页面模式

- 覆盖路由 `/list/ai_query_intent/add` 的全部模式：`add`（新增）、`edit`（编辑）、`copy`（复制新建）、`view`（只读查看）以及 `userModFlg === '0'` 触发的内置意图自动降级只读。
- 同时支持 `表单查询意图`（`query`）和 `问数查询意图`（`askNumber`，含 `Dataset` / `Report` / `Bi` 三种来源及其各自参数表）。
- 不新增独立后端 MCP 服务，不修改后端接口协议或数据库结构；沿用 `document.modelContext` 浏览器 API。
- 本期保持聚焦上述 6 个工具，不新增独立的关闭／放弃草稿工具，不包装每个底层输入框或按钮为单独工具。

### 跨页签互斥注册与生命周期

- 列表页（`/list/ai_query_intent`）与编辑页（`/list/ai_query_intent/add`）以及同时打开的多个编辑页签，共用同一单活动页签注册协调器，保证任一时刻仅当前真正激活可见的页签（核对 `mounted`、`location.pathname`、`microAppConfig.getTabInfo()?.activeKey` 与 `.ant-tabs-tabpane-active` / `.ant-tabs-tabpane-hidden`）持有已注册工具。
- 详情仍在加载中（`loadStatus === 'loading'`）或加载失败（`loadStatus === 'error'`）时，`get_intent_editor_context` 仍可返回对应状态与错误信息；草稿修改与保存工具必须等待 `loadStatus === 'ready'`，否则返回明确错误。

### 权限、只读与安全约束

- 访问控制与页面一致，采用 `canAccessConsoleRoute(user, pathname, search)`（即 `adminFlag || sysAdminFlag`），并复用 `SESSION_EXPIRED`（401）、`UNAUTHENTICATED`、`FORBIDDEN`（403）与 `PAGE_UNAVAILABLE` 错误码口径。
- 当 `otype === 'view'` 或加载后的意图为内置意图（`String(userModFlg) === '0'`）时，`capabilities.supportsWrite` 为 `false`，`update_intent_question_draft`、`configure_intent_parameters`、`update_intent_style_draft` 与 `save_intent_config` 必须明确拒绝（`READ_ONLY_MODE` 或 `FORBIDDEN`）。
- 配置中的 `listUrl`、`functionUrl`、`prompt`、`remark` 等均作为不可信文本／业务配置处理，工具不得访问或执行这些 URL 或指令。

### 工具行为契约

| 工具 | 性质 | 核心行为 |
| --- | --- | --- |
| `get_intent_editor_context` | 只读 | 无业务输入；返回模式、加载状态、页签、意图类型、`isChanged`、基础表单、问数来源、各参数表行、样式配置与当前可用工具能力。 |
| `list_intent_config_options` | 只读 | 按 `target` 检索候选：`ai_models`、`business_types`（支持 `nodeid` 懒加载与关键词过滤）、`business_fields`（按 `busCode`）、`datasets`、`dataset_params`、`reports`、`report_params`、`bi_screens`、`bi_params`、`ref_intents`、`ref_intent_columns`、`static_dictionaries`。 |
| `update_intent_question_draft` | 草稿修改 | 支持切换 `intentType`（仅 `add`/`copy`）、修改主表单字段、开关并设置 `Dataset`/`Report`/`Bi`；涉及级联清空已有参数/子配置时若未传 `clearExisting: true` 则拒绝并提示受影响数量；默认自动切至 `askSettings`（可传 `switchTab: false` 覆盖）。 |
| `configure_intent_parameters` | 草稿修改 | 指定 `scope`（`query` / `dataset` / `report` / `bi`，默认按当前模式推断）与 `action`（`import_metadata` / `add` / `update` / `remove` / `replace`）；默认自动切至 `askSettings`（可传 `switchTab: false`）。 |
| `update_intent_style_draft` | 草稿修改 | 设置 `supportPage` 与/或对 `styleInfoDetailDtoList` 执行 `add` / `update` / `remove` / `replace`；默认自动切至 `styleSettings`（可传 `switchTab: false`）。 |
| `save_intent_config` | 高影响写操作 | `consequentialHint: true`。先执行 `isValid()` 与必填检查；`confirm !== true` 时仅返回校验结果与待保存负载摘要；`confirm: true` 且校验通过时调用 `saveData` 持久化，成功后广播 `refreshListEvent` 并在 `closeAfterSave !== false` 时关闭当前页签。 |

### 非阻塞确认与草稿同步

- 所有 WebMCP 变更路径不得触发页面 `NG.confirm(...)` 阻塞模态框；人工直接点击界面按钮或开关仍保留原有 `NG.confirm` 交互。
- 参数表与样式表的行数据修改同时更新页面组件实例（`NG.getCmpApi(...)`）和编辑页状态（标记 `isChanged: true`），确保随后人工接管或 `save_intent_config` 提交时数据完全一致。

## Testing Decisions

- 以“Agent 调用公开 WebMCP 工具 → 页面表单/表格可见状态与返回结果”为主要测试边界，使用 `InMemoryModelContext` 宿主替身与服务层 mock 进行自动化集成测试。
- 重点覆盖：
  1. 跨页签互斥：列表页与编辑页切换、多个编辑页签切换、隐藏/卸载页签不残留注册。
  2. 只读/权限边界：`view` 模式、内置意图（`userModFlg === '0'`）降级只读、`SESSION_EXPIRED` / `FORBIDDEN`、加载中/加载失败拒写。
  3. 候选查询工具：各 `target` 参数校验、树懒加载与过滤、错误传播。
  4. 草稿工具：不触发阻塞 `NG.confirm`、`clearExisting` 护栏、增量增删改与元数据导入、自动切换可见页签。
  5. 两阶段保存：`confirm: false` 仅校验摘要、`confirm: true` 调 `saveData`（含 `copy` 转 `Add`、`edit` 保留 `ModifiedRow`）、保存后刷新列表与关闭页签。
- 最后在支持 WebMCP 的已登录 Chrome 浏览器中完成真机联调（重点围绕编辑页 `id=27971772032545&otype=edit` 场景及列表↔编辑页签切换验证）。

## Out of Scope

- 新增独立后端 MCP 服务或变更后端接口数据结构。
- 关闭或放弃草稿的专用 WebMCP 工具（人工点击取消/关闭即可）。
- `ai_save_intent`（智能录单）页面改造与全站通用 WebMCP 平台化。
- 将个人本地入口、工作流配置、规格和任务提交至 Git 远程。
