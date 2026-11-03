---
tags:
  - ng-design
  - report-table
  - bug
status: committed-partially-verified
date: 2026-10-24
updated: 2026-10-24
---

# 中间单元格输入后，右侧值直到离格才同步

## 2026-10-24 提交确认

推送更新：用户随后授权推送，已创建远端 `origin/ljx-7.0` 并推送至 `a863d07776b7ed81a8322d625188368a9243d284`。通过 git ls-remote 核验远端哈希与本地一致，未强推，未发包或部署；下面的“未推送”为推送前状态。

- 仓库 `ng-design`，实际分支 `ljx-7.0`，工作树目录为 `ng-design.worktrees/sync_branch`。
- 本地提交：`a863d07776b7ed81a8322d625188368a9243d284`，`fix(report-table): 修复设计器加载、拖拽和属性同步`。包含本记录的实时输入草稿和初始化 cellMeta 空值修复，以及同批空设计、loading 与拖拽修复。
- 提交前组件库全量 342/342、宿主回归 73/73，ESM/CJS 与类型声明构建通过；pre-commit lint-staged/Prettier 通过。实际页面打开及 loading 时序通过；完整中文输入法与全部编辑流程的浏览器验收仍保留。
- 仅提交组件库 21 个文件，ngproxy.ini 未提交；未推送、发包或同步其他分支。属于独立缺陷修复，未新增关联需求。

| 分支 | 提交 | 状态 |
| --- | --- | --- |
| ljx-7.0 | a863d07776b7ed81a8322d625188368a9243d284 | 验证中 |
| sync_branch / ljx-6.5.2 / 6.5.2 / ljx-6.5.1 / 6.5.1 | 未审计 | 待关联 |

其他分支同步尚未获用户指示。以下保留修复与验证过程，其未提交描述为历史状态。

相关：[[00-版本总览]] · [[report-table-同步术语表]] · [[report-table-ADR-0006-第一阶段采用最小兼容API集]] · [[../../../代码提交记录/ng-design/变更记录/BUG-20261020-001-cell-property-selection-writeback]] · [[变更记录/BUG-20261023-002-print-empty-design-preview]]

## 现场与准确复现

用户使用 `start:local` 的 `udp-report-table` 源码，反馈在设计页面中间单元格输入时，右侧值不跟随，点击别处后才更新。

- `CustomEditor` 原来只覆盖原生 TextEditor 的样式、快捷键与尺寸，没有发布输入草稿。
- `CustomPlugin.onAfterSeletion()` 在选区通知里带上已提交的 cellMeta；右侧属性面板依赖该通知回填表单。
- 真实 HOT 编辑器的 TEXTAREA 里已有新值，但输入期间通知数为 0，属性表单 props 仍是旧值。这排除了“表单已收到新值、仅 DOM 更新延迟”的解释。
- 反向从右侧表单输入，通过既有直接 onValuesChange 回调可立即更新原单元格；这与 10-20 的跨单元格串改问题方向不同。

红测命令（修复前）：

```bash
node --test packages/@newgrand/udp-report-table/tests/cell-editor-value-sync.test.cjs
```

首次 3 项中 1 项失败、2 项通过；失败断言为“未失焦前右侧应显示输入草稿”，期望 `输入中的内容`、实际 `原内容`。定向探针同时显示 `notifications:[]`、propertyModel 为旧值而 editor 为新值。临时探针已移除。

## 本地实现

- 新增内部 `editorDraft.ts`：草稿存放在 WeakMap，绑定 HOT 实例、模板 ID、table/print 类型、工作表、坐标及会话 token；旧快照、旧会话和其他实例不能覆盖当前草稿。
- `CustomEditor` 通过独立 `cellEditorDraft` 通道发布 input / compositionend，不伪造选区变化，不逐字调用 setDataAtCell、修改元数据或写持久 store。保留原生提交、取消、快捷键与撤销行为。
- `rightCellProperties` 只对当前所属文本单元格覆盖展示用的 cellData.value，其余元数据和原回写回调保持不变。
- 已提交值通过 HOT afterChange 刷新，包括撤销/重做与异步校验；关闭编辑器只清理草稿，不假定 close 代表提交已完成。
- 原生校验拒绝后会重新选择同一格；此时保留仍有效的草稿，不错误恢复旧值。改变单元格、工作表、模板、业务类型、只读权限后，旧草稿失效。
- 监听按编辑器生命周期管理；HOT 销毁移除输入监听，面板卸载解除观察者订阅及原生 afterChange hook。

