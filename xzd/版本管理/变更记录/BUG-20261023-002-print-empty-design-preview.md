---
tags:
  - report-web
  - report-table
  - bug
status: committed-partially-verified
date: 2026-10-23
updated: 2026-10-24
---

# 打印设计空详情无法预览：本地源码修复，待浏览器验收

## 2026-10-24 提交确认

推送更新：用户随后授权推送，已创建远端 `origin/ljx-7.0` 并推送至 `a863d07776b7ed81a8322d625188368a9243d284`。通过 git ls-remote 核验远端哈希与本地一致，未强推，未发包或部署；下面的“未推送”为推送前状态。

`ng-design:ljx-7.0` 已创建本地提交 `a863d07776b7ed81a8322d625188368a9243d284`（fix(report-table): 修复设计器加载、拖拽和属性同步），包含空设计默认页、数据集归属校验及表格渲染后关闭 loading。组件库全量 342/342、宿主 73/73、ESM/CJS 与声明构建、pre-commit 钩子通过。8472 指定报表打开及连续 loading 已验证，真实打印预览仍待独立验收。未推送、发包或同步其他分支，ngproxy.ini 保留未提交。未新增关联需求。

| 分支 | 提交 | 状态 |
| --- | --- | --- |
| ljx-7.0 | a863d07776b7ed81a8322d625188368a9243d284 | 验证中 |
| sync_branch / ljx-6.5.2 / 6.5.2 / ljx-6.5.1 / 6.5.1 | 未审计 | 待关联 |

其他分支同步尚未获用户指示。下文未提交描述保留为历史状态。

相关：[[report-web-术语表]] · [[report-table-同步术语表]] · [[变更记录/BUG-20261023-001-report-dataset-drag-container]] · [[00-版本总览]]

## 已确认的现场与根因

用户使用 `report-web:ljx-7.0` 的 `start:local`，源码指向：

`C:/Users/jinxu/workspace/xzd/ng-design.worktrees/sync_branch/packages/@newgrand/udp-report-table/src`

- 点击打印设计预览报 `数据错误，无可用报表页saveUtil`，尚未发送预览请求。
- 页面只读状态：模板 ID 与状态 ID 均为 `7980000000000564`，type=print，hotLoading=false，dataSetListReady=true，activeSheetKey 为空，sheetCount=0，无详情 schema。
- 用户提供的实际 `getPrintDesignDetail` 响应为 `Code:200, Data:null, Success:true`。
- 成功空详情未建立 reportDetail，而初始化门禁对有 ID、无详情的设计永远返回 false，因此不会创建默认页。
- 打印系统数据集独立于设计详情加载；原空详情分支还调用 `updateDataSetSelectedList([])`，会清掉先返回的数据集，或提前宣告尚未结束的数据集请求就绪。

## 修复边界

1. 显式记录与当前模板 ID 和 table/print 类型绑定的 `emptyDesignDetail`。仅当前版本的成功显式 Data=null 可设置；新请求、设计重置及有效详情写入时清除。
2. 只有身份/类型匹配且数据集已就绪，才允许现有 `handleInitData()` 创建默认工作表与 activeSheetKey。加载中、失败、格式缺失、身份不匹配及过期响应不创建默认页；不伪造 reportDetail。
3. 打印空详情只记录标记，不清空系统数据集、不置就绪。实际数据集请求开始时复位就绪标记，成功完成后由已有 action 置为 true。
4. 保留另一会话的 reportId 传递、请求归属校验、迟到响应取消逻辑及 `updateReportDetail` 复位就绪的改动。
5. 数据集初始加载使用显式 `throwOnError`；业务失败和网络异常由当前有效请求统一处理、只显示一次错误，保持未就绪并结束当前 loading。严格路径还要求成功响应的 Data 为数组，拒绝缺失、null 或非数组，合法空数组仍成功；移除打印聚合层将缺失结果补为 [] 的默认值，其他独立调用者的原有行为不变。
6. `saveUtil.ts` 空页校验保持不动；预览仅序列化当前编辑、发布 payload 并导航，不自动保存模板。

## 变更文件（组件库相对路径）

- `src/design/detailLoading.ts`
- `src/store.tsx`
- `src/design/index.tsx`
- `src/design/service.ts`
- `src/design/components/leftAddDataSet/index.tsx`
- `src/design/components/leftAddDataSet/service.ts`
- `src/design/TableDesign/components/tableSheets/index.tsx`
- `src/design/TableDesign/components/tableSheets/utils.ts`
- 新增 `tests/print-empty-design-preview.test.cjs`

## 复现与验证

测试执行真实 React/JSDOM 生命周期、详情及数据集 service、context/store、设计入口、TableSheets、序列化、打印 payload builder 和顶部预览动作；只替换网络、UI 展示和 HOT/字体渲染边界，不 mock 工作表初始化或序列化结果。

