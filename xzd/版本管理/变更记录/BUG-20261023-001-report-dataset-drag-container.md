---
tags:
  - report-web
  - report-table
  - bug
status: committed-partially-verified
date: 2026-10-23
updated: 2026-10-24
---

# 报表设计与打印设计左侧数据集无法拖入表格

## 2026-10-24 提交确认

推送更新：用户随后授权推送，已创建远端 `origin/ljx-7.0` 并推送至 `a863d07776b7ed81a8322d625188368a9243d284`。通过 git ls-remote 核验远端哈希与本地一致，未强推，未发包或部署；下面的“未推送”为推送前状态。

`ng-design:ljx-7.0` 已创建本地提交 `a863d07776b7ed81a8322d625188368a9243d284`（fix(report-table): 修复设计器加载、拖拽和属性同步），包含 helperContainer 修复、拖拽鼠标默认选区控制、设计器文字选择边界及树图标样式收窄。组件库全量 342/342、宿主 73/73、ESM/CJS 与声明构建、pre-commit 钩子通过。真实拖拽与样式验收边界仍按下文保留，不能以打开报表和 loading 验证代替。未推送、发包或同步其他分支；ngproxy.ini 保留未提交。未新增关联需求。

| 分支 | 提交 | 状态 |
| --- | --- | --- |
| ljx-7.0 | a863d07776b7ed81a8322d625188368a9243d284 | 验证中 |
| sync_branch / ljx-6.5.2 / 6.5.2 / ljx-6.5.1 / 6.5.1 | 未审计 | 待关联 |

其他分支同步尚未获用户指示。下文未提交描述保留为历史状态。

相关：[[report-web-术语表]] · [[report-table-ADR-0010-样式边界与自动加载]] · [[00-版本总览]]

## 来源与范围

- 研发平台只读查询：状态为“已打开”、责任人为当前用户，共 3 条。
- `B-261022-000055`：7.0【阻塞】报表设计-数据集字段无法拖动。
- 同批列表另有 `B-261022-000056`（默认 sheet 只有一个单元格）、`B-261022-000057`（顶部保存、预览按钮无反应）；本轮未对这两项进行本地复现或修复。
- 用户随后明确要求优先检查“报表设计和打印设计”的左侧数据集拖拽。
- 未修改远端缺陷、发表评论或保存线上报表；不记录登录凭据及会话 URL。

## 根因与本地修复

`report-web:ljx-7.0` 两个入口均消费 `DesignReportTable`：包模式使用 `@newgrand/udp-report-table@7.0.23`，用户实际使用的 `start:local` 则通过源码别名加载组件库。两种模式的共享 `dataSetList/dragWrapper` 均把 `SortableContainer.getContainer` 指向 `ensureUdpReportTableHost` 创建的独立浮层节点。真实 `react-sortable-hoc` 把拖拽起始事件监听安装到该节点，但左侧字段位于另一个 DOM 子树，鼠标事件不能冒泡到监听器。

仅将 `getContainer` 改为 `helperContainer`：事件容器恢复默认列表节点，镜像继续进入带命名空间的样式宿主。`es`、`lib` 同时修正，未修改目标单元格识别、实例订阅或 debounce。

交付文件（仓库相对路径）：

- `patches/@newgrand+udp-report-table+7.0.23.patch`
- `tests/dataset-drag-runtime.test.cjs`
- `package.json`：将新测试加入 `test:architecture`。

复用工作区原有、尚未提交的 `patch-package`/postinstall 配置；原有 PDF 修复、锁文件及 PDF 测试保持原样。初轮仅修复包模式；用户明确 `start:local` 后，再同步修复其实际消费的 `ng-design` 源码，见下节。

## 复现与验证

运行时测试使用实际组件包 wrapper、真实 `react-sortable-hoc` 的元素注册和鼠标监听，通过最小冒泡事件树执行 `mousedown → mousemove → mouseup`，不是直接调用 drop 回调。

- 修复前：`node --test tests/dataset-drag-runtime.test.cjs`，8 项中 6 失败、2 通过；字段/整数据集均未启动拖拽，两个构建格式表现一致。
- 修复后：9/9 通过，覆盖单字段写入、整数据集连同标题写入、镜像归属及移除、表格外松手无写入、只读禁拖、补丁离线反向及重新应用。
- 完整架构回归：`npm run test:architecture`，70/70 通过。
- Prettier、`git diff --check`、`git apply --reverse --check` 通过。
- 自动生成补丁时临时联网安装超时/中止，随后本地生成补丁；离线补丁应用测试通过，不依赖生成时的联网命令。

## start:local 源码模式补充修复

用户明确使用 `start:local` 后，读取 `report-web/src/.umi/appData.json`，生成配置中的 `@newgrand/udp-report-table$` 确认解析为：

