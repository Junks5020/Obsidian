---
tags: [ng-design, udp-ui, attachment, work-item]
status: ready-for-agent
date: 2026-10-27
updated: 2026-10-28
---
# 05 — 完整验收与交付记录

相关：[[work-items/attachment-large-file-transfer/spec]] · [[research/2026-10-26-ng-design-udp-ui-大文件附件上传下载取消核查]]

**What to build:** 对全部行为及入口完成自动化、构建、浏览器和后端验收，记录证据、阻塞和真实交付状态。

**Blocked by:** [[work-items/attachment-large-file-transfer/issues/02-cancel-upload|02 取消上传闭环]] · [[work-items/attachment-large-file-transfer/issues/03-table-form-download|03 表格与表单大文件直下]] · [[work-items/attachment-large-file-transfer/issues/04-label-download|04 独立标签附件大文件直下]]

**Status:** ready-for-agent

- [x] 各任务行为测试、udp-ui 构建和差异格式检查通过，记录实际命令与结果。
- [ ] 真实浏览器及限速网络用真实大文件验证首批上传时机、取消反馈及下载，覆盖表格、现代弹窗、表单直接下载和独立标签。
- [ ] 后端核实取消后文件块和附件记录，特别是最后一块上传及缓存登记期间；标签水印 URL 能力及返回文件含水印已由用户确认，不再作为未确认能力阻塞，取消清理仍待真实后端验收。
- [ ] 回归权限、业务校验、水印、文件名、下载记录、多文件状态和既有小文件路径。
- [ ] 记录证据、失败及环境限制；仅全部验收通过标记完成，缺浏览器或后端证据保留对应集成阻塞。

## Comments

- 最新变更：用户要求大文件浏览器直接请求文件 GET，不再先请求下载链接。表格/表单 `api/baseApi.tsx` 已调整：大文件优先直连、≤阈值或未知大小保留 `downloadMethod='1'` 与原文件流路径；水印路由沿用现有公共文件流地址。新行为红测证明原实现仍请求链接，修正后 `node --test packages/@newgrand/udp-ui/src/businessComponent/attachment/components/*.test.cjs packages/@newgrand/udp-ui/src/businessComponent/attachment/*.test.cjs scripts/check-attachment-export.js` 57/57 通过；`npm run build --prefix packages/@newgrand/udp-ui` 成功。直连没有 XHR 自定义鉴权头，真实浏览器/后端鉴权及水印内容未核验，禁止当作下载成功；标签附件尚未调整，见 04。未提交或部署。

