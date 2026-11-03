---
tags: [ng-design, udp-report-table, requirement, 提交追踪]
status: 验证中
date: 2026-10-26
updated: 2026-10-26
---

# REQ-20261026-002 报表字段编码与查询显隐同步

## 需求与范围

按用户要求补齐 report-web 13 项核查中的已确认缺口。来源为 report-web:6.5.2-dev `cb462b629709ad9550d835df99c2a430164ee40f`，目标是 ng-design:ljx-7.0 的 udp-report-table。

- 打印字段归一化增加树标签“展示名(编码)”，保持字段绑定及拖入标题；排除自定义数据集、流转历史和流程确认事项。
- 包内新增 queryVisibility 公共纯函数：0/1 契约、系统参数豁免、必填及传递引用锁定、按身份合并隐藏布局。
- 设计查询右侧表单增加默认隐藏开关和锁定提示，字段允许列表保留 hidden，确认时统一校正锁定条件；设计预览参数跳过隐藏项。
- 宿主的批量树入口、查询设置 UI、运行时保存与导出权限配置见对应 report-web 记录。

## 需求提交

| 提交 | 分支 | 用途 | 验证 |
| --- | --- | --- | --- |
| `9287cc99a80e150176359ae45bb587b4a8f0b3b5` | ljx-7.0 | 组件实现及测试 | 345/345 测试、组件完整构建、pre-commit 与提交差异检查通过 |
| `4dd06815951b2f285adf31fc0e688f4e8bc271c5` | ljx-7.0 | 2026-10-27：修复十字高亮、查询必填即时联动及确认事项排除名称 | 提交前针对性测试 5/5、pre-commit 通过；前轮完整组件测试 347/347 与构建及本地浏览器复测通过 |

## 验证及交付

