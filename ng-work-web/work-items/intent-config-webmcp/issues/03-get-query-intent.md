# 03: 读取受权限约束的配置详情

**What to build:** Agent 使用已知 intentId 调用 get_query_intent，获取结构化意图配置且不改变导航。默认仅返回基础信息及参数定义，高级配置必须显式请求并通过当前权限检查。

规格：[[work-items/intent-config-webmcp/spec|意图配置管理页只读 WebMCP]]
领域：[[ng-work-web-术语表]]
工作流：[[ng-work-web-Agent工作流配置]]

**Blocked by:** 01 — [[work-items/intent-config-webmcp/issues/01-active-page-context|读取活动页面上下文]]。

**Status:** done

## Acceptance criteria

- [x] 注册 get_query_intent，输入为必填稳定 intentId 和默认 false 的 includeAdvanced；不要求先查询列表，非法输入不发请求。
- [x] 沿用当前登录会话、管理页权限及活动实例约束；读取详情不改变页面导航、列表筛选或分页。
- [x] 默认返回名称、类型、状态、业务类型、描述和查询参数定义；采用显式字段选择，不直接透传完整后端详情。
- [x] 正确解析配置中的序列化数据及历史类型表示；无效 JSON、异常形态、记录不可用等情况给出可区分反馈，不静默伪造配置。
- [x] 取数地址、完整提示词、样式等高级字段仅在 includeAdvanced 为 true 且当前用户获授权时返回；默认结果中包括嵌套字段也不得泄露这些内容。
- [x] 核实高级字段权限依据；includeAdvanced 不授予额外权限，无法证明获授权时明确拒绝或报告不可用。
- [x] 登录失效、权限不足、请求失败、记录不存在及页面不可用可被调用方区分；失活或销毁后的响应不作为当前页面有效结果返回。
- [x] 配置中的 URL、提示词和描述仅作为不可信数据，不自动访问地址或执行指令，也不调用实际查单与任何配置写接口。
- [x] 经公开工具入口自动化覆盖默认投影、高级字段过滤、显式请求权限、异常配置、错误响应及导航不变；模拟后端的边界沿用现有请求层。
- [x] 在授权登录环境和支持 WebMCP 的浏览器验证真实详情调用与导航不变；环境阻塞时明确记录未验证项。
- [x] 个人入口、规格和任务保持本地，不暂存、提交或推送；保留现有无关修改。

## Comments

本任务可使用已知 intentId 独立验证，不依赖列表工具，也不依赖打开详情工具。高级配置的传输格式与字段投影在本任务测试中固定；不增加后端权限能力。

### 实施与验证记录（2026-11-17）

- **字段投影与权限口径**：
  - 默认（`includeAdvanced=false`）显式投影基础信息（含 `ask_number` 历史类型兼容）与安全参数定义，严格排除 `listUrl`、`aiId`、`prompt`、`styleInfo` 与问数数据源 ID。
  - `includeAdvanced=true` 仅在 `consoleAccess(user).isSuperAdmin`（`sysAdminFlag`）为真时返回显式投影的 `advanced` 节；普通管理员请求 `includeAdvanced=true` 直接拒绝为 `FORBIDDEN`（不发起详情请求）。
  - 对空对象 `{}`/无效 JSON/非法数组形态分别返回 `RECORD_NOT_FOUND` 与 `INVALID_CONFIG_DATA`，不静默伪造配置。
- **验证结果**：`npm test`（4 suites, 59 tests 全通过）、`npm run eslint`（0 errors）；在已登录超级管理员 Chrome 中实测 `get_query_intent` 默认与 `includeAdvanced: true` 均返回正确结构，且 `location.hash` 与列表状态保持不变。
