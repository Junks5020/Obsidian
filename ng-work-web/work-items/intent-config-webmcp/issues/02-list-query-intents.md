# 02: 查询意图配置并同步页面

**What to build:** Agent 通过 list_query_intents 检索意图配置、翻页和刷新，用户能在页面看到同一筛选及结果。工具准确区分失败和空结果，并防止旧请求覆盖用户的新查询。

规格：[[work-items/intent-config-webmcp/spec|意图配置管理页只读 WebMCP]]
领域：[[ng-work-web-术语表]]
工作流：[[ng-work-web-Agent工作流配置]]

**Blocked by:** 01 — [[work-items/intent-config-webmcp/issues/01-active-page-context|读取活动页面上下文]]。

**Status:** done

## Acceptance criteria

- [x] 注册 list_query_intents，支持可选 keyword、type、onlyEnabled、pageIndex、pageSize；仅作用于当前活动且有权限的意图管理页。
- [x] 输入 schema 明确类型枚举及分页校验，非法输入不发请求；对接管理列表页码口径，不混用实际查单链路的页码规则。
- [x] 明确并记录省略参数、显式清空筛选、刷新及筛选变更后的页码规则，用契约测试固定，不暗中依赖控件偶然行为。若涉及业务范围变化先报告。
- [x] Agent 与人工操作共享查询状态；工具完成时返回结构化列表摘要、稳定 intentId 和实际生效查询范围，与可见筛选、分页及结果一致。
- [x] 查询、翻页和刷新等待实际加载结果；仅触发刷新事件不算成功。
- [x] 空结果、请求失败、权限不足、会话失效、输入无效和页面不可用可被调用方区分；不沿用失败返回空数组的语义。
- [x] 没有可信服务端总数时明确返回总数未知，不以当前页长度推算总量或声称已读完所有配置。
- [x] 明确内置意图的展示状态与后端原始状态口径，不将展示转换伪装成真实启停状态。
- [x] 用户或 Agent 发起新查询后，旧请求不覆盖新页面状态，也不将旧结果作为最新结果返回；页签失活或销毁时不更新过期实例。
- [x] 经公开工具入口自动化覆盖筛选、翻页、刷新、空结果、失败、权限、未知总数及响应乱序；在请求边界模拟后端，验证页面与返回值一致。
- [x] 在授权登录环境和支持 WebMCP 的浏览器验证真实调用与页面同步；环境阻塞时明确记录，不宣称未完成的验证已通过。
- [x] 不调用实际查单、保存、启停、删除或任意配置地址；原有人工管理能力无回归。
- [x] 个人入口、规格和任务保持本地，不暂存、提交或推送；保留现有无关修改。

## Comments

本任务依赖活动页面接入，不依赖详情读取或详情打开。复用现有会话和请求封装，不建立脱离页面的第二套查询状态。

### 实施与验证记录（2026-11-17）

- **参数与页码规则（契约固定）**：
  - 省略参数（`undefined`）：沿用当前页面对应筛选/分页参数（`{}` 等价按当前条件刷新）。
  - 显式清空：`keyword: ""` 清空关键词；`type: "all"` 或 `""` 重置为全部；`onlyEnabled: false` 取消仅显示已启用。
  - 页码重置：任意筛选条件发生变更且未显式传入 `pageIndex` 时重置 `pageIndex = 1`；显式传入 `pageIndex` 时按指定页码加载。
  - 口径区分：列表摘要同时返回 `rawEnabled` 与 `displayEnabled`（内置意图 `isBuiltin=true` 页面固定展示 `displayEnabled=false`），`total: null`、`totalTrusted: false`。
- **真机捕获并修复的问题**：实测发现向 `NGTable.setExtraParam` 传入 `__isPagination__: true` 且后端返回数组时，`NGTable` 会跳过 `request()` 直接切片缓存数组导致工具超时；现改由 `handleDataLoad` 与可见 `dataSource` 精确对齐分页切片并在加载完成后结算返回。
- **验证结果**：`npm test`（4 suites, 59 tests 全通过）、`npm run eslint`（0 errors）；在已登录 Chrome（`#enable-webmcp-testing`）实测 `list_query_intents` 按类型、每页条数与翻页返回与页面一致（5 条/页、第 2 页、`total: null`）。
