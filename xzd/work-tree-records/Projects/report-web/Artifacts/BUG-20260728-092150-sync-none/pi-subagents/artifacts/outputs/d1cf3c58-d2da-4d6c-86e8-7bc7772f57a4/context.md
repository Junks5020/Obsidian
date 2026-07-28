# Code Context

## Files Retrieved
1. `src/components/report/preview/tableSheets/utils.ts` (lines 130-217) - 预览报表加载入口；清空/配置 Handsontable、调用 `initializeTreeRows`，并在 `suspendRender()` 后 `resumeRender()`。
2. `src/components/report/preview/plugins/treeRender/utils.ts` (lines 1-325) - 树索引、默认折叠状态、隐藏行同步、单击切换及 cell meta 同步的核心实现。
3. `src/components/report/preview/plugins/treeRender/index.tsx` (lines 16-101) - Handsontable tree renderer 与 React `TreeComponent`；折叠图标由 `children` 和 `expanded` meta 决定。
4. `src/components/report/preview/plugins/utils.ts` (lines 36-65) - React cell root 创建/复用及合并单元格 meta 解析，影响首次渲染时 cell props 是否真正进入 DOM。
5. `src/components/report/preview/plugins/cellRootLifecycle.ts` (lines 1-37) - `root-row_col` React root 的回收策略；最近性能优化后 renderer 会复用已有 root。
6. `src/components/report/preview/tableSheets/index.tsx` (lines 92-133) - `sheets`/`userLayouts` 变化触发数据加载，并选择当前 sheet 交给 `handleLoadGlobalSettings`。
7. `src/components/report/preview/table/index.tsx` (lines 183-219, 360-378) - HotTable ref 与预览表格挂载/休眠恢复；`renderAllRows=false`，首次可见行由 Handsontable viewport 决定。
8. `src/components/report/preview/utils/treeShowLevel.ts` (lines 19-71) - 老接口缺少 `treeRows/treeConfig` 时从设计 schema 补回 `showLevel`。
9. `tests/tree-preview-collapse.test.ts` (lines 1-171) - 树索引、默认折叠、跨列隔离、切换、legacy/fallback 数据的单元回归测试。
10. `tests/tree-preview-schema-level.test.ts` (lines 1-94) - schema 层级回填及 `showLevel=0` 行为测试。
11. `package.json` (lines 1-14) - 可用脚本只有 dev/build/eslint/prettier；没有 npm test 脚本。

## Key Code

### 首次加载与树状态时序
```ts
// src/components/report/preview/tableSheets/utils.ts:184-217
hotInstance?.suspendRender();
hotInstance?.loadData([[]]);
hotInstance?.updateSettings({ cell: normalizedCells });
hotInstance?.updateSettings({ mergeCells: createVirtualizedMergeCellsSettings(mergeCells) });
if (hotInstance) {
  initializeTreeRows(hotInstance, globalSettings?.treeRows ?? [], normalizedCells ?? []);
}
hotInstance?.resumeRender();
```

`initializeTreeRows` 在 `src/components/report/preview/plugins/treeRender/utils.ts:295-306` 中：
- 将 `globalSettings.treeRows` 与 `cellType === 'tree'` 的 cells 合并；
- `buildTreeIndex` 推导 parent/children；
- `createInitialCollapsedNodeKeys` 根据 `showLevel` 把边界节点加入 collapsed set；
- 通过 hiddenRows plugin 应用目标隐藏行；
- `syncTreeCellMeta` 写入 `children` 和 `expanded`；
- 不主动调用 `hot.render()`，依赖调用方解除 `suspendRender()` 后的 Handsontable render。

### 折叠图标依赖
```tsx
// src/components/report/preview/plugins/treeRender/index.tsx:82-99
const { row, col, children, treeLevel = 1, formatData, expanded = false } = cellProperties;
...
{children?.length > 0 ? (
  <span className={`icon ${expanded ? 'icon-expanded' : 'icon-collapsed'}`} />
) : null}
```

