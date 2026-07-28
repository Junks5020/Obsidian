## Review

- **Blocker：无。**

- **Correct（React 18 生命周期安全）：**  
  `src/components/report/preview/plugins/utils.ts:74-83` 将 `flushSync` 放入 `queueMicrotask` 回调，而不是直接在触发 Handsontable 初始化的 React effect 调用栈内执行。微任务会在当前 effect/React 调用栈返回后运行，同时仍处于浏览器下一次 paint 前，符合本次修复的生命周期要求。当前 diff 中也没有恢复 `hot.render()`。

- **Correct（仅处理必要的首次 row 0 root）：**  
  `src/components/report/preview/plugins/treeRender/index.tsx:36,68-75` 只有在 `optimizeRender` 实际创建新 root 且逻辑行号为 `0` 时才启用延迟同步提交。已有 root、非第 0 行仍走普通 `root.render`，避免把每次 Handsontable renderer 调用都变成 `flushSync`。性能影响因此局限于首次创建的 row 0 React roots；冻结区/overlay 可能有少量独立 TD/root，但不会每次重绘都同步提交。

- **Correct（聚合最新 JSX，避免陈旧 props）：**  
  `src/components/report/preview/plugins/utils.ts:62-72` 以 React root 为键保存 pending render；同一微任务前再次渲染只覆盖 `content`，不再排新微任务。`tests/tree-preview-first-render.test.ts:61-68` 使用新的 `latestCellProperties` 再次调用真实 tree renderer，并确认最终 DOM 为 `latest root`，有效覆盖了最新 JSX 提交，而非仅依赖同一 props 对象被原地修改。

- **Correct（root 回收与 Handsontable TD 复用）：**  
  `src/components/report/preview/plugins/treeRender/index.tsx:68-75` 捕获 root 身份，并在提交前检查 `TD[rootKey] === root`。TD 被复用到其他坐标时，`src/components/report/preview/plugins/utils.ts:39-46` 会通过 `releaseCellReactRoots(TD, newKey)` 回收旧坐标 root；`src/components/report/preview/plugins/cellRootLifecycle.ts:11-17` 同时删除旧属性，因此旧微任务的身份检查会失败并跳过提交。切换成非 React renderer 或表格销毁也会经过同样的删除流程。未发现向已回收 root 调用 `render` 的路径。

- **Correct（测试对旧实现有回归辨识力）：**  
  `tests/tree-preview-first-render.test.ts:64-68` 在一个微任务后就要求真实 React DOM 和折叠图标存在。使用当前安装的 React 18.3.1 单独验证旧式 `createRoot(...); root.render(...); await Promise.resolve()` 路径时，DOM 仍为空；当前新增测试则通过。因此测试不是只检查 renderer 被调用，而能捕获旧异步提交路径在下一 paint 前未完成的问题。

- **Note / Low（测试覆盖残余）：**  
  新测试直接调用 renderer，未从真实 React `useEffect` 中触发，因此不会主动捕获“将来有人把 `flushSync` 移回 effect 调用栈”产生的 React 警告；也没有构造 TD 坐标切换/表格销毁发生在微任务前的场景来直接断言旧 root 不提交。当前生产 guard 经静态调用链验证正确，但建议后续为这两项各补一个回归断言。位置：`tests/tree-preview-first-render.test.ts:60-78`。

- **Note / Low（格式检查失败）：**  
  `npx prettier --check` 对三个任务文件均报格式问题。可观察的文本差异包括 `src/components/report/preview/plugins/utils.ts:1-5` 的 `Root`/`createRoot` import 顺序，以及 `tests/tree-preview-first-render.test.ts:1-2` 的 import 顺序；两个生产文件还保留 CRLF。不会影响运行正确性，但最终提交前应运行项目约定的 Prettier。

- **Note（验证环境）：**  
  生产文件 ESLint 通过；完整 `tsc --noEmit` 因大量既有第三方声明和既有源码类型错误失败，输出未指向本次新增生产逻辑。测试文件本身不在 `tsconfig.json` 的 include 范围内，这是仓库现有 `tests/*.ts` 的统一模式。

- **Correct（范围）：**  
  `src/components/report/preview/tableSheets/index.tsx` 与 `src/components/report/preview/plugins/cellRootLifecycle.ts` 当前均无任务 diff；按要求忽略了 `package-lock.json`、`ngproxy.ini` 和 `.pi-subagents`。未修改任何文件。