---
tags:
  - ng-design
  - requirement
  - report-table
status: synced-to-release
date: 2026-08-11
updated: 2026-08-13
source: C:\Users\jinxu\workspace\obsidian\xzd\版本管理\work-items\report-table-functional-sync-refactor\issues\06-收口与双基线验收.md
---

# Complete Functional-Sync Refactor Acceptance

Related: [[../../xzd/版本管理/work-items/report-table-functional-sync-refactor/issues/06-收口与双基线验收]]

## Request

Complete dual-baseline acceptance for the report-tree topology and filter commit transaction, remove remaining duplicate tree-fact interpretation, preserve the fixed upstream and 7.0 behavior baselines, and close the functional-sync refactor without expanding the public API.

## Requirement Commits

| Commit | Branch | Date | Purpose | Validation |
| --- | --- | --- | --- | --- |
| `e26cc97377c560dc30ea87777cdf227aad2c444e` | `sync_branch` | 2026-08-11 | Move explicit last-child interpretation from the renderer into the immutable `TreeTopology` snapshot and synchronize the existing `isLast` cell meta through the adapter. | 62 tests passed; TypeScript check passed; package build passed; Prettier and `git diff --check` passed. |
| `0126108e64b2da65c295d5c9a6e1013f1ca9db3d` | `sync_branch` | 2026-08-11 | Preserve fixed-upstream connector rendering by deriving `isLastChild` only from response-proven parent metadata; cover configured-only and response-proven cases. | 62 tests passed; TypeScript check passed; package build passed; final Standards and Spec reviews reported 0 findings. |
| `27aa2a43cb89d0e3880bb709ee05229998db0298` | `ljx-7.0` | 2026-08-13 | Local synchronized acceptance tip, including the 7.0-specific `physicalRows` removal-hook compatibility fix. | 62/62 focused tests passed; runtime package build passed; Standards and Spec reviews reported 0 findings. |

## Related Bug Fixes

None recorded.

## Branch Matrix

| Branch | Status | Commit |
| --- | --- | --- |
| `sync_branch` | 验证中 | `0126108e64b2da65c295d5c9a6e1013f1ca9db3d` |
| `ljx-7.0` | 已同步 | `27aa2a43cb89d0e3880bb709ee05229998db0298` |

## Validation

- `node --test packages/@newgrand/udp-report-table/tests/feature-sync.test.cjs packages/@newgrand/udp-report-table/tests/udp-report-table-boundaries.test.cjs packages/@newgrand/udp-report-table/tests/migration-parity.test.cjs packages/@newgrand/udp-report-table/tests/print-design-payload.test.cjs`
- `npx tsc -p packages/@newgrand/udp-report-table/tsconfig.check.json --noEmit`
- `npx lerna run build --scope @newgrand/udp-report-table`
- `npx prettier --check` for all changed source and test files
- `git diff --check`

## Synchronization Result

- The minimal dependency chain was synchronized locally to `ljx-7.0`; the target branch contains the source change through the final fast-forward SHA above.
- Focused regression suite: 62/62 passed.
- Runtime-only Father build completed for `@newgrand/udp-report-table`; the standard declaration build remains blocked by the worktree's unbuilt `@newgrand/udp-ui`/`udp-core` type dependencies.
- Standards and Spec reviews: 0 findings.
- `origin/ljx-7.0` was not pushed.
