# Task for reviewer

[Read from: C:\Users\jinxu\workspace\xzd\report-web.worktrees\bug-20260728-092150-sync-none\src\components\report\preview\plugins\utils.ts, C:\Users\jinxu\workspace\xzd\report-web.worktrees\bug-20260728-092150-sync-none\src\components\report\preview\plugins\treeRender\index.tsx, C:\Users\jinxu\workspace\xzd\report-web.worktrees\bug-20260728-092150-sync-none\src\components\report\preview\plugins\cellRootLifecycle.ts, C:\Users\jinxu\workspace\xzd\report-web.worktrees\bug-20260728-092150-sync-none\tests\tree-preview-first-render.test.ts, C:\Users\jinxu\workspace\xzd\report-web.worktrees\bug-20260728-092150-sync-none\src\components\report\preview\tableSheets\index.tsx]

只读审查当前最终任务 diff（忽略 package-lock.json、ngproxy.ini、.pi-subagents）。BUG：树状报表 row 0 首次渲染缺失折叠图标。先前 hot.render 方案已撤回。当前方案：tree renderer 对 row 0 新建 React root 时，把最新 JSX 聚合到 microtask，再在 React useEffect 生命周期外 flushSync，确保下一次 paint 前提交；root 被回收则跳过。新增 jsdom 真实 renderer 测试。请重点验证 React 18 生命周期安全、微任务/flushSync 正确性、陈旧 props/root 回收、Handsontable TD 复用、性能、测试能否在旧代码失败。不要改文件，按严重性给行号证据。

## Acceptance Contract
Acceptance level: attested
Completion is not accepted from prose alone. End with a structured acceptance report.

Criteria:
- criterion-1: Return concrete findings with file paths and severity when applicable

Required evidence: review-findings, residual-risks

Finish with a fenced JSON block tagged `acceptance-report` in this shape:
Use empty arrays when no items apply; array fields contain strings unless object entries are shown.
`criteriaSatisfied[].status` must be exactly one of: satisfied, not-satisfied, not-applicable.
`commandsRun[].result` must be exactly one of: passed, failed, not-run.
`manualNotes` and `notes` are optional strings; an empty string means no note and does not satisfy `manual-notes` evidence.
```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "specific proof"
    }
  ],
  "changedFiles": [
    "src/file.ts"
  ],
  "testsAddedOrUpdated": [
    "test/file.test.ts"
  ],
  "commandsRun": [
    {
      "command": "command",
      "result": "passed",
      "summary": "short result"
    }
  ],
  "validationOutput": [
    "validation output or concise summary"
  ],
  "residualRisks": [
    "none"
  ],
  "noStagedFiles": true,
  "diffSummary": "short description of the diff",
  "reviewFindings": [
    "blocker: file.ts:12 - issue found, or no blockers"
  ],
  "manualNotes": "anything else the parent should know"
}
```