因此首行收缩节点“没有出来”时，至少需要检查首次 render 是否拿到了 `children`/`expanded` 更新后的 cellProperties，而不仅是 hiddenRows 是否已正确设置。

### React root 复用风险点
```ts
// src/components/report/preview/plugins/utils.ts:36-43
export function optimizeRender(TD, row, col, _lazyRender?: boolean) {
  const rootKey = getCellRootKey(row, col);
  releaseCellReactRoots(TD, rootKey);
  if (TD[rootKey]) return;
  empty(TD);
  TD[rootKey] = createRoot(TD);
}
```

`treeRender` 在 `src/components/report/preview/plugins/treeRender/index.tsx:34-35,67-69` 调用 `optimizeRender` 后仍执行 `TD[rootKey].render(...)`，所以单看代码不能断定 root 复用一定阻止 props 更新；但该优化改变了首次/重复渲染的生命周期，且 `renderAllRows=false` 下首行可能在 `initializeTreeRows` 之前已建立 root，值得以浏览器复现和 renderer 级测试验证。

## Architecture

`pages/TableManager/preview` 将接口返回的 sheets 放入 DVA 状态；必要时 `applySchemaTreeShowLevels`（`src/components/report/preview/utils/treeShowLevel.ts:49-71`）在接口返回阶段补上层级。`PreviewTableSheets` 监听 sheets/defaultSheet，调用 `handleLoadGlobalSettings`。后者在一次渲染挂起窗口内重置数据、设置 cell/merge，再调用树状态初始化并恢复渲染。

Handsontable 将 tree cell 交给 `treeRender`；renderer 通过 `getRenderCellProperties` 处理合并格，再用 React root 显示 `TreeComponent`。点击图标进入 `toggleTreeNode`（utils.ts:308-325），它更新 collapsed set、hiddenRows、cell meta 后显式 `hot.render()`。因此问题路径集中在“首次 `resumeRender` 后的 renderer/React root 是否重跑”，而不是点击切换路径；现有测试只覆盖纯函数及 fake Hot 实例，没有真实 Handsontable viewport/React DOM 首次渲染。

## Review Findings

- **高风险（待确认，最贴近 BUG）**：`handleLoadGlobalSettings` 先通过 `updateSettings({ cell })` 建立/触发首屏渲染，之后才由 `initializeTreeRows` 写入 `children`/`expanded`，最后只 `resumeRender()`。在 `renderAllRows=false` 与 React root 复用共同作用下，首行已有 root 时可能出现 DOM 图标仍按旧 props 或首行不重绘。重点核对 `src/components/report/preview/tableSheets/utils.ts:184-217`、`src/components/report/preview/plugins/utils.ts:36-43`、`src/components/report/preview/plugins/treeRender/index.tsx:34-69`。
- **中风险**：当前单元测试在 `initializeTreeRows` 中使用 fake Hot，没有验证 `resumeRender()` 后是否实际触发一次 renderer，也没有检查首行 DOM 是否存在 `.icon-collapsed/.icon-expanded`。新增回归测试应覆盖 row=0 的 tree cell、`showLevel=1/2`、首次加载而非点击后切换。
- **低风险/范围约束**：树隐藏行以 row number 为 key（`utils.ts:236-269`），跨列树仅通过 node key 隔离；同一 row 的另一列树若被折叠，仍会隐藏整行，这是现有模型行为，修复首行渲染时不要误改为按列隐藏。
- **已有实现正确性**：`createInitialCollapsedNodeKeys`（utils.ts:195-233）已将 showLevel 解释为包括根节点的可见层级；现有 collapse/schema 测试通过，不建议把本 BUG 与层级语义重新解释混在一起。

## Likely Change Surface