- 2026-10-28（自动化部分完成）：node --test 全部通过——uploadTask 19、Upload 集成 14、formRefresh 2、download.behavior 1、downloadStrategy 1（阈值前一字节/恰阈值/后一字节/150MiB/未知与非法值）、labelDownload.behavior 1、labelSession.integration 3、tableRefresh 6、check-attachment-export 7，合计 54 项。udp-ui `npm run build`（father 4.6.17）成功，338→329 文件。修复两处交付缺口：check-attachment-export.js 加载器补上 baseApi 新增的 ../downloadStrategy 依赖后 7/7 通过；根 .fatherrc.ts 给 esm/cjs 增加 ignores（**/*.test.cjs、**/*.test.js、**/*.test-support.cjs），测试文件不再进入发布产物 lib/es。另：udp-mobile-ui/src/component/Attachment/attachment.binding.test.js 为 10-21 前一任务遗留（用 jest 风格 beforeEach，node --test 下报错），不在本计划范围，未处理。当时尚未完成：真实浏览器限速验证、真实后端取消清理核实、标签水印 URL 契约；其中标签水印能力阻塞已由用户确认解除，见下方最新记录及 04。

### 标签大文件水印下载补齐（本轮）

- 确认来源：用户明确确认后端下载链接返回的文件含水印。撤销 04 的“后端水印直链能力未确认”阻塞；这是用户确认，不是本轮模拟测试或 agent 现场亲测。
- 实现：移除标签 >100 MiB 水印拦截，按原 DOC/DOCX/PDF 条件传 `wmDisabled: '0'`，其他格式/未启用时为 `'1'`；仍由浏览器接管，不拼大文件 Blob，失败不回退、不记录成功。≤阈值及未知大小的旧水印流程保持。
- 先红后绿：`node --test packages/@newgrand/udp-ui/src/businessComponent/attachment/labelDownload.behavior.test.cjs`，修复前退出 1（缺少水印大文件 URL 请求），修复及扩展场景后退出 0。脚本检查参数、点击/记录次数、文件块请求和 Blob 构造、失败路径、权限、多实例及原水印内容拼接，不把各断言当作独立 `node:test` 用例计数。
- 回归：`node --test packages/@newgrand/udp-ui/src/businessComponent/attachment/components/*.test.cjs packages/@newgrand/udp-ui/src/businessComponent/attachment/*.test.cjs scripts/check-attachment-export.js`，报告 tests=54 / pass=54 / fail=0，退出 0。
- 构建：`npm run build --prefix packages/@newgrand/udp-ui`，father 转换 329 文件并生成声明，退出 0。
- 格式：`npx --no-install prettier --check packages/@newgrand/udp-ui/src/businessComponent/attachment/NGLabelAttachment.tsx packages/@newgrand/udp-ui/src/businessComponent/attachment/labelDownload.behavior.test.cjs packages/@newgrand/udp-ui/src/businessComponent/attachment/i18n.ts` 及 `git diff --check` 均退出 0。
- 完整日志已保存于 `C:/Users/jinxu/AppData/Local/Temp/ng-design-label-watermark/`：`red.log`、`green.log`、`label-download.log`、`regression.log`、`build.log`、`format.log`、`diff-check.log`；命令均保存自身退出码后才显示摘要。
- 本轮仅改标签附件、水印拦截的旧提示键和既有标签行为测试；未改后端、udp-core、移动组件、ZIP 流程或根构建配置，保留原工作区其他变更；未提交、发包或部署。
- 交付范围：04 前端实现已 resolved；05 和整体不标完成，仍缺真实浏览器/限速场景与取消后的真实后端文件块、附件记录清理验收。

### 待定位：用户反馈大文件下载仍显示前端进度条

- 用户现场反馈尚未复现、未解决；此前“前端实现完成”只反映当时的模拟行为验证，不代表此现场问题验收通过。
- 本轮基线命令：`node --test packages/@newgrand/udp-ui/src/businessComponent/attachment/download.behavior.test.cjs packages/@newgrand/udp-ui/src/businessComponent/attachment/downloadStrategy.test.cjs packages/@newgrand/udp-ui/src/businessComponent/attachment/labelDownload.behavior.test.cjs`，3 个脚本通过、退出 0；完整输出保存于 `C:/Users/jinxu/AppData/Local/Temp/ng-design-download-baseline.log`。当前测试使用模拟附件记录，不能证明用户页面的真实入口、大小字段和加载资源正确。
- 核对：`baseApi.tsx:handleDownload` 的浏览器分支在文件流请求和 `onResProgress` 前返回；Toolbar 下载入口没有额外设置下载进度状态。未知或非法 `asrSize` 按既定规格保留旧路径，不擅改成全部链接下载。暂未获得现场数据，不能据此确定根因。
- 浏览器工具仅发现无关且由用户持有的任务空间，没有可访问的附件页面；未接管或操作无关页面。待用户提供页面地址/截图及实际入口，必要时需要该附件初始化记录的原始 `asrSize`、点击下载的网络请求或 HAR，以及页面所加载的组件资源版本。
- 本轮未修改源码或测试，保留工作区现有 `docs/business/Attachment.md`、`ngproxy.ini` 等归属未知的变更。获得现场证据后应建立覆盖实际入口及进度渲染的红测，再实施修复；不只隐藏进度条，不将已有测试通过当作现场问题已修复。
