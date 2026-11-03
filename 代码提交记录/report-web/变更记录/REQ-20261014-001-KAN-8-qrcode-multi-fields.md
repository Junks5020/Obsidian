---
tags:
  - report-web
  - requirement
  - 二维码
  - 提交追踪
status: 验证中
date: 2026-10-14
updated: 2026-10-14
---

# REQ-20261014-001 KAN-8 二维码多字段展示合并

## 需求与范围

- Jira：[KAN-8](https://jinxuliu695.atlassian.net/browse/KAN-8)，需求编号 `R-260612-000002`。
- 本次请求：将本地 `feature/KAN-8-qrcode-multi-fields` 合并到 `6.5.2-dev`。
- 实现范围：二维码追加展示字段的选择、排序、格式化、上限、字段失效校验，以及单元格加载、复制、保存的元数据处理。
- 本次保持功能分支实现：主字段仍在 `cellData`，追加字段保存在单元格顶层 `cellDataEx`，数组顺序表示追加顺序；追加字段上限为 8。
- 基线为 `3ae92771417a7d7862adf955e56b14e7424848b7`；合并前目标分支为 `35dfebb726b931633ae1df8b1d9b052bd097502b`。
- 合并在临时独立工作树完成，无冲突，未改动现有 `6.5.2`、`ljx-7.0` 工作区，未推送。

## 需求提交

| 提交 | 分支 | 日期 | 用途 | 验证 |
| --- | --- | --- | --- | --- |
| `fd79541d719d23e08e3154bab2ce8de2f0c1a3c8` | `feature/KAN-8-qrcode-multi-fields`，现已包含于 `6.5.2-dev` | 2026-10-10 | 二维码支持追加多个展示字段；包含格式化弹层稳定性修复 | Jira 评论记录此前一轮 e2e 和定向测试通过；本次在合并结果上重新执行下列回归验证 |
| `16efea6e82bdd681dd947e3ddb82e34af92e0758` | `6.5.2-dev` | 2026-10-14 | 合并 KAN-8 功能分支，保留目标分支后续更新 | 本次定向测试、构建、格式和差异检查通过 |

## 验证

- `tests/qr-extra-fields.test.ts`：通过，覆盖字段选择、顺序、8 项上限、类型对应格式、小数位、联动清理、字段失效和序列化回读。
- `tests/right-cell-dataset-source.test.ts`、`tests/print-dataset-field-code.test.ts`：通过。
- `node --test tests/cell-form-tab-i18n.test.cjs tests/print-manager-i18n.test.cjs tests/table-manager-i18n.test.cjs tests/ng-imports.test.cjs`：25/25 通过。
- `tests/query-date-default-value.test.ts`：直接在 Node 中执行会加载依赖 `window` 的浏览器 SDK；确认此测试及相关模块与合并前无差异后，用临时加载器仅替换 SDK 的 `NG.getLang`，原测试全部断言通过。未改动测试或业务代码。
- `npm run build`：通过，Webpack 编译及产物生成成功；构建提示包体较大。
- Prettier：18 个合并文件的 Git 暂存内容全部通过。新工作树的 CRLF 检出换行由 `core.autocrlf=true` 造成，按暂存内容检查避免把检出换行差异混入合并。
- `git diff --cached --check`、提交后 `git diff HEAD^1 HEAD --check`：通过。
- `git merge-base --is-ancestor fd79541d719d23e08e3154bab2ce8de2f0c1a3c8 6.5.2-dev`：通过。合并父提交分别为 `35dfebb726b931633ae1df8b1d9b052bd097502b` 与 `fd79541d719d23e08e3154bab2ce8de2f0c1a3c8`。
- 本次未重新进行浏览器 e2e、全量 TypeScript 检查或真实后端二维码/打印/PDF 验收。

## 分支状态

| 分支 | 角色 | 状态 | 分支内提交 | 说明 |
| --- | --- | --- | --- | --- |
| `6.5.1-dev` | dev | 待关联 | - | 本次未指定同步 |
| `6.5.1` | release | 待关联 | - | 本次未指定同步 |
| `6.5.2-dev` | dev | 验证中 | `16efea6e82bdd681dd947e3ddb82e34af92e0758` | 本地合并及定向验证完成，未推送，等待后端与发布验收 |
| `6.5.2` | release | 待同步 | - | 本次未合并至发布分支 |

## 关联 Bug 修复

| Bug | 提交 | 分支 | 关系 |
| --- | --- | --- | --- |
| - | - | - | 格式化弹层修复已包含在原实现提交，暂无独立 Bug 提交 |

## 后续

- 第一阶段完成本地 `6.5.2-dev` 合并，保留功能分支，未推送、发布。
- 2026-10-14 后续已按用户请求，以 `ng-design:ljx-7.0` 提交 `87e2743a7a729a7888f4f6bb6b43b47e508089e7` 功能型同步到 `udp-report-table`。该提交不在 report-web 仓库，详见 [[../../ng-design/变更记录/REQ-20261014-002-KAN-8-qrcode-multi-fields]]；未推送或发包。
- Jira 原评论的 RMB 小数位输入框、按字段类型限制格式选项仍待业务确认。
- 后端二维码生成及打印/PDF 验收仍需真实联调，不能据本次前端测试将 KAN-8 标为全部完成。

相关：[[../01-提交覆盖矩阵]] · [[../00-仓库与分支]] · [[../../../xzd/版本管理/report-web-二维码多字段追加执行计划-20260825]]
