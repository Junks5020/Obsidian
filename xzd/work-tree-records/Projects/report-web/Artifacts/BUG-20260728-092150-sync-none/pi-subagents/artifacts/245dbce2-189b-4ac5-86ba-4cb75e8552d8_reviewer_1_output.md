## Review

- **Blocker：无。**
- **Medium：无。**

- **Correct：`optimizeRender()` 返回 boolean 不影响其他调用者。**  
  `src/components/report/preview/plugins/utils.ts:39-46` 仅把原来的 `undefined` 返回改成新建 root 时 `true`、复用时 `false`。唯一消费该返回值的是 `src/components/report/preview/plugins/treeRender/index.tsx:36,73`。其他调用者仍只执行调用而不读取结果，例如 `src/components/report/preview/plugins/chartRender/index.tsx:30` 及 print/image、print/toImage 的 chart/slash renderer，因此未发现行为回归。

- **Correct：只对逻辑 `row === 0` 的新 root 延迟后 `flushSync`，范围与问题吻合。**  
  `src/components/report/preview/plugins/treeRender/index.tsx:27-36` 先将合并单元格坐标归一到 merge parent，再以 `isNewRoot && row === 0` 决定是否同步提交（`:68-75`）。因此：
  - 合并单元格使用父单元格的逻辑 row；
  - 冻结区域仍可创建各自的 DOM root，row 0 新 root 同样会提交；
  - 非 row 0、已有 root 的更新继续使用原有 `root.render()` 路径；
  - 滚动复用 TD 时，旧 root 会由 `releaseCellReactRoots()` 清除。  
  未发现该条件会扩大到普通滚动更新或破坏冻结/合并行为。

- **Correct：`deferredRootRenders` 状态机未发现丢失最新更新或向正常回收后的 root render。**  
  `src/components/report/preview/plugins/utils.ts:62-72` 在首个 pending 存在时覆盖 `content`，故同一微任务前的多次 render 会保留最新 JSX；`:77-83` 读取后删除 pending，再进行一次提交。TD 被滚动复用或清理时，`src/components/report/preview/plugins/cellRootLifecycle.ts:11-17` 会 unmount 并删除旧 key，而 `src/components/report/preview/plugins/treeRender/index.tsx:68-75` 的闭包检查会因此返回 false，跳过旧 root。中间状态会按设计合并，但最新状态不会丢失。

- **Correct：新增真实 renderer 测试当前可稳定通过，且异步失败会设置非零退出码。**  
  `tests/tree-preview-first-render.test.ts:61-68` 连续调用两次 renderer，再等待已排队的微任务，验证 row 0 DOM、折叠图标及最新 props；`:70-71` 在成功路径 unmount/关闭 jsdom；`:75-78` 捕获异步断言错误并设置 `process.exitCode = 1`。实际执行测试通过。

- **Note（测试隔离）：当前 monkeypatch 对“独立脚本执行”可靠，但不适合直接并入共享进程测试 runner。**  
  `tests/tree-preview-first-render.test.ts:20-37` 成功 require 后会恢复 `Module._load`，但没有用 `try/finally`；`.less` hook 与 `globalThis` 上的 jsdom globals 也没有恢复。`:70-71` 的 root/jsdom cleanup 只在断言成功时运行。当前仓库测试是逐文件 `tsx` 脚本，因此不会污染其他测试进程；若以后改成同进程聚合运行，应补齐 finally cleanup。

- **Note（覆盖残余风险）：未直接测试 microtask 前 root 回收及冻结/合并/滚动组合。**  
  生产代码的 key identity guard 能覆盖这些路径，但 `tests/tree-preview-first-render.test.ts:39-68` 只使用单一普通 TD。现有 merge virtualization 与 root lifecycle 单测均通过，不过没有把这些行为与 deferred render 放在同一集成场景验证。

- **Note（格式）：Prettier check 未通过。**  
  `tests/tree-preview-first-render.test.ts:1-2` 的 import 顺序会被项目 Prettier 配置调整；两个生产文件的 CRLF 也与 `.editorconfig:4-10` 的 LF 要求不符。此项不影响功能，ESLint 和 `git diff --check` 均通过。

- **Note（测试依赖）：** `tests/tree-preview-first-render.test.ts:2` 直接导入 `jsdom`，但 `package.json` 未直接声明该依赖；当前安装树可以解析并成功运行，但未来依赖提升布局变化时存在轻微可复现性风险。