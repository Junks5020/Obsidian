Status: resolved

# 01 报表最小兼容 API 适配

Blocked by: none

相关：[[../spec]] · [[report-table-ADR-0006-第一阶段采用最小兼容API集]]

## Goal

在 `udp-report-table` 内提供不依赖业务方直接调用 Handsontable 的最小报表 API，覆盖行列计数/增删/隐藏/尺寸、单元格读写/属性/字体、合并、选区、当前单元格和工作表读取。

## Acceptance

- [x] API 有稳定 TypeScript 类型和运行时边界。
- [x] 映射到现有 Handsontable 能力，不改变现有 props、事件和持久化数据结构。
- [x] 公式字段在读取/写入过程中保持原样。
- [x] `getFileXML`、公式引擎、事件锁等未支持 API 不被伪装导出。
- [x] 新增 node:test 覆盖成功和无实例/无效坐标边界。

## Comments

### 2026-08-18 实施完成（claimed → resolved）

交付：

- 新增 `packages/@newgrand/udp-report-table/src/api/reportTableApi.ts`：纯适配器
  `createReportTableApi({ getInstance, getContext })` → `ReportTableMinApi`，不 import 真实
  Handsontable / 组件内部，仅依赖结构化最小接口 `ReportTableHotLike`。方法集覆盖：
  getRows/getCols、insert/delete Rows/Cols、hideRow/hideCol/showRow/showCol/isRowHide/isColHide、
  setRowHeight/setColWidth、setCellData/getCellData、setCellProp/getCellProp/setCellFont、
  merge/unmerge/selectCell/getCurrentCell、getCellText、getWorksheets/getCurrentWorksheet/getWorksheetName。
- `setCellFont` 折叠为设计器同款 className 令牌（`htFontSize_n` / `htFontWeight_700` /
  `htFontItalic_italic` / `htFontUnderline_underline` / `htFontColor_HEX`，纯函数 `applyFontClassTokens`），
  `fontFamily` 写 cell meta 标准名；语义为“未指定不改写，false 移除”。
- 接线：`DesignReportTable` ref 新增 `reportApi`（不改现有 ref 方法、不动预览
  `ReportTableAPI.getHotInstance`）；`CustomTable` 挂载时经
  `src/api/designHotRegistry.ts` 注册 hot getter、卸载时注销；
  `src/api/designContext.ts` 从 store 注入工作表读取与行高列宽持久化
  （沿用 `globalSettings.widths/heights + updateGlobalSettings` 链路，语义对齐
  `customTable/menu/hidden.tsx`）。
- 边界策略：无实例→变更类 `false`、读取类 `null`/`[]`；无效坐标 fail-soft；
  未支持 API（getFileXML、公式引擎、事件锁、`getCellRow/Col/Name`、PrintPlugin 打印 API 等）
  不定义、不导出，并有测试断言。

验证：

- `node --test packages/@newgrand/udp-report-table/tests/*.test.cjs`：102/102 通过
  （新增 `tests/report-table-min-api.test.cjs` 18 项 + boundaries 追加 3 项）。
- 包级类型检查：`tsc -p tsconfig.check.json --noEmit` 中本包 `src` 0 错误
  （唯一报错为预先存在的环境噪音 `node_modules/@types/d3-dispatch` 语法版本不兼容）。
- `father build`（`tsconfig.build.json`）：成功，es+lib 共 304 文件含新模块与 d.ts。

决策与说明：

- `unmerge` 为 `merge` 的对称补充，research 表格未列但属最小兼容 API 的自然对偶，保留并测试。
- `isRowHide/isColHide` 沿用硕正原生命名（非 `isRowHidden`）。
- `getWorksheetName(no)` 按硕正语义为序号索引（0 基），越界返回 null。
- `callFunc()` / `setProp()` 的“受控白名单子集”未在本 ticket 实现：尚无真实业务调用样例，
  按 [[report-table-ADR-0006-第一阶段采用最小兼容API集]] 待真实样例后单独立项，不创建空壳。
- `designContext.applyAxisSize` 与 `menu/hidden.tsx` 存在同构尺寸写入逻辑，本阶段未抽公共
  函数（避免触碰上游同步链），后续可在重构中收敛。
- 未提交 git：本工作树含大量既有未提交改动，代码以 `src/api/`、`src/print/`、两处组件接线、
  `index.tsx` 导出及 `tests/` 为准。