`C:/Users/jinxu/workspace/xzd/ng-design.worktrees/sync_branch/packages/@newgrand/udp-report-table/src/index.tsx`

在该 `ng-design:ljx-7.0` 工作树内新增源码回归测试，直接转译本仓库 `.ts/.tsx`，不加载 report-web 已打补丁的 npm 构建：

- `packages/@newgrand/udp-report-table/tests/dataset-drag-runtime.test.cjs`
- 修复前：4 项中 3 失败、1 通过，同样失败在“左侧按下鼠标没有启动拖拽”。
- 仅修改 `packages/@newgrand/udp-report-table/src/design/components/dataSetList/dragWrapper/index.tsx:290`，`getContainer` → `helperContainer`。
- 修复后：4/4 通过；组件库全部 `tests/*.test.cjs` 共 265/265 通过。
- 再跑宿主 `npm run test:architecture`，70/70 通过；源码与测试 Prettier、`git diff --check` 通过。
- 保留原有 `ngproxy.ini` 改动，没有修改其他生产源码、构建产物或包版本。源码模式无需发包。

## 拖拽时浏览器默认选中文字的后续修复

用户反馈拖拽恢复后，鼠标移动会同时选中文字。起始回调此前忽略了真实 `react-sortable-hoc` 传入的第二个原始事件；库只对链接的 mousedown 取消默认行为，普通字段不会取消。

- 在同一源码 `dragWrapper/index.tsx` 中，`handleSortStart` 接收 `SortEvent`；仅当成功启动的事件为可取消的左键 `mousedown` 时执行 `preventDefault()`。
- 不添加全局禁选样式、不清空页面 Selection、不增加全局监听器，也不覆盖拖拽库的输入框/按钮默认保护。触摸事件默认行为不变。
- 源码回归测试扩展到 9 项：修复前 2 失败、7 通过，失败点均为字段/数据集启动事件 `defaultPrevented === false`；修复后 9/9 通过，并断言默认行为在同步 mousedown 返回前已取消。
- 负向验证：只读字段、输入框、普通文字、按钮和右键不取消默认行为；不可取消的起始事件仍能完成字段拖放。
- 组件库全量回归更新为 270/270 通过；Prettier、`git diff --check` 通过。
- 本次验证只证明事件默认行为契约；随后用户继续反馈并提供截图，确认浏览器原生 Selection 仍跨数据集、工具栏和表格出现。此前事件测试通过不能作为现象已解决的证据。
- 此阶段事件处理仅覆盖用户正在使用的 `start:local` 源码；没有扩展 npm 包补丁。

## 用户截图确认后的样式根因修复

用户提供 `orca-paste-1792726859209-fb1f5bff-de24-446d-8f6c-11ca764f6685.png`，确认是原生蓝色文字选区，不是克隆了错误祖先的拖拽浮层。

直接源码及实际 Less 编译证据：

- `src/design/index.tsx` 根节点为同一个元素上的 `className="udp-report-table designTable"`。
- `src/style.less` 在 `.udp-report-table { ... }` 内导入 `design/index.less`。
- 旧的 `.designTable { user-select:none }` 实际编译为 `.udp-report-table .designTable`，要求父子关系，不能命中该根节点。

最小修复：在 `packages/@newgrand/udp-report-table/src/design/index.less` 中，仅把禁选声明放入 `&.designTable`，编译为 `.udp-report-table.designTable`；提供 `user-select` 与 `-webkit-user-select`。搜索 input、textarea 及 contenteditable（true、plaintext-only、空属性）显式允许 `text`。旧 `padding:16px` 规则保持原选择器，不借此改变页面间距；不修改 body、不清空 Selection、不增加全局监听器。

新增 `packages/@newgrand/udp-report-table/tests/design-text-selection-style.test.cjs`：编译真实样式入口，从实际 JSX AST 提取根类名，再用 CSS 选择器引擎匹配相同节点，而非断言源码包含禁选字符串。

- 修复前 4 项中 2 失败、2 通过；日志明确显示旧编译选择器 `.udp-report-table .designTable`。
- 修复后 4/4，通过根节点匹配、编辑控件选择例外、预览/其他页面隔离和原有间距不变检查。
- 联同拖拽事件测试 13/13，组件库完整回归 274/274 通过；Prettier、`git diff --check` 通过。
- 本次 CSS 修复仍仅覆盖 `start:local` 源码，不扩展 npm 包补丁。
- 用户截图提供了修复前真实现象，但修复后尚无当前页面 computed style / Selection 的直接读数，实际效果仍待用户确认，不能称为浏览器验收通过。

## 当前页面只读诊断：源码修改尚未体现在运行页面

