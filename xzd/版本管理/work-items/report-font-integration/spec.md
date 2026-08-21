---
tags:
  - report-table
  - spec
  - work-item
status: ready-for-human
date: 2026-08-17
updated: 2026-08-17
source_requirement: R-260528-000001
implementation_status: complete
verification_status: pdf-pending
---

# R-260528-000001 报表/打印字体配置对接

相关：[[report-table-同步术语表]] · [[report-table-ADR-0002-报表字体字段兼容双写]] · [[report-table-ADR-0003-字体清单与静态资源契约]] · [[00-版本总览]]

## 目标

为 `udp-report-table` 的报表设计、报表预览、打印设计表体、打印预览和打印页眉页脚接入统一的 10 字体清单。字体文件从 `/NG3Resource/reportcenter/fonts/{文件名}` 按需加载；表体 Cell 新增 `fontFamily` 标准名称，同时保留现有字体 class 兼容旧数据和当前渲染链路。

## 字体清单

字体下拉显示中文名称，Cell 保存常规标准名称，静态资源 URL 使用文件名。Bold 文件是字重资源，不是独立下拉选项。

| 中文名称 | Cell `fontFamily` | Regular 文件 | Bold 文件 |
| --- | --- | --- | --- |
| 思源黑体-标准常规 | `Source Han Sans SC Regular` | `SourceHanSansSC-Regular.otf` | `SourceHanSansSC-Bold.otf` |
| 思源宋体-标准常规 | `Source Han Serif SC Regular` | `SourceHanSerifSC-Regular.otf` | - |
| 朱雀仿宋 | `Zhuque Fangsong` | `ZhuQueFangSong.ttf` | - |
| 霞鹜新致宋 | `LXGW Neo ZhiSong` | `LXGWNeoZhiSong.ttf` | - |
| 汇文仿宋 | `HuiWen Fangsong` | `HuiWenFangSong.ttf` | - |
| 汇文正楷 | `Huiwen-Zhengkai` | `HuiWenZhengKai.ttf` | - |
| Arimo 西文无衬线常规 | `Arimo` | `Arimo-Regular.ttf` | - |
| Caladea 西文衬线-常规 | `Caladea` | `Caladea-Regular.ttf` | - |
| Carlito 西文无衬线-常规 | `Carlito` | `Carlito-Regular.ttf` | `Carlito-Bold.ttf` |
| Tinos 西文衬线-常规 | `Tinos` | `Tinos-Regular.ttf` | - |

本期清单是封闭集合，不加入系统字体或旧 `SongTi`。后续新增字体必须修改版本化前端清单并随前端发布。

## Cell 契约与迁移

新建 Cell 的默认字体为 `Source Han Sans SC Regular`。进入 `cells` 保存数组的新 Cell 必须显式写入：

```json
{
  "cellType": "text",
  "className": "htLeft htMiddle htFontFamily_SourceHanSansSC",
  "fontFamily": "Source Han Sans SC Regular",
  "row": 0,
  "col": 0,
  "cellName": "A1"
}
```

- `fontFamily` 保存字体族的常规标准名称；粗体和斜体继续由现有样式 class 表达。
- 新保存数据同时保留字体 class。读取时优先采用 `fontFamily`，缺失时才从旧字体 class 恢复。
- 两者冲突时只修正字体 class token，其他 class 原样保留；再次保存时写回一致的双份表示。
- 迁移按 Cell 来源执行，不增加报表级版本字段。从后端加载且缺少 `fontFamily` 的旧 Cell 保持缺失；新创建 Cell写新默认；旧 Cell 只有主动修改字体时才补字段。
- “清除样式”属于主动字体重置，选中 Cell 写入新默认字体并清除粗体、斜体等样式。
- 旧 `SongTi` 只作为存量报表兼容值，不进入新字体选项，也不自动映射为思源宋体。
- 未识别的字体标准名称原样保留并兼容显示，不猜测文件名、不请求未知资源、不加入正常选项；用户主动选择受支持字体后才替换。
- 复制、填充、导入和导出必须保留 Cell 是否具有 `fontFamily` 以及其原值，不得借数据流转批量迁移旧 Cell。

## 字重与斜体

