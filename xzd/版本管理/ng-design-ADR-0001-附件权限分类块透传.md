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

临时附件删除不再通过把归一化后的 `delete` 从 0/2 改成 1 来实现，而是建模为独立的 `canRemoveTemporaryAttachments` 派生能力：当前分类 `add=1`、选择非空且全部为 `asrFlag=0` 时允许撤销本次上传；选择中出现已保存附件后立即恢复后端 `delete` 的原始语义。这样保留误上传撤销能力，同时保持分类权限值可原样审计。

`visible` 是分类内容的结构性开关而非普通按钮权限：只有 1 显示当前分类内容，0 或 2 都隐藏当前分类的 toolbar、列表及交互区，但保留 tab 导航且不自动切换。按钮字段仍分别遵循 0 置灰、1 可用、2 隐藏。

权限初始化使用显式 `pending` / `ready` / `failed` 三态。进入 pending 时立即撤销上一轮权限和内容；接口成功即进入 ready，当前分类块缺失只触发该分类 fail-closed，不等同于初始化失败；网络异常、接口非成功或响应不可解析才进入 failed，并整体不渲染现代附件区域。初始化 service 因此必须保留成功与失败信息，不能继续将所有结果压成空对象。

权限判断使用统一的“权限分类上下文”快照：组件在当前 tab、类型选择和相关前端状态变化时维护上下文，并让呈现层与所有操作 handler 使用同一份上下文。弹窗确认链从组件 API 读取当前快照后再调用 `handleValid` / `handleSave`，避免审批后 tab、按类型分类或独立工作流弹窗在执行时回退到默认单据权限。

附件 handlers 同时通过 `getTableAttachmentApi()`、组件 ref 和 `openAttachment()` 返回对象对外公开，因此本轮保留现有位置参数及顺序，只在末尾追加可选的权限上下文；已有对象参数的 handler 直接增加该字段。内部实现使用具名 options 对象，公开方法作为兼容适配层，并用精确函数类型替换宽泛的 `Function`。这避免内部继续通过多个 `undefined` 错位传参，也不让已有外部 JavaScript 调用静默失效。

旧公开回调 `onBeforeDownLoad` 保留运行时兼容，但重新界定为后端授权通过后的“下载前业务校验”：仅当当前分类的 `download` / `zipDownload` 为 1 时调用；回调可取消本次下载并返回业务提示，但不能放行后端已拒绝的操作，也不参与权限归一化。这样既不把业务回调当作授权来源，又避免现有业务校验在升级后静默失效。

旧的前端授权覆盖入口 `btn`、`permission`、`downloadAttachment` 及 URL `btn*` 参数不再参与现代附件运行时权限判断，不能放宽或收紧分类权限块返回的 0/1/2；本轮仅保留公开声明并标记为 deprecated。`disabled`、`status` 等组件交互状态不属于这组权限覆盖参数，另按各自语义处理。

相关：[[ng-design-附件术语表]] · [[work-items/attachment-category-rights/spec]] · [[00-版本总览]]
