---
tags:
  - ng-design
  - spec
  - work-item
  - attachment
status: implemented
date: 2026-09-24
updated: 2026-09-24
---

# 附件弹窗操作列复制附件

相关：[[ng-design-附件术语表]] · [[ng-design-ADR-0001-附件权限分类块透传]] · [[00-版本总览]]

## 目标

在现代附件弹窗附件列表的“操作”列新增“复制”按钮：点击后将该行附件复制为本会话新增的一条附件，新名称以 `Vn` 版本后缀区分。访谈已于 2026-09-24 完成，全部决定经维护者逐项确认。

## 接口契约

- 后端已提供 `POST /JFileSrv/reactAttach/copySelectedAttach`（路径前缀与既有 `reactAttach` 端点一致），请求体 `{ asrSessionGuid, asrFid, asrName }`。
- `asrName` 由**前端计算**后传入，即副本的目标文件名。

## 命名规则

- 版本后缀放在扩展名之前：`报告.docx` → `报告V1.docx` → `报告V2.docx`。
- 序号扫描范围：当前会话刷新后的**完整附件列表**，匹配“去掉扩展名后等于原始名或 `原始名V数字`”的记录，取最大序号加一；不受当前 tab/类型过滤影响。
- 复制已有副本时按同一原始名的最大序号递增（复制 `报告V1` 得 `报告V2`）。
- 删除后序号可重用（`V1` 被删后再复制 `报告.docx` 重新占用 `V1`）；连续点击依赖每次复制成功后刷新列表。

## 范围

- 复制按钮只加在现代附件弹窗（`NGTableAttachment`）附件列表“操作”列，按单行复制。
- 表单附件、标签附件、图片附件等内嵌形态不加。
- 仅单据附件（含审批前/审批后 tab）提供；来源单据附件和工作流附件 tab 不提供。

## 权限映射

- 复制按钮由当前分类权限块的 `add` 控制：0 置灰、2 隐藏，handler 同样判权；`disabled=true` 本地交互锁进一步收紧。
- 不读 `unifyButtonRights` 等兼容字段，前端不自造新权限；后端将来提供专用 `copy` 字段再切换。

## 按类型控制

- 复制是行级操作：副本继承源记录的 `typeId`（源记录无则为空）；不受“未选类型不能新增/导入”的目标类型约束，“全部类型”聚合态下行复制按该行自身 `typeId` 生成。
- 副本其他记录属性（审批标记等）由后端按源记录复制。

## 会话语义

- 复制成功后刷新列表；副本是本会话新增的临时附件（`asrFlag=0`），provenance 按 `add` 来源记录，保存前可被“撤销会话新增”移除。
- 取消/放弃本次附件操作时副本一并丢弃；只有 `handleSave` 才真正落到单据。

## 文案与反馈

- 按钮文案“复制”；成功提示“复制成功”；失败优先显示后端 `message`，无则“复制失败”。
- 文案走现有 `i18n.ts` key（`attachment.action.copy`、`attachment.message.copySuccess`、`attachment.message.copyFailed`）。

## 实施记录

- 2026-09-24：完成 `NGTableAttachment.tsx` 操作列接入、复制接口、Vn 命名函数和中文文案；复用权限模块稳定标识，并增加源附件标识/名称缺失防线。
- 验证：`git diff --check` 通过；`npm run build --prefix packages/@newgrand/udp-ui` 通过。

## 验收要点

- “操作”列出现“复制”，仅单据附件（含审批前/审批后）行可用；`add=0` 置灰、`add=2` 隐藏、`disabled=true` 收紧。
- 复制 `报告.docx` 依次产生 `报告V1.docx`、`报告V2.docx`；复制 `报告V1.docx` 产生 `报告V2.docx`；删除 `报告V1` 后再复制原始件重新产生 `报告V1`。
- 副本保存前可撤销，取消弹窗后副本消失；保存后重新打开仍在。
- 来源单据附件、工作流附件 tab 无复制入口。
