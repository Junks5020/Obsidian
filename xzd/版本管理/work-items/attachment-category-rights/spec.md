---
tags:
  - ng-design
  - spec
  - work-item
status: done
date: 2026-08-14
updated: 2026-08-14
---

# 现代附件分类权限块透传与消费链改造

相关：[[ng-design-附件术语表]] · [[ng-design-ADR-0001-附件权限分类块透传]] · [[ng-design-ADR-0002-附件权限补丁限定源码目录]] · [[00-版本总览]]

## 目标与边界

本规格把现代附件组件从“兼容字段加前端推导”切换为“按附件分类选择后端权限块、原样透传、每个调用点使用同一上下文”。目标分支为 ljx-6.5.2，配套新版后端；共享理解确认后已按源码白名单完成单提交交付。

2026-08-14 已确认最终补丁采用严格路径白名单：只允许 `packages/@newgrand/udp-ui/src/businessComponent/attachment/**`。不得修改 `package.json` 或 `package-lock.json`，也不得提交 Jest 配置、测试文件、测试脚本、dumi mock、仓库内附件文档或任何其他目录。中间测试提交暴露的真实运行时缺陷修正仍保留，但必须落在该附件源码目录内。详见 [[ng-design-ADR-0002-附件权限补丁限定源码目录]]。

现代附件范围包括 Table、formAttachment（list/tags/image）、Label 和 Image 模式，以及工作流、来源单据和审批前后 tab。旧版 openOldAttachment 弹窗不在范围内。持久文档只存放在 Obsidian，本仓库不新增规格副本。

## 当前问题

初始化响应同时包含 billAttach*、approvedAttach*、sourceAttach*、workflowAttach* 以及按类型的 per-type 块，另有 unifyButtonRights/typeButtonRights 兼容字段。当前工作区的调用链仍存在以下风险：

- 归一化可能读取兼容字段或用审批、工作流、来源等规则改写后端值。
- visible 被当作区域显隐或资源请求门控；本契约只保留字段，不消费它。
- 按类型聚合态、ZIP、混合删除和弹窗确认链可能丢失分类或 typeId 上下文。
- 初始化失败可能被压成空权限，旧列表和旧操作状态泄漏到下一轮。
- 中间实现曾新增根测试入口、React 18 组件测试和 dumi mock；这些产物超出最终补丁白名单，不进入最终交付。

## 权限契约

### 分类选择

分类值由共享 AttachmentCategory 联合类型约束：

| attachType | 普通权限块 | controlByType=true 时 | 适用形态 |
| --- | --- | --- | --- |
| attach | billAttachButtonRights | billAttachTypeButtonRights[typeId] | 单据附件 |
| pendingApprovedAttach | billAttachButtonRights | billAttachTypeButtonRights[typeId] | 审批前附件 tab 或无 tab formAttachment |
| approvedAttach | approvedAttachButtonRights | approvedAttachTypeButtonRights[typeId] | 审批后附件 tab |
| oriBizAttach | sourceAttachButtonRights | 不按类型 | 来源单据附件 |
| workFlowAttach | workflowAttachButtonRights | 不按类型 | 工作流 tab 或独立工作流弹窗 |

isWorkFlow=true 始终选择 workFlowAttach；它优先于普通 tab 推断。NGLabelAttachment 和 ImageAttachmentShow 固定选择 attach，因此已审批单据下它们沿用单据块并保持只读、不可新增的业务结果。旧公开 handler 完全缺少 attachType 时兼容默认 attach；显式传入五类之外的值必须拒绝，开发环境告警，不能静默回退到 attach 权限。

controlByType 只作用于 attach、pendingApprovedAttach、approvedAttach。来源和工作流始终使用各自普通分类块，不读取 typeId。按类型控制且没有选中具体类型时进入全部类型聚合态：展示所有记录元数据；单条操作按记录 typeId 逐条取块，缺 typeId 或类型块按 0；多选按逐条规则整体判定。未选类型时前三类隐藏新增和导入入口并由 handler 拒绝，但不得把原始 add 或 imp 改写为 2。

### 数值和缺失

除 visible 外的每个按钮值保持后端原值：0 表示置灰并拒绝执行，1 表示可用，2 表示隐藏且拒绝执行。前端不把 0/2 互换，也不因审批、来源、工作流或 status 推导新值。

现代附件完全不读取 unifyButtonRights、typeButtonRights、btn、permission、downloadAttachment 和 URL btn* 参数。分类块缺失或选中类型块缺失不算初始化失败：ready 状态下仍展示记录元数据，所有受控操作按 0 禁用，UI 和 handler 都拒绝。初始化网络异常、非成功响应或不可解析响应才进入 failed。

