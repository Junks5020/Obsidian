---
tags: [ng-design, udp-ui, attachment, work-item]
status: resolved
date: 2026-10-27
updated: 2026-10-27
---
# 03 — 表格与表单大文件直下

相关：[[work-items/attachment-large-file-transfer/spec]] · [[work-items/attachment-large-file-transfer/issues/04-label-download]]

**What to build:** 表格及表单直接单文件下载严格超过 104857600 字节时由浏览器接管，不渲染组件进度，其他文件和既有配置保持兼容。

**Blocked by:** None — can start immediately

**Status:** resolved

- [x] 合法数字和数字字符串正确比较；阈值前一字节、阈值、后一字节、150 MiB 和缺失/非法值符合规格；原 `downloadMethod='1'` 继续生效。
- [x] 大文件获取 URL 后触发浏览器下载，不请求完整文件数据、不构造文件 Blob、不更新组件进度；链接失败或无效时提示，不回退或记成功。
- [x] 保留逐条权限与下载前业务校验、来源/工作流会话、水印、编辑标识、文件名、下载记录及实例 `uCode`；拒绝时不获取链接。
- [x] 混合大小多选逐个选择正确路径，校验和记录不重复；行为测试覆盖，浏览器触发不宣称下载完成。
- [x] 对外 API 无新增必填参数，小文件和未知大小沿原路径。

## Comments

- 用户调整方案：大于 104857600 字节时不调用 `downloadDataReturnUrl`，而由浏览器直接请求文件 GET；≤阈值/未知大小保留原行为，包括 `downloadMethod='1'`。本轮修改 `api/baseApi.tsx`：普通文件使用 `/JFileSrv/reactAttach/download`，水印文件沿用文件流现有路由 `/FilePreviewService/reactAttach/download`。保留参数、权限和校验；原生点击仅表示发起，不保证请求成功。回归 57 项及 udp-ui 构建通过；本地直接下载能否使用 cookie/代理完成鉴权尚未验证，XHR 的 `dbToken`/Authorization 不会自动附加到 a 链接，此项为集成风险。完整日志见系统临时目录 `attachment-direct-tests.log` / `attachment-direct-build.log`。

- 2026-10-27：`node --test` 运行 `downloadStrategy.test.cjs` 与 `download.behavior.test.cjs` 通过；使用模拟服务与 DOM，覆盖真实公共 API 和 Toolbar handler。真实浏览器、服务端鉴权和水印内容由 05 验证；整体尚未构建或交付。
