# 04: 两阶段校验与确认落库保存工具

**What to build:** 实现 `save_intent_config` 工具，支持先执行表单校验与待保存负载摘要预览，仅在显式 `confirm: true` 时调用 `saveData` 持久化并处理列表刷新与页签关闭。

规格：[[work-items/intent-editor-webmcp/spec|意图配置编辑页 WebMCP]]
领域：[[ng-work-web-术语表]]
工作流：[[ng-work-web-Agent工作流配置]]

**Blocked by:** [[work-items/intent-editor-webmcp/issues/03-draft-editing-tools|03 提问设置、参数表与功能样式草稿修改工具]]

**Status:** done

## Acceptance criteria

- [x] `save_intent_config` 标记 `consequentialHint: true`，在只读模式、内置意图、加载未完成或权限不足时拒绝执行。
- [x] 先调用对应表单 `bApi.isValid()`（与页面保存按钮一致）校验必填项；校验不通过时返回明确错误且不调 `saveData`。
- [x] `confirm !== true` 时仅返回 `saved: false`、`validationOk: true` 与待保存结构摘要（意图名、类型、参数数量、样式配置数、`otype`），不发送写请求。
- [x] `confirm === true` 且校验通过时，按页面完全一致的 `questionInfo` / `styleInfo` / `getFormatForm(..., isCopy ? OType.Add : otype)` 逻辑调用 `saveData`。
- [x] 保存成功后广播 `refreshListEvent`；默认 `closeAfterSave !== false` 时调用 `NG.close()` 关闭当前页签，返回 `saved: true, closed: true`；保存失败时透传 `SESSION_EXPIRED` / `FORBIDDEN` / `REQUEST_FAILED` 并保留页签与草稿。

## Comments

`add/index.tsx` 的手动保存按钮与 `save_intent_config` 共用 `buildIntentSaveData`。自动化测试覆盖 `confirm: false` 与 `confirm: true`（含 `edit` / `add` / 失败保留）；真机已验证 `confirm: false` 校验摘要（未对线上测试数据执行 `confirm: true` 写库，避免污染演示记录）。
