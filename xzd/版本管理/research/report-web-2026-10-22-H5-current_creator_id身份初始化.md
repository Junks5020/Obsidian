---
tags:
  - report-web
  - research
  - bug-diagnosis
status: reverted-local-backup-cross-origin-pending
date: 2026-10-22
updated: 2026-10-22
branch: 6.5.2-dev
---

# report-web H5 current_creator_id 身份初始化调查

相关：[[00-版本总览]] · [[report-web-术语表]] · [[参考/故障记录]]

## 结论

高置信度根因：报表预览 iframe 是独立页面上下文。冷启动时收到 `tokenKey` 后，报表 iframe 的 `$NG.getUser()` 只有 token，没有 `userID/userName`；Nova 宿主的用户内存不会自动共享给 iframe。报表的 `current_creator_id` 系统参数依赖 `$NG.getUser().userID`，所以冷启动/硬刷新时不能解析为当前操作员 ID。

空控件对象是后续请求序列化的第二个问题：`{value:null,label:null}` 被 nullish fallback 当作原值继续传递，空值过滤也不把普通对象判空，最终发到 `getReportData`。

上一轮曾实现 Nova → report-web 的内部身份交接：Nova 从当前会话生成报表 URL，携带 `userID/userName`；report-web 在 token 启动阶段把 `userID` 映射进 `$NG.getUser()`，确保初始查询前身份就绪。用户确认这是内部受控链路，URL 身份作为宿主上下文使用；它不是由身份接口验证的声明。token 仍用于认证。身份接口返回的组织/项目等字段仅在接口 `userID` 与宿主 `userID` 规范化后一致时合并；不一致或接口失败时只保留宿主身份与本次 token，相关组织/项目系统过滤继续由 fail-closed 守卫处理。URL 身份缺失/无效时仍沿用 token 身份恢复路径。

当前分支状态：用户随后要求撤销 report-web 上次提交并强制覆盖远端。`6.5.2-dev` 已重置至父提交 `5049a2c3e`，远端同分支也已通过带 lease 的强制更新回到该提交；原提交保留在本地备份分支 `backup/6.5.2-dev-before-undo-b86cad257`。Nova 修改仍未提交；未部署。

## 调用链与证据

1. 移动端 `listQueryCondition` 对 `ygid` 返回 `paramValueSource: system_param`、`value: current_creator_id`。
2. 修复前 `src/app.tsx` 的 `getInitialState()`：有 `tokenKey` 时只执行 `NG.setUser({ tokenKey })`；只有没有 tokenKey 时才 `await injectGlobalInfo()`。内嵌预览 iframe URL 带 tokenKey。
3. 安装的 `udp-core` 实现中，`setUser` 将新对象合并到当前内存用户缓存；`getUser` 优先返回内存缓存。已初始化的 SPA 可以保留之前注入的用户身份，而全新文档冷启动的缓存为空时只剩 tokenKey。`injectGlobalInfo()` 才会加载/缓存完整全局用户信息。
4. `src/pages/TableManager/preview/index.tsx` 读取 `const userInfo = NG.getUser()`，并在初始查询值中调用 `handleMergeValue`。
5. `src/pages/TableManager/preview/utils/systemParam.ts` 将 `current_creator_id` 映射为 `{value: userInfo?.userID, label: userInfo?.userName}`。身份字段缺失时，此 helper 的属性是 `undefined`；线上请求中的 `null` 是后续某层转成的，具体转换点尚未追到。
6. 修复前 `src/pages/TableManager/preview/utils/sheetQueryParams.ts` 的 `paramValues[index]?.value ?? paramValues[index]` 在 `value` 为 null 时回退到整个对象；后续格式化亦保留对象，空值过滤不会拒绝该对象。当前实现按是否拥有 `value` 属性解包，并在发请求前阻止未解析的系统条件。
7. 修复前观测到同一 SPA 热路径首请求带有正确 creator ID；硬刷新 iframe URL 后，`NG.getUser()` 仅含 tokenKey，`getReportData` 的 `ygid.paramValue` 为 `{value:null,label:null}`，HTTP 400 / 业务码 500。

## 证据边界

- 外层移动壳 token-only 冷启动的身份接口契约已验证：使用本次 token、`credentials: omit`、无 cookie 请求时返回当前会话用户；不带 token 返回 401。凭据及实际用户标识未输出或保存。
- 本地修复版本已在原移动壳的跨源 iframe 中加载；CDP 能看到并附加 iframe target，但当前浏览器工具未提供该 OOPIF 的 Network 事件，因此尚未直接验证跨源子 frame 内的 `getReportData` 业务响应。
- 本地开发版在独立页面的首次请求和身份恢复失败路径均已验证；具体浏览器证据见“验证”。
- 浏览器脚本从完整响应中仅提取业务 `Code` 并在内存中做脱敏比较；未输出或持久化报表内容、token 或真实用户标识。未部署、未替换线上文件。

