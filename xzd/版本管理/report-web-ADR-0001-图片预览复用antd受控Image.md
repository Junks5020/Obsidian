---
tags:
  - report-web
  - ADR
status: accepted
date: 2026-09-09
---

# ADR-0001：图片双击预览复用 antd 受控 Image

图片双击预览的弹层采用 antd 受控 `Image`（`preview={{ visible, onVisibleChange, getContainer, toolbarRender, destroyOnHidden }}`），而非在自研 `ImagePreviewHost` 上继续手写缩放/旋转。触发、加载门控与 scope 路由仍为自研：渲染层保持裸 `<img>` 不变，仅在预览弹层复用 antd。

相关：[[report-web-术语表]] · [[work-items/image-double-click-preview/spec|图片双击预览规格]] · [[00-版本总览]]

## 背景

预览最初定位为「最小放大查看器」（等比适配 + 遮罩/Esc 关闭），故用 ~150 行自研 `ImagePreviewHost` 是合理取舍。需求随后升级为需要放大、缩小、旋转，antd `Image` 预览的价值增量从零变为真实，原结论随之翻转。

## Considered Options

- **A（采用）**：弹层复用 antd 受控 `Image`。缩放/平移/旋转/重置由 rc-image 维护，触发/门控/scope 保留自研。
- **B（否决）**：在自研 `ImagePreviewHost` 上手写滚轮缩放、拖拽平移、旋转 transform、重置与键盘/ARIA。边缘 case（滚轮绕光标缩放、transform-origin、缩放上下限、旋转+缩放复合）需自行维护，易出 bug。
- **（否决）**：把 Handsontable 渲染器与浮动图层的裸 `<img>` 换成 antd `<Image>`。会引入 wrapper/placeholder/fallback DOM，破坏单元格布局与既有 `editor:false` 单击选中。

## Consequences

- 触发、加载门控（`getLoadedImageUrl`）、scope 事件路由、重叠/合并单元格命中逻辑不变。
- 实例归属由 `getContainer` 落到 scope 父元素保证；工具集由 `toolbarRender` 裁到放大/缩小/重置/旋转（下载/翻转/多图切换被移除）。
- 预览打开时按 antd 默认 100% 实际尺寸显示（非旧实现的等比适配可视区域）；缩放范围 0.1x–50x。
