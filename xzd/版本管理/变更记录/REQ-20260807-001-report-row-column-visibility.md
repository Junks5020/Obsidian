---
id: REQ-20260807-001
type: requirement
status: partially-reverted
source_branch: 6.5.2-dev
target_branch: 6.5.2
source_commits:
  - 02615117a7b61ca57a8f99a8b93f8150673df576
  - 42169a88bfb64b1c8c63a28b8d8c3510079721bc
  - ad3589d8a8111cebc1e826a3208ffbb53ac2d341
target_commits:
  - b69d04ff38c7402ec231e6a4616471d753d5a644
  - 6b9c66b27aa2a3fae679e0073049be8243bf0d87
  - ed7eb1f1d84497f6f95f2f5e26298f2c6cbd72f5
  - 4b144feadfa9ef787dd53417544a61414f3574b7
related_bugs:
  - BUG-20260807-002
created: 2026-08-07
updated: 2026-08-12
---

# REQ-20260807-001：报表设计器行列隐藏

## 需求

设计器支持按行头或列头隐藏、取消隐藏，并将隐藏状态持久化到报表数据；预览、打印和 PDF 输出必须沿用设计态隐藏状态，同时与树折叠、筛选状态合并，不得互相解除隐藏。

## 需求提交

| 来源提交（6.5.2-dev） | 目标提交（6.5.2） | 用途 | 验证 |
| --- | --- | --- | --- |
| `02615117a7b61ca57a8f99a8b93f8150673df576` | `b69d04ff38c7402ec231e6a4616471d753d5a644` | 设计器菜单、物理/视觉索引、预览协调器和打印隐藏轴主体 | 专项测试、构建通过 |
| - | `4b144feadfa9ef787dd53417544a61414f3574b7` | 适配 `6.5.2` 已移除的 `udp-report-table` 依赖 | 预览协调测试通过 |
| `42169a88bfb64b1c8c63a28b8d8c3510079721bc` | `6b9c66b27aa2a3fae679e0073049be8243bf0d87` | 保存/加载状态同步及 `rowHidden`/`colHidden` 后端格式 | 专项测试通过 |
| `ad3589d8a8111cebc1e826a3208ffbb53ac2d341` | `ed7eb1f1d84497f6f95f2f5e26298f2c6cbd72f5` | 合并区域实时校验 bug 修复（需求关联修复） | 合并区域回归通过 |

### `6.5.1-dev` 至 `6.5.1`

| 来源提交（6.5.1-dev） | 目标提交（6.5.1） | 用途 | 验证 |
| --- | --- | --- | --- |
| `06bff5564d672f6fe47aba9cc510be0ea39b7671` | `5442e08a0808c88392a1c29ea1e04688d5770495` | 预览和打印隐藏行列基础 | 4 项行列隐藏测试及生产构建通过 |
| `674ed8cea477d31cab5dd71780e663cd0a4046c4` | `94654e1b8dd1a8ff5f7a6fc996539c095806b77f` | 设计器菜单、持久化、预览/打印联动 | 同上；与稳定分支树初始化语义合并 |
| `b7910adfe7ff264cef7450081fecaacf42ebeb8e` | `09bac5a0bd4d4f1bc9af70067929c2f4d3a7e6c2` | 保存/加载状态同步 | 同上 |

## 关联 Bug 修复

| Bug | 提交 | 关系 |
| --- | --- | --- |
| [[变更记录/BUG-20260807-002-row-column-hide-merge\|BUG-20260807-002]] | `ed7eb1f1d84497f6f95f2f5e26298f2c6cbd72f5` | 行列隐藏需求的后续校验修复，归入本需求 |

## 分支覆盖

| 分支 | 状态 | 实际提交 |
| --- | --- | --- |
| `6.5.2-dev` | ✅ 已验证 | `02615117a7b61ca57a8f99a8b93f8150673df576` + `42169a88bfb64b1c8c63a28b8d8c3510079721bc` + `ad3589d8a8111cebc1e826a3208ffbb53ac2d341` |
| `6.5.2` | ✅ 已同步 | `b69d04ff38c7402ec231e6a4616471d753d5a644` + `6b9c66b27aa2a3fae679e0073049be8243bf0d87` + `ed7eb1f1d84497f6f95f2f5e26298f2c6cbd72f5` + `4b144feadfa9ef787dd53417544a61414f3574b7` |
| `6.5.1-dev` | 回退 | `0fb1115e29b5388e53316b1bb68c71462c51dd90` + `3990e962ef81dd8ffa573efbbfb209ec41189d47` + `e0f228b17c951ee4b0bef475b5378dcb51a3bbd7` + `dbca13da714788cf12e5800059e060f5b4a836e6`；本地未推送 |
| `6.5.1` | 回退 | `c897825351e89f14246c5bc89b29ca7fcc1a7dad` + `d6fe9e0f67aeac09909d0d74aaec8e13d5d5a413` + `448bd9bb2393cc849304bcefcf4ca5cca501e031` + `5be9106d862147604f13f3ada7c0beba80534f91`；本地未推送 |

## 2026-08-12 回退

- 产品决定：行列隐藏不在 `6.5.1-dev` 和 `6.5.1` 实现；`6.5.2-dev`、`6.5.2` 本次不调整。
- 两个 6.5.1 分支均逆序回退隐藏基础、设计器主体和状态同步提交。
- 额外移除早期套打“预览时支持隐藏行列”配置、预览蒙层样式、`previewMask.ts` 及打印/PDF 跳过蒙层行逻辑。
- 保留 Handsontable `hiddenRows`/`hiddenColumns` 插件，因为树折叠和表头筛选仍依赖它们，不属于用户可配置的行列隐藏功能。
- 两分支各 6 项聚焦回归、Prettier、补丁检查和生产构建通过；源码搜索仅命中防回归测试正则。

## 验证

- `tests/row-column-visibility.test.ts`
- `tests/context-menu-hidden-axes.test.ts`
- `tests/preview-visibility.test.ts`
- `tests/print-hidden-axes.test.ts`
- `npm run build`
- `git diff --check`

本次未回移 `c6210ffc`/`e4e5d3b4` 的预览临时行隐藏、休眠和虚拟化回归；它们属于另一条预览需求链。
