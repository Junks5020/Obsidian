---
tags:
  - report-web
  - requirement
  - 提交追踪
status: 验证中
date: 2026-10-26
updated: 2026-10-26
---

# REQ-20261026-001 报表预览冻结同步到 7.0

## 需求与范围

用户确认将 6.5.2-dev 的报表预览冻结需求同步到 report-web 的 ljx-7.0。组件库 7.0.24 已提供冻结和布局工具，缺口位于宿主预览页。

- 新增冻结首行、冻结首列、冻结至选区和取消冻结菜单；按选区及当前冻结状态更新文案和禁用状态。
- 接入 ReportTable 运行时布局事件，按事件所属 sheet 更新布局，保留原状态不可变性。
- 保存布局时合并当前冻结、隐藏行列与既有行高列宽；监听选区的 hooks 随切换和卸载清理。
- 仅同步本需求，不扩展树操作按钮；未修改组件库、代理配置或用户已有 IDE 文件。

## 需求提交

| 提交 | 分支 | 日期 | 用途 | 验证 |
| --- | --- | --- | --- | --- |
| `3ae92771417a7d7862adf955e56b14e7424848b7` | 6.5.2-dev | 2026-10-10 | 来源：报表预览行列隐藏、冻结及十字高亮，本次取冻结和布局接入部分 | Git 确认当前 6.5.2-dev 包含；本次未验收原分支 |
| `550b55f031522adec81e3994d5cd1aac19b4ebb2` | ljx-7.0 | 2026-10-26 | 使用组件库公开 API 完成宿主功能同步 | 80 项测试、构建、浏览器操作及保存请求捕获通过；提交差异检查通过 |
| `cbb3b583047e5cf553f9894f4f93f4bafee84a22` | ljx-7.0 | 2026-10-26 | 补齐设计预览与运行时预览十字高亮开关传递 | 83 项测试、构建、浏览器开关验证及提交差异检查通过；已推送 |

## 验证

- `npm run test:architecture`：80/80 通过，新增 7 项冻结/布局回归，覆盖四种目标、动态文案与禁用状态、事件 sheet、保存字段及 hook 清理。
- `npm run build`：通过，存在项目既有包体较大的提示。
- 本次修改文件的 `git diff --check`：通过。全工作区检查发现原有 ngproxy.ini 第 19 行尾空格，本次未改动该文件。
- ego-browser 访问本地 8472 的真实预览页，报表 ID `3080000000000003`：冻结首行得到 `(1,0)`、首列 `(0,1)`、选择 E4 后冻结得到 `(3,4)`、取消得到 `(0,0)`；A1 下选区冻结禁用，未冻结时取消冻结禁用。
- 浏览器实际点击保存布局，临时拦截 `NG.request.body` 的 `saveReportLayout` 请求：`sheetKey=0`、`frozen={rowStart:3,colStart:4}`，同时保留 heights、widths、hideRows、hideCols；捕获后恢复请求方法，未写入真实后端。
- 后台持久化与重新打开后的恢复尚未验收；已按用户要求提交并推送 origin/ljx-7.0，未合并 master。提交后工作区仅保留原有 ngproxy.ini 与 .idea/ 改动。

## 分支状态

| 分支 | 角色 | 状态 | 分支内提交 | 说明 |
| --- | --- | --- | --- | --- |
| 6.5.1-dev | dev | 待关联 | - | 未核查 |
| 6.5.1 | release | 待关联 | - | 未核查 |
| 6.5.2-dev | dev | 验证中 | `3ae92771417a7d7862adf955e56b14e7424848b7` | 来源提交存在，本次未重复原分支验收 |
| 6.5.2 | release | 待关联 | - | 当前引用不包含来源提交，未核查等价实现 |
| ljx-7.0 | dev | 验证中 | `550b55f031522adec81e3994d5cd1aac19b4ebb2` | 本地实现、前端验证、提交及 origin/ljx-7.0 推送完成 |
| master | release | 待同步 | - | 未合并 |

## 关联 Bug 修复

暂无独立 Bug 提交。

本次用户已指定目标 ljx-7.0，未另行请求其他分支同步。

相关：[[../01-提交覆盖矩阵]] · [[../00-仓库与分支]]

## 2026-10-26 后续：补齐十字高亮接入（已提交并推送）

- 用户要求增加十字高亮宿主接入。7.0.24 组件库已有开关工具与渲染实现，沿用公开 `resolveCrossHairHighlight`、`applyCrossHairHighlightSetting`，未修改组件库。
- 设计预览将接口 Global.crossHairHighlight 写入每个 sheet.globalSettings；接口未返回时回退到设计 globalProperty。运行时预览采用接口 Global.crossHairHighlight；缺失时保留各 sheet 原值。
- 接口显式关闭值 0 优先，支持数字和字符串 0/1；失败响应不改写。
- 新增 tests/preview-cross-hair.test.cjs 并纳入 test:architecture：83/83 通过。npm run build 通过，本次修改文件 git diff --check 通过。
- ego-browser 临时包装当前页 NG.request.body，仅给 getReportData 成功响应注入本地开关，不写后台。开启后点击 E4：A4 与 E1 带 htCrossHair，A1 不带；关闭并重新查询后 htCrossHair 数量为 0。验证的是响应开关流转和 DOM 高亮标记，未做颜色截图验收或后台配置保存验收。
- 冻结部分提交为 550b55f031522adec81e3994d5cd1aac19b4ebb2；十字高亮变更独立提交为 cbb3b583047e5cf553f9894f4f93f4bafee84a22，已按用户要求推送到 origin/ljx-7.0，ls-remote 确认远端提交与本地一致。未合并 master。
