---
tags: [ng-design, udp-report-table, bug, commit-tracking]
status: 验证中
date: 2026-10-20
updated: 2026-10-20
---

# 编辑文本后切换单元格导致两个单元格串改

- 来源分支：`ljx-7.0`
- 来源提交：`7802f56919f56e0928a8101abcf852abd10c5eb0`
- 提交标题：`fix(report-table): 修复编辑文本后切换单元格串改内容`
- 现象：选中 C3，在右侧文本内容输入后点击 D3，两个单元格都变成输入值。
- 根因：NGForm 的页面级 onValuesChange 经 requestIdleCallback 延迟发布，消费时使用了切换后的选中坐标。
- 修复：右侧属性面板通过所属 NGForm 的直接 onValuesChange 回调绑定编辑单元格；合并原元数据和表单字段以保留未显示字段，异步校验完成后仍回写原编辑单元格。
- 范围：`rightCellProperties/index.tsx`、`rightCellProperties/xtypes/CellFormMain.tsx`；原有 ngproxy.ini 改动未提交。
- 需求关联：未发现直接匹配的需求记录，按独立 Bug 登记。

## 验证

- 修复前浏览器已复现双格写入，并运行失败断言。
- 修复后浏览器验证：目标为空、目标已有值、表格直接输入后切换，均不串改；D6 为编辑内容，E6 保持原有内容。
- `node --test packages/@newgrand/udp-report-table/tests/finance-tax-cell-data-type.test.cjs packages/@newgrand/udp-report-table/tests/report-table-api.test.cjs packages/@newgrand/udp-report-table/tests/udp-report-table-boundaries.test.cjs`：53/53。
- 包目录 `npm run build` 成功；`git diff --check` 通过；提交前 lint-staged / Prettier 成功。
- 未推送、未发包、未验证后端保存重载。

## 分支覆盖

| 分支 | 状态 | 提交 | 说明 |
| --- | --- | --- | --- |
| sync_branch | 待关联 | - | 未指定同步，尚未审计适用性 |
| ljx-7.0 | 验证中 | 7802f56919f56e0928a8101abcf852abd10c5eb0 | 本地浏览器、测试和构建通过，未推送发包 |
| ljx-6.5.2 | 待关联 | - | 未指定同步，尚未审计适用性 |
| 6.5.2 | 待关联 | - | 未指定同步，尚未审计适用性 |
| ljx-6.5.1 | 待关联 | - | 未指定同步，尚未审计适用性 |
| 6.5.1 | 待关联 | - | 未指定同步，尚未审计适用性 |

同步范围待用户指定；尚未执行其他分支同步。

相关：[[../00-仓库与分支]] · [[../01-提交覆盖矩阵]] · [[../../../xzd/版本管理/00-版本总览]]
