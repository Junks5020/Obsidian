---
schema_version: 1
id: "BUG-20260728-092150-sync-none"
type: bug
title: "修复树状报表首行初次渲染不出来收缩节点问题 -sync none"
repo: "report-web"
repo_root: "C:\\Users\\jinxu\\workspace\\xzd\\report-web"
base_branch: "6.5.1-dev"
base_commit: "65c37de4f975c87b9c6dc2654a1ae0fbe5baf8b2"
task_branch: "bug/20260728-092150-sync-none"
task_head: "ea10defc2e6b308be2ee2ee793e00fbe08e1b944"
active_operation: ""
worktree_path: "C:\\Users\\jinxu\\workspace\\xzd\\report-web.worktrees\\bug-20260728-092150-sync-none"
status: merged
created_at: "2026-07-28T01:21:51.025Z"
updated_at: "2026-07-28T03:48:12.463Z"
finished_at: "2026-07-28T03:23:10.757Z"
merged_at: "2026-07-28T03:22:16.323Z"
merge_commit: "817141b09c88f92f92b11ef05b5043ab6a46d8ff"
model_profile: auto
sync:
  - branch: "6.5.2-dev"
    status: conflict
    updated_at: "2026-07-28T03:48:12.463Z"
    note: "error: could not apply ea10defc... fix: 修复树状报表首行折叠节点首次渲染\nhint: After resolving the conflicts, mark them with\nhint: \"git add/rm <pathspec>\", then run\nhint: \"git cherry-pick --continue\".\nhint: You can instead skip this commit with \"git cherry-pick --skip\".\nhint: To abort and get back to the state before \"git cherry-pick\",\nhint: run \"git cherry-pick --abort\".\nhint: Disable this message with \"git config set advice.mergeConflict false\""
---

# 修复树状报表首行初次渲染不出来收缩节点问题 -sync none

> [!info] Worktree 任务
> **bug** · `bug/20260728-092150-sync-none` ← `6.5.1-dev` · **merged**

## 描述

暂无补充描述。



## 路径

- 主仓库：`C:\Users\jinxu\workspace\xzd\report-web`
- Worktree：`C:\Users\jinxu\workspace\xzd\report-web.worktrees\bug-20260728-092150-sync-none`

## 检查清单

- [x] 已完成代码修改
- [x] 已合并到基础分支
- [x] 已清理任务 worktree

## 分支同步

| 目标分支 | 状态 | 更新时间 | Commit | 说明 |
|---|---|---|---|---|
| 6.5.2-dev | conflict | 2026-07-28T03:48:12.463Z |  | error: could not apply ea10defc... fix: 修复树状报表首行折叠节点首次渲染
hint: After resolving the conflicts, mark them with
hint: "git add/rm <pathspec>", then run
hint: "git cherry-pick --continue".
hint: You can instead skip this commit with "git cherry-pick --skip".
hint: To abort and get back to the state before "git cherry-pick",
hint: run "git cherry-pick --abort".
hint: Disable this message with "git config set advice.mergeConflict false" |

## AI 执行记录

| 时间 | 阶段 | 档位 | 模型 | Run ID |
|---|---|---|---|---|
| 2026-07-28T01:22:01.945Z | scout | light | fucheers/gpt-5.6-luna | d1cf3c58-d2da-4d6c-86e8-7bc7772f57a4 |

## 时间线

- 2026-07-28T01:21:51.025Z — **created**：Created from 6.5.1-dev
- 2026-07-28T01:22:01.945Z — **model-run**：scout → fucheers/gpt-5.6-luna (d1cf3c58-d2da-4d6c-86e8-7bc7772f57a4)
- 2026-07-28T03:22:16.323Z — **base-merged**：817141b09c88f92f92b11ef05b5043ab6a46d8ff into 6.5.1-dev
- 2026-07-28T03:23:10.757Z — **cleanup-completed**
- 2026-07-28T03:48:12.463Z — **sync-conflict**：6.5.2-dev
