---
tags:
  - report-web
  - 需求同步
  - 打印模板
status: planning
date: 2026-08-24
updated: 2026-08-24
source_branch: 6.5.2-dev
target_branch: 6.5.1-dev
---

# report-web 打印模板类型同步计划

将 `report-web:6.5.2-dev` 的打印模板类型能力完整同步到 `report-web:6.5.1-dev`，以来源分支的最终可观察行为和接口字段契约作为验收基线。

相关：[[report-web-术语表]] · [[00-版本总览]]

## 已确认目标

- 来源基线：`6.5.2-dev@78f7f0b4f6028a5c554f356ea15f29427e9f8f60`。
- 目标基线：`6.5.1-dev@b19da6a10b5449c2dea026a1a86960403ff51a01`。
- 新增打印模板时展示“类型”，选项完整对齐为“用户”和“用户_APP展示”。
- 打印模板列表展示“类型”列，并按来源分支的文案呈现类型。
- “用户_APP展示”类型展示“默认模板”，隐藏“直接预览”和“导出权限”；“用户”类型执行相反的显示规则。
- 保存前清零当前类型不适用的字段：用户_APP展示模板清零 `directPreviewStatus`、`exportAuth`，用户模板清零 `defaultTemplate`。
- 打印模板类型相关的请求和响应字段与 `6.5.2-dev` 保持一致，包括 `templateType`、`defaultTemplate`、`directPreviewStatus`、`exportAuth` 及当前打印模板保存、详情、列表链路已有字段。
- 采用白名单式适配同步：仅修改来源提交 `3078a79abf10aae5f9a2ccbcced26ed69b8c3e7c` 对应的三个打印模板文件，按 `6.5.2-dev` 最终行为补齐类型列、表单联动和保存归零逻辑；不直接移植或夹带两分支的其他差异。
- 排除 `previewEditStatus` 及“预览时支持隐藏行列”能力，保持 `6.5.1-dev` 在 2026-08-12 产品回退后的现状。

## 已查证代码事实

- `6.5.1-dev` 已存在 `templateType` 表单项和列表列，但用户_APP选项被隐藏，且缺少 `defaultTemplate`、类型联动显示和保存前字段归零，因此属于半套实现。
- 来源功能提交为 `3078a79abf10aae5f9a2ccbcced26ed69b8c3e7c`（“增加套打模板的用户APP类型”），只修改打印模板列表列、抽屉保存规整和表单配置三个文件。
- 两分支的接口封装地址与调用方式没有差异：列表 `/reportcenter/printManage/pagePrint`、保存 `/reportcenter/printManage/savePrint`、详情 `/reportcenter/printManage/getPrint`。字段由列表响应直接消费，保存表单值经规整后直接提交。
- 当前工作树检出 `6.5.2-dev`，并有用户未提交的 `.umirc.ts` 修改；实施时不得覆盖或夹带该修改。

## 待确认

- 对复制、编辑、详情三条既有数据回填路径的兼容口径。
- 自动化测试与人工页面验收范围。
- 是否需要在本次会话中完成分支切换、代码提交或仅产出实施规格。
