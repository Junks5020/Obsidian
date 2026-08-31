---
tags:
  - report-web
  - PrintManager
  - i18n
  - 多语言
  - 中文清单
created: 2026-08-31
updated: 2026-08-31
total_unique_keys: 130
key_format: "printManager.<identifier> (单点扁平化/全局去重)"
---

# PrintManager 多语言 (i18n) Key 与中文词条对照表

> **模块路径**：`src/pages/PrintManager/`  
> **Key 规范原则**：
> 1. **单点扁平化 (Single-dot Namespace)**：每个 Key 仅保留统一模块前缀 `printManager.<标识>`，避免深层点号嵌套（无 `a.b.c.d`）。
> 2. **全局唯一与词条去重 (Unique & Deduplicated)**：相同中文词条（如“确定”、“取消”、“添加”、“删除”、“序号”、“单据类型”）在全局只保留一个唯一 Key，多处复用。
> 3. **共提取唯一中文词条**：**130** 个。

---

## 目录
- [一、完整 zh-CN 语言包 JSON（可直接导入）](#一完整-zh-cn-语言包-json可直接导入)
- [二、按业务分类对照清单](#二按业务分类对照清单)
  - [1. 基础操作与通用按钮](#1-基础操作与通用按钮)
  - [2. 表格列头与表单字段](#2-表格列头与表单字段)
  - [3. 页面标题与弹窗标题](#3-页面标题与弹窗标题)
  - [4. 枚举与下拉选项](#4-枚举与下拉选项)
  - [5. 操作符与判断条件](#5-操作符与判断条件)
  - [6. 工作流流转历史设置](#6-工作流流转历史设置)
  - [7. 占位符与提示/校验/确认信息](#7-占位符与提示校验确认信息)
- [三、代码注释与非 UI 常量说明（无需国际化）](#三代码注释与非-ui-常量说明无需国际化)

---

## 一、完整 zh-CN 语言包 JSON（可直接导入）

```json
{
  "printManager.add": "添加",
  "printManager.edit": "编辑",
  "printManager.delete": "删除",
  "printManager.design": "设计",
  "printManager.detail": "详情",
  "printManager.copy": "复制",
  "printManager.save": "保存",
  "printManager.preview": "预览",
  "printManager.print": "打印",
  "printManager.close": "关闭",
  "printManager.confirm": "确定",
  "printManager.cancel": "取消",
  "printManager.reset": "重置",
  "printManager.clear": "清空",
  "printManager.config": "配置",
  "printManager.custom": "自定义",
  "printManager.expand": "展开",
  "printManager.collapse": "收起",
  "printManager.enable": "启用",
  "printManager.disable": "停用",
  "printManager.importExport": "导入导出",
  "printManager.importPrint": "打印导入",
  "printManager.exportPrint": "打印导出",
  "printManager.export": "导出",
  "printManager.exportExcel": "导出EXCEL",
  "printManager.exportPdf": "导出PDF",
  "printManager.printSetting": "打印设置",
  "printManager.index": "序号",
  "printManager.billType": "单据类型",
  "printManager.formName": "所属表单",
  "printManager.code": "编号",
  "printManager.formCode": "编码",
  "printManager.name": "名称",
  "printManager.remark": "备注",
  "printManager.type": "类型",
  "printManager.shareStrategy": "共享策略",
  "printManager.unitOrOrg": "单元/组织",
  "printManager.belongOrg": "所属组织",
  "printManager.belongUnit": "所属单元",
  "printManager.status": "状态",
  "printManager.useScope": "使用范围",
  "printManager.action": "操作",
  "printManager.isDefault": "默认模板",
  "printManager.directPreview": "直接预览",
  "printManager.previewHideRowCol": "预览时支持隐藏行列",
  "printManager.exportAuth": "导出权限",
  "printManager.exportFileName": "导出文件名称",
  "printManager.creator": "创建人",
  "printManager.createDate": "创建日期",
  "printManager.param": "参数",
  "printManager.billCode": "单据编码",
  "printManager.operatorJudge": "判断符",
  "printManager.operator": "操作符",
  "printManager.relation": "关系",
  "printManager.value": "值",
  "printManager.dataSet": "数据集",
  "printManager.addTemplateTitle": "新增打印模板",
  "printManager.manageTitle": "打印模板管理",
  "printManager.designTitle": "打印模板设计",
  "printManager.previewTitle": "打印模板预览",
  "printManager.viewTitle": "打印模板查看",
  "printManager.workflowSettingTitle": "流转历史设置",
  "printManager.globalFilterTitle": "全局数据过滤",
  "printManager.addDataSetTitle": "添加数据集",
  "printManager.userTemplate": "用户",
  "printManager.appTemplate": "用户_APP展示",
  "printManager.groupShare": "集团共享",
  "printManager.unitShare": "单元共享",
  "printManager.orgPrivate": "组织私有",
  "printManager.allScope": "全部",
  "printManager.partScope": "部分",
  "printManager.defaultOption": "默认",
  "printManager.detailPage": "详情页",
  "printManager.listPage": "列表页",
  "printManager.noControl": "不控制",
  "printManager.onlyExportPdf": "只允许导出PDF",
  "printManager.forbiddenExport": "不允许导出",
  "printManager.normalType": "普通",
  "printManager.complexType": "复杂",
  "printManager.fieldParam": "字段",
  "printManager.constantParam": "常量",
  "printManager.variableParam": "变量",
  "printManager.currentUser": "当前登陆人",
  "printManager.currentDate": "当前日期(年月日)",
  "printManager.currentTime": "当前时间(年月日时分秒)",
  "printManager.excelFile": "EXCEL文件",
  "printManager.jsonFile": "Json文件",
  "printManager.and": "并且",
  "printManager.or": "或者",
  "printManager.opEq": "等于",
  "printManager.opNotEq": "不等于",
  "printManager.opGt": "大于",
  "printManager.opGe": "大于等于",
  "printManager.opLt": "小于",
  "printManager.opLe": "小于等于",
  "printManager.opLike": "包含",
  "printManager.opNotLike": "不包含",
  "printManager.opIn": "属于",
  "printManager.opBetween": "区间",
  "printManager.workflowScope": "审批流范围",
  "printManager.workflowRecordScope": "审批记录范围",
  "printManager.printStartNode": "打印发起人节点",
  "printManager.workflowScopeLatest": "最新一次审批（包含未结束/终止的审批）",
  "printManager.workflowScopeLatestEnded": "最新一次正常结束的审批",
  "printManager.workflowScopeAllEnded": "所有正常结束审批",
  "printManager.workflowScopeAll": "所有审批(包含未结束/终止的审批)",
  "printManager.workflowRecordAll": "所有审批记录",
  "printManager.workflowRecordSubmitAll": "所有动作是提交的审批记录",
  "printManager.workflowRecordSubmitLast": "仅最后一次动作是提交的审批记录",
  "printManager.searchPlaceholder": "请输入编码/名称",
  "printManager.inputNamePlaceholder": "请输入名称",
  "printManager.codeMaxLengthMsg": "最长20字符",
  "printManager.codeFormatMsg": "只能输入英文字符、数字和下划线！",
  "printManager.confirmDeleteMsg": "是否确认删除?",
  "printManager.confirmCloseUnsavedMsg": "有修改内容未保存，确定要关闭吗?",
  "printManager.useScopeRequiredMsg": "使用范围为部分时必须配置条件信息",
  "printManager.exportNameRequiredMsg": "导出文件名称为自定义时必须配置名称信息",
  "printManager.paramFormatErrorMsg": "请输入正确的参数格式",
  "printManager.notDesignedCannotEnableMsg": "打印模板未进行设计，不允许启用",
  "printManager.selectDataSetWarningMsg": "请选择数据集",
  "printManager.saveSuccessMsg": "保存成功",
  "printManager.saveFailedMsg": "保存失败: ",
  "printManager.exportErrorMsg": "导出错误",
  "printManager.exportFailedMsg": "导出失败",
  "printManager.dataNotLoadedMsg": "打印数据未加载完成，请稍后重试",
  "printManager.tableNotReadyMsg": "表格实例未就绪，请稍后重试",
  "printManager.printFailedMsg": "打印失败",
  "printManager.previewFailedMsg": "预览失败: ",
  "printManager.noApiResponseMsg": "接口无返回",
  "printManager.copySuffix": "_复制"
}
```

---

## 二、按业务分类对照清单

### 1. 基础操作与通用按钮

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `printManager.add` | **添加** | 添加/新增按钮 | `list/store/index.ts:L17, list/components/printUseScope/index.tsx:L220, list/components/printExportName/index.tsx:L184, design/components/dataFilter/index.tsx:L153` |
| `printManager.edit` | **编辑** | 表格行编辑操作 | `list/components/columnOptions.tsx:L44` |
| `printManager.delete` | **删除** | 表格行删除操作 / 参数删除按钮 | `list/components/columnOptions.tsx:L60, list/components/printExportName/index.tsx:L152, list/components/printUseScope/index.tsx:L191` |
| `printManager.design` | **设计** | 打开设计器操作 | `list/components/columnOptions.tsx:L81` |
| `printManager.detail` | **详情** | 查看详情操作 | `list/components/columnOptions.tsx:L105` |
| `printManager.copy` | **复制** | 复制模板操作 | `list/components/columnOptions.tsx:L130` |
| `printManager.save` | **保存** | 设计器保存模板 | `design/store/headerToolbar.tsx:L36` |
| `printManager.preview` | **预览** | 设计器预览按钮 | `design/store/headerToolbar.tsx:L34` |
| `printManager.print` | **打印** | 预览页打印按钮 | `preview/store/headerToolbar.tsx:L10` |
| `printManager.close` | **关闭** | 预览页关闭按钮 | `preview/store/headerToolbar.tsx:L26` |
| `printManager.confirm` | **确定** | 弹窗/抽屉确定操作 | `list/components/tableDrawer.tsx:L232, list/components/printExportName/index.tsx:L189, list/components/printUseScope/index.tsx:L225, list/store/index.ts:L103` |
| `printManager.cancel` | **取消** | 弹窗/抽屉取消操作 | `list/components/tableDrawer.tsx:L224, list/components/printExportName/index.tsx:L187, list/components/printUseScope/index.tsx:L223, list/store/index.ts:L96` |
| `printManager.reset` | **重置** | 表单重置按钮 | `list/components/tableDrawer.tsx` |
| `printManager.clear` | **清空** | 清空过滤条件按钮 | `design/components/dataFilter/index.tsx:L156` |
| `printManager.config` | **配置** | 配置使用范围按钮 | `list/components/printUseScope/index.tsx:L42` |
| `printManager.custom` | **自定义** | 自定义导出名称按钮 | `list/components/printExportName/index.tsx:L42` |
| `printManager.expand` | **展开** | 数据集面板展开提示 | `design/components/leftDataSetList/index.tsx:L211` |
| `printManager.collapse` | **收起** | 数据集面板收起提示 | `design/components/leftDataSetList/index.tsx:L211` |
| `printManager.enable` | **启用** | 启用状态标签/操作 | `list/components/columnOptions.tsx:L23, L234` |
| `printManager.disable` | **停用** | 停用状态标签/操作 | `list/components/columnOptions.tsx:L23, L234` |
| `printManager.importExport` | **导入导出** | 导入导出下拉菜单 | `design/store/headerToolbar.tsx:L12` |
| `printManager.importPrint` | **打印导入** | 打印导入操作 | `design/store/headerToolbar.tsx:L16` |
| `printManager.exportPrint` | **打印导出** | 打印导出操作 | `design/store/headerToolbar.tsx:L20` |
| `printManager.export` | **导出** | 导出菜单/操作 | `design/components/topHeaderTitle/index.tsx:L126, preview/store/headerToolbar.tsx:L14` |
| `printManager.exportExcel` | **导出EXCEL** | 导出EXCEL操作 | `preview/store/headerToolbar.tsx:L18` |
| `printManager.exportPdf` | **导出PDF** | 导出PDF操作 | `preview/store/headerToolbar.tsx:L22` |
| `printManager.printSetting` | **打印设置** | 打印设置操作 | `preview/store/headerToolbar.tsx:L11` |

### 2. 表格列头与表单字段

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `printManager.index` | **序号** | 表格序号列头 | `list/store/index.ts:L30, design/store/index.ts:L38` |
| `printManager.billType` | **单据类型** | 单据类型列头/表单项 | `list/components/columnOptions.tsx:L166, list/store/formCfg.ts:L120` |
| `printManager.formName` | **所属表单** | 所属表单列头/表单项 | `list/components/columnOptions.tsx:L172` |
| `printManager.code` | **编号** | 编号列头 | `list/components/columnOptions.tsx:L180, design/store/index.ts:L55` |
| `printManager.formCode` | **编码** | 模板编码表单标签 | `list/store/formCfg.ts:L90` |
| `printManager.name` | **名称** | 名称列头/表单标签 | `list/components/columnOptions.tsx:L186, list/store/formCfg.ts:L117, design/store/index.ts:L60` |
| `printManager.remark` | **备注** | 备注列头/表单标签 | `list/components/columnOptions.tsx:L194, list/store/formCfg.ts:L239` |
| `printManager.type` | **类型** | 类型列头/表单标签 | `list/components/columnOptions.tsx:L202, list/store/formCfg.ts:L133, design/store/index.ts:L49, design/components/dataFilter/index.tsx:L113` |
| `printManager.shareStrategy` | **共享策略** | 共享策略列头/表单标签 | `list/components/columnOptions.tsx:L208, list/store/formCfg.ts:L191` |
| `printManager.unitOrOrg` | **单元/组织** | 单元/组织列头 | `list/components/columnOptions.tsx:L224` |
| `printManager.belongOrg` | **所属组织** | 所属组织表单标签 | `list/store/formCfg.ts:L211` |
| `printManager.belongUnit` | **所属单元** | 所属单元表单标签 | `list/store/formCfg.ts:L223` |
| `printManager.status` | **状态** | 状态列头 | `list/components/columnOptions.tsx:L230` |
| `printManager.useScope` | **使用范围** | 使用范围列头/表单标签/弹窗标题 | `list/components/columnOptions.tsx:L237, list/store/formCfg.ts:L175, list/components/printUseScope/index.tsx:L47` |
| `printManager.action` | **操作** | 表格操作列头 | `list/components/columnOptions.tsx:L244, list/components/printExportName/index.tsx:L147, list/components/printUseScope/index.tsx:L186` |
| `printManager.isDefault` | **默认模板** | 默认模板开关标签 | `list/store/formCfg.ts:L145` |
| `printManager.directPreview` | **直接预览** | 直接预览开关标签 | `list/store/formCfg.ts:L153` |
| `printManager.previewHideRowCol` | **预览时支持隐藏行列** | 支持隐藏行列开关标签 | `list/store/formCfg.ts:L159` |
| `printManager.exportAuth` | **导出权限** | 导出权限表单标签 | `list/store/formCfg.ts:L161` |
| `printManager.exportFileName` | **导出文件名称** | 导出文件名称标签/弹窗标题 | `list/store/formCfg.ts:L183, list/components/printExportName/index.tsx:L47` |
| `printManager.creator` | **创建人** | 创建人表单标签 | `list/store/formCfg.ts:L234` |
| `printManager.createDate` | **创建日期** | 创建日期表单标签 | `list/store/formCfg.ts:L238` |
| `printManager.param` | **参数** | 参数列头 | `list/components/printExportName/index.tsx:L107, list/components/printUseScope/index.tsx:L126, design/components/dataFilter/index.tsx:L78` |
| `printManager.billCode` | **单据编码** | 单据编码列头 | `list/components/printExportName/index.tsx:L124` |
| `printManager.operatorJudge` | **判断符** | 判断符列头 | `list/components/printUseScope/index.tsx:L151` |
| `printManager.operator` | **操作符** | 操作符列头 | `design/components/dataFilter/index.tsx:L95` |
| `printManager.relation` | **关系** | 关系列头 | `design/components/dataFilter/index.tsx:L70` |
| `printManager.value` | **值** | 值列头 | `list/components/printUseScope/index.tsx:L170, design/components/dataFilter/index.tsx:L132` |
| `printManager.dataSet` | **数据集** | 数据集面板标题/概念 | `design/components/leftDataSetList/index.tsx:L165` |

### 3. 页面标题与弹窗标题

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `printManager.addTemplateTitle` | **新增打印模板** | 新增模板抽屉标题 | `list/store/formCfg.ts:L53` |
| `printManager.manageTitle` | **打印模板管理** | 管理模板抽屉标题 | `list/components/tableDrawer.tsx:L194` |
| `printManager.designTitle` | **打印模板设计** | 设计器Tab/页面标题 | `list/components/columnOptions.tsx:L72` |
| `printManager.previewTitle` | **打印模板预览** | 预览页Tab/页面标题 | `design/components/topHeaderTitle/utils.ts:L5` |
| `printManager.viewTitle` | **打印模板查看** | 查看详情页标题 | `list/store/index.ts:L72` |
| `printManager.workflowSettingTitle` | **流转历史设置** | 流转历史设置标题/按钮 | `design/store/headerToolbar.tsx:L30, design/components/workflowSetting/index.tsx:L14` |
| `printManager.globalFilterTitle` | **全局数据过滤** | 全局数据过滤标题/按钮 | `design/store/headerToolbar.tsx:L26, design/components/dataFilter/index.tsx:L42` |
| `printManager.addDataSetTitle` | **添加数据集** | 添加数据集弹窗标题/按钮 | `design/components/leftDataSetList/index.tsx:L176, L200` |

### 4. 枚举与下拉选项

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `printManager.userTemplate` | **用户** | 模板类型-用户 | `list/components/columnOptions.tsx:L205, list/store/formCfg.ts:L139` |
| `printManager.appTemplate` | **用户_APP展示** | 模板类型-用户_APP展示 | `list/components/columnOptions.tsx:L205, list/store/formCfg.ts:L140` |
| `printManager.groupShare` | **集团共享** | 共享策略-集团共享 | `list/components/columnOptions.tsx:L215, list/store/formCfg.ts:L47` |
| `printManager.unitShare` | **单元共享** | 共享策略-单元共享 | `list/components/columnOptions.tsx:L217, list/store/formCfg.ts:L48` |
| `printManager.orgPrivate` | **组织私有** | 共享策略-组织私有 | `list/components/columnOptions.tsx:L219, list/store/formCfg.ts:L49` |
| `printManager.allScope` | **全部** | 使用范围-全部 | `list/components/columnOptions.tsx:L241, list/components/printUseScope/index.tsx:L28` |
| `printManager.partScope` | **部分** | 使用范围-部分 | `list/components/columnOptions.tsx:L241, list/components/printUseScope/index.tsx:L29` |
| `printManager.defaultOption` | **默认** | 导出名称-默认 | `list/components/printExportName/index.tsx:L28` |
| `printManager.detailPage` | **详情页** | 单据类型-详情页 | `list/store/formCfg.ts:L41` |
| `printManager.listPage` | **列表页** | 单据类型-列表页 | `list/store/formCfg.ts:L42` |
| `printManager.noControl` | **不控制** | 导出权限-不控制 | `list/store/formCfg.ts:L166` |
| `printManager.onlyExportPdf` | **只允许导出PDF** | 导出权限-只允许导出PDF | `list/store/formCfg.ts:L167` |
| `printManager.forbiddenExport` | **不允许导出** | 导出权限-不允许导出 | `list/store/formCfg.ts:L168` |
| `printManager.normalType` | **普通** | 数据集类型-普通 | `design/store/index.ts:L52` |
| `printManager.complexType` | **复杂** | 数据集类型-复杂 | `design/store/index.ts:L52` |
| `printManager.fieldParam` | **字段** | 参数类型-字段 | `list/components/printExportName/index.tsx:L71` |
| `printManager.constantParam` | **常量** | 参数类型-常量 | `list/components/printExportName/index.tsx:L72` |
| `printManager.variableParam` | **变量** | 参数类型-变量 | `list/components/printExportName/index.tsx:L73` |
| `printManager.currentUser` | **当前登陆人** | 变量-当前登陆人 | `list/components/printExportName/index.tsx:L76` |
| `printManager.currentDate` | **当前日期(年月日)** | 变量-当前日期 | `list/components/printExportName/index.tsx:L77` |
| `printManager.currentTime` | **当前时间(年月日时分秒)** | 变量-当前时间 | `list/components/printExportName/index.tsx:L78` |
| `printManager.excelFile` | **EXCEL文件** | EXCEL文件格式 | `design/components/topHeaderTitle/index.tsx:L136` |
| `printManager.jsonFile` | **Json文件** | Json文件格式 | `design/components/topHeaderTitle/index.tsx:L137` |
| `printManager.and` | **并且** | 逻辑关系-并且 | `design/components/dataFilter/index.tsx:L34` |
| `printManager.or` | **或者** | 逻辑关系-或者 | `design/components/dataFilter/index.tsx:L35` |

### 5. 操作符与判断条件

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `printManager.opEq` | **等于** | 操作符-等于 | `list/components/maps.ts:L4, design/components/dataFilter/constants.ts:L4` |
| `printManager.opNotEq` | **不等于** | 操作符-不等于 | `list/components/maps.ts:L5, design/components/dataFilter/constants.ts:L5` |
| `printManager.opGt` | **大于** | 操作符-大于 | `list/components/maps.ts:L6, design/components/dataFilter/constants.ts:L6` |
| `printManager.opGe` | **大于等于** | 操作符-大于等于 | `list/components/maps.ts:L7, design/components/dataFilter/constants.ts:L7` |
| `printManager.opLt` | **小于** | 操作符-小于 | `list/components/maps.ts:L8, design/components/dataFilter/constants.ts:L8` |
| `printManager.opLe` | **小于等于** | 操作符-小于等于 | `list/components/maps.ts:L9, design/components/dataFilter/constants.ts:L9` |
| `printManager.opLike` | **包含** | 操作符-包含 | `list/components/maps.ts:L21` |
| `printManager.opNotLike` | **不包含** | 操作符-不包含 | `list/components/maps.ts:L22` |
| `printManager.opIn` | **属于** | 操作符-属于 | `list/components/maps.ts:L10, design/components/dataFilter/constants.ts:L10` |
| `printManager.opBetween` | **区间** | 操作符-区间 | `list/components/maps.ts:L11, design/components/dataFilter/constants.ts:L11` |

### 6. 工作流流转历史设置

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `printManager.workflowScope` | **审批流范围** | 审批流范围字段标签 | `design/components/workflowSetting/index.tsx:L40` |
| `printManager.workflowRecordScope` | **审批记录范围** | 审批记录范围字段标签 | `design/components/workflowSetting/index.tsx:L50` |
| `printManager.printStartNode` | **打印发起人节点** | 打印发起人节点字段标签 | `design/components/workflowSetting/index.tsx:L60` |
| `printManager.workflowScopeLatest` | **最新一次审批（包含未结束/终止的审批）** | 审批流范围选项0 | `design/components/workflowSetting/index.tsx:L21` |
| `printManager.workflowScopeLatestEnded` | **最新一次正常结束的审批** | 审批流范围选项1 | `design/components/workflowSetting/index.tsx:L22` |
| `printManager.workflowScopeAllEnded` | **所有正常结束审批** | 审批流范围选项2 | `design/components/workflowSetting/index.tsx:L23` |
| `printManager.workflowScopeAll` | **所有审批(包含未结束/终止的审批)** | 审批流范围选项3 | `design/components/workflowSetting/index.tsx:L24` |
| `printManager.workflowRecordAll` | **所有审批记录** | 审批记录范围选项0 | `design/components/workflowSetting/index.tsx:L28` |
| `printManager.workflowRecordSubmitAll` | **所有动作是提交的审批记录** | 审批记录范围选项1 | `design/components/workflowSetting/index.tsx:L29` |
| `printManager.workflowRecordSubmitLast` | **仅最后一次动作是提交的审批记录** | 审批记录范围选项2 | `design/components/workflowSetting/index.tsx:L30` |

### 7. 占位符与提示/校验/确认信息

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `printManager.searchPlaceholder` | **请输入编码/名称** | 列表搜索输入框占位符 | `list/index.tsx:L23` |
| `printManager.inputNamePlaceholder` | **请输入名称** | 数据集搜索框占位符 | `design/components/leftDataSetList/index.tsx:L142` |
| `printManager.codeMaxLengthMsg` | **最长20字符** | 编码长度校验提示 | `list/store/formCfg.ts:L96` |
| `printManager.codeFormatMsg` | **只能输入英文字符、数字和下划线！** | 编码字符格式校验提示 | `list/store/formCfg.ts:L102` |
| `printManager.confirmDeleteMsg` | **是否确认删除?** | 删除二次确认提示 | `list/components/columnOptions.tsx:L55` |
| `printManager.confirmCloseUnsavedMsg` | **有修改内容未保存，确定要关闭吗?** | 未保存关闭确认提示 | `list/components/tableDrawer.tsx:L41` |
| `printManager.useScopeRequiredMsg` | **使用范围为部分时必须配置条件信息** | 使用范围非空校验提示 | `list/components/tableDrawer.tsx:L74` |
| `printManager.exportNameRequiredMsg` | **导出文件名称为自定义时必须配置名称信息** | 导出名称非空校验提示 | `list/components/tableDrawer.tsx:L78` |
| `printManager.paramFormatErrorMsg` | **请输入正确的参数格式** | 参数格式校验错误提示 | `list/components/printExportName/index.tsx:L98, list/components/printUseScope/index.tsx:L117` |
| `printManager.notDesignedCannotEnableMsg` | **打印模板未进行设计，不允许启用** | 未设计模板启用拦截提示 | `list/store/index.ts:L48` |
| `printManager.selectDataSetWarningMsg` | **请选择数据集** | 未选择数据集警告提示 | `design/components/leftDataSetList/index.tsx:L191` |
| `printManager.saveSuccessMsg` | **保存成功** | 模板保存成功提示 | `design/components/topHeaderTitle/utils.ts:L25` |
| `printManager.saveFailedMsg` | **保存失败: ** | 模板保存失败提示前缀 | `design/components/topHeaderTitle/utils.ts:L32` |
| `printManager.exportErrorMsg` | **导出错误** | 导出异常提示 | `design/service.ts:L58` |
| `printManager.exportFailedMsg` | **导出失败** | 导出失败提示 | `preview/export.ts:L8` |
| `printManager.dataNotLoadedMsg` | **打印数据未加载完成，请稍后重试** | 打印数据未就绪拦截 | `preview/index.tsx:L95` |
| `printManager.tableNotReadyMsg` | **表格实例未就绪，请稍后重试** | 表格实例未就绪拦截 | `preview/index.tsx:L99` |
| `printManager.printFailedMsg` | **打印失败** | 打印执行失败提示 | `preview/index.tsx:L113` |
| `printManager.previewFailedMsg` | **预览失败: ** | 预览失败提示前缀 | `preview/index.tsx:L197` |
| `printManager.noApiResponseMsg` | **接口无返回** | 接口无响应提示 | `preview/service.ts:L17` |
| `printManager.copySuffix` | **_复制** | 复制模板名称后缀 | `list/components/tableDrawer.tsx:L167` |

---

## 三、代码注释与非 UI 常量说明（无需国际化）

以下为源码中的开发者注释与内部系统过滤集合，仅供代码维护与架构理解，**无需**提取到国际化词条中：

| 所在文件 | 行号 | 类型 | 内容说明 |
| :--- | :--- | :--- | :--- |
| `design/normalizeDataSetFields.ts` | L11 | 内部硬编码集合 | `EXCLUDED_BUILT_IN_DATA_SETS = new Set(['流转历史', '流程确认事项'])` |
| `list/components/columnOptions.tsx` | L9 | 开发者注释 | `// 内置模版 设计、修改、删除按钮置灰` |
| `list/components/columnOptions.tsx` | L11 | 开发者注释 | `// 当前登录组织与模板所属组织不一致时 设计、修改、删除按钮置灰` |
| `design/components/workflowSetting/index.tsx` | L80 | 开发者注释 | `// 订阅 modal` |
| `design/components/leftDataSetList/index.tsx` | L181 | 开发者注释 | `// 若取消则直接关闭` |
| `preview/index.tsx` | L140 | 开发者注释 | `// 释放 Blob URL` |
| `list/service.ts` | L3-L11 | 开发者注释 | 接口参数及功能说明注释 |
| `preview/utils.ts` | L1-L15 | 开发者注释 | 预览工具函数说明注释 |

---
*文档生成于 2026-08-31，已完成单点扁平化 (Single-dot) 与中文词条全局去重。*
