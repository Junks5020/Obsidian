---
tags:
  - ng-design
  - requirement
  - report-table
status: synced-to-release
date: 2026-08-11
updated: 2026-08-13
source: C:\Users\jinxu\workspace\obsidian\xzd\版本管理\work-items\report-table-functional-sync-refactor\issues\03-树筛选范围复用统一拓扑.md
---

# Reuse Tree Topology For Filter Ranges

Related: [[../../xzd/版本管理/work-items/report-table-functional-sync-refactor/issues/03-树筛选范围复用统一拓扑]]

## Request

Make tree filter-range normalization and intersection checks consume the package-internal immutable `TreeTopology`, while preserving the existing filter key, merge-cell validation, warnings, and public package API.

## Requirement Commits

| Commit | Branch | Date | Purpose | Validation |
| --- | --- | --- | --- | --- |
| `47da1af043283a72b0f3dd52bbd80bb4be324cd7` | `sync_branch` | 2026-08-11 | Delegate tree intersection, parent-child range expansion, and response-data proof to `TreeTopology`; add regression and boundary coverage. | 60 tests passed; TypeScript check passed; package build passed; `git diff --check` passed. |
| `f3cc9466258ba5965b430fe664d66e653b878bf6` | `ljx-7.0` | 2026-08-13 | Local synchronized equivalent of the tree filter-range refactor. | 62/62 focused tests passed; runtime package build passed; standard declaration build blocked by dependency typings. |

## Related Bug Fixes

None recorded.

## Branch Matrix

| Branch | Status | Commit |
| --- | --- | --- |
| `sync_branch` | 验证中 | `47da1af043283a72b0f3dd52bbd80bb4be324cd7` |
| `ljx-7.0` | 已同步 | `f3cc9466258ba5965b430fe664d66e653b878bf6` |

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
