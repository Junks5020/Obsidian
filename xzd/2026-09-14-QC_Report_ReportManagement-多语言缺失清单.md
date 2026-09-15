---
tags:
  - report-web
  - TableManager
  - QC_Report_ReportManagement
  - i18n
  - 多语言
  - 缺失清单
status: active
date: 2026-09-14
created: 2026-09-14
updated: 2026-09-14
busType: QC_Report_ReportManagement
missing_key_count: 51
invalid_value_count: 3
---

# QC_Report_ReportManagement 多语言缺失清单（2026-09-14）

相关：[[00-多语言总览]]、[[TableManager-中文清单]]、[[2026-09-14-PrintSetV2-多语言缺失清单]]

## 一、审计范围

- 业务类型：`QC_Report_ReportManagement`
- 对应模块：`src/pages/TableManager/`
- 页面范围：报表管理列表页、分类树、设计页、预览页，以及这些页面引用的共享报表组件
- 审计日期：**2026-09-14**
- 后端词包 key 数：**600**
- 静态扫描文件数：**327**
- `getLang` 调用数：**1143**
- 对照数据：当前后端 `QC_Report_ReportManagement` 返回值及前端实际调用路径

## 二、结论

1. 当前后端词包中仍缺少前端实际使用的 **51 个 key**。
2. 缺失项主要集中在打印设置、字段/图表属性、组件帮助类型、图片预览和预览筛选弹窗。
3. 另有 **3 个 key 虽然存在，但返回模板异常**，主要问题是动态占位符缺失、重复或语义不明确。
4. 还扫描到 8 个 `SimpleTableManager` 字段类型映射 key；它们在本业务调用图中仅作为映射依赖，不直接由报表管理页面渲染，因此不计入 51 个确认缺失项。

## 三、按页面区域划分的缺失 key

### 1. 报表分类树（1 个）

| key | 中文含义 | 使用位置 |
| --- | --- | --- |
| `deleteChildNodesFirst` | 请先删除子节点 | 删除包含子节点的分类时的提示 |

### 2. 设计页/预览页图片预览（2 个）

| key | 中文含义 | 使用位置 |
| --- | --- | --- |
| `ImageUnavailable` | 图片暂不可预览 | 图片预览失败或无有效图片时 |
| `ResetImagePreview` | 重置 | 图片预览工具栏 |

### 3. 打印设置（22 个）

| key | 中文含义 | 使用位置 |
| --- | --- | --- |
| `pageTab` | 页面 | 打印设置页签 |
| `marginTab` | 页边距 | 打印设置页签 |
| `pagingTab` | 分页 | 打印设置页签 |
| `headerFooterTab` | 页眉页脚 | 打印设置页签 |
| `header` | 页眉 | 页眉页脚、页边距设置 |
| `footer` | 页脚 | 页眉页脚、页边距设置 |
| `topMargin` | 上边距 | 页边距设置 |
| `bottomMargin` | 下边距 | 页边距设置 |
| `leftMargin` | 左边距 | 页边距设置 |
| `rightMargin` | 右边距 | 页边距设置 |
| `centerMode` | 居中方式 | 页边距设置 |
| `printDirection` | 打印方向 | 页面设置 |
| `portrait` | 纵向 | 打印方向选项 |
| `landscape` | 横向 | 打印方向选项 |
| `scale` | 缩放比例 | 页面设置 |
| `paperSize` | 纸张大小 | 页面设置 |
| `tailArea` | 表尾区 | 分页设置、设计保存校验 |
| `pagingPrintOrder` | 分页打印顺序 | 分页设置 |
| `titleArea` | 标题区 | 分页区域设置 |
| `dataArea` | 数据区 | 分页区域设置 |
| `horizontalThenVertical` | 先横后纵 | 分页打印顺序选项 |
| `verticalThenHorizontal` | 先纵后横 | 分页打印顺序选项 |

### 4. 冻结设置（1 个）

| key | 中文含义 | 使用位置 |
| --- | --- | --- |
| `freezeToRow` | 冻结至第 `{{row}}` 行 | 设计工具栏冻结面板 |

### 5. 字段/图表属性（10 个）

| key | 中文含义 | 使用位置 |
| --- | --- | --- |
| `aggregateMode` | 聚合方式 | 字段单元格、图表字段配置 |
| `aggregationMax` | 最大值 | 聚合方式选项 |
| `aggregationMin` | 最小值 | 聚合方式选项 |
| `aggregationSum` | 求和 | 聚合方式选项 |
| `rename` | 重命名 | 图表字段配置 |
| `chartShowTitle` | 显示标题 | 图表样式、数据集标题设置 |
| `chartPrefix` | 前缀 | 图表样式 |
| `chartSuffix` | 后缀 | 图表样式 |
| `chartUnit` | 单位 | 图表样式 |
| `prompt` | 提示 | 图片、链接、树形和标题帮助弹窗 |

