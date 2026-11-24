---
updated: 2026-11-13
status: 实现与本地验证完成，待真实后端联调
---

# R-260702-000015 打印设置支持自定义设置

## 来源与优先级

- [研发 Wiki，版本 217850](http://ngwiki.newgrand.com/mediawiki/index.php?title=用户的打印时进行打印设置，保存后，打印设置可以按照用户设置记忆&oldid=217850)
- 用户会话中的接口文档与后续澄清优先于 Wiki；本次明确缩减为只改打印预览页。
- [[report-web-术语表-打印]]。

## 已确认的范围

1. **只修改 `src/pages/PrintManager/preview` 打印预览页。**
2. **不修改 `src/pages/TableManager/preview` 报表预览页。**不整合其布局菜单，不修改列宽行高、冻结、隐藏行列的保存与恢复。
3. 打印预览页工具栏改为「打印设置 ▼」，包含「打印设置」「保存设置」「恢复默认」。原弹窗及其按钮不变。
4. 保存完整的页面、页边距、分页、页眉页脚参数；未打开过弹窗或未调整设置也允许保存当前值；重复保存覆盖旧记录。
5. 操作员由后端 session 确定，前端不传 userId。
6. **刷新回显复用原有 `getPrintData`。**用户明确不新增个人设置读取接口，也不要求返回独立个人设置字段；前端继续使用原打印模板接口返回的打印设置。
7. 保存成功提示「设置已保存」，3 秒消失；恢复成功提示「已恢复默认设置」。

## 已确认的后端契约

### 保存

POST `/reportcenter/printRuntime/savePrintSettingConfig`

- `printId`：必填，Long，打印主键。
- `printSetting`：必填，字符串，完整打印设置 JSON。
- `sheetKey`：必填，字符串，工作表下标。
- 不传 `userId`。
- 响应示例：`{ "Status": "success", "Data": "1000112" }`。
- 不将返回 Data 作为新的 printId；不擅自改变现有主键。

### 删除

POST `/reportcenter/printRuntime/deletePrintSettingConfig`

- `printId`、`sheetKey` 同上，不传 `userId`。
- 响应示例：`{ "Status": "success" }`。

### 读取

沿用 POST `/reportcenter/printRuntime/getPrintData`；服务端返回的现有打印设置作为页面有效配置，不另造 GET 接口，不用 localStorage 代替后端持久化。

用户后续提供截图补充：工作表数据中与 `printSetting` 同级的 `userConfigFlag` 为用户设置标识；值 `"1"` 表示用户设置。前端兼容数字 `1`，其它值不显示「已应用个人设置」。

## 当前代码事实

- 基线：`ae5c1858`；工作目录 `/Users/jinxu/orca/workspaces/report-web/ljx-7.0`。
- 多个 `glm-5.3-flash` 代理已完成勘察、接口和页面实现；业务代码改动尚未提交。
- `PrintManager/preview/index.tsx` 从 URL 读取 printId，已有 printId 时调用 getPrintData；无 printId 时消费设计态预览数据。
- `preview/store/headerToolbar.tsx` 管理工具栏配置。
- 当前打印设置为 `sheet.printSetting[sheetKey].printConfig`；弹窗确认更新 store，新增菜单负责持久化；打印与 PDF 导出也消费该配置。
- `normalizePrintSetting` 以传入值为主、内置初始值补缺，适合未打开弹窗时获取完整设置。
- 新接口根据给定文档按 `Status === 'success'` 判断成功，不照搬其他接口的 `Code === 200`。
- 旧源码与 mock 没有配置来源标识；用户已补充真实响应字段 `userConfigFlag`，不得继续依靠配置差异推断来源。
- 项目使用 ReportTable/Handsontable 与 PDF 生成，有 Node `node:test` 回归测试。

## 用户最终确认的行为

1. 保存与恢复仅针对当前 sheet；恢复操作在删除成功后重新调用原打印预览接口，使用返回的模板默认设置，不硬编码重置为 initPrintSetting。
2. **「已应用个人设置」标识现接入 `userConfigFlag`。**此前暂不接数据的决定被用户新提供的字段契约替代；取当前工作表的 `userConfigFlag === '1' || userConfigFlag === 1`，随切换工作表及接口重载更新，不根据保存成功、配置差异或本地缓存伪造来源。
3. 用户明确已有模板的设计页 URL `id` 就是 printId。链路已核实：设计库的 `buildPrintDesignPayload(..., 'preview')` 已包含 printId，经 observer 到达预览页 `printInfo.printId`。保存/删除使用 URL printId 或该消息里的 printId；原 URL printId 的运行态/设计态分流不变，无需修改组件库或增加 URL 参数。确实没有目标标识时不能发送空 ID 请求。

旧轮次的无模板布局兼容问题因范围调整已撤销。

## 分阶段实施计划

所有子代理均指定 `zai-coding-cn/glm-5.3-flash`，不自行切换模型。

1. **勘察与计划**：已完成两个只读代理勘察和 Wiki 核对；用户已确认。并行核对设计页 ID 传递链路，避免将设计态预览误改为运行态。
2. **代理 A：接口与配置处理**：新增保存/删除服务函数、完整配置序列化及成功失败判定；补对应测试。
3. **代理 B：打印预览接入**：接入下拉菜单、当前 sheet 保存与恢复、加载/缺少 printId 时的保护、重复点击及异步切换 sheet 防护。只改 PrintManager 打印预览，不改 TableManager。
4. **代理 C：独立验证与审查**：检查需求覆盖，验证异常响应、未打开弹窗直接保存、多 sheet 隔离和原有打印/PDF 流程。
5. **主代理集成验收**：检查差异、运行相关及全量架构回归测试；可运行环境下验证 UI。接口依赖先落定；并行写入必须使用不同 worktree，否则串行写入，同一目录只允许一个写入代理。

## 验收清单

- 完整参数保存；未调整也可保存，原弹窗行为不变。
- 刷新继续通过原 getPrintData 回显；不新增个人配置读取接口。
- 保存与删除仅传 printId、sheetKey 及保存所需的 printSetting，不传 userId。
- 请求失败不提示成功；删除失败不擅自清空页面状态；删除成功但重载失败时提供准确反馈。
- 当前 sheet 与其他 sheet 隔离，重复点击、请求中切换 sheet 不污染数据。
- 打印、PDF 导出和弹窗使用一致的有效配置，不修改模板设计数据。
- 使用设计页 URL id 作为已有模板的持久化目标，保留设计态预览原始数据源；没有 ID 时不发空目标请求。
- 当前工作表 `userConfigFlag` 为字符串或数字 1 时显示个人设置标识；为 0、缺失等其它值时隐藏；恢复后依据重载响应更新。
- 不修改报表预览、布局持久化、列宽行高、冻结与隐藏行列。
- 明确区分 mock/单元测试通过与真实后端联调完成。

## 基线验证

- 实施前 `npm run test:architecture`：179 项，178 通过、1 失败。
- 已有失败：`tests/product-config.test.cjs` 的 `DataSetManager/detailApi: save includes product object; detail preserves it`，测试 mock 缺少 `@/constants/apiConfig` 依赖，与本需求无关。
- 原始日志：`/tmp/report-web-print-settings-baseline.log`。
- `tests/print-page-runtime.test.cjs` 依赖未安装的 jsdom；不擅自引入新依赖，优先运行已有可执行的 Node 测试及新增的无 DOM 测试。

## 实施与验收进展

- 接口代理完成两个服务函数及 7 项服务测试；页面代理完成菜单、保存/恢复操作、设计态 ID 兼容、标识组件及测试。
- 主代理第一轮复测：相关测试 90/90；架构测试 208 项、207 通过，仍只有基线的产品配置测试失败。
- 生产构建 `NODE_OPTIONS=--max-old-space-size=4096 ./node_modules/.bin/max build` 通过。
- 旧 sheet 请求提前清 loading 与缺配置时弹窗回写问题均已修复，真实重叠请求测试已补齐，独立审查确认关闭。
- 标识字段接入前的最终验证：相关测试 99/99；架构测试 217 项、216 通过，唯一失败仍为基线；修复后生产构建再次通过。
- 用户提供 `userConfigFlag` 截图后的标识接入已完成，继续使用 `glm-5.3-flash`；当前 sheet 为字符串/数字 1 时显示，切换 sheet 及恢复重载后按字段更新。
- 标识接入后的主代理最终复测：相关测试 102/102；架构测试 220 项、219 通过，唯一失败仍为基线的产品配置测试；生产构建通过，`git diff --check` 无误。
- 已新增真实表达式及组件渲染测试，覆盖字符串/数字 1、0、缺失、boolean true 等值、切换 sheet、字段透传和恢复后标识隐藏。
- 使用独立 agent-browser 浏览器及本地临时 mock 服务验证了真实 NGToolBar 下拉菜单、未打开弹窗直接保存、保存/恢复提示、修改横向与缩放比例后保存并刷新回显、恢复模板默认参数；标识默认不显示。
- 浏览器验证使用本地 mock，不代表真实后端服务联调完成；字段追加前已验证主流程，字段追加后通过单元/行为测试与生产构建验证。未修改仓库 mock 或引入测试依赖。
- 用户随后要求先在所有打印预览中显示标识以确认视觉效果；当前 `PrintManager/preview/index.tsx` 的临时开关 `FORCE_SHOW_APPLIED_SETTING_BADGE = true` 覆盖显隐，仅改展示、不改接口字段。视觉确认后设为 false 恢复按 userConfigFlag 控制。对应预览测试 34/34 通过。
- 全部业务代码保留在当前工作区，未提交 commit；真实后端合并/回显逻辑仍需联调确认。
