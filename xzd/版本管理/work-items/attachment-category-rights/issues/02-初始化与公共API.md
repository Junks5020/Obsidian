---
tags:
  - ng-design
  - work-item
status: done
date: 2026-08-14
updated: 2026-08-14
---

# 02 — 初始化与公共 API

Parent: [[work-items/attachment-category-rights/spec]]

**What to build:** 把权限初始化、上下文快照和公开 handler 统一到同一条 API 链，避免空权限、旧状态泄漏或弹窗确认时丢失分类/typeId。

**Blocked by:** [[work-items/attachment-category-rights/issues/01-权限核心与纯函数测试]]

## Scope

- service 返回结构化 pending/ready/failed 结果；网络异常、非成功响应或不可解析响应进入 failed，分类块缺失只在 ready 下 fail-closed。
- 每次 pending 先清理上一轮权限、附件列表、错误和操作状态；failed 整体不渲染现代附件区域，组件层只提示一次错误，优先后端文本，否则使用“附件初始化失败”。
- 组件维护并暴露 getPermissionContext()，上下文包含 attachType、isWorkFlow、controlByType、当前 typeId 和三类独立前端状态。UI、handler、弹窗确认链共享同一快照。
- 为 getTableAttachmentApi、组件 ref、openAttachment、openViewImage 和弹窗回调补齐分类上下文；旧位置参数保留，仅在尾部追加可选 context，内部使用具名 options 与精确类型。
- baseApi/openAttachment 负责透传 onBeforeDownLoad 的有效类型和结果归一化；回调只在 download/zipDownload=1 且其他授权通过后执行，支持同步/异步 { state, message? }，不得由回调放行权限。
- handleValid 只做最终附件集合必填校验；handleSave 只提交经授权的待提交变更。两者不把 add/imp/edit/delete 任一字段当作通用开关，disabled 只锁定变更和保存。
- onBeforeDownLoad 保留为授权后的同步/异步业务 veto；普通下载与 ZIP 都执行。btn、permission、downloadAttachment、URL btn* 仅保留 deprecated 声明且不参与判断；disabled 和 onBeforeDownLoad 不是 deprecated。
- 删除所有以 visible 阻断初始化、列表、workflow/original 请求或 openViewImage 的门控；visible 只留类型字段。

## Checklist

- [x] 覆盖 tableAttachInit、labelAttachInit、来源和工作流初始化的 pending/ready/failed 状态。
- [x] 确认切换单据、tab、类型和重试时不会显示上一轮列表、权限或错误。
- [x] 让 handleValid/handleSave、handleDelete、handleEdit、handleShare、handleDownload、handleZip 等公开入口在缺上下文时走默认 attach，在显式非法上下文时拒绝。
- [x] 让 openAttachment 的 control/status 默认值不覆盖当前上下文；审批后 tab 和独立工作流弹窗确认链不得回退到单据块。
- [x] 确保未授权查看/下载在 API 层也不请求资源、下载信息或写日志。
- [x] 在 baseApi、openAttachment 和下载 handler 间保留 onBeforeDownLoad；普通下载和 ZIP 都覆盖回调拒绝、异步完成和 message 透传路径。
- [x] 编译检查所有公共 API 改动，并记录旧调用的兼容适配。

## Acceptance

- 初始化成功、空响应、异常响应、重试和切换对象都有状态断言；failed 时 handleValid 拒绝确认且只产生一次提示。
- 组件、handler 和弹窗读取相同快照；controlByType/typeId 不会在确认链中丢失。
- visible=0/1 不改变区域渲染、列表加载、预览 URL 或请求发送。
- 旧公开位置参数仍可调用；精确类型不使用宽泛 Function；无分类默认 attach，非法分类 fail-closed 并告警。
- onBeforeDownLoad 只在后端下载授权通过后触发，返回拒绝时不发下载请求；下载拒绝不触发该回调。

相关：[[work-items/attachment-category-rights/issues/01-权限核心与纯函数测试]] · [[work-items/attachment-category-rights/issues/03-Table与共享链接入]] · [[work-items/attachment-category-rights/issues/04-Form-Label-Image接入]]
