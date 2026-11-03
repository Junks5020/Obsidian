---
tags:
  - nova
  - ios
  - harmony
  - attachment
  - bug
  - diagnosis
status: diagnosed
date: 2026-10-23
updated: 2026-10-23
---

# Nova iOS 系统 APP 附件来源缺少“文件”入口

## 当前结论

在当前 Nova 仓库默认附件上传组件 `react/src/smart-component/upload/upload.tsx` 中，“文件”来源在菜单渲染前按平台过滤：只有 `platform=android` 保留 `file`，其他平台（包括 `ios`、`harmony`）都会移除。iOS 原生跳转明确带 `platform=ios`，所以默认菜单不显示“文件”。这不是相册权限或 iOS 文件访问权限造成的 UI 隐藏。

该限制由提交 `a77ac329e0`（2025-05-19，`fix: 同步安卓附件需求`）引入，提交注释为“除了安卓不允许选文件”。

仅移除前端过滤仍不够：`Upload` 的文件动作会调用 `PlatformAPI('openFileSystem')`，Android 与 Harmony adapter 均导出该 API；当前 iOS adapter 没有它。iOS `NGFilePlugin.registerHandler()` 只注册 `upload` 和 `download`，未注册 `openFileSystem`；iOS 原生源码中也未找到 `UIDocumentPicker`。因此当前代码缺少 iOS 文件选择器到 JS 的完整桥接。

## 鸿蒙现场差异待确认

本地组件探针执行当前真实 TSX 源码，默认菜单结果为：

- iOS：`请选择来源、拍照、相册`
- Android：`请选择来源、拍照、相册、文件`
- Harmony：`请选择来源、拍照、相册`

显式传入 `accept: ['photo', 'album', 'file']` 后，三个平台的组件树都会包含“文件”。因此“鸿蒙有、iOS 没有”与当前默认逻辑不完全一致；可能是 Harmony 页面传入了 `accept` 覆盖、运行时 `platform` 参数不是 `harmony`、设备加载的包版本/附件入口不同。尚未通过真机或目标业务页面确认，不能把 Harmony 差异归因到其中任何一种。

另有 `react/src/smart-component/attachment/index.tsx` 的附件抽屉，它目前只提供“拍照/手机相册/录像”，与上述支持“文件”动作的 `Upload` 不是同一入口。需要用具体页面或截图确认用户所指组件。

## 验证

运行：

```sh
node 'C:/Users/jinxu/workspace/obsidian/xzd/版本管理/变更记录/BUG-20261023-003-nova-ios-attachment-file-option-probe.cjs' 'C:/Users/jinxu/orca/workspaces/nova/frogfish'
```

脚本从目标仓库读取并转译实际 `upload.tsx`/`accept.tsx`，执行组件函数并检查返回元素树中的来源标签；React、hooks、UI 外壳、平台 API 均为替代实现。当前预期非零退出：`FAIL: ios: default menu missing 文件; harmony: default menu missing 文件`。这是可重跑的组件默认菜单探针，不是实际浏览器交互测试、原生 picker 测试或真机复现。

## 后续确认/修复边界

要支持 iOS，需要同时实现 iOS 原生文件选择（例如 `UIDocumentPickerViewController`）、注册并返回 `openFileSystem` 结果、在 adapter 中暴露该 API，再按支持平台调整来源过滤；还需处理安全作用域 URL/临时文件可读性。当前没有修改 Nova 业务代码。

要闭合用户描述的鸿蒙差异，需要具体页面/表单、APP 与 H5 包版本、实际 `platform` 参数及附件来源弹窗截图。

相关：[[../00-版本总览]] · [[../research/2026-09-02-nova-钉钉文件预览替代方案]]
