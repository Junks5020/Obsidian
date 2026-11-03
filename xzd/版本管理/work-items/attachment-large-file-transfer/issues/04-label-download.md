---
tags: [ng-design, udp-ui, attachment, work-item]
status: needs-info
date: 2026-10-27
updated: 2026-10-27
---
# 04 — 独立标签附件大文件直下

相关：[[work-items/attachment-large-file-transfer/spec]] · [[work-items/attachment-large-file-transfer/issues/03-table-form-download]]

**What to build:** 独立标签附件复用大文件判定和浏览器下载能力，保留水印、文件名、会话和下载记录语义。

**Blocked by:** [[work-items/attachment-large-file-transfer/issues/03-table-form-download|03 表格与表单大文件直下]]

**Status:** needs-info

- [x] 普通大文件由浏览器下载，小文件和大小未知保留原分块或水印下载流程。
- [x] 文件标识、会话、业务类型、组织及 `uCode` 使用当前实例；成功触发记录一次，失败不记录成功。
- [x] 保持 DOC、DOCX、PDF 既有水印适用条件，水印大文件请求 `wmDisabled: '0'` 的浏览器下载链接；用户已确认后端返回带水印结果，不静默下载原文件。
- [x] 多实例和失败路径通过行为测试；端到端实际文件名与内容回归仍归 05。水印链接能力依据用户确认解除阻塞，不记作本轮亲测。

## Comments

- 最新用户要求大文件直接浏览器请求文件 GET，不再获取 URL；本轮尚未修改独立标签附件，其大文件仍调用 `downloadDataReturnUrl`。标签附件现有水印使用分块接口，是否可复用表格完整文件水印接口 `/FilePreviewService/reactAttach/download` 尚未确认；禁止静默降级至原件。标签直连与鉴权仍需核实并实现，先前 resolved 状态已撤销。

- 2026-10-27：普通大文件链接流程及模拟行为测试已实现；现有代码没有可确认的独立标签水印浏览器下载 URL 契约，水印大文件明确提示不可用，等待真实后端契约和验收。该项尚未完成。
- 2026-10-27：独立审查确认当前超过 100 MiB 且开启水印的 DOC、DOCX、PDF 无法下载；这是为避免无水印降级而保留的明确阻塞，不能将本项或整体标为完成。需要能返回水印文件浏览器下载链接的后端契约及实际样本。
- 2026-10-27（用户补充确认，取代上述阻塞依据）：用户确认后端链接下载得到的文件已含水印。撤销“标签水印直链能力未确认”的阻塞，重新领取本任务；删除前端大文件水印拦截，按现有水印条件传 `wmDisabled: '0'`，继续保持链接失败不回退文件流。验证沿用既有标签下载行为测试，观察服务参数、浏览器点击、下载记录及文件块/Blob 使用；后端水印能力来源为用户确认，不记为本轮亲测。
- 2026-10-27（补齐实现并验证）：`NGLabelAttachment.tsx` 统一计算 DOC/DOCX/PDF 的 `needWaterMark`，移除 >100 MiB 水印拦截，URL 请求传 `wmDisabled: needWaterMark ? '0' : '1'`，小文件继续使用原分块水印流程；删除无调用方的“水印下载暂不可用”提示键。`node --test packages/@newgrand/udp-ui/src/businessComponent/attachment/labelDownload.behavior.test.cjs` 先红后绿：旧实现报“watermarked large files must request a browser download link”（actual 2 / expected 3，退出码 1），修复后退出码 0。扩展脚本覆盖 DOC/DOCX/PDF（含大小写扩展名）、数值/字符串开关、150 MiB 数字字符串、非适用格式、失败/非法链接/异常无点击无日志无回退、两实例参数隔离、权限拒绝、阈值及未知大小的小文件水印内容拼接；大文件不请求任何文件块且不构造 Blob。附件全量回归 54 项、udp-ui 构建（329 文件）、三处修改的 Prettier 及 `git diff --check` 均退出 0，完整命令和日志位置见 05。前端实现范围标记 resolved，整体仍待 05 的现场验收；未提交、发包或部署。
