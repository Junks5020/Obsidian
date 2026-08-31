---
tags:
  - report-web
  - PrintManager
  - i18n
  - 多语言
  - 中文清单
created: 2026-08-31
updated: 2026-08-31
total_keys: 152
---

# PrintManager 页面多语言 (i18n) Key 与中文词条对照表

> **模块路径**：`src/pages/PrintManager/`  
> **适用场景**：前端多语言国际化改造、国际化资源库 (`zh-CN` / `en-US`) 维护、多语言提取及自动化替换  
> **Key 命名规范**：采用 `printManager.<模块>.<分类>.<语义标识>` 层级规范，共归纳定义 **152** 个多语言 Key。

---

## 目录
- [一、Key 命名与规范说明](#一key-命名与规范说明)
- [二、完整 zh-CN 语言包 JSON（可直接导入）](#二完整-zh-cn-语言包-json可直接导入)
- [三、模块化 Key-Value 对照清单](#三模块化-key-value-对照清单)
  - [1. 列表模块 (List)](#1-列表模块-list)
  - [2. 模板属性抽屉与表单 (Drawer / Form)](#2-模板属性抽屉与表单-drawer--form)
  - [3. 导出文件名与使用范围弹窗 (Sub-Modals)](#3-导出文件名与使用范围弹窗-sub-modals)
  - [4. 公共操作符与判断条件 (Operators)](#4-公共操作符与判断条件-operators)
  - [5. 设计器模块 (Design)](#5-设计器模块-design)
  - [6. 流转历史设置 (Workflow Setting)](#6-流转历史设置-workflow-setting)
  - [7. 预览模块 (Preview)](#7-预览模块-preview)
  - [8. 提示、校验与二次确认 (Messages / Alerts)](#8-提示校验与二次确认-messages--alerts)
- [四、代码注释与非 UI 常量清单（无需国际化）](#四代码注释与非-ui-常量清单无需国际化)

---

## 一、Key 命名与规范说明

1. **命名层级**：`printManager.<module>.<category>.<identifier>`
   * `module`：`list` (列表)、`design` (设计器)、`preview` (预览)、`common` (通用)
   * `category`：`btn` (按钮)、`columns` (列头)、`form` (表单标签)、`toolbar` (工具栏)、`msg` (提示与弹窗)、`validation` (校验)、`enum` (枚举选项)
   * `identifier`：小驼峰命名的具体业务含义，如 `shareStrategy`、`addTitle`、`confirmDelete`。
2. **代码改造建议**：
   * 在 React 组件中使用统一国际化 Hook，如：`intl.formatMessage({ id: 'printManager.list.btn.add' })`。

---

## 二、完整 zh-CN 语言包 JSON（可直接导入）

```json
{
  "printManager.list.searchPlaceholder": "请输入编码/名称",
  "printManager.list.btn.add": "添加",
  "printManager.list.btn.design": "设计",
  "printManager.list.btn.edit": "编辑",
  "printManager.list.btn.delete": "删除",
  "printManager.list.btn.detail": "详情",
  "printManager.list.btn.copy": "复制",
  "printManager.list.btn.enable": "启用",
  "printManager.list.btn.disable": "停用",
  "printManager.list.btn.config": "配置",
  "printManager.list.btn.custom": "自定义",
  "printManager.list.btn.confirm": "确定",
  "printManager.list.btn.cancel": "取消",
  "printManager.list.btn.addCondition": "添加",
  "printManager.list.btn.deleteCondition": "删除",
  "printManager.list.columns.index": "序号",
  "printManager.list.columns.billType": "单据类型",
  "printManager.list.columns.formName": "所属表单",
  "printManager.list.columns.code": "编号",
  "printManager.list.columns.name": "名称",
  "printManager.list.columns.remark": "备注",
  "printManager.list.columns.templateType": "类型",
  "printManager.list.columns.shareStrategy": "共享策略",
  "printManager.list.columns.orgName": "单元/组织",
  "printManager.list.columns.status": "状态",
  "printManager.list.columns.useScope": "使用范围",
  "printManager.list.columns.action": "操作",
  "printManager.list.templateType.user": "用户",
  "printManager.list.templateType.app": "用户_APP展示",
  "printManager.list.shareStrategy.group": "集团共享",
  "printManager.list.shareStrategy.unit": "单元共享",
  "printManager.list.shareStrategy.org": "组织私有",
  "printManager.list.useScope.all": "全部",
  "printManager.list.useScope.part": "部分",
  "printManager.list.exportName.default": "默认",
  "printManager.list.exportName.custom": "自定义",
  "printManager.list.exportAuth.noLimit": "不控制",
  "printManager.list.exportAuth.pdfOnly": "只允许导出PDF",
  "printManager.list.exportAuth.disabled": "不允许导出",
  "printManager.list.billType.detail": "详情页",
  "printManager.list.billType.list": "列表页",
  "printManager.list.form.addTitle": "新增打印模板",
  "printManager.list.form.manageTitle": "打印模板管理",
  "printManager.list.form.viewTitle": "打印模板查看",
  "printManager.list.form.code": "编码",
  "printManager.list.form.name": "名称",
  "printManager.list.form.billType": "单据类型",
  "printManager.list.form.templateType": "类型",
  "printManager.list.form.isDefault": "默认模板",
  "printManager.list.form.directPreview": "直接预览",
  "printManager.list.form.previewEditStatus": "预览时支持隐藏行列",
  "printManager.list.form.exportAuth": "导出权限",
  "printManager.list.form.useScope": "使用范围",
  "printManager.list.form.exportName": "导出文件名称",
  "printManager.list.form.shareStrategy": "共享策略",
  "printManager.list.form.org": "所属组织",
  "printManager.list.form.unit": "所属单元",
  "printManager.list.form.creator": "创建人",
  "printManager.list.form.createDate": "创建日期",
  "printManager.list.form.remark": "备注",
  "printManager.list.form.copySuffix": "_复制",
  "printManager.list.exportName.title": "导出文件名称",
  "printManager.list.exportName.typeField": "字段",
  "printManager.list.exportName.typeConst": "常量",
  "printManager.list.exportName.typeVar": "变量",
  "printManager.list.exportName.varCurrentUser": "当前登陆人",
  "printManager.list.exportName.varCurrentDate": "当前日期(年月日)",
  "printManager.list.exportName.varCurrentTime": "当前时间(年月日时分秒)",
  "printManager.list.exportName.colParam": "参数",
  "printManager.list.exportName.colBillCode": "单据编码",
  "printManager.list.useScope.title": "使用范围",
  "printManager.list.useScope.colParam": "参数",
  "printManager.list.useScope.colOperator": "判断符",
  "printManager.list.useScope.colValue": "值",
  "printManager.common.op.eq": "等于",
  "printManager.common.op.notEq": "不等于",
  "printManager.common.op.gt": "大于",
  "printManager.common.op.ge": "大于等于",
  "printManager.common.op.lt": "小于",
  "printManager.common.op.le": "小于等于",
  "printManager.common.op.like": "包含",
  "printManager.common.op.notLike": "不包含",
  "printManager.common.op.in": "属于",
  "printManager.common.op.between": "区间",
  "printManager.list.validation.codeMaxLength": "最长20字符",
  "printManager.list.validation.codeFormat": "只能输入英文字符、数字和下划线！",
  "printManager.list.validation.useScopeRequired": "使用范围为部分时必须配置条件信息",
  "printManager.list.validation.exportNameRequired": "导出文件名称为自定义时必须配置名称信息",
  "printManager.list.validation.paramFormatError": "请输入正确的参数格式",
  "printManager.list.msg.confirmDelete": "是否确认删除?",
  "printManager.list.msg.confirmCloseUnsaved": "有修改内容未保存，确定要关闭吗?",
  "printManager.list.msg.notDesignedCannotEnable": "打印模板未进行设计，不允许启用",
  "printManager.design.pageTitle": "打印模板设计",
  "printManager.design.toolbar.importExport": "导入导出",
  "printManager.design.toolbar.importPrint": "打印导入",
  "printManager.design.toolbar.exportPrint": "打印导出",
  "printManager.design.toolbar.globalFilter": "全局数据过滤",
  "printManager.design.toolbar.workflowSetting": "流转历史设置",
  "printManager.design.toolbar.preview": "预览",
  "printManager.design.toolbar.save": "保存",
  "printManager.design.export.title": "导出",
  "printManager.design.export.excel": "EXCEL文件",
  "printManager.design.export.json": "Json文件",
  "printManager.design.dataSet.searchPlaceholder": "请输入名称",
  "printManager.design.dataSet.title": "数据集",
  "printManager.design.dataSet.add": "添加数据集",
  "printManager.design.dataSet.selectWarning": "请选择数据集",
  "printManager.design.dataSet.expand": "展开",
  "printManager.design.dataSet.collapse": "收起",
  "printManager.design.dataSet.columns.index": "序号",
  "printManager.design.dataSet.columns.type": "类型",
  "printManager.design.dataSet.columns.code": "编号",
  "printManager.design.dataSet.columns.name": "名称",
  "printManager.design.dataSet.type.complex": "复杂",
  "printManager.design.dataSet.type.normal": "普通",
  "printManager.design.filter.relation.and": "并且",
  "printManager.design.filter.relation.or": "或者",
  "printManager.design.filter.title": "全局数据过滤",
  "printManager.design.filter.columns.relation": "关系",
  "printManager.design.filter.columns.param": "参数",
  "printManager.design.filter.columns.operator": "操作符",
  "printManager.design.filter.columns.type": "类型",
  "printManager.design.filter.columns.value": "值",
  "printManager.design.filter.btn.addCondition": "添加",
  "printManager.design.filter.btn.clear": "清空",
  "printManager.design.workflow.title": "流转历史设置",
  "printManager.design.workflow.scopeLabel": "审批流范围",
  "printManager.design.workflow.scopeLatest": "最新一次审批（包含未结束/终止的审批）",
  "printManager.design.workflow.scopeLatestEnded": "最新一次正常结束的审批",
  "printManager.design.workflow.scopeAllEnded": "所有正常结束审批",
  "printManager.design.workflow.scopeAll": "所有审批(包含未结束/终止的审批)",
  "printManager.design.workflow.recordScopeLabel": "审批记录范围",
  "printManager.design.workflow.recordAll": "所有审批记录",
  "printManager.design.workflow.recordSubmitAll": "所有动作是提交的审批记录",
  "printManager.design.workflow.recordSubmitLast": "仅最后一次动作是提交的审批记录",
  "printManager.design.workflow.startNodeLabel": "打印发起人节点",
  "printManager.design.msg.saveSuccess": "保存成功",
  "printManager.design.msg.saveFailed": "保存失败: ",
  "printManager.design.msg.exportError": "导出错误",
  "printManager.preview.pageTitle": "打印模板预览",
  "printManager.preview.toolbar.print": "打印",
  "printManager.preview.toolbar.printSetting": "打印设置",
  "printManager.preview.toolbar.export": "导出",
  "printManager.preview.toolbar.exportExcel": "导出EXCEL",
  "printManager.preview.toolbar.exportPdf": "导出PDF",
  "printManager.preview.toolbar.close": "关闭",
  "printManager.preview.msg.dataNotLoaded": "打印数据未加载完成，请稍后重试",
  "printManager.preview.msg.tableNotReady": "表格实例未就绪，请稍后重试",
  "printManager.preview.msg.printFailed": "打印失败",
  "printManager.preview.msg.exportFailed": "导出失败",
  "printManager.preview.msg.previewFailed": "预览失败: ",
  "printManager.preview.msg.noApiResponse": "接口无返回"
}
```

---

## 三、模块化 Key-Value 对照清单

### 1. 列表模块 (List)

| 多语言 Key                                   | 中文 (zh-CN)   | 类型            | 源码位置                                            | 适用场景 / 控件     |
| :---------------------------------------- | :----------- | :------------ | :---------------------------------------------- | :------------ |
| `printManager.list.searchPlaceholder`     | **请输入编码/名称** | `Placeholder` | `list/index.tsx:L23`                            | 列表顶部搜索框占位符    |
| `printManager.list.btn.add`               | **添加**       | `Button`      | `list/store/index.ts:L17`                       | 列表顶部新增模板按钮    |
| `printManager.list.btn.design`            | **设计**       | `Button`      | `list/components/columnOptions.tsx:L81`         | 表格行操作-打开设计器   |
| `printManager.list.btn.edit`              | **编辑**       | `Button`      | `list/components/columnOptions.tsx:L44`         | 表格行操作-编辑模板属性  |
| `printManager.list.btn.delete`            | **删除**       | `Button`      | `list/components/columnOptions.tsx:L60`         | 表格行操作-删除模板    |
| `printManager.list.btn.detail`            | **详情**       | `Button`      | `list/components/columnOptions.tsx:L105`        | 表格行操作-查看模板详情  |
| `printManager.list.btn.copy`              | **复制**       | `Button`      | `list/components/columnOptions.tsx:L130`        | 表格行操作-复制模板    |
| `printManager.list.btn.enable`            | **启用**       | `Button/Tag`  | `list/components/columnOptions.tsx:L23`         | 表格行状态切换按钮/Tag |
| `printManager.list.btn.disable`           | **停用**       | `Button/Tag`  | `list/components/columnOptions.tsx:L23`         | 表格行状态切换按钮/Tag |
| `printManager.list.btn.config`            | **配置**       | `Button`      | `list/components/printUseScope/index.tsx:L42`   | 使用范围设置按钮      |
| `printManager.list.btn.custom`            | **自定义**      | `Button`      | `list/components/printExportName/index.tsx:L42` | 导出文件名自定义设置按钮  |
| `printManager.list.btn.confirm`           | **确定**       | `Button`      | `list/components/tableDrawer.tsx:L232`          | 抽屉/弹窗确定操作     |
| `printManager.list.btn.cancel`            | **取消**       | `Button`      | `list/components/tableDrawer.tsx:L224`          | 抽屉/弹窗取消操作     |
| `printManager.list.btn.addCondition`      | **添加**       | `Button`      | `list/components/printUseScope/index.tsx:L220`  | 添加条件/参数按钮     |
| `printManager.list.btn.deleteCondition`   | **删除**       | `Button`      | `list/components/printUseScope/index.tsx:L191`  | 删除条件/参数按钮     |
| `printManager.list.columns.index`         | **序号**       | `Column`      | `list/store/index.ts:L30`                       | 表格序号列         |
| `printManager.list.columns.billType`      | **单据类型**     | `Column`      | `list/components/columnOptions.tsx:L166`        | 表格列-单据类型      |
| `printManager.list.columns.formName`      | **所属表单**     | `Column`      | `list/components/columnOptions.tsx:L172`        | 表格列-所属表单      |
| `printManager.list.columns.code`          | **编号**       | `Column`      | `list/components/columnOptions.tsx:L180`        | 表格列-模板编号      |
| `printManager.list.columns.name`          | **名称**       | `Column`      | `list/components/columnOptions.tsx:L186`        | 表格列-模板名称      |
| `printManager.list.columns.remark`        | **备注**       | `Column`      | `list/components/columnOptions.tsx:L194`        | 表格列-备注        |
| `printManager.list.columns.templateType`  | **类型**       | `Column`      | `list/components/columnOptions.tsx:L202`        | 表格列-模板类型      |
| `printManager.list.columns.shareStrategy` | **共享策略**     | `Column`      | `list/components/columnOptions.tsx:L208`        | 表格列-共享策略      |
| `printManager.list.columns.orgName`       | **单元/组织**    | `Column`      | `list/components/columnOptions.tsx:L224`        | 表格列-所属单元/组织   |
| `printManager.list.columns.status`        | **状态**       | `Column`      | `list/components/columnOptions.tsx:L230`        | 表格列-状态        |
| `printManager.list.columns.useScope`      | **使用范围**     | `Column`      | `list/components/columnOptions.tsx:L237`        | 表格列-使用范围      |
| `printManager.list.columns.action`        | **操作**       | `Column`      | `list/components/columnOptions.tsx:L244`        | 表格操作列         |
| `printManager.list.templateType.user`     | **用户**       | `Enum`        | `list/store/formCfg.ts:L139`                    | 模板类型-用户       |
| `printManager.list.templateType.app`      | **用户_APP展示** | `Enum`        | `list/store/formCfg.ts:L140`                    | 模板类型-用户_APP展示 |
| `printManager.list.shareStrategy.group`   | **集团共享**     | `Enum`        | `list/store/formCfg.ts:L47`                     | 共享策略-集团共享     |
| `printManager.list.shareStrategy.unit`    | **单元共享**     | `Enum`        | `list/store/formCfg.ts:L48`                     | 共享策略-单元共享     |
| `printManager.list.shareStrategy.org`     | **组织私有**     | `Enum`        | `list/store/formCfg.ts:L49`                     | 共享策略-组织私有     |
| `printManager.list.exportAuth.noLimit`    | **不控制**      | `Enum`        | `list/store/formCfg.ts:L166`                    | 导出权限-不控制      |
| `printManager.list.exportAuth.pdfOnly`    | **只允许导出PDF** | `Enum`        | `list/store/formCfg.ts:L167`                    | 导出权限-只允许导出PDF |
| `printManager.list.exportAuth.disabled`   | **不允许导出**    | `Enum`        | `list/store/formCfg.ts:L168`                    | 导出权限-不允许导出    |
| `printManager.list.billType.detail`       | **详情页**      | `Enum`        | `list/store/formCfg.ts:L41`                     | 单据类型-详情页      |
| `printManager.list.billType.list`         | **列表页**      | `Enum`        | `list/store/formCfg.ts:L42`                     | 单据类型-列表页      |

### 2. 模板属性抽屉与表单 (Drawer / Form)

| 多语言 Key | 中文 (zh-CN) | 类型 | 源码位置 | 适用场景 / 控件 |
| :--- | :--- | :--- | :--- | :--- |
| `printManager.list.form.addTitle` | **新增打印模板** | `Title` | `list/store/formCfg.ts:L53` | 新增抽屉标题 |
| `printManager.list.form.manageTitle` | **打印模板管理** | `Title` | `list/components/tableDrawer.tsx:L194` | 编辑抽屉默认标题 |
| `printManager.list.form.viewTitle` | **打印模板查看** | `Title` | `list/store/index.ts:L72` | 查看详情页标题 |
| `printManager.list.form.code` | **编码** | `Label` | `list/store/formCfg.ts:L90` | 表单项-编码 |
| `printManager.list.form.name` | **名称** | `Label` | `list/store/formCfg.ts:L117` | 表单项-名称 |
| `printManager.list.form.billType` | **单据类型** | `Label` | `list/store/formCfg.ts:L120` | 表单项-单据类型 |
| `printManager.list.form.templateType` | **类型** | `Label` | `list/store/formCfg.ts:L133` | 表单项-模板类型 |
| `printManager.list.form.isDefault` | **默认模板** | `Label` | `list/store/formCfg.ts:L145` | 表单项-默认模板开关 |
| `printManager.list.form.directPreview` | **直接预览** | `Label` | `list/store/formCfg.ts:L153` | 表单项-直接预览开关 |
| `printManager.list.form.previewEditStatus` | **预览时支持隐藏行列** | `Label` | `list/store/formCfg.ts:L159` | 表单项-支持隐藏行列开关 |
| `printManager.list.form.exportAuth` | **导出权限** | `Label` | `list/store/formCfg.ts:L161` | 表单项-导出权限 |
| `printManager.list.form.useScope` | **使用范围** | `Label` | `list/store/formCfg.ts:L175` | 表单项-使用范围 |
| `printManager.list.form.exportName` | **导出文件名称** | `Label` | `list/store/formCfg.ts:L183` | 表单项-导出文件名称 |
| `printManager.list.form.shareStrategy` | **共享策略** | `Label` | `list/store/formCfg.ts:L191` | 表单项-共享策略 |
| `printManager.list.form.org` | **所属组织** | `Label` | `list/store/formCfg.ts:L211` | 表单项-所属组织 |
| `printManager.list.form.unit` | **所属单元** | `Label` | `list/store/formCfg.ts:L223` | 表单项-所属单元 |
| `printManager.list.form.creator` | **创建人** | `Label` | `list/store/formCfg.ts:L234` | 表单项-创建人 |
| `printManager.list.form.createDate` | **创建日期** | `Label` | `list/store/formCfg.ts:L238` | 表单项-创建日期 |
| `printManager.list.form.remark` | **备注** | `Label` | `list/store/formCfg.ts:L239` | 表单项-备注 |
| `printManager.list.form.copySuffix` | **_复制** | `Suffix` | `list/components/tableDrawer.tsx:L167` | 复制模板时的名称后缀 |

### 3. 导出文件名与使用范围弹窗 (Sub-Modals)

| 多语言 Key | 中文 (zh-CN) | 类型 | 源码位置 | 适用场景 / 控件 |
| :--- | :--- | :--- | :--- | :--- |
| `printManager.list.exportName.default` | **默认** | `Enum` | `list/components/printExportName/index.tsx:L28` | 导出名称-默认 |
| `printManager.list.exportName.custom` | **自定义** | `Enum` | `list/components/printExportName/index.tsx:L29` | 导出名称-自定义 |
| `printManager.list.exportName.title` | **导出文件名称** | `Title` | `list/components/printExportName/index.tsx:L47` | 导出文件名配置弹窗标题 |
| `printManager.list.exportName.typeField` | **字段** | `Enum` | `list/components/printExportName/index.tsx:L71` | 导出名称参数类型-字段 |
| `printManager.list.exportName.typeConst` | **常量** | `Enum` | `list/components/printExportName/index.tsx:L72` | 导出名称参数类型-常量 |
| `printManager.list.exportName.typeVar` | **变量** | `Enum` | `list/components/printExportName/index.tsx:L73` | 导出名称参数类型-变量 |
| `printManager.list.exportName.varCurrentUser` | **当前登陆人** | `Enum` | `list/components/printExportName/index.tsx:L76` | 变量选项-当前登陆人 |
| `printManager.list.exportName.varCurrentDate` | **当前日期(年月日)** | `Enum` | `list/components/printExportName/index.tsx:L77` | 变量选项-当前日期 |
| `printManager.list.exportName.varCurrentTime` | **当前时间(年月日时分秒)** | `Enum` | `list/components/printExportName/index.tsx:L78` | 变量选项-当前时间 |
| `printManager.list.exportName.colParam` | **参数** | `Column` | `list/components/printExportName/index.tsx:L107` | 表格列-参数 |
| `printManager.list.exportName.colBillCode` | **单据编码** | `Column` | `list/components/printExportName/index.tsx:L124` | 表格列-单据编码 |
| `printManager.list.useScope.title` | **使用范围** | `Title` | `list/components/printUseScope/index.tsx:L47` | 使用范围配置弹窗标题 |
| `printManager.list.useScope.colParam` | **参数** | `Column` | `list/components/printUseScope/index.tsx:L126` | 表格列-参数 |
| `printManager.list.useScope.colOperator` | **判断符** | `Column` | `list/components/printUseScope/index.tsx:L151` | 表格列-判断符 |
| `printManager.list.useScope.colValue` | **值** | `Column` | `list/components/printUseScope/index.tsx:L170` | 表格列-值 |

### 4. 公共操作符与判断条件 (Operators)

| 多语言 Key | 中文 (zh-CN) | 类型 | 源码位置 | 适用场景 / 控件 |
| :--- | :--- | :--- | :--- | :--- |
| `printManager.common.op.eq` | **等于** | `Enum` | `list/components/maps.ts:L4` | 操作符-等于 |
| `printManager.common.op.notEq` | **不等于** | `Enum` | `list/components/maps.ts:L5` | 操作符-不等于 |
| `printManager.common.op.gt` | **大于** | `Enum` | `list/components/maps.ts:L6` | 操作符-大于 |
| `printManager.common.op.ge` | **大于等于** | `Enum` | `list/components/maps.ts:L7` | 操作符-大于等于 |
| `printManager.common.op.lt` | **小于** | `Enum` | `list/components/maps.ts:L8` | 操作符-小于 |
| `printManager.common.op.le` | **小于等于** | `Enum` | `list/components/maps.ts:L9` | 操作符-小于等于 |
| `printManager.common.op.like` | **包含** | `Enum` | `list/components/maps.ts:L21` | 操作符-包含 |
| `printManager.common.op.notLike` | **不包含** | `Enum` | `list/components/maps.ts:L22` | 操作符-不包含 |
| `printManager.common.op.in` | **属于** | `Enum` | `list/components/maps.ts:L10` | 操作符-属于 |
| `printManager.common.op.between` | **区间** | `Enum` | `list/components/maps.ts:L11` | 操作符-区间 |

### 5. 设计器模块 (Design)

| 多语言 Key | 中文 (zh-CN) | 类型 | 源码位置 | 适用场景 / 控件 |
| :--- | :--- | :--- | :--- | :--- |
| `printManager.design.pageTitle` | **打印模板设计** | `Title` | `list/components/columnOptions.tsx:L72` | 设计器页面 Tab 标题 |
| `printManager.design.toolbar.importExport` | **导入导出** | `Toolbar` | `design/store/headerToolbar.tsx:L12` | 设计器顶部工具栏-导入导出下拉 |
| `printManager.design.toolbar.importPrint` | **打印导入** | `Toolbar` | `design/store/headerToolbar.tsx:L16` | 设计器工具栏-打印导入 |
| `printManager.design.toolbar.exportPrint` | **打印导出** | `Toolbar` | `design/store/headerToolbar.tsx:L20` | 设计器工具栏-打印导出 |
| `printManager.design.toolbar.globalFilter` | **全局数据过滤** | `Toolbar` | `design/store/headerToolbar.tsx:L26` | 设计器工具栏-全局数据过滤按钮 |
| `printManager.design.toolbar.workflowSetting` | **流转历史设置** | `Toolbar` | `design/store/headerToolbar.tsx:L30` | 设计器工具栏-流转历史设置按钮 |
| `printManager.design.toolbar.preview` | **预览** | `Toolbar` | `design/store/headerToolbar.tsx:L34` | 设计器工具栏-预览按钮 |
| `printManager.design.toolbar.save` | **保存** | `Toolbar` | `design/store/headerToolbar.tsx:L36` | 设计器工具栏-保存按钮 |
| `printManager.design.export.title` | **导出** | `Title` | `design/components/topHeaderTitle/index.tsx:L126` | 设计器导出下拉标题 |
| `printManager.design.export.excel` | **EXCEL文件** | `Enum` | `design/components/topHeaderTitle/index.tsx:L136` | 导出文件格式-EXCEL |
| `printManager.design.export.json` | **Json文件** | `Enum` | `design/components/topHeaderTitle/index.tsx:L137` | 导出文件格式-Json |
| `printManager.design.dataSet.searchPlaceholder` | **请输入名称** | `Placeholder` | `design/components/leftDataSetList/index.tsx:L142` | 数据集搜索框占位符 |
| `printManager.design.dataSet.title` | **数据集** | `Title` | `design/components/leftDataSetList/index.tsx:L165` | 左侧数据集面板标题 |
| `printManager.design.dataSet.add` | **添加数据集** | `Button/Tooltip` | `design/components/leftDataSetList/index.tsx:L176` | 添加数据集弹窗标题/按钮 |
| `printManager.design.dataSet.selectWarning` | **请选择数据集** | `Message` | `design/components/leftDataSetList/index.tsx:L191` | 未选择数据集警告提示 |
| `printManager.design.dataSet.expand` | **展开** | `Tooltip` | `design/components/leftDataSetList/index.tsx:L211` | 折叠面板展开提示 |
| `printManager.design.dataSet.collapse` | **收起** | `Tooltip` | `design/components/leftDataSetList/index.tsx:L211` | 折叠面板收起提示 |
| `printManager.design.dataSet.columns.index` | **序号** | `Column` | `design/store/index.ts:L38` | 数据集列表-序号列 |
| `printManager.design.dataSet.columns.type` | **类型** | `Column` | `design/store/index.ts:L49` | 数据集列表-类型列 |
| `printManager.design.dataSet.columns.code` | **编号** | `Column` | `design/store/index.ts:L55` | 数据集列表-编号列 |
| `printManager.design.dataSet.columns.name` | **名称** | `Column` | `design/store/index.ts:L60` | 数据集列表-名称列 |
| `printManager.design.dataSet.type.complex` | **复杂** | `Enum` | `design/store/index.ts:L52` | 数据集类型-复杂 |
| `printManager.design.dataSet.type.normal` | **普通** | `Enum` | `design/store/index.ts:L52` | 数据集类型-普通 |
| `printManager.design.filter.relation.and` | **并且** | `Enum` | `design/components/dataFilter/index.tsx:L34` | 逻辑连接符-并且 |
| `printManager.design.filter.relation.or` | **或者** | `Enum` | `design/components/dataFilter/index.tsx:L35` | 逻辑连接符-或者 |
| `printManager.design.filter.title` | **全局数据过滤** | `Title` | `design/components/dataFilter/index.tsx:L42` | 过滤配置弹窗标题 |
| `printManager.design.filter.columns.relation` | **关系** | `Column` | `design/components/dataFilter/index.tsx:L70` | 表格列-关系 |
| `printManager.design.filter.columns.param` | **参数** | `Column` | `design/components/dataFilter/index.tsx:L78` | 表格列-参数 |
| `printManager.design.filter.columns.operator` | **操作符** | `Column` | `design/components/dataFilter/index.tsx:L95` | 表格列-操作符 |
| `printManager.design.filter.columns.type` | **类型** | `Column` | `design/components/dataFilter/index.tsx:L113` | 表格列-类型 |
| `printManager.design.filter.columns.value` | **值** | `Column` | `design/components/dataFilter/index.tsx:L132` | 表格列-值 |
| `printManager.design.filter.btn.addCondition` | **添加** | `Button` | `design/components/dataFilter/index.tsx:L153` | 添加过滤条件按钮 |
| `printManager.design.filter.btn.clear` | **清空** | `Button` | `design/components/dataFilter/index.tsx:L156` | 清空过滤条件按钮 |

### 6. 流转历史设置 (Workflow Setting)

| 多语言 Key | 中文 (zh-CN) | 类型 | 源码位置 | 适用场景 / 控件 |
| :--- | :--- | :--- | :--- | :--- |
| `printManager.design.workflow.title` | **流转历史设置** | `Title` | `design/components/workflowSetting/index.tsx:L14` | 流转历史设置抽屉标题 |
| `printManager.design.workflow.scopeLabel` | **审批流范围** | `Label` | `design/components/workflowSetting/index.tsx:L40` | 表单项-审批流范围 |
| `printManager.design.workflow.scopeLatest` | **最新一次审批（包含未结束/终止的审批）** | `Enum` | `design/components/workflowSetting/index.tsx:L21` | 审批流范围选项 0 |
| `printManager.design.workflow.scopeLatestEnded` | **最新一次正常结束的审批** | `Enum` | `design/components/workflowSetting/index.tsx:L22` | 审批流范围选项 1 |
| `printManager.design.workflow.scopeAllEnded` | **所有正常结束审批** | `Enum` | `design/components/workflowSetting/index.tsx:L23` | 审批流范围选项 2 |
| `printManager.design.workflow.scopeAll` | **所有审批(包含未结束/终止的审批)** | `Enum` | `design/components/workflowSetting/index.tsx:L24` | 审批流范围选项 3 |
| `printManager.design.workflow.recordScopeLabel` | **审批记录范围** | `Label` | `design/components/workflowSetting/index.tsx:L50` | 表单项-审批记录范围 |
| `printManager.design.workflow.recordAll` | **所有审批记录** | `Enum` | `design/components/workflowSetting/index.tsx:L28` | 审批记录范围选项 0 |
| `printManager.design.workflow.recordSubmitAll` | **所有动作是提交的审批记录** | `Enum` | `design/components/workflowSetting/index.tsx:L29` | 审批记录范围选项 1 |
| `printManager.design.workflow.recordSubmitLast` | **仅最后一次动作是提交的审批记录** | `Enum` | `design/components/workflowSetting/index.tsx:L30` | 审批记录范围选项 2 |
| `printManager.design.workflow.startNodeLabel` | **打印发起人节点** | `Label` | `design/components/workflowSetting/index.tsx:L60` | 表单项-打印发起人节点 |

### 7. 预览模块 (Preview)

| 多语言 Key | 中文 (zh-CN) | 类型 | 源码位置 | 适用场景 / 控件 |
| :--- | :--- | :--- | :--- | :--- |
| `printManager.preview.pageTitle` | **打印模板预览** | `Title` | `design/components/topHeaderTitle/utils.ts:L5` | 预览页面 Tab 标题 |
| `printManager.preview.toolbar.print` | **打印** | `Toolbar` | `preview/store/headerToolbar.tsx:L10` | 预览页工具栏-打印按钮 |
| `printManager.preview.toolbar.printSetting` | **打印设置** | `Toolbar` | `preview/store/headerToolbar.tsx:L11` | 预览页工具栏-打印设置 |
| `printManager.preview.toolbar.export` | **导出** | `Toolbar` | `preview/store/headerToolbar.tsx:L14` | 预览页工具栏-导出下拉 |
| `printManager.preview.toolbar.exportExcel` | **导出EXCEL** | `Toolbar` | `preview/store/headerToolbar.tsx:L18` | 预览页工具栏-导出EXCEL |
| `printManager.preview.toolbar.exportPdf` | **导出PDF** | `Toolbar` | `preview/store/headerToolbar.tsx:L22` | 预览页工具栏-导出PDF |
| `printManager.preview.toolbar.close` | **关闭** | `Toolbar` | `preview/store/headerToolbar.tsx:L26` | 预览页工具栏-关闭按钮 |

### 8. 提示、校验与二次确认 (Messages / Alerts)

| 多语言 Key | 中文 (zh-CN) | 类型 | 源码位置 | 适用场景 / 控件 |
| :--- | :--- | :--- | :--- | :--- |
| `printManager.list.validation.codeMaxLength` | **最长20字符** | `Message` | `list/store/formCfg.ts:L96` | 表单校验-编码最长20字符 |
| `printManager.list.validation.codeFormat` | **只能输入英文字符、数字和下划线！** | `Message` | `list/store/formCfg.ts:L102` | 表单校验-编码字符格式 |
| `printManager.list.validation.useScopeRequired` | **使用范围为部分时必须配置条件信息** | `Message` | `list/components/tableDrawer.tsx:L74` | 提交校验提示 |
| `printManager.list.validation.exportNameRequired` | **导出文件名称为自定义时必须配置名称信息** | `Message` | `list/components/tableDrawer.tsx:L78` | 提交校验提示 |
| `printManager.list.validation.paramFormatError` | **请输入正确的参数格式** | `Message` | `list/components/printExportName/index.tsx:L98` | 参数格式校验错误提示 |
| `printManager.list.msg.confirmDelete` | **是否确认删除?** | `Confirm` | `list/components/columnOptions.tsx:L55` | 删除二次确认 |
| `printManager.list.msg.confirmCloseUnsaved` | **有修改内容未保存，确定要关闭吗?** | `Confirm` | `list/components/tableDrawer.tsx:L41` | 未保存关闭确认 |
| `printManager.list.msg.notDesignedCannotEnable` | **打印模板未进行设计，不允许启用** | `Message` | `list/store/index.ts:L48` | 未设计模板启用拦截 |
| `printManager.design.msg.saveSuccess` | **保存成功** | `Message` | `design/components/topHeaderTitle/utils.ts:L25` | 模板保存成功提示 |
| `printManager.design.msg.saveFailed` | **保存失败: ** | `Message` | `design/components/topHeaderTitle/utils.ts:L32` | 模板保存失败提示前缀 |
| `printManager.design.msg.exportError` | **导出错误** | `Message` | `design/service.ts:L58` | 导出异常提示 |
| `printManager.preview.msg.dataNotLoaded` | **打印数据未加载完成，请稍后重试** | `Message` | `preview/index.tsx:L95` | 打印数据未加载完成拦截 |
| `printManager.preview.msg.tableNotReady` | **表格实例未就绪，请稍后重试** | `Message` | `preview/index.tsx:L99` | 表格实例未就绪拦截 |
| `printManager.preview.msg.printFailed` | **打印失败** | `Message` | `preview/index.tsx:L113` | 打印执行失败提示 |
| `printManager.preview.msg.exportFailed` | **导出失败** | `Message` | `preview/export.ts:L8` | 导出文件执行失败提示 |
| `printManager.preview.msg.previewFailed` | **预览失败: ** | `Message` | `preview/index.tsx:L197` | 预览加载失败提示前缀 |
| `printManager.preview.msg.noApiResponse` | **接口无返回** | `Message` | `preview/service.ts:L17` | 接口无数据返回提示 |

---

## 四、代码注释与非 UI 常量清单（无需国际化）

以下为源码中的开发者注释与内部系统内置集合，仅供代码阅读与维护参考，**无需**纳入国际化词条库：

| 所在文件 | 行号 | 类型 | 内容说明 |
| :--- | :--- | :--- | :--- |
| `design/normalizeDataSetFields.ts` | L11 | 内部硬编码过滤集合 | `EXCLUDED_BUILT_IN_DATA_SETS = new Set(['流转历史', '流程确认事项'])` |
| `list/components/columnOptions.tsx` | L9 | 开发者注释 | `// 内置模版 设计、修改、删除按钮置灰` |
| `list/components/columnOptions.tsx` | L11 | 开发者注释 | `// 当前登录组织与模板所属组织不一致时 设计、修改、删除按钮置灰` |
| `design/components/workflowSetting/index.tsx` | L80 | 开发者注释 | `// 订阅 modal` |
| `design/components/leftDataSetList/index.tsx` | L181 | 开发者注释 | `// 若取消则直接关闭` |
| `preview/index.tsx` | L140 | 开发者注释 | `// 释放 Blob URL` |
| `list/service.ts` | L3-L11 | 开发者注释 | 接口参数及功能说明注释 |
| `preview/utils.ts` | L1-L15 | 开发者注释 | 预览工具函数说明注释 |

---
*文档更新于 2026-08-31，专为 report-web PrintManager 多语言改造定制。*
