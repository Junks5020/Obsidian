---
tags: [ng-design, udp-ui, attachment, work-item]
status: resolved
date: 2026-10-27
updated: 2026-10-28
---
# 01 — 分批切块与上传

相关：[[work-items/attachment-large-file-transfer/spec]] · [[work-items/attachment-large-file-transfer/issues/02-cancel-upload]]

**What to build:** 1 MiB 文件块每批最多 10 个，准备、检查缓存并登记或逐块上传完当前批后再准备下一批，保留多文件并行和现有接口。

**Blocked by:** None — can start immediately

**Status:** resolved

- [x] 25 块按 10+10+5 检查，第 11 块准备前首批已上传或登记；批内结果使用正确全局序号。
- [x] 全未命中、全命中、部分命中及尾块均正确完成，无重复遗漏或覆盖；同文件串行且只保留本批引用。
- [x] 固定文件、会话、分类、业务参数和 `uCode`；成功登记/上传才计进度，全部成功后只执行一次成功回调。
- [x] 读取、MD5、检查、登记或上传失败停止该文件并反馈；读取 Promise 正确收尾，其他文件继续。
- [x] 使用可控异步行为测试覆盖上述情况及原调用兼容，先确认回归用例暴露旧行为。

## Comments

- 2026-10-27：此前 25 块旧代码隔离探针确认首个上传需等待全部 MD5；`node --test` 执行 uploadTask 和真实 Upload React 组件模拟服务测试共 12 项通过，覆盖批次、缓存索引、尾块、失败及并发文件；测试为模拟 DOM 与服务，真实浏览器、后端和构建由 05 验证。
- 2026-10-27：独立复审发现分块已写入后发生上传失败时，失败项被移除且服务端分块可能残留；另发现预校验期间 A→B→A 切换可恢复过期任务。重新领取并修复，完成后需重跑验证。
- 2026-10-28：复审两项已修复并重跑验证：失败后清理路径见 uploadTask.ts（failure → mayHaveWritten 时按原会话 finishCancel）及集成用例「partial upload failure cleans backend and retains a dismissible failure row」；A→B→A 防护见 Upload.tsx generation 快照及用例「A to B to A session changes invalidate pending file validation」「A to B to A does not allow an old batch to refresh the restored session」。uploadTask 19 项 + Upload 集成 14 项全部通过，udp-ui 构建成功，标记 resolved。
