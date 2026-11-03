---
tags: [ng-design, udp-ui, attachment, work-item]
status: resolved
date: 2026-10-27
updated: 2026-10-28
---
# 02 — 取消上传闭环

相关：[[work-items/attachment-large-file-transfer/spec]] · [[work-items/attachment-large-file-transfer/issues/01-batched-upload]]

**What to build:** 表格及现代附件弹窗的现有取消入口立即反馈，按文件停止后续步骤并等待在途请求后清理，成功移除，失败可重试。

**Blocked by:** [[work-items/attachment-large-file-transfer/issues/01-batched-upload|01 分批切块与上传]]

**Status:** resolved

- [x] 读块、批次边界、存在性检查、缓存登记、普通及最后一块上传期间取消，立即反馈且禁止后续工作；取消优先于成功回调。
- [x] 全缓存命中亦可取消；多个文件连续取消互不覆盖，重复点击不重复清理，列表刷新不清除其他任务状态。
- [x] 可能写入后端时等待在途请求结束后按原会话清理；未写入可本地取消。清理失败保留项并提示、可重试，不恢复上传或标记成功。
- [x] 取消不登记成功新增来源；卸载或切换会话后旧任务不得写入新会话，必要时按原会话清理。
- [x] 异步行为测试覆盖现有入口及多语言反馈；真实后端最后一块后的清理在 05 验证。

## Comments

- 2026-10-28：实现位于 uploadTask.ts（按 UID 任务状态、cancelling/cancelled/cancelFailed/failedCleaned 状态机、cleanupInFlight 去重）与 Upload.tsx（Map 化 filePauseRef、retryCancel 入口、会话 generation 防护）；表格与弹窗入口经 FileCircle 现有图标触发。行为验证：uploadTask.test.cjs 19 项（含各阶段取消、最后一块取消压制成功回调、全缓存取消、并行文件独立取消、清理失败重试、列表合并不清除任务）+ Upload.integration.test.cjs 14 项（含立即显示取消中、卸载/切会话、重试入口）全部通过。自动化范围标记 resolved；真实后端清理效果归 05。
