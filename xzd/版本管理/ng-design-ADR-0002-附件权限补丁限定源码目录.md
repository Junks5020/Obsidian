---
tags:
  - ng-design
  - ADR
status: accepted
date: 2026-08-14
updated: 2026-08-14
---

# ADR-0002：6.5.2 附件权限补丁限定附件源码目录

`ljx-6.5.2` 本次附件权限改造的最终 Git 差异严格限定为 `packages/@newgrand/udp-ui/src/businessComponent/attachment/**`。`package.json`、`package-lock.json`、Jest 配置、测试文件、测试脚本、dumi mock、仓库内附件文档以及其他目录全部不进入最终补丁；中间测试提交发现的真实运行时修正，只要位于该附件源码目录内，仍须保留。

最终提交历史相对 `origin/ljx-6.5.2` 只保留 1 个新提交；当前领先远端的 5 个本地提交仅作为中间实现历史，不直接交付。

执行前实时 GitLab heads 已不再返回 `ljx-6.5.2`；本次仍以本地远端跟踪引用 `origin/ljx-6.5.2` 的固定提交 `2e31d397dc19f1d2e9924fa06f271c4f06fb6e19` 为压缩基线。不得 fetch 后改换基线，也不得重新创建或推送该远端分支。

改写前创建仅本地备份分支 `backup/ljx-6.5.2-before-attachment-code-only-20260814` 指向当前 5 提交的 HEAD。该分支只用于恢复，不推送，也不属于最终交付历史。

这是维护者明确指定的补丁审查与交付边界。它只取代 [[ng-design-ADR-0001-附件权限分类块透传]] 中关于 Jest、根 `npm test`、dumi 验收页和相应完成门槛的交付决定，不改变该 ADR 已确定的权限分类、0/1/2 数值语义、fail-closed、初始化三态、统一上下文或 handler 防线。代价是最终补丁不能再声称自带新增的自动化测试基础设施或 dumi 验收页；后续验证必须在不修改白名单外文件的前提下使用仓库既有能力或外部证据完成。

最终验证使用仓库原有的 `npm run build --prefix packages/@newgrand/udp-ui` 和 `git diff --check`，并审计以下不变量：分支相对 `origin/ljx-6.5.2` 只领先 1 个提交；全部差异均位于附件源码白名单；`package.json` 与 `package-lock.json` 和远端基线完全一致。新增 Jest、测试文件和 dumi 页面不作为最终验收依赖。

唯一交付提交使用信息 `feat: 现代附件按分类权限块统一判权`。本次只改写本地分支并生成本地提交，不推送最终分支或备份分支。

实施结果：最终提交为 `fa4e9f34658f36af363209d03f06979d56af4c61`，相对固定基线仅 1 个提交、18 个白名单内文件；udp-ui 原有构建、`git diff --check`、路径边界和 package 等价审计均通过。原 5 次提交保存在约定的本地备份分支。

相关：[[ng-design-ADR-0001-附件权限分类块透传]] · [[ng-design-附件术语表]] · [[work-items/attachment-category-rights/spec]] · [[00-版本总览]]
