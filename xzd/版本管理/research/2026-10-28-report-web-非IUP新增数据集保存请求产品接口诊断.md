---
tags:
  - report-web
  - diagnosis
  - iup
  - busi-product
status: awaiting-environment-evidence
date: 2026-10-28
updated: 2026-10-28
---

# 非 IUP 新增数据集保存请求产品接口诊断

相关：[[00-版本总览]] · [[report-web-术语表]] · [[变更记录/SYNC-20261023-001-report-iup-gate-to-ljx-7.0]]

## 问题与范围

用户报告：环境并非 IUP，但新增数据集点击保存会请求 `/reportcenter/dataSet/getBusiProductString`。

本轮只诊断，不修改业务代码、不提交、不推送、不部署，也未调用真实保存接口。检查仓库 `C:/Users/jinxu/workspace/xzd/report-web`，分支 `6.5.2`，HEAD `7b0eee20eb44bea74ee57cc0fa659cb1a47ed89b`。项目术语表已读，没有适用于 IUP 保存门禁的 ADR，既有约定见关联同步记录。

## 已证实的本地行为

1. 保存链路是 `FormFooterBar -> handleSave -> formSave/editDataSetDetail -> withBusiProduct -> saveDataSet`。
2. 旧版 `773efdda` 的 `withBusiProduct` 不检查环境，任何数据集保存都会先取产品列表以生成 `busiProduct` 默认值。仅隐藏表单字段不会绕过这一保存服务逻辑。
3. 修复提交 `4742f85dbb4ff4fa6d330c83075fed387f76ad0c` 已加入当前分支，在 `withBusiProduct` 开头执行 `if (!getEnv().isIUP) return payload;`。本地记录的 `origin/6.5.2` 也包含此提交，但这不证明现场发布包已更新。
4. 当前 `getEnv()` 判断来自 `udp.getUser()`：`product` 或 `loginProduct` 任意一个忽略大小写等于 `iup`，就视为 IUP；不根据域名、部署目录或后端版本判断。
5. `product=i8, loginProduct=iup` 会同时得到 `isIUP=true`、`oldIUP=true`。保存门禁只看 `isIUP`，没有排除 `oldIUP`。这是否不符合业务环境定义，需要现场确认，不能单凭“非 IUP 部署”断言判定有错。

## 代码位置

- `src/pages/DataSetManager/components/formFooterBar.tsx:21-22`：保存按钮调用 `handleSave`。
- `src/pages/DataSetManager/detailNormal/components/formMain/index.tsx:208-210`：普通数据集保存。
- `src/pages/DataSetManager/detailNormal/store/formCfg.ts:28`：`formSave` 绑定 `editDataSetDetail`。
- `src/pages/DataSetManager/detailNormal/service.ts:37-38`：保存请求前调用 `withBusiProduct`。
- `src/pages/DataSetManager/detailComplex/components/formMain/index.tsx:410` 与 `detailComplex/service.ts:42-45`：复杂数据集同样经过该服务。
- `src/services/busiProduct.ts:46-51`：非 IUP 提前返回；IUP 获取产品列表并补齐产品标志。
- `src/pages/utils.ts:44-51`：环境判定及 `oldIUP`。
- `src/components/BusiProductSelect/index.tsx:18-20`：组件挂载时的另一处直接产品请求；`:61` 的共享表单字段在非 IUP 隐藏。

## 反馈循环与实际输出

独立诊断脚本位于明确隔离的临时调试目录：

`C:/Users/jinxu/AppData/Local/Temp/report-web-iup-diagnostic/save-request.cjs`

脚本执行真实普通/复杂数据集保存服务、真实产品服务、真实 `getEnv()`；只替换 UDP 运行时、用户输入与 HTTP 传输，记录 URL，并断言产品接口调用次数为零且确实到达一次 `saveDataSet`。没有向服务器发送请求。支持从 Git revision 加载真实历史模块作差分验证；不是源码正则测试。每次执行为秒级。

