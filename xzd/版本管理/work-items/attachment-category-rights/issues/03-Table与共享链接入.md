---
tags:
  - ng-design
  - work-item
status: done
date: 2026-08-14
updated: 2026-08-14
---

# 03 — Table 与共享链接入

Parent: [[work-items/attachment-category-rights/spec]]

**What to build:** 将 Table、Toolbar 及共享的上传、导入、编辑、下载和删除链路接入统一权限上下文；这是 04 的并行工作包。

**Blocked by:** [[work-items/attachment-category-rights/issues/01-权限核心与纯函数测试]] · [[work-items/attachment-category-rights/issues/02-初始化与公共API]]

## Scope

归档若有后端 allowAttachArchive 数据条件只与 edit 组合，不新增前端权限推导。

- 覆盖 NGTableAttachment、Toolbar、Upload、AppUploadModal、ShareModal、RemarkModal、DownloadRecordModal 及 baseApi 中由 Table 使用的 handler。
- Table tab 和独立来源/工作流入口传入正确 attachType、isWorkFlow、controlByType、typeId；全部类型聚合展示所有元数据，单条和批量按记录类型判权。
- add 只管理本地文件选择、拖拽、粘贴、图片和移动端上传；imp 只管理历史/共享导入；共享方式和共享给修改读取 edit。
- Table 会话负责维护稳定附件标识到 add/imp 来源的 provenance：本地上传和共享导入成功时写入，重载/换单据时清除，并把该标记传给撤销/混合删除 handler；仅有外部 asrFlag=0 的记录不得撤销。
- edit 控制备注、排序、归档、标签、分类和共享配置；view 控制预览、缩略图、大图、customOpenTab 和下载记录；download 控制单文件、批量、预览页下载和非按类型 ZIP。
- delete 只删除既有附件；混合选区逐条应用既有删除或会话新增撤销规则，全部通过后一次执行。Toolbar、行操作和 handler 都传入 selectedAttachments 等完整上下文。
- 只要 controlByType=true，ZIP 入口和 handler 永远隐藏/拒绝；不保留 workflow 特判，也不能从 download 权限重新打开。disabled 锁定变更和保存但不影响查看/下载。
- Table 的普通下载和 ZIP 链路负责透传 onBeforeDownLoad；在权限和本地约束通过后调用，支持同步/异步 { state, message? }，veto 时不发请求。
- 所有拒绝路径不发上传、导入、预览、下载、下载记录或轮询请求；visible 不得卸载整区或禁用任何请求。

## Checklist

- [ ] 重核 Toolbar 对 0/1/2 的 DOM、disabled 和点击行为，尤其 share=2、save 与 ZIP。
- [ ] 修正全部类型聚合下的逐记录 typeId 判权、缺 typeId 按 0 和多选 2 > 0 > 1 聚合。
- [ ] 把临时撤销来源和审批后 Label 保护所需的记录上下文传到批量 handler；禁止部分删除。
- [ ] 让 add/imp 的成功回调写入会话 provenance，换单据或重载清除；补充外部 asrFlag=0 不可撤销的防线。
- [ ] 补齐 edit/share/remark/archive/category 的 UI 与 API 双重防线。
- [ ] 保持下载记录由 view 控制，下载由 download 控制；未授权时不取 URL、不取日志。
- [ ] 检查 openAttachment、handleValid、handleSave 的当前快照传递。

## Acceptance

- 每个 Table 操作在按钮、事件和 API 三层对 0/1/2 一致；2 不在 DOM，0 在 DOM 但不可执行，1 可执行。
- controlByType 的全部类型和具体类型都不显示/调用 ZIP；切换类型后权限和请求使用新快照。
- 混合删除任一记录不通过时整体拒绝且无部分请求；本会话 add/imp 新增且 asrFlag=0 的记录可独立撤销，不提升 delete。
- view=0/2 不请求缩略图、预览 URL 或下载记录；download=0/2 不请求下载信息、不写日志、不触发下载前回调。
- 普通下载和 ZIP 均在授权通过后执行 onBeforeDownLoad；同步或异步拒绝都不发下载请求，并保留业务 message。
- disabled=true 阻止所有变更和保存，但不阻止已授权查看、预览和下载。

## Implementation (2026-08-14)

- NGTableAttachment：行级 `resolveRecordPermission` 判权（预览/备注/下载记录/归档/共享配置/行内操作列），
  `selectionPermission` 多选 2>0>1 聚合，删除键按 `resolveRowDeleteStatus`（会话临时附件按撤销能力呈现 1）。
- Toolbar：逐条复核删除/下载/控件编辑/预览，混合删除先 `canDeleteSelection` 整体判定；下载仅对实际发起的
  记录写下载记录（按 `handleDownload` 返回结果过滤）；ZIP 去掉工作流特判、由权限层 controlByType 强制 2；
  add/imp 成功回调写会话 provenance（本地上传、APP 扫码上传、共享导入三路），`getPermissionContext` 统一取快照。
- baseApi：`handleDelete` 混合选择逐条复核后一次执行；`handleDownload` 逐记录判权并返回是否实际发起；
  `handlePreview` 逐记录 view 判权；`handleEditCategory`/`handleChangeShareType` 逐记录 edit 复核 + disabled 锁。
- ShareModal：导入成功后比对刷新列表，把新出现的稳定标识记入 provenance（imp）。
- permission.ts：新增纯函数 `resolveRowDeleteStatus`（删除入口呈现用），回归测试追加 1 组用例。
- 验证：tsx 纯函数回归 39 例通过；`tsc --noEmit` 附件目录无类型错误（仓库其余文件错误为既有基线）。

相关：[[work-items/attachment-category-rights/issues/02-初始化与公共API]] · [[work-items/attachment-category-rights/issues/04-Form-Label-Image接入]] · [[work-items/attachment-category-rights/issues/05-React18组件回归测试]]
