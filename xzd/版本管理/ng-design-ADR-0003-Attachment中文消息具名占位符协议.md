---
tags:
  - ng-design
  - attachment
  - i18n
  - ADR
status: accepted
implementation: pending
date: 2026-08-21
updated: 2026-08-21
decision: simple-v1-named-placeholders
---

# ng-design ADR-0003：Attachment 中文消息具名占位符协议

相关：[[00-版本总览]] · [[research/2026-08-21-ng-design-Attachment中文清单]] · [[ng-design-附件术语表]]

## 状态

决策已接受，代码尚未实施。

本 ADR 只确定后端消息存储协议、前端解析接口、回退策略和迁移边界。2026-08-21 曾开始试做，随后按要求完整回退；当前 `ng-design` 工作区不包含本方案的实现代码。

## 背景

`packages/@newgrand/udp-mobile-ui/src/component/Attachment` 当前有 63 条不重复的运行时中文候选，共 102 处。其中一部分是模板字符串，需要在运行时插入上传数量、文件大小、格式白名单和敏感词等变量。

仓库存在三种相邻能力，但没有可直接复用的通用消息插值器：

- `udp-core` 通过 `SUP/GetLanguageInfoByBusType` 加载页面语言字典，并使用 `core.getLang(key)` 查询静态字符串。
- `udp-core` 提供 `getLanguageMap({ identity })`，`OrgHelp` 已用它按组件标识加载语言资源。
- `QueryDropDown` 支持默认 `locale` 与调用方覆盖，但仅限静态字符串。

锁文件中的 `intl-messageformat` 和 `handlebars` 属于工具链的传递依赖，不是 `udp-mobile-ui` 的生产依赖契约。Attachment 当前动态文案只需要简单变量插入，尚未出现复数、日期、货币或条件分支需求。

## 决策

采用 `simple-v1` 具名占位符协议：后端保存普通文本模板，变量使用 `{{name}}`；前端使用固定语法的安全格式化器替换变量，不执行任何代码。

不直接修改或重载 `core.getLang(key, dv)`。仓库内不同 `getLang` 实现已经使用第二参数表达默认值，继续重载会造成接口语义冲突。新增独立的消息格式化接口，由 Attachment 消息模块封装加载、解析、缓存、回退和诊断。

## 后端契约

### 存储字段

后端语言资源至少保存以下信息：

| 字段 | 示例 | 说明 |
| --- | --- | --- |
| `identity` | `UDP_MOBILE_ATTACHMENT` | 组件语言资源标识 |
| `key` | `attachment.upload.maxCount` | 稳定消息键，不使用中文作为键 |
| `locale` | `zh-CN` | 语言和地区 |
| `format` | `simple-v1` | 模板协议版本 |
| `message` | `最大上传数 {{maxCount}}` | 原始模板文本 |
| `revision` | `42` | 发布修订号，用于缓存失效和审计 |

### 接口响应

优先复用现有组件语言接口：

```text
/SUP/Language/getLanguageMap?identity=UDP_MOBILE_ATTACHMENT
```

`simple-v1` 前端适配器接受当前扁平字典响应：

```json
{
  "attachment.upload.maxCount": "最大上传数 {{maxCount}}",
  "attachment.upload.doneCount": "已上传{{count}}文件",
  "attachment.upload.totalCount": "共{{count}}文件",
  "attachment.upload.maxSize": "文件大小不能超过 {{maxSize}}MB!"
}
```

如果后端以后增加 `locale`、`revision` 和 `messages` 外层结构，前端适配器可以同时兼容扁平字典和带元数据的响应，不改变组件调用接口。

## 模板语法

### 支持

- 占位符格式：`{{name}}`。
- 变量名格式：`[A-Za-z_][A-Za-z0-9_]*`。
- 参数值类型：`string | number | boolean`。
- 同一变量可以在模板中出现多次。
- 后端可以改变变量顺序，例如英文模板可以写成 `{{count}} files uploaded`。
- `0` 和 `false` 是合法值，不能按缺参处理。

### 不支持

- JavaScript 模板语法 `` `${name}` ``。
- 对象路径，如 `{{file.name}}`。
- 函数调用、条件表达式、循环和计算表达式。
- HTML、ReactNode 和富文本标签。
- `eval`、`new Function` 或任意动态代码执行。
- v1 不定义复数、日期、货币和条件分支；出现这些需求时通过新协议版本处理。

### 缺参与异常

- 参数不存在，或者值为 `null` / `undefined`，判定为缺参。
- 多余参数忽略。
- 后端模板缺参、格式非法或内容不是字符串时，整个消息回退到本地默认模板，不展示半截文案。
- 本地默认模板仍失败时返回稳定 message key，并上报诊断；不得中断上传、预览或删除流程。
- 诊断只记录 message key、缺失参数名、locale 和 revision，不记录文件名、敏感词或办理意见等实际参数值。

## 前端接口

建议对组件调用方只暴露一个同步格式化入口：

```ts
type AttachmentMessageArgs = {
  'attachment.upload.maxCount': { maxCount: number };
  'attachment.upload.doneCount': { count: number };
  'attachment.upload.totalCount': { count: number };
  'attachment.upload.allowedFormats': { formats: string };
  'attachment.upload.blockedFormats': { formats: string };
  'attachment.upload.maxSize': { maxSize: string | number };
  'attachment.upload.warnSize': { warnSize: string | number };
  'attachment.comment.sensitive': { words: string; suffix: string };
  'attachment.offline.defaultItem': { index: number };
};

interface AttachmentMessageFormatter {
  format<K extends keyof AttachmentMessageArgs>(
    key: K,
    values: AttachmentMessageArgs[K]
  ): string;
}
```

