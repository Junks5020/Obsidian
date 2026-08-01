---
id: "BUG-20260729-002"
type: bug
status: completed
commit: "29ad691b5ab5ed0b2830864abb3ac5d1f340ed0c"
source_branch: "ng-design:6.3"
created: "2026-07-29"
target_versions:
  - "6.3"
tags:
  - version-change
  - bug
  - attachment
  - mobile-ui
---

# BUG-20260729-002：附件来源弹窗缺少“拍照”

## 问题与修复

- 问题现象：线上自定义表单的附件来源弹窗只有标题和取消操作，没有“拍照”；本地 docs 页面可以正常显示“拍照”。
- 根因：`AttachmentUpload` 只解析数组形式的来源 ID。标量配置、空数组或全部无效的配置会得到空来源列表。
- 修复内容：兼容字符串和数组配置，同时支持来源 ID 与 MIME 值；对结果去重；没有有效匹配时回退全部可用来源，避免弹窗为空。
- 影响范围：`@newgrand/udp-mobile-ui` 附件上传来源选择；未修改 `customFormNew/detail/index.tsx` 的业务流程。

## Git 信息

- Commit：`29ad691b5ab5ed0b2830864abb3ac5d1f340ed0c`
- 分支：`ng-design:6.3`
- 合并方式：直接提交到来源分支

## 版本同步

| 版本名称 | 是否需要同步 | 当前状态 | 合入 Commit | 验证结果 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 6.3 | 是 | 已同步 | `29ad691b5ab5ed0b2830864abb3ac5d1f340ed0c` | 通过 | 当前分支已提交并完成增量及浏览器验证 |

## 验证

- `tsx --test packages/@newgrand/udp-mobile-ui/tests/attachment-accept.test.ts`：6/6 通过。
- 变更的 TypeScript/TSX 文件通过 esbuild 编译。
- 本地 docs 自定义表单打开附件弹窗后，实际检测到 1 个“拍照”按钮。
- `git diff --check` 通过。
- 全量 `umi-test` 与 `father build` 在当前 Windows 会话中启动后不退出；TypeScript 4.9 还会被依赖中的新版 `@types/d3-dispatch` 语法阻断，未获得全量构建结果。