### 6. 组件帮助类型（13 个）

| key | 中文含义 |
| --- | --- |
| `operatorHelp` | 操作员帮助 |
| `departmentHelp` | 部门帮助 |
| `organizationHelp` | 组织帮助 |
| `projectHelp` | 项目帮助 |
| `projectTypeHelp` | 项目类型帮助 |
| `customerHelp` | 客户帮助 |
| `supplierHelp` | 供应商帮助 |
| `enterpriseHelp` | 往来单位帮助 |
| `employeeHelp` | 员工帮助 |
| `materialHelp` | 物料帮助 |
| `wbsHelp` | WBS 帮助 |
| `cbsHelp` | CBS 帮助 |
| `contractHelp` | 合同帮助 |

### 7. 预览筛选弹窗（2 个）

| key | 中文含义 | 使用位置 |
| --- | --- | --- |
| `reset` | 重置 | 筛选弹窗底部按钮 |
| `filter` | 筛选 | 筛选弹窗选择区域 |

## 四、后端待补充 key（去重，共 51 个）

```text
deleteChildNodesFirst
ImageUnavailable
ResetImagePreview
pageTab
marginTab
pagingTab
headerFooterTab
header
footer
freezeToRow
topMargin
bottomMargin
leftMargin
rightMargin
centerMode
printDirection
portrait
landscape
scale
paperSize
tailArea
pagingPrintOrder
titleArea
dataArea
horizontalThenVertical
verticalThenHorizontal
aggregateMode
aggregationMax
aggregationMin
rename
aggregationSum
chartShowTitle
chartPrefix
chartSuffix
chartUnit
prompt
operatorHelp
departmentHelp
organizationHelp
projectHelp
projectTypeHelp
customerHelp
supplierHelp
enterpriseHelp
employeeHelp
materialHelp
wbsHelp
cbsHelp
contractHelp
reset
filter
```

## 五、异常返回值（3 个）

“异常值”表示 key 已经存在于后端词包中，但 value 的模板本身不正确；它与“缺失 key”是两类问题。

| key | 当前后端返回值 | 问题 | 建议值 |
| --- | --- | --- | --- |
| `freezeToColumn` | `冻结至第{{frozenHeader}}_ng` | 缺少“列”单位，占位符语义不明确 | `冻结至第{{col}}列_ng` |
| `freezeToRowCol` | `冻结至{{frozenHeader}}{{frozenHeader}}_ng` | 重复同一占位符，无法区分行列 | `冻结至第{{row}}行第{{col}}列_ng` |
| `Layer` | `{{image}}・{{image}}・ 图层{{}}{{image}}_ng` | 包含重复占位符和空占位符 | `图层_ng` |

> 如果后端将冻结模板的参数统一修改为 `row`、`col`，前端调用时也必须同步传递同名参数。当前前端对上述异常模板已有兼容处理，但兼容逻辑不能替代后端词条修正。

## 六、不计入缺失数的 incidental key（8 个）

以下 key 来自 `src/pages/SimpleTableManager/constants/maps.ts` 的字段类型映射。报表管理模块间接导入了该映射，但这些翻译结果并不直接在 `QC_Report_ReportManagement` 页面中渲染，因此本次不计入 51 个缺失项：

```text
typeText
typeNumber
typeDate
typeTime
typeCombo
typeHelp
typeMultiHelp
typeAttachment
```

如后续该映射开始在报表管理页面直接展示，应重新纳入该 busType 的词包审计。

## 七、建议处理顺序

1. 后端先补齐会直接暴露在常用弹窗中的 `reset`、`filter`、`prompt`、图片预览和打印设置相关 key。
2. 补齐字段/图表属性与组件帮助类型 key。
3. 修正 `freezeToColumn`、`freezeToRowCol`、`Layer` 三个异常模板，并同步核对前端占位符参数。
4. 补词后重新验证列表页、设计页、打印设置、冻结面板、图表属性、图片预览和预览筛选弹窗。

## 八、日期备注与验证边界

- **2026-09-14**：完成 `QC_Report_ReportManagement` 后端 600 个 key 与前端 327 个依赖文件、1143 次 `getLang` 调用的静态比对。
- **2026-09-14**：确认 51 个缺失 key、3 个异常返回值、8 个不直接渲染的 incidental key。
- **2026-09-14**：TableManager 与 PrintManager 多语言自动化测试合计 13 项通过。
- **2026-09-14**：真实浏览器验证受本机 CUA 认证方式限制，错误为 `unsupported Codex auth method: apikey`；待环境恢复后补充页面实测结果。
