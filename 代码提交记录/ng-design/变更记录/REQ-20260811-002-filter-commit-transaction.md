---
tags:
  - ng-design
  - requirement
  - report-table
status: synced-to-release
date: 2026-08-11
updated: 2026-08-13
source: C:\Users\jinxu\workspace\obsidian\xzd\版本管理\work-items\report-table-functional-sync-refactor\issues\04-收拢筛选提交事务.md
---

# Centralize Filter Commit Transaction

Related: [[../../xzd/版本管理/work-items/report-table-functional-sync-refactor/issues/04-收拢筛选提交事务]]

## Request

Centralize filter confirmation and reset behind a package-internal adapter so callers no longer orchestrate loading, calculation, reload/tree rebuild, preview visibility, render, and loading completion. Preserve existing vertical and horizontal results and the public package API.

## Requirement Commits

| Commit | Branch | Date | Purpose | Validation |
| --- | --- | --- | --- | --- |
| `49447f45df2d973253e2d6785898353f64aac5cb` | `sync_branch` | 2026-08-11 | Add `commitFilter`, migrate the existing render entry to a default adapter, and defer loader-owned loading completion until after visibility and render. | 62 tests passed; TypeScript check passed; package build passed; `git diff --check` passed. |
| `cf25ed10629c97e678b8561c575d6474ede97dd0` | `sync_branch` | 2026-08-11 | Exercise the production render entry for row/column confirmation and reset after the two-axis review identified an adapter-only test gap. | 62 tests passed; TypeScript check passed; final Standards and Spec reviews reported 0 findings. |
| `c605a56aaece040be28a0f0f701b8d99ebade8f2` | `ljx-7.0` | 2026-08-13 | Local synchronized equivalent of the filter commit transaction and production-entry coverage. | 62/62 focused tests passed; runtime package build passed; standard declaration build blocked by dependency typings. |

## Related Bug Fixes

None recorded.

## Branch Matrix

| Branch | Status | Commit |
| --- | --- | --- |
| `sync_branch` | 验证中 | `cf25ed10629c97e678b8561c575d6474ede97dd0` |
| `ljx-7.0` | 已同步 | `c605a56aaece040be28a0f0f701b8d99ebade8f2` |

## Validation

- `node --test packages/@newgrand/udp-report-table/tests/feature-sync.test.cjs packages/@newgrand/udp-report-table/tests/udp-report-table-boundaries.test.cjs packages/@newgrand/udp-report-table/tests/migration-parity.test.cjs packages/@newgrand/udp-report-table/tests/print-design-payload.test.cjs`
- `npx tsc -p packages/@newgrand/udp-report-table/tsconfig.check.json --noEmit`
- `npx lerna run build --scope @newgrand/udp-report-table`
- `git diff --check`

## Synchronization Result

- The minimal dependency chain was synchronized locally to `ljx-7.0`; the target branch contains the source change through the final fast-forward SHA above.
- Focused regression suite: 62/62 passed.
- Runtime-only Father build completed for `@newgrand/udp-report-table`; the standard declaration build remains blocked by the worktree's unbuilt `@newgrand/udp-ui`/`udp-core` type dependencies.
- `origin/ljx-7.0` was not pushed.