首选从 `src/components/report/preview/tableSheets/utils.ts:212-217` 与 `src/components/report/preview/plugins/utils.ts:36-43` 开始：确认初始化 meta 写入后是否需要一次受控的 `hot.render()`、或需要让 tree renderer 在 meta 变化时强制重新 render/重建 root。任何修复都应保持点击 `toggleTreeNode` 的显式 render 语义，并避免破坏 `cellRootLifecycle` 的清理。

可能需要新增/更新 `tests/tree-preview-collapse.test.ts`，但该测试若只使用当前 fake Hot 无法捕获真实首行 React DOM 问题；至少应增加可观察的 `resumeRender`/renderer callback 顺序断言，最好补浏览器集成验证。

## Validation Commands

- `npm exec -- tsx tests/tree-preview-collapse.test.ts` - **passed**，输出 `tree preview collapse tests passed`。
- `npm exec -- tsx tests/tree-preview-schema-level.test.ts` - **passed**，输出 `tree preview schema level tests passed`。
- `git status --short` - 仅显示运行产物目录 `.pi-subagents/`，没有源文件修改。
- 未运行 `npm run build`/`npm run eslint`：当前任务是只读侦察，且工作区未发现已安装的 `node_modules`；构建仍应由实施代理在修改后执行。

## Start Here

先打开 `src/components/report/preview/tableSheets/utils.ts:184-217`，再对照 `src/components/report/preview/plugins/utils.ts:36-43` 和 `src/components/report/preview/plugins/treeRender/index.tsx:34-69`，用真实首屏 render 顺序确认 row 0 的 React root 是否在树 meta 同步前建立且未按新 props 重绘。

## Residual Risks

- 没有真实接口 payload、浏览器录屏或 DOM 复现，当前“root/首屏时序”是高可信调查方向而非已证实根因。
- `renderAllRows=false`、合并格、冻结区、休眠恢复均可能改变首行 renderer 调用次数；修复后应分别验证普通首行、冻结首行、合并 tree cell 以及切换 sheet。
- 直接在加载函数末尾强制 render 可能带来性能回退或与 `suspendRender/resumeRender` 重复渲染，需在实现时测量调用次数。

## Acceptance Evidence

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "已给出具体文件路径、行范围、调用链、风险等级及验证命令结果。"
    }
  ],
  "changedFiles": [],
  "testsAddedOrUpdated": [],
  "commandsRun": [
    {
      "command": "npm exec -- tsx tests/tree-preview-collapse.test.ts",
      "result": "passed",
      "summary": "tree preview collapse tests passed"
    },
    {
      "command": "npm exec -- tsx tests/tree-preview-schema-level.test.ts",
      "result": "passed",
      "summary": "tree preview schema level tests passed"
    },
    {
      "command": "git status --short",
      "result": "passed",
      "summary": "无源文件修改，仅有侦察输出目录"
    }
  ],
  "validationOutput": [
    "现有树折叠及 schema 层级单元测试均通过。"
  ],
  "residualRisks": [
    "未在真实浏览器/Handsontable DOM 中复现首行初次渲染问题。",
    "首次 render 与 React root 复用的时序仍需实施代理用回归测试确认。"
  ],
  "noStagedFiles": true,
  "diffSummary": "只读侦察；未修改源代码或测试。",
  "reviewFindings": [
    "high: src/components/report/preview/tableSheets/utils.ts:184-217 - tree meta 在挂起渲染期间写入，首屏 renderer 是否在 meta 同步前建立需确认。",
    "medium: src/components/report/preview/plugins/utils.ts:36-43 - React cell root 复用改变首次 renderer 生命周期，可能与首行未重绘相关。",
    "medium: tests/tree-preview-collapse.test.ts:99-129 - 仅验证 fake Hot 状态，未验证首次真实 DOM 图标。"
  ],
  "manualNotes": "实施时优先增加 row=0 首屏 renderer/DOM 回归证据；不要混淆 showLevel 语义修复与本次首行渲染问题。"
}
```
