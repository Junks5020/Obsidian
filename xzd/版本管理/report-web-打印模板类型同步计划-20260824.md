---
tags:
  - report-web
  - 需求同步
  - 打印模板
status: committed
date: 2026-08-24
updated: 2026-08-24
source_branch: 6.5.2-dev
target_branch: 6.5.1-dev
---

# report-web 打印模板类型同步计划

将 `report-web:6.5.2-dev` 的打印模板类型能力完整同步到 `report-web:6.5.1-dev`，以来源分支的最终可观察行为和接口字段契约作为验收基线。

相关：[[report-web-术语表]] · [[00-版本总览]] · [[../../代码提交记录/report-web/变更记录/REQ-20260824-002-打印模板类型同步]]

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
- 复制流程严格保持 `6.5.2-dev` 现状：复制“用户_APP展示”模板时，表单默认值覆盖原记录的类型相关字段，复制结果回到“用户”类型；本次不额外修复该行为。
- 不增加来源分支之外的旧数据兼容逻辑：列表中缺失或为空的 `templateType` 按现有渲染逻辑展示为“用户”，编辑和详情直接消费接口返回值；接口负责提供与 `6.5.2-dev` 一致的字段契约。
- 验证范围包括：补充聚焦自动化测试覆盖类型列文案映射、两种类型的表单显隐、保存前不适用字段归零，以及 `previewEditStatus` 未被重新引入；执行聚焦测试、变更文件格式检查和生产构建。人工页面验收作为交付清单，不以当前环境必须连通后端为前提。
- 初次交付按约定保留未提交变更；用户随后明确要求提交，因此仅提交四个本次变更文件，仍不推送远端。

## 已查证代码事实

- `6.5.1-dev` 已存在 `templateType` 表单项和列表列，但用户_APP选项被隐藏，且缺少 `defaultTemplate`、类型联动显示和保存前字段归零，因此属于半套实现。
- 来源功能提交为 `3078a79abf10aae5f9a2ccbcced26ed69b8c3e7c`（“增加套打模板的用户APP类型”），只修改打印模板列表列、抽屉保存规整和表单配置三个文件。
- 两分支的接口封装地址与调用方式没有差异：列表 `/reportcenter/printManage/pagePrint`、保存 `/reportcenter/printManage/savePrint`、详情 `/reportcenter/printManage/getPrint`。字段由列表响应直接消费，保存表单值经规整后直接提交。
- 当前工作树检出 `6.5.2-dev`，并有用户未提交的 `.umirc.ts` 修改；实施时不得覆盖或夹带该修改。

## 实施状态

- 2026-08-24：用户已确认共享理解，开始在 `6.5.1-dev` 实施。
- 2026-08-24：已在工作树 `C:\Users\jinxu\workspace\xzd\report-web.worktrees\sync-6.5.1-dev` 完成实现和自动化验证。
- 2026-08-24：按用户要求提交为 `b68e3f331296c486cb85cfaf6e884ebee6108de1`（`fix：同步打印模板类型`），未推送。

## 实施结果

- 业务变更限定为 `columnOptions.tsx`、`tableDrawer.tsx`、`formCfg.ts` 三个白名单文件；测试变更限定为 `tests/print-manager-list.test.ts`。
- 列表类型文案、表单类型选项、`defaultTemplate` 默认值、类型联动显隐及保存前字段归零已与 `6.5.2-dev` 对齐。
- `previewEditStatus` 未重新引入；复制和旧数据行为未增加来源分支之外的兼容处理。
- 主工作树 `6.5.2-dev` 的 `.umirc.ts` 已恢复；目标工作树原有 `.umirc.ts`、`ngproxy.ini`、`.idea/` 变更未被修改或纳入本次功能差异。

## 验证结果

- `npx tsx tests/print-manager-list.test.ts`：通过。
- 四个变更文件 `npx prettier --check`：通过。
- `npm run build`：通过，Webpack 在约 1.15 分钟内成功编译。
- 四个变更文件 `git diff --check`：通过，仅输出 Git 的 LF/CRLF 工作树提示。
- 目标工作树开发服务已在 `http://localhost:8473` 编译并启动；只读 HTTP 请求返回 `200` 和 HTML。
- 浏览器业务冒烟未完成：当前 Chrome 扩展以 `ERR_BLOCKED_BY_CLIENT` 阻止本地地址，内置浏览器不可用；因此仍按下方人工验收清单完成后端联调场景。

## 人工验收清单

- 新增打印模板时，“类型”提供“用户”和“用户_APP展示”两个选项。
- 选择“用户_APP展示”时展示“默认模板”，隐藏“直接预览”和“导出权限”；选择“用户”时显示规则相反。
- 列表分别将 `templateType=0` 和 `templateType=1` 展示为“用户”和“用户_APP展示”。
- 保存“用户_APP展示”模板时确认请求中的 `directPreviewStatus`、`exportAuth` 为 `0`；保存“用户”模板时确认 `defaultTemplate` 为 `0`。
- 编辑、详情和复制路径按已确认的 `6.5.2-dev` 现有行为回填和展示。
