---
tags:
  - project/deepseek-harness
  - work-item
  - stocks
status: implemented
date: 2026-09-09
updated: 2026-09-09
---

# 01 — 专用 profile 与三栏工作台骨架

相关：[[../spec]] · [[../试点方案]]

**What to build:** 用户用专用 DSH profile 启动后，浏览器打开本机 Web 页面，看到三栏工作台——左栏持仓/自选导航、中栏工作台、右栏可调整宽度的原生 Agent 会话；首次进入显示风险说明，确认后才进入工作台。布局不遮蔽或替换原生会话。

**Blocked by:** 无 — 可立即开工

**Status:** implemented

- [x] 专用 profile 启动后浏览器打开本机 DSH Web 页面，无需独立桌面应用
- [x] 页面渲染三栏布局：左栏（持仓/自选导航）、中栏（工作台）、右栏（原生 Agent 会话，可调整宽度）
- [x] 首次进入显示风险说明（不构成投资建议、行情可能延迟或错误），确认后才进入工作台
- [x] 右栏 Agent 会话与标准 DSH Web 功能一致且可用
- [x] 布局不覆盖或遮蔽原生会话（不以 `shell.overlay` 作为主工作区）
- [x] 仅监听 loopback，无 LAN 或公网访问

## Comments

- 2026-09-09：`packages/experimental/client-ui-stock-workbench` 提供三栏根布局与 `layout` 兼容服务；`stock-workbench-web-profile` 禁用标准 shell 并插入股票根。见 `.agents/notes/implemented/architecture/2026-09-09-stock-workbench-web-shell.md`。

