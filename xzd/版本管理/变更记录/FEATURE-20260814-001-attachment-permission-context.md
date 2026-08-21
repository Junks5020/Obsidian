---
id: FEATURE-20260814-001
type: feature
status: completed
commit:
  - fa4e9f34658f36af363209d03f06979d56af4c61
intermediate_commits:
  - ad97f396b5c71ab856534f1bb06ce147187e27e9
  - 4b42d243780c7b7a38371f5938191e19a75c001d
  - eae45283f53fdcfeae14086f94c4cf0bac8c3320
  - 195e98eb95929f23e5db7a3607309c76679649c8
  - 14550fd1cb6f38e640d33267549fbf41aa6eae34
backup_branch: backup/ljx-6.5.2-before-attachment-code-only-20260814
source_branch: ljx-6.5.2
created: 2026-08-14
target_versions:
  - 6.5.2
tags:
  - version-change
  - feature
  - ng-design
  - attachment
  - permission
updated: 2026-08-14
---

# FEATURE-20260814-001：现代附件分类权限块透传与消费链改造

相关：[[work-items/attachment-category-rights/spec]] · [[ng-design-ADR-0001-附件权限分类块透传]] · [[ng-design-ADR-0002-附件权限补丁限定源码目录]] · [[ng-design-附件术语表]] · [[00-版本总览]]

## 2026-08-14 最终交付结果

## 2026-08-14 P1 回归修复（当前工作区）

- 修复 Table 首次选中行读取 `provenanceRef` 的 TDZ 崩溃，并让 `act_hi_taskinst` 旧工作流调用继续选择工作流权限块。
- 恢复 Form `status="view"` 的只读兼容语义；`disabled` 继续透传到嵌套附件弹窗、图片上传和保存/删除/编辑链。
- Label 初始化增加请求代次失效保护，pending/failed 清空旧列表；查看态拒绝保存，上传与删除入口保持只读。
- Form 初始化增加 session 请求代次保护，避免快速切单时旧响应覆盖新单；图片预览在持久附件无 URL 时不再对空文件对象调用 FileReader。
- 恢复 `getTableAttachInfo` 及 `service.ts` 既有导出函数的旧返回契约，新增 `getTableAttachInitResult` 与 `*Result` 方法承载三态结果。
- 验证：`git diff --check`、附件源码白名单审计、Babel TypeScript/TSX 语法解析（32 个文件）通过；未执行构建。Prettier 命令因本地 `prettier/bin-prettier.js` 缺失无法启动。

- 原 5 次提交已保存在本地备份分支 `backup/ljx-6.5.2-before-attachment-code-only-20260814`，不推送、不直接交付。
- 压缩固定基线为本地 `origin/ljx-6.5.2` 的 `2e31d397dc19f1d2e9924fa06f271c4f06fb6e19`；实时 GitLab 已不返回该分支，本次不 fetch、不重建或推送远端分支。
- 最终提交为 `fa4e9f34658f36af363209d03f06979d56af4c61`（`feat: 现代附件按分类权限块统一判权`），相对固定基线只有这 1 个提交。
- 最终差异严格限定为 `packages/@newgrand/udp-ui/src/businessComponent/attachment/**`，共 18 个文件，1859 行新增、808 行删除。
- `package.json`、`package-lock.json`、Jest 配置、测试、脚本、dumi 和仓库内文档改动全部排除。
- ticket 05 测试发现的五类附件运行时修正保留；其测试基础设施不保留。
- `npm run build --prefix packages/@newgrand/udp-ui` 通过（Father 转换 316 个文件并生成声明）；`git diff --check`、白名单、单提交和工作区清洁审计通过。
- `package.json` blob `43528fca981f66859afb63ae48886fd4b2311035`、`package-lock.json` blob `540fe66ed7bbecfd71df179f39744c51da2381d3` 均与固定基线完全一致。
- 最终提交未推送；实时远端也不存在 `ljx-6.5.2` 分支。

## 需求提交

