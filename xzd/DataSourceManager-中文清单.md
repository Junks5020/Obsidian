---
tags:
  - report-web
  - DataSourceManager
  - i18n
  - 多语言
  - 中文清单
created: 2026-09-01
updated: 2026-09-01
total_unique_keys: 48
key_format: "<identifier> (纯扁平化/无点号/全局唯一)"
---

# DataSourceManager (数据源管理) 多语言 (i18n) Key 与中文词条对照表

> **模块路径**：`src/pages/DataSourceManager/ (含 transferTable 引用组件)`  
> **Key 规范原则**：
> 1. **纯扁平化 Key (Flat Identifier)**：去除所有前缀及点号（如直接使用 `add`、`edit`、`manageTitle`），无任何点号 `.` 嵌套。
> 2. **全局唯一与词条去重 (Unique & Deduplicated)**：相同中文词条全局仅保留一个唯一 Key。
> 3. **共归纳唯一词条**：**48** 个。

---

## 目录
- [一、完整 zh-CN 语言包 JSON（可直接导入）](#一完整-zh-cn-语言包-json可直接导入)
- [二、按业务分类对照清单](#二按业务分类对照清单)
  - [1. 基础操作与通用按钮](#1-基础操作与通用按钮)
  - [2. 表格列头与表单字段](#2-表格列头与表单字段)
  - [3. 页面标题、向导步骤与面板标题](#3-页面标题向导步骤与面板标题)
  - [4. 枚举与下拉选项](#4-枚举与下拉选项)
  - [5. 占位符与提示/校验/确认信息](#5-占位符与提示校验确认信息)
- [三、代码注释与非 UI 常量说明（无需国际化）](#三代码注释与非-ui-常量说明无需国际化)

---

## 一、完整 zh-CN 语言包 JSON（可直接导入）

```json
{
  "manageTitle": "数据源管理",
  "addDataSourceTitle": "数据源新增",
  "editDataSourceTitle": "数据源编辑",
  "detailDataSourceTitle": "数据源详情",
  "chooseDataSourceTypeStep": "选择数据源类型",
  "basicConfigStep": "基础配置",
  "settingTitle": "设置",
  "controlModePanel": "控制方式",
  "dataTablePanel": "数据表",
  "add": "新增",
  "edit": "编辑",
  "detail": "详情",
  "delete": "删除",
  "enable": "启用",
  "disable": "停用",
  "cancel": "取消",
  "prevStep": "上一步",
  "nextStep": "下一步",
  "save": "保存",
  "testConnect": "测试连接",
  "restoreToAll": "恢复为全部",
  "index": "序号",
  "type": "类型",
  "dataSourceType": "数据源类型",
  "name": "名称",
  "hostIp": "主机名/IP地址",
  "dbName": "数据库名称",
  "schemaName": "模式名称",
  "username": "用户名",
  "password": "密码",
  "port": "端口号",
  "dataScope": "数据范围",
  "remark": "备注",
  "status": "状态",
  "action": "操作",
  "tableName": "表名",
  "comment": "注释",
  "businessEntity": "业务实体",
  "database": "数据库",
  "allScope": "全部",
  "partScope": "部分",
  "forbiddenUse": "禁止使用",
  "allowOnlyUse": "只允许使用",
  "searchNamePlaceholder": "请输入名称",
  "searchKeywordPlaceholder": "请输入关键字",
  "confirmDeleteMsg": "是否确认删除?",
  "confirmCloseUnsavedMsg": "有修改内容未保存，确定要关闭吗?",
  "saveSuccessMsg": "保存成功"
}
```

---

## 二、按业务分类对照清单

### 1. 基础操作与通用按钮

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `add` | **新增** | 新增数据源按钮 | `list/index.tsx:L32` |
| `edit` | **编辑** | 表格行编辑操作 | `list/components/columnOptions.tsx:L43` |
| `detail` | **详情** | 表格行详情操作 | `list/components/columnOptions.tsx:L60` |
| `delete` | **删除** | 表格行删除操作 | `list/components/columnOptions.tsx:L76` |
| `enable` | **启用** | 状态启用标签/操作 | `list/components/columnOptions.tsx:L24, L118` |
| `disable` | **停用** | 状态停用标签/操作 | `list/components/columnOptions.tsx:L24, L118` |
| `cancel` | **取消** | 向导底部取消操作 | `detail/store/footerCfg.ts:L10` |
| `prevStep` | **上一步** | 向导上一步按钮 | `detail/store/footerCfg.ts:L16` |
| `nextStep` | **下一步** | 向导下一步按钮 | `detail/store/footerCfg.ts:L21` |
| `save` | **保存** | 向导保存按钮 | `detail/store/footerCfg.ts:L26` |
| `testConnect` | **测试连接** | 数据源连接测试按钮 | `detail/xtypes/DataSourceConnect/index.tsx:L47` |
| `restoreToAll` | **恢复为全部** | 范围重置按钮 | `detail/xtypes/DataSourceRange/index.tsx:L79` |

### 2. 表格列头与表单字段

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `index` | **序号** | 表格序号列头 | `list/store.ts:L15` |
| `type` | **类型** | 表格类型列头 | `list/components/columnOptions.tsx:L92` |
| `dataSourceType` | **数据源类型** | 数据源类型字段标签 | `detail/constants/forms.ts:L22, L60` |
| `name` | **名称** | 表格名称列/表单标签 | `list/components/columnOptions.tsx:L101, detail/constants/forms.ts:L29, L67` |
| `hostIp` | **主机名/IP地址** | 主机地址表单标签 | `detail/constants/forms.ts:L74` |
| `dbName` | **数据库名称** | 数据库名称表单标签 | `detail/constants/forms.ts:L81` |
| `schemaName` | **模式名称** | 模式名称表单标签 | `detail/constants/forms.ts:L89` |
| `username` | **用户名** | 用户名表单标签 | `detail/constants/forms.ts:L97` |
| `password` | **密码** | 密码表单标签 | `detail/constants/forms.ts:L104` |
| `port` | **端口号** | 端口号表单标签 | `detail/constants/forms.ts:L111` |
| `dataScope` | **数据范围** | 数据范围表单/弹窗标签 | `detail/constants/forms.ts:L36, L125, detail/xtypes/DataSourceRange/index.tsx:L91` |
| `remark` | **备注** | 表格备注列/表单标签 | `list/components/columnOptions.tsx:L108, detail/constants/forms.ts:L41, L131` |
| `status` | **状态** | 表格状态列头 | `list/components/columnOptions.tsx:L115` |
| `action` | **操作** | 表格操作列头 | `list/components/columnOptions.tsx:L121` |
| `tableName` | **表名** | 范围配置表格表名列头 | `detail/xtypes/DataSourceRange/index.tsx:L23` |
| `comment` | **注释** | 范围配置表格注释列头 | `detail/xtypes/DataSourceRange/index.tsx:L30` |

### 3. 页面标题、向导步骤与面板标题

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `manageTitle` | **数据源管理** | 数据源管理页面标题/路由名 | `route.ts:L4` |
| `addDataSourceTitle` | **数据源新增** | 新增页面标题 | `list/index.tsx:L28` |
| `editDataSourceTitle` | **数据源编辑** | 编辑页面标题 | `list/components/columnOptions.tsx:L39` |
| `detailDataSourceTitle` | **数据源详情** | 详情页面标题 | `list/components/columnOptions.tsx:L56` |
| `chooseDataSourceTypeStep` | **选择数据源类型** | 向导步骤一标题 | `detail/store/stepCfg.ts:L6` |
| `basicConfigStep` | **基础配置** | 向导步骤二标题 | `detail/store/stepCfg.ts:L9` |
| `settingTitle` | **设置** | 范围设置弹窗标题 | `detail/xtypes/DataSourceRange/index.tsx:L85` |
| `controlModePanel` | **控制方式** | 范围控制方式面板标题 | `detail/xtypes/DataSourceRange/index.tsx:L169` |
| `dataTablePanel` | **数据表** | 数据表面板标题 | `detail/xtypes/DataSourceRange/index.tsx:L179` |

### 4. 枚举与下拉选项

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `businessEntity` | **业务实体** | 数据源分类-业务实体 | `src/constants/datasourceMaps/index.ts:L15` |
| `database` | **数据库** | 数据源分类-数据库 | `src/constants/datasourceMaps/index.ts:L25` |
| `allScope` | **全部** | 范围选项-全部 | `detail/xtypes/DataSourceRange/index.tsx:L69` |
| `partScope` | **部分** | 范围选项-部分 | `detail/xtypes/DataSourceRange/index.tsx:L69` |
| `forbiddenUse` | **禁止使用** | 控制方式-禁止使用 | `detail/xtypes/DataSourceRange/index.tsx:L115` |
| `allowOnlyUse` | **只允许使用** | 控制方式-只允许使用 | `detail/xtypes/DataSourceRange/index.tsx:L116` |

### 5. 占位符与提示/校验/确认信息

| 多语言 Key | 中文 (zh-CN) | 用途说明 | 源码出现位置 |
| :--- | :--- | :--- | :--- |
| `searchNamePlaceholder` | **请输入名称** | 搜索框占位符 | `list/index.tsx:L34` |
| `searchKeywordPlaceholder` | **请输入关键字** | 穿梭框搜索占位符 | `components/report/transferTable/index.tsx:L53` |
| `confirmDeleteMsg` | **是否确认删除?** | 删除二次确认提示 | `list/components/columnOptions.tsx:L71` |
| `confirmCloseUnsavedMsg` | **有修改内容未保存，确定要关闭吗?** | 关闭未保存确认提示 | `detail/components/formMain.tsx:L165` |
| `saveSuccessMsg` | **保存成功** | 保存成功轻提示 | `detail/components/formMain.tsx:L212` |

---

## 三、代码注释与非 UI 常量说明（无需国际化）

以下为源码中的开发者注释、控制台调试信息与内部技术标识，仅供代码维护与架构理解，**无需**提取到国际化词条中：

| 所在文件 | 行号 | 类型 | 内容说明 |
| :--- | :--- | :--- | :--- |
| `detail/service.ts` | L1-L26 | 代码注释/接口 | 接口参数及数据源连接功能说明注释 |
| `list/service.ts` | L1-L20 | 代码注释/接口 | 列表分页及删除接口说明注释 |
| `detail/xtypes/DataSourceRange` | L10-L15 | 开发者注释 | 范围选择与重置状态注释 |

---
*文档生成于 2026-09-01，已完全去除点号前缀，纯扁平化 Key。*