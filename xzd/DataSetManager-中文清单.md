---
tags:
  - report-web
  - DataSetManager
  - i18n
  - 多语言
  - 中文清单
created: 2026-09-01
updated: 2026-09-01
total_unique_keys: 166
key_format: "<identifier> (纯扁平化/无点号/全局唯一)"
---

# DataSetManager (数据集管理) 多语言 (i18n) Key 与中文词条对照表

> **模块路径**：`src/pages/DataSetManager/ (含 components/bindInfoField, previewTable, transferTable 引用组件)`  
> **Key 规范原则**：
> 1. **纯扁平化 Key (Flat Identifier)**：去除所有前缀及点号（如直接使用 `add`、`edit`、`manageTitle`），无任何点号 `.` 嵌套。
> 2. **全局唯一与词条去重 (Unique & Deduplicated)**：相同中文词条全局仅保留一个唯一 Key。
> 3. **共归纳唯一词条**：**166** 个。

---

## 目录
- [一、完整 zh-CN 语言包 JSON（可直接导入）](#一完整-zh-cn-语言包-json可直接导入)
- [二、按业务分类对照清单](#二按业务分类对照清单)
  - [1. 基础操作与通用按钮](#1-基础操作与通用按钮)
  - [2. 表格列头与表单字段](#2-表格列头与表单字段)
  - [3. 页面标题、向导步骤与弹窗标题](#3-页面标题向导步骤与弹窗标题)
  - [4. 枚举与下拉选项](#4-枚举与下拉选项)
  - [5. 操作符与连接类型](#5-操作符与连接类型)
  - [6. 提示/校验/占位符](#6-提示校验占位符)
- [三、代码注释与非 UI 常量说明（无需国际化）](#三代码注释与非-ui-常量说明无需国际化)

---

## 一、完整 zh-CN 语言包 JSON（可直接导入）

```json
{
  "manageTitle": "数据集管理",
  "addNormalTitle": "数据集新增-普通",
  "addComplexTitle": "数据集新增-复杂",
  "editTitle": "数据集编辑",
  "detailTitle": "数据集详情",
  "materializeTitle": "数据集物化",
  "basicInfoTitle": "基本信息",
  "dataTableTitle": "数据表",
  "relationTitle": "关系",
  "queryDefTitle": "查询定义",
  "dataFilterTitle": "数据过滤",
  "fieldSettingTitle": "字段设置",
  "dataPreviewTitle": "数据预览",
  "fieldDisplaySettingTitle": "字段展示设置",
  "dataSortSettingTitle": "数据排序设置",
  "otherDbQueryModalTitle": "其他数据库查询语句维护",
  "tableJoinTitle": "表连接关系",
  "bindInfoAuthTitle": "绑定信息权限",
  "addDataSetTitle": "添加数据集",
  "executionLogTitle": "执行日志",
  "add": "添加",
  "edit": "编辑",
  "detail": "详情",
  "delete": "删除",
  "enable": "启用",
  "disable": "停用",
  "cancel": "取消",
  "confirm": "确定",
  "prevStep": "上一步",
  "nextStep": "下一步",
  "save": "保存",
  "maintain": "维护",
  "materialize": "物化",
  "executeNow": "立即执行",
  "selectAll": "全选",
  "addDataTable": "添加数据表",
  "deleteDataTable": "删除数据表",
  "andCondition": "+ 且条件",
  "conditionGroup": "+ 条件组",
  "orSatisfy": "或者满足",
  "index": "序号",
  "code": "编码",
  "numberCode": "编号",
  "name": "名称",
  "category": "分类",
  "creator": "创建人",
  "remark": "备注",
  "status": "状态",
  "action": "操作",
  "type": "类型",
  "dataSource": "数据源",
  "dataTable": "数据表",
  "tableName": "表名",
  "comment": "注释",
  "field": "字段",
  "fieldName": "字段名",
  "fieldType": "字段类型",
  "displayName": "显示名称",
  "defaultValue": "默认值",
  "multiSelect": "多选",
  "paramName": "参数名",
  "paramType": "参数类型",
  "paramSetting": "参数设置",
  "sortType": "排序方式",
  "sortAsc": "升序",
  "sortDesc": "降序",
  "querySql": "查询语句",
  "otherDbQuerySql": "其他数据库查询维护语句",
  "physicalTableName": "物理表名",
  "description": "描述",
  "scheduleStrategy": "定时策略",
  "startTime": "开始时间",
  "endTime": "结束时间",
  "executionDuration": "执行时长",
  "failReason": "失败原因",
  "businessType": "业务类型",
  "containerTitle": "容器标题",
  "containerId": "容器ID",
  "normalType": "普通",
  "complexType": "复杂",
  "sqlType": "SQL语句",
  "storedProcType": "存储过程",
  "damengDb": "达梦",
  "kingbaseDb": "人大金仓",
  "typeText": "文本",
  "typeNumber": "数值",
  "typeDate": "日期",
  "typeTime": "时间",
  "typeCombo": "下拉",
  "typeHelp": "帮助",
  "typeMultiHelp": "多选帮助",
  "typeAttachment": "附件",
  "daily": "每天",
  "weekly": "每周",
  "monthly": "每月",
  "monday": "周一",
  "tuesday": "周二",
  "wednesday": "周三",
  "thursday": "周四",
  "friday": "周五",
  "saturday": "周六",
  "sunday": "周日",
  "successStatus": "成功",
  "failStatus": "失败",
  "atPreposition": "在",
  "executeVerb": "执行",
  "hoursUnit": "小时",
  "minutesUnit": "分",
  "secondsUnit": "秒",
  "opEq": "等于",
  "opNotEq": "不等于",
  "opGt": "大于",
  "opGe": "大于等于",
  "opLt": "小于",
  "opLe": "小于等于",
  "opIn": "属于",
  "opBetween": "区间",
  "operatorJudge": "判断符",
  "leftJoin": "左连接",
  "leftJoinDesc": "该连接关系会将左表所有的查询信息列出，而右表只列出条件与左表满足的部分",
  "innerJoin": "内连接",
  "innerJoinDesc": "两表同时满足条件的这些数据才会展示",
  "rightJoin": "右连接",
  "rightJoinDesc": "该连接关系会将右表所有的查询信息列出，而左表只列出条件与右表满足的部分",
  "searchContentPlaceholder": "搜索内容",
  "searchCodeNamePlaceholder": "请输入编码/名称",
  "inputNamePlaceholder": "请输入名称",
  "searchKeywordPlaceholder": "请输入关键字",
  "selectFieldPlaceholder": "请选择字段",
  "filterConditionPlaceholder": "过滤条件",
  "previewLimitTip": "数据预览只展示前{pageSize}条数据",
  "previewSql": "预览SQL",
  "bindInfoAuthPreview": "绑定信息权限预览:",
  "bindInfoAuthTooltip": "选择绑定了信息权限的UI元数据，数据集就会按照您选择的容器进行信息权限过滤，不配置即代表无需进行信息权限过滤",
  "sqlDiffTooltip": "如SQL语句在不同的数据库类型中存在语法差异，请自行添加对应数据库的SQL语句",
  "paramNameTooltip": "参数名只允许输入英文、数字、下划线的组合，必须以英文开头",
  "changeDisplayNameTooltip": "修改显示名称后，报表设计中已使用的该字段需重新设置",
  "codeMaxLengthMsg": "最长20字符",
  "codeFormatMsg": "只能输入英文字符、数字和下划线！",
  "dbAlreadyExistsMsg": "该数据库已存在",
  "inputDbQuerySqlPlaceholder": "请输入{dbLabel}数据库查询语句",
  "clickAddDbQueryTip": "点击\"添加\"按钮选择需要维护的数据库",
  "duplicateParamMsg": "参数设置中存在重复的参数!",
  "paramNotDefinedMsg": "{field}参数未在参数设置列表中定义",
  "paramNotUsedMsg": "{field}参数未在查询语句中使用",
  "confirmJumpToPreviewMsg": "保存前必须先进行数据预览，是否跳转至数据预览页?",
  "saveSuccessMsg": "保存成功",
  "confirmCloseUnsavedMsg": "有修改内容未保存，确定要关闭吗?",
  "deleteChildNodesFirstMsg": "请先删除子节点",
  "materializedNoParamTip": "启用了物化的数据集不支持配置参数",
  "noData": "暂无数据",
  "paramFormatErrorMsg": "请输入正确的参数格式",
  "selectTableJoinMsg": "请选择表连接关系",
  "configAtLeastOneRowMsg": "请至少配置一行数据",
  "completeTableJoinMsg": "请完善表连接关系",
  "selectDataSourceWarnMsg": "请选择数据源",
  "selectDataTableWarnMsg": "请选择数据表",
  "inputDisplayNameRequiredMsg": "请输入显示名称",
  "notStartWithNumOrUnderlineMsg": "不能以数字或下划线开头",
  "validCharPatternMsg": "文本只能包含字母、数字、下划线和中文",
  "noSqlKeywordMsg": "字段的显示名称不允许使用SQL关键字",
  "displayNameDuplicateMsg": "字段的显示名称不允许重复，请修改显示名称",
  "previewFailedPrefix": "预览失败：",
  "cannotMaterializeWithParamsMsg": "当前数据集已配置参数，无法启用物化。请先在查询定义页签删除所有参数后再启用物化。",
  "confirmDeleteMsg": "是否确认删除?",
  "inputCompleteScheduleMsg": "请输入完整的定时策略"
}
```

---

## 二、按业务分类对照清单

### 1. 基础操作与通用按钮

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `add` | **添加** | 添加操作按钮 | `detailNormal/components/.../PopAddDataTableFIeld.tsx:L373` |
| `edit` | **编辑** | 表格行编辑操作 | `list/components/columnOptions.tsx:L66` |
| `detail` | **详情** | 表格行详情操作 | `list/components/columnOptions.tsx:L84` |
| `delete` | **删除** | 表格行删除操作 | `list/components/columnOptions.tsx:L133` |
| `enable` | **启用** | 状态启用标签/操作 | `list/components/columnOptions.tsx:L46, L203` |
| `disable` | **停用** | 状态停用标签/操作 | `list/components/columnOptions.tsx:L46, L203` |
| `cancel` | **取消** | 弹窗/向导取消操作 | `detailNormal/store/footerCfg.ts:L5` |
| `confirm` | **确定** | 弹窗确定操作 | `detailComplex/components/DatabaseQueryDrawer/index.tsx:L145` |
| `prevStep` | **上一步** | 向导上一步按钮 | `detailNormal/store/footerCfg.ts:L11` |
| `nextStep` | **下一步** | 向导下一步按钮 | `detailNormal/store/footerCfg.ts:L16` |
| `save` | **保存** | 向导保存按钮 | `detailNormal/store/footerCfg.ts:L21` |
| `maintain` | **维护** | 语句维护操作 | `list/store.ts:L52, detailComplex/components/...:L53` |
| `materialize` | **物化** | 物化设置操作 | `list/components/columnOptions.tsx:L116` |
| `executeNow` | **立即执行** | 立即执行物化任务 | `list/components/materialized/...:L11` |
| `selectAll` | **全选** | 字段全选操作 | `detailNormal/components/.../rightFieldList.tsx:L147` |
| `addDataTable` | **添加数据表** | 节点关系添加数据表 | `detailNormal/components/.../NodeSlot.tsx:L12` |
| `deleteDataTable` | **删除数据表** | 节点关系删除数据表 | `detailNormal/components/.../GraphSlot.tsx:L66` |
| `andCondition` | **+ 且条件** | 过滤添加且条件 | `detailNormal/components/.../DataFilter/index.tsx:L411` |
| `conditionGroup` | **+ 条件组** | 过滤添加条件组 | `detailNormal/components/.../DataFilter/index.tsx:L419` |
| `orSatisfy` | **或者满足** | 过滤条件组连接符 | `detailNormal/components/.../DataFilter/index.tsx:L388` |

### 2. 表格列头与表单字段

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `index` | **序号** | 表格序号列头 | `list/store.ts:L77` |
| `code` | **编码** | 数据集编码表单标签 | `detailNormal/store/formCfg.ts:L42` |
| `numberCode` | **编号** | 数据集编号列头 | `list/components/columnOptions.tsx:L175` |
| `name` | **名称** | 数据集名称表单标签/列头 | `list/components/columnOptions.tsx:L181` |
| `category` | **分类** | 数据集分类表单标签/列头 | `list/components/columnOptions.tsx:L188` |
| `creator` | **创建人** | 创建人表单标签 | `detailNormal/store/formCfg.ts:L78` |
| `remark` | **备注** | 备注表单标签/列头 | `list/components/columnOptions.tsx:L193` |
| `status` | **状态** | 状态列头/字段 | `list/components/columnOptions.tsx:L200` |
| `action` | **操作** | 操作列头 | `list/components/columnOptions.tsx:L206` |
| `type` | **类型** | 类型列头/表单标签 | `list/components/columnOptions.tsx:L169` |
| `dataSource` | **数据源** | 数据源字段标签 | `detailComplex/store.ts:L127` |
| `dataTable` | **数据表** | 数据表面板/字段 | `detailNormal/components/.../leftDataSource.tsx:L110` |
| `tableName` | **表名** | 表名列表头 | `detailNormal/components/.../FieldSet/index.tsx:L55` |
| `comment` | **注释** | 注释列表头 | `detailNormal/components/.../addModal.tsx:L20` |
| `field` | **字段** | 字段面板标签 | `detailNormal/components/.../rightFieldList.tsx:L31` |
| `fieldName` | **字段名** | 字段名列表头 | `detailNormal/components/.../FieldSet/index.tsx:L59` |
| `fieldType` | **字段类型** | 字段类型列表头 | `detailNormal/components/.../FieldSet/index.tsx:L63` |
| `displayName` | **显示名称** | 显示名称表单标签/列表头 | `detailNormal/components/.../FieldSet/index.tsx:L72` |
| `defaultValue` | **默认值** | 默认值列表头 | `detailComplex/components/.../customSettingGrid.tsx:L86` |
| `multiSelect` | **多选** | 多选参数列表头 | `detailComplex/components/.../customSettingGrid.tsx:L111` |
| `paramName` | **参数名** | 参数名列表头 | `detailComplex/components/.../customSettingGrid.tsx:L50` |
| `paramType` | **参数类型** | 参数类型列表头 | `detailComplex/components/.../customSettingGrid.tsx:L97` |
| `paramSetting` | **参数设置** | 参数设置抽屉/表单项 | `detailComplex/store.ts:L171` |
| `sortType` | **排序方式** | 排序方式列表头 | `detailNormal/components/.../FieldSet/index.tsx:L174` |
| `sortAsc` | **升序** | 排序选项-升序 | `detailNormal/components/.../FieldSet/index.tsx:L181` |
| `sortDesc` | **降序** | 排序选项-降序 | `detailNormal/components/.../FieldSet/index.tsx:L180` |
| `querySql` | **查询语句** | 查询SQL语句表单标签 | `detailComplex/store.ts:L161` |
| `otherDbQuerySql` | **其他数据库查询维护语句** | 跨库查询维护标签 | `detailComplex/store.ts:L143` |
| `physicalTableName` | **物理表名** | 物化物理表名标签 | `list/components/materialized/form.ts:L8` |
| `description` | **描述** | 物化描述字段标签 | `list/components/materialized/form.ts:L16` |
| `scheduleStrategy` | **定时策略** | 物化定时策略标签 | `list/components/materialized/form.ts:L24` |
| `startTime` | **开始时间** | 开始时间列头/日期占位 | `list/components/materialized/...:L17` |
| `endTime` | **结束时间** | 结束时间日期占位 | `detailNormal/components/.../DataFilter:L159` |
| `executionDuration` | **执行时长** | 物化执行耗时列头 | `list/components/materialized/...:L24` |
| `failReason` | **失败原因** | 物化失败原因列头 | `list/components/materialized/...:L33` |
| `businessType` | **业务类型** | 元数据业务类型列头 | `components/bindInfoField/index.tsx:L180` |
| `containerTitle` | **容器标题** | 元数据容器标题列头 | `components/bindInfoField/index.tsx:L184` |
| `containerId` | **容器ID** | 元数据容器ID列头 | `components/bindInfoField/index.tsx:L188` |

### 3. 页面标题、向导步骤与弹窗标题

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `manageTitle` | **数据集管理** | 数据集管理路由/页面标题 | `route.ts:L13` |
| `addNormalTitle` | **数据集新增-普通** | 新增普通数据集标题 | `list/index.tsx:L44` |
| `addComplexTitle` | **数据集新增-复杂** | 新增复杂数据集标题 | `list/index.tsx:L34` |
| `editTitle` | **数据集编辑** | 编辑数据集标题 | `list/components/columnOptions.tsx:L62` |
| `detailTitle` | **数据集详情** | 查看详情标题 | `list/components/columnOptions.tsx:L80` |
| `materializeTitle` | **数据集物化** | 物化设置抽屉标题 | `list/components/columnOptions.tsx:L107` |
| `basicInfoTitle` | **基本信息** | 步骤一标题 | `detailNormal/store/stepCfg.ts:L6` |
| `dataTableTitle` | **数据表** | 步骤二标题 | `detailNormal/store/stepCfg.ts:L9` |
| `relationTitle` | **关系** | 步骤三标题 | `detailNormal/store/stepCfg.ts:L12` |
| `queryDefTitle` | **查询定义** | 复杂数据集步骤二标题 | `detailComplex/store.ts:L35` |
| `dataFilterTitle` | **数据过滤** | 步骤四标题 | `detailNormal/store/stepCfg.ts:L15` |
| `fieldSettingTitle` | **字段设置** | 步骤五标题 | `detailNormal/store/stepCfg.ts:L18` |
| `dataPreviewTitle` | **数据预览** | 步骤六标题 | `detailNormal/store/stepCfg.ts:L21` |
| `fieldDisplaySettingTitle` | **字段展示设置** | 字段设置面板标题 | `detailNormal/components/...:L223` |
| `dataSortSettingTitle` | **数据排序设置** | 数据排序面板标题 | `detailNormal/components/...:L247` |
| `otherDbQueryModalTitle` | **其他数据库查询语句维护** | 多库语句维护弹窗标题 | `detailComplex/components/...:L95` |
| `tableJoinTitle` | **表连接关系** | 表连接设置弹窗标题 | `detailNormal/components/...:L33` |
| `bindInfoAuthTitle` | **绑定信息权限** | 绑定权限弹窗标题 | `components/bindInfoField/index.tsx:L48` |
| `addDataSetTitle` | **添加数据集** | 添加数据集弹窗标题 | `detailNormal/components/...:L52` |
| `executionLogTitle` | **执行日志** | 物化执行日志面板标题 | `list/components/materialized/...:L50` |

### 4. 枚举与下拉选项

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `normalType` | **普通** | 数据集模式-普通 | `list/store.ts:L32` |
| `complexType` | **复杂** | 数据集模式-复杂 | `list/store.ts:L40` |
| `sqlType` | **SQL语句** | 查询类型-SQL语句 | `detailComplex/store.ts:L155` |
| `storedProcType` | **存储过程** | 查询类型-存储过程 | `detailComplex/store.ts:L156` |
| `damengDb` | **达梦** | 数据库驱动-达梦 | `detailComplex/components/...:L9` |
| `kingbaseDb` | **人大金仓** | 数据库驱动-人大金仓 | `detailComplex/components/...:L11` |
| `typeText` | **文本** | 字段/参数类型-文本 | `detailNormal/store/index.ts:L25` |
| `typeNumber` | **数值** | 字段/参数类型-数值 | `detailNormal/store/index.ts:L26` |
| `typeDate` | **日期** | 字段/参数类型-日期 | `detailNormal/store/index.ts:L27` |
| `typeTime` | **时间** | 字段类型-时间 | `detailNormal/store/index.ts:L28` |
| `typeCombo` | **下拉** | 字段类型-下拉 | `detailNormal/store/index.ts:L29` |
| `typeHelp` | **帮助** | 字段类型-帮助 | `detailNormal/store/index.ts:L30` |
| `typeMultiHelp` | **多选帮助** | 字段类型-多选帮助 | `detailNormal/store/index.ts:L31` |
| `typeAttachment` | **附件** | 字段类型-附件 | `detailNormal/store/index.ts:L32` |
| `daily` | **每天** | 定时执行频率-每天 | `list/components/materialized/...:L7` |
| `weekly` | **每周** | 定时执行频率-每周 | `list/components/materialized/...:L11` |
| `monthly` | **每月** | 定时执行频率-每月 | `list/components/materialized/...:L15` |
| `monday` | **周一** | 星期枚举-周一 | `list/components/materialized/...:L22` |
| `tuesday` | **周二** | 星期枚举-周二 | `list/components/materialized/...:L26` |
| `wednesday` | **周三** | 星期枚举-周三 | `list/components/materialized/...:L30` |
| `thursday` | **周四** | 星期枚举-周四 | `list/components/materialized/...:L34` |
| `friday` | **周五** | 星期枚举-周五 | `list/components/materialized/...:L38` |
| `saturday` | **周六** | 星期枚举-周六 | `list/components/materialized/...:L42` |
| `sunday` | **周日** | 星期枚举-周日 | `list/components/materialized/...:L46` |
| `successStatus` | **成功** | 执行状态-成功 | `list/components/materialized/...:L43` |
| `failStatus` | **失败** | 执行状态-失败 | `list/components/materialized/...:L43` |
| `atPreposition` | **在** | 时间表达式介词 | `list/components/materialized/...:L72` |
| `executeVerb` | **执行** | 时间表达式动词 | `list/components/materialized/...:L99` |
| `hoursUnit` | **小时** | 耗时单位-小时 | `list/components/materialized/...:L11` |
| `minutesUnit` | **分** | 耗时单位-分 | `list/components/materialized/...:L11` |
| `secondsUnit` | **秒** | 耗时单位-秒 | `list/components/materialized/...:L11` |

### 5. 操作符与连接类型

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `opEq` | **等于** | 操作符-等于 | `detailNormal/components/.../DataFilter:L25` |
| `opNotEq` | **不等于** | 操作符-不等于 | `detailNormal/components/.../DataFilter:L26` |
| `opGt` | **大于** | 操作符-大于 | `detailNormal/components/.../DataFilter:L32` |
| `opGe` | **大于等于** | 操作符-大于等于 | `detailNormal/components/.../DataFilter:L34` |
| `opLt` | **小于** | 操作符-小于 | `detailNormal/components/.../DataFilter:L31` |
| `opLe` | **小于等于** | 操作符-小于等于 | `detailNormal/components/.../DataFilter:L33` |
| `opIn` | **属于** | 操作符-属于 | `detailNormal/components/.../DataFilter:L58` |
| `opBetween` | **区间** | 操作符-区间 | `detailNormal/components/.../DataFilter:L35` |
| `operatorJudge` | **判断符** | 判断符占位/列头 | `detailNormal/components/.../DataFilter:L101` |
| `leftJoin` | **左连接** | 连接类型-左连接 | `detailNormal/components/.../PopAddDataTableFIeld.tsx:L123` |
| `leftJoinDesc` | **该连接关系会将左表所有的查询信息列出，而右表只列出条件与左表满足的部分** | 左连接功能说明 | `detailNormal/components/...:L126` |
| `innerJoin` | **内连接** | 连接类型-内连接 | `detailNormal/components/.../PopAddDataTableFIeld.tsx:L131` |
| `innerJoinDesc` | **两表同时满足条件的这些数据才会展示** | 内连接功能说明 | `detailNormal/components/...:L134` |
| `rightJoin` | **右连接** | 连接类型-右连接 | `detailNormal/components/.../PopAddDataTableFIeld.tsx:L139` |
| `rightJoinDesc` | **该连接关系会将右表所有的查询信息列出，而左表只列出条件与右表满足的部分** | 右连接功能说明 | `detailNormal/components/...:L142` |

### 6. 提示/校验/占位符

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `searchContentPlaceholder` | **搜索内容** | 搜索内容输入占位 | `components/bindInfoField/index.tsx:L161` |
| `searchCodeNamePlaceholder` | **请输入编码/名称** | 列表搜索占位符 | `list/index.tsx:L61` |
| `inputNamePlaceholder` | **请输入名称** | 名称搜索占位符 | `detailNormal/components/.../rightFieldList.tsx:L153` |
| `searchKeywordPlaceholder` | **请输入关键字** | 穿梭框搜索占位符 | `components/report/transferTable/index.tsx:L53` |
| `selectFieldPlaceholder` | **请选择字段** | 选择字段占位符 | `detailNormal/components/.../DataFilter:L91` |
| `filterConditionPlaceholder` | **过滤条件** | 过滤值输入占位符 | `detailNormal/components/.../DataFilter:L111` |
| `previewLimitTip` | **数据预览只展示前{pageSize}条数据** | 预览数量限制提示 | `components/previewTable/index.tsx:L149` |
| `previewSql` | **预览SQL** | 查看SQL标签 | `components/previewTable/index.tsx:L161` |
| `bindInfoAuthPreview` | **绑定信息权限预览:** | 权限预览提示前缀 | `components/previewTable/index.tsx:L170` |
| `bindInfoAuthTooltip` | **选择绑定了信息权限的UI元数据，数据集就会按照您选择的容器进行信息权限过滤，不配置即代表无需进行信息权限过滤** | 权限绑定说明 | `components/bindInfoField/index.tsx:L24` |
| `sqlDiffTooltip` | **如SQL语句在不同的数据库类型中存在语法差异，请自行添加对应数据库的SQL语句** | 多库SQL语法提示 | `detailComplex/components/...:L51` |
| `paramNameTooltip` | **参数名只允许输入英文、数字、下划线的组合，必须以英文开头** | 参数命名规则说明 | `detailComplex/components/...:L49` |
| `changeDisplayNameTooltip` | **修改显示名称后，报表设计中已使用的该字段需重新设置** | 修改显示名称影响提示 | `detailNormal/components/...:L71` |
| `codeMaxLengthMsg` | **最长20字符** | 编码长度校验提示 | `detailNormal/store/formCfg.ts:L48` |
| `codeFormatMsg` | **只能输入英文字符、数字和下划线！** | 编码字符格式校验提示 | `detailNormal/store/formCfg.ts:L54` |
| `dbAlreadyExistsMsg` | **该数据库已存在** | 重复添加数据库提示 | `detailComplex/components/...:L62` |
| `inputDbQuerySqlPlaceholder` | **请输入{dbLabel}数据库查询语句** | 数据库语句输入提示 | `detailComplex/components/...:L126` |
| `clickAddDbQueryTip` | **点击"添加"按钮选择需要维护的数据库** | 空状态引导文案 | `detailComplex/components/...:L135` |
| `duplicateParamMsg` | **参数设置中存在重复的参数!** | 参数去重校验提示 | `detailComplex/components/...:L362` |
| `paramNotDefinedMsg` | **{field}参数未在参数设置列表中定义** | SQL参数未定义校验 | `detailComplex/components/...:L375` |
| `paramNotUsedMsg` | **{field}参数未在查询语句中使用** | 定义参数未使用校验 | `detailComplex/components/...:L382` |
| `confirmJumpToPreviewMsg` | **保存前必须先进行数据预览，是否跳转至数据预览页?** | 跳转预览确认框 | `detailNormal/components/...:L196` |
| `saveSuccessMsg` | **保存成功** | 保存成功轻提示 | `detailNormal/components/...:L215` |
| `confirmCloseUnsavedMsg` | **有修改内容未保存，确定要关闭吗?** | 关闭未保存确认提示 | `detailNormal/components/...:L250` |
| `deleteChildNodesFirstMsg` | **请先删除子节点** | 树形删除拦截提示 | `detailComplex/components/...:L142` |
| `materializedNoParamTip` | **启用了物化的数据集不支持配置参数** | 物化参数禁用提示 | `detailComplex/components/...:L200` |
| `noData` | **暂无数据** | 表格空数据展示 | `detailComplex/components/...:L200` |
| `paramFormatErrorMsg` | **请输入正确的参数格式** | 参数格式错误提示 | `detailComplex/components/...:L5` |
| `selectTableJoinMsg` | **请选择表连接关系** | 未选连接关系拦截 | `detailNormal/components/...:L75` |
| `configAtLeastOneRowMsg` | **请至少配置一行数据** | 关联条件至少一行拦截 | `detailNormal/components/...:L83` |
| `completeTableJoinMsg` | **请完善表连接关系** | 连接关系不完整拦截 | `detailNormal/components/...:L87` |
| `selectDataSourceWarnMsg` | **请选择数据源** | 未选数据源警告 | `detailNormal/components/...:L60` |
| `selectDataTableWarnMsg` | **请选择数据表** | 未选数据表警告 | `detailNormal/components/...:L81` |
| `inputDisplayNameRequiredMsg` | **请输入显示名称** | 显示名称非空校验 | `detailNormal/components/...:L88` |
| `notStartWithNumOrUnderlineMsg` | **不能以数字或下划线开头** | 显示名称首字符校验 | `detailNormal/components/...:L92` |
| `validCharPatternMsg` | **文本只能包含字母、数字、下划线和中文** | 显示名称字符格式校验 | `detailNormal/components/...:L96` |
| `noSqlKeywordMsg` | **字段的显示名称不允许使用SQL关键字** | SQL保留关键字校验 | `detailNormal/components/...:L99` |
| `displayNameDuplicateMsg` | **字段的显示名称不允许重复，请修改显示名称** | 显示名称重复校验 | `detailNormal/components/...:L105` |
| `previewFailedPrefix` | **预览失败：** | 预览失败提示前缀 | `detailNormal/store/formCfg.ts:L22` |
| `cannotMaterializeWithParamsMsg` | **当前数据集已配置参数，无法启用物化。请先在查询定义页签删除所有参数后再启用物化。** | 启用物化前置拦截 | `list/components/columnOptions.tsx:L98` |
| `confirmDeleteMsg` | **是否确认删除?** | 删除二次确认提示 | `list/components/columnOptions.tsx:L128` |
| `inputCompleteScheduleMsg` | **请输入完整的定时策略** | 定时策略校验提示 | `list/components/materialized/index.tsx:L55` |

---

## 三、代码注释与非 UI 常量说明（无需国际化）

以下为源码中的开发者注释、控制台调试信息与内部技术标识，仅供代码维护与架构理解，**无需**提取到国际化词条中：

| 所在文件 | 行号 | 类型 | 内容说明 |
| :--- | :--- | :--- | :--- |
| `detailNormal/components/.../LineSlot.tsx` | L108-L248 | SVG矢量图层ID | 左、右、内连接 SVG 图形层名称（新报表、数据源新增-2、路径备份等） |
| `detailNormal/components/.../DataSet/leftDataSource.tsx` | L65 | 开发者注释 | // 需要保留的dataInfoList，也就是不需要重新通过接口请求的 |
| `detailComplex/components/formMain/index.tsx` | L333-L339 | 开发者注释 | // 发现重复 / 没有重复 |
| `components/bindInfoField/service.ts` | L17 | 系统接口参数注释 | // 包含元数据信息权限业务类型 |

---
*文档生成于 2026-09-01，已完全去除点号前缀，纯扁平化 Key。*