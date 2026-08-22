---
tags:
  - ng-design
  - commit-tracking
  - requirement
  - report-table
status: active
date: 2026-08-21
updated: 2026-08-21
---

# 财税表达式自定义编辑入口

## Request

- 财税单元格的表达式按钮不再打开组件内置表达式弹窗。
- 对外暴露按钮渲染内容以及回填回调，由业务方提供自己的编辑交互。
- 回调写回时同步更新选中单元格的表达式数据和右侧属性面板的表达式文本域。
- 文档示例提供一个包含输入框的财税表达式弹窗，确认后完成双向回填。

## Scope

- `DesignReportTable` 公共属性与类型导出。
- 财税单元格表达式按钮的自定义渲染上下文。
- 财税表达式的单元格与表单同步写回。
- Dumi 财税表达式弹窗示例与 API 文档。
- 公共边界与示例回归测试。

本需求保持“财税单元格”的独立领域身份，只复用表达式字段的保存与编辑语义，不引入公式解析或实时计算能力，符合 [[../../xzd/版本管理/report-table-ADR-0008-第一阶段不实现公式引擎]]。

## Requirement Commits

| Commit | Branch | Date | Purpose | Validation |
| --- | --- | --- | --- | --- |

当前实现位于 `ljx-7.0` 工作区，尚未创建提交，因此没有可登记的提交哈希；提交后需补充本表并更新覆盖矩阵。

## Related Bug Fixes

暂无。

## Branch Matrix

| Branch | Status | Commit | Verification | Notes |
| --- | --- | --- | --- | --- |
| `sync_branch` | 不适用 | - | - | 本次未在该分支形成提交 |
| `ljx-7.0` | 待关联 | - | 测试、组件构建和浏览器交互验证通过 | 工作区实现尚未提交 |
| `ljx-6.5.2` | 不适用 | - | - | 未纳入本次范围 |
| `6.5.2` | 不适用 | - | - | 未纳入本次范围 |

## Validation

- `node --test packages/@newgrand/udp-report-table/tests/feature-sync.test.cjs packages/@newgrand/udp-report-table/tests/udp-report-table-boundaries.test.cjs tests/report-api-demo.test.cjs tests/docs-navigation.test.cjs`：65 项通过。
- `npm run build --prefix packages/@newgrand/udp-report-table`：ESM、CJS 和类型声明构建通过。
- 浏览器验证：财税按钮打开业务自定义弹窗；内置表达式弹窗不打开；确认后表达式文本域和 A1 单元格同步显示 `FINANCE_TAX_RECHECK()`。
- 浏览器控制台未出现 `financeTax`、`renderFinanceTaxExpressionButton` 非法 DOM 属性警告，也未出现 Modal 废弃属性警告。
- `git diff --check` 通过，仅有工作区换行符提示。
- 直接运行 TypeScript 4.9.5 的 `tsc --noEmit` 会被 `@types/d3-dispatch@3.0.7` 的 const 类型参数语法阻塞；以 Father 包构建的声明产物作为当前工具链下的类型验证信号。

Related: [[../01-提交覆盖矩阵]]
