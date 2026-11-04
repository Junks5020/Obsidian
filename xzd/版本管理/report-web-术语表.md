---
tags:
  - report-web
  - 术语表
  - 领域模型
updated: 2026-10-21
---

## Resolved Terms

**Floating Image Anchor Cell**:
A cell used as the position reference by one or more floating images. It stops being an anchor cell when no floating image references it. _Avoid_: image cell, image content cell

# report-web 术语表

记录 report-web 报表设计、预览与导出链路中共享的业务语言。

相关：[[变更记录/FEATURE-20260731-001-report-floating-image]] · [[work-items/image-double-click-preview/spec|图片双击预览规格]] · [[report-web-ADR-0001-图片预览复用antd受控Image|图片预览复用 antd 受控 Image ADR]] · [[report-web-打印模板类型同步计划-20260824]] · [[report-web-二维码多字段追加执行计划-20260825]] · [[00-版本总览]]

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

## 图片展示

**图片单元格 (Image Cell)**:
单元格类型为图片、其内容在单元格边界内渲染的报表单元格。它与以单元格为锚点但独立悬浮的浮动图片不同。
_Avoid_: 当前单元格图片、普通图片

**图片双击预览 (Image Double-click Preview)**:
在报表设计器和预览/查看页面，用户双击可展示的图片单元格或浮动图片后打开的查看交互，支持放大、缩小、重置与 90° 旋转。
_Avoid_: 编辑器预览、图片编辑、富媒体浏览器（不含下载/翻转/多图切换）

## 二维码多字段追加

**主字段 (Primary Field)**:
单元格绑定的数据集字段；二维码内容拼接时固定排在第一行，不进入追加展示字段列表。
_Avoid_: 绑定字段、第一字段

**追加展示字段 (QR Extra Field)**:
二维码展示形式下，由用户从单元格所属数据集中追加选择的附加字段；每项可独立配置格式化，其排列顺序决定二维码内容的拼接顺序。空值的追加展示字段不跳过，仍展示字段名。
_Avoid_: 附加字段、扩展字段、二维码字段

## 打印缩放

**按宽度自动适配**:
使打印内容的全部列容纳在一页可打印宽度内的缩放方式；首版只缩小、不放大，行数较多时仍可纵向分页。
_Avoid_: 整份报表强制一页、横向打印（易与纸张方向混淆）

相关：[[report-web-打印按宽度自动适配需求澄清]]

## 查询条件日期

**相对日期默认值**:
查询条件中以当前日期为参照的默认日期选项，例如当前时间、本月第一天或最近若干天；其含义随报表打开时的日期而变化。
_Avoid_: 固定日期、保存日期

**固定日期默认值**:
用户明确指定某个日历日期作为查询条件默认值；无论何时打开报表，该日期均保持不变。
_Avoid_: 动态日期、相对日期
