# 03: 提问设置、参数表与功能样式草稿修改工具

**What to build:** 实现 `update_intent_question_draft`、`configure_intent_parameters`、`update_intent_style_draft` 三个页面草稿修改工具，确保与页面组件实时同步、不触发阻塞式 `NG.confirm` 弹窗，并在只读或未就绪状态下严格拒写。

规格：[[work-items/intent-editor-webmcp/spec|意图配置编辑页 WebMCP]]
领域：[[ng-work-web-术语表]]
工作流：[[ng-work-web-Agent工作流配置]]

**Blocked by:** [[work-items/intent-editor-webmcp/issues/02-config-options-lookup|02 配置候选与元数据只读检索]]

**Status:** done

## Acceptance criteria

- [x] 三个工具在 `isView`（含内置意图）、`loadStatus !== 'ready'`、页签非活动或无权时均明确拒绝修改，不改动任何表单或表格状态。
- [x] `update_intent_question_draft` 支持修改 `query` / `askNumber` 主字段、`onlyWakeUse`、在 `add`/`copy` 下切换 `intentType`（`edit` 模式禁止切换类型），以及开关和设置 `Dataset`/`Report`/`Bi` 关联源。
- [x] 涉及清空已有参数或子配置的变更（切换 `intentType`、变更 `busCode` 或问数来源且当前参数非空、关闭 `Dataset`/`Report`/`Bi` 开关）在未传 `clearExisting: true` 时拒绝并提示受影响数据，绝不弹出阻塞 `NG.confirm`。
- [x] `configure_intent_parameters` 支持 `scope`（`query` / `dataset` / `report` / `bi`）与 `import_metadata` / `add` / `update` / `remove` / `replace` 操作，正确写入 `NG.getCmpApi(...)` 表格并标记 `isChanged: true`。
- [x] `update_intent_style_draft` 支持更新 `supportPage` 并对功能样式表执行 `add` / `update` / `remove` / `replace`，标记 `isChanged: true`。
- [x] 提问/参数工具默认自动切换至 `askSettings` 页签，样式工具默认自动切换至 `styleSettings` 页签（传 `switchTab: false` 时保持当前页签）。

## Comments

已在 `src/pages/ListPages/aiIntent/query/add/webmcp.ts` 与 `add/index.tsx` 实现，并通过真实浏览器实测 `configure_intent_parameters`（`import_metadata`）与 `update_intent_style_draft` 与页面 UI 的实时同步。
