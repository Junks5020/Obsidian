---
id: SYNC-20261023-001
type: sync
status: completed
source_branch: 6.5.2-dev
target_branch: ljx-7.0
commit: 74b27e44
created: 2026-10-23
updated: 2026-10-23
tags:
  - version-change
  - sync
  - report-web
  - iup
  - busi-product
---

# SYNC-20261023-001：IUP 显示与保存门控同步到 ljx-7.0

相关：[[00-版本总览]] · [[report-web-术语表]] · [[变更记录/BUG-20261012-001-report-sync-regressions]]

## 同步概述

`6.5.2-dev` 在首个接口对接提交之后又补了两个 IUP 提交：适用产品与多数据库查询定义仅 IUP 显示；非 IUP 保存时不请求产品列表。`ljx-7.0` 此前只同步了首个对接提交（`9ff8126f8` ↔ `d3ca5209`），这两项门控缺失，本次按功能同步补齐。

## 提交映射

| 来源 Commit（6.5.2-dev） | 目标 Commit（ljx-7.0） | 标题 | 说明 |
| --- | --- | --- | --- |
| `d3ca5209` | `9ff8126f8` | fix: 对接适用产品与多数据库查询定义接口 | 同步前已存在，本次不改动。 |
| `5049a2c3` | `74b27e44` | fix: 仅在IUP显示适用产品及多数据库配置 | `BusiProductSelect` 的 `busiProductFormItem` 与 `detailComplex` 的 5 个多库 SQL 字段加 `hidden: !isIUP`。 |
| `cb462b62` | `74b27e44` | fix: 非IUP保存时不请求适用产品列表 | `withBusiProduct` 在非 IUP 直接返回原 payload，不请求也不补默认值。 |

## 冲突处理

- `detailComplex/store.ts` 在 7.0 已因 API 数据集与多库字段改造重写（`langKey`、`get label()`、`sqlPlaceholder`），无法整块 cherry-pick。按字段逐项插入 `hidden: !isIUP`，字段顺序、`paramSetting` 位置与 `databaseQueryTip` 的移除保持 7.0 现状。
- `6.5.2-dev` 的 `const isIUP = getEnv().isIUP;` 会触发仓库 `prefer-destructuring` 规则（该问题在 6.5.2-dev 同样存在）。改为 `const { isIUP } = getEnv();`，行为等价且 lint 通过。
- 7.0 独有的 `DataSetManager/detailApi` 复用同一个 `busiProductFormItem`，自动继承隐藏门控，无需单独改动；该目录没有多库 SQL 字段。
- 6.5.2 发布分支同名提交为 `773efdda` / `4742f85d`，三处门控内容与 6.5.2-dev 一致，无需回移。

## 验证

- `npm run test:architecture`：**72/72** 通过。
- `node --test tests/busi-product.test.cjs tests/product-config.test.cjs`：**16/16** 通过，含非 IUP 不发请求、`product`/`loginProduct` 大小写不敏感、四种用户形态的可见性组合。
- `npx eslint` 三个源码文件：通过；`npx prettier --check` 五个改动文件：通过。
- `npx tsc --noEmit`：9 个错误全部位于 `node_modules/@types/d3-dispatch`（既有 TS 4.9 依赖兼容问题），改动文件无类型错误。
- 分支对齐：`src` 中含 `isIUP` 的 7 个文件与 `6.5.2-dev` 集合一致，逐文件出现次数一致（1/1/6/1/5/3/1）。
- `BusiProductSelect/index.tsx` 与 `busiProduct.ts` 的改动 blob 与 `6.5.2-dev` 完全相同（`d7f38895→7da3c078`、`6375f9b3→44786630`）。
- 验证边界：未做真实浏览器/后端验收（需 IUP 与非 IUP 两种登录态各保存一次），未推送、未部署、未发布。

## 版本同步

| 版本名称 | 是否需要同步 | 当前状态 | 合入 Commit | 验证结果 | 备注 |
| --- | --- | --- | --- | --- | --- |
| ljx-7.0 | 是 | ✅ 已同步 | `74b27e44` | 72 项架构测试、16 项专项测试通过 | 未推送 |
| 6.5.2-dev | 来源 | — | `5049a2c3`、`cb462b62` | 来源分支 | — |
| 6.5.2 | 否 | ✅ 已同步 | `773efdda`、`4742f85d` | — | 发布分支内容一致 |
| master | 待定 | ❌ 待同步 | - | - | 由 `ljx-7.0` 合入时携带 |
