---
tags:
  - ng-design
  - udp-ui
  - attachment
  - investigation
status: investigated
date: 2026-10-26
updated: 2026-10-26
---

# udp-ui 大文件附件上传、下载与取消核查

相关：[[00-版本总览]] · [[ng-design-附件术语表]] · [[ng-design-Agent工作流配置]] · [[ng-design-ADR-0001-附件权限分类块透传]] · [[ng-design-ADR-0002-附件权限补丁限定源码目录]]

## 核查范围与基线

- 用户仅要求核查 `udp-ui` 内部附件组件，不实施修复。
- 仓库：`git@gitlab.newgrand.com:newgrand.techcenter/map/ng-design.git`。
- 工作区：`C:\Users\jinxu\workspace\xzd\ng-design`。
- 分支：`ljx-6.5.2`；HEAD：`5b690c34e96149fd5fa5962b6a162de28618e896`。
- 包：`@newgrand/udp-ui@6.520.285`。
- 核查共享 Upload、NGTableAttachment、NGLabelAttachment、FormAttachment（列表、标签与图片）、公共附件 API 及相关 service；未检查其他包的实现或外部预览页面内部行为。
- 根目录不存在 `.codegraph/`，采用源码定位与隔离执行探针。

## 结论

| 用户提出的行为 | 当前实现与判断 |
| --- | --- |
| 边切块边上传，例如每切 10 块调用接口 | 存在差距：所有块先完成 MD5，再统一检查块是否存在，之后上传。未实现按 10 块滚动处理。 |
| 超过 100M 自动交给浏览器下载，不渲染前端进度 | 未实现按大小切换。表格附件已有配置驱动的链接下载；默认方式仍接收整个 ArrayBuffer 并渲染下载进度。 |
| 上传取消图标点击无反应 | 存在延迟响应和取消被漏掉的路径；事件本身已绑定。 |

## 1. 上传切块顺序

`packages/@newgrand/udp-ui/src/businessComponent/attachment/components/Upload.tsx`：

- 60–73 行：遍历全部块，逐块 `slice`、等待 `getFileMd5`，保留所有块和 MD5；循环结束后才调用一次 `filePartsExists(chunkFileMd5List)`。
- 89–96 行：命中已存在块时调用 `uploadTempFileWithoutDataBatch` 登记；这个 Batch 不是新文件块的批量上传。
- 108–150 行：未命中缓存的块按序逐块调用 `uploadTempFile`，成功后递归处理下一块。
- 323 行：调用上传时固定分块大小为 `1048576` 字节，即 1 MiB。
- `util.ts:169–182` 的 MD5 计算先经 FileReader 读取每块 ArrayBuffer。

因此，首个上传请求必须等整个文件的分块 MD5 完成；表格、表单、图片及标签上传复用同一组件。这里没有证明所有 Blob 分片都复制占用相同大小的内存，也没有测量真实大文件性能。

## 2. 下载方式与大小判断

`NGTableAttachment.tsx:218–221`：`downloadMethod` 取附件配置，缺省为字符串 `'0'`，注释定义 0 为文件流、1 为链接。

`api/baseApi.tsx:364–489` 的 `handleDownload`：

- 388–410 行：仅当 `downloadMethod === '1'` 时获取下载 URL，创建隐藏 a 元素并 `click()`；该分支不写前端下载进度。
- 412–476 行：其他值走 `responseType: 'arrayBuffer'`，`onResProgress` 更新附件记录的进度；收完数据后构造 Blob 再保存。
- 分支不读取文件的 `asrSize`，没有 100M 阈值；150 MiB 传入默认方式时也不会改走 URL。

其他入口：

- `formAttachment/index.tsx:556、653`：列表及标签形态传给 `handleDownload` 的下载方式与进度 setter 均为 undefined，因此进入 ArrayBuffer 路径；这两个入口自身不显示下载进度，但仍由前端接收数据。
- `NGLabelAttachment.tsx:216–299`：独立标签附件按下载信息取块或水印块，累积后构造 Blob；没有按大小直下的判断，也没有该函数自身的下载进度更新。
- 以上是单文件下载判断，不能与 ZIP 生成进度混为一谈。分类导出等路径已有 a 点击不代表所有大文件单独下载都已走该方式。

## 3. 取消上传处理

事件链：`components/FileCircle.tsx:20–26` 的点击调用 `circleHandle(status, uid)`，`NGTableAttachment.tsx:828–833` 只设置 `filePauseRef.current = uid`，没有立即更改界面状态或中止网络请求。

`Upload.tsx:108–179` 仅在“当前块尚未上传且尚未超出块数”的分支，发送该块请求前检查取消标记：

- 切块与 MD5 阶段：不检查取消标记，点击后仍继续处理全部块及存在性检查。
- 普通上传请求进行中：不会 abort 当前请求；须等请求返回、递归到下个需上传的块才处理取消。
- 最后一块请求进行中：点击后仍进入完成分支，状态变为 SUCCESS，执行成功回调，取消接口不会调用。
- 所有块均命中缓存：跳过待上传分支直接进入完成分支，取消标记同样不被处理。
- 只有进入取消分支并且后端 `code === 200` 后，才把状态设为 PAUSING 并清除标记。
- 共享标记只保存一个 uid；连续取消多个并行文件时存在覆盖前一个 uid 的代码风险，本轮未做多文件时序探针。

该取消图标与 ref 链接位于表格附件及现代附件弹窗。表单直接列表、标签及图片上传入口没有接入这套 `filePauseRef`；不能把表格图标的表现描述为所有附件形态都有同一取消图标。

## 隔离验证证据

Node `v24.15.0`，用 TypeScript AST 从当前源码提取实际 `upload`、`circleHandle`、`handleDownload` 函数，以网络、MD5、文件及 DOM 替身执行；未在仓库新增测试或修改源码。

| 探针 | 实际观察 |
| --- | --- |
| 25 块正常上传 | 25 次 MD5 后才发存在性检查，然后开始第 0 块上传。 |
| 第一次 MD5 时取消 | 仍完成 25 次 MD5 及存在性检查，之后才调取消接口。 |
| 非最后一块请求中取消 | 当前请求返回后取消，不再发下一块。 |
| 最后一块请求中取消 | 不调用取消接口，仍执行成功回调，取消标记残留。 |
| 全部块存在且已经点击取消 | 登记缓存块后直接成功，不调用取消接口。 |
| 150 MiB，downloadMethod='0' | ArrayBuffer 请求、一次模拟进度状态更新、Blob 保存。 |
| 150 MiB，downloadMethod='1' | 获取 URL、a.click、零次进度状态更新。 |
| 150 MiB，downloadMethod=undefined | 仍走 ArrayBuffer、进度回调与 Blob 保存。 |

8 项断言全部符合以上观察。验证范围为当前源码控制流程；真实浏览器点击、真实大文件与后端取消清理效果、鉴权及水印直下兼容性未验证。

## 决策状态

本轮只确认现状，没有形成新的实施决策或 ADR。用户的“每切 10 块调用接口”在实施前仍需明确是分批检查和逐块上传，还是单个请求携带 10 块；源码调用方式不能证明后端支持后一种协议。100M 的具体字节口径也未作实现约定。本轮不更改术语表中的既有领域概念。
