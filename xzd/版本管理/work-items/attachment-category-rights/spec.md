---
tags:
  - ng-design
  - spec
  - work-item
status: ready-for-agent
date: 2026-08-13
---

# 现代附件适配后端全分类权限返回

相关：[[ng-design-附件术语表]] · [[ng-design-ADR-0001-附件权限分类块透传]] · [[00-版本总览]]

## Problem Statement

附件初始化接口（`tableAttachInit` / `labelAttachInit`）的 `attachTypeRights` 现在按附件分类返回全部权限块：单据附件（`billAttachButtonRights`）、审批后附件（`approvedAttachButtonRights`）、来源单据附件（`sourceAttachButtonRights`）、工作流附件（`workflowAttachButtonRights`）；按类型控制（`controlByType: true`，分类树模式）时，单据/审批后附件改为按类型返回（`billAttachTypeButtonRights` / `approvedAttachTypeButtonRights`）。`unifyButtonRights` / `typeButtonRights` 仅是后端为旧版本前端保留的兼容字段。

当前工作区已建立 fail-closed 的权限归一化模块 `permission.ts`，但它只读取兼容字段，并靠前端硬编码推导模拟分类差异（审批保护、工作流/来源强制只读隐藏等）。需要改为按分类选择权限块并原样透传。

## Solution

`normalizeAttachmentPermission` 按 `context.attachType` 选择对应分类权限块（按类型控制时按选中 `typeId` 取 per-type 块），权限数值 0/1/2 原样透传；删除全部前端硬编码推导，仅保留依赖纯前端状态的推导；兼容字段完全不读，分类块缺失即 fail-closed。

## Implementation Decisions

- 分类 → 权限块映射：
  - 单据附件 `attach`、审批前附件 `pendingApprovedAttach` → `billAttachButtonRights`；按类型控制时 `billAttachTypeButtonRights[typeId]`。审批前附件是单据附件在单据已审批后的只读呈现，只读效果由后端数据天然达成。
  - 审批后附件 `approvedAttach` → `approvedAttachButtonRights`；按类型控制时 `approvedAttachTypeButtonRights[typeId]`。
  - 来源单据附件 `oriBizAttach` → `sourceAttachButtonRights`。
  - 工作流附件 `workFlowAttach` → `workflowAttachButtonRights`。
  - formAttachment：审批前 tab 与无 tab 简单形态按单据附件；审批后 tab 按审批后附件。
  - NGLabelAttachment 与 ImageAttachmentShow 固定按单据附件。已确认后果：单据已审批后标签/图片附件只读、不可新增。
- 兼容字段 `unifyButtonRights` / `typeButtonRights` 完全不读；本分支只配套新版后端，不做旧后端兜底（见 ADR）。
- 权限数值语义 0 置灰 / 1 可用 / 2 隐藏原样透传，前端不覆盖；隐藏与置灰的差异由后端返回值决定。
- 删除的前端推导：审批保护（`approved!==0` 禁增删改）、审批前 tab 禁 `add`、工作流/来源变动权限置 2、工作流 `zipDownload` 置 2（含 Toolbar 中 workflow tab 不渲染打包下载的规则）。
- 保留的前端推导（依赖纯前端状态，后端无法表达）：分类树未选中类型时 `add/share=2`；`canDeleteTemporaryAttachments`（勾选均为未保存临时附件时放行删除）；`canDeleteApprovedAttachment`（标签附件单项删除兜底）。
- 附件可见性取当前激活分类块的 `visible`；分类树未选中类型时保留 `hasVisibleType` 兜底；已选中类型但权限对象缺 `visible` 字段时按不可见处理（fail-closed）。
- tab 显隐逻辑不变，仍按 `approved` 标志与数据有无判断；各块 `visible` 只控制内容区域，不参与 tab 显隐。
- `interface.ts` 中 `permission` / `downloadAttachment` / `onBeforeDownLoad` / `disabled` 保留 `@deprecated` 声明，本轮不删除。
- 目标分支仅 `ljx-6.5.2`；变更记录按模板登记，其他版本同步另行安排。

## Testing Decisions

- 扩展现有 `packages/@newgrand/udp-ui/test/attachment-permission.regression.ts`，继续用 `tsx --test` 运行，不接入新 runner。
- 用例覆盖：普通结构各分类选块；树状结构 per-type 选块与未选类型兜底；响应同时含兼容字段与分类块时忽略兼容字段（示例：unify 全 1、billAttach 变动全 0 时取 billAttach）；0/1/2 透传（含后端返回 2 的隐藏语义）；分类块缺失 fail-closed；选中类型缺 `visible` 字段不可见；保留的两条前端推导；无 `attachType` 上下文默认取单据附件块。
- 验证：`tsx --test` 全绿；esbuild 编译检查改动文件；docs 页面浏览器验证表格附件各 tab、formAttachment 审批前后 tab、标签附件。

## Out of Scope

- 不删除已废弃 props 声明。
- 不改变 tab 显隐逻辑与 `approved` 标志的用途。
- 不适配旧版后端（无分类块的响应按 fail-closed 处理）。
- 不修改旧版 `openOldAttachment` 弹窗。
- 不在源码仓库创建持久文档；术语表、ADR、规格均在 Obsidian。

## Tickets

1. [[issues/01-权限归一化按分类选块]]
2. [[issues/02-调用点上下文补全]]
3. [[issues/03-回归测试扩展]]
4. [[issues/04-浏览器验证与变更登记]]

Frontier：[[issues/01-权限归一化按分类选块]]
