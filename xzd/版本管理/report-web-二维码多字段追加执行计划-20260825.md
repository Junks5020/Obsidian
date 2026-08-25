---
tags:
  - report-web
  - 执行计划
status: confirmed-plan
date: 2026-08-25
updated: 2026-08-25
---

# report-web 二维码多字段追加执行计划（2026-08-25）

相关：[[report-web-术语表]] · [[00-版本总览]] · 来源 Wiki：`报表/打印二维码展示支持多个字段`（oldid=216770，最后编辑 2026-06-12）

## 需求一句话

打印模板设计器「展示形式→二维码」在单字段编码基础上，允许追加最多 N 个同数据集其他字段（可独立格式化、可拖拽排序），扫码内容按「字段显示名：值」换行拼接；存量模板行为不变。

## 已确认决策（2026-08-25 拷问结论）

| # | 决策点 | 结论 |
| --- | --- | --- |
| 1 | 范围边界 | 前端只做设计器侧（属性面板 + 元数据 + 保存校验）；拼接与二维码生成由后端报表服务按元数据实现。依据：report-web 全库无二维码生成代码，预览/打印消费后端算好的 `type`/`formatData` |
| 2 | 元数据契约 | `cellData.qrExtraFields: [{fieldId, format, formatValue}]`，数组顺序即拼接顺序；不存显示名快照（后端按 fieldId 实时解析）；缺省/空 = 旧行为 |
| 3 | 字段上限 | N=8（Wiki 建议值），达上限禁用添加按钮 |
| 4 | 格式化选项 | 严格按 Wiki 7 项（无/千分位/无千分位/RMB/Percent/YYYY-MM-DD/YYYY-MM）；取值编码复用现有 format 编码：null、`###,##0`、`#####0`、`yyyy-MM-dd`、`yyyy-MM`、`rmb`、`percent` + `formatValue` 默认 `'2'` |
| 5 | 数据集切换 | 立即清空 qrExtraFields（与切数据集清空主字段行为一致） |
| 6 | 保存校验 | 阻断保存 + 提示受影响单元格及失效字段名 + 支持定位到该单元格重新配置 |
| 7 | 目标分支 | 仅 `6.5.2-dev`；验收通过后如需同步 6.5.1-dev 等另出同步计划 |
| 8 | 设计画布 | 维持现状（主字段文本值），不改画布渲染 |
| 9 | 后端契约对齐（2026-08-25 补充） | 后端接口 R-260612-000002 定义 `cellDataEx` 为**单元格顶层属性**的完整拼接清单：首项固定为主字段占位 `{dataSetId, dataSetSource, fieldId, format, formatValue}`，数组顺序即拼接顺序；空数组=旧行为仅编主字段。前端已按此重构（原 `cellData.qrExtraFields` 方案废弃）；追加项上限仍为 8（清单总长 ≤9） |

## 实施步骤（全部在 6.5.2-dev）

1. **元数据默认值**：`src/constants/cellMetas.ts` 的 `defaultFieldCell.cellData` 增加 `qrExtraFields: []`。
2. **新 xtype「追加展示字段」**：新建 `src/components/report/rightCellProperties/xtypes/QrExtraFields/`（参照 `treeConfig/` 三件套模式）：
   - 仅 `otherShowType === 'qr_code'` 时可见；
   - ⓘ 浮层文案照录 Wiki；添加按钮下拉多选（所属数据集除主字段外全部字段，不限类型，显示名用 `getDataSetFieldLabel`）；
   - 已选列表行 = 拖动手柄 + 字段名 + 更多(格式化菜单 + 小数位输入，仅数值选项显示，默认 2) + 删除；
   - 拖拽排序用现成依赖 `react-sortable-hoc`；上限 8 个禁用添加；主字段不出现在列表。
3. **表单接线**：`cellProperiesForms/fieldForms.ts` 增加 `{ name: ['cellData','qrExtraFields'], xtype: 'myQrExtraFields' }`（computed 控制显隐）；`xtypes/CellFormMain.tsx` 注册映射。
4. **联动清理**：`rightCellProperties/utils/field.ts`——`otherShowType` 离开 `qr_code` 时清空 qrExtraFields；`dataSetId` 变化时清空 qrExtraFields。注意现有"设置 otherShowType 清 format/formatValue"只作用于主格式化，与列表项内部 format 不冲突。
5. **保存校验**：在保存链路（`validFieldId` 的调用处同路新增）校验所有 field 单元格的 qrExtraFields fieldId 仍存在于所属数据集 `dataSetFieldInfoVOs`；失败阻断并列出「单元格 + 失效字段」，点击定位选中该单元格。
6. **回归测试**：`tests/` 新增 jest 用例（参照 `floating-image.test.ts` 风格）：存量兼容（qrExtraFields 缺省=[]）、联动清空、失效字段检出、格式化编码映射。
7. **手动验收**：Wiki 验收标准 1–14 前端可验项逐条过；第 15 项（打印/导出 PDF）配合后端联调一次元数据序列化结果。

## 风险与依赖

- 后端需同步确认 qrExtraFields 契约及"空 = 单字段旧行为"的兼容实现（决策 1 的对端义务）。→ **已闭环（2026-08-25）**：后端给出 R-260612-000002 契约示例，前端已按 `cellDataEx` 完整清单制重构并通过回归测试。
- 保存链路中 validFieldId 调用点的精确位置实施时定位（工具函数已存在于 `rightCellProperties/utils/valid.ts`）。→ 已落地：属性面板变更实时校验 + `load.ts` 加载校验 + 保存/预览/导出前 `validateQrExtraFieldsBeforeSave` 三层拦截。
- `react-sortable-hoc` 为既有依赖，React 18 下如遇拖拽异常则以列表内上移/下移兜底再评估。

## 契约对齐修订记录（2026-08-25）

后端接口 R-260612-000002 示例要求：

```json
"cellDataEx": [{ "dataSetId": "...", "dataSetSource": 0, "fieldId": "qty", "format": null, "formatValue": null }]
```

与初版实现（`cellData.qrExtraFields: [{fieldId, format, formatValue}]`）的差异及处理：

| 差异 | 处理 |
| --- | --- |
| 存储位置：顶层 vs cellData 内 | 迁移为单元格顶层 `cellDataEx`；`savedCellProperties` 增加 `'cellDataEx'`（否则保存被白名单过滤） |
| 单项结构：缺 dataSetId/dataSetSource | 每项写入 `{dataSetId, dataSetSource, fieldId, format, formatValue}`；切数据集时同步回写 `cellData.dataSetSource` |
| 主字段是否在数组中（示例 qty/qty） | 确认为语义 B 完整清单制：首项固定主字段占位；进入二维码模式自动预置首项，主字段变更重建首项并剔除重复追加项 |
| 校验口径 | 各处校验均跳过首项主字段占位，仅校验追加项；空清单=旧行为直接放行 |

涉及文件：`cellMetas.ts`、`QrExtraFields/{types,index}.tsx`、`fieldForms.ts`、`utils/field.ts`、`utils/valid.ts`、`design/utils/load.ts`、`topHeaderTitle/utils.ts`；测试 `tests/qr-extra-fields.test.ts` 与可执行验证 `tests/verify-qr-logic.mjs`（7 组用例全过）。另记录：契约中出现 `otherShowType: 'bar_code'` 与新字段 `encodeType`，超出本需求范围，暂不实现。

## 非目标

- 不改预览/打印渲染管线（后端职责）；不做 7.0 组件库（@newgrand/udp-report-table）侧改造；不同步 6.5.1-dev（后续另立计划）；不改设计画布展示。
