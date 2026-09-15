---
tags:
  - report-web
  - SimpleTableManager
  - i18n
  - 多语言
  - 缺失清单
status: active
date: 2026-09-14
created: 2026-09-14
updated: 2026-09-14
busType: QC_Report_SimpleReportDesign
missing_key_count: 92
invalid_value_count: 4
---

# QC_Report_SimpleReportDesign 多语言缺失清单（2026-09-14）

相关：[[00-多语言总览]]、[[SimpleTableManager-中文清单]]

## 一、审计范围

- 业务类型：`QC_Report_SimpleReportDesign`
- 模块：`src/pages/SimpleTableManager/`
- 页面：`list`、`design`、`preview`、`personalDesign`、`maxPreview`
- 后端返回 key：**185**
- 静态 import 图可达文件：**70**
- `NG.getLang` 调用：**164**
- 实际调用的静态唯一 key：**125**
- 动态 key：**0**

## 二、结论

1. 当前对象不是“简易报表词包少量漏 key”，而是高度疑似返回了 `QC_Report_DatasetManagement` 数据集管理词包。
2. 185 个后端 key 中，**159 个**与数据集管理基准重合，其中 **147 个 value 完全一致**。
3. 当前页面实际调用的 125 个 key 中，后端仅命中 33 个，**缺失 92 个**。
4. 简易报表 114 个规范基准 key 中缺失 **81 个**。另有 24 个共享组件正在调用的历史/兼容 key 不在规范基准中；基准中又有 13 个同义 key 当前未直接调用，因此实际缺失数为 `81 + 24 - 13 = 92`。
5. 已返回但与简易报表基准不一致的 value 有 **4 个**；其中 `manageTitle` 是明确的错业务值。

## 三、串包证据

| key | 当前返回 | 简易报表期望 | 判断 |
| --- | --- | --- | --- |
| `manageTitle` | `数据集管理_ng` | `简易报表管理_ng` | 明确错业务 |

对象还返回了大量数据集专用 key：

```text
querySql
paramSetting
materializeTitle
tableJoinTitle
scheduleStrategy
dataTableTitle
fieldSettingTitle
dataPreviewTitle
queryDefTitle
executionLogTitle
```

## 四、后端待补充 key（代码实际调用，去重 92 个）

```text
action
addField
AddField
addPersonalTitle
addTitle
aggregateMode
aggregationMax
aggregationMin
aggregationSum
Avg
barChart
brokenLine
businessForm
CannotAddDuplicateField
cannotAddDuplicateFieldMsg
cannotDuplicateMainSubYMsg
cannotDuplicateWithSubYMsg
cannotMultiValueAndGroupTooltip
CannotSimultaneouslyConfigMultiNumberGroup
chart
chartDecimalPlaces
chartPrefix
chartShowTitle
chartSuffix
chartUnit
colorPlan1
colorPlan2
colorPlan3
colorPlan4
colorPlan5
colSubY
colY
config
confirmCancel
confirmDeleteShortMsg
confirmOk
copy
copyReportTitle
Count
CountDistinct
createTime
curve
curveShape
dataLabel
design
designTitle
detailTable
dimension
donutChart
dualAxesChart
enterName
fetchDataFailedPrefix
filter
filterWidgetPlaceholder
formValidateFailedMsg
group
horizontalBarChart
inputPlaceholder
lineChart
lineShape
mainYGroup
mainYNumeric
maximize
maxPreviewTitle
moveDown
moveUp
numeric
personalDesignTitle
personalScope
pieChart
pieShape
pleaseEnter
preview
publicScope
rename
ringShape
rowX
saveFailedPrefix
searchNamePlaceholder
setChartTypeMsg
shape
shapeGraphicColor
ShowData
style
subYGroup
subYNumeric
switch
unnamedChart
xDimension
xNumeric
yDimension
yNumeric
```

> key 区分大小写，例如 `addField` 与 `AddField`、`showData` 与 `ShowData` 不是同一 key。后端补词前应先确认是临时兼容注册，还是同步统一前端命名。

## 五、页面归属