## 修改范围

工作树：`C:/Users/jinxu/workspace/xzd/ng-design.worktrees/sync_branch`

组件目录：`packages/@newgrand/udp-report-table/`

- 新增 `src/design/TableDesign/components/customTable/utils/editorDraft.ts`
- `src/design/TableDesign/components/customTable/plugins/textEditor/index.tsx`
- `src/design/TableDesign/components/cusToolbar/rightCellProperties/index.tsx`
- `src/design/TableDesign/consts.tsx`
- 新增 `tests/cell-editor-value-sync.test.cjs`

未修改 CellFormMain 中 10-20 已修复的直接、所属单元格绑定回调。未触碰其他会话的宿主预览、PDF、依赖与代理修改，也未回退此前打印空详情或拖拽修复。

## 验证与边界

- 使用真实 Handsontable Core、CustomEditor、CustomPlugin、选区通知、textRender 元数据逻辑、CellProperties 和 CellFormMain。替换布局测量、浏览器缺失的 observer API、无关展示组件及普通 NGForm 适配层。
- 阅读实际 NGForm 与 TextArea 源码：value 回填走 form.setFieldsValue，直接 onValuesChange 来自用户输入路径。另用真实 Ant Design Form / Input.TextArea 执行与 NGForm 相同的回填 API，确认草稿回填/取消均未触发 onValuesChange，也未写入 HOT。
- **完整 NGForm HOC 与实际浏览器/输入法引擎未验收**；组合输入测试发送实际 DOM composition/input 事件，不能等同于真实中文输入法验收。
- 专项 **23/23**：逐字输入、0、清空、多行粘贴、组合输入、焦点不丢失、无额外元数据/持久更新、Enter/Escape、撤销/重做、提交去空白、异步校验通过/拒绝、连续会话、迟到事件、所有者切换、其他实例、监听清理、隐藏属性保留、原格绑定异步回写。
- 组件库全量 **337/337**；report-web `npm run test:architecture` **73/73**。
- 本次文件 Prettier 与组件库 `git diff --check` 通过。
- 宿主全局 `git diff --check` 仅因既有 `ngproxy.ini:19` 行尾空白未通过；该文件未由本次修改，不做顺手清理。
- `npm run build --workspace @newgrand/udp-report-table` 通过，337 文件含声明输出，约 59 秒。

日志：

- `C:/Users/jinxu/AppData/Local/Temp/report-table-cell-editor-final-suite.log`
- `C:/Users/jinxu/AppData/Local/Temp/report-table-cell-editor-build.log`

## 待真实页面确认

先保护未保存内容，再确认页面加载新源码：双击文本格连续输入，右侧应实时跟随且不抢焦点；Escape 恢复原值；Enter 后为提交值；取消或切换后旧内容不得串到其他格。

当前为本地源码交付。未自动保存、提交、推送、发包、部署、重启服务或关闭远端缺陷；前面的拖拽文字选区问题仍需独立浏览器验收。

## 2026-10-24 页面启动崩溃跟进

- 8472 实际加载 sync_branch 本地源码。补正链接中 design 与 AppTitle 之间缺失的 `?` 后，仍复现 `Cannot read properties of undefined (reading 'cellType')`，堆栈指向 CellProperties。
- `CustomTable.notifyInitCellCoords()` 的初始化通知仅含 row、col、cellHeader、cellData，没有 cellMeta；新增 displayedCellMeta 逻辑直接读取 cellMeta.cellType，引发渲染崩溃。改为 `selectedCoords.cellMeta?.cellType`，保持已有初始化通知协议。
- 新增真实 CellProperties/Handsontable 回归：发布缺少 cellMeta 的初始通知，验证面板保留、重新选格及编辑草稿同步。修复前同样 TypeError，修复后专项 24/24 通过。
- 浏览器重新加载报表 `3080000000000003`，确认详情 loading 消失、20 行网格及属性面板正常渲染；没有点击保存。仅证明本次启动故障恢复，完整中文输入法与全部编辑操作的真实浏览器验收边界仍保留。
- 未创建提交、同步分支、发包或部署；未修改其他既有工作区内容。本次为原本地修复的后续补丁，不建立新的提交覆盖状态。
