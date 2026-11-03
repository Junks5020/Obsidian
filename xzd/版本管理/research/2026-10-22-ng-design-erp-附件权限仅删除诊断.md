---
tags:
  - ng-design
  - attachment
  - diagnosis
status: diagnosed
date: 2026-10-22
updated: 2026-10-22
---

# ERP 附件工具栏“只有删除可用”诊断

相关：[[00-版本总览]] · [[ng-design-附件术语表]] · [[ng-design-ADR-0001-附件权限分类块透传]]

## 结论

**新 HAR 已确认工作流接口返回 `bizFormAsrOption=4`，JSON 类型为 number。** Entry 1 另有 `optionSetProperty.editAttach="4"`（string）；这是不同字段，尚无证据证明它与 `bizFormAsrOption` 之间的转换关系。Entry 4 的 `GetFlowExecutionInfo` 明确返回运行时字段数值 `4`。新旧 HAR 的业务类型、单据表和主键在内存中逐项比对均匹配（报告不保存标识原值），因此两份请求属于同一业务单据场景。

本地 `ng-design` 6.5.1 附件组件将流程选项 4 定义为“可删除”，只启用“删除”和“控件预览”，把新增、导入共享、下载、打包下载和控件编辑置灰；与截图相符。**接口下发该配置已由 HAR 确认；按本地实现，它能解释按钮组合。**但线上 JS 版本及调用方 `btn` / 宿主权限到弹窗的传递尚未验证，因此这不是完整的线上运行时因果证明。

## 证据

### 截图与 HAR

- 截图显示附件表格“暂无数据”；工具栏中的“删除”和“控件预览”外观呈可用状态，其余常规附件操作外观呈禁用状态。“下载位置修改”外观也呈可用状态，但它只是打开浏览器下载设置的独立按钮，不属于附件授权。外观不是 DOM 的 `disabled` 属性证明；这里仅以本地源码的条件作解释。
- 旧 HAR 共 4 条请求，均返回 HTTP 200。
  - Entry 0 `GET /JFileSrv/reactAttach/tableAttachInit`：`attachmentRecordList=[]`；`allowedAttachmentOperationAfterSubmit="4"`、`allowedAttachmentOperationAfterCheck="4"`、`downloadAttachment="0"`。
  - Entry 1 `GET /api/WorkFlow3/WorkFlowApi/getTaskAttachmentByAttachment`：成功返回流程附件查询参数。
  - Entry 2 `POST /JFileSrv/reactAttach/getTaskAndNoticeFiles`：`taskAttachments=[]`、`noticeAttachments=[]`。
  - Entry 3 `GET /SUP/Attachment/AttachmentGetAuditStatus`：`approved=0`、`auditStatus=1`。
- 新 HAR 共 13 条请求，均返回 HTTP 200。
  - Entry 1 `GET /sup/customFrontend/getFrontendInfo`：响应 `status="success"`；配置含 `optionSetProperty.editAttach="4"`（string）。
  - Entry 4 `GET /api/WorkFlow3/WorkFlowapi/GetFlowExecutionInfo`：响应包含 `flowStatus=1` 与 `bizFormAsrOption=4`（number）。响应体直接包含流程字段，不是仅凭 HTTP 200 推断。
  - Entry 5、12 `GET /SUP/Attachment/GetAttachCount`：业务类型和表名匹配旧 HAR；Entry 1 的请求主键及 Entry 6 响应中的 `phid` 与旧 HAR 主键匹配。比较在内存中完成，未记录原值。
  - Entry 6 `GET /sup/customServer/getInfo` 返回 `status="success"`，未发现 `btn` 或 `permission` 字段。
  - Entry 11 `GET /SUP/PageRight/GetNoRightsButtons`：`Success=true`、`Code=200`，`Data="attachDownload,attachView,attachEdit,attachDelete,attachAdd||"`，即返回的页面级禁用清单包含下载、查看、编辑、删除和新增。本地 `udp-core/src/baseHoc/pageHoc.tsx:201-222` 将其解析为宿主页面 `disableBtn` / `hideBtn`。这与弹窗读取 `bizFormAsrOption` 是不同权限入口；本地附件组件未直接读取该页面级列表，但 HAR 未记录宿主如何将权限传入弹窗（例如 `btn`），因此不能断言它对最终 UI 完全无影响。
