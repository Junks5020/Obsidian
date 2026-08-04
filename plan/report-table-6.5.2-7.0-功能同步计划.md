---
project: "report-table 6.5.2-dev → 7.0 功能同步"
created: 2026-08-05
updated: 2026-08-05
tags:
  - project/7.0
  - report-table
  - 同步
---

# 🔄 report-table 功能同步计划（6.5.2-dev → 7.0）

## 📋 背景

- **源**：`~/workspace/xzd/report-web` 分支 `6.5.2-dev`（`src/components/report/`）
- **目标**：`ng-design.sync_branch` 分支 `packages/@newgrand/udp-report-table`
- **上次同步点**：ng-design `5ea666841`（2026-07-25 同步报表隐藏、树层级和浮动图片）→ `5581618fd`（2026-07-28 条形码）
- **本次范围**：report-web 6.5.2-dev 上 2026-07-27 ~ 2026-08-04 之间未同步的提交，共 **16 项**

## 🗺️ 目录映射关系

| report-web (6.5.2-dev) | ng-design udp-report-table (7.0) |
|---|---|
| `design/components/{customTable,tableSheets,cusToolbar,cellValueShow}` | `design/TableDesign/components/...` |
| `design/utils/` | `design/TableDesign/utils/` |
| `rightCellProperties/` | `design/TableDesign/components/cusToolbar/rightCellProperties/` |
| `printSetting/` | `design/TableDesign/components/printSetting/` |
| `preview/` | `preview/` |
| `floatingImage/` | `floatingImage/` |
| `dataSetList/` | `design/components/dataSetList/` |
| `visibility.ts`（新增） | 需新建（建议 `shared/visibility.ts`） |

## ⚠️ 7.0 适配规则（移植时必须遵守）

1. **状态管理**：report-web 用 dva `useSelector(state => state[getDvaName()])` / `dispatch` → 7.0 用 `useStore()`（`src/store.tsx`，zustand 风格）
2. **样式引用**：report-web 直接 `style.xxx` → 7.0 用 `getStyleClass('xxx')` 辅助函数（`const floatImageStyle = style ?? {} as Record<string,string>`）
3. **导入路径**：`@/components/report/...` → 相对路径
4. **7.0 独有功能不可回退**：RibbonTabs 工具栏、条形码（fieldForms.ts）、CellLinkSettings 重构（ConditionSettingsContent.tsx / conditions.ts）、`preview/adapters.ts`、`shared/hiddenCells.ts` 调用方

---

## ✅ 同步计划表（按依赖与时间排序）

### 一、预览性能优化系列

| # | 提交 | 日期 | 说明 | 涉及文件 | 状态 |
|---|------|------|------|----------|------|
| 1 | `b9a557b6` | 07-20 | 优化报表预览大合并单元格渲染 | 🆕 `preview/tableSheets/mergeVirtualization.ts`、`tableSheets/utils.ts`(-94行)、`table/settings.ts` | ⬜ |
| 2 | `dd46f74e` | 07-27 | 优化报表性能2（根节点复用、样式表注册、表格休眠） | 🆕 `preview/plugins/cellRootLifecycle.ts`、`preview/table/tableRegistry.ts`、`preview/table/usePreviewTableDormancy.ts`、`preview/tableSheets/styleSheetRegistry.ts`；改 `table/index.tsx`、`plugins/utils.ts`、`classname.ts`、`filterModal/index.tsx`、`textRender.tsx`、`tableSheets/utils.ts`、image/slash/text render、`customTable/index.tsx`、`table/index.less` | ⬜ |
| 3 | `bd5661be` | 07-28 | 避免预览单元格根节点重复卸载 | `preview/plugins/cellRootLifecycle.ts` | ⬜ |

### 二、树形报表系列

| # | 提交 | 日期 | 说明 | 涉及文件 | 状态 |
|---|------|------|------|----------|------|
| 4 | `a3354fd9` | 07-28 | 修复树状报表首行折叠节点首次渲染 | `preview/plugins/treeRender/index.tsx`、`preview/plugins/utils.ts` | ⬜ |
| 5 | `d80175f4` | 07-28 | 增加预览树状表格全部展开/收起 | `preview/plugins/treeRender/utils.ts`、`filterRender/filterModal/utils/render.ts` | ⬜ |

> ⚠️ #5 依赖 #9 的 `preview/utils/visibility.ts`（treeRender/utils.ts 在 02615117 中被重写为走 visibility 协调器），实现时按最终状态合并。

### 三、表头过滤系列

| # | 提交 | 日期 | 说明 | 涉及文件 | 状态 |
|---|------|------|------|----------|------|
| 6 | `c524dc9b` | 07-29 | 修复表头过滤问题 | 🆕 `preview/plugins/filterRender/range.ts`、`types.ts`、`util.tsx`（store 部分 7.0 已有 `filterRangeMap`） | ⬜ |
| 7 | `42d37ff5` | 07-30 | 兼容父子树完整筛选范围 | `range.ts`、`util.tsx` | ⬜ |
| 8 | `adee3848` | 07-30 | 统一树报表多列级联筛选 | `range.ts`、`types.ts`、`util.tsx` | ⬜ |

### 四、行列隐藏重构系列（替换 7.0 现有实现）

