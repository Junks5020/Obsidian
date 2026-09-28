---
tags:
  - project/deepseek-harness
  - work-item
  - stocks
status: implemented
date: 2026-09-09
updated: 2026-09-24
---

# 06 — 风险汇总与集中度

相关：[[../spec]] · [[../试点方案]]

**What to build:** 中栏资产总览按市场、币种、行业和单标的显示集中度与估算浮盈亏，CNY/HKD 折算保留港币原币金额与汇率日期，现金作为独立类别；同一市场+代码的跨账户持仓合并，A 股与港股同一发行人的证券分开；用户自设规则在工作台打开时显示触发状态与事实依据，汇率或价格过期时不据此更新依赖实时价格的规则结果。

**Blocked by:** 02, 05

**Status:** implemented — `stock-risk-summary` Host 服务与 `client-ui-stock-risk-summary` 总览面板已实现；设计依据见仓库 Agent Note `2026-09-24-stock-risk-summary-concentration-rules`。

- [x] 资产总览按市场、币种、行业、单标的显示集中度
- [x] 同一市场+代码的跨账户持仓合并计算单标的集中度
- [x] A 股与港股同一发行人的不同证券分开显示
- [x] 港股折算人民币计入总资产，同时保留港币原币金额与汇率日期
- [x] 现金作为独立类别，不计入证券集中度分母
- [x] 显示估算浮盈亏
- [x] 用户可创建集中度、相对成本跌幅、价格规则；工作台打开时显示已触发规则及事实依据
- [x] 汇率或价格过期时保留上次成功值，且不据此更新依赖实时价格的规则结果

## Comments

- 2026-09-09：票据05在阶段0完成前不可实施；因此本票据不能进入实现。
- 2026-09-17：阶段0完成；票据05已实现。本票据不再被阶段0阻塞。
- 2026-09-24：实现完成。新 Host 包 `stock-risk-summary`（`ctx.riskSummary`，注入 portfolioLedger + marketData）与浏览器包 `client-ui-stock-risk-summary`（占用 shell 新增的 `stock.risk-overview` slot）。规则持久化使用独立 DPAPI 信封；`fresh`/`delayed` 之外的输入保留上次成功值并冻结依赖实时价格的规则结论。
