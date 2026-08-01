---
id: FEATURE-20260731-001
type: feature
status: completed
commit:
  - 80f9ad8f8995dbff8efdf572bfdfe59c309cc31f
  - 63ebca8c6257365e3bd526b550d82d966eb26537
  - 772c74d59accc97735bf4218570114bf81b8a138
  - c086ecb992f2e92ecac597d3064c827410d1bd65
  - d3b11bcc9d7f7fb274dbcd064a8e3275cadc33a2
source_branch: 6.5.2-dev
created: 2026-07-31
target_versions:
  - 6.5.2-dev
  - master
tags:
  - version-change
  - feature
  - report-web
  - floating-image
  - report-print
---

# FEATURE-20260731-001：报表设计端支持浮动图片

## 需求概述

在报表设计器中为每个 sheet 增加浮动图片能力：图片以单元格为锚点悬浮在表格上方，支持固定图片（上传附件）和字段图片（按数据集字段动态取值）两种数据源，并在预览与 PDF/Word 导出时保持相对位置。

## 提交记录

| Commit | 时间 | 作者 | 标题 | 主要改动 |
| --- | --- | --- | --- | --- |
| `80f9ad8f` | 2026-07-22 14:47 | liujinxu | fix: 增加浮动图片功能。 | 首次完整实现：设计态管理面板、图层渲染、schema 存储、预览与打印导出。 |
| `63ebca8c` | 2026-07-23 20:51 | liujinxu | fix: 增加浮动图片功能2 | 修复与完善：删除冗余 service、调整工具栏集成、完善单元测试、优化打印布局。 |
| `772c74d5` | 2026-07-27 09:56 | liujinxu | fix: 浮动图片列改为字母格式 | 列号展示由数字改为 Excel 式字母（A、B、AA、AB），并补充测试。 |
| `c086ecb9` | 2026-07-29 14:39 | liujinxu | fix: 浮动图片按钮数量角标 | 工具栏浮动图片按钮增加数量角标显示。 |
| `d3b11bcc` | 2026-07-31 10:15 | liujinxu | 修复浮动图片选中与拖拽体验 | 优化 `index.tsx` 中的选中与拖拽交互体验。 |

## 关键文件

### 核心模块

- `src/components/report/floatingImage/index.tsx` — 设计态浮动图片管理抽屉与图层组件。
- `src/components/report/floatingImage/index.less` — 设计态图层样式。
- `src/components/report/floatingImage/types.ts` — `FloatImageConfig`、`PreviewFloatImage` 等类型定义。
- `src/components/report/floatingImage/utils.ts` — 列号转换、数据规范化、边界约束、校验等工具函数。
- `src/components/report/floatingImage/service.ts` — 附件预览 URL 获取。

### 打印与导出

- `src/components/report/print/utils/floatImageLayout.ts` — PDF/Word 导出时坐标计算与图层包装。
- `src/components/report/print/utils/DOC.ts` — Word 导出集成。
- `src/components/report/print/index.ts` — 打印入口集成。
- `src/components/report/print/utils/PDF.ts` — PDF 导出集成。

### 集成点

- `src/components/report/design/components/cusToolbar/index.tsx` — 工具栏入口与数量角标。
- `src/components/report/design/components/cusToolbar/buttons.tsx` — 工具栏按钮定义。
- `src/components/report/design/components/customTable/index.tsx` — 表格内右键/双击新增浮动图片。
- `src/components/report/design/store/index.ts` — schema 存储。
- `src/components/report/design/utils/saveUtil.ts` — 保存逻辑。
- `src/components/report/preview/table/index.tsx` — 预览态渲染。
- `src/pages/TableManager/preview/index.tsx` — 预览页集成。
- `src/pages/PrintManager/preview/index.tsx` — 打印预览集成。

### 测试

- `tests/floating-image.test.ts` — 覆盖列号、锚点单元格、数据规范化、边界约束、Object Fit 计算、PDF 坐标计算、隐藏列/跨页场景等。

## 数据结构

### 保存至 schema 的配置（`FloatImageConfig`）

```ts
interface FloatImageConfig {
  anchorCell: string;   // 例如 "A1"、"AB6"
  anchorRow: number;
  anchorCol: number;
  sourceType: 'image' | 'field';
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;       // 0 表示按原始比例自动计算高度
  zIndex: number;
  imageData: FloatImageData;
}
```

### 图片展示模式

- `0` — 原始大小（`none`）
- `1` — 拉伸填充（`fill`）
- `2` — 等比缩放（`contain`，默认）

## 主要实现要点

1. **锚点定位**：以单元格左上角为基准，通过 `offsetX`/`offsetY` 偏移；列号对外展示为 Excel 字母格式。
2. **边界约束**：`constrainFloatImageToTable` 在表格行列变化或窗口缩放时把图片限制在表格数据区内，宽度自动收敛，高度为 0 时按渲染高度自动计算。
3. **图层渲染**：设计态使用绝对定位图层覆盖在 Handsontable 上方，监听 `afterRender`/`afterScroll*` 等钩子重新布局。
4. **数据源**：
   - 固定图片：上传附件后保存 `asrFid`。
   - 字段图片：选择数据集、字段与图片源（URL/attachment_id），并支持数据过滤。
5. **预览/导出**：后端将字段图片解析为 `formatData` URL；前端 `normalizePreviewFloatImage` 统一处理固定/字段图片，PDF 坐标按 `transScale` 与隐藏列进行换算。
6. **PDF 图层**：`layerPdfTableWithFloatImages` 将表格与浮动图片包装为 pdfmake `columns`，保证二者处于同一页。

## 版本同步

| 版本名称 | 是否需要同步 | 当前状态 | 合入 Commit | 验证结果 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 6.5.2-dev | 是 | 已合入 | 见上方提交记录 | `npx tsx tests/floating-image.test.ts` 通过 | 来源分支 |
| master | 是 | 待同步 | - | - | 7.0 版本需在主干核对并同步 |

## 验证

- `npx tsx tests/floating-image.test.ts`：通过。
- 测试覆盖列号转换、锚点单元格、规范化、校验、边界约束、Object Fit 矩形、PDF 坐标计算、隐藏列过滤、跨页表头重复等场景。

## 备注

- 当前记录基于 `report-web` 分支 `6.5.2-dev` 的 Git 历史整理。
- **本功能需要同步到 7.0 版本（`master` 分支），目前状态为待同步。**
- 如需向 `6.5.2`、`6.5.1-dev`、`6.5.1`、`master` 等目标分支同步，请在合入后补充对应 Commit 与验证结果。