- 新旧 HAR 的业务类型、单据表和单据主键均匹配，因此可把新 HAR 的流程响应关联到旧 HAR 截图场景。
- 旧 HAR 中附件记录和流程/知会附件列表都为空，故当时没有可选中的文件。即使“删除”按钮外观呈可用，点击后也会因未选择行而提示选择附件；空列表不会单独令工具栏按钮置灰。

### 与当前 6.5.1 源码的对应关系

当前工作区代码版本为 `1af87670f`（6.5.1，标签 `@newgrand/udp-mobile-ui@6.511.214`）。本地代码是旧版 `bizFormAsrOption` 工具栏逻辑；Obsidian 中 ADR-0001/术语表记录的是 6.5.2 分类权限方案，**不能将 6.5.2 的权限契约与此处 6.5.1 代码混用**。HAR 未包含 JS 资源，不能证明线上包版本与本地 6.5.1 一致。

- `packages/@newgrand/udp-ui/src/businessComponent/work-flow/service.ts:13-20`：请求 `GetFlowExecutionInfo` 后直接返回响应对象，不转换 `bizFormAsrOption` 的类型。
- `packages/@newgrand/udp-ui/src/businessComponent/work-flow/WorkFlowPanel.tsx:2364-2373`：将接口响应保存为 `workFlowInfo`，并触发 `onWorkFlowInfoLoaded` 通知。
- `packages/@newgrand/udp-ui/src/businessComponent/attachment/NGTableAttachment.tsx:734-782`：从该事件读取 `workFlowInfo.bizFormAsrOption`，传给附件工具栏。
- `packages/@newgrand/udp-ui/src/businessComponent/attachment/components/Toolbar.tsx:73-101`：源码列出节点选项映射；数值 `4` 注释为“可删除”，并执行 `setEnabled(['delete', 'view'].includes(id))`。
- `packages/@newgrand/udp-ui/src/businessComponent/attachment/components/Toolbar.tsx:523`：下载位置修改按钮是独立 `<Button>`，不读取附件权限。
- `packages/@newgrand/udp-ui/src/businessComponent/attachment/NGTableAttachment.tsx:205-245`：另一个值为 4 的设置 `attachOption.allowedAttachmentOperationAfterSubmit` 映射为允许新增、共享、删除、编辑和编辑分类。因此，**不能把 HAR 中这个通用附件选项的 4 当成“仅删除”的原因**。
- `packages/@newgrand/udp-ui/src/businessComponent/attachment/components/Toolbar.tsx:226-286`：删除/下载等操作需要先选文件；空列表下点击会提示选择附件。但工具栏按钮置灰条件位于 `AttachmentButton`（同文件 `:141-149`）：在流程配置提供 `enabled` 时取决于该配置，否则取权限值和 loading；它不依赖 `checkedList`。因此空列表能解释“暂无数据”和点击后的选择提示，**不能解释这组按钮选择性置灰**。

## 结论边界

- 流程接口已下发数值 `bizFormAsrOption=4`，且新旧 HAR 的业务类型、单据表和主键匹配；这是本次按钮状态的直接流程配置证据。
- 通用附件选项 `allowedAttachmentOperationAfterSubmit="4"` 与流程选项 `bizFormAsrOption=4` 是不同字段、不同语义。`NGTableAttachment.tsx:205-245` 显示前者允许新增、共享、删除、编辑和编辑分类，不能解释“仅删除”。
- Entry 11 的 `GetNoRightsButtons` 返回页面级禁用列表，其中包含 `attachDelete` 和 `attachView`；它是独立权限入口，但宿主如何传入附件弹窗尚未验证，不能排除它对最终权限的影响。
- 组件调用参数 `btn` 仍未从 HAR 中可见；本地 `Toolbar.tsx` 只有在未传 `btn` 时才应用 `bizFormAsrOption` 的 `enabled` 分支。该调用参数和线上 JS bundle 版本仍是边界条件，未由 HAR 证明。

