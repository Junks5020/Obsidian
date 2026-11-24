---
tags:
  - ng-design
  - attachment
date: 2026-11-19
updated: 2026-11-19
---

# ng-design `openAttachment` 接入调研

基线：`ng-design` / `jinxu/ljx-7.0` / `dea8652a90415118ccd2d0535f7a6fcec51e4967`（工作区 `@newgrand/udp-ui` 版本 `7.0.78`）。仅核对仓库文档、源码、调用方，未调用真实环境。下文 `attachment/` 路径相对于 `packages/@newgrand/udp-ui/src/businessComponent/`。

## 1. 打开可上传、可删除的弹窗

- 已有普通单据可传 `status: 'edit'`，不要设 `disabled: true`。保留工具栏和操作列（`viewOptions.showToolbar` / `showOperateColumn` 默认均为 `true`）；仓库文档的演示把两者设成了 `false`，不适合照搬作编辑入口。`status` 用于初始化，不是授权开关。当前实现有 URL `staus`（源码拼法）或 `otype` 时优先取 URL 值；`disabled` 对普通单据是本地变更锁，列附件 `colAttach: 1` 不套用同一前端锁。来源：`docs/business/Attachment.md:26–45`、`attachment/NGTableAttachment.tsx:133–172,194–226,1026–1064`、`attachment/api/baseApi.tsx:105–150`。
- 没有公开参数能跳过权限。组件使用 `POST /JFileSrv/reactAttach/tableAttachInit` 返回的当前分类/类型权限块。上传需要 `add=1`，存在分类树时要先选具体类型；删除既有附件通常需要该记录分类/类型的 `delete=1`。`0` 禁用、`2` 隐藏，缺权限块时不放行。删除时还有两条独立规则：服务端设置 `ownerModify=1` 时允许本人记录原为 `0` 的删除，不放开 `2`；本次会话内经授权新引入且未提交的附件可以按规则撤销。来源：`attachment/service.ts:60–75`、`attachment/permission.ts:263–305,379–394,454–488,555–582,622–655`、`attachment/api/baseApi.tsx:327–368`。
- `control` 只决定确认时何时提交附件会话；旧 `btn`、`permission` 不再参与运行时授权。若接入业务使用 `customButtonRights`，例如 `{ add: 1, delete: 1 }`，它只是透传给 `tableAttachInit` 的请求参数，不保证放行；缺权限应核对业务/后端授权配置和实际响应。来源：`attachment/interface.ts:449–451,527–531,615–620,656–659`、`attachment/api/baseApi.tsx:126–150`、[[ng-design-附件术语表]]。

## 2. 点击确认立即保存，是否拿 `res` 当 key？

**不用业务方再调一次接口，也不把 `res` 当 key。** 需要弹窗确认即提交时，传 `control: false`。通过校验且有待提交变更后，弹窗内部调用 `handleSave`；无变更不发请求。默认 `control: true` 通常不在弹窗提交，当前分类为 `approvedAttach`（审批后附件）是例外。附件提交并不等于保存业务主单。来源：`attachment/api/open.tsx:46–94`、`attachment/api/baseApi.tsx:883–958`。

| 类型 | 弹窗调用的 POST 接口 | 提交内容 |
| --- | --- | --- |
| 普通单据附件（默认） | `/JFileSrv/reactAttach/save` | `{ asrSessionGuid, asrCode }` |
| 表单列附件（`colAttach: 1`） | `/JFileSrv/api/saveColAttach` | `[{ asrCode: asrSessionGuid || asrCode, asrTable: 'system' }]` |

来源：`attachment/api/baseApi.tsx:943–955`、`attachment/service.ts:193–206`、`packages/@newgrand/udp-core/src/util/request/index.ts:455–471`。

`res` 是弹窗关闭时返回的对象：`res.closeStatus` 区分 `ok` / `cancel`，`res.asrSessionGuid` 是附件会话标识，`res.attachmentRecordList` / `res.getCount()` 可用于页面回显。`asrCode` 是业务单据主键，不是会话标识。当前实现没有检查 `handleSave` 返回的 `false`，所以 `closeStatus === 'ok'` 仅代表点击确认并关闭，**不能当作保存成功**。如需确认实际请求成功，用传入的 `onSave`（后端业务码为 `200` 时调用；没发请求时不会调用）。来源：`attachment/api/open.tsx:37–43,59–94,133–137`、`attachment/NGTableAttachment.tsx:804–816`、`attachment/api/baseApi.tsx:250–268,930–958`。

## 3. 文件数量上限

省略 `maxCount` 或传 `0`，不设组件本地上传数量上限。设为正整数 N 时，用「当前附件列表数量 + 本批选择数量」比较 N，超出会拒绝该批上传。类型注释提及其他非正整数，但实现用真值判断，因此不要传 `-1` 表示不限。这个检查不是服务端配额，也不能推定跨入口全局生效；后端数量/配额未核实，单文件大小、格式等限制仍可能生效。来源：`attachment/interface.ts:596–600`、`attachment/NGTableAttachment.tsx:107,1043–1053`、`attachment/components/Toolbar.tsx:359–405`、`attachment/components/Upload.tsx:201–271,330–339`。

## 4. 参数示例

已有业务单据，点确认立即提交附件：

```ts
import { openAttachment } from '@newgrand/udp-ui';

const res = await openAttachment({
  asrTable: billTable,               // 实际业务表名
  asrCode: billPhid,                 // 业务单据主键（字符串）
  busTypeCode: billTypeCode,         // 业务类型编码
  asrSessionGuid: pageAttachmentGuid || undefined,
  status: 'edit',
  control: false,
  maxCount: 0,                       // 前端不设数量限制
  onSave: () => { /* 本次附件保存请求成功 */ },
});
if (res.closeStatus === 'ok') {
  pageAttachmentGuid = res.asrSessionGuid;
  // res.getCount() 可用于更新页面数量；此处不是保存成功回调。
}
```

`asrTable`、`asrCode` 是公开类型必传项；`busTypeCode` 缺省可取宿主页面业务类型。普通单据首次可以省略 `asrSessionGuid` 让组件分配，不能用空字符串触发前端 `??` 默认生成；同一页面再次打开时可复用会话。上传人、组织、账套默认取登录上下文。来源：`attachment/interface.ts:395–447`、`attachment/NGTableAttachment.tsx:138–172`、`attachment/api/baseApi.tsx:117–122`。

未落库的新单通常显式用 `status: 'add', control: true`，按本业务约定填 `asrCode`（没有主键时，是否允许空串须确认业务后端支持）。接收 `asrSessionGuid` 后写入业务约定的字段，随主单保存链关联或提交，不把返回对象整体作为 key。标准单据按钮从 `keyField` 取业务主键、从 `codeField`（默认 `code`）取和回填会话，并更新附件标志；各业务主单保存协议以各自实现为准。来源：`attachment/interface.ts:395–447`、`attachment/api/open.tsx:46–65`、`packages/@newgrand/udp-ui/src/businessComponent/page/hooks/attachment.ts:11–72`。
