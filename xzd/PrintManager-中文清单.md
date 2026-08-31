---
tags:
  - report-web
  - PrintManager
  - 国际化
  - 中文清单
created: 2026-08-31
updated: 2026-08-31
total_files_with_chinese: 27
total_chinese_lines: 349
---

# PrintManager 页面中文提取与整理清单

> **源码目录**：`src/pages/PrintManager/`  
> **涉及范围**：打印模板列表 (`list`)、设计器 (`design`)、预览模块 (`preview`)  
> **统计总览**：共扫描 **36** 个源码文件，其中 **27** 个文件包含中文，共计 **349** 行（含 UI 文案与代码注释）。

---

## 目录
- [一、高频核心业务术语与枚举汇总](#一高频核心业务术语与枚举汇总)
- [二、UI 交互文案分类汇总（国际化提取参考）](#二ui-交互文案分类汇总国际化提取参考)
  - [1. 操作按钮与动作](#1-操作按钮与动作)
  - [2. 表格列头与表单字段](#2-表格列头与表单字段)
  - [3. 下拉选项与枚举值](#3-下拉选项与枚举值)
  - [4. 弹窗提示与交互确认](#4-弹窗提示与交互确认)
  - [5. 占位符与输入提示](#5-占位符与输入提示)
- [三、按模块与文件逐行详细清单](#三按模块与文件逐行详细清单)
  - [1. 列表模块 (list)](#1-列表模块-list)
  - [2. 设计器模块 (design)](#2-设计器模块-design)
  - [3. 预览模块 (preview)](#3-预览模块-preview)
- [四、代码注释中文归纳](#四代码注释中文归纳)

---

## 一、高频核心业务术语与枚举汇总

| 业务术语 / 概念 | 出现模块 | 业务含义 / 说明 |
| :--- | :--- | :--- |
| **打印模板** | list / design / preview | 系统中用于单据/报表打印排版的模板配置 |
| **单据类型 / 所属表单** | list / design | 模板关联的业务单据分类与业务表单 |
| **共享策略** | list / design | 模板的作用范围划分：`集团共享`、`单元共享`、`组织私有` |
| **模板类型** | list / design | `用户`、`用户_APP展示` |
| **使用范围** | list / design | 模板的生效范围：`全部`、`部分`（按组织树勾选） |
| **导出文件名规则** | list | 导出 PDF / Excel 时的命名模板及变量规则 |
| **流转历史设置** | design | 打印模板中审批工作流历史记录的输出范围与规则配置 |
| **审批流范围** | design | `最新一次审批`、`所有正常结束审批` 等 |
| **审批记录范围** | design | `所有审批记录`、`所有动作是提交的审批记录`、`仅最后一次动作是提交的审批记录` |
| **数据集 / 字段** | design | 报表绑定的数据源数据集及明细字段 |
| **过滤条件 / 运算符** | design | 数据集过滤规则（等于、不等于、大于、小于、属于、区间等） |

---

## 二、UI 交互文案分类汇总（国际化提取参考）

### 1. 操作按钮与动作

| 中文文案 | 所在文件/组件 | 用途 / 交互 |
| :--- | :--- | :--- |
| **新增** | `list/index.tsx` | 列表顶部主操作，新增打印模板 |
| **设计** | `list/components/columnOptions.tsx` | 行操作，打开模板设计器 |
| **编辑** | `list/components/columnOptions.tsx` | 行操作，打开抽屉编辑模板基础属性 |
| **删除** | `list/components/columnOptions.tsx` | 行操作，删除打印模板 |
| **详情** | `list/components/columnOptions.tsx` | 行操作，查看模板详细属性 |
| **复制** | `list/components/columnOptions.tsx` | 行操作，快速复制已有模板 |
| **启用 / 停用** | `list/components/columnOptions.tsx` | 行操作 / 开关状态切换 |
| **保存** | `design/store/headerToolbar.tsx` | 设计器顶部工具栏，保存模板设计 |
| **预览** | `design/store/headerToolbar.tsx` | 设计器顶部工具栏，调起预览页面 |
| **打印** | `preview/store/headerToolbar.tsx` | 预览页顶部工具栏，触发浏览器打印/插件打印 |
| **导出 PDF / 导出 Excel** | `preview/store/headerToolbar.tsx` | 预览页顶部导出功能 |
| **确定 / 取消** | 各 Drawer / Modal / Dialog 组件 | 弹窗通用确认与取消操作 |
| **添加条件 / 清空** | `design/components/dataFilter/` | 过滤条件的新增与清空 |
| **重置** | `list/components/tableDrawer.tsx` | 表单重置 |

### 2. 表格列头与表单字段

| 字段名称 | 模块 | 对应属性 / 上下文 |
| :--- | :--- | :--- |
| **单据类型** | list / 表格与表单 | `billType` |
| **所属表单** | list / 表格与表单 | `formName` |
| **编号** | list / 表格与表单 | `code` |
| **名称** | list / 表格与表单 | `name` |
| **备注** | list / 表格与表单 | `remark` |
| **类型** | list / 表格与表单 | `templateType` (用户 / 用户_APP展示) |
| **共享策略** | list / 表格与表单 | `shareStrategy` |
| **单元/组织** | list / 表格 | `orgName` |
| **状态** | list / 表格 | `status` (启用 / 停用) |
| **使用范围** | list / 表格与表单 | `useScopeType` (全部 / 部分) |
| **导出名称** | list / 表单 | `exportName` |
| **操作** | list / 表格列头 | 表格操作列 |
| **打印发起人节点** | design / 工作流设置 | `printStartNode` |
| **审批流范围** | design / 工作流设置 | `workflowScope` |
| **审批记录范围** | design / 工作流设置 | `workflowRecordScope` |

### 3. 下拉选项与枚举值

| 枚举文案 | 对应字段 / 配置项 | 详细选项列表 |
| :--- | :--- | :--- |
| **模板类型** | `templateType` | `用户`、`用户_APP展示` |
| **共享策略** | `shareStrategy` | `集团共享`、`单元共享`、`组织私有` |
| **使用范围** | `useScopeType` | `全部`、`部分` |
| **审批流范围** | `workflowScope` | 1. 最新一次审批（包含未结束/终止的审批）<br>2. 最新一次正常结束的审批<br>3. 所有正常结束审批<br>4. 所有审批(包含未结束/终止的审批) |
| **审批记录范围** | `workflowRecordScope` | 1. 所有审批记录<br>2. 所有动作是提交的审批记录<br>3. 仅最后一次动作是提交的审批记录 |
| **过滤运算符** | `dataFilter/constants` | `等于`、`不等于`、`大于`、`大于等于`、`小于`、`小于等于`、`属于`、`区间` |
| **连接关系** | `dataFilter` | `并且 (AND)`、`或者 (OR)` |

### 4. 弹窗提示与交互确认

| 提示文案 | 触发位置 | 提示类型 |
| :--- | :--- | :--- |
| **是否确认删除?** | `list/components/columnOptions.tsx:55` | 确认弹窗 (Confirm) |
| **导出失败** | `preview/export.ts:8` | 错误提示 (Alert) |
| **保存成功 / 保存失败** | `design/store/headerToolbar.tsx` | 操作通知 (Toast) |
| **流转历史设置** | `design/components/workflowSetting/index.tsx:14` | 抽屉/弹窗标题 |
| **设置导出文件名** | `list/components/printExportName/index.tsx` | 抽屉/弹窗标题 |
| **设置使用范围** | `list/components/printUseScope/index.tsx` | 抽屉/弹窗标题 |

### 5. 占位符与输入提示

| 占位符文案 | 所在文件 | 目标输入框 |
| :--- | :--- | :--- |
| **请输入编码/名称** | `list/index.tsx:23` | 列表顶部检索框 |
| **请输入** / **请选择** | 各表单项 | 通用表单占位提示 |
| **请输入模板名称** | `list/store/formCfg.ts` | 模板名称输入框 |
| **请输入模板编号** | `list/store/formCfg.ts` | 模板编号输入框 |

---

## 三、按模块与文件逐行详细清单

### 1. 列表模块 (list)

> 打印模板列表展示、检索、抽屉编辑（新增/修改/复制/详情）、使用范围及导出名称配置

#### 📄 `list/components/columnOptions.tsx` (27 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L9 | 代码注释 | `// 内置模版 设计、修改、删除按钮置灰` |
| L11 | 代码注释 | `// 当前登录组织与模板所属组织不一致时 设计、修改、删除按钮置灰` |
| L23 | UI文本/代码常量 (Text/Constant) | `{!row.status ? '启用' : '停用'}` |
| L44 | UI文本/代码常量 (Text/Constant) | `编辑` |
| L55 | 弹窗/提示消息 (Alert/Modal) | `if (await NG.confirm('是否确认删除?')) {` |
| L60 | UI文本/代码常量 (Text/Constant) | `删除` |
| L72 | UI文本/代码常量 (Text/Constant) | `AppTitle: '打印模板设计',` |
| L81 | UI文本/代码常量 (Text/Constant) | `设计` |
| L105 | UI文本/代码常量 (Text/Constant) | `详情` |
| L130 | UI文本/代码常量 (Text/Constant) | `复制` |
| L166 | 标题/列头 (Title) | `title: '单据类型',` |
| L172 | 标题/列头 (Title) | `title: '所属表单',` |
| L180 | 标题/列头 (Title) | `title: '编号',` |
| L186 | 标题/列头 (Title) | `title: '名称',` |
| L194 | 标题/列头 (Title) | `title: '备注',` |
| L202 | 标题/列头 (Title) | `title: '类型',` |
| L205 | 按钮/标签/渲染文本 (Action/Tag) | `render: ({ row: { templateType } }) => (templateType ? '用户_APP展示' : '用户')` |
| L208 | 标题/列头 (Title) | `title: '共享策略',` |
| L215 | UI文本/代码常量 (Text/Constant) | `return '集团共享';` |
| L217 | UI文本/代码常量 (Text/Constant) | `return '单元共享';` |
| L219 | UI文本/代码常量 (Text/Constant) | `return '组织私有';` |
| L224 | 标题/列头 (Title) | `title: '单元/组织',` |
| L230 | 标题/列头 (Title) | `title: '状态',` |
| L234 | 按钮/标签/渲染文本 (Action/Tag) | `render: ({ row: { status } }) => (status === 1 ? <Tag color="success">启用</Tag> : <Tag color="error">停用</Tag>)` |
| L237 | 标题/列头 (Title) | `title: '使用范围',` |
| L241 | 按钮/标签/渲染文本 (Action/Tag) | `render: ({ row: { useScopeType } }) => (!useScopeType ? '全部' : '部分')` |
| L244 | 标题/列头 (Title) | `title: '操作',` |

#### 📄 `list/components/maps.ts` (24 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L4 | UI文本/代码常量 (Text/Constant) | `eq: '等于',` |
| L5 | UI文本/代码常量 (Text/Constant) | `notEq: '不等于',` |
| L6 | UI文本/代码常量 (Text/Constant) | `gt: '大于',` |
| L7 | UI文本/代码常量 (Text/Constant) | `ge: '大于等于',` |
| L8 | UI文本/代码常量 (Text/Constant) | `lt: '小于',` |
| L9 | UI文本/代码常量 (Text/Constant) | `le: '小于等于',` |
| L10 | UI文本/代码常量 (Text/Constant) | `in: '属于',` |
| L11 | UI文本/代码常量 (Text/Constant) | `between: '区间'` |
| L15 | 表单/选项标签 (Label) | `{ label: '等于', value: 'eq' },` |
| L16 | 表单/选项标签 (Label) | `{ label: '不等于', value: 'ne' },` |
| L17 | 表单/选项标签 (Label) | `{ label: '大于', value: 'gt' },` |
| L18 | 表单/选项标签 (Label) | `{ label: '大于等于', value: 'ge' },` |
| L19 | 表单/选项标签 (Label) | `{ label: '小于', value: 'lt' },` |
| L20 | 表单/选项标签 (Label) | `{ label: '小于等于', value: 'le' },` |
| L21 | 表单/选项标签 (Label) | `{ label: '包含', value: 'like' },` |
| L22 | 表单/选项标签 (Label) | `{ label: '不包含', value: 'notLike' }` |
| L27 | 表单/选项标签 (Label) | `label: '等于',` |
| L32 | 表单/选项标签 (Label) | `label: '不等于',` |
| L37 | 表单/选项标签 (Label) | `label: '大于',` |
| L42 | 表单/选项标签 (Label) | `label: '大于等于',` |
| L47 | 表单/选项标签 (Label) | `label: '小于',` |
| L52 | 表单/选项标签 (Label) | `label: '小于等于',` |
| L57 | 表单/选项标签 (Label) | `label: '属于',` |
| L62 | 表单/选项标签 (Label) | `label: '区间',` |

#### 📄 `list/components/printExportName/index.tsx` (19 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L28 | 表单/选项标签 (Label) | `{ label: '默认', value: 0 },` |
| L29 | 表单/选项标签 (Label) | `{ label: '自定义', value: 1 }` |
| L42 | UI文本/代码常量 (Text/Constant) | `自定义` |
| L47 | UI文本/代码常量 (Text/Constant) | `title="导出文件名称"` |
| L71 | 表单/选项标签 (Label) | `{ label: '字段', value: '1' },` |
| L72 | 表单/选项标签 (Label) | `{ label: '常量', value: '0' },` |
| L73 | 表单/选项标签 (Label) | `{ label: '变量', value: '2' }` |
| L76 | 表单/选项标签 (Label) | `{ label: '当前登陆人', value: 'current_user' },` |
| L77 | 表单/选项标签 (Label) | `{ label: '当前日期(年月日)', value: 'current_date' },` |
| L78 | 表单/选项标签 (Label) | `{ label: '当前时间(年月日时分秒)', value: 'current_time' }` |
| L80 | 代码注释 | `// 获取下拉选项` |
| L98 | UI文本/代码常量 (Text/Constant) | `NG.message('请输入正确的参数格式');` |
| L107 | 标题/列头 (Title) | `title: '参数',` |
| L124 | 标题/列头 (Title) | `title: '单据编码',` |
| L147 | 标题/列头 (Title) | `title: '操作',` |
| L152 | UI文本/代码常量 (Text/Constant) | `删除` |
| L184 | UI文本/代码常量 (Text/Constant) | `添加` |
| L187 | 按钮/标签/渲染文本 (Action/Tag) | `<Button onClick={onClose}>取消</Button>` |
| L189 | UI文本/代码常量 (Text/Constant) | `确定` |

#### 📄 `list/components/printUseScope/index.tsx` (20 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L28 | 表单/选项标签 (Label) | `{ label: '全部', value: 0 },` |
| L29 | 表单/选项标签 (Label) | `{ label: '部分', value: 1 }` |
| L42 | UI文本/代码常量 (Text/Constant) | `配置` |
| L47 | UI文本/代码常量 (Text/Constant) | `title="使用范围"` |
| L71 | 代码注释 | `// 获取下拉选项` |
| L80 | 代码注释 | `// id 是一级树的id` |
| L83 | 代码注释 | `// 一级树不可选` |
| L93 | 代码注释 | `// 根据请求的下拉选项，为表格数据添加辅助信息` |
| L97 | 代码注释 | `// 更新` |
| L101 | 代码注释 | `// 监听表格数据变化，更新下拉选项` |
| L117 | UI文本/代码常量 (Text/Constant) | `NG.message('请输入正确的参数格式');` |
| L126 | 标题/列头 (Title) | `title: '参数',` |
| L136 | 代码注释 | `// 搜索支持label` |
| L151 | 标题/列头 (Title) | `title: '判断符',` |
| L170 | 标题/列头 (Title) | `title: '值',` |
| L186 | 标题/列头 (Title) | `title: '操作',` |
| L191 | UI文本/代码常量 (Text/Constant) | `删除` |
| L220 | UI文本/代码常量 (Text/Constant) | `添加` |
| L223 | 按钮/标签/渲染文本 (Action/Tag) | `<Button onClick={onClose}>取消</Button>` |
| L225 | UI文本/代码常量 (Text/Constant) | `确定` |

#### 📄 `list/components/printUseScope/utils.tsx` (21 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L6 | 代码注释 | `* 加载到table时根据selectOptions获取表格数据详细信息` |
| L22 | 代码注释 | `// 补充字段信息 helpId dataSource` |
| L28 | 代码注释 | `// 处理value` |
| L30 | 代码注释 | `// 多选时的值结构` |
| L39 | 代码注释 | `* 保存时格式化表格数据` |
| L45 | 代码注释 | `// 处理value` |
| L47 | 代码注释 | `// 多选时的值结构` |
| L62 | 代码注释 | `* 获取字段类型` |
| L106 | 代码注释 | `// 文本` |
| L111 | 代码注释 | `// 数值` |
| L122 | 代码注释 | `// 日期` |
| L126 | 代码注释 | `// 需要设置为 undefined，否则控件会显示 invalid date` |
| L132 | 代码注释 | `// value 在不同场景下的数据格式不一样` |
| L136 | 代码注释 | `// v 为 null 时清空` |
| L148 | 代码注释 | `// 下拉` |
| L157 | 代码注释 | `// value 取第一位` |
| L161 | 代码注释 | `// 通用帮助` |
| L163 | 代码注释 | `// 系统参数-当前登录人` |
| L171 | 代码注释 | `// 系统参数-当前登录组织` |
| L178 | 代码注释 | `// 属于时返回多选通用帮助` |
| L189 | 代码注释 | `// 多选通用帮助` |

#### 📄 `list/components/tableDrawer.tsx` (21 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L34 | 代码注释 | `// 注册自定义xtype` |
| L41 | 弹窗/提示消息 (Alert/Modal) | `if (isEdit && !(await NG.confirm('有修改内容未保存，确定要关闭吗?'))) {` |
| L42 | 代码注释 | `// 取消关闭` |
| L49 | 代码注释 | `// 延迟执行` |
| L63 | 代码注释 | `* 保存` |
| L74 | UI文本/代码常量 (Text/Constant) | `NG.message('使用范围为部分时必须配置条件信息', 'error');` |
| L78 | UI文本/代码常量 (Text/Constant) | `NG.message('导出文件名称为自定义时必须配置名称信息', 'error');` |
| L81 | 代码注释 | `// 如果是全部，使用范围配置为空` |
| L109 | 代码注释 | `// 复制时保存复制的phId` |
| L129 | 代码注释 | `* 组件加载时 获取表单值` |
| L138 | 代码注释 | `// 新增时` |
| L155 | 代码注释 | `// 复制` |
| L167 | UI文本/代码常量 (Text/Constant) | `name: Data.name + '_复制',` |
| L178 | 代码注释 | `// 编辑时 根据id获取表单值` |
| L194 | UI文本/代码常量 (Text/Constant) | `setTitle(Data?.name \|\| '打印模板管理');` |
| L203 | 代码注释 | `// 确保每次打开时都重新请求 分类树数据` |
| L207 | 代码注释 | `// 重置标题` |
| L215 | 代码注释 | `// formDisabled改变，隐藏表单按钮` |
| L224 | UI文本/代码常量 (Text/Constant) | `text: '取消',` |
| L232 | UI文本/代码常量 (Text/Constant) | `text: '确定',` |
| L242 | 代码注释 | `* toolbar点击事件` |

#### 📄 `list/index.tsx` (1 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L23 | 输入框占位符 (Placeholder) | `<HeaderSearch placeholder={'请输入编码/名称'} />` |

#### 📄 `list/service.ts` (8 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L6 | 代码注释 | `// 使用范围字段` |
| L14 | 代码注释 | `// 单据打印类型列表` |
| L22 | 代码注释 | `// IUP作为子应用发布成i8时，返回的单据打印类型列表为空，需要根据selectedCode手动生成` |
| L31 | 代码注释 | `// 打印列表` |
| L39 | 代码注释 | `// 停用` |
| L46 | 代码注释 | `// 启用` |
| L53 | 代码注释 | `// 是否存在打印模板设计` |
| L60 | 代码注释 | `// 删除` |

#### 📄 `list/store/formCfg.ts` (38 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L8 | 代码注释 | `// 集团组织` |
| L11 | 代码注释 | `// 单元组织` |
| L14 | 代码注释 | `// 普通组织` |
| L41 | 表单/选项标签 (Label) | `{ label: '详情页', billType: selectedCode },` |
| L42 | 表单/选项标签 (Label) | `{ label: '列表页', billType: selectedCode + '_list' }` |
| L47 | 表单/选项标签 (Label) | `{ value: 1, label: '集团共享' },` |
| L48 | 表单/选项标签 (Label) | `{ value: 3, label: '单元共享' },` |
| L49 | 表单/选项标签 (Label) | `{ value: 5, label: '组织私有' }` |
| L53 | 标题/列头 (Title) | `title: '新增打印模板',` |
| L70 | 代码注释 | `// 单元Id` |
| L73 | 代码注释 | `// 共享策略` |
| L76 | 代码注释 | `// 模板类型` |
| L90 | 表单/选项标签 (Label) | `label: '编码',` |
| L96 | UI文本/代码常量 (Text/Constant) | `message: '最长20字符'` |
| L102 | UI文本/代码常量 (Text/Constant) | `: Promise.reject('只能输入英文字符、数字和下划线！');` |
| L110 | 代码注释 | `// 不校验` |
| L117 | 表单/选项标签 (Label) | `{ name: 'name', label: '名称', xtype: 'NGInput', required: true, maxLength: 50 },` |
| L120 | 表单/选项标签 (Label) | `label: '单据类型',` |
| L133 | 表单/选项标签 (Label) | `label: '类型',` |
| L139 | 表单/选项标签 (Label) | `{ value: 0, label: '用户' },` |
| L140 | 表单/选项标签 (Label) | `{ value: 1, label: '用户_APP展示' }` |
| L145 | 表单/选项标签 (Label) | `label: '默认模板',` |
| L153 | 表单/选项标签 (Label) | `label: '直接预览',` |
| L159 | 表单/选项标签 (Label) | `{ name: 'previewEditStatus', label: '预览时支持隐藏行列', xtype: 'Switch' },` |
| L161 | 表单/选项标签 (Label) | `label: '导出权限',` |
| L166 | 表单/选项标签 (Label) | `{ value: 0, label: '不控制' },` |
| L167 | 表单/选项标签 (Label) | `{ value: 1, label: '只允许导出PDF' },` |
| L168 | 表单/选项标签 (Label) | `{ value: 2, label: '不允许导出' }` |
| L175 | 表单/选项标签 (Label) | `label: '使用范围',` |
| L183 | 表单/选项标签 (Label) | `label: '导出文件名称',` |
| L191 | 表单/选项标签 (Label) | `label: '共享策略',` |
| L196 | 代码注释 | `// 编辑时不可修改` |
| L197 | 代码注释 | `// 新增时根据用户组织判断下拉项` |
| L211 | 表单/选项标签 (Label) | `label: '所属组织',` |
| L223 | 表单/选项标签 (Label) | `label: '所属单元',` |
| L234 | 表单/选项标签 (Label) | `label: '创建人',` |
| L238 | 表单/选项标签 (Label) | `{ name: 'ngInsertDt', label: '创建日期', xtype: 'NGInput', disabled: true },` |
| L239 | 表单/选项标签 (Label) | `{ name: 'remark', label: '备注', xtype: 'NGTextArea', colspan: 2, maxLength: 200, rows: 3 }` |

#### 📄 `list/store/index.ts` (9 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L17 | UI文本/代码常量 (Text/Constant) | `text: '添加',` |
| L28 | 代码注释 | `// 列表基础配置` |
| L30 | 标题/列头 (Title) | `title: '序号'` |
| L48 | UI文本/代码常量 (Text/Constant) | `NG.message('打印模板未进行设计，不允许启用', 'error');` |
| L72 | UI文本/代码常量 (Text/Constant) | `AppTitle: '打印模板查看',` |
| L90 | UI文本/代码常量 (Text/Constant) | `disabledKeys: [], // 禁用的按钮` |
| L96 | UI文本/代码常量 (Text/Constant) | `text: '取消',` |
| L103 | UI文本/代码常量 (Text/Constant) | `text: '确定',` |
| L124 | 代码注释 | `// 关闭时清空copyId` |


### 2. 设计器模块 (design)

> 报表设计器主界面、顶部工具栏、数据集面板、数据过滤条件配置、工作流历史流转设置

#### 📄 `design/components/dataFilter/constants.ts` (19 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L4 | UI文本/代码常量 (Text/Constant) | `eq: '等于',` |
| L5 | UI文本/代码常量 (Text/Constant) | `notEq: '不等于',` |
| L6 | UI文本/代码常量 (Text/Constant) | `gt: '大于',` |
| L7 | UI文本/代码常量 (Text/Constant) | `ge: '大于等于',` |
| L8 | UI文本/代码常量 (Text/Constant) | `lt: '小于',` |
| L9 | UI文本/代码常量 (Text/Constant) | `le: '小于等于',` |
| L10 | UI文本/代码常量 (Text/Constant) | `in: '属于',` |
| L11 | UI文本/代码常量 (Text/Constant) | `between: '区间'` |
| L14 | 代码注释 | `// 类型下拉选项` |
| L16 | 表单/选项标签 (Label) | `{ label: '常量', value: 0 },` |
| L17 | 表单/选项标签 (Label) | `{ label: '字段', value: 1 }` |
| L22 | 表单/选项标签 (Label) | `label: '等于',` |
| L27 | 表单/选项标签 (Label) | `label: '不等于',` |
| L32 | 表单/选项标签 (Label) | `label: '大于',` |
| L37 | 表单/选项标签 (Label) | `label: '大于等于',` |
| L42 | 表单/选项标签 (Label) | `label: '小于',` |
| L47 | 表单/选项标签 (Label) | `label: '小于等于',` |
| L52 | 表单/选项标签 (Label) | `label: '属于',` |
| L57 | 表单/选项标签 (Label) | `label: '区间',` |

#### 📄 `design/components/dataFilter/index.tsx` (11 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L15 | 标题/列头 (Title) | `title: '全局数据过滤',` |
| L22 | 弹窗/提示消息 (Alert/Modal) | `message.warn('请完善数据过滤配置');` |
| L39 | 弹窗/提示消息 (Alert/Modal) | `message.warn('请先选择自定义数据集');` |
| L54 | 标题/列头 (Title) | `title: '参数',` |
| L68 | UI文本/代码常量 (Text/Constant) | `value: item.dataSetId + '^' + i.paramName + '^' + i.paramKey + '^' + index, // 为了保持数据唯一只能加index` |
| L85 | 标题/列头 (Title) | `title: '判断符',` |
| L108 | UI文本/代码常量 (Text/Constant) | `return String(row.paramType ?? '') === '1' ? true : row.operator ? true : '判断符不可为空';` |
| L113 | 标题/列头 (Title) | `title: '类型',` |
| L132 | 标题/列头 (Title) | `title: '值',` |
| L141 | 代码注释 | `// 字段` |
| L159 | 代码注释 | `// 常量` |

#### 📄 `design/components/dataFilter/types.ts` (5 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L1 | 代码注释 | `// 服务端存储数据类型` |
| L8 | 代码注释 | `// 0:常量,1:字段` |
| L15 | 代码注释 | `// 表格数据类型` |
| L23 | 代码注释 | `// 0:常量,1:字段` |
| L32 | 代码注释 | `// 值下拉二级树类型` |

#### 📄 `design/components/dataFilter/utils.tsx` (11 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L15 | 代码注释 | `// 文本` |
| L20 | 代码注释 | `// 数值` |
| L33 | 代码注释 | `// 日期` |
| L37 | 代码注释 | `// 需要设置为 undefined，否则控件会显示 invalid date` |
| L43 | 代码注释 | `// value 在不同场景下的数据格式不一样` |
| L47 | 代码注释 | `// v 为 null 时清空` |
| L83 | 代码注释 | `// 格式化参数` |
| L88 | 代码注释 | `// 格式化` |
| L90 | 代码注释 | `// 加载时` |
| L109 | 代码注释 | `// 保存时` |
| L112 | 代码注释 | `// valueType 为 0 是为常量，不处理 value` |

#### 📄 `design/components/leftDataSetList/index.tsx` (21 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L40 | 代码注释 | `// 折叠/展开` |
| L42 | 代码注释 | `// 默认数据集` |
| L44 | 代码注释 | `// 自定义数据集` |
| L46 | 代码注释 | `// 整体数据集` |
| L62 | 代码注释 | `// 更新当前数据集列` |
| L68 | 代码注释 | `// 更新当前数据集时,展开` |
| L76 | 代码注释 | `// 删除当前数据集列` |
| L83 | 代码注释 | `// 获取数据集` |
| L87 | 代码注释 | `// 有值时不需要缓存` |
| L95 | 代码注释 | `// 获取自定义数据集` |
| L103 | 代码注释 | `// 获取默认数据集` |
| L114 | 代码注释 | `// 修改自定义数据集` |
| L142 | 输入框占位符 (Placeholder) | `placeholder="请输入名称"` |
| L165 | UI文本/代码常量 (Text/Constant) | `title={!collapsed ? '数据集' : <TitleToolbar collapsed={collapsed} listRef={listRef} />}` |
| L176 | 标题/列头 (Title) | `title: '添加数据集',` |
| L181 | UI文本/代码常量 (Text/Constant) | `if (!isOk) return true; // 若取消则直接关闭` |
| L185 | 代码注释 | `// 展开最后一个` |
| L191 | 弹窗/提示消息 (Alert/Modal) | `message.warning('请选择数据集');` |
| L200 | UI文本/代码常量 (Text/Constant) | `<Tooltip title="添加数据集">` |
| L202 | 代码注释 | `// 查看时隐藏` |
| L211 | UI文本/代码常量 (Text/Constant) | `<Tooltip title={collapsed ? '展开' : '收起'}>` |

#### 📄 `design/components/topHeaderTitle/index.tsx` (9 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L76 | 代码注释 | `// 预览或保存时，先将当前sheet数据存储，然后再根据sheets的key值，找到存储的数据` |
| L80 | 代码注释 | `// 更新 sheetProperty` |
| L86 | 代码注释 | `// 更新 sheetPrintSetting` |
| L126 | 标题/列头 (Title) | `title: '导出',` |
| L136 | 表单/选项标签 (Label) | `{ label: 'EXCEL文件', value: 'excel' },` |
| L137 | 表单/选项标签 (Label) | `{ label: 'Json文件', value: 'json' }` |
| L163 | 代码注释 | `// 订阅发布的 hotInstance` |
| L172 | 代码注释 | `// 查看状态时` |
| L174 | 代码注释 | `// 正常情况` |

#### 📄 `design/components/topHeaderTitle/utils.ts` (6 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L5 | UI文本/代码常量 (Text/Constant) | `const showTitle = printName \|\| '打印模板预览';` |
| L7 | 代码注释 | `// 发布订阅发布 savedPayload 到预览页面` |
| L11 | UI文本/代码常量 (Text/Constant) | `AppTitle: '打印模板预览',` |
| L25 | 弹窗/提示消息 (Alert/Modal) | `await NG.alert('保存成功');` |
| L27 | 代码注释 | `//   await NG.alert(\`打印许可数即将到达上限，目前剩余【${Data.remainSheetCount}】张\`);` |
| L32 | 弹窗/提示消息 (Alert/Modal) | `NG.alert('保存失败: ' + Msg);` |

#### 📄 `design/components/workflowSetting/index.tsx` (12 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L14 | 标题/列头 (Title) | `title: '流转历史设置',` |
| L21 | 表单/选项标签 (Label) | `{ label: '最新一次审批（包含未结束/终止的审批）', value: 0 },` |
| L22 | 表单/选项标签 (Label) | `{ label: '最新一次正常结束的审批', value: 1 },` |
| L23 | 表单/选项标签 (Label) | `{ label: '所有正常结束审批', value: 2 },` |
| L24 | 表单/选项标签 (Label) | `{ label: '所有审批(包含未结束/终止的审批)', value: 3 }` |
| L28 | 表单/选项标签 (Label) | `{ label: '所有审批记录', value: 0 },` |
| L29 | 表单/选项标签 (Label) | `{ label: '所有动作是提交的审批记录', value: 1 },` |
| L30 | 表单/选项标签 (Label) | `{ label: '仅最后一次动作是提交的审批记录', value: 2 }` |
| L40 | 表单/选项标签 (Label) | `label: '审批流范围',` |
| L50 | 表单/选项标签 (Label) | `label: '审批记录范围',` |
| L60 | 表单/选项标签 (Label) | `label: '打印发起人节点',` |
| L80 | 代码注释 | `// 订阅 modal` |

#### 📄 `design/normalizeDataSetFields.ts` (3 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L7 | UI文本/代码常量 (Text/Constant) | `.replace(/（内置）$/, '')` |
| L8 | UI文本/代码常量 (Text/Constant) | `.replace(/\(内置\)$/, '');` |
| L11 | UI文本/代码常量 (Text/Constant) | `const EXCLUDED_BUILT_IN_DATA_SETS = new Set(['流转历史', '流程确认事项']);` |

#### 📄 `design/service.ts` (1 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L58 | UI文本/代码常量 (Text/Constant) | `if (!filename) return [NG.message('导出错误')];` |

#### 📄 `design/store/headerToolbar.tsx` (7 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L12 | UI文本/代码常量 (Text/Constant) | `text: '导入导出',` |
| L16 | UI文本/代码常量 (Text/Constant) | `text: '打印导入'` |
| L20 | UI文本/代码常量 (Text/Constant) | `text: '打印导出'` |
| L26 | UI文本/代码常量 (Text/Constant) | `text: '全局数据过滤'` |
| L30 | UI文本/代码常量 (Text/Constant) | `text: '流转历史设置'` |
| L34 | UI文本/代码常量 (Text/Constant) | `text: '预览'` |
| L36 | UI文本/代码常量 (Text/Constant) | `{ id: 'print_save', text: '保存', type: 'primary' }` |

#### 📄 `design/store/index.ts` (8 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L21 | 代码注释 | `// 报表加载状态` |
| L36 | 代码注释 | `// 列表基础配置` |
| L38 | 标题/列头 (Title) | `title: '序号'` |
| L49 | 标题/列头 (Title) | `title: '类型',` |
| L52 | 按钮/标签/渲染文本 (Action/Tag) | `render: ({ value }) => (value ? '复杂' : '普通')` |
| L55 | 标题/列头 (Title) | `title: '编号',` |
| L60 | 标题/列头 (Title) | `title: '名称',` |
| L68 | UI文本/代码常量 (Text/Constant) | `e.status = 1; // 过滤未启用数据集` |


### 3. 预览模块 (preview)

> 打印预览界面、顶部操作栏（打印、导出、分页等）、预览参数适配及PDF/Excel导出逻辑

#### 📄 `preview/export.ts` (1 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L8 | 弹窗/提示消息 (Alert/Modal) | `NG.alert('导出失败');` |

#### 📄 `preview/index.tsx` (29 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L95 | 弹窗/提示消息 (Alert/Modal) | `message.error('打印数据未加载完成，请稍后重试');` |
| L99 | 弹窗/提示消息 (Alert/Modal) | `message.error('表格实例未就绪，请稍后重试');` |
| L113 | 弹窗/提示消息 (Alert/Modal) | `message.error('打印失败');` |
| L140 | UI文本/代码常量 (Text/Constant) | `URL.revokeObjectURL(iframeP.src); // 释放 Blob URL` |
| L143 | 代码注释 | `// 打印模板请求` |
| L152 | 代码注释 | `// 设计预览：直接用内存中的 printSchema 构建「字段 -> 列号」映射` |
| L160 | 代码注释 | `// 预加载「字段 -> 列号」映射，供链接传参「字段」类型运行时取值` |
| L165 | 代码注释 | `// 获取设计态发布的 schema， 初始化 queryInfo` |
| L173 | 代码注释 | `* 更新打印模板数据` |
| L190 | 代码注释 | `// 将 printSetting 转成数组` |
| L197 | 弹窗/提示消息 (Alert/Modal) | `message.error(printId ? Msg : '预览失败: ' + Msg);` |
| L202 | 代码注释 | `* 页面组件挂载时：` |
| L203 | 代码注释 | `* 1、订阅发布的 hotInstance` |
| L204 | 代码注释 | `* 2、处理不同状态：` |
| L205 | 代码注释 | `*  2.1、预览时（无printId）： 设计页面跳转时，获取发布的预览 schema` |
| L206 | 代码注释 | `*  2.2、运行时（有printId）： 菜单或者链接跳转时， url中的 可能有 linkParams` |
| L207 | 代码注释 | `* 3、监听 defaultSheet 的变化， 获取打印模板数据：` |
| L208 | 代码注释 | `* 4、存到 store` |
| L209 | 代码注释 | `* 5、渲染打印模板（在 tableSheet 组件中处理）` |
| L211 | 代码注释 | `// 处理初始状态` |
| L220 | 代码注释 | `// 设置 默认选中的sheet页， 有printId 时，获取打印模板数据` |
| L227 | 代码注释 | `// 订阅预览打印模板数据` |
| L231 | 代码注释 | `// 监听 defaultSheet 的变化， 获取打印模板数据` |
| L239 | 代码注释 | `// 缓存字体文件到 indexDB` |
| L244 | 代码注释 | `// 直接预览` |
| L251 | 代码注释 | `// 渲染 header, 配置按钮禁用状态` |
| L253 | 代码注释 | `// 0 - 不控制` |
| L254 | 代码注释 | `// 2 - 不允许导出` |
| L255 | 代码注释 | `// 1 - 只允许导出pdf` |

#### 📄 `preview/service.ts` (4 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L17 | 弹窗/提示消息 (Alert/Modal) | `message.error('接口无返回');` |
| L21 | 代码注释 | `// 兼容接口返回 Data 或 data，且保证为数组` |
| L26 | 代码注释 | `// 将可能包含多段的 Data 合并成一段，方便按照原有逻辑渲染` |
| L32 | 代码注释 | `// 兼容 Code 为数字 200 或字符串 "200"` |

#### 📄 `preview/store/headerToolbar.tsx` (6 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L10 | UI文本/代码常量 (Text/Constant) | `{ id: 'start_print', text: '打印', type: 'primary' },` |
| L11 | UI文本/代码常量 (Text/Constant) | `{ id: 'print_setting', text: '打印设置' },` |
| L14 | UI文本/代码常量 (Text/Constant) | `text: '导出',` |
| L18 | UI文本/代码常量 (Text/Constant) | `text: '导出EXCEL'` |
| L22 | UI文本/代码常量 (Text/Constant) | `text: '导出PDF'` |
| L26 | UI文本/代码常量 (Text/Constant) | `{ id: 'cancel', text: '关闭' }` |

#### 📄 `preview/utils.ts` (8 处)

| 行号 | 类型 | 代码行 / 中文内容 |
| :--- | :--- | :--- |
| L2 | 代码注释 | `* 按照“纵向拼接”的规则，将 Data 数组中的多个对象合并成一个：` |
| L3 | 代码注释 | `* - 除 cells、globalSettings 外，其它字段沿用第一个对象` |
| L4 | 代码注释 | `* - cells：后面的块按顺序在行方向上追加（row 加偏移量，col 不变）` |
| L6 | 代码注释 | `*   - rowCount 为各块高度之和` |
| L7 | 代码注释 | `*   - mergeCells、hiddenRows 的 row 同样按块高度做偏移` |
| L8 | 代码注释 | `*   - hiddenColumns 按所有块取并集` |
| L17 | 代码注释 | `// 1. 合并 cells` |
| L53 | 代码注释 | `// 2. 合并 globalSettings（主要是 rowCount 和 mergeCells 的行偏移）` |

---

## 四、代码注释中文归纳

代码中包含的开发者中文注释（可用于维护或架构理解）：

| 所在文件 | 行号 | 开发者注释内容 |
| :--- | :--- | :--- |
| `design/components/dataFilter/constants.ts` | L14 | 类型下拉选项 |
| `design/components/dataFilter/index.tsx` | L141 | 字段 |
| `design/components/dataFilter/index.tsx` | L159 | 常量 |
| `design/components/dataFilter/types.ts` | L1 | 服务端存储数据类型 |
| `design/components/dataFilter/types.ts` | L8 | 0:常量,1:字段 |
| `design/components/dataFilter/types.ts` | L15 | 表格数据类型 |
| `design/components/dataFilter/types.ts` | L23 | 0:常量,1:字段 |
| `design/components/dataFilter/types.ts` | L32 | 值下拉二级树类型 |
| `design/components/dataFilter/utils.tsx` | L15 | 文本 |
| `design/components/dataFilter/utils.tsx` | L20 | 数值 |
| `design/components/dataFilter/utils.tsx` | L33 | 日期 |
| `design/components/dataFilter/utils.tsx` | L37 | 需要设置为 undefined，否则控件会显示 invalid date |
| `design/components/dataFilter/utils.tsx` | L43 | value 在不同场景下的数据格式不一样 |
| `design/components/dataFilter/utils.tsx` | L47 | v 为 null 时清空 |
| `design/components/dataFilter/utils.tsx` | L83 | 格式化参数 |
| `design/components/dataFilter/utils.tsx` | L88 | 格式化 |
| `design/components/dataFilter/utils.tsx` | L90 | 加载时 |
| `design/components/dataFilter/utils.tsx` | L109 | 保存时 |
| `design/components/dataFilter/utils.tsx` | L112 | valueType 为 0 是为常量，不处理 value |
| `design/components/leftDataSetList/index.tsx` | L40 | 折叠/展开 |
| `design/components/leftDataSetList/index.tsx` | L42 | 默认数据集 |
| `design/components/leftDataSetList/index.tsx` | L44 | 自定义数据集 |
| `design/components/leftDataSetList/index.tsx` | L46 | 整体数据集 |
| `design/components/leftDataSetList/index.tsx` | L62 | 更新当前数据集列 |
| `design/components/leftDataSetList/index.tsx` | L68 | 更新当前数据集时,展开 |
| `design/components/leftDataSetList/index.tsx` | L76 | 删除当前数据集列 |
| `design/components/leftDataSetList/index.tsx` | L83 | 获取数据集 |
| `design/components/leftDataSetList/index.tsx` | L87 | 有值时不需要缓存 |
| `design/components/leftDataSetList/index.tsx` | L95 | 获取自定义数据集 |
| `design/components/leftDataSetList/index.tsx` | L103 | 获取默认数据集 |
| `design/components/leftDataSetList/index.tsx` | L114 | 修改自定义数据集 |
| `design/components/leftDataSetList/index.tsx` | L185 | 展开最后一个 |
| `design/components/leftDataSetList/index.tsx` | L202 | 查看时隐藏 |
| `design/components/topHeaderTitle/index.tsx` | L76 | 预览或保存时，先将当前sheet数据存储，然后再根据sheets的key值，找到存储的数据 |
| `design/components/topHeaderTitle/index.tsx` | L80 | 更新 sheetProperty |
| `design/components/topHeaderTitle/index.tsx` | L86 | 更新 sheetPrintSetting |
| `design/components/topHeaderTitle/index.tsx` | L163 | 订阅发布的 hotInstance |
| `design/components/topHeaderTitle/index.tsx` | L172 | 查看状态时 |
| `design/components/topHeaderTitle/index.tsx` | L174 | 正常情况 |
| `design/components/topHeaderTitle/utils.ts` | L7 | 发布订阅发布 savedPayload 到预览页面 |
| `design/components/topHeaderTitle/utils.ts` | L27 | await NG.alert(`打印许可数即将到达上限，目前剩余【${Data.remainSheetCount}】张`); |
| `design/components/workflowSetting/index.tsx` | L80 | 订阅 modal |
| `design/store/index.ts` | L21 | 报表加载状态 |
| `design/store/index.ts` | L36 | 列表基础配置 |
| `list/components/columnOptions.tsx` | L9 | 内置模版 设计、修改、删除按钮置灰 |
| `list/components/columnOptions.tsx` | L11 | 当前登录组织与模板所属组织不一致时 设计、修改、删除按钮置灰 |
| `list/components/printExportName/index.tsx` | L80 | 获取下拉选项 |
| `list/components/printUseScope/index.tsx` | L71 | 获取下拉选项 |
| `list/components/printUseScope/index.tsx` | L80 | id 是一级树的id |
| `list/components/printUseScope/index.tsx` | L83 | 一级树不可选 |
| `list/components/printUseScope/index.tsx` | L93 | 根据请求的下拉选项，为表格数据添加辅助信息 |
| `list/components/printUseScope/index.tsx` | L97 | 更新 |
| `list/components/printUseScope/index.tsx` | L101 | 监听表格数据变化，更新下拉选项 |
| `list/components/printUseScope/index.tsx` | L136 | 搜索支持label |
| `list/components/printUseScope/utils.tsx` | L6 | 加载到table时根据selectOptions获取表格数据详细信息 |
| `list/components/printUseScope/utils.tsx` | L22 | 补充字段信息 helpId dataSource |
| `list/components/printUseScope/utils.tsx` | L28 | 处理value |
| `list/components/printUseScope/utils.tsx` | L30 | 多选时的值结构 |
| `list/components/printUseScope/utils.tsx` | L39 | 保存时格式化表格数据 |
| `list/components/printUseScope/utils.tsx` | L45 | 处理value |
| `list/components/printUseScope/utils.tsx` | L47 | 多选时的值结构 |
| `list/components/printUseScope/utils.tsx` | L62 | 获取字段类型 |
| `list/components/printUseScope/utils.tsx` | L106 | 文本 |
| `list/components/printUseScope/utils.tsx` | L111 | 数值 |
| `list/components/printUseScope/utils.tsx` | L122 | 日期 |
| `list/components/printUseScope/utils.tsx` | L126 | 需要设置为 undefined，否则控件会显示 invalid date |
| `list/components/printUseScope/utils.tsx` | L132 | value 在不同场景下的数据格式不一样 |
| `list/components/printUseScope/utils.tsx` | L136 | v 为 null 时清空 |
| `list/components/printUseScope/utils.tsx` | L148 | 下拉 |
| `list/components/printUseScope/utils.tsx` | L157 | value 取第一位 |
| `list/components/printUseScope/utils.tsx` | L161 | 通用帮助 |
| `list/components/printUseScope/utils.tsx` | L163 | 系统参数-当前登录人 |
| `list/components/printUseScope/utils.tsx` | L171 | 系统参数-当前登录组织 |
| `list/components/printUseScope/utils.tsx` | L178 | 属于时返回多选通用帮助 |
| `list/components/printUseScope/utils.tsx` | L189 | 多选通用帮助 |
| `list/components/tableDrawer.tsx` | L34 | 注册自定义xtype |
| `list/components/tableDrawer.tsx` | L42 | 取消关闭 |
| `list/components/tableDrawer.tsx` | L49 | 延迟执行 |
| `list/components/tableDrawer.tsx` | L63 | 保存 |
| `list/components/tableDrawer.tsx` | L81 | 如果是全部，使用范围配置为空 |
| `list/components/tableDrawer.tsx` | L109 | 复制时保存复制的phId |
| `list/components/tableDrawer.tsx` | L129 | 组件加载时 获取表单值 |
| `list/components/tableDrawer.tsx` | L138 | 新增时 |
| `list/components/tableDrawer.tsx` | L155 | 复制 |
| `list/components/tableDrawer.tsx` | L178 | 编辑时 根据id获取表单值 |
| `list/components/tableDrawer.tsx` | L203 | 确保每次打开时都重新请求 分类树数据 |
| `list/components/tableDrawer.tsx` | L207 | 重置标题 |
| `list/components/tableDrawer.tsx` | L215 | formDisabled改变，隐藏表单按钮 |
| `list/components/tableDrawer.tsx` | L242 | toolbar点击事件 |
| `list/service.ts` | L6 | 使用范围字段 |
| `list/service.ts` | L14 | 单据打印类型列表 |
| `list/service.ts` | L22 | IUP作为子应用发布成i8时，返回的单据打印类型列表为空，需要根据selectedCode手动生成 |
| `list/service.ts` | L31 | 打印列表 |
| `list/service.ts` | L39 | 停用 |
| `list/service.ts` | L46 | 启用 |
| `list/service.ts` | L53 | 是否存在打印模板设计 |
| `list/service.ts` | L60 | 删除 |
| `list/store/formCfg.ts` | L8 | 集团组织 |
| `list/store/formCfg.ts` | L11 | 单元组织 |
| `list/store/formCfg.ts` | L14 | 普通组织 |
| `list/store/formCfg.ts` | L70 | 单元Id |
| `list/store/formCfg.ts` | L73 | 共享策略 |
| `list/store/formCfg.ts` | L76 | 模板类型 |
| `list/store/formCfg.ts` | L110 | 不校验 |
| `list/store/formCfg.ts` | L196 | 编辑时不可修改 |
| `list/store/formCfg.ts` | L197 | 新增时根据用户组织判断下拉项 |
| `list/store/index.ts` | L28 | 列表基础配置 |
| `list/store/index.ts` | L124 | 关闭时清空copyId |
| `preview/index.tsx` | L143 | 打印模板请求 |
| `preview/index.tsx` | L152 | 设计预览：直接用内存中的 printSchema 构建「字段 -> 列号」映射 |
| `preview/index.tsx` | L160 | 预加载「字段 -> 列号」映射，供链接传参「字段」类型运行时取值 |
| `preview/index.tsx` | L165 | 获取设计态发布的 schema， 初始化 queryInfo |
| `preview/index.tsx` | L173 | 更新打印模板数据 |
| `preview/index.tsx` | L190 | 将 printSetting 转成数组 |
| `preview/index.tsx` | L202 | 页面组件挂载时： |
| `preview/index.tsx` | L203 | 1、订阅发布的 hotInstance |
| `preview/index.tsx` | L204 | 2、处理不同状态： |
| `preview/index.tsx` | L205 | 2.1、预览时（无printId）： 设计页面跳转时，获取发布的预览 schema |
| `preview/index.tsx` | L206 | 2.2、运行时（有printId）： 菜单或者链接跳转时， url中的 可能有 linkParams |
| `preview/index.tsx` | L207 | 3、监听 defaultSheet 的变化， 获取打印模板数据： |
| `preview/index.tsx` | L208 | 4、存到 store |
| `preview/index.tsx` | L209 | 5、渲染打印模板（在 tableSheet 组件中处理） |
| `preview/index.tsx` | L211 | 处理初始状态 |
| `preview/index.tsx` | L220 | 设置 默认选中的sheet页， 有printId 时，获取打印模板数据 |
| `preview/index.tsx` | L227 | 订阅预览打印模板数据 |
| `preview/index.tsx` | L231 | 监听 defaultSheet 的变化， 获取打印模板数据 |
| `preview/index.tsx` | L239 | 缓存字体文件到 indexDB |
| `preview/index.tsx` | L244 | 直接预览 |
| `preview/index.tsx` | L251 | 渲染 header, 配置按钮禁用状态 |
| `preview/index.tsx` | L253 | 0 - 不控制 |
| `preview/index.tsx` | L254 | 2 - 不允许导出 |
| `preview/index.tsx` | L255 | 1 - 只允许导出pdf |
| `preview/service.ts` | L21 | 兼容接口返回 Data 或 data，且保证为数组 |
| `preview/service.ts` | L26 | 将可能包含多段的 Data 合并成一段，方便按照原有逻辑渲染 |
| `preview/service.ts` | L32 | 兼容 Code 为数字 200 或字符串 "200" |
| `preview/utils.ts` | L2 | 按照“纵向拼接”的规则，将 Data 数组中的多个对象合并成一个： |
| `preview/utils.ts` | L3 | - 除 cells、globalSettings 外，其它字段沿用第一个对象 |
| `preview/utils.ts` | L4 | - cells：后面的块按顺序在行方向上追加（row 加偏移量，col 不变） |
| `preview/utils.ts` | L6 | - rowCount 为各块高度之和 |
| `preview/utils.ts` | L7 | - mergeCells、hiddenRows 的 row 同样按块高度做偏移 |
| `preview/utils.ts` | L8 | - hiddenColumns 按所有块取并集 |
| `preview/utils.ts` | L17 | 1. 合并 cells |
| `preview/utils.ts` | L53 | 2. 合并 globalSettings（主要是 rowCount 和 mergeCells 的行偏移） |

---
*文档由 AI 自动扫描与结构化提取生成于 2026-08-31。*
