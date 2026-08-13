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

权限判断使用统一的“权限分类上下文”快照：组件在当前 tab、类型选择和相关前端状态变化时维护上下文，并让呈现层与所有操作 handler 使用同一份上下文。弹窗确认链从组件 API 读取当前快照后再调用 `handleValid` / `handleSave`，避免审批后 tab、按类型分类或独立工作流弹窗在执行时回退到默认单据权限。handler 的新增/调整参数采用具名上下文对象，避免位置参数中连续传入 `undefined` 导致分类错位。

旧公开回调 `onBeforeDownLoad` 保留运行时兼容，但重新界定为后端授权通过后的“下载前业务校验”：仅当当前分类的 `download` / `zipDownload` 为 1 时调用；回调可取消本次下载并返回业务提示，但不能放行后端已拒绝的操作，也不参与权限归一化。这样既不把业务回调当作授权来源，又避免现有业务校验在升级后静默失效。

旧的前端授权覆盖入口 `btn`、`permission`、`downloadAttachment` 及 URL `btn*` 参数不再参与现代附件运行时权限判断，不能放宽或收紧分类权限块返回的 0/1/2；本轮仅保留公开声明并标记为 deprecated。`disabled`、`status` 等组件交互状态不属于这组权限覆盖参数，另按各自语义处理。

相关：[[ng-design-附件术语表]] · [[work-items/attachment-category-rights/spec]] · [[00-版本总览]]
