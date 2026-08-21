---
tags:
  - ng-design
  - attachment
  - i18n
  - 后端注册
status: current
date: 2026-08-21
updated: 2026-08-21
identity: UDP_MOBILE_ATTACHMENT
locale: zh-CN
format: simple-v1
---

# ng-design Attachment 后端多语言注册清单

相关：[[00-版本总览]] · [[research/2026-08-21-ng-design-Attachment中文清单]] · [[ng-design-ADR-0003-Attachment中文消息具名占位符协议]]

以下 57 条消息用于后端语言资源注册。动态变量采用 `simple-v1` 的 `{{name}}` 具名占位符格式。

| identity | message key | locale | format | 中文模板 | 变量 |
| --- | --- | --- | --- | --- | --- |
| `UDP_MOBILE_ATTACHMENT` | `attachment.action.cancel` | `zh-CN` | `simple-v1` | 取消 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.action.upload` | `zh-CN` | `simple-v1` | 上传附件 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.action.uploadOffline` | `zh-CN` | `simple-v1` | 上传附件(离线) | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.action.viewDocument` | `zh-CN` | `simple-v1` | 查看文档 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.comment.sensitive` | `zh-CN` | `simple-v1` | 办理意见中包含敏感字:{{words}}{{suffix}},请修改后重新提交! | `words`, `suffix` |
| `UDP_MOBILE_ATTACHMENT` | `attachment.common.label` | `zh-CN` | `simple-v1` | 附件 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.delete.failed` | `zh-CN` | `simple-v1` | 删除失败 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.delete.success` | `zh-CN` | `simple-v1` | 删除成功 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.info.loadFailed` | `zh-CN` | `simple-v1` | 附件信息获取失败 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.init.failed` | `zh-CN` | `simple-v1` | 附件初始化失败 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.init.missingTable` | `zh-CN` | `simple-v1` | 单据附件未关联表名！ | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.init.offlineUnsupported` | `zh-CN` | `simple-v1` | 离线状态不能初始化 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.meta.beforeUploadTime` | `zh-CN` | `simple-v1` | 上传前修改时间: | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.meta.uploader` | `zh-CN` | `simple-v1` | 上传人: | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.meta.uploadTime` | `zh-CN` | `simple-v1` | 上传时间: | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.offline.defaultItem` | `zh-CN` | `simple-v1` | 离线数据{{index}} | `index` |
| `UDP_MOBILE_ATTACHMENT` | `attachment.offline.emptyDeletePath` | `zh-CN` | `simple-v1` | 文件路径为空，无法删除 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.offline.emptyPreviewPath` | `zh-CN` | `simple-v1` | 文件路径为空，无法预览 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.offline.filter` | `zh-CN` | `simple-v1` | 筛选 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.offline.noMatch` | `zh-CN` | `simple-v1` | 无匹配选项 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.offline.noMore` | `zh-CN` | `simple-v1` | 没有更多了 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.offline.previewRetry` | `zh-CN` | `simple-v1` | 预览失败，请重试 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.offline.reference` | `zh-CN` | `simple-v1` | 引用离线数据 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.offline.search` | `zh-CN` | `simple-v1` | 搜索 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.preview.firstPage` | `zh-CN` | `simple-v1` | 已是第一页 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.preview.lastPage` | `zh-CN` | `simple-v1` | 已是最后一页 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.preview.loadFailed` | `zh-CN` | `simple-v1` | 附件加载失败 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.preview.notFound` | `zh-CN` | `simple-v1` | 附件不存在 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.preview.unsupported` | `zh-CN` | `simple-v1` | 当前文件格式不支持预览 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.preview.urlFailed` | `zh-CN` | `simple-v1` | 附件预览地址获取失败 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.preview.urlMissing` | `zh-CN` | `simple-v1` | 附件预览地址不存在 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.source.album` | `zh-CN` | `simple-v1` | 相册 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.source.burst` | `zh-CN` | `simple-v1` | 连拍 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.source.file` | `zh-CN` | `simple-v1` | 文件 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.source.photo` | `zh-CN` | `simple-v1` | 拍照 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.source.prompt` | `zh-CN` | `simple-v1` | 请选择来源 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.source.signature` | `zh-CN` | `simple-v1` | 签名 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.source.video` | `zh-CN` | `simple-v1` | 录像 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.type.all` | `zh-CN` | `simple-v1` | 全部 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.allowedFormats` | `zh-CN` | `simple-v1` | 仅支持上传：{{formats}} 格式 | `formats` |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.blockedFormats` | `zh-CN` | `simple-v1` | 不支持上传：{{formats}} 格式 | `formats` |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.doneCount` | `zh-CN` | `simple-v1` | 已上传{{count}}文件 | `count` |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.failed` | `zh-CN` | `simple-v1` | 上传失败 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.invalidFileName` | `zh-CN` | `simple-v1` | 文件名格式不符合要求 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.limitReached` | `zh-CN` | `simple-v1` | 附件上传数量已达上限 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.locationFailed` | `zh-CN` | `simple-v1` | 获取位置失败 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.maxCount` | `zh-CN` | `simple-v1` | 最大上传数 {{maxCount}} | `maxCount` |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.maxSize` | `zh-CN` | `simple-v1` | 文件大小不能超过 {{maxSize}}MB! | `maxSize` |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.noPermission` | `zh-CN` | `simple-v1` | 暂无上传权限 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.sensitiveFileName` | `zh-CN` | `simple-v1` | 文件名包含敏感词，请修改后重试 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.status.failed` | `zh-CN` | `simple-v1` | 失败 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.status.initializing` | `zh-CN` | `simple-v1` | 上传初始化中 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.status.success` | `zh-CN` | `simple-v1` | 成功 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.status.total` | `zh-CN` | `simple-v1` | 合计 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.status.uploading` | `zh-CN` | `simple-v1` | 正在上传 | - |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.totalCount` | `zh-CN` | `simple-v1` | 共{{count}}文件 | `count` |
| `UDP_MOBILE_ATTACHMENT` | `attachment.upload.warnSize` | `zh-CN` | `simple-v1` | 文件大小已超过 {{warnSize}}MB, 是否继续上传! | `warnSize` |
