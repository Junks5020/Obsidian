---
tags:
  - ng-design
  - requirement
  - KAN-11
status: implemented-awaiting-browser-validation
date: 2026-10-26
updated: 2026-10-26
---

# KAN-11：附件打包下载文件名

相关：[[代码提交记录/ng-design/01-提交覆盖矩阵]] · [[xzd/版本管理/00-版本总览]] · [[xzd/版本管理/ng-design-附件术语表]]

需求：[KAN-11](https://jinxuliu695.atlassian.net/browse/KAN-11)。用户于 2026-10-26 明确提供取值来源，并要求单据附件与明细附件只包含菜单名称和单据名称。

## 需求与范围

- 字段附件：`菜单名称-单据名称-字段名称.zip`。
- 单据附件、明细附件及单据全部附件导出：`菜单名称-单据名称.zip`。
- 菜单名称来自 `core.getQueryValue('appTitle')`。
- 单据名称来自 `core.getFormValues('billName').billName`。实际 API 返回字段值对象，不能直接将其拼接成字符串。
- 字段名称来自 `props.itemLabel`，只在 `colAttach=1` 时参与拼接；支持字符串形式的 `colAttach`。
- `exportName` 为不含扩展名的自定义名称，非空时直接使用，优先于默认拼接。
- 缺失部分不产生多余连接符；全部缺失时保留现有默认文件名。
- 表单附件下载按钮文案调整为现有多语言消息“打包下载”。现有单据导出全选入口保留，命名同时用于 `attachExport` 请求和浏览器下载属性。

## 实现

- 默认名称生成逻辑集中放在现有附件工具文件 `util.ts` 的 `getAttachmentExportName` 中，读取页面与表单上下文；按用户反馈合并到工具文件，不保留独立的 `exportName.ts`。
- ZIP handler、单据导出弹窗共用该方法。
- `NGTableAttachment`、`FormAttachment`、表单附件工具栏及其打开弹窗路径透传 `exportName` / `itemLabel`。
- 公共类型新增属性文档，`DocumentAttachmentProps.exportName` 改为可选。
- `ljx-7.0` 缺少必要的取值依赖，补齐 `core.getFormValues` 和表单/表格字段的 `itemLabel` 提供路径。表单标签沿用 7.0 的 `core.getLang` 机制，没有移植 6.5.2 的其他多语言框架代码。

## 需求提交

| 提交 | 分支 | 日期 | 目的 | 验证 |
| --- | --- | --- | --- | --- |
| 未提交，无实现提交哈希 | `6.5.2` | 2026-10-26 | 附件导出命名、按钮文案及透传 | 7 组专项及 udp-ui 完整构建通过 |
| 未提交，无实现提交哈希 | `ljx-7.0` | 2026-10-26 | 同步需求并补齐 core API / itemLabel 提供路径 | 7 组专项、core 及 udp-ui 完整构建通过 |

基线为 `6.5.2:0781dc3a5c4bbc9ce497cca6c970695fab0cc9e1` 与 `ljx-7.0:a863d07776b7ed81a8322d625188368a9243d284`，二者均为实现前基线，不是本需求的提交。

## 分支状态

| 分支 | 状态 | 说明 |
| --- | --- | --- |
| `6.5.2` | 待关联 | 工作区已实现，未提交，尚无可关联的实现哈希 |
| `ljx-7.0` | 待关联 | `ng-design.worktrees/sync_branch` 工作区已实现，未提交；保留原有暂存附件改动 |
| `sync_branch` | 待关联 | 本次未修改该名称的 Git 分支；工作区目录名不等同于分支名 |
| `ljx-6.5.2` | 待关联 | 本次未操作 |
| `ljx-6.5.1` / `6.5.1` | 不适用 | KAN-11 本次范围为 7.0 和 6.5.2 |

## 验证

- 两个工作区均执行 `node --test scripts/check-attachment-export.js`，各 7 组通过。
- 覆盖 core API 真实源码的对象返回契约、表格附件渲染器向文件/图片弹窗透传表头与标题、缺项拼接、字符串/数值 colAttach、自定义名称优先、ZIP handler、权限与业务 veto、全部附件导出请求/下载同名、表单工具栏文案及弹窗透传。
- 使用模拟 DOM、网络和 React 浅层元素执行真实 handler；不代表真实浏览器或后端压缩包验收。
- `6.5.2`：`npm run build --workspace=@newgrand/udp-ui` 通过（ESM / CJS 与声明文件）。
- `ljx-7.0`：`npm run build --workspace=@newgrand/udp-core` 与 `npm run build --workspace=@newgrand/udp-ui` 均通过（ESM / CJS 与声明文件）。udp-ui 首轮声明检查发现旧版 `getRender` 未保留列元数据，补齐其 rest 参数及类型后新增真实渲染器调用测试，7 组均通过；完整构建重跑退出码 0。
- 两版本次涉及文件的 Prettier 检查和 `git diff --check` 均通过。
- 后续按用户反馈，将相同命名逻辑合并至现有 `attachment/util.ts`，删除两版独立的 `exportName.ts`，并更新实际调用与验证脚本。合并后两版各 7 组专项及格式、差异检查通过；上述完整构建记录对应合并前实现，本次文件整理未重复完整构建。
- 未修改版本号、提交、推送、发包、部署或更新 Jira 状态。

## 相关 Bug 修复

暂无。

## 工作区保护

保留 `6.5.2` 既有未跟踪文件 `packages/@newgrand/udp-mobile-ui/src/component/Attachment/attachment.binding.test.js`。`ljx-7.0` 的既有暂存补丁在追加修改前后逐字节一致，原 `ngproxy.ini` 改动保留。

7.0 修改前备份：`C:/Users/jinxu/AppData/Local/Temp/kan11-7.0-before-y4l7y1il/`，其中 `staged.patch` 保存原暂存差异。该备份属于临时核验材料，需求事实以本记录和 Git 为准。