用户在实际页面执行只读诊断后回传：字段 `.dragItem`、文字子节点及根节点 `.udp-report-table.designTable.layout-flex-column.udp-layout` 的 computed `user-select` / `-webkit-user-select` 均为 `auto`；React fiber 查到的 `onSortStart.toString()` 不包含 `preventDefault`。

这表明当前页面尚未体现预期的样式/事件修改，不能再将源码测试通过作为页面修复完成。函数可能被包装，`toString()` 结果不能单独证明旧代码；应结合真实加载资源继续核验。

已只读核对 8472 端口 PID 18032 的进程链：实际运行目录为 `report-web.worktree/ljx-7.0`，父进程明确为 `cross-env LOCAL_REPORT_TABLE=1 npm run dev`，不是启动了其他工作树或包模式。Umi 生成 alias 仍指向上述组件库源码。

下一步按 `.umirc.local.ts` 已有说明，进行一次有界恢复：用户先处理未保存内容，在原终端停止服务；仅清理当前工作树 `node_modules/.cache/bundler-webpack`，重启 `npm run start:local`。暂不删除 `src/.umi`，不清浏览器存储、不强杀用户进程。编译成功后刷新并重跑同一诊断，预期根节点 computed `user-select:none`；还需真实拖动验收无新文本选区、字段落点和编辑器选字。

若恢复后仍不符，应检查页面实际加载的设计器异步 chunk URL/响应、完整回调及胜出 CSS 来源；不继续下载主包、扩大 alias 或增加猜测性补丁。本轮未修改交互代码、未执行缓存删除或重启，等待用户操作/授权。

## 数据集标题右侧额外方框加号：树图标样式污染

用户另提供 `orca-paste-1792734786901-865d1d92-179c-44cf-b049-a2b8fdc71ba6.png`，每个数据集标题右侧的四向拖拽图标上叠加了小方框加号。该现象独立于文字选区问题，不能用这张截图判定前一问题已解决。

根因直接证据：

- 标题把手仍为 `dragCollapse/index.tsx` 中既有的 `<i className="icon"><SortableIcon /></i>`；`DragOutlined` 的实际 SVG 只含四向箭头，源文件及 HEAD 均没有新增加号按钮。
- `src/preview/plugins/treeRender/style.less` 的通用 `.icon` 绘制白底、边框和 `::before/::after` 两条加号线；统一样式入口使其成为 `.udp-report-table .icon`，误命中同一报表根下的数据集拖拽把手。

修复仅收窄样式来源：`.icon`、`.icon-expanded`、`.icon-collapsed` 分别限定为 `.treeHeader .row-expand-icon > …`，保留所有 DOM 类名、四向箭头、`SortableElement`、collection/index、只读隐藏及原展开交互。不用强制隐藏伪元素来掩盖污染，不删除拖拽入口。

交付与验证：

- `packages/@newgrand/udp-report-table/src/preview/plugins/treeRender/style.less`
- 新增 `packages/@newgrand/udp-report-table/tests/dataset-drag-icon-style.test.cjs`，编译实际 Less 入口、匹配真实 DOM 形状，并考虑 CSS specificity / important / 源顺序，检查拖拽把手不绘制树的方框与伪元素、真实树加减号和旋转保留、通用 icon 与外部页面不受影响。
- 修复前 5 项中 2 失败、3 通过，明确检测到把手匹配树按钮边框和其他 icon 被污染；修复后 5/5 通过。
- 组件库全量回归 279/279、Prettier、`git diff --check` 通过。
- 仅修复 `start:local` 组件库源码，未扩展 npm 包补丁，未提交、部署或擅自重启服务。因前面已有运行页未体现源码的证据，仍需确认浏览器已加载新规则；视觉验收未完成。

## 验收边界与后续

- 用户已明确授权接管浏览器，但 Ego 当前无可接管工作区；桌面截图与目标窗口控件树不一致，已停止不可靠的 GUI 操作，未据此拖放或记录无关窗口内容。尚未在两个真实页面完成修复后浏览器拖放验收。
- 未运行整应用构建，未提交、推送、部署或关闭远端缺陷。
- npm 包补丁继续覆盖 `npm start` 的拖拽启动容器问题；用户使用的 `start:local` 已在上述实际源码路径修正容器、起始事件与禁选样式匹配缺陷。现有证据覆盖共享拖拽链路、事件契约和实际 CSS 编译/匹配，不替代两个完整业务页面的浏览器验收。
- 先点击空白处取消旧选区并重新拖拽；如需刷新或重启 `npm run start:local`，先处理未保存内容。本轮未擅自停止用户的开发服务。
- 预防措施：保留事件冒泡级运行时测试，区分事件监听容器与拖拽镜像容器，避免仅靠容器配置的字符串断言。