调用示例：

```ts
Toast.show(
  messages.format('attachment.upload.maxCount', { maxCount })
);

return {
  valid: false,
  message: messages.format('attachment.upload.maxSize', {
    maxSize: attachmentMaxSize
  })
};
```

静态消息使用同一 catalog，但不需要参数，例如 `attachment.action.cancel`、`attachment.preview.loadFailed`。

## 消息来源与回退

解析顺序固定为：

1. Attachment 调用方或 Provider 的局部覆盖。
2. `UDP_MOBILE_ATTACHMENT` 后端组件字典。
3. 页面级 `core.getLang(key)`，用于兼容已有业务语言资源。
4. 随 `udp-mobile-ui` 发布的本地默认中文 catalog。
5. 稳定 message key。

组件首次使用时加载一次远程字典并缓存。同一加载 Promise 应复用，避免多个 Attachment 并发请求。远程字典到达后通知已挂载组件刷新；接口失败继续使用本地默认值，不弹出额外错误提示。

## 安全规则

- 后端保存时校验模板长度、占位符名称、占位符数量和 message key 白名单。
- 前端仍将后端响应视为不可信数据，再执行一次格式和类型校验。
- 格式化器只做固定正则匹配和 `String(value)` 转换。
- 返回值只能进入普通 React 文本、Toast、Modal 或异常消息。
- 禁止把格式化结果传给 `dangerouslySetInnerHTML`。
- 建议限制单条模板不超过 2 KB、占位符不超过 20 个、最终输出不超过 8 KB。
- 同一个 `revision + locale + key + error` 只上报一次，避免渲染循环刷日志。

## 初始动态消息

| Message key | 默认模板 | 参数 |
| --- | --- | --- |
| `attachment.upload.maxCount` | `最大上传数 {{maxCount}}` | `maxCount` |
| `attachment.upload.doneCount` | `已上传{{count}}文件` | `count` |
| `attachment.upload.totalCount` | `共{{count}}文件` | `count` |
| `attachment.upload.allowedFormats` | `仅支持上传：{{formats}} 格式` | `formats` |
| `attachment.upload.blockedFormats` | `不支持上传：{{formats}} 格式` | `formats` |
| `attachment.upload.maxSize` | `文件大小不能超过 {{maxSize}}MB!` | `maxSize` |
| `attachment.upload.warnSize` | `文件大小已超过 {{warnSize}}MB, 是否继续上传!` | `warnSize` |
| `attachment.comment.sensitive` | `办理意见中包含敏感字:{{words}}{{suffix}},请修改后重新提交!` | `words`, `suffix` |
| `attachment.offline.defaultItem` | `离线数据{{index}}` | `index` |

静态用户可见文案也进入同一 catalog。注释、JSDoc、调试日志和业务协议常量不迁移。例如 `cfgAttach.name === '上传前修改时间'` 属于既有配置匹配条件，不能仅因为含中文就改成可翻译文案。

## 实施顺序

1. 根据 [[research/2026-08-21-ng-design-Attachment中文清单]] 冻结 message key 和本地默认 catalog。
2. 后端建立 `UDP_MOBILE_ATTACHMENT` 语言资源，先录入动态模板。
3. 实现纯函数模板解析器，并覆盖正常替换、重复变量、`0`、`false`、缺参、多余参数和非法模板测试。
4. 实现远程加载、Promise 去重、缓存、刷新通知和本地回退。
5. 先迁移动态模板字符串，再迁移静态用户可见文案。
6. 单独复核日志、异常文本、接口转换文本和业务协议常量，避免机械替换。
7. 重新执行中文扫描，确认剩余中文都属于明确保留项。

## 验收标准

- 后端字典未配置或请求失败时，Attachment 行为和当前中文显示一致。
- 后端可以调整模板语序，变量能够正确替换。
- 缺参和非法模板不会导致 React 渲染、上传、预览或删除流程抛错。
- 动态参数值不进入诊断日志。
- 同一页面多个 Attachment 只触发一次组件语言资源请求。
- 远程字典加载完成后，已挂载组件能够刷新文案。
- 组件独立使用、处于页面容器内、离线模式三种场景都有回退覆盖。
- 源码中不出现 `eval`、`new Function` 或后端 HTML 渲染。

## 备选方案

未选择 ICU MessageFormat：当前需求只涉及简单插值，引入正式运行时依赖和后台 ICU 校验成本偏高。当出现复数、日期、货币或条件选择需求时，可新增 `icu-v1`，不修改现有 `simple-v1` 数据。

未选择结构化消息 AST：它的类型和安全约束更强，但需要专门的后台编辑器与 schema 维护，超出当前 Attachment 文案规模。

## 影响

正面影响：协议简单、零模板执行风险、后端可调整语序、兼容现有语言接口、失败时能够保持当前中文行为。

负面影响：`simple-v1` 不处理复杂语言规则；前端类型只能约束本地调用，后端模板仍必须在发布时校验；组件字典加载和刷新机制需要新增实现与测试。