| # | 提交 | 日期 | 说明 | 涉及文件 | 状态 |
|---|------|------|------|----------|------|
| 9 | `02615117` | 07-29 | 支持报表设计器行列隐藏（合并单元格感知） | 🆕 `visibility.ts`（顶层）、🆕 `design/.../customTable/utils/hiddenAxes.ts`、🆕 `preview/utils/visibility.ts`；重写 `contextMenu.ts`（`custom_hidden_*`）、改 `customPlugin.ts`、`settings.ts`、`design/store`、`load.ts`、`save.ts`、`saveUtil.ts`、`treeRender/utils.ts`、`table/index.tsx`、`tableSheets/utils.ts`、`cus-theme.less` | ⬜ |
| 10 | `42169a88` | 07-29 | 修复报表行列隐藏状态同步 | `contextMenu.ts`、`hiddenAxes.ts`、`design/utils/index.ts`、`load.ts`、`visibility.ts` | ⬜ |
| 11 | `ad3589d8` | 08-03 | 修复隐藏行列在合并中仍能合并 bug | `contextMenu.ts`、`visibility.ts` | ⬜ |

> ⚠️ 7.0 当前是 `df2a4451` 旧实现（contextMenu `hidden_columns_hide` + `shared/hiddenCells.ts`），需**整体替换**为新实现；`shared/hiddenCells.ts` 的调用方需逐一切换到新 API。print/utils（PDF.ts 等）为应用层功能，组件包无对应物，**不在本次范围**。

### 五、浮动图片系列

| # | 提交 | 日期 | 说明 | 涉及文件 | 状态 |
|---|------|------|------|----------|------|
| 12 | `c086ecb9` | 07-29 | 浮动图片按钮数量角标 | `cusToolbar/buttons.tsx`、`MyCustomButton/index.tsx`、`cusToolbar/index.tsx` | ⬜ |
| 13 | `d3b11bcc` | 07-31 | 修复浮动图片选中与拖拽体验（rAF 拖拽、`pendingSelectedZIndexRef`） | `floatingImage/index.tsx` | ⬜ |
| 14 | `bde2be64` | 08-03 | 字段图片文案改为"图片" | `floatingImage/index.tsx` | ⬜ |

### 六、其他独立修改

| # | 提交 | 日期 | 说明 | 涉及文件 | 状态 |
|---|------|------|------|----------|------|
| 15 | `5ef1859d` | 07-31 | 链接创建上限 5 → 10 | `rightCellProperties/xtypes/CellLinkSettings/index.tsx`（`MAX_GROUPS`、按钮判断） | ⬜ |
| 16 | `5caa00fb` | 08-04 | 修正打印字段编码展示与标题生成 | 🆕 `design/components/dataSetList/fieldLabel.ts`、`dragCollapse/index.tsx`、`dragWrapper/index.tsx`、`types.ts`、`dragCollapse/style.less` | ⬜ |

---

## 🚫 确认无需同步

| 提交/文件 | 原因 |
|---|---|
| `772c74d5` 浮动图片列字母格式 | ✅ 已同步（`floatingImage/utils.ts` 两侧一致） |
| `ff968baa` 锚点选择框样式 | floatingImage 部分已同步（`373c5bc10`）；contextMenu 部分是回退旧隐藏实现，将被 #9 新实现覆盖 |
| `49e27f0b` 去掉 udp-report-table 依赖 | report-web 内部依赖调整，与组件包无关 |
| `preview/resultModal/`、`preview/utils/export.ts` | report-web 中无任何引用的死代码 |
| `print/utils/PDF.ts` 等打印导出 | 应用层功能，组件包无对应模块 |
| 条形码（`fieldForms.ts`） | 7.0 独有（`5581618fd`），不反向同步 |

---

## 🔧 实施策略

1. **顺序**：先做独立小项（#15、#14、#12、#16）→ 浮动图片拖拽（#13）→ 行列隐藏重构（#9~#11）→ 树形（#4、#5）→ 表头过滤（#6~#8）→ 性能优化（#1~#3）
   - 行列隐藏 (#9) 会重写 `treeRender/utils.ts`，是 #5 的前置；性能优化 (#2) 与 #9 在 `table/index.tsx` 有文件重叠，放最后合并
2. **每项验证**：`npx tsc --noEmit`（包级类型检查）+ 功能点人工核对
3. **提交粒度**：每个同步项一个 commit，message 标注对应的 report-web 提交哈希

## 📊 进度追踪

- [ ] #1 b9a557b6 大合并单元格渲染
- [ ] #2 dd46f74e 性能优化2
- [ ] #3 bd5661be 根节点重复卸载
- [ ] #4 a3354fd9 树首行折叠渲染
- [ ] #5 d80175f4 树全部展开收起
- [ ] #6 c524dc9b 表头过滤
- [ ] #7 42d37ff5 父子树筛选范围
- [ ] #8 adee3848 多列级联筛选
- [ ] #9 02615117 设计器行列隐藏
- [ ] #10 42169a88 行列隐藏状态同步
- [ ] #11 ad3589d8 隐藏行列合并bug
- [ ] #12 c086ecb9 浮动图片角标
- [ ] #13 d3b11bcc 浮动图片拖拽体验
- [ ] #14 bde2be64 字段图片文案
- [ ] #15 5ef1859d 链接上限10
- [ ] #16 5caa00fb 字段编码展示
