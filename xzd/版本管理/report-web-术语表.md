---
tags:
  - report-web
  - 术语表
  - 领域模型
updated: 2026-08-07
---

## Resolved Terms

**Floating Image Anchor Cell**:
A cell used as the position reference by one or more floating images. It stops being an anchor cell when no floating image references it. _Avoid_: image cell, image content cell

# report-web 术语表

记录 report-web 报表设计、预览与导出链路中共享的业务语言。

相关：[[变更记录/FEATURE-20260731-001-report-floating-image]] · [[00-版本总览]]

## 浮动图片

**浮动图片 (Floating Image)**:
以单元格为锚点、独立悬浮在报表表格上方的图片；在设计、预览与导出中保持相对位置。
_Avoid_: 单元格图片、背景图

**固定图片 (Fixed Image)**:
图片内容来自用户上传附件的浮动图片，不随报表数据行变化。
_Avoid_: 上传图片

**字段图片 (Field Image)**:
图片内容取自数据集字段的浮动图片，可按当前报表数据变化。
_Avoid_: URL 图片、动态图片