从 report-web 工作目录运行：

```bash
node C:/Users/jinxu/AppData/Local/Temp/report-web-iup-diagnostic/save-request.cjs 773efdda normal '{"product":"sdp"}'
```

输出摘要（已重复运行）：

```text
isIUP: false
GET /reportcenter/dataSet/getBusiProductString
BODY /reportcenter/dataSet/saveDataSet
Expected 0 product requests, received 1
exit=1
```

同输入当前代码：

```bash
node C:/Users/jinxu/AppData/Local/Temp/report-web-iup-diagnostic/save-request.cjs working-tree normal '{"product":"sdp"}'
```

```text
isIUP: false
BODY /reportcenter/dataSet/saveDataSet
PASS: dataset save reached; product-request count matches expectation
exit=0
```

将 `normal` 换为 `complex`，同样是历史版红、当前版绿。最小场景只保留一个保存调用、一个数据集名称和非 IUP 用户标识；不依赖 UI、数据库、登录服务或真实网络。省略 `loginProduct` 后仍复现，已排除该附加输入对历史问题的影响。

### 当前代码的用户标识对照

| product | loginProduct | isIUP | oldIUP | 产品接口次数 |
| --- | --- | --- | --- | --- |
| sdp | cap | false | false | 0 |
| sdp | iup | true | false | 1 |
| i8 | iup | true | true | 1 |
| i8 | i8 | false | false | 0 |

只将第一行 `loginProduct` 从 `cap` 改为 `iup`，请求就从 0 变为 1，证实登录标识的影响。

既有回归：

```bash
node --test tests/busi-product.test.cjs tests/product-config.test.cjs
```

实际结果：15 tests，15 pass，0 fail。关联历史文档写的 16 项不是本工作区本轮的实际数量。

## 三个假设及核查结果

1. **现场前端包缺少保存门禁。** 历史版本可复现，并已定位门禁修复；但未检查现场资源、缓存或发布版本，不能断言现场就是旧包。
2. **现场用户仍被归类为 IUP。** 当前代码可通过单变量对照复现；需要现场仅提供 `product`、`loginProduct`，无需完整用户信息或令牌。
3. **请求来自产品控件挂载而非保存服务。** 另一调用点确实存在，但没有现场 Initiator 支持。已检查当前安装的 `@newgrand/udp-ui/es/configComponent/form/index.js:752`，普通顶层字段遇 `item.hidden` 直接返回，不挂载组件；不能把“隐藏控件仍一定加载”当作已证实原因。若现场发起栈指向控件，再核查模块加载时环境、控件可见性及部署的 UI 包。

## 结论边界与下一步

已经确定旧代码为何发生此症状，以及当前环境门禁的精确定义；**尚未复现/确认用户现场在当前代码、真实非 IUP 登录标识下的误调用**。没有现场 URL、用户标识、HAR 或 Initiator，不继续猜测。

请取得：

- 实际登录态的 `product`、`loginProduct`（优先在 `getEnv` 断点读取；仅在页面暴露 `$NG.getUser` 时可从该入口读取这两个字段）。
- Network 中该请求的 Initiator/调用栈，以及页面实际加载的前端版本。

若 `isIUP=false` 且调用栈来自保存服务，核对并发布包含 `4742f85d` 的前端包，再验证实际加载资源，而不是仅确认 Git 分支。若为 `product=i8, loginProduct=iup`，先确认旧钱潮是否应当支持该接口，再考虑专用能力门禁；不贸然全局修改 `getEnv`，避免影响其他 IUP 功能。

本轮诊断结束，未实施 Phase 5 修复；不存在新的“已修复”宣称。未加入调试日志，源码工作区保持干净。脚本与四份差分日志留在上述临时调试目录，未在仓库新增领域文档或临时原型。预防建议是保留经过真实保存服务与真实环境读取器的用户形态矩阵，而不只在产品服务测试里 mock `isIUP` 布尔值。
