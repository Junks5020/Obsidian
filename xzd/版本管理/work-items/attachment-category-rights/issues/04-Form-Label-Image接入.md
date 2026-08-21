---
tags:
  - ng-design
  - work-item
status: done
date: 2026-08-14
updated: 2026-08-14
---

# 04 — Form、Label、Image 接入

Parent: [[work-items/attachment-category-rights/spec]]

**What to build:** 将 formAttachment、NGLabelAttachment、ImageAttachmentShow 和图片上传模式接入统一分类映射、三态按钮和 handler 防线；与 03 并行。

**Blocked by:** [[work-items/attachment-category-rights/issues/01-权限核心与纯函数测试]] · [[work-items/attachment-category-rights/issues/02-初始化与公共API]]

## Scope

Label/Image 已审批单据下的只读、不可新增结果必须来自 bill 块原值，不另加前端审批推导。

- formAttachment 审批前 tab 和无 tab 形态使用 attach/pendingApprovedAttach 的 bill 块；审批后 tab 使用 approvedAttach 块。controlByType 时前三类按当前 typeId 取块。
- NGLabelAttachment 和 ImageAttachmentShow 固定使用 attach 的 bill 块；仅当 bill 块原值 add=0 时不可新增，不另加 approved 推导，既有记录按后端权限和 canDeleteApprovedAttachment 保护处理。
- list/tags/image 的 add、delete、view、download 及备注、分类、共享配置分别读取 add/delete/view/download/edit；preview 逐值继承 view。
- UploadImage 的既有文件在 view=0 时保留记录但不可查看，view=2 隐藏入口；不得把未授权文件伪装成 uploading，也不得请求缩略图或预览 URL。
- visible 只保留字段，不控制 form 区域、tab、列表、弹窗、图片 URL 或请求；初始化 pending/failed 必须清理旧附件和旧权限。
- 临时会话新增撤销使用 canDeleteTemporaryAttachments；Label 单条删除使用 canDeleteApprovedAttachment 额外收紧，二者都不改写 delete。
- Form/Label/Image 的新增链同样写入当前会话 provenance；reload、换单据或外部 asrFlag=0 没有 provenance 时不得撤销。

## Checklist

- [ ] 补齐 formAttachment 各 tab、list/tags 和 image 模式的分类上下文及 typeId。
- [ ] 清理 form、label、image 中以 visible return null、权限状态或 URL 门控内容的旧分支。
- [ ] 为 Label、Image 和 UploadImage 的按钮、缩略图、大图、删除及上传事件增加 handler 二次检查。
- [ ] 透传共享下载链的 onBeforeDownLoad，不重复实现授权；普通下载和 ZIP 的同步/异步 veto 都必须阻止服务请求。
- [ ] 确认审批前/后 tab 显隐仍由 approved 和数据条件决定，不由 visible 或前端审批推导改写按钮值。
- [ ] 让取消/关闭不执行 handleValid，确认/保存执行最终必填校验；弹窗确认使用 getPermissionContext。
- [ ] 修复权限重载和初始化异常下的 stale list、stale modal 和旧错误。

## Acceptance

- formAttachment 审批前、审批后和无 tab 形态各自读取正确块；Label/Image 始终读取 bill 块。
- 0/1/2 在按钮 DOM、disabled、事件和服务调用上保持三态；2 隐藏，0 置灰并拒绝，1 可执行。
- view=0/2 不请求图片资源或预览内容；download=0/2 不请求下载信息或写日志；未授权操作不启动轮询。
- 已审批单据的 Label/Image 不新增；Label 删除只在 delete=1 且审批保护满足时执行，临时附件撤销不依赖 delete=1。
- 只有 bill 块原值 add=0 时 Label/Image 不新增；Label 删除只在 delete=1 且审批保护满足时执行，临时附件撤销不依赖 delete=1，外部仅 asrFlag=0 不可撤销。
- visible 改变不会卸载区域、改变 tab、阻断列表或图片请求；初始化失败只提示一次并拒绝确认。

## Implementation (2026-08-14)

- formAttachment：`sessionContext` 统一快照（tab 分类 + typeId + approved + 分类树 + provenance），
  AttachList/AttachTags 单条操作按记录 typeId 逐条判权；删除入口按 `resolveRowDeleteStatus` 呈现；
  outRef 暴露 `getPermissionContext`；初始化/换单清空 provenance；本地新增成功写 provenance。
- AttachmentToolbar：附件弹窗入口不再读取 visible（存在任一交互能力即显示）；上传受 disabled 锁定并写 provenance。
- UploadImage：预览 URL 只为本会话有 view 权限的记录请求；未授权记录保留卡片但不伪装成 uploading；
  预览/删除 handler 逐记录复核，删除支持会话临时撤销并透传 selectedAttachments/provenance。
- NGLabelAttachment：固定 attach bill 块（显式 attachType + approved）；删除按“会话临时撤销 or delete=1
  且审批保护”执行，UI 与 handler 同一条件；新增成功写 provenance，重载清空。
- ImageAttachmentShow：显式 attach 分类上下文。
- 验证：tsx 纯函数回归 39 例通过；`tsc --noEmit` 附件目录无类型错误（仓库其余文件错误为既有基线）。

相关：[[work-items/attachment-category-rights/issues/02-初始化与公共API]] · [[work-items/attachment-category-rights/issues/03-Table与共享链接入]] · [[work-items/attachment-category-rights/issues/05-React18组件回归测试]]