visible 只定义为 0 或 1，含义是附件是否可见。字段保留在接口和类型声明中，但本轮完全不消费，不控制 tab、toolbar、列表、内容区、弹窗、缩略图、预览 URL、下载记录或任何操作授权。任何把 visible 缺失当不可见、把 visible=0/2 卸载组件或以 visible 阻断请求的旧规则都作废。

### 操作字段映射

- add：本地新增链，包括文件选择、拖拽、粘贴、图片选择和移动端上传。
- imp：导入历史或共享附件；共享方式和共享给的修改属于 edit。
- edit：已有附件及其元数据修改，包括备注、排序、归档、标签、分类和共享配置；editCategory 只是逐值别名。
- delete：删除既有附件；临时会话新增的撤销是独立能力，不提升 delete。
- view：读取内容，包括文件名预览、缩略图、大图、在线预览和 customOpenTab；preview 是逐值别名。下载记录查看也由 view 控制。
- download：单文件、所选批量、预览页下载和非按类型 ZIP；zipDownload 是逐值别名。
- handleSave：提交当前附件会话，不绑定任一按钮字段。只有存在经授权的待提交变更才请求保存；无变更按成功返回；disabled 时拒绝。
- handleValid：确认或保存前的最终附件集合必填校验，与按钮权限解耦；取消或直接关闭不执行。

未授权查看或下载不得请求资源、下载信息、预览 URL 或写下载日志。onBeforeDownLoad 保留为后端 download/zipDownload=1 且其他本地约束通过后的业务 veto；支持同步或异步返回 { state, message? }，void 继续，普通下载和 ZIP 都执行。它不能放行后端拒绝，也不参与权限归一化。

### 独立前端状态约束

仅保留以下三类不能由后端按钮块表达的推导；下载、下载记录、onBeforeDownLoad、disabled、handleSave 和 handleValid 的 evaluator 只是无副作用操作谓词，不得被实现成第四类权限覆盖：

1. canAddToSelectedType / canImportToSelectedType：前三类存在分类树但未选具体类型时为假；来源和工作流不受影响。UI 隐藏新增/导入，handler 拒绝，原始 add/imp 不改写。
2. canDeleteTemporaryAttachments：组件必须记录本会话经 add 或 imp 引入且仍为 asrFlag=0 的附件。组件会话拥有 provenance marker（稳定附件标识到 add/imp 来源的记录），上传和共享导入成功时写入，重载/换单据时清除；外部仅有 asrFlag=0 的记录不得撤销。选择中全部满足来源和未提交条件时允许撤销，即使 delete=0；它不提升 delete，disabled=true 时仍拒绝。
3. canDeleteApprovedAttachment：Label 单条删除在分类 delete=1 后再检查审批保护；单据未审批时可删，已审批单据只允许记录自身为审批后附件。该条件只收紧授权，不把 0/2 提升为 1。

既有附件删除按记录分类及 typeId 的 delete 判权；混合选择逐条应用撤销或既有删除规则，全部通过后才一次执行，任一不满足则整体拒绝且不做部分删除。多选按钮按 2 > 0 > 1 聚合用于呈现，handler 仍逐条复核。disabled=true 锁定新增、导入、删除、编辑、分类编辑、归档、拖拽和保存，但不影响 view、预览和 download；status=view 不自动只读。

按类型控制下 ZIP 永远隐藏并由 handler 拒绝，因为当前 createZip 请求不携带 typeId；无论全部类型聚合态还是具体类型态都不调用。待后端提供按类型打包接口后另行开放。

Label/Image 固定使用 attach 的 bill 块；已审批单据下只读、不可新增必须来自该块原值，不另加前端审批推导。若后端另有 allowAttachArchive 数据条件，它只与 edit 组合，不成为第四条前端权限推导。

## 初始化、上下文和公开 API

实现名称基线：沿用现有 permission.ts 的 AttachmentPermissionContext 作为上下文类型，扩展 attachType、isWorkFlow、controlByType、typeId、分类树状态、会话 provenance 和三类独立能力；normalizeAttachmentPermission 是纯解析入口，组件对外提供 getPermissionContext()。具体 provenance 字段可按现有附件稳定标识实现，但不得退化为只检查 asrFlag。

初始化状态显式区分 pending、ready、failed。pending 立即清理上一轮权限和内容；ready 使用当前快照并对缺块 fail-closed；failed 整体不渲染现代附件区域。失败提示只由组件层显示一次，优先后端文本，否则显示“附件初始化失败”；service 返回结构化结果，不自行弹窗。failed 时 handleValid 拒绝确认。

