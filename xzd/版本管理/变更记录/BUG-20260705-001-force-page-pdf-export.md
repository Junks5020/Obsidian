---
id: BUG-20260705-001
type: bug
status: recorded
commit: c4089f92038e274d7f679c22321157c565d6fb91
source_branch: 6.5.1-dev
source_date: 2026-07-05
target_versions: [6.5.1-dev, 6.5.1]
tags: [version-change, bug, report-web]
---

# BUG-20260705-001：强制分页合并后 PDF 导出

## 修复内容

- 处理不存在 DOM 元素时的行高计算、打印配置深度合并及过滤配置保存。

## Git 信息

- 来源提交：`c4089f92038e274d7f679c22321157c565d6fb91`
- 目标提交：`7c6d88e3da4c0f4868585b16a7c025d2e94cd93c`

## 版本同步

| 版本名称 | 当前状态 | 合入 Commit | 证据 |
| --- | --- | --- | --- |
| 6.5.1-dev | 已同步 | `c4089f92` | 来源分支历史 |
| 6.5.1 | 已同步 | `7c6d88e3` | 严格补丁等价 |