| Commit | 分支/位置 | 日期 | 用途 | 验证与交付状态 |
| --- | --- | --- | --- | --- |
| `ad97f396b5c71ab856534f1bb06ce147187e27e9` | 本地备份分支 | 2026-08-14 | ticket 01 权限核心 | 中间提交；仅备份，不进入最终分支 |
| `4b42d243780c7b7a38371f5938191e19a75c001d` | 本地备份分支 | 2026-08-14 | ticket 02 初始化与公共 API | 中间提交；仅备份，不进入最终分支 |
| `eae45283f53fdcfeae14086f94c4cf0bac8c3320` | 本地备份分支 | 2026-08-14 | tickets 03/04 消费链接入 | 中间提交；仅备份，不进入最终分支 |
| `195e98eb95929f23e5db7a3607309c76679649c8` | 本地备份分支 | 2026-08-14 | ticket 05 测试及测试发现的运行时修正 | 测试产物不交付；附件源码修正已进入最终提交 |
| `14550fd1cb6f38e640d33267549fbf41aa6eae34` | 本地备份分支 | 2026-08-14 | ticket 06 dumi 与 mock | 中间提交；仅备份，不进入最终分支 |
| `fa4e9f34658f36af363209d03f06979d56af4c61` | `ljx-6.5.2` | 2026-08-14 | attachment 源码白名单内的唯一交付提交 | udp-ui 构建、diff check、单提交、白名单和 package 等价审计通过；未推送 |

## 关联 Bug 修复

| Bug ID | Commit | 分支 | 关系说明 |
| --- | --- | --- | --- |
| 暂无独立记录 | - | - | ticket 05 发现的五类运行时缺陷已直接并入最终需求提交 |

## 分支状态

| 分支 | 角色 | Commit | 状态 | 验证与备注 |
| --- | --- | --- | --- | --- |
| `ljx-6.5.2` | dev，promotes_to `6.5.2` | `fa4e9f34658f36af363209d03f06979d56af4c61` | 验证中 | udp-ui 原有构建与 Git 边界审计通过；提交未推送，实时远端分支不存在，真实新版后端联调待版本集成 |
| `6.5.2` | release | - | 待同步 | Git containment 已确认本地 `6.5.2` 不包含最终提交；本次未获授权同步 |

## 目标分支与范围

- 目标分支：`ljx-6.5.2`（配套新版后端响应形状）；本仓库不新增规格副本，规格/ADR 存 Obsidian。
- 现代附件范围：Table、formAttachment（list/tags/image）、Label、Image，以及工作流、来源单据和审批前后 tab；
  旧版 `openOldAttachment` 弹窗不在范围内。

## 中间实现记录（不会全部进入最终补丁）

- 01 权限核心：`AttachmentCategory` 五分类选块（bill/approved/source/workflow 普通块与按类型块），
  0/1/2 原样透传，不读 unifyButtonRights/typeButtonRights 兼容字段；仅保留三类独立前端推导
  （目标类型约束、provenance 临时撤销、Label 审批删除保护）；多选 2>0>1 聚合与逐条复核；
  visible 仅保留字段不消费；controlByType 下 ZIP 强制隐藏。
- 02 初始化与公共 API：pending/ready/failed 三态、service 结构化结果、`getPermissionContext()`
  统一快照、handleValid/handleSave 语义、onBeforeDownLoad 业务 veto、deprecated 兼容字段标记。
- 03 Table 与共享链：行级逐记录判权、混合删除整体判定、下载仅实际发起写日志、
  会话 provenance 三路写入（本地上传/APP 扫码/共享导入）、ZIP 去工作流特判。
- 04 Form/Label/Image：formAttachment 行级判权与可见性修正、UploadImage 未授权不取 URL 不伪装
  uploading、Label 固定 attach 块与临时撤销、Image 显式 attach 上下文、附件入口去 visible。
- 05 React 18 组件回归测试：根 `npm test` 统一入口（tsx 纯逻辑 40+6 例 + Jest 29 组件 55 例），
  显式引入 Jest 29/jsdom/Testing Library，不复用 umi-test 的 Jest 24/Enzyme。
  测试暴露并修复：Table StrictMode 双初始化去重、formAttachment failed 不渲染、
  Label provenance 换单清空、handleValid 数组分类树、UploadImage url 归一。
- 06 dumi 验收与登记：本登记 + 确定性 dumi 附件权限验收页
  （docs/business/Attachment.md，mock 键修正与接口形状补齐见下方）。

## 2026-08-14 dumi 中间验收记录（不进入最终补丁）

