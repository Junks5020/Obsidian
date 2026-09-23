---
tags:
  - project/deepseek-harness
  - work-item
  - stocks
status: implemented
date: 2026-09-09
updated: 2026-09-17
---

# 05 — 单供应商真实行情 Adapter

相关：[[../spec]] · [[../试点方案]] · [[../../../research/2026-09-17-国内行情供应商]]

**What to build:** 工作台用独立实现的东方财富公开行情 Adapter 提供 A 股/港股搜索、报价、日/周 K 线、行业、新闻/公告元数据与 HKD/CNH 汇率；限流、缓存、字段映射和错误转换封装在 Adapter 内，数据始终标注来源、时间与延迟/过期状态。不使用 dsh-trading 代码。不接腾讯热备、不接券商、不接 Tushare，直到单独开第二家供应商。

**Blocked by:** 04

**Status:** implemented

- [x] 单一公开行情 Adapter：东方财富，无 API Key
- [x] Adapter 实现 A 股/港股的搜索、报价、日/周 K 线、行业、新闻或公告元数据与港币兑离岸人民币
- [x] 限流、上次成功报价缓存、字段映射、错误转换封装在 Adapter 内
- [x] 数据始终显示来源、更新时间和延迟/过期状态
- [x] 缓存的旧价标为 rate-limited 或 stale，不标为 fresh
- [x] 无供应商 Key；不接券商 OpenAPI

## Comments

- 2026-09-09：阶段0尚未完成；不得在此之前接入或宣称支持真实行情供应商、公开网页接口或生产 Key。票据04仅使用模拟数据。
- 2026-09-17：阶段0改为独立实现东方财富公开 JSON。不抄 dsh-trading。缺少的基本面字段保持空并走未分类/待核验。票据06因此解除阶段0阻塞。
