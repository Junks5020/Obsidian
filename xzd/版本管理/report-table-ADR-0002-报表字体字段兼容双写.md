---
tags:
  - report-table
  - ADR
status: accepted
date: 2026-08-17
---

# ADR-0002：报表字体字段采用兼容双写

当前设计器以字体 class 保存前端字体标识，后端打印契约则要求单元格通过 `fontFamily` 保存字体标准名称。我们决定：新保存数据以 `cell.fontFamily` 写入字体标准名称，同时保留现有字体 class；读取时优先采用 `fontFamily`，缺失时从旧 class 恢复。`fontFamily` 不保存字体文件名或前端内部 ID。这样既让后端打印/导出获得稳定契约，也避免旧报表和当前浏览器渲染链路在迁移期间失效。

相关：[[report-table-同步术语表]] · [[work-items/report-font-integration/spec]] · [[00-版本总览]]

## Consequences

- 新旧两种字体表示在兼容期内必须保持一致，保存与读取测试需要覆盖双写、优先级和旧数据回退。
- 结束双写前必须先完成存量报表迁移或证明旧 class 已无消费者。
- 新建报表默认使用 `Source Han Sans SC Regular`；加粗样式使用配套的 `SourceHanSansSC-Bold.otf` 资源。
- 旧报表单元格缺少 `fontFamily` 时保持既有宋体表现，不因加载或保存而批量改写为新默认字体。
- `fontFamily` 始终保存字体族的常规标准名称；加粗不把它改写为 Bold 标准名称，字重继续由现有字体字重 class 表达。
- 浏览器加载器将 Bold 文件注册为同一字体族的粗体资源；后端打印/导出按 `fontFamily` 与字重样式共同解析最终字形。
- 新建报表中，每个进入 `cells` 数组的单元格都显式保存 `fontFamily`；未主动选择字体时写入 `Source Han Sans SC Regular`。
- 旧报表中原本缺少 `fontFamily` 的单元格继续保持缺失；加载和再次保存都不得把它们批量补写成新默认值。
- 旧 `SongTi` 仅作为存量报表兼容值保留，不自动映射为思源宋体，避免字形和字宽变化破坏既有分页与版式。
- 当 `fontFamily` 与字体 class 冲突时，以 `fontFamily` 为权威，只替换冲突的字体 class token，保留对齐、字号、颜色等其他样式；再次保存时写回一致的双份表示。
- 只有 `fontFamily` 缺失时才从旧字体 class 恢复字体选择。
- 未识别的字体标准名称必须原样保留；前端仅提供带原标准名称的兼容显示，不将其加入正常字体选项，也不猜测文件名或请求未知资源。
- 用户未修改字体时，未知 `fontFamily` 原样保存；只有明确选择受支持字体后才替换。
- 本次不改变现有 sheet 级 `reportFonts` 字段：继续保存前端内部字体 ID 数组，不改名、不删除，也不替换成字体标准名称。
- `fontFamily` 新字段只进入表体 Cell 契约。打印页眉页脚共用字体清单和资源加载规则，但继续只保存现有 `className`，不增加后端未声明的同名字段。
- Cell 示例中的 `rowHidden`、`colHidden` 不属于本字体需求；行列隐藏继续沿用现有保存、加载和预览行为。
- 兼容迁移按 Cell 来源执行：后端加载且缺少 `fontFamily` 的旧 Cell 永久保持缺失；新创建 Cell 默认写入 `Source Han Sans SC Regular`；旧 Cell 只有用户主动修改字体时才补写该字段，不新增报表级版本标记。
- “清除样式”属于主动字体重置：对选中 Cell 写入 `Source Han Sans SC Regular` 并清除粗体、斜体等样式，因此允许它迁移旧 Cell；编辑非字体内容仍不得补写旧 Cell。
