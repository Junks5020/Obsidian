---
id: FEATURE-20261021-001
type: feature
status: completed
commits: [fc092cf00, e2ad8e61a, dac9c779d]
source_branch: ng-design:ljx-7.0
created: 2026-10-21
updated: 2026-10-21
target_versions: [ljx-7.0]
repositories: [ng-design]
tags: [version-change, feature, ng-design, udp-report-table, cell-border]
---

# FEATURE-20261021-001：单元格边框线条样式（Excel BorderStyle）

## 2026-10-24 宿主 PDF 扩展提交

report-web:ljx-7.0 新增本地提交 `2f76b2944a60563ebae28fd97d109cd183d0e962`，将 borderStyle 映射到 PDF 单元格线型，并以 pdfmake 0.3.10 补丁支持逐格、合并和分页边框。73 项宿主回归通过，生产构建结果见 [[代码提交记录/report-web/变更记录/BUG-20261024-001-print-preview-and-package-runtime]]。未推送或部署；下文“PDF 链路未改动”为原组件交付时的历史边界。

| 关联 Bug 修复 | 仓库/分支 | 提交 |
| --- | --- | --- |
| BUG-20261024-001-print-preview-and-package-runtime | report-web:ljx-7.0 | 2f76b2944a60563ebae28fd97d109cd183d0e962 |

相关：[[report-table-同步术语表]]、[[report-table-ADR-0010-样式边界与自动加载]]、[[00-版本总览]]。

## 范围与交付状态

- 组件工作区：`C:\Users\jinxu\workspace\xzd\ng-design.worktrees\sync_branch`，分支 `ljx-7.0`。
- 实现位置：`packages/@newgrand/udp-report-table`，宿主 `report-web` 通过 `.umirc.local.ts` 的本地源码别名消费，本次未改宿主代码。
- 三个本地提交：`fc092cf00`（功能）、`e2ad8e61a`（渲染与命令边界收紧）、`dac9c779d`（验收与文档修正）；未推送、未发包。
- 未跟踪的 `ngproxy.ini` 本地改动保留，未纳入提交。

## 需求与实现

工具栏“边框”弹层新增“边框样式”，按 Excel“线条样式”顺序预置 13 项（细实线、极细线、点线、虚线、点划线、双点划线、双实线、中等实线、中虚线、中点划线、中双点划线、斜点划线、粗实线）。

| 关注点 | 实现 |
| --- | --- |
| 数据契约 | `cellBorders[方向].borderStyle` 存 Excel/Apache POI `BorderStyle` 序号字符串 `"0"`–`"13"`；无该字段的历史数据继续按 `width` 渲染细实线 |
| 线宽 | 显式样式优先：中等 2px、粗线/双线 3px；保存结构仍保留原 `width`（需求样例 `width:1 + borderStyle:"2"` 渲染 2px） |
| 绘制 | `border-style` 覆盖实线/虚线/点线/双线；点划线族、极细线用重复渐变图层逐段绘制，互不退化 |
| 图层承载 | 渲染期只写 `--ht-border-layers/-sizes/-positions/-repeats` 并挂 `htBorderPattern`，背景组合由样式表决定，避免覆盖单元格既有背景图层 |
| 设计态/预览态 | 共用 `src/shared/borderStyle.ts`；预览 class token 增加样式段（`htBorder_Top_1_FE0200_2`），历史无样式段 token 仍按细实线解析 |
| 命令语义 | 颜色/样式状态按表格实例隔离；清除边框后改颜色/样式只缓存不重放清除；`borderStyle: 0` 按显式空值处理 |
| 相邻边框 | 上边框写入上一行的**下**边框，并保留邻居自身其它边的图层 |

## 验证与证据

- 包内测试：`node --test packages/@newgrand/udp-report-table/tests/` → **261/261 通过**（新增 19 条边框用例，含样式码、历史数据、稀疏边、图层组合、邻居方向、清除后改样式、实例隔离、合并单元格、保存往返、网格线可覆盖与图层/高亮组合静态断言）。
- 构建：`father build`（`FATHER_TSCONFIG_NAME=tsconfig.build.json`）ESM/CJS/声明文件生成成功。
- Ego Lite 真实指针验收（TaskSpace 2）：
  - 设计器：选中 A2 → 打开边框弹层 → 选“点划线”→ 应用下边框，得到 `htBorderPattern` + 90deg 图层、`border-bottom: none`；清除后回到默认网格线；重新应用“中双点划线”得到 2px 波段。
  - 预览（临时 fixture，`ReportTable` + `cellBorders`）：点划线单元格渲染图层，中等实线单元格为 2px，历史 `width:2` 单元格为 2px 实线；点击带边框单元格后同时具备 `htBorderPattern` 与 `htCrossHair`，背景为两层（高亮兜底 + 边框图层）。
  - 保存取值（临时 fixture，`ref.current.getValue()`）：UI 应用点划线+下边框后，`schema` 中该单元格为 `cellBorders.bottom = { width: 1, color: "#000000", borderStyle: "9", hide: false }`，与后端约定一致。
  - 临时 fixture 与注入样式均在验收后删除/重载，未入库。

## 已知限制与遗留

- 浏览器渲染是近似实现：`HAIR`、`DASH_DOT`、`DASH_DOT_DOT`、`SLANTED_DASH_DOT` 由渐变逐段模拟，与 Excel 存在像素级差异。
- 后端 Excel 导出需按 `borderStyle` 生成线条，该链路未联调验证；打印 PDF 链路的线条样式本次未改动（pdfmake 布局共用 `lineWidth`，不支持逐格线型）。
- 发现既有缺陷（本次未修，另行处理）：`src/preview/table/style.less` 顶层 `.reportPreviewTable` 经根样式表嵌套后编译为 `.udp-report-table .reportPreviewTable ...`，而预览根节点是**同一个元素**同时带这两个类，选择器永不命中；因此其中十字高亮、换行、斑马纹等规则当前处于未生效状态，验收中 `--ht-crosshair-layer` 只取到根样式表的透明兜底。
