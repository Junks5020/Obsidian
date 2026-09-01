---
tags:
  - ng-config-web
  - attachment
  - file-preview
  - i18n
  - 后端注册
status: current
date: 2026-09-01
updated: 2026-09-01
source: src/pages/SUP/FilePreview
identity: AttachmentPreview
busType: AttachmentPreview
locale: zh-CN
format: simple-v1
---

# ng-config-web FilePreview 后端多语言注册清单

相关：[[00-版本总览]] · [[ng-design-ADR-0003-Attachment中文消息具名占位符协议]] · [[research/2026-08-21-ng-design-udp-ui-Attachment后端多语言注册清单|udp-ui Attachment 后端多语言注册清单]] · [[research/2026-08-21-ng-design-Attachment后端多语言注册清单|udp-mobile-ui Attachment 后端多语言注册清单]]

以下消息用于后端语言资源注册。动态变量采用 `simple-v1` 的 `{{name}}` 具名占位符格式。

| identity | message key | locale | format | 中文模板 | 变量 |
| --- | --- | --- | --- | --- | --- |
| `AttachmentPreview` | `attachmentPreview.action.controlView` | `zh-CN` | `simple-v1` | 控件查看 | - |
| `AttachmentPreview` | `attachmentPreview.action.download` | `zh-CN` | `simple-v1` | 下载 | - |
| `AttachmentPreview` | `attachmentPreview.imageViewer.alt` | `zh-CN` | `simple-v1` | 图片 | - |
| `AttachmentPreview` | `attachmentPreview.imageViewer.tip` | `zh-CN` | `simple-v1` | 点击下方图片打开预览窗口，内置放大、缩小、旋转等功能 | - |
| `AttachmentPreview` | `attachmentPreview.list.fileIconAlt` | `zh-CN` | `simple-v1` | {{fileName}}图标 | `fileName` |
| `AttachmentPreview` | `attachmentPreview.list.title` | `zh-CN` | `simple-v1` | 附件列表 | - |
| `AttachmentPreview` | `attachmentPreview.message.downloadFailed` | `zh-CN` | `simple-v1` | {{fileName}}下载失败,{{errorMessage}} | `fileName`, `errorMessage` |
| `AttachmentPreview` | `attachmentPreview.message.requestFailed` | `zh-CN` | `simple-v1` | 请求失败 | - |
| `AttachmentPreview` | `attachmentPreview.preview.noFileSelected` | `zh-CN` | `simple-v1` | 未选择文件 | - |
| `AttachmentPreview` | `attachmentPreview.preview.title` | `zh-CN` | `simple-v1` | 文件预览 | - |

## 内部异常消息（备选）

| identity | message key | locale | format | 中文模板 | 变量 |
| --- | --- | --- | --- | --- | --- |
| `AttachmentPreview` | `attachmentPreview.error.getWatermarkFailed` | `zh-CN` | `simple-v1` | 未获取水印 | - |
| `AttachmentPreview` | `attachmentPreview.error.invalidUrl` | `zh-CN` | `simple-v1` | 未获取到有效的文件 URL | - |

## 源码位置对照

| message key | 中文模板 | 源码位置 | 备注 |
| --- | --- | --- | --- |
| `attachmentPreview.action.controlView` | 控件查看 | `index.tsx:359` | 顶部工具栏“控件查看”按钮 |
| `attachmentPreview.action.download` | 下载 | `index.tsx:363` | 顶部工具栏“下载”按钮（downloadAttachment !== '2' 时展示） |
| `attachmentPreview.imageViewer.alt` | 图片 | `components/ImageViewer.tsx:18` | 图片预览缩略图 alt 属性 |
| `attachmentPreview.imageViewer.tip` | 点击下方图片打开预览窗口，内置放大、缩小、旋转等功能 | `components/ImageViewer.tsx:23` | 图片预览区引导文案 |
| `attachmentPreview.list.fileIconAlt` | {{fileName}}图标 | `index.tsx:345` | 附件列表中文件类型图标 alt 属性 |
| `attachmentPreview.list.title` | 附件列表 | `index.tsx:336` | 左侧附件列表标题（singleview !== '1' 时展示） |
| `attachmentPreview.message.downloadFailed` | {{fileName}}下载失败,{{errorMessage}} | `index.tsx:323` | 附件下载异常 toast 提示 |
| `attachmentPreview.message.requestFailed` | 请求失败 | `index.tsx:168` | 接口获取附件列表失败 toast 提示 |
| `attachmentPreview.preview.noFileSelected` | 未选择文件 | `index.tsx:372` | 预览区标题占位兜底 |
| `attachmentPreview.preview.title` | 文件预览 | `index.tsx:251` | core.external.open 外开窗口标题（AppTitle） |

## 无需翻译的内容（开发调试与注释）

| 原文 | 源码位置 | 类型 | 说明 |
| --- | --- | --- | --- |
| `billWM 解码失败:` | `index.tsx:109` | console.error | 仅开发调试控制台打印 |
| `处理选择时出错:` | `index.tsx:185` | console.error | 仅开发调试控制台打印 |
| `获取水印失败:` | `index.tsx:228` | console.error | 仅开发调试控制台打印 |
| `* 附件下载接口(下载结果为url链接)` | `api.tsx:9` | JSDoc | 代码注释 |
| 各类行内注释及 Less/CSS 注释 | 各文件 | 注释 | 开发注释 |
| iframe 内部文案 | `ExcelViewer.tsx`, `PdfViewer.tsx` | 服务端渲染 | 由服务端微服务/PDF.js提供，前端无法直接翻译 |