- 初次复现准确输出 `sheets:0` 和同一 `无可用报表页saveUtil` 错误。
- 初版空详情修复后，接入真实 LeftDataSetList 再现两项竞争红测：datasets-first 的 dataSetInfos 被清空、detail-first 提前置就绪。
- 新增数据集业务失败红测，确认非 200 原本被空数组伪装成成功。最终审查再补系统/自定义数据集 `Code:200` 缺少 Data 的两项红测，确认默认 [] 同样掩盖异常。
- 最终 `print-empty-design-preview.test.cjs` **29/29** 通过：包括成功空详情、当前未保存文字/字段、两种请求顺序、失败/网络异常、自定义数据集失败、重新加载复位、过期成功/失败、模板/业务类型切换、无 ID 新建、重复初始化、严格响应形状校验、合法空数组、保留旧调用契约及无保存请求。字段失败时已有打印详情保留，但按原生命周期门禁暂不初始化工作表，不生成替代空白页。
- 聚焦三个文件（含另一会话生命周期与既有打印 payload 测试）**49/49** 通过。
- 组件库完整 `node --test packages/@newgrand/udp-report-table/tests/*.test.cjs`：**314/314** 通过。
- report-web `npm run test:architecture`：**70/70** 通过，既有 PDF 测试及改动保留。
- `npm run build --workspace @newgrand/udp-report-table`：最终重跑通过，336 文件含声明构建完成，约 44 秒；未发包。
- 本次修改文件 Prettier、两工作树 `git diff --check` 通过。

日志：

- `C:/Users/jinxu/AppData/Local/Temp/report-table-print-empty-final-suite.log`
- `C:/Users/jinxu/AppData/Local/Temp/report-table-print-empty-build.log`

## 并发协调历史

中途发现另一会话修改同一入口和左侧加载组件，且新增 `tests/design-dataset-lifecycle.test.cjs`。本会话先暂停并保存 diff；用户随后明确另一会话已经暂停，才在重新读取基线后继续增量修复。另一会话的代码与 6 项生命周期测试均保留并通过回归。

历史快照 `C:/Users/jinxu/AppData/Local/Temp/report-print-preview-concurrent-changes-20261023.patch` 为当时的混合增量，不是最终补丁，不应直接套用或作为本会话完整提交。

## 真实页面验收仍待完成

- 当前交付为 `start:local` 源码修复；未同步到 report-web 所装 npm 包补丁，未提交、推送、部署或关闭远端缺陷。
- 未自动保存模板、触发真实预览接口或擅自停止开发服务。测试中的 payload 发布/导航成功不等同于真实浏览器预览已通过。
- 用户先保护未保存内容，确认页面加载最新源码后重新进入该空设计模板：应生成一张默认页；编辑文字或拖入系统字段后直接预览，payload 应包含当前编辑和正确 dataSetInfos，不需要先保存模板。
- 若仍异常，先核验当前页面是否具有 `emptyDesignDetail`、sheetCount 和 activeSheetKey，再检查实际资源/接口，避免继续猜测性补丁。
- 前面的文字选区与额外加号问题独立验收，不能以本次预览回归代替其浏览器确认。

## 2026-10-24 loading 关闭时机跟进

用户要求与 6.5.2 一致：表格渲染完成后才关闭 loading。已对比 6.5.2 的 `src/components/report/design/utils/load.ts`，其关闭动作位于恢复渲染、合并与冻结处理之后。

- 7.0 的详情和数据集请求原先都在 finally 中关闭共享 loading，工作表加载随后又开启，导致空网格短暂曝光。详情成功后改为将 loading 交给工作表渲染，数据集成功后同样不提前关闭；失败请求仍释放遮罩，旧请求的归属判断保留。
- TableSheets 为初始化完成/失败统一兜底，包括 schema 为空、不调用 loadSheet 的成功路径。保留 loadSheet 的渲染后释放逻辑。
- 新增 4 项回归，覆盖 table/print 的空详情默认页及真实工作表加载器；明确断言从请求结束到字体/网格初始化完成之间从未写入 false。修复前空详情 2 项失败，修复后专项 43/43、宿主架构 73/73 通过。
- 8472 真实报表 `3080000000000003`：详情约 2921ms 返回，20 行网格约 4970ms 就绪，遮罩约 5099ms 关闭；观察期间未出现加载中途关闭而网格尚未就绪的状态。
- 仅本地 sync_branch 源码修复；未保存模板、修改 6.5.2、提交、发包或部署。打印模板和复杂工作表的实际浏览器验收仍独立保留。
- `npm run build --workspace @newgrand/udp-report-table` 通过，ESM/CJS 各 337 文件与类型声明生成成功；修改源码和空详情测试 Prettier、组件目录 git diff --check 通过。
