---
tags:
  - project/deepseek-harness
  - work-item
  - stocks
status: ready-for-agent
date: 2026-09-09
updated: 2026-09-09
---

# 04 — 标的详情与自选（模拟行情）

相关：[[../spec]] · [[../试点方案]]

**What to build:** 用户点选持仓或自选后，中栏切换为标的详情，查看最新价、日/周 K 线、基础指标、基本面、新闻与公告（标题、来源、时间、原始链接）；自选可维护但不计入资产与风险。此阶段用模拟数据实现单一 `MarketData` interface，数据始终标注来源、更新时间与过期状态。

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] 定义单一 `MarketData` interface（search / quote / series / instrumentFacts / marketStatus），以模拟数据实现，不引入多供应商公开 seam
- [ ] 点选持仓或自选，中栏切换为标的详情：最新价、日/周 K 线、基础指标
- [ ] 详情显示基本面、新闻、公告的标题、来源、时间和原始链接
- [ ] 自选列表可维护，但自选不计入资产与风险
- [ ] 可见数据默认 15 秒刷新，离开页面暂停，可手动刷新
- [ ] 行情延迟、过期、失败或限流均有明确状态，不把旧价当新价
- [ ] 无法取得行业分类的证券显示为「未分类」

## Comments

