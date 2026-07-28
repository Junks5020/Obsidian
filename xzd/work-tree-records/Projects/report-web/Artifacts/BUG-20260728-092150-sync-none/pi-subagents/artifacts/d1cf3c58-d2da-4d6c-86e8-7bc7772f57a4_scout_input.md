# Task for scout

Task BUG-20260728-092150-sync-none: 修复树状报表首行初次渲染不出来收缩节点问题 -sync none
Type: bug
Base branch: 6.5.1-dev
Task branch: bug/20260728-092150-sync-none
Worktree: C:\Users\jinxu\workspace\xzd\report-web.worktrees\bug-20260728-092150-sync-none
Operate only inside this task worktree. The parent owns orchestration.

Inspect the repository and map relevant files, symbols, call paths, tests, risks, and likely validation commands. Do not modify files.

Your response must end with exactly one actionable final line in Chinese using this format: 下一步：/wt-run BUG-20260728-092150-sync-none plan。

---
**Output:**
Write your findings to exactly this path: C:\Users\jinxu\workspace\xzd\report-web.worktrees\bug-20260728-092150-sync-none\.pi-subagents\artifacts\outputs\d1cf3c58-d2da-4d6c-86e8-7bc7772f57a4\context.md
This path is authoritative for this run.
Ignore any other output filename or output path mentioned elsewhere, including output destinations in the base agent prompt, system prompt, or task instructions.

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