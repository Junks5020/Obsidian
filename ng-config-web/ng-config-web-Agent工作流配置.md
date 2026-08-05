---
tags:
  - ng-config-web
  - agent-workflow
status: active
date: 2026-08-05
updated: 2026-08-05
---

# ng-config-web Agent 工作流配置

相关：[[00-ng-config-web索引]]

## Issue tracker

Issues and PRDs live as GitLab issues in:

`gitlab.newgrand.com/newgrand.techcenter/map/platform-pc-web/ng-config-web`

Use the `glab` CLI for all operations. Infer the repository from `git remote -v`.

### Conventions

- Create: `glab issue create --title "..." --description "..."`
- Read: `glab issue view <number> --comments`
- List: `glab issue list -F json`
- Comment: `glab issue note <number> --message "..."`
- Label: `glab issue update <number> --label "..."` or `--unlabel "..."`
- Close: post an explanatory note, then run `glab issue close <number>`
- Merge requests: use `glab mr create`, `glab mr view`, `glab mr note`, and related commands

### Merge requests as a triage surface

**MRs as a request surface: no.**

### Skill operations

When a skill says "publish to the issue tracker", create a GitLab issue.

When a skill says "fetch the relevant ticket", run `glab issue view <number> --comments`.

### Wayfinding operations

- Map: an issue labelled `wayfinder:map`
- Child: an issue beginning with `Part of #<map>` and labelled `wayfinder:<type>`
- Blocking: post `/blocked_by #<n>` as a note
- Blocking fallback: add `Blocked by: #<n>` to the description
- Claim: `glab issue update <n> --assignee @me`
- Resolve: add the answer as a note, close the issue, then update the map

## Triage labels

| Canonical role | Tracker label | Meaning |
| --- | --- | --- |
| `needs-triage` | `needs-triage` | Maintainer must evaluate the issue |
| `needs-info` | `needs-info` | Waiting for information from the reporter |
| `ready-for-agent` | `ready-for-agent` | Fully specified and ready for an agent |
| `ready-for-human` | `ready-for-human` | Requires human implementation |
| `wontfix` | `wontfix` | Will not be actioned |

When a skill mentions a triage role, use its corresponding tracker label.

## Domain docs

This project uses a single-context domain model. Obsidian is canonical.

Before exploring:

1. Read [[00-ng-config-web索引]].
2. Read `ng-config-web-术语表.md` when it exists.
3. Read related `ng-config-web-ADR-NNNN-主题.md` notes when they exist.

Use glossary terms in issues, proposals, hypotheses, tests, and explanations. Surface conflicts with an ADR instead of silently overriding it.

Domain notes are created lazily. Do not create repository copies such as `CONTEXT.md`, `CONTEXT-MAP.md`, `docs/adr/`, `docs/agents/`, `.scratch/*.md`, or `.out-of-scope/*.md`. If the vault is unavailable or ambiguous, stop and report the blocker.