## 6.3sp 分支历史对比

- 本地 `6.3sp` 为 `cba0fbeb8`，本地远端跟踪引用 `origin/6.3sp` 为 `8a489f161`，后者比本地引用多 2 个提交；两处附件源文件一致。本次未 fetch，`origin/*` 仅指本地跟踪快照，不代表实时远端状态。
- 两者都包含 `workFlowInfo.bizFormAsrOption` 流程权限逻辑，但 `case 4` 对匹配的 `AttachmentButton` 执行 `setEnabled(true)`，不是“仅删除＋预览”。这不等于全局无条件开放所有权限：旧代码仍有按钮隐藏判断、`btn` 分支和上传中禁用等限制。`git blame` 将该旧分支逻辑归于 `5b54c811d`。`ljx-6.3sp2`（`188ad5613`）也保留相同行为。
- “值 4 只启用删除和预览”的改动来自 `dc4b25861`（2026-09-28，`fix: 单据附件按钮权限`）：将该分支的 `setEnabled(true)` 改为 `setEnabled(['delete', 'view'].includes(id))`，并限定单据附件页签。该提交不在本地 `6.3sp`、本地 `origin/6.3sp` 跟踪快照或 `ljx-6.3sp2` 历史中；它存在于本地 `6.5.1` 与 `origin/6.5.1` 跟踪快照。提交包含关系不证明改动最初在哪个分支开发。

**答复：6.3sp 有流程附件权限逻辑，但没有截图对应的“值 4 仅允许删除＋预览”收紧实现；该差异来自 `dc4b25861`。** HAR 仍不能判定线上实际部署分支/JS 版本。

## 按用户确认同步 6.3sp 行为

- 用户确认该场景预期允许更多附件操作。
- 在本地工作区 `liujinxu/651-附件排查`（HEAD `1af87670f`）仅修改 `packages/@newgrand/udp-ui/src/businessComponent/attachment/components/Toolbar.tsx` 的 `case 4`：将 `setEnabled(['delete', 'view'].includes(id))` 恢复为 `setEnabled(true)`，并更新注释。保留 `attachType === 'attach'` 范围、`!btn` 条件、列附件/工作流附件例外、上传状态锁和选项 0/1/2/3/5；未合并分支、未更改其他权限逻辑。
- 验证：`git diff --check` 通过，差异仅该文件 2 行。尝试 `npm run build --prefix packages/@newgrand/udp-ui`，但环境没有 `father`（根目录和包目录均无 `node_modules/.bin/father`），构建未启动；包内未发现可运行的附件组件回归测试。故未完成真实 UI 回归。
- 未推送、发包或部署；线上结果未验证。另有 Entry 11 页面级 `GetNoRightsButtons` 禁用清单及未捕获的调用方 `btn`，仍可能影响最终按钮状态。

## 范围与隐私

本次完成两份 HAR 离线分析和本地源码核对，并按用户确认仅修改 `packages/@newgrand/udp-ui/src/businessComponent/attachment/components/Toolbar.tsx` 的流程选项 `case 4`。未运行真实页面复现、未核对线上 JS bundle 版本、未重放 HAR 请求、未修改生产配置，也未推送、发包或部署。本文只记录脱敏后的接口路径、权限字段和值；业务类型、单据表和单据主键仅在内存中比较，未保存原值；也未保存 HAR 中的 Cookie、令牌、用户或其他个人数据。