- 所有字体均可加粗。思源黑体和 Carlito 使用真实 Bold 文件；其余字体由浏览器和 PDF 引擎合成粗体。
- 所有字体均可斜体，由浏览器和 PDF 引擎合成，不请求不存在的 Italic 文件。
- 加粗、取消加粗、斜体和取消斜体均不改写 `fontFamily`。

## 加载与渲染

- `NG3Resource/reportcenter/fonts` 是静态资源目录，不是返回元数据的 GET 接口；前端不增加字体列表请求。
- 打开报表时只加载实际引用的字体及字重；选择字体或启用真实 Bold 时加载新增资源；打开下拉框不下载全部文件。
- 同一字体文件 URL 在页面生命周期内只请求和注册一次。
- 首屏表格等待已引用字体加载成功或失败后稳定渲染；后续选择字体只等待当前样式操作，完成后重新计算布局并渲染。
- 加载失败时每个字体在页面会话内提示一次并使用 CSS fallback；不改写 `fontFamily`，刷新后允许重试。
- 字体文件内容以文件名为不可变标识；升级必须更换文件名。前端不添加随机缓存参数。

## 范围边界

- 报表设计、报表预览、打印设计表体、打印预览、打印页眉页脚共用字体清单和加载规则。
- `cell.fontFamily` 只加入表体 Cell。页眉页脚继续保存现有 `className`，不新增后端未声明字段。
- sheet 级 `reportFonts` 保持现有前端内部 ID 数组，不改名、不删除、不改成标准名称。
- 不修改 `rowHidden`、`colHidden` 的保存、加载或预览行为。
- 不增加字体运行时配置 prop 或公共导出；清单和静态目录是包内版本化契约。

## 验收

- 自动测试覆盖 10 字体映射、默认字体、双写、旧 Cell、逐 Cell 迁移、冲突优先级、未知字体、清除样式、真实/合成字重、资源去重和失败不改写。
- 覆盖设计保存、报表预览、打印设计表体、打印预览和页眉页脚字体选择；确认页眉页脚没有新增 `fontFamily`。
- TypeScript 检查、现有 `node:test` 测试、`udp-report-table` 包构建和 `git diff --check` 通过。
- 浏览器验证中文与西文字体的 Regular、真实 Bold、合成 Bold 和合成 Italic，并检查保存请求中的 `cell.fontFamily`。
- PDF 验证全部 10 个字体族的 Regular、思源黑体与 Carlito 的真实 Bold、至少一款合成 Bold，以及中西文各一款合成 Italic；对比浏览器预览的字形、换行和分页。
- 不验证后端直接打印。

## 非目标

- 不提供字体元数据查询接口。
- 不自动迁移全部存量报表或全部旧 Cell。
- 不把 Bold 文件做成独立字体选项。
- 不改变 sheet 级 `reportFonts`、页眉页脚 DTO、行列隐藏契约或公开组件 API。
- 不验证后端直接打印。

## 实施与验证记录

2026-08-17 已完成 `udp-report-table` 字体对接实现：固定 10 字体清单、Cell `fontFamily` 兼容双写、旧 Cell 来源标记、未知字体保留、按需加载、真实 Bold/合成样式、设计与预览渲染、打印页眉页脚字体加载均已接入。

已通过：

- `npx tsc -p packages/@newgrand/udp-report-table/tsconfig.check.json --noEmit`
- `node --test packages/@newgrand/udp-report-table/tests`：67/67 通过
- `npm run build --prefix packages/@newgrand/udp-report-table`
- `git diff --check`
- dumi 浏览器验证：10 字体下拉、默认思源黑体、思源宋体选择、Cell 字体 class 与内联 `font-family`、静态资源 URL 均符合契约。

PDF 验证待具备完整 report-web 宿主与字体资源的集成环境执行，当前本地环境存在三个外部阻塞：

- `/NG3Resource/reportcenter/fonts/SourceHanSansSC-Regular.otf` 与 `SourceHanSerifSC-Regular.otf` 返回 `200 text/html` 的 nginx 欢迎页，不是字体文件。
- 示例打印模板 `demo-print-001` 的 `printManage/getPrintDesign` 请求返回 HTTP 400。
- dumi 不提供 `/tableDesign/PrintManager/preview` 宿主路由，打印预览跳转后为“页面未找到”。

后续在集成环境按验收矩阵验证全部 10 个 Regular、思源黑体与 Carlito 真实 Bold、至少一款合成 Bold，以及中西文各一款合成 Italic；仍不验证后端直接打印。
