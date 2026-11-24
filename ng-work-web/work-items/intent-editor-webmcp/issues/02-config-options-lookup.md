# 02: 配置候选与元数据只读检索

**What to build:** 实现 `list_intent_config_options` 只读工具，让 Agent 在修改编辑页草稿前能够查询智能体、业务类型树、业务元数据字段、问数来源（数据集／报表／BI）及参数、关联意图及字段、静态字典等合法候选数据。

规格：[[work-items/intent-editor-webmcp/spec|意图配置编辑页 WebMCP]]
领域：[[ng-work-web-术语表]]
工作流：[[ng-work-web-Agent工作流配置]]

**Blocked by:** [[work-items/intent-editor-webmcp/issues/01-editor-context-and-tab-isolation|01 编辑页上下文读取与跨页签互斥注册]]

**Status:** done

## Acceptance criteria

- [x] `list_intent_config_options` 具备清晰严格的输入 schema，覆盖 `ai_models`、`business_types`、`business_fields`、`datasets`、`dataset_params`、`reports`、`report_params`、`bi_screens`、`bi_params`、`ref_intents`、`ref_intent_columns`、`static_dictionaries`。
- [x] 非法 `target` 或缺少必要依赖参数（如 `business_fields` 缺 `busCode`、`dataset_params` 缺 `datasetId` 等）直接返回 `INVALID_INPUT`，不发后端请求。
- [x] `business_types` 支持传 `nodeid` 懒加载子树、过滤并标明 `selectable`（仅 `nodetype == '2'` 可选为业务类型）。
- [x] 后端接口失败或 401/403 时透传 `SESSION_EXPIRED` / `FORBIDDEN` / `REQUEST_FAILED` 错误，不伪造空候选。
- [x] 所有返回的 URL、描述、字段名称仅作不可信结构化数据输出，不执行或请求业务取数地址。

## Comments

已在 `src/pages/ListPages/aiIntent/query/add/webmcp.ts` 实现 `list_intent_config_options`，并在真实登录 Chrome 会话中验证 `ai_models` 与 `business_fields` (`CON5`) 检索。
