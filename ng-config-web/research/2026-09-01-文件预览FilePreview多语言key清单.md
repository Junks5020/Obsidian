---
tags:
  - ng-config-web
  - 多语言
  - i18n
  - 附件预览
status: active
date: 2026-09-01
updated: 2026-09-01
---

# 文件预览（FilePreview）多语言 key 清单

相关：[[00-ng-config-web索引]] · [[2026-08-14-附件多语言key清单]] · [[2026-08-14-附件多语言key后端登记表]] · [[ng-config-web-术语表]]

> 页面定位：`src/pages/SUP/FilePreview/index.tsx` 及 `components/`（附件列表 + 预览区）。
> **busType：`AttachmentPreview`**，经 `SUP/GetLanguageInfoByBusType` 下发。
> 规范格式：参考 Obsidian 既有多语言格式（包含既有规范扁平 `fp*` key 与点分小驼峰 key 对照）。

## 一、多语言 key：中文 对照列表

### 1. 既有规范（fp 前缀小驼峰，busType 为 AttachmentPreview）

```properties
fpAttachmentList: 附件列表
fpControlView: 控件查看
fpDownload: 下载
fpNoFileSelected: 未选择文件
fpFileIconAlt: {0}图标
requestFail: 请求失败
fpPreviewTitle: 文件预览
fpDownloadFail: {0}下载失败,{1}
fpImageAlt: 图片
fpImageViewerTip: 点击下方图片打开预览窗口，内置放大、缩小、旋转等功能
```

### 2. 点分命名空间规范（以 attachmentPreview 为命名空间，小驼峰）

```properties
attachmentPreview.fileList.title: 附件列表
attachmentPreview.fileList.fileIconAlt: {0}图标
attachmentPreview.toolbar.controlView: 控件查看
attachmentPreview.toolbar.download: 下载
attachmentPreview.preview.pageTitle: 文件预览
attachmentPreview.preview.noFileSelected: 未选择文件
attachmentPreview.message.requestFail: 请求失败
attachmentPreview.message.downloadFail: {0}下载失败,{1}
attachmentPreview.imageViewer.imageAlt: 图片
attachmentPreview.imageViewer.tip: 点击下方图片打开预览窗口，内置放大、缩小、旋转等功能
```

---

## 二、多语言 key 详细清单（对齐 Obsidian 清单格式）

| key | 中文默认值 | English | 出处 |
|-----|-----------|---------|------|
| `fpAttachmentList` | 附件列表 | Attachment List | `index.tsx:336`（左侧列表标题） |
| `fpControlView` | 控件查看 | View with Control | `index.tsx:359`（工具栏按钮） |
| `fpDownload` | 下载 | Download | `index.tsx:363`（工具栏按钮，`downloadAttachment==='2'` 时隐藏） |
| `fpNoFileSelected` | 未选择文件 | No file selected | `index.tsx:372`（预览标题兜底） |
| `fpFileIconAlt` | {0}图标 | {0} icon | `index.tsx:345`（img alt，`{0}` = 文件名，动态） |
| `requestFail` | 请求失败 | Request failed | `index.tsx:168`（`message.error` 兜底；通用 key） |
| `fpPreviewTitle` | 文件预览 | File Preview | `index.tsx:251`（`core.external.open` 的 `AppTitle`，外开窗口标题） |
| `fpDownloadFail` | {0}下载失败,{1} | {0} download failed, {1} | `index.tsx:323`（下载失败 `message.error`，动态：`{0}` 文件名，`{1}` 错误信息） |
| `fpImageAlt` | 图片 | Image | `components/ImageViewer.tsx:18`（img alt） |
| `fpImageViewerTip` | 点击下方图片打开预览窗口，内置放大、缩小、旋转等功能 | Click the image below to open the preview window with zoom in, zoom out, rotate and other built-in features. | `components/ImageViewer.tsx:23`（提示文案） |

---

## 三、后端登记表（对齐 Obsidian 后端登记表格式）

| key | 中文 | English | 归属页面 | busType | 备注 |
|-----|------|---------|---------|---------|------|
| `fpAttachmentList` | 附件列表 | Attachment List | 附件预览 | AttachmentPreview | 新 key |
| `fpControlView` | 控件查看 | View with Control | 附件预览 | AttachmentPreview | 新 key |
| `fpDownload` | 下载 | Download | 附件预览 | AttachmentPreview | 新 key |
| `fpNoFileSelected` | 未选择文件 | No file selected | 附件预览 | AttachmentPreview | 新 key |
| `fpFileIconAlt` | {0}图标 | {0} icon | 附件预览 | AttachmentPreview | 新 key；`{0}` 为文件名占位符 |
| `requestFail` | 请求失败 | Request failed | 附件预览 | AttachmentPreview | **需去重确认**（多页通用，可能已登记） |
| `fpPreviewTitle` | 文件预览 | File Preview | 附件预览 | AttachmentPreview | 新 key；外开窗口标题 |
| `fpDownloadFail` | {0}下载失败,{1} | {0} download failed, {1} | 附件预览 | AttachmentPreview | 新 key；`{0}` 为文件名占位符，`{1}` 为错误信息占位符（index.tsx:323） |
| `fpImageAlt` | 图片 | Image | 附件预览 | AttachmentPreview | 新 key |
| `fpImageViewerTip` | 点击下方图片打开预览窗口，内置放大、缩小、旋转等功能 | Click the image below to open the preview window with zoom in, zoom out, rotate and other built-in features. | 附件预览 | AttachmentPreview | 新 key |

---

## 四、无需翻译的内容（开发调试日志与注释）

| 原文 | 文件位置 | 类型 | 说明 |
|---|---|---|---|
| `billWM 解码失败:` | `index.tsx:109` | console.error | 仅开发调试日志 |
| `处理选择时出错:` | `index.tsx:185` | console.error | 仅开发调试日志 |
| `未获取到有效的文件 URL` | `index.tsx:205` | throw Error | 内部抛错，已被 handleChose 捕获打印 log |
| `未获取水印` | `index.tsx:223` | throw Error | 内部抛错，已被 getWatermark 捕获打印 log |
| `获取水印失败:` | `index.tsx:228` | console.error | 仅开发调试日志 |
| `* 附件下载接口(下载结果为url链接)` | `api.tsx:9` | JSDoc 注释 | 代码注释 |
| `// 导入图标资源` 等其他注释 | 各文件 | 行内注释 | 代码逻辑/样式注释 |
| iframe 内部文案 | `ExcelViewer.tsx`, `PdfViewer.tsx` | 服务端渲染 | 由服务端微服务或三方组件提供，前端无法直接翻译 |
