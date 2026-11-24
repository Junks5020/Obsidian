# 05: 编辑页 WebMCP 自动化集成测试与真实浏览器验证

**What to build:** 编写覆盖编辑页 WebMCP 适配器与 `add/index.tsx` 组件集成的自动化测试套件，并在已登录开发环境中通过支持 WebMCP 的真实浏览器完成端到端验证。

规格：[[work-items/intent-editor-webmcp/spec|意图配置编辑页 WebMCP]]
领域：[[ng-work-web-术语表]]
工作流：[[ng-work-web-Agent工作流配置]]

**Blocked by:** [[work-items/intent-editor-webmcp/issues/04-save-intent-config|04 两阶段校验与确认落库保存工具]]

**Status:** done

## Acceptance criteria

- [x] 自动化测试覆盖：跨页签互斥切换（列表页 ↔ 编辑页、多编辑页签）、只读与内置意图拒写、6 个工具的输入校验与错误码区分、`clearExisting` 非阻塞清空保护、增量参数/样式修改与元数据导入、两阶段保存（含 `edit`/`copy`/`add`）与保存失败保留草稿。
- [x] `npm test`（`umi-test`）与 `npm run eslint` 全部通过，现有测试无回归。
- [x] 在本地已登录开发环境的 Chrome（启用 WebMCP）对 `/list/ai_query_intent/add?menuType=backend&...&id=27971772032545&otype=edit` 验证工具发现、读取上下文、候选检索、草稿更新与页签切换（或记录阻塞项）。
- [x] 个人 Obsidian 文档及 `AGENTS.md` 保持未暂存/未提交状态，不污染 Git 远端。

## Comments

### 验证记录（2026-11-17）
- `npm test`（`umi-test`）：5 个测试套件全部通过（共 67 条用例，其中新增 `src/pages/ListPages/aiIntent/query/add/webmcp.test.tsx` 8 条综合集成测试）。
- `npm run eslint`：0 错误、0 警告。
- `npx tsc --noEmit`：`aiIntent/query/` 所有非测试源码 0 报错。
- 真实浏览器（`agent-browser --auto-connect`，`http://localhost:8088` 已登录状态）验证：
  - 打开 `id=27971772032545`（`劳务分包合同信息-测试-编辑`）后，工具立即从列表页 4 个切换为编辑页 6 个。
  - `get_intent_editor_context` 正确读取 `CON5` / `PMS/PCM/CntM/GetCntListFor` / `aiId` / `otype: "edit"`。
  - `list_intent_config_options`（`ai_models`、`business_fields`）返回真实候选数据。
  - `configure_intent_parameters`（`import_metadata` 导入 `bill_no`, `title`）与 `update_intent_style_draft`（`supportPage: true` + `view` 操作按钮）实时同步至可见页面表格和复选框。
  - `save_intent_config`（`confirm: false`）通过真实表单校验并返回摘要（未调用 `confirm: true` 写库以保持用户测试数据原样）。
  - 切回“智能查单”页签并关闭编辑页签后，立即恢复列表页 4 个 WebMCP 工具。
