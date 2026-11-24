# 01: 读取活动页面上下文

**What to build:** Agent 能在当前已登录的意图配置管理页发现并调用 get_intent_page_context，获取真实的筛选、分页、加载状态和可用能力。建立最小可运行的 WebMCP 接入，工具只能作用于活动页面实例，不影响原有人工页面。

规格：[[work-items/intent-config-webmcp/spec|意图配置管理页只读 WebMCP]]
领域：[[ng-work-web-术语表]]
工作流：[[ng-work-web-Agent工作流配置]]

**Blocked by:** None (can start immediately).

**Status:** done

## Acceptance criteria

- [x] 核实目标浏览器的实际 WebMCP 注册、调用、结果封装及注销能力；记录验证依据。无法支持约定能力时报告阻塞，不改为独立后端 MCP 服务。
- [x] get_intent_page_context 无业务输入，返回当前活动意图页面实际筛选、分页、加载状态和当前已实现且获授权的能力，不提前宣称后续工具可用。
- [x] 工具读取与页面共用同一状态，不发起实际查单或任何配置写操作，不改变筛选或导航。必要的状态整理先完成并保留人工行为。
- [x] 复用当前会话及管理页访问权限；未登录、会话失效、权限不足或页面不可用时不泄露配置上下文，并明确反馈。
- [x] 处理页签激活、隐藏、刷新、关闭及组件销毁：无重复注册、过期入口或隐藏实例串操作；异步结果不得更新过期页面。
- [x] 宿主不支持 WebMCP 或注册失败时人工页面仍正常工作，不把注册失败报告为成功。
- [x] 以公开工具调用及页面可见状态为主要测试边界，在宿主与现有请求边界使用替身，覆盖权限、生命周期、重复注册与能力降级，而非依赖内部函数细节。
- [x] 在支持 WebMCP 的浏览器验证真实工具发现、调用和页签切换；登录或宿主阻塞时明确记录未验证项，不宣称端到端完成。
- [x] 个人入口、规格和任务保持本地，不暂存、提交或推送；保留现有无关修改。

## Comments

本页管理查单／问数意图配置，不是实际查单页面。后续任务复用本任务建立的最小活动页签与工具接入机制；避免扩展为全站通用平台。

### 实施与验证记录（2026-11-17）

- **目标浏览器 WebMCP API 核实依据**：
  - 官方规范（`https://webmachinelearning.github.io/webmcp/`）及 Chrome 文档（`https://developer.chrome.com/docs/ai/webmcp/imperative-api`）确认浏览器编程接口为 `document.modelContext`（`navigator.modelContext` 已在 Chromium 150 废弃），使用 `registerTool(tool, { signal })` 与 `AbortController.abort()` 注销，`execute` 返回可 JSON 序列化对象。
  - 通过 `agent-browser`（Google Chrome for Testing `157.0.8103.50`）配合 `--args "--enable-blink-features=WebMCP"` 在安全上下文实测确认：`typeof document.modelContext === 'object'`、`typeof navigator.modelContext === 'undefined'`，`registerTool` / `getTools` / `executeTool`（返回 JSON 字符串）/ `AbortSignal` 注销及 `agent-browser webmcp list` 均可正常工作；未开启该 Blink 特性开关时 `document.modelContext` 为 `undefined`。
- **代码改动**：
  - `src/pages/ListPages/aiIntent/query/webmcp.ts`：新增 WebMCP 适配层与 `get_intent_page_context` 工具定义、零参数运行时校验（`INVALID_INPUT`）、会话/权限/活动态守卫（`PAGE_UNAVAILABLE` / `SESSION_EXPIRED` / `UNAUTHENTICATED` / `FORBIDDEN`）、状态快照构造（`total: null, totalTrusted: false`、`implementedTools: ['get_intent_page_context']`、`supportsWrite: false`、`supportsActualBillQuery: false`）与单活动实例注册器 `createActiveIntentPageRegistry`。
  - `src/pages/ListPages/aiIntent/query/index.tsx`：接入 `activeIntentPageRegistry` 与 `useCacheCtx()` / `microAppConfig.getTabInfo()` / `useLocation()` / `.ant-tabs-tabpane-hidden` 活动页签识别；将 `NGSearch`、`Checkbox`、`RadioGroup` 与 `NGTable` 状态统一收敛到共享状态；增加 `tableRef`、请求序号与隐藏/卸载态守卫，阻止过期/隐藏页签更新状态或弹出 `NG.alertError`，并保留 401/403 权限态不被后续 500 掩盖。
  - `src/pages/ListPages/aiIntent/query/webmcp.test.ts`、`src/pages/ListPages/aiIntent/query/index.test.tsx`：覆盖适配器与渲染页集成测试。
- **自动化验证结果**：
  - `npm test`（`umi-test`）：3 个测试套件全部通过（共 29 条用例：`apiError.test.ts` 3 条、`webmcp.test.ts` 18 条、`index.test.tsx` 8 条）。
  - `npm run eslint`（`eslint --ext .tsx,.ts ./src`）：0 错误、0 警告。
  - `npx tsc --noEmit`：改动文件 `src/pages/ListPages/aiIntent/query/index.tsx` 与 `webmcp.ts` 无 TS 报错（仓库其他既有文件及未配置 `@types/jest` 的测试类型报错为既有基线）。
- **真机浏览器端到端验证（已登录 Chrome + `#enable-webmcp-testing`）**：
  - 未开启 `#enable-webmcp-testing` 时连接已登录页签：`document.modelContext` 为 `undefined`，人工列表正常加载与操作。
  - 开启 `#enable-webmcp-testing` 后通过 `agent-browser --auto-connect` 连接已登录页签 `http://localhost:8088/#/list/ai_query_intent?appTitle=%E6%99%BA%E8%83%BD%E6%9F%A5%E5%8D%95&menuType=backend`：
    - `webmcp list` 成功发现 `get_intent_page_context`。
    - `webmcp invoke get_intent_page_context --params '{}'` 返回 `ok: true`、`filters`（`type: "all"`）、`pagination`（`pageIndex: 1, pageSize: 20, currentPageCount: 11, total: null, totalTrusted: false`）、`loadingState`（`status: "success"`）与 `capabilities.implementedTools: ["get_intent_page_context"]`。
    - 点击“查单”筛选并恢复“全部”：工具返回同步更新为 `type: "query"`；传入 `{"extra":1}` 返回 `INVALID_INPUT` 错误。
    - 页签切换实测中捕获并修复了 `rc-tabs` + `CSSMotion` 切回已缓存页签时残留 `.ant-tabs-tabpane-hidden` 导致未重注册的问题（`isDomTabPaneHidden` 优先认 `.ant-tabs-tabpane-active`）；修复并补充 `Test 8` 后复测：切至“智能录单”页签工具立即清空，切回“智能查单”页签立即重注册且可正常调用，关闭多余页签后工具保持可用。
