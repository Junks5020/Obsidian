---
id: "BUG-20261014-001"
type: bug
status: completed
commit: "7b65f3065"
source_branch: "ng-design:ljx-7.0"
created: "2026-10-14"
target_versions:
  - "7.0"
tags:
  - version-change
  - bug
  - report-table
---

# BUG-20261014-001：报表/打印模板保存 loading 断裂

## 问题与修复

- 问题现象：报表设计器点击顶部保存后，loading 转一会儿就消失，隔一段（保存请求期间）才弹出"保存成功"确定弹窗，中间存在无反馈空档。
- 根因：`udp-report-table` 设计器 `handleClick` 中 `updateHotLoading` 只覆盖 `handleUpdateDataSetList` 的数据集字段检查；真正耗时的 `saveReportData`/`savePrintData` 请求全程无 loading，请求返回后才 `reportAlert('保存成功')`。
- 修复内容：保存类流程（`table_save`/`print_save`）从点击起持续 loading：`handleClick` 对保存流程包 try/finally 兜底；`handleUpdateDataSetList` 增加 `keepLoading` 参数避免中途关闭；`handleSaveReportData`/`handleSavePrintData` 增加可选 `stopLoading` 回调，在保存响应到达时（结果弹窗显示之前）结束 loading，异常路径同样结束。预览/导出/计算流程行为不变。
- 影响范围：`@newgrand/udp-report-table` 设计器保存与打印模板保存；宿主 report-web 未改动（走库内默认流程，未传 `apiExecutor`）。图表设计（report-web SimpleTableManager 自带保存代码）确认存在同类"全程无 loading"问题，本次明确不修，留作后续独立改动。

## Git 信息

- Commit：`7b65f3065`
- 分支：`ng-design:ljx-7.0`（worktree `ng-design.worktrees/sync_branch`）
- 合并方式：直接提交于 `ljx-7.0`，未推送；发版走既有 ljx-7.0 → master → lerna publish 流程（下一个版本 ≥7.0.23）

## 版本同步

| 版本名称 | 是否需要同步 | 当前状态 | 合入 Commit | 验证结果 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 7.0 | 是 | 已提交未发布 | `7b65f3065` | 待用户测试环境验证 | 发布后 report-web 需将依赖升至 `~7.0.23`+ |

## 验证

- 验证项：`tests/design-save-loading-continuity.test.cjs`（响应到达即 stopLoading、早于结果弹窗；失败/异常路径结束 loading；兼容无参调用；index wiring），修复前 6/7 红、修复后 7/7 绿；包内全部 180 项测试通过；`father build` 通过。
- 结果：自动化通过；用户在测试开发环境手工验证 loading 连续性与弹窗时序（待进行）。

相关：[[report-table-ADR-0011-报表设计流程宿主执行器接管]] · [[00-版本总览]]