| 页面/区域 | 主要缺失 key | 代码位置 |
| --- | --- | --- |
| 列表页 | `addTitle`、`designTitle`、`design`、`createTime`、`action` | `SimpleTableManager/list/` |
| 个人/公共预览操作 | `preview`、`copy`、`maximize`、`moveUp`、`moveDown`、`copyReportTitle`、`maxPreviewTitle`、`personalDesignTitle` | `SimpleTableManager/preview/` |
| 设计页图表配置 | `chart`、`config`、`style`、`dimension`、`numeric`、`filter`、`shape`、`addField` | `SimpleTableManager/components/configForm/`、`constants/form.ts` |
| 图表类型和配色 | `barChart`、`lineChart`、`pieChart`、`dualAxesChart`、`ringShape`、`colorPlan1` 至 `colorPlan5` | `SimpleTableManager/constants/`、`components/charts/` |
| 图表字段与聚合 | `aggregateMode`、`aggregationMax`、`aggregationMin`、`aggregationSum`、`Avg`、`Count`、`CountDistinct` | `components/report/rightCellProperties/xtypes/CellChartFieldsSelect.tsx` |
| 图表显示样式 | `chartShowTitle`、`chartPrefix`、`chartSuffix`、`chartUnit`、`chartDecimalPlaces`、`ShowData` | `components/report/rightCellProperties/xtypes/CellChartStyle.tsx` |
| 业务表单树/通用弹窗 | `businessForm`、`searchNamePlaceholder`、`enterName`、`confirmOk`、`confirmCancel` | `components/report/systemMenuTree/`、`components/report/dialog.ts` |
| 校验和错误提示 | `setChartTypeMsg`、`formValidateFailedMsg`、`saveFailedPrefix`、`fetchDataFailedPrefix` | `SimpleTableManager/valid.ts`、`topHeaderTitle/utils.ts`、`maxPreview/index.tsx` |

## 六、异常/不一致返回值

| key | 当前返回 | 简易报表基准 | 影响 |
| --- | --- | --- | --- |
| `manageTitle` | `数据集管理_ng` | `简易报表管理_ng` | **明确错业务，页面标题错误** |
| `typeHelp` | `帮助_ng` | `通用帮助_ng` | 语义不完整 |
| `typeMultiHelp` | `多选帮助_ng` | `多选通用帮助_ng` | 语义不完整 |
| `confirmDeleteMsg` | `确认要删除吗?_ng` | `是否确认删除?_ng` | 语义基本等价，属文案一致性问题 |

## 七、兼容 key 与规范 key

当前代码直接调用、但未收录到 114 项规范基准中的 24 个 key：

```text
AddField
Avg
CannotAddDuplicateField
CannotSimultaneouslyConfigMultiNumberGroup
Count
CountDistinct
ShowData
aggregateMode
aggregationMax
aggregationMin
aggregationSum
brokenLine
chartDecimalPlaces
chartPrefix
chartShowTitle
chartSuffix
chartUnit
confirmCancel
confirmOk
curve
donutChart
enterName
pleaseEnter
searchNamePlaceholder
```

规范基准中有 13 个缺失 key 当前未被可达代码直接调用，主要因为代码仍使用上面的同义历史 key：

```text
aggAvg
aggCount
aggDistinctCount
aggMax
aggMin
aggSum
aggregationMode
decimalPlaces
prefix
showData
showTitle
suffix
unit
```

建议确定唯一命名规范后同步调整前端调用和后端注册，避免长期维护两套同义 key。

## 八、处理建议

1. 先排查 `busType = QC_Report_SimpleReportDesign` 的后端词包绑定和缓存，修正串入数据集词包的根问题。
2. 以 [[SimpleTableManager-中文清单]] 的 114 个规范 key 为主合同，补齐其中 81 个缺失项。
3. 对 24 个历史/兼容 key 做命名收敛；前端未收敛前，如需立即消除中文回退，后端需临时兼容注册。
4. 修正 `manageTitle`、`typeHelp`、`typeMultiHelp`，并统一 `confirmDeleteMsg` 文案。
5. 修正后重新运行静态审计，并实测列表、设计、个人/公共预览和最大化预览页面。

## 九、日期备注与验证边界

- **2026-09-14**：完成后端 185 个 key 与 5 个页面入口、70 个可达文件、164 次 `getLang` 调用的静态对照。
- **2026-09-14**：确认代码实际缺失 92 个 key，规范基准缺失 81 个 key，异常/不一致 value 4 个。
- 审计基于 TypeScript AST 和静态 import 可达性，覆盖代码中的字面量 key；不包含服务端运行时注入及第三方组件内部词条。
- 真实浏览器验证仍受本地 CUA 认证限制：`unsupported Codex auth method: apikey`；本次不宣称已完成页面实测。