- 新增三项回归先失败后通过，覆盖打印编码展示与绑定、必填/传递引用锁定、隐藏配置身份合并。
- 组件全量 tests/*.test.cjs：345/345，通过 Node --no-experimental-global-navigator 运行；原始 Node 默认 navigator 只读会导致既有 JSDOM 测试失败，未修改这些测试的环境契约。
- npm run build --workspace=@newgrand/udp-report-table：通过 es/lib 及类型生成。首轮发现 fieldShowName 的类型声明缺失，补齐后构建通过。
- 当前源码包 package.json 版本未递增、未发包。report-web 安装的 7.0.24 以 patch-package 承接本次相关构建文件，不改组件依赖版本。
- 88 项宿主测试和浏览器夹具验证见宿主记录，后台持久化及真实打印结果仍待验收。
- 用户要求先提交组件库后，已以 `9287cc99a80e150176359ae45bb587b4a8f0b3b5` 提交 10 个组件源码和测试文件，未推送、未发包；采用 commit --only 保留原有 29 个附件暂存文件，未纳入 core、代理或宿主改动。

## 分支状态

| 分支 | 状态 | 目标提交 |
| --- | --- | --- |
| sync_branch | 待关联 | 实际工作树当前为 ljx-7.0 |
| ljx-7.0 | 验证中 | `4dd06815951b2f285adf31fc0e688f4e8bc271c5`，包含前序需求提交；2026-10-27 已推送 origin/ljx-7.0，未发包 |

## 2026-10-27 组件提交

后续推送结果：用户授权推送后，已正常推送至 origin/ljx-7.0；git ls-remote 确认远端提交为 `4dd06815951b2f285adf31fc0e688f4e8bc271c5`。包含前序提交 9287cc99a80e150176359ae45bb587b4a8f0b3b5；未发布 npm 包，宿主工作区未提交。

按用户要求，三处追加修复已提交为 `4dd06815951b2f285adf31fc0e688f4e8bc271c5`，仅包含 5 个报表源码和测试文件，尚未推送或发布。使用 commit --only 明确文件列表，提交前后附件暂存差异 SHA256 一致；其他组件、代理与宿主工作区未纳入。目标分支沿用已指定的 ljx-7.0。组件报表目录提交后干净；宿主安装补丁仍未提交。
| ljx-6.5.2 | 待关联 | - |
| 6.5.2 | 待关联 | - |
| ljx-6.5.1 | 待关联 | - |
| 6.5.1 | 待关联 | - |

## 关联 Bug 修复

暂无独立 Bug 提交，用户已指定 7.0 同步目标。

相关：[[../01-提交覆盖矩阵]] · [[../../report-web/变更记录/REQ-20261026-002-report-sync-gaps]]

## 2026-10-26 start:local 浏览器复核：尚未全部通过

用户切换 8472 为 start:local 后要求实测。webpack 模块表确认实际加载 `../../ng-design.worktrees/sync_branch/packages/@newgrand/udp-report-table/src/constants/queryVisibility.ts`、`src/preview/table/index.tsx`，不是安装包。使用 ego-browser TaskSpace 11，已关闭；未修改代码、未保存业务数据。

通过项：真实打印模板 `3080000000000062`、busPhId=16730 的普通表单数据集展示“物理主键(PhId)”；运行查询夹具的必填开关禁用、失败保存不关弹窗、成功隐藏及恢复 Edited local；设计端默认隐藏开关可操作，确认弹窗后必填项保存为 nullable=false/hidden=0；树夹具全部收起 hiddenRows=[1,2]、展开=[]；首行/首列/选区冻结及取消生效；真实打印列表编辑的 0/1/2 权限选项可选，APP 类型隐藏配置入口，已取消编辑。

发现三处边界：

1. **十字高亮没有可见底色**：将当前 sheet 的 crossHairHighlight 临时设 1、选 E4 后 A4/E1 均有 htCrossHair，但 background-image=none，底色透明。样式 `.udp-report-table .reportPreviewTable .handsontable td.htCrossHair` 不匹配；两个根类在同一节点上，而样式要求祖孙。透明兜底规则命中，--ht-crosshair-layer 为 transparent。截图 `C:/Users/jinxu/ego/report-local-regression-20261026/crosshair-local.png` 已查看，确认仅有普通选区框。
2. **设计端改为必填时隐藏开关未即时校正**：在查询设置中先开启默认隐藏，再取消允许为空；实际 queryForm 值 nullable=0、hidden=1，开关仍 checked=true、disabled=false。点击弹窗确定后顶层归一化将配置变为 nullable=false、hidden=0，保存保护生效，但即时 UI 状态仍不对。
3. **内置“确认事项”例外没有覆盖真实名称**：真实 listField 返回 name=确认事项、phId=workflow_confirm_item、dataSetSource=2，归一化后首字段为“办理者(username)”；当前排除名称仅有“流程确认事项”，未覆盖实际名称。流转历史（同为 source=2）则正确不带 treeFieldLabel。

运行查询、树结构、设计查询条件和高亮开关使用浏览器临时夹具；真实后台查询布局持久化、跨登录和打印/PDF未验收。这次复核不能据已有单测及构建认定全部修复。
## 2026-10-26 三处浏览器问题修复与复测

用户要求继续修复，目标仍为 ljx-7.0。本次追加修改尚未提交、推送或发布，不能将其归入已有提交 9287cc99a80e150176359ae45bb587b4a8f0b3b5。

- 十字高亮：预览样式同时覆盖根节点同含 udp-report-table/reportPreviewTable 和祖孙节点两种结构。实际 E4 选中后 A4/E1 命中蓝色背景渐变，非同行同列 A1 无渐变。截图：`C:/Users/jinxu/ego/report-local-three-fixes-20261026/crosshair-fixed.png`。
- 查询设置：将右侧表单逻辑绑定至自身 onValuesChange，返回校正后的 formValue。真实弹窗中开启默认隐藏后取消“允许为空”，立即得到 nullable=0、hidden=0，隐藏开关取消选中并禁用；重新允许为空后恢复可操作。
- 打印字段：内置排除名单补充接口实际名称“确认事项”，兼容内置后缀。真实模板 3080000000000062 / busPhId=16730 的确认事项及流转历史不再附加编码，普通表单仍显示物理主键(PhId)。

验证：新增回归先失败后通过；Node 18 完整组件测试 347/347，组件 es/lib 和类型完整构建通过。宿主安装补丁同步更新，88/88 宿主测试及 patch-package 应用通过。8472 webpack 模块确认使用组件本地源码；Ego TaskSpace 13 已完成并关闭。本次未保存报表、模板或查询布局至后台；测试中的查询配置和高亮开关只存在于浏览器内存，后台持久化与 PDF 验收边界保持不变。

