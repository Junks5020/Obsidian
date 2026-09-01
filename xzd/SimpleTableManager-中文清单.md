---
tags:
  - report-web
  - SimpleTableManager
  - i18n
  - 多语言
  - 中文清单
created: 2026-09-01
updated: 2026-09-01
total_unique_keys: 114
key_format: "<identifier> (纯扁平化/无点号/全局唯一)"
---

# SimpleTableManager (简易报表管理) 多语言 (i18n) Key 与中文词条对照表

> **模块路径**：`src/pages/SimpleTableManager/ (含 catagoryTree, charts, configForm, CellChartFieldsSelect, CellChartStyle 引用组件)`  
> **Key 规范原则**：
> 1. **纯扁平化 Key (Flat Identifier)**：去除所有前缀及点号（如直接使用 `add`、`edit`、`manageTitle`），无任何点号 `.` 嵌套。
> 2. **全局唯一与词条去重 (Unique & Deduplicated)**：相同中文词条全局仅保留一个唯一 Key。
> 3. **共归纳唯一词条**：**114** 个。

---

## 目录
- [一、完整 zh-CN 语言包 JSON（可直接导入）](#一完整-zh-cn-语言包-json可直接导入)
- [二、按业务分类对照清单](#二按业务分类对照清单)
  - [1. 基础操作与通用按钮](#1-基础操作与通用按钮)
  - [2. 表格列头、字段与配置表单项](#2-表格列头字段与配置表单项)
  - [3. 页面标题与弹窗标题](#3-页面标题与弹窗标题)
  - [4. 图表类型、聚合方式与方案枚举](#4-图表类型聚合方式与方案枚举)
  - [5. 操作符与判断条件](#5-操作符与判断条件)
  - [6. 提示/校验/占位符](#6-提示校验占位符)
- [三、代码注释与非 UI 常量说明（无需国际化）](#三代码注释与非-ui-常量说明无需国际化)

---

## 一、完整 zh-CN 语言包 JSON（可直接导入）

```json
{
  "manageTitle": "简易报表管理",
  "addTitle": "简易报表新增",
  "addPersonalTitle": "简易报表新增-个人",
  "designTitle": "简易报表设计",
  "personalDesignTitle": "简易报表-设计",
  "maxPreviewTitle": "简易报表-最大化预览",
  "copyReportTitle": "简易报表-复制",
  "unnamedChart": "未命名图表",
  "add": "添加",
  "design": "设计",
  "delete": "删除",
  "enable": "启用",
  "disable": "停用",
  "cancel": "取消",
  "preview": "预览",
  "save": "保存",
  "copy": "复制",
  "maximize": "最大化",
  "moveUp": "上移",
  "moveDown": "下移",
  "addField": "添加字段",
  "switch": "切换",
  "rename": "重命名",
  "index": "序号",
  "name": "名称",
  "creator": "创建人",
  "createTime": "创建时间",
  "status": "状态",
  "action": "操作",
  "field": "字段",
  "detailTable": "明细表",
  "chart": "图表",
  "config": "配置",
  "style": "样式",
  "dimension": "维度",
  "xDimension": "横轴（维度）",
  "yDimension": "纵轴（维度）",
  "numeric": "数值",
  "xNumeric": "横轴（数值）",
  "yNumeric": "纵轴（数值）",
  "mainYNumeric": "主纵轴（数值）",
  "subYNumeric": "次纵轴（数值）",
  "group": "分组",
  "mainYGroup": "分组（主纵轴）",
  "subYGroup": "分组（次纵轴）",
  "filter": "筛选",
  "shape": "图形",
  "rowX": "行（横轴）",
  "colY": "列（纵轴）",
  "colSubY": "列（次纵轴）",
  "dataLabel": "数据标签",
  "shapeGraphicColor": "图形颜色",
  "showTitle": "显示标题",
  "showData": "显示数据",
  "prefix": "前缀",
  "suffix": "后缀",
  "unit": "单位",
  "decimalPlaces": "保留小数位：",
  "aggregationMode": "聚合方式",
  "businessForm": "业务表单",
  "barChart": "柱状图",
  "lineChart": "折线图",
  "pieChart": "饼图",
  "dualAxesChart": "双轴图",
  "horizontalBarChart": "横向柱状图",
  "ringShape": "环形",
  "pieShape": "饼形",
  "lineShape": "折线",
  "curveShape": "曲线",
  "colorPlan1": "内置方案一",
  "colorPlan2": "内置方案二",
  "colorPlan3": "内置方案三",
  "colorPlan4": "内置方案四",
  "colorPlan5": "内置方案五",
  "aggSum": "求和",
  "aggMax": "最大值",
  "aggMin": "最小值",
  "aggAvg": "平均值",
  "aggCount": "计数",
  "aggDistinctCount": "去重计数",
  "publicScope": "公共",
  "personalScope": "个人",
  "typeText": "文本",
  "typeNumber": "数值",
  "typeDate": "日期",
  "typeTime": "时间",
  "typeCombo": "下拉",
  "typeHelp": "通用帮助",
  "typeMultiHelp": "多选通用帮助",
  "typeAttachment": "附件",
  "opEq": "等于",
  "opNotEq": "不等于",
  "opGt": "大于",
  "opGe": "大于等于",
  "opLt": "小于",
  "opLe": "小于等于",
  "opIn": "属于",
  "opBetween": "区间",
  "operatorJudge": "判断符",
  "inputNamePlaceholder": "请输入名称",
  "inputPlaceholder": "请输入",
  "filterWidgetPlaceholder": "筛选控件",
  "confirmDeleteMsg": "是否确认删除?",
  "confirmDeleteShortMsg": "确认要删除吗?",
  "cannotMultiValueAndGroupTooltip": "不能同时配置多数值和分组",
  "cannotAddDuplicateFieldMsg": "不能添加重复的字段",
  "cannotDuplicateMainSubYMsg": "不允许添加主次纵轴重复的字段",
  "cannotDuplicateWithSubYMsg": "不允许添加与次纵轴重复的字段",
  "setChartTypeMsg": "请设置图表类型",
  "formValidateFailedMsg": "表单校验未通过",
  "previewFailedPrefix": "预览失败: ",
  "saveSuccessMsg": "保存成功",
  "saveFailedPrefix": "保存失败: ",
  "fetchDataFailedPrefix": "获取数据失败: "
}
```

---

## 二、按业务分类对照清单

### 1. 基础操作与通用按钮

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `add` | **添加** | 添加图表/报表按钮 | `list/store/index.ts:L13` |
| `design` | **设计** | 简易报表设计操作 | `list/components/columnOptions.tsx:L39` |
| `delete` | **删除** | 删除报表/卡片操作 | `list/components/columnOptions.tsx:L55` |
| `enable` | **启用** | 状态启用标签/操作 | `list/components/columnOptions.tsx:L20, L114` |
| `disable` | **停用** | 状态停用标签/操作 | `list/components/columnOptions.tsx:L20, L114` |
| `cancel` | **取消** | 顶部工具栏取消操作 | `design/store.ts:L19` |
| `preview` | **预览** | 顶部工具栏预览操作 | `design/store.ts:L23, components/...:L23` |
| `save` | **保存** | 顶部工具栏保存操作 | `design/store.ts:L26` |
| `copy` | **复制** | 卡片下拉菜单-复制 | `preview/components/.../DropTools.tsx:L38` |
| `maximize` | **最大化** | 卡片下拉菜单-最大化 | `preview/components/.../DropTools.tsx:L20` |
| `moveUp` | **上移** | 卡片下拉菜单-上移 | `preview/components/.../DropTools.tsx:L29` |
| `moveDown` | **下移** | 卡片下拉菜单-下移 | `preview/components/.../DropTools.tsx:L34` |
| `addField` | **添加字段** | 指标/维度添加按钮 | `components/.../ConfigChartFieldsSelect.tsx:L51` |
| `switch` | **切换** | 折叠面板切换操作 | `components/catagoryTree/CollapsePanel.tsx:L91` |
| `rename` | **重命名** | 指标重命名弹窗操作 | `rightCellProperties/...:L221` |

### 2. 表格列头、字段与配置表单项

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `index` | **序号** | 表格序号列头 | `list/components/columnOptions.tsx:L82` |
| `name` | **名称** | 报表名称列头/字段 | `list/components/columnOptions.tsx:L92` |
| `creator` | **创建人** | 创建人列头 | `list/components/columnOptions.tsx:L99` |
| `createTime` | **创建时间** | 创建时间列头 | `list/components/columnOptions.tsx:L105` |
| `status` | **状态** | 状态列头 | `list/components/columnOptions.tsx:L111` |
| `action` | **操作** | 表格操作列头 | `list/components/columnOptions.tsx:L117` |
| `field` | **字段** | 字段面板标签 | `components/catagoryTree/index.tsx:L149` |
| `detailTable` | **明细表** | 明细表卡片标签 | `components/catagoryTree/toggleDetail.tsx:L8` |
| `chart` | **图表** | 图表配置面板标题 | `components/configForm/index.tsx:L93` |
| `config` | **配置** | 配置Tab标签 | `constants/form.ts:L7` |
| `style` | **样式** | 样式Tab标签 | `constants/form.ts:L184` |
| `dimension` | **维度** | 维度字段标签 | `constants/form.ts:L26` |
| `xDimension` | **横轴（维度）** | 横轴维度标签 | `constants/form.ts:L29` |
| `yDimension` | **纵轴（维度）** | 纵轴维度标签 | `constants/form.ts:L23` |
| `numeric` | **数值** | 数值字段标签 | `constants/form.ts:L62` |
| `xNumeric` | **横轴（数值）** | 横轴数值标签 | `constants/form.ts:L52` |
| `yNumeric` | **纵轴（数值）** | 纵轴数值标签 | `constants/form.ts:L66` |
| `mainYNumeric` | **主纵轴（数值）** | 主纵轴数值标签 | `constants/form.ts:L55` |
| `subYNumeric` | **次纵轴（数值）** | 次纵轴数值标签 | `constants/form.ts:L78` |
| `group` | **分组** | 分组字段标签 | `constants/form.ts:L102` |
| `mainYGroup` | **分组（主纵轴）** | 主纵轴分组标签 | `constants/form.ts:L117` |
| `subYGroup` | **分组（次纵轴）** | 次纵轴分组标签 | `constants/form.ts:L134` |
| `filter` | **筛选** | 筛选字段标签 | `constants/form.ts:L152` |
| `shape` | **图形** | 图形类型标签 | `constants/form.ts:L158` |
| `rowX` | **行（横轴）** | 样式行维度标签 | `constants/form.ts:L190` |
| `colY` | **列（纵轴）** | 样式列维度标签 | `constants/form.ts:L204` |
| `colSubY` | **列（次纵轴）** | 样式次纵轴标签 | `constants/form.ts:L218` |
| `dataLabel` | **数据标签** | 数据标签配置项 | `constants/form.ts:L233` |
| `shapeGraphicColor` | **图形颜色** | 配色方案配置项 | `constants/form.ts:L238` |
| `showTitle` | **显示标题** | 标题展示开关标签 | `rightCellProperties/...:L7` |
| `showData` | **显示数据** | 数据展示开关标签 | `rightCellProperties/...:L7` |
| `prefix` | **前缀** | 数值前缀标签 | `rightCellProperties/...:L77` |
| `suffix` | **后缀** | 数值后缀标签 | `rightCellProperties/...:L81` |
| `unit` | **单位** | 数值单位标签 | `rightCellProperties/...:L95` |
| `decimalPlaces` | **保留小数位：** | 保留小数位设置 | `rightCellProperties/...:L143` |
| `aggregationMode` | **聚合方式** | 聚合计算方式标签 | `rightCellProperties/...:L241` |
| `businessForm` | **业务表单** | 系统功能树业务表单 | `components/report/systemMenuTree:L27` |

### 3. 页面标题与弹窗标题

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `manageTitle` | **简易报表管理** | 页面路由/标题 | `route.ts:L63` |
| `addTitle` | **简易报表新增** | 列表新增页面标题 | `list/index.tsx:L39` |
| `addPersonalTitle` | **简易报表新增-个人** | 个人报表新增标题 | `preview/index.tsx:L93` |
| `designTitle` | **简易报表设计** | 设计器页面标题 | `list/components/columnOptions.tsx:L35` |
| `personalDesignTitle` | **简易报表-设计** | 个人设计页面标题 | `preview/components/...:L61` |
| `maxPreviewTitle` | **简易报表-最大化预览** | 最大化预览页面标题 | `preview/components/...:L53` |
| `copyReportTitle` | **简易报表-复制** | 复制报表页面标题 | `preview/components/...:L75` |
| `unnamedChart` | **未命名图表** | 新建图表默认标题 | `components/topHeaderTitle:L36` |

### 4. 图表类型、聚合方式与方案枚举

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `barChart` | **柱状图** | 图表类型-柱状图 | `constants/chartTypes.ts:L3` |
| `lineChart` | **折线图** | 图表类型-折线图 | `constants/chartTypes.ts:L7` |
| `pieChart` | **饼图** | 图表类型-饼图 | `constants/chartTypes.ts:L11` |
| `dualAxesChart` | **双轴图** | 图表类型-双轴图 | `constants/chartTypes.ts:L15` |
| `horizontalBarChart` | **横向柱状图** | 图表类型-横向柱状图 | `constants/chartTypes.ts:L19` |
| `ringShape` | **环形** | 图形细分-环形 | `constants/chartTypes.ts:L28` |
| `pieShape` | **饼形** | 图形细分-饼形 | `constants/chartTypes.ts:L32` |
| `lineShape` | **折线** | 图形细分-折线 | `constants/chartTypes.ts:L39` |
| `curveShape` | **曲线** | 图形细分-曲线 | `constants/chartTypes.ts:L43` |
| `colorPlan1` | **内置方案一** | 配色方案1 | `components/charts/colorPlans.tsx:L6` |
| `colorPlan2` | **内置方案二** | 配色方案2 | `components/charts/colorPlans.tsx:L20` |
| `colorPlan3` | **内置方案三** | 配色方案3 | `components/charts/colorPlans.tsx:L38` |
| `colorPlan4` | **内置方案四** | 配色方案4 | `components/charts/colorPlans.tsx:L56` |
| `colorPlan5` | **内置方案五** | 配色方案5 | `components/charts/colorPlans.tsx:L70` |
| `aggSum` | **求和** | 聚合方式-求和 | `rightCellProperties/...:L317` |
| `aggMax` | **最大值** | 聚合方式-最大值 | `rightCellProperties/...:L321` |
| `aggMin` | **最小值** | 聚合方式-最小值 | `rightCellProperties/...:L325` |
| `aggAvg` | **平均值** | 聚合方式-平均值 | `rightCellProperties/...:L329` |
| `aggCount` | **计数** | 聚合方式-计数 | `rightCellProperties/...:L333` |
| `aggDistinctCount` | **去重计数** | 聚合方式-去重计数 | `rightCellProperties/...:L337` |
| `publicScope` | **公共** | 报表范围-公共 | `preview/index.tsx:L74` |
| `personalScope` | **个人** | 报表范围-个人 | `preview/index.tsx:L79` |
| `typeText` | **文本** | 字段类型-文本 | `constants/maps.ts:L46` |
| `typeNumber` | **数值** | 字段类型-数值 | `constants/maps.ts:L51` |
| `typeDate` | **日期** | 字段类型-日期 | `constants/maps.ts:L56` |
| `typeTime` | **时间** | 字段类型-时间 | `constants/maps.ts:L61` |
| `typeCombo` | **下拉** | 字段类型-下拉 | `constants/maps.ts:L66` |
| `typeHelp` | **通用帮助** | 字段类型-通用帮助 | `constants/maps.ts:L71` |
| `typeMultiHelp` | **多选通用帮助** | 字段类型-多选通用帮助 | `constants/maps.ts:L76` |
| `typeAttachment` | **附件** | 字段类型-附件 | `constants/maps.ts:L81` |

### 5. 操作符与判断条件

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `opEq` | **等于** | 操作符-等于 | `constants/maps.ts:L3` |
| `opNotEq` | **不等于** | 操作符-不等于 | `constants/maps.ts:L8` |
| `opGt` | **大于** | 操作符-大于 | `constants/maps.ts:L13` |
| `opGe` | **大于等于** | 操作符-大于等于 | `constants/maps.ts:L18` |
| `opLt` | **小于** | 操作符-小于 | `constants/maps.ts:L23` |
| `opLe` | **小于等于** | 操作符-小于等于 | `constants/maps.ts:L28` |
| `opIn` | **属于** | 操作符-属于 | `constants/maps.ts:L33` |
| `opBetween` | **区间** | 操作符-区间 | `constants/maps.ts:L38` |
| `operatorJudge` | **判断符** | 判断符选择占位 | `components/.../ConfigChartFilter.tsx:L145` |

### 6. 提示/校验/占位符

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `inputNamePlaceholder` | **请输入名称** | 名称搜索占位符 | `components/catagoryTree/...:L161` |
| `inputPlaceholder` | **请输入** | 通用输入占位符 | `rightCellProperties/...:L112` |
| `filterWidgetPlaceholder` | **筛选控件** | 筛选占位输入提示 | `components/.../ConfigChartFilter.tsx:L194` |
| `confirmDeleteMsg` | **是否确认删除?** | 删除二次确认提示 | `list/components/columnOptions.tsx:L50` |
| `confirmDeleteShortMsg` | **确认要删除吗?** | 删除短提示确认 | `preview/components/...:L79` |
| `cannotMultiValueAndGroupTooltip` | **不能同时配置多数值和分组** | 多数值与分组互斥提示 | `components/...:L55` |
| `cannotAddDuplicateFieldMsg` | **不能添加重复的字段** | 重复字段添加拦截 | `components/...:L61` |
| `cannotDuplicateMainSubYMsg` | **不允许添加主次纵轴重复的字段** | 主次纵轴重复拦截 | `constants/form.ts:L94` |
| `cannotDuplicateWithSubYMsg` | **不允许添加与次纵轴重复的字段** | 纵轴重复拦截 | `constants/form.ts:L58` |
| `setChartTypeMsg` | **请设置图表类型** | 图表类型校验提示 | `valid.ts:L11` |
| `formValidateFailedMsg` | **表单校验未通过** | 表单校验错误轻提示 | `valid.ts:L19` |
| `previewFailedPrefix` | **预览失败: ** | 预览失败提示前缀 | `components/.../utils.ts:L13` |
| `saveSuccessMsg` | **保存成功** | 保存成功轻提示 | `components/.../utils.ts:L20` |
| `saveFailedPrefix` | **保存失败: ** | 保存失败提示前缀 | `components/.../utils.ts:L30` |
| `fetchDataFailedPrefix` | **获取数据失败: ** | 获取数据失败提示前缀 | `maxPreview/index.tsx:L20` |

---

## 三、代码注释与非 UI 常量说明（无需国际化）

以下为源码中的开发者注释、控制台调试信息与内部技术标识，仅供代码维护与架构理解，**无需**提取到国际化词条中：

| 所在文件 | 行号 | 类型 | 内容说明 |
| :--- | :--- | :--- | :--- |
| `constants/form.ts` | L1-L10 | 开发者注释 | 配置项定义与样式布局结构注释 |
| `components/charts/chartTypes.ts` | L1-L25 | 常量定义 | 图表类型与默认配置常量注释 |
| `components/configForm/index.tsx` | L1-L30 | 开发者注释 | 图表配置表单联动事件注释 |
| `service.ts` | L1-L30 | 代码注释/接口 | 简易报表增删改查接口说明注释 |

---
*文档生成于 2026-09-01，已完全去除点号前缀，纯扁平化 Key。*