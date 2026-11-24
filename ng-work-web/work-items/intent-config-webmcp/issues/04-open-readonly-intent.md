# 04: 打开真正只读的配置详情

**What to build:** Agent 使用已知 intentId 调用 open_query_intent_detail，让用户查看指定意图的只读配置详情。只读限制覆盖内部子组件，同时保留原有人工授权编辑能力。

规格：[[work-items/intent-config-webmcp/spec|意图配置管理页只读 WebMCP]]
领域：[[ng-work-web-术语表]]
工作流：[[ng-work-web-Agent工作流配置]]

**Blocked by:** 01 — [[work-items/intent-config-webmcp/issues/01-active-page-context|读取活动页面上下文]]。

**Status:** done

## Acceptance criteria

- [x] 注册 open_query_intent_detail，输入为必填稳定 intentId；可使用已知标识直接打开，不要求先调用列表或结构化详情工具。
- [x] 复用当前会话、权限与活动实例约束，保留页面所需导航上下文，打开目标意图而非其他同名或同行号意图。
- [x] 成功结果表示指定只读详情实际就绪，而非仅表示发送导航事件；无效标识、无权限、会话失效、加载失败及导航失败明确反馈。
- [x] 只读模式覆盖基础表单、参数、样式及问数配置等子组件；新增、编辑、删除、导入或保存等修改入口均不能改变该详情配置，不仅隐藏保存按钮。
- [x] 不执行保存、启停、删除、实际查单或配置中任意地址；不将完整配置作为打开操作的附带返回值泄露。
- [x] 保留原有人工授权编辑能力及内置意图限制，不通过全局禁用编辑功能实现工具只读。
- [x] 导航导致源页签失活时，正确结束本次有意导航并确认目标；不能把所有源页失活一律误判为失败，也不能让后续调用落入隐藏实例。
- [x] 用户中途切换或关闭目标页签时，不误报其他页面打开成功，不复活或更新已销毁实例；沿用现有未保存变更保护，不静默覆盖用户编辑内容。
- [x] 经公开工具入口自动化覆盖目标匹配、导航成功与失败、权限、页签切换及子组件只读；断言外部行为而非依赖内部函数细节。
- [x] 在授权登录环境和支持 WebMCP 的浏览器验证实际打开、只读交互及原有人工编辑无回归；环境阻塞时明确记录未验证项。
- [x] 个人入口、规格和任务保持本地，不暂存、提交或推送；保留现有无关修改。

## Comments

本任务的只读是工具打开视图的行为保证，不是新增后端安全边界。可直接复用现有详情加载能力，因此不以任务 03 为阻塞条件。

### 实施与验证记录（2026-11-17）

- **真正只读覆盖范围**：在 `src/pages/ListPages/aiIntent/query/add/` 全子组件（`index.tsx`、`constVar.tsx`、`askSettings.tsx`、`Query.tsx`、`askNumber.tsx`、`styleSettings.tsx`、`comps.tsx`、`askNum/{bi,dataset,report}.tsx`）对 `otype === OType.View` 全面锁定表单、弹窗/抽屉触发、行内编辑器、导入元数据/新增/添加功能/支持分页/问数开关及删除操作列；原有 `OType.Edit`/`OType.Add` 人工编辑与保存能力完全保留。
- **导航与就绪协调**：通过 `src/pages/ListPages/aiIntent/query/detailBridge.ts` 跟踪目标只读详情实例从 `loading` -> `ready`/`error`/`unmounted`/`inactive` 的完整生命周期；打开目标页签导致源列表页签失活后仍可正常等待并确认目标就绪，同时拒绝因切走/关闭/活跃编辑页导致的伪成功，返回值不泄露完整配置。
- **验证结果**：`npm test`（4 suites, 59 tests 全通过）、`npm run eslint`（0 errors）；在已登录 Chrome（`#enable-webmcp-testing`）实测 `open_query_intent_detail` 成功打开 `27955370325025` 只读页签（15 个输入全部禁用、0 个删除链接、导入/新增/添加功能/开关禁用、无保存按钮），人工点击“编辑”仍正常可编辑保存，关闭后返回列表页且 4 个 WebMCP 工具自动恢复。
