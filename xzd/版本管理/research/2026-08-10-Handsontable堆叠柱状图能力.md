---
tags:
  - research
  - report-web
  - charts
  - handsontable
status: complete
date: 2026-08-10
updated: 2026-08-10
---

# Handsontable 堆叠柱状图能力

相关：[[00-版本总览]]、[[report-web-术语表]]

## 结论

Handsontable 本身不提供柱状图或堆叠柱状图组件。它在本项目中承担表格和图表单元格的挂载/渲染容器角色；堆叠能力应由实际图表库 `@ant-design/plots` 实现。

项目锁定的 `@ant-design/plots` 为 2.6.8，官方 Column 文档明确支持 `stack: true`，且其 `stack` 参数含义就是“柱状图是否堆叠”。因此新增堆叠柱状图可行，无需替换 Handsontable 或新增图表依赖。

## 官方依据

1. Handsontable 官方将产品定义为客户端、类电子表格的数据网格；官方单元格渲染器文档说明它可以用 renderer 将自定义 HTML 挂入单元格。官方 Chart.js 同步示例要求单独安装 `chart.js`，并用 `new Chart(...)` 创建柱状图，Handsontable 仅以选区和单元格数据驱动同步。这直接说明图表和堆叠配置不属于 Handsontable 内建能力。
   - https://handsontable.com/docs/javascript-data-grid/
   - https://handsontable.com/docs/javascript-data-grid/cell-renderer/
   - https://handsontable.com/docs/javascript-data-grid/recipes/real-time/chartjs-sync/
   - https://github.com/handsontable/handsontable/blob/develop/docs/content/recipes/real-time/chartjs-sync/javascript/example1.js
2. Ant Design Charts 官方 Column 文档把“堆叠柱状图”列为内置用法：`stack: true`；配置表定义 `stack` 为 `boolean | Stack`，默认 `false`，并支持堆叠百分比展示 `percent`。
   - https://ant-design-charts.antgroup.com/en/components/plots/column

## 项目现状

- [src/components/report/design/components/customTable/plugins/chartRender/column.tsx](C:/Users/jinxu/workspace/xzd/report-web/src/components/report/design/components/customTable/plugins/chartRender/column.tsx) 使用 `@ant-design/plots` 的 `Column`，数据字段为 `dimensionValue`、`value`、`statisticValue`，并固定传入 `group: true`，当前为分组柱状图。
- [src/components/report/design/components/customTable/plugins/chartRender/bar.tsx](C:/Users/jinxu/workspace/xzd/report-web/src/components/report/design/components/customTable/plugins/chartRender/bar.tsx) 的横向柱状图同样固定 `group: true`。
- [src/components/report/design/components/customTable/plugins/chartRender/render.tsx](C:/Users/jinxu/workspace/xzd/report-web/src/components/report/design/components/customTable/plugins/chartRender/render.tsx) 把 React 图表渲染到 Handsontable 单元格；Handsontable 不是图表实现来源。
- [src/constants/chartTypes.ts](C:/Users/jinxu/workspace/xzd/report-web/src/constants/chartTypes.ts) 当前只有柱状图、横向柱状图、折线、饼图和双轴图。其后端图表类型映射也只包含这五种。

## 建议实现范围

若“堆叠”是柱状图的一种展示样式，优先在现有柱状图/横向柱状图配置中增加 `group | stack` 的样式选项：普通柱状图保留 `group: true`，堆叠柱状图改为 `stack: true`，两者均继续使用现有的 `colorField: 'statisticValue'`。

若产品要求将“堆叠柱状图”作为独立图表类型，还需同步扩展前端类型清单、图表类型到后端 schema 的映射，以及后端对新类型的识别；仅改 Handsontable renderer 不足以完成保存和预览闭环。

实现时必须同时覆盖设计态、预览态和打印态，因为三者复用/调用了当前 `ColumnChart` 与 `BarChart`。建议增加正负值和百分比堆叠的样例验证；`percent` 是否开放应作为单独的产品选项，避免默认改变现有数值语义。