## 上一轮实现（已从活动分支撤销）

- Nova `react/src/pages/report/detail/index.tsx` 统一构造 iframe 与 `openWebBrowser` URL，从当前 SDK 用户或宿主 `user.userInfo` 取 `userID/userName`，使用 `encodeURIComponent` 编码后附在 hash 路由查询串中。
- `src/app.tsx` 的 token 启动先清空旧用户缓存，再以当前 token 请求 `/SUP/GetAppInfoForPage`；设置 10 秒超时、`credentials: 'omit'`、`redirect: 'error'` 和显式 Authorization。有效的非空标量 URL `userID` 映射为顶层 `NG.getUser().userID`；只有接口 `userID` 与它规范化后一致，才合并组织/项目等补充字段。ID 不同、响应无效或接口失败时不混合服务端字段，只保留宿主 ID/name 与本次 token；其他缺失系统身份由预览页 fail-closed 阻断。URL 身份缺失/无效时使用接口身份；无 token 路径不读取 URL 身份，仍调用原有 `injectGlobalInfo()`。
- 预览查询在首次加载、手工查询、切换 sheet、Excel 导出前校验系统查询条件；任何系统参数缺失/空值都阻止请求，已支持的身份标记还必须与当前会话标量身份一致。查询配置与 raw 条件缓存均成功加载后才允许命中查询缓存；手工查询在修改 queryInfo/缓存前验证配置就绪。参数构建按目标 sheet 读取其 raw 条件，避免配置失败后空条件列表导致校验 vacuous pass。导出另验证每个 sheet 的查询配置确实加载成功；仅成功加载且确无参数时才允许空数组。配置加载失败会清理该 sheet 的失败/raw 条件缓存、关闭 loading、提示并返回失败，不会缓存成“成功但无条件”或发送数据请求；失败可重试。多 sheet 导出无论成功或失败，都会恢复活动 sheet 的 raw 查询条件。阻断不会静默删掉薪资范围过滤条件。
- 查询键生成统一使用 `getQueryItemNameKey()`；序列化只解包 `value` 包装对象，保留有效 `0`/`false`、多选和日期区间。

## 验证

- `node --test tests/app-initial-state.test.cjs tests/preview-system-only-query.test.cjs`：56 项通过；新增同身份时合并上下文、身份不匹配时隔离服务端字段、无效/缺失时接口回退、接口失败保留宿主身份、无 token 忽略 URL 身份，以及注入身份到 `ygid.paramValue` 的实际映射/序列化覆盖；原有系统参数、配置失败、查询、切页和导出保护均通过。
- Nova `node --test react/test/pages/report/detail/iframe-url.test.cjs`：3 项通过；真实渲染 Nova 详情组件，验证 iframe 与展开 URL 的身份、同一用户对象取值、hash 路由和特殊字符编码。
- report-web 与 Nova React 的 `npm run build` 均成功；修改文件 Prettier 检查及两个仓库 `git diff --check` 通过。Nova `tsc --noEmit` 因缺少 `react-pdf` 类型声明停止，未完成全量类型检查。
- 原 report-web 提交 `b86cad257` 已从本地及远端 `6.5.2-dev` 分支撤销；当前两者均指向 `5049a2c3e`。本地备份分支 `backup/6.5.2-dev-before-undo-b86cad257` 保留原提交。Nova 修改仍未提交；未部署。
- 先前 report-web token 恢复版本的独立页面浏览器验证：`GetAppInfoForPage` HTTP 200，无 Cookie 请求头且未观察到重定向；`getReportData` HTTP 200、业务 `Code: 200`；身份恢复失败时未发送 `getReportData`。这些结果验证 report-web token 回退路径，不代表最新 Nova URL 注入已完成真实嵌入验收。摘要不含 token、用户 ID 或报表数据。
- 最新 Nova → report-web URL 身份交接目前由合成值组件测试、report-web 初始化测试及两端构建覆盖；尚未在真实 Nova 会话中重新打开跨源 iframe 验证 `getReportData` 业务响应。
- 跨源验证：本地开发版在原移动壳 iframe 中触发 load，CDP 显示 iframe target 并成功附加；但未能读取该 target 的 Network/业务 Code，因此跨源 iframe 的报表请求验收仍待完成。
- `node --test tests/*.test.cjs`：90 项通过、2 项失败（共 92 项）；失败分别是未修改的左侧菜单 Umi 导航断言和表格抽屉初始化断言，均与本次查询修复无关。
- ESLint 因仓库依赖缺少 `eslint-config-prettier` 无法运行。`tsc --noEmit --ignoreDeprecations 6.0` 仍报告多处既有 UDP UI 组件类型错误及预览文件 `alertParams` 类型错误；该检查早于最终配置失败守卫，最终守卫由相关运行时测试和成功构建覆盖，未单独重跑全量类型检查。
