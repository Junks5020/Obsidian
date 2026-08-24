---
tags:
  - ng-design
  - commit-tracking
  - attachment
  - i18n
status: active
date: 2026-08-24
updated: 2026-08-24
---

# UDP UI 附件后端多语言

## 需求

- 根据 Attachment 后端多语言注册清单替换 `udp-ui` 附件弹窗内的中文文案。
- 语言资源 identity 使用 `Attachment`，后端缺失、无效或请求失败时回退原始中文。
- `getLanguageMap` 只在打开附件弹窗时触发，同页多个附件弹窗共享一次 Promise 请求。
- 弹窗外的附件、上传、预览、下载、删除等按钮继续使用 `udp-ui/src/util/lang.ts` 全局语言。

## 需求提交

| Commit | Branch | Date | Purpose | Validation |
| --- | --- | --- | --- | --- |
| `50ddf6e96c9d92ca002466739cee0bc10c85c35a` | `ljx-6.5.2` | 2026-08-24 | 新增 Attachment 语言清单、具名占位符、中文回退、弹窗按需加载与页面级缓存，并接入附件组件 | `tsx tests/attachment-i18n.test.ts` 通过；`npm run build --workspace=@newgrand/udp-ui` 通过 |

## 关联 Bug 修复

无。

## 分支矩阵

| Branch | Status | Commit |
| --- | --- | --- |
| `sync_branch` | 不适用 | - |
| `ljx-7.0` | 不适用 | - |
| `ljx-6.5.2` | 验证中 | `50ddf6e96c9d92ca002466739cee0bc10c85c35a` |
| `6.5.2` | 待同步 | - |

## 验证

- `.\\node_modules\\.bin\\tsx.cmd tests\\attachment-i18n.test.ts`：通过。
- `npm run build --workspace=@newgrand/udp-ui`：通过，ESM/CJS 均完成 319 个文件转换及声明生成。
- 原提交 `a19ead1d8c7ee6aa275e73a339e9b9ff46b3bc06` 仅修改提交信息后由 `50ddf6e96c9d92ca002466739cee0bc10c85c35a` 取代，两者 tree hash 一致。
- 提交仅存在于 `ljx-6.5.2`，尚未推送；发布分支 `6.5.2` 待后续同步。

Related: [[../01-提交覆盖矩阵]]
