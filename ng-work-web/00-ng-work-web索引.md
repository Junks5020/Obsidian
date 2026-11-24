---
tags:
  - ng-work-web
  - 索引
status: active
date: 2026-10-20
updated: 2026-11-17
---

# ng-work-web 索引

相关：[[2026-10-20-robot接口前缀对照]]

## 领域

- [[ng-work-web-术语表]]：区分意图配置、意图配置管理、实际查单，以及表单查询／问数查询意图、内置意图、页面草稿与落库保存。

## 工作流

- [[ng-work-web-Agent工作流配置]]：个人本地 Markdown 任务跟踪、默认分类标签及领域文档约定。

## 工作项

- [[work-items/intent-config-webmcp/spec|意图配置管理页只读 WebMCP]]：四个只读工具、页面同步、权限与测试验收；01–04 均已完成并完成真机浏览器验证。

- [[work-items/intent-config-webmcp/issues/01-active-page-context|01 读取活动页面上下文]]：已完成（`done`）。
- [[work-items/intent-config-webmcp/issues/02-list-query-intents|02 查询意图配置并同步页面]]：已完成（`done`）。
- [[work-items/intent-config-webmcp/issues/03-get-query-intent|03 读取受权限约束的配置详情]]：已完成（`done`）。
- [[work-items/intent-config-webmcp/issues/04-open-readonly-intent|04 打开真正只读的配置详情]]：已完成（`done`）。

- [[work-items/intent-editor-webmcp/spec|意图配置编辑页 WebMCP]]：编辑／新增／复制／查看页的 6 个 WebMCP 工具、非阻塞清空保护、两阶段保存与跨页签互斥；01–05 均已完成并通过测试与真机浏览器验证。
- [[work-items/intent-editor-webmcp/issues/01-editor-context-and-tab-isolation|01 编辑页上下文读取与跨页签互斥注册]]：已完成（`done`）。
- [[work-items/intent-editor-webmcp/issues/02-config-options-lookup|02 配置候选与元数据只读检索]]：已完成（`done`）。
- [[work-items/intent-editor-webmcp/issues/03-draft-editing-tools|03 提问设置、参数表与功能样式草稿修改工具]]：已完成（`done`）。
- [[work-items/intent-editor-webmcp/issues/04-save-intent-config|04 两阶段校验与确认落库保存工具]]：已完成（`done`）。
- [[work-items/intent-editor-webmcp/issues/05-integration-tests-and-browser-e2e|05 编辑页 WebMCP 自动化集成测试与真实浏览器验证]]：已完成（`done`）。

## 接口

- [[2026-10-20-robot接口前缀对照]]：`micro-apps/robot` 请求统一加 `/n-work` 前缀，含修改前后对照。
