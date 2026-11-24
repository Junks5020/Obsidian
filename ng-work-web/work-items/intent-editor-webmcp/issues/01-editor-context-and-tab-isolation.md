# 01: 编辑页上下文读取与跨页签互斥注册

**What to build:** 为 `/list/ai_query_intent/add` 建立 WebMCP 接入基础，并与列表页 `/list/ai_query_intent` 共用单活动页签注册协调器，实现 `get_intent_editor_context` 只读工具及权限、只读模式识别。

规格：[[work-items/intent-editor-webmcp/spec|意图配置编辑页 WebMCP]]
领域：[[ng-work-web-术语表]]
工作流：[[ng-work-web-Agent工作流配置]]

**Blocked by:** None (can start immediately).

**Status:** done

## Acceptance criteria

- [x] 列表页与编辑页（及多编辑页签之间）共用统一的活动页签互斥协调器，任一时刻仅真正激活可见的页签注册工具。
- [x] `get_intent_editor_context` 无业务输入，严格校验空对象；实时返回 `otype`、`isCopy`、`isView`、`isBuiltin`、`loadStatus`、当前页签、意图类型、`isChanged`、表单草稿、问数来源配置、参数表行数与行内容、样式配置以及可用能力列表。
- [x] 使用 `canAccessConsoleRoute` 校验管理权限，区分 `UNAUTHENTICATED`、`SESSION_EXPIRED`、`FORBIDDEN`、`PAGE_UNAVAILABLE`、`INVALID_INPUT`。
- [x] 当 `otype === 'view'` 或 `userModFlg === '0'` 时准确标识 `isReadOnly: true` 与 `supportsWrite: false`。
- [x] `loadStatus` 为 `loading` 或 `error` 时，`get_intent_editor_context` 仍可反映真实加载状态，不破坏原有详情页面渲染与 `detailBridge` 上报。
- [x] WebMCP 不可用或注册失败时，原有人工编辑/查看页正常使用。

## Comments

已在 `src/pages/ListPages/aiIntent/query/webmcp.ts` 新增 `sharedIntentWebMcpCoordinator`，并在 `src/pages/ListPages/aiIntent/query/index.tsx` 与 `src/pages/ListPages/aiIntent/query/add/index.tsx` 中统一接入。`get_intent_editor_context` 实现于 `src/pages/ListPages/aiIntent/query/add/webmcp.ts`。