- 提交：`14550fd1c`（docs/business/Attachment.md 验收 demo + `.dumi/theme/dataJson.ts` mock 修正 +
  `test/attachment-mock-adapter.regression.ts` 6 例并入根 npm test）。
- 验收页：`npm run start` 后打开 `#/business/attachment`（本地地址 http://localhost:8000，
  hash 路由；端口以启动日志为准）。控制面板可切换 Table / Form list / Form tags / Form image /
  Label / Image 六形态、五分类、controlByType、typeId、各按钮 0/1/2、disabled、ready/failed，
  下方展示 mock 命中的请求日志。
- mock 键修正：与 common.ts 适配器约定一致（请求 URL 剥前导斜杠后匹配 dataJson 键），
  表格初始化键去掉旧 `/1` 错误前缀；补齐工作流/来源/分类树接口形状。
- 适配器一致性由 `attachment-mock-adapter.regression.ts` 固化（键命中、默认/按类型/failed
  响应形状、label 形状、工作流/来源/分类树 mock），根 `npm test` 一并执行。
- 浏览器矩阵：webpack 编译 9453 模块无错误；页面路由 `docs/business/Attachment`
  （path `business/attachment`）与验收 demo（docs-business-attachment-demo-3）已编译进产物。
  真实浏览器逐场景截图与网络断言由人工回归补充（见下节，不阻塞登记）。

## 中间测试与构建记录（不进入最终补丁）

- 测试入口：根目录 `npm test`（scripts/run-tests.js：tsx 回归 → Jest 组件回归），
  干净安装后一次通过，不依赖真实后端账号。外置流水线需执行 `npm test`。
- dumi 验收页：`npm run start` 后打开 `#/business/attachment`（端口以启动日志为准）；
  本地确定性 mock 位于 `.dumi/theme/dataJson.ts`，由 `window.__ATTACH_ACCEPTANCE_STATE__` 驱动。
- mock 修正：附件 mock 键与适配器约定一致（去前导斜杠；表格初始化键去掉旧 `/1` 错误前缀），
  补齐工作流（getTaskAttachmentByAttachment / getTaskAndNoticeFiles）、来源（getOriAttachList）、
  分类树（getAttachTypeTree）、Label/Form 初始化的真实接口形状。
- 验证命令：`npm test`、`npm run start`（浏览器矩阵见下）。

## 浏览器验收矩阵（待人工补充证据）

- 桌面 Table / Form list / Form tags / Form image / Label / Image 六形态，切换分类、controlByType、
  typeId、各按钮 0/1/2、disabled、ready/failed 后观察按钮显隐/置灰与请求日志。
- 关键断言：visible 变化不改变任何区域或请求；controlByType 时全部/具体类型均无 ZIP；
  无权限时无资源/下载信息/下载日志/轮询请求；failed 不渲染且只提示一次。

## 真实后端联调

- 真实新版后端联调属于 6.5.2 集成阶段，另行记录。当前本地开发分支因此保持“验证中”，不得把发布分支标为“已同步”。

## 2026-08-14 P2 回归修复（当前工作区）

- `getTableAttachmentApi` 的公开 handler 默认继承配置时的 `permissionContext`，调用方显式传入的上下文仍可覆盖默认值。
- 预览未传 `attachType` 时不再以 `undefined` 覆盖上下文分类，审批后、来源单据和工作流附件继续使用对应权限块。
- Form 会话切换时原地清空 provenance，已有 memo/handler 不再持有失效映射；图片上传成功后同步登记临时附件来源。
- Label 上传权限恢复三态语义：`0` 置灰、`1` 可用、`2` 隐藏。
- 批量下载同一批次只执行一次 `onBeforeDownLoad`，单文件下载与 ZIP 下载各自执行一次且均不能绕过 veto；公开 `handleDownload` 原六个参数顺序未改变。
- P1/P2 规格兼容性复审与硬标准复审均通过，未发现新的 P0-P2。
- 验证：附件目录 32 个 TypeScript/TSX 文件 Babel 语法解析通过；18 个差异文件通过 Prettier 2.8.8 检查；`git diff --check HEAD`、附件源码白名单及 package/锁文件审计通过。
- 按本轮要求未执行构建或完整 TypeScript 类型检查；当前本地依赖中无可直接使用的 TypeScript 编译器。
