---
id: BUG-20260901-001
type: bug
status: fixed
date: 2026-09-01
updated: 2026-09-01
tags:
  - nova
  - mobile-web
  - h5
  - excel-preview
---

# BUG-20260901-001: nova H5 Excel 预览地址前缀错误

相关：[[00-版本总览]]

## 现象

浏览器直接打开审批页面时，Excel 预览使用租户产品地址 `https://www.zmdqgc.com:31903/rest/JFileSrv/`；App 内嵌 `platform=h5` 页面时却使用 `http://appserver.netcall.cc/JFileSrv/`，请求返回 404。

## 根因

审批详情调用 H5 `openFile` 时同时传入经过 `replaceURL()` 规范化的 `url` 和接口原始值 `officeUrl`。H5 适配器使用 `params.officeUrl || params.url`，导致原始 `officeUrl` 覆盖了已带租户产品前缀的 `url`。

## 修复

H5 Excel 预览统一使用必填且已规范化的 `params.url`。非 Excel 下载逻辑及 Android/iOS 原生桥未改动。

## 验证

- 回归测试覆盖 `url=https://www.zmdqgc.com:31903/rest/JFileSrv/...` 与 `officeUrl=http://appserver.netcall.cc/JFileSrv/...` 同时存在时，预览组件选择前者。
- 定向 Jest 回归测试通过。
- 新增测试 ESLint 通过；H5 源文件除既有未使用 `router` 导入外无新增问题。
- `mobile-web` 生产构建通过。

