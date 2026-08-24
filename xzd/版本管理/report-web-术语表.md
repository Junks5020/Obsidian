---
tags:
  - report-web
  - 术语表
  - 领域模型
updated: 2026-08-24
---

## Resolved Terms

**Floating Image Anchor Cell**:
A cell used as the position reference by one or more floating images. It stops being an anchor cell when no floating image references it. _Avoid_: image cell, image content cell

# report-web 术语表

记录 report-web 报表设计、预览与导出链路中共享的业务语言。

相关：[[变更记录/FEATURE-20260731-001-report-floating-image]] · [[report-web-打印模板类型同步计划-20260824]] · [[00-版本总览]]

## 打印模板

**打印模板类型**:
区分打印模板面向常规用户使用还是面向用户 APP 展示的业务分类。
_Avoid_: 打印设置类型、报表类型

**用户模板**:
供常规用户打印、预览和导出使用的打印模板。
_Avoid_: 普通模板、默认类型

**用户_APP展示模板**:
供用户 APP 展示使用、可被指定为默认模板的打印模板。
_Avoid_: APP 模板、移动端模板、用户_APP

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