## 后端注册 JSON

### 1. 批量注册 Payload（带元数据与 busType 契约）

```json
{
  "identity": "AttachmentPreview",
  "busType": "AttachmentPreview",
  "locale": "zh-CN",
  "format": "simple-v1",
  "messages": {
    "attachmentPreview.action.controlView": "控件查看",
    "attachmentPreview.action.download": "下载",
    "attachmentPreview.imageViewer.alt": "图片",
    "attachmentPreview.imageViewer.tip": "点击下方图片打开预览窗口，内置放大、缩小、旋转等功能",
    "attachmentPreview.list.fileIconAlt": "{{fileName}}图标",
    "attachmentPreview.list.title": "附件列表",
    "attachmentPreview.message.downloadFailed": "{{fileName}}下载失败,{{errorMessage}}",
    "attachmentPreview.message.requestFailed": "请求失败",
    "attachmentPreview.preview.noFileSelected": "未选择文件",
    "attachmentPreview.preview.title": "文件预览"
  }
}
```

### 2. 扁平字典格式（直接供前端 `defaultTextMap` 或接口响应映射）

```json
{
  "attachmentPreview.action.controlView": "控件查看",
  "attachmentPreview.action.download": "下载",
  "attachmentPreview.imageViewer.alt": "图片",
  "attachmentPreview.imageViewer.tip": "点击下方图片打开预览窗口，内置放大、缩小、旋转等功能",
  "attachmentPreview.list.fileIconAlt": "{{fileName}}图标",
  "attachmentPreview.list.title": "附件列表",
  "attachmentPreview.message.downloadFailed": "{{fileName}}下载失败,{{errorMessage}}",
  "attachmentPreview.message.requestFailed": "请求失败",
  "attachmentPreview.preview.noFileSelected": "未选择文件",
  "attachmentPreview.preview.title": "文件预览"
}
```

### 3. 结构化注册明细条目数组（符合 ADR-0003 数据库存储记录契约）

```json
[
  {
    "identity": "AttachmentPreview",
    "key": "attachmentPreview.action.controlView",
    "locale": "zh-CN",
    "format": "simple-v1",
    "message": "控件查看",
    "variables": []
  },
  {
    "identity": "AttachmentPreview",
    "key": "attachmentPreview.action.download",
    "locale": "zh-CN",
    "format": "simple-v1",
    "message": "下载",
    "variables": []
  },
  {
    "identity": "AttachmentPreview",
    "key": "attachmentPreview.imageViewer.alt",
    "locale": "zh-CN",
    "format": "simple-v1",
    "message": "图片",
    "variables": []
  },
  {
    "identity": "AttachmentPreview",
    "key": "attachmentPreview.imageViewer.tip",
    "locale": "zh-CN",
    "format": "simple-v1",
    "message": "点击下方图片打开预览窗口，内置放大、缩小、旋转等功能",
    "variables": []
  },
  {
    "identity": "AttachmentPreview",
    "key": "attachmentPreview.list.fileIconAlt",
    "locale": "zh-CN",
    "format": "simple-v1",
    "message": "{{fileName}}图标",
    "variables": ["fileName"]
  },
  {
    "identity": "AttachmentPreview",
    "key": "attachmentPreview.list.title",
    "locale": "zh-CN",
    "format": "simple-v1",
    "message": "附件列表",
    "variables": []
  },
  {
    "identity": "AttachmentPreview",
    "key": "attachmentPreview.message.downloadFailed",
    "locale": "zh-CN",
    "format": "simple-v1",
    "message": "{{fileName}}下载失败,{{errorMessage}}",
    "variables": ["fileName", "errorMessage"]
  },
  {
    "identity": "AttachmentPreview",
    "key": "attachmentPreview.message.requestFailed",
    "locale": "zh-CN",
    "format": "simple-v1",
    "message": "请求失败",
    "variables": []
  },
  {
    "identity": "AttachmentPreview",
    "key": "attachmentPreview.preview.noFileSelected",
    "locale": "zh-CN",
    "format": "simple-v1",
    "message": "未选择文件",
    "variables": []
  },
  {
    "identity": "AttachmentPreview",
    "key": "attachmentPreview.preview.title",
    "locale": "zh-CN",
    "format": "simple-v1",
    "message": "文件预览",
    "variables": []
  }
]
```

### 4. 英文对照 Payload（en-US 同步注册备用）

```json
{
  "identity": "AttachmentPreview",
  "busType": "AttachmentPreview",
  "locale": "en-US",
  "format": "simple-v1",
  "messages": {
    "attachmentPreview.action.controlView": "View with Control",
    "attachmentPreview.action.download": "Download",
    "attachmentPreview.imageViewer.alt": "Image",
    "attachmentPreview.imageViewer.tip": "Click the image below to open the preview window with zoom in, zoom out, rotate and other built-in features.",
    "attachmentPreview.list.fileIconAlt": "{{fileName}} icon",
    "attachmentPreview.list.title": "Attachment List",
    "attachmentPreview.message.downloadFailed": "Failed to download {{fileName}}, {{errorMessage}}",
    "attachmentPreview.message.requestFailed": "Request failed",
    "attachmentPreview.preview.noFileSelected": "No file selected",
    "attachmentPreview.preview.title": "File Preview"
  }
}
```