组件统一维护并暴露 getPermissionContext()，快照至少包含 attachType、isWorkFlow、controlByType、当前 typeId 和独立前端约束状态。UI、公开 handler、弹窗确认链均从同一快照判权，不能因 openAttachment、openViewImage 或 handleValid/handleSave 的默认参数回退到单据块。

公开 handlers 保留既有位置参数和顺序，只在末尾追加可选上下文；已有对象参数增加 context 字段。内部实现使用具名 options 和精确函数类型。旧字段和回调声明按兼容策略保留：btn、permission、downloadAttachment、URL btn* 标记 deprecated 且不读取；disabled 与 onBeforeDownLoad 仍是有效运行时能力，不标记 deprecated。

## 最终交付与验证边界

- 最终 Git 差异必须全部位于附件源码白名单内；路径外变更数必须为 0。
- 固定基线为本地远端跟踪引用 `origin/ljx-6.5.2` 的 `2e31d397dc19f1d2e9924fa06f271c4f06fb6e19`；实时远端已不返回该分支，本次不 fetch、不创建远端分支、不 push。
- 最终分支相对 `origin/ljx-6.5.2` 只领先 1 个提交，不保留当前 5 个中间提交的拆分形态。
- 重写前保留仅本地备份分支 `backup/ljx-6.5.2-before-attachment-code-only-20260814`，不得推送该备份分支。
- 唯一交付提交信息为 `feat: 现代附件按分类权限块统一判权`；本次不执行 push。
- 不为本需求新增或修改依赖、根测试入口、测试配置、测试文件、dumi mock 或仓库内文档。
- 中间测试已发现的 Table StrictMode 初始化、Form failed 渲染、Label provenance、数组分类树校验和 UploadImage URL 五类运行时修正属于附件功能代码，保留在白名单内。
- 运行仓库原有的 `npm run build --prefix packages/@newgrand/udp-ui` 与 `git diff --check`。
- 审计最终分支相对远端只领先 1 个提交、所有差异都在附件源码白名单内，并确认 `package.json`、`package-lock.json` 与 `origin/ljx-6.5.2` 完全一致。
- 新增 Jest、测试文件和 dumi 页面不属于最终验证依赖。
- 真实新版后端联调仍属于 6.5.2 集成阶段，另行记录。

## Tickets 与依赖

原实施依赖图：01 → 02 →（03 与 04 并行）→ 05 → 06。最终补丁仅交付其中位于附件源码白名单内的运行时代码。

1. [[work-items/attachment-category-rights/issues/01-权限核心与纯函数测试]]：保留共享类型、分类选块、fail-closed、数值/别名和独立推导的运行时代码；测试文件不进入最终补丁。
2. [[work-items/attachment-category-rights/issues/02-初始化与公共API]]：三态初始化、上下文快照、service 结构化结果、handler API、弹窗确认链和精确类型。
3. [[work-items/attachment-category-rights/issues/03-Table与共享链接入]]：Table、Toolbar、上传/导入/共享/下载/删除链及逐记录按类型防线。
4. [[work-items/attachment-category-rights/issues/04-Form-Label-Image接入]]：formAttachment、UploadImage、Label、Image 的 tab/模式映射和资源请求防线。
5. [[work-items/attachment-category-rights/issues/05-React18组件回归测试]]：测试基础设施和测试文件不交付；测试发现的五类附件运行时修正保留。
6. [[work-items/attachment-category-rights/issues/06-dumi验收与6-5-2登记]]：dumi、mock 和测试文件不交付；Obsidian 版本登记继续保留。

Frontier：[[work-items/attachment-category-rights/issues/03-Table与共享链接入]] 与 [[work-items/attachment-category-rights/issues/04-Form-Label-Image接入]]（可并行）

## 非目标与完成条件

非目标：旧版 openOldAttachment、旧后端兼容兜底、把 visible 引入渲染/授权、删除有效的 deprecated props、修改附件源码白名单外的任何仓库文件、未经确认修改后端或 CI。

完成条件：最终差异只有附件源码白名单内的运行时代码且只有 1 个提交；udp-ui 原有构建与 `git diff --check` 通过；两个 package 文件和远端完全一致；所有 UI 与 handler 使用同一权限上下文；未授权路径没有资源或下载记录请求；文档中的 ADR、术语表、规格、tickets 和 00-版本总览互相可追溯。

相关：[[ng-design-附件术语表]] · [[ng-design-ADR-0001-附件权限分类块透传]] · [[ng-design-ADR-0002-附件权限补丁限定源码目录]] · [[00-版本总览]]
