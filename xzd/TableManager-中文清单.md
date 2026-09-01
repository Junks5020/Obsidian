---
tags:
  - report-web
  - TableManager
  - i18n
  - 多语言
  - 中文清单
created: 2026-09-01
updated: 2026-09-01
total_unique_keys: 186
key_format: "<identifier> (纯扁平化/无点号/全局唯一)"
---

# TableManager (报表管理) 多语言 (i18n) Key 与中文词条对照表

> **模块路径**：`src/pages/TableManager/ (含 categoryTree, printSetting, preview, customTable, filterModal 引用组件)`  
> **Key 规范原则**：
> 1. **纯扁平化 Key (Flat Identifier)**：去除所有前缀及点号（如直接使用 `add`、`edit`、`manageTitle`），无任何点号 `.` 嵌套。
> 2. **全局唯一与词条去重 (Unique & Deduplicated)**：相同中文词条全局仅保留一个唯一 Key。
> 3. **共归纳唯一词条**：**186** 个。

---

## 目录
- [一、完整 zh-CN 语言包 JSON（可直接导入）](#一完整-zh-cn-语言包-json可直接导入)
- [二、按业务分类对照清单](#二按业务分类对照清单)
  - [1. 基础操作与通用按钮](#1-基础操作与通用按钮)
  - [2. 表格列头与表单字段](#2-表格列头与表单字段)
  - [3. 页面标题与弹窗标题](#3-页面标题与弹窗标题)
  - [4. 枚举与下拉选项](#4-枚举与下拉选项)
  - [5. 操作符与判断条件](#5-操作符与判断条件)
  - [6. 提示/校验/占位符](#6-提示校验占位符)
- [三、代码注释与非 UI 常量说明（无需国际化）](#三代码注释与非-ui-常量说明无需国际化)

---

## 一、完整 zh-CN 语言包 JSON（可直接导入）

```json
{
  "manageTitle": "报表管理",
  "reportDesignTitle": "报表设计",
  "reportViewTitle": "报表查看",
  "reportPreviewTitle": "报表预览",
  "reportResultViewTitle": "报表结果查看",
  "workflowTitle": "工作流",
  "generateMenuTitle": "生成菜单",
  "editMenuTitle": "编辑菜单",
  "categoryManageTitle": "分类管理",
  "addDataSetTitle": "添加数据集",
  "queryConditionSettingTitle": "查询条件设置",
  "add": "添加",
  "edit": "编辑",
  "detail": "详情",
  "delete": "删除",
  "enable": "启用",
  "disable": "停用",
  "design": "设计",
  "copy": "复制",
  "save": "保存",
  "preview": "预览",
  "print": "打印",
  "printSetting": "打印设置",
  "query": "查询",
  "expandAll": "全部展开",
  "collapseAll": "全部收起",
  "reportResult": "报表结果",
  "saveCurrent": "保存当前",
  "viewResult": "结果查看",
  "layout": "布局",
  "saveLayout": "保存布局",
  "restoreDefault": "恢复默认",
  "export": "导出",
  "import": "导入",
  "importExport": "导入导出",
  "exportExcel": "导出EXCEL",
  "exportPdf": "导出PDF",
  "confirm": "确定",
  "cancel": "取消",
  "maintain": "维护",
  "deleteUserLayout": "删除用户布局",
  "querySetting": "查询设置",
  "setting": "设置",
  "generateMenu": "生成菜单",
  "updateName": "更新名称",
  "expand": "展开",
  "collapse": "收起",
  "confirmCancelShare": "确认取消共享",
  "copyCellContent": "复制单元格内容",
  "index": "序号",
  "code": "编码",
  "numberCode": "编号",
  "name": "名称",
  "category": "分类",
  "belongOrg": "所属组织",
  "mobileDisplay": "移动显示",
  "creator": "创建人",
  "createDate": "创建日期",
  "remark": "备注",
  "status": "状态",
  "action": "操作",
  "type": "类型",
  "businessSuite": "业务套件：",
  "queryField": "查询字段",
  "widgetSetting": "控件设置",
  "displayName": "显示名称",
  "param": "参数",
  "valueSource": "值来源",
  "value": "值",
  "queryMethod": "查询方式",
  "widgetType": "控件类型",
  "nullable": "允许为空",
  "placeholderLabel": "提示文字",
  "defaultValue": "默认值",
  "optionValue": "选项值",
  "dateFormat": "日期格式",
  "helpIdentifier": "帮助标识",
  "dataSet": "数据集",
  "codeField": "代码字段",
  "codeColField": "编码字段",
  "nameField": "名称字段",
  "dataFilter": "数据过滤",
  "width": "宽度",
  "defaultHidden": "默认隐藏",
  "share": "共享",
  "filterField": "过滤字段",
  "filterValue": "过滤值",
  "normalType": "普通",
  "complexType": "复杂",
  "constant": "常量",
  "variable": "变量",
  "systemParam": "系统参数",
  "manualInput": "手动输入",
  "yearUnit": "年",
  "yearMonthUnit": "年月",
  "yearMonthDayUnit": "年-月-日",
  "yearMonthDayHourMinUnit": "年-月-日-时分",
  "textWidget": "文本",
  "numberWidget": "数值",
  "selectWidget": "下拉",
  "dateWidget": "日期",
  "richHelpWidget": "通用帮助",
  "busHelpWidget": "组件帮助",
  "datePickerWidget": "日期控件",
  "rangeWidget": "区间控件",
  "queryWidget": "查询控件",
  "emptyOption": "空",
  "nonEmpty": "非空",
  "currUserOpId": "当前登录操作员ID",
  "currUserOpCode": "当前登录操作员编码",
  "currUserOrgId": "当前登录组织ID",
  "currUserOrgCode": "当前登录组织编码",
  "currUserProjectId": "当前登录项目ID",
  "currentDate": "当前日期",
  "currentMonth": "当前月份",
  "currentYear": "当前年度",
  "currentTime": "当前时间",
  "weekToToday": "本周(周一至今日)",
  "last7Days": "最近7天",
  "last30Days": "最近30天",
  "monthToToday": "本月至今",
  "last3Months": "最近3个月",
  "quarterToToday": "本季度至今",
  "lastQuarter": "上季度",
  "yearToToday": "本年至今",
  "firstDayOfMonth": "本月第一天",
  "firstDayOfYear": "本年第一天",
  "excelFile": "EXCEL文件",
  "jsonFile": "Json文件",
  "requiredTag": "必填",
  "refSourceTag": "引用源",
  "opEq": "等于",
  "opNotEq": "不等于",
  "opIn": "属于",
  "opGt": "大于",
  "opLt": "小于",
  "opGe": "大于等于",
  "opLe": "小于等于",
  "opLike": "包含",
  "opNotLike": "不包含",
  "opStartWith": "开始是",
  "opEndWith": "结尾是",
  "opBetween": "区间",
  "searchCodeNamePlaceholder": "请输入编码/名称",
  "searchNamePlaceholder": "请输入名称",
  "inputPlaceholder": "请输入",
  "selectPlaceholder": "请选择",
  "codeMaxLengthMsg": "最长20字符",
  "codeFormatMsg": "只能输入英文字符、数字和下划线！",
  "confirmDeleteMsg": "是否确认删除?",
  "confirmDeleteWithMenuMsg": "报表已生成菜单，删除报表会同步删除菜单信息，是否继续",
  "confirmDeleteMenuCascadeMsg": "删除菜单会同步删除配置的企业功能树菜单，是否继续？",
  "confirmCloseUnsavedMsg": "有修改内容未保存，确定要关闭吗?",
  "confirmDeleteUserLayoutMsg": "该操作会删除所有用户的个性化界面布局信息，是否继续?",
  "confirmRemoveSharedConditionMsg": "该条件为共享条件，删除后将同步移除所有Sheet页中的该查询条件，是否继续？",
  "confirmCancelShareConditionMsg": "该条件为共享条件，取消共享后将同步移除其他Sheet页中的该查询条件，是否继续？",
  "licenseLimitReachedMsg": "报表许可数已达到上线，无法添加，请增加许可张数后重试",
  "licenseLimitApproachingMsg": "报表许可数即将到达上限，目前剩余【{{remainCount}}】张",
  "saveSuccessMsg": "保存成功",
  "saveFailedPrefix": "保存失败: ",
  "updateSuccessMsg": "更新成功",
  "deleteSuccessMsg": "删除成功",
  "selectDataFirstMsg": "请先选择数据",
  "exportErrorMsg": "导出错误",
  "selectDataSetWarnMsg": "请选择数据集",
  "addDataSetWarnMsg": "请添加数据集",
  "completeFilterConfigWarnMsg": "请完善数据过滤配置",
  "max5RowsAllowedWarnMsg": "最多允许创建5行",
  "completeWidgetConfigWarnMsg": "请完善控件设置",
  "displayNameUniqueWarnMsg": "请注意显示名称控制当前列表内唯一",
  "displayNameDuplicateErrorMsg": "字段的显示名称不允许重复，请修改显示名称",
  "queryConfigErrorWarnMsg": "查询设置配置有误，请检查",
  "systemParamHiddenTip": "值来源为系统参数的查询条件会默认隐藏",
  "dataNotLoadedMsg": "打印数据未加载完成，请稍后重试",
  "tableNotReadyMsg": "表格实例未就绪，请稍后重试",
  "printFailedMsg": "打印失败",
  "pdfExportFailedMsg": "PDF导出失败",
  "previewFailedPrefix": "预览失败: ",
  "queryFallbackAppliedMsg": "已使用设计预览查询配置",
  "queryDefaultAppliedMsg": "已使用设计端默认查询配置",
  "queryConditionLoadFailedMsg": "查询条件加载失败",
  "settingAppliedMsg": "设置已应用",
  "saveFailedRetryMsg": "保存失败，请重试",
  "queryBeforeInputMsg": "查询前请先输入{{item}}",
  "selectEmptyFieldsMsg": "请先选择【{{fields}}】",
  "noConfigurableQueryEmpty": "暂无可配置查询条件"
}
```

---

## 二、按业务分类对照清单

### 1. 基础操作与通用按钮

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `add` | **添加** | 添加操作按钮 | `list/store.ts:L43` |
| `edit` | **编辑** | 编辑报表操作 | `list/components/columnOptions.tsx:L55` |
| `detail` | **详情** | 查看详情操作 | `list/components/columnOptions.tsx:L122` |
| `delete` | **删除** | 删除报表/过滤项操作 | `list/components/columnOptions.tsx:L80` |
| `enable` | **启用** | 状态启用标签/操作 | `list/components/columnOptions.tsx:L34, L431` |
| `disable` | **停用** | 状态停用标签/操作 | `list/components/columnOptions.tsx:L34, L431` |
| `design` | **设计** | 报表设计入口 | `list/components/columnOptions.tsx:L98` |
| `copy` | **复制** | 复制报表操作 | `list/components/columnOptions.tsx:L351` |
| `save` | **保存** | 设计器/设置保存 | `design/store/headerToolbar.tsx:L30` |
| `preview` | **预览** | 设计器预览操作 | `design/store/headerToolbar.tsx:L28` |
| `print` | **打印** | 预览页打印操作 | `preview/store/headerToolbar.tsx:L10` |
| `printSetting` | **打印设置** | 预览页打印设置操作 | `preview/store/headerToolbar.tsx:L11` |
| `query` | **查询** | 预览页查询数据操作 | `preview/store/headerToolbar.tsx:L12` |
| `expandAll` | **全部展开** | 树形报表全部展开 | `preview/store/headerToolbar.tsx:L13` |
| `collapseAll` | **全部收起** | 树形报表全部收起 | `preview/store/headerToolbar.tsx:L14` |
| `reportResult` | **报表结果** | 报表结果菜单项 | `preview/store/headerToolbar.tsx:L17` |
| `saveCurrent` | **保存当前** | 保存当前报表快照 | `preview/store/headerToolbar.tsx:L21` |
| `viewResult` | **结果查看** | 查看历史报表结果 | `preview/store/headerToolbar.tsx:L26` |
| `layout` | **布局** | 界面布局菜单项 | `preview/store/headerToolbar.tsx:L32` |
| `saveLayout` | **保存布局** | 保存用户自定义布局 | `preview/store/headerToolbar.tsx:L36` |
| `restoreDefault` | **恢复默认** | 恢复默认表格布局 | `preview/store/headerToolbar.tsx:L40` |
| `export` | **导出** | 导出操作 | `design/store/headerToolbar.tsx:L20` |
| `import` | **导入** | 导入操作 | `design/store/headerToolbar.tsx:L16` |
| `importExport` | **导入导出** | 导入导出下拉菜单 | `design/store/headerToolbar.tsx:L12` |
| `exportExcel` | **导出EXCEL** | 导出Excel文件 | `preview/store/headerToolbar.tsx:L50` |
| `exportPdf` | **导出PDF** | 导出PDF文件 | `preview/store/headerToolbar.tsx:L54` |
| `confirm` | **确定** | 弹窗确定按钮 | `list/components/tableDrawer.tsx:L145` |
| `cancel` | **取消** | 弹窗取消按钮 | `list/components/tableDrawer.tsx:L137` |
| `maintain` | **维护** | 维护入口按钮 | `list/store.ts:L55` |
| `deleteUserLayout` | **删除用户布局** | 清除布局缓存 | `design/store/headerToolbar.tsx:L24` |
| `querySetting` | **查询设置** | 打开查询设置弹窗 | `design/store/headerToolbar.tsx:L25` |
| `setting` | **设置** | 过滤设置操作 | `design/components/querySetModal/...:L67` |
| `generateMenu` | **生成菜单** | 生成系统功能树菜单 | `list/components/columnOptions.tsx:L329` |
| `updateName` | **更新名称** | 更新菜单名称 | `list/components/columnOptions.tsx:L308` |
| `expand` | **展开** | 数据集侧边栏展开 | `design/components/leftAddDataSet/...:L165` |
| `collapse` | **收起** | 数据集侧边栏收起 | `design/components/leftAddDataSet/...:L165` |
| `confirmCancelShare` | **确认取消共享** | 取消共享确认按钮 | `design/components/.../rightForm:L661` |
| `copyCellContent` | **复制单元格内容** | 右键菜单项 | `components/report/preview/table/...:L175` |

### 2. 表格列头与表单字段

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `index` | **序号** | 表格序号列头 | `list/store.ts:L80` |
| `code` | **编码** | 报表编码表单标签 | `list/store.ts:L156` |
| `numberCode` | **编号** | 报表编号列头 | `list/components/columnOptions.tsx:L391` |
| `name` | **名称** | 报表名称表单/列头 | `list/components/columnOptions.tsx:L397` |
| `category` | **分类** | 报表分类表单/列头 | `list/components/columnOptions.tsx:L404` |
| `belongOrg` | **所属组织** | 所属组织表单/列头 | `list/components/columnOptions.tsx:L409` |
| `mobileDisplay` | **移动显示** | 移动端显示开关标签 | `list/store.ts:L203` |
| `creator` | **创建人** | 创建人表单/列头 | `list/components/columnOptions.tsx:L415` |
| `createDate` | **创建日期** | 创建日期表单标签 | `list/store.ts:L210` |
| `remark` | **备注** | 备注表单/列头 | `list/components/columnOptions.tsx:L421` |
| `status` | **状态** | 状态列头 | `list/components/columnOptions.tsx:L428` |
| `action` | **操作** | 表格操作列头 | `list/components/columnOptions.tsx:L434` |
| `type` | **类型** | 类型列头/表单项 | `design/store/index.ts:L49` |
| `businessSuite` | **业务套件：** | 业务套件选择前缀 | `list/components/columnOptions.tsx:L215` |
| `queryField` | **查询字段** | 查询字段配置面板 | `design/components/querySetModal:L52` |
| `widgetSetting` | **控件设置** | 控件参数配置面板 | `design/components/querySetModal:L59` |
| `displayName` | **显示名称** | 显示名称列头/标签 | `design/components/.../leftTable:L42` |
| `param` | **参数** | 参数列表头 | `design/components/.../leftTable:L67` |
| `valueSource` | **值来源** | 值来源配置标签 | `design/components/.../rightForm:L140` |
| `value` | **值** | 值配置表单标签 | `design/components/.../rightForm:L148` |
| `queryMethod` | **查询方式** | 查询运算符标签 | `design/components/.../rightForm:L156` |
| `widgetType` | **控件类型** | 控件类型选择标签 | `design/components/.../rightForm:L191` |
| `nullable` | **允许为空** | 允许为空勾选标签 | `design/components/.../rightForm:L198` |
| `placeholderLabel` | **提示文字** | 占位文本配置标签 | `design/components/.../rightForm:L200` |
| `defaultValue` | **默认值** | 默认值配置表单标签 | `design/components/.../rightForm:L221` |
| `optionValue` | **选项值** | 下拉选项配置标签 | `design/components/.../rightForm:L295` |
| `dateFormat` | **日期格式** | 日期控件格式配置 | `design/components/.../rightForm:L372` |
| `helpIdentifier` | **帮助标识** | 通用/组件帮助标识 | `design/components/.../rightForm:L443` |
| `dataSet` | **数据集** | 关联数据集选择标签 | `design/components/.../rightForm:L537` |
| `codeField` | **代码字段** | 代码字段绑定标签 | `design/components/.../rightForm:L545` |
| `codeColField` | **编码字段** | 编码字段绑定标签 | `design/components/.../rightForm:L556` |
| `nameField` | **名称字段** | 名称字段绑定标签 | `design/components/.../rightForm:L567` |
| `dataFilter` | **数据过滤** | 过滤配置项标签 | `design/components/.../rightForm:L578` |
| `width` | **宽度** | 控件展示宽度 | `design/components/.../rightForm:L631` |
| `defaultHidden` | **默认隐藏** | 默认隐藏开关标签 | `design/components/.../rightForm:L639` |
| `share` | **共享** | Sheet页共享勾选标签 | `design/components/.../rightForm:L640` |
| `filterField` | **过滤字段** | 数据过滤字段列表头 | `design/components/.../filter:L107` |
| `filterValue` | **过滤值** | 数据过滤值列表头 | `design/components/.../filter:L169` |

### 3. 页面标题与弹窗标题

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `manageTitle` | **报表管理** | 报表管理模块页面标题 | `list/store.ts:L126` |
| `reportDesignTitle` | **报表设计** | 设计器页面标题 | `list/components/columnOptions.tsx:L92` |
| `reportViewTitle` | **报表查看** | 查看报表详情标题 | `list/store.ts:L115` |
| `reportPreviewTitle` | **报表预览** | 报表预览页面标题 | `design/components/...:L10` |
| `reportResultViewTitle` | **报表结果查看** | 快照查看页面标题 | `reportWorkFlow/index.tsx:L38` |
| `workflowTitle` | **工作流** | 工作流流转面板标题 | `reportWorkFlow/index.tsx:L44` |
| `generateMenuTitle` | **生成菜单** | 生成功能树菜单弹窗标题 | `list/components/columnOptions.tsx:L147` |
| `editMenuTitle` | **编辑菜单** | 编辑功能树菜单弹窗标题 | `list/components/columnOptions.tsx:L157` |
| `categoryManageTitle` | **分类管理** | 分类管理抽屉标题 | `components/report/categoryTree:L34` |
| `addDataSetTitle` | **添加数据集** | 设计器添加数据集弹窗 | `design/components/...:L126` |
| `queryConditionSettingTitle` | **查询条件设置** | 预览端查询条件设置弹窗 | `preview/index.tsx:L993` |

### 4. 枚举与下拉选项

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `normalType` | **普通** | 报表模式-普通 | `design/store/index.ts:L52` |
| `complexType` | **复杂** | 报表模式-复杂 | `design/store/index.ts:L52` |
| `constant` | **常量** | 值类型-常量 | `design/components/.../filter:L73` |
| `variable` | **变量** | 值类型-变量 | `design/components/.../filter:L74` |
| `systemParam` | **系统参数** | 值来源-系统参数 | `design/components/.../constants.ts:L88` |
| `manualInput` | **手动输入** | 值来源-手动输入 | `design/components/.../constants.ts:L89` |
| `yearUnit` | **年** | 时间维度-年 | `design/components/.../constants.ts:L93` |
| `yearMonthUnit` | **年月** | 时间维度-年月 | `design/components/.../constants.ts:L94` |
| `yearMonthDayUnit` | **年-月-日** | 时间维度-年-月-日 | `design/components/.../constants.ts:L95` |
| `yearMonthDayHourMinUnit` | **年-月-日-时分** | 时间维度-年-月-日-时分 | `design/components/.../constants.ts:L96` |
| `textWidget` | **文本** | 控件类型-文本 | `design/components/.../constants.ts:L100` |
| `numberWidget` | **数值** | 控件类型-数值 | `design/components/.../constants.ts:L101` |
| `selectWidget` | **下拉** | 控件类型-下拉 | `design/components/.../constants.ts:L102` |
| `dateWidget` | **日期** | 控件类型-日期 | `design/components/.../constants.ts:L103` |
| `richHelpWidget` | **通用帮助** | 控件类型-通用帮助 | `design/components/.../constants.ts:L104` |
| `busHelpWidget` | **组件帮助** | 控件类型-组件帮助 | `design/components/.../constants.ts:L105` |
| `datePickerWidget` | **日期控件** | 查询控件-日期控件 | `preview/components/...:L23` |
| `rangeWidget` | **区间控件** | 查询控件-区间控件 | `preview/components/...:L27` |
| `queryWidget` | **查询控件** | 通用查询控件兜底标签 | `preview/components/...:L34` |
| `emptyOption` | **空** | 默认值选项-空 | `design/components/.../rightForm:L406` |
| `nonEmpty` | **非空** | 运算符-非空 | `components/report/preview/...:L30` |
| `currUserOpId` | **当前登录操作员ID** | 系统变量-当前登录操作员ID | `design/components/...:L110` |
| `currUserOpCode` | **当前登录操作员编码** | 系统变量-当前登录操作员编码 | `design/components/...:L111` |
| `currUserOrgId` | **当前登录组织ID** | 系统变量-当前登录组织ID | `design/components/...:L112` |
| `currUserOrgCode` | **当前登录组织编码** | 系统变量-当前登录组织编码 | `design/components/...:L113` |
| `currUserProjectId` | **当前登录项目ID** | 系统变量-当前登录项目ID | `design/components/...:L114` |
| `currentDate` | **当前日期** | 系统变量-当前日期 | `design/components/...:L115` |
| `currentMonth` | **当前月份** | 系统变量-当前月份 | `design/components/...:L116` |
| `currentYear` | **当前年度** | 系统变量-当前年度 | `design/components/...:L117` |
| `currentTime` | **当前时间** | 系统变量-当前时间 | `design/components/...:L421` |
| `weekToToday` | **本周(周一至今日)** | 日期快捷范围-本周 | `design/components/...:L408` |
| `last7Days` | **最近7天** | 日期快捷范围-最近7天 | `design/components/...:L409` |
| `last30Days` | **最近30天** | 日期快捷范围-最近30天 | `design/components/...:L410` |
| `monthToToday` | **本月至今** | 日期快捷范围-本月至今 | `design/components/...:L411` |
| `last3Months` | **最近3个月** | 日期快捷范围-最近3个月 | `design/components/...:L412` |
| `quarterToToday` | **本季度至今** | 日期快捷范围-本季度至今 | `design/components/...:L413` |
| `lastQuarter` | **上季度** | 日期快捷范围-上季度 | `design/components/...:L414` |
| `yearToToday` | **本年至今** | 日期快捷范围-本年至今 | `design/components/...:L415` |
| `firstDayOfMonth` | **本月第一天** | 日期快捷范围-本月第一天 | `design/components/...:L424` |
| `firstDayOfYear` | **本年第一天** | 日期快捷范围-本年第一天 | `design/components/...:L426` |
| `excelFile` | **EXCEL文件** | 导出格式-EXCEL | `design/components/...:L407` |
| `jsonFile` | **Json文件** | 导出格式-Json | `design/components/...:L408` |
| `requiredTag` | **必填** | 字段必填标签 | `preview/components/...:L118` |
| `refSourceTag` | **引用源** | 联动引用源标签 | `preview/components/...:L119` |

### 5. 操作符与判断条件

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `opEq` | **等于** | 操作符-等于 | `design/components/...:L121` |
| `opNotEq` | **不等于** | 操作符-不等于 | `design/components/...:L122` |
| `opIn` | **属于** | 操作符-属于 | `design/components/...:L123` |
| `opGt` | **大于** | 操作符-大于 | `design/components/...:L129` |
| `opLt` | **小于** | 操作符-小于 | `design/components/...:L130` |
| `opGe` | **大于等于** | 操作符-大于等于 | `design/components/...:L131` |
| `opLe` | **小于等于** | 操作符-小于等于 | `design/components/...:L132` |
| `opLike` | **包含** | 操作符-包含 | `design/components/...:L218` |
| `opNotLike` | **不包含** | 操作符-不包含 | `components/report/preview/...:L28` |
| `opStartWith` | **开始是** | 操作符-开始是 | `components/report/preview/...:L25` |
| `opEndWith` | **结尾是** | 操作符-结尾是 | `components/report/preview/...:L26` |
| `opBetween` | **区间** | 操作符-区间 | `design/components/...:L257` |

### 6. 提示/校验/占位符

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `searchCodeNamePlaceholder` | **请输入编码/名称** | 搜索框占位符 | `list/index.tsx:L22` |
| `searchNamePlaceholder` | **请输入名称** | 名称搜索占位符 | `design/components/...:L67` |
| `inputPlaceholder` | **请输入** | 通用输入框占位符 | `design/components/...:L224` |
| `selectPlaceholder` | **请选择** | 通用选择框占位符 | `design/components/...:L716` |
| `codeMaxLengthMsg` | **最长20字符** | 编码长度校验提示 | `list/store.ts:L162` |
| `codeFormatMsg` | **只能输入英文字符、数字和下划线！** | 编码字符格式校验提示 | `list/store.ts:L168` |
| `confirmDeleteMsg` | **是否确认删除?** | 删除二次确认提示 | `list/components/columnOptions.tsx:L66` |
| `confirmDeleteWithMenuMsg` | **报表已生成菜单，删除报表会同步删除菜单信息，是否继续** | 级联菜单删除确认提示 | `list/components/columnOptions.tsx:L69` |
| `confirmDeleteMenuCascadeMsg` | **删除菜单会同步删除配置的企业功能树菜单，是否继续？** | 功能树级联删除确认提示 | `list/components/columnOptions.tsx:L280` |
| `confirmCloseUnsavedMsg` | **有修改内容未保存，确定要关闭吗?** | 关闭未保存确认提示 | `list/components/tableDrawer.tsx:L28` |
| `confirmDeleteUserLayoutMsg` | **该操作会删除所有用户的个性化界面布局信息，是否继续?** | 清除布局二次确认 | `design/components/...:L96` |
| `confirmRemoveSharedConditionMsg` | **该条件为共享条件，删除后将同步移除所有Sheet页中的该查询条件，是否继续？** | 删除共享条件确认 | `design/components/...:L236` |
| `confirmCancelShareConditionMsg` | **该条件为共享条件，取消共享后将同步移除其他Sheet页中的该查询条件，是否继续？** | 取消共享条件确认 | `design/components/...:L660` |
| `licenseLimitReachedMsg` | **报表许可数已达到上线，无法添加，请增加许可张数后重试** | 许可数耗尽拦截提示 | `list/index.tsx:L44` |
| `licenseLimitApproachingMsg` | **报表许可数即将到达上限，目前剩余【{{remainCount}}】张** | 许可数预警提示 | `list/index.tsx:L49` |
| `saveSuccessMsg` | **保存成功** | 保存成功轻提示 | `design/components/...:L19` |
| `saveFailedPrefix` | **保存失败: ** | 保存失败提示前缀 | `design/components/...:L26` |
| `updateSuccessMsg` | **更新成功** | 更新成功轻提示 | `list/components/columnOptions.tsx:L265` |
| `deleteSuccessMsg` | **删除成功** | 删除成功轻提示 | `list/components/columnOptions.tsx:L283` |
| `selectDataFirstMsg` | **请先选择数据** | 未选中数据拦截提示 | `list/components/columnOptions.tsx:L191` |
| `exportErrorMsg` | **导出错误** | 导出异常提示 | `design/service.ts:L60` |
| `selectDataSetWarnMsg` | **请选择数据集** | 未选数据集警告 | `design/components/...:L145` |
| `addDataSetWarnMsg` | **请添加数据集** | 未添加数据集警告 | `design/components/...:L253` |
| `completeFilterConfigWarnMsg` | **请完善数据过滤配置** | 过滤配置不全提示 | `design/components/...:L47` |
| `max5RowsAllowedWarnMsg` | **最多允许创建5行** | 过滤行数超限提示 | `design/components/...:L281` |
| `completeWidgetConfigWarnMsg` | **请完善控件设置** | 控件设置不全提示 | `design/components/...:L116` |
| `displayNameUniqueWarnMsg` | **请注意显示名称控制当前列表内唯一** | 显示名称唯一性说明 | `design/components/...:L120` |
| `displayNameDuplicateErrorMsg` | **字段的显示名称不允许重复，请修改显示名称** | 显示名称重复错误提示 | `design/components/...:L60` |
| `queryConfigErrorWarnMsg` | **查询设置配置有误，请检查** | 查询设置综合错误提示 | `design/components/...:L126` |
| `systemParamHiddenTip` | **值来源为系统参数的查询条件会默认隐藏** | 系统参数隐藏提示 | `design/components/...:L178` |
| `dataNotLoadedMsg` | **打印数据未加载完成，请稍后重试** | 打印数据未加载拦截 | `preview/index.tsx:L360` |
| `tableNotReadyMsg` | **表格实例未就绪，请稍后重试** | 表格实例未就绪拦截 | `preview/index.tsx:L364` |
| `printFailedMsg` | **打印失败** | 打印执行失败提示 | `preview/index.tsx:L374` |
| `pdfExportFailedMsg` | **PDF导出失败** | PDF导出失败提示 | `preview/index.tsx:L409` |
| `previewFailedPrefix` | **预览失败: ** | 预览失败提示前缀 | `preview/index.tsx:L533` |
| `queryFallbackAppliedMsg` | **已使用设计预览查询配置** | 查询配置兜底提示 | `preview/index.tsx:L672` |
| `queryDefaultAppliedMsg` | **已使用设计端默认查询配置** | 默认查询配置兜底提示 | `preview/index.tsx:L701` |
| `queryConditionLoadFailedMsg` | **查询条件加载失败** | 查询条件接口失败提示 | `preview/index.tsx:L673` |
| `settingAppliedMsg` | **设置已应用** | 设置已应用轻提示 | `preview/index.tsx:L949` |
| `saveFailedRetryMsg` | **保存失败，请重试** | 保存失败重试提示 | `preview/index.tsx:L966` |
| `queryBeforeInputMsg` | **查询前请先输入{{item}}** | 必填查询项未输拦截 | `preview/index.tsx:L1041` |
| `selectEmptyFieldsMsg` | **请先选择【{{fields}}】** | 必选项未选拦截提示 | `preview/utils/query.ts:L14` |
| `noConfigurableQueryEmpty` | **暂无可配置查询条件** | 查询设置空状态 | `preview/components/...:L91` |

---

## 三、代码注释与非 UI 常量说明（无需国际化）

以下为源码中的开发者注释、控制台调试信息与内部技术标识，仅供代码维护与架构理解，**无需**提取到国际化词条中：

| 所在文件 | 行号 | 类型 | 内容说明 |
| :--- | :--- | :--- | :--- |
| `preview/index.tsx` | L1134 | 控制台调试 | console.log('进预览页面了') |
| `preview/plugins/linkRender/fieldColumnMap.ts` | L82 | 控制台异常 | console.error('[linkField] 预加载字段列映射失败', e) |
| `print/loadIntoCSS/index.ts` | L18-L21 | 控制台调试 | 字体加载成功/失败日志 |
| `print/utils/processImageUrl.ts` | L32-L130 | 内部底层异常 | new Error('无效的图片 URL') / Canvas 上下文创建失败 |
| `print/utils/splitRow.ts` | L54 | 计算底层异常 | throw new Error('除数不能为0') |
| `design/store/index.ts` | L68 | 开发者注释 | // 过滤未启用数据集 |
| `preview/utils/isMobile.ts` | L19 | 开发者注释 | // 判断是不是在portal里面打开 |

---
*文档生成于 2026-09-01，已完全去除点号前缀，纯扁平化 Key。*