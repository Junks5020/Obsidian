---
tags:
  - ng-design
  - ADR
status: accepted
date: 2026-08-13
---

# ADR-0001：现代附件权限按分类块透传并忽略兼容字段

附件初始化接口现在按附件分类返回全部权限块（billAttach\*/approvedAttach\*/sourceAttach\*/workflowAttach\*，按类型控制时含 per-type 块），同时保留 `unifyButtonRights`/`typeButtonRights` 作为旧版本前端的兼容字段。现代附件决定：按当前附件分类选择对应权限块，权限数值 0/1/2（置灰/可用/隐藏）原样透传，完全不读兼容字段，分类块缺失时 fail-closed 拒绝。

选择忽略兼容字段而非兜底，是因为兼容字段承载的不是当前分类的权限：后端示例中 `unifyButtonRights` 全 1，而已审批单据的 `billAttachButtonRights` 变动权限全 0，兜底会直接绕过后端表达的权限收敛。代价是新前端不再兼容旧版后端响应（无分类块即整体拒绝），`ljx-6.5.2` 分支只配套新版后端。

前端此前用来模拟分类差异的硬编码推导（审批保护、工作流/来源强制隐藏等）一并删除，按钮呈现差异（置灰或隐藏）完全由后端返回的数值决定。仅保留依赖纯前端状态、后端无法表达的推导：分类树未选类型禁上传、`canDeleteTemporaryAttachments`、`canDeleteApprovedAttachment`。

相关：[[ng-design-附件术语表]] · [[work-items/attachment-category-rights/spec]] · [[00-版本总览]]
