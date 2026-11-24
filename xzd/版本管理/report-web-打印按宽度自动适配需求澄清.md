---
tags:
  - report-web
  - 打印
  - 需求澄清
status: confirmed
date: 2026-11-04
updated: 2026-11-05
---

# 打印按宽度自动适配需求澄清

相关：[[00-版本总览]] · [[report-web-术语表]] · [[report-table-ADR-0009-第一阶段只提供打印数据默认pdfmake消费]]

## 原始需求

打印设置的缩放比例后新增复选框“将内容自动缩放到一张纸上（按宽度计算）”；勾选后手动缩放比例只读，打印时按纸张大小自动计算比例，让横向内容在同一张纸内显示。

## 已确认

- 2026-11-04：用户确认首版**只缩小，不放大**；内容不超出可打印宽度时，不因自动适配而放大到超过 100%。
- 2026-11-04：用户确认**横向一页，纵向允许多页**；全部列适配到同一页宽度，行数多时按纸张高度正常分页，不把整份报表压缩成单页。

- 2026-11-04：用户确认自动模式独立计算比例，保留原手动缩放值；勾选时手动输入只读，自动计算结果不覆盖该值，取消勾选后恢复使用原手动值。

- 2026-11-04：用户确认纵向/横向均生效，按当前纸张方向扣除左右页边距后的可打印宽度计算，自定义纸张同样支持；纸张、方向、页边距变化后按新配置重新计算。

- 2026-11-04：用户确认只实现 7.0 链路：`udp-report-table` 增加并保存选项，`report-web` 宿主 PDF/打印应用自动缩放；不向 6.5.1/6.5.2 等其他分支同步，不发包或部署。

- 2026-11-04：用户确认选项作为模板配置持久化，新模板及缺少该配置的旧模板均默认不勾选；未启用的模板保持既有手动缩放与分页行为。

- 用户确认自动缩放允许低于手动输入的 50% 下限；超宽模板以横向完整容纳为优先，接受文字可能变小。该答复于 2026-11-05 记录。

- 2026-11-05：用户确认当前打印范围内的空白列保留并计入总宽度，不自动裁剪；本功能不改变原有打印范围。

- 2026-11-05：用户确认浮动图片超出表格右边缘的部分也计入适配宽度，图片与表格一起等比例缩小，避免仅表格适配而图片被截断。

- 2026-11-05：用户确认原有纵向强制分页继续生效；自动适配不取消指定行另起一页的规则，即使缩小后上一页仍有剩余空间。

## 已整体确认的实施基线

- 隐藏行列沿用既有打印规则，以实际参与打印的布局计算宽度，不因本功能恢复隐藏内容或重定义打印范围。
- 验证覆盖：默认关闭与旧模板兼容、开关及手动值保留、配置保存回读、窄表保持 100%、超宽表低于 50%、纵横方向、自定义纸张、页边距变化、空白列、浮动图片右侧溢出、纵向多页与强制分页、打印与 PDF 导出一致性。
- 用户已明确整体确认：“可以根据这个进行开始实现，使用子智能体进行实现，子智能体模型使用GLM-5.3-flash进行实现”。2026-11-05 再次要求继续实现，不再开展需求访谈。

## 环境事实

- 当前仓库 remote 为 `git@gitlab.newgrand.com:newgrand.techcenter/map/report-web.git`，工作树为 `ljx-7.0`。
- 宿主现有手动缩放输入范围为 50%–200%；PDF 设置处理按纸张方向与左右页边距计算内容可用宽度。
- 已读取项目索引与术语表；没有找到 report-web 专属 Agent 工作流配置。共享目录存在 ng-design 工作流配置，但不默认把其适用范围扩展为 report-web 的已确认约定。
- 既有 ADR-0009 将组件打印数据输出与宿主排版/打印职责分开，本功能需要分别核实实际入口。

## 授权状态

用户已整体确认并授权实施，仅限两个 `ljx-7.0` 工作树；不提交/推送、不发包/部署、不跨分支同步、不擅自重启服务。主智能体负责调查、拆分、审查及验收，业务实现由指定子智能体完成。最初指定 GLM-5.3-flash；2026-11-05 14:03（Asia/Shanghai）用户新增明确授权“可以使用deepseek-V4.1-flash进行子智能体进行开发”，现改由已核实的 `deepseek-official/deepseek-flash`（显示名 DeepSeek-V4.1-Flash）接续，取消等待 GLM 额度的阻塞。

## 实施跟踪（2026-11-05）

- 已查询准确模型：Provider `zai-coding-cn`，model `glm-5.3-flash`；已启动组件设置与宿主打印两个独立实现子任务。
- 基线：report-web `d7a4bac47815a67f9f1d2073ba83505575ff622b`；ng-design `56171ac26f0e4faab5ab19fc8c840d5fe8fdf002`。两仓分支均为 `ljx-7.0`，现存未跟踪文件、附件暂存测试及锁文件保留。
- 配置契约：`printConfig.page.autoFitWidth: boolean`，新模板默认 `false`、旧模板缺失视为关闭；`scaleRatio` 仅保存原手动值，自动比例只用于本次运行。
- 入口确认：设计设置来自组件库；宿主 TableManager/PrintManager 的 preview 仍消费宿主打印设置弹窗，两端 UI 均需覆盖。保存沿用按 sheet 的 `printSetting` JSON 结构。
- 写入划分：组件子任务仅写 udp-report-table 的 `printSetting/**` 与 `tests/**`；宿主子任务仅写 `src/components/report/print/**`、`src/components/report/printSetting/**` 与 `tests/**`。主智能体不代替指定模型实施业务代码。
- 验收基线：宿主 Node 18.20.0 全部 116 项测试通过。首次受 sandbox `spawn EPERM` 阻止，用户切换权限后实际重跑通过；不将首次失败认作业务失败。
- 浏览器访问既有候选地址 `http://localhost:8472` 返回 `ERR_CONNECTION_REFUSED`，尚不能进行真实业务页面验收；未启动或重启服务。
- 组件库基线：全量 554 项，552 通过、2 失败，运行时两仓业务 diff 均为空。既有失败分别为 KAN-14 合并冻结测试 `this.rootWindow.queueMicrotask is not a function`，以及边界测试缺少 `es` 下 `fieldColumnMap` typings；正在核实构建产物。不得将其隐瞒或计为本需求通过。
- 双仓构建基线尝试均未通过：组件 `npm run build` 在声明生成阶段因既有 `handsontable/settings` 缺失及 HotTableProps/CustomPlugin 类型错误失败；宿主 `npm run build` 在 Terser/esbuild 压缩阶段因临时文件 remove Access is denied 失败。尚不能宣称构建通过，未修改依赖或绕过权限。
- 组件首个子任务只完成调查，旧权限快照禁止外部仓写入，未改代码；用户已切换 danger-full-access 后，重新派发同一准确 GLM-5.3-flash 模型承接原计划。宿主子任务继续实现。
- 宿主初版已返回，主代理独立运行全量测试 134/134 通过（包含新18项），但审查发现阻断项，不能据此认定验收通过：真实 Checkbox 默认输出 1/0 与严格 boolean 消费不匹配；1% 硬下限可能导致极宽表越界；图片测量未过滤不参与打印的行锚点；关闭表格线时宽度口径不一致；无效可打印宽的降级路径不安全。另纠正 pdfmake 数字列宽不包含 padding 的源码事实。已再次委派同一准确 GLM-5.3-flash 修正及增加运行测试。
- 两个后续子任务在完成前异常退出，部分源码已写入但没有最终验收结果。主代理检查发现宿主修正中的 `setting.ts` 意外丢失嵌套默认值并变异原 page/paging，同时改了既有纸张/页脚计算，已明确要求新的同模型接续任务按 HEAD 恢复旧行为，只保留适配相关增量。组件实测调查发现 udp-ui 包装层会移除 readonly 属性，改用 computed disabled 保证不可编辑，仍需正式运行测试确认。
- 后续接续任务 acf6472a、61bddfe5 均异常退出且无结束说明。2026-11-05 用户要求继续后，主代理确认命令通道可用、模型目录仍列出准确 `zai-coding-cn/glm-5.3-flash`；只读短探针 001b2304（读取20行并回复）也异常退出且无错误详情，正在用仅回复 OK、不调用工具的最小探针区分模型启动与工具执行问题。不能据无堆栈通知推断额度、认证或网络根因，也不能把早期明确的旧沙箱拒绝推广到后续失败。
- 最新复现：`node --test tests/print-auto-fit-width.test.cjs tests/print-runtime.test.cjs` 共9项，8通过1失败；auto-fit 测试因部分改动新增 `./index` 依赖而在装载时报 MODULE_NOT_FOUND，既有 print-runtime 8项仍通过。当前代码不是此前134全通过的版本。另 `handlePrintPagingCfg` 在 index.ts 未导出，业务依赖也需修复，不能只补 mock。
- 自动续行第1轮追加只读诊断：最小纯文本探针 b2d15806 的持久会话快照确认 provider/model 正确，权限为 danger-full-access/approval never，tokenUsage 和 costUsage 的输入输出均为0，lastTurnCompleted=false，settledMs=19564。这只证明约19.6秒内未记录成功模型响应，不证明具体HTTP错误。未读取凭证、修改模型配置或重启服务。现有工具未提供子任务错误明细能力；底层压缩事件为专用帧格式，通用 zstd 解码仅得到会话头，不能以此声称不存在错误事件。
- 自动续行第2轮已定位确切原因：按独立 zstd 帧只读解码失败任务事件，f45936b9（第36步中途）、acf6472a（首步）、b2d15806（仅回复OK探针）的最终错误均为 HTTP 429 / provider code 1308 / RATE_LIMIT：`已达到 5 小时的使用上限。您的限额将在 2026-11-05 14:07:46 重置。` 运行器自动重试5次后结束。这是后续连续失败的已证实原因，区别于最早组件任务的旧沙箱权限拒绝。2026-11-05T13:55:34+08:00 本机采样尚早于提示重置时刻；不在额度窗口内重复派发无效任务。服务错误文本未显式注明时区，记录原文、不承诺该时刻必然恢复。
- 2026-11-05 14:03 后：依据用户新增授权，将目标恢复为 active，准确选择 `deepseek-official/deepseek-flash`（high）。宿主接续子任务 `10e591c4-0184-437c-9020-eefa70eec3b0`，组件接续子任务 `24141ad3-1038-499d-8fc3-323dad793129`，分别限定原两仓写入范围；已明确交接全部已知回归、测试基线和保护清单。
- 14:21 宿主 DeepSeek 子任务返回，修复默认值/变异及模块循环（rowHeight 独立、paging共享），修正布尔开关和 grid-off 居中，两入口带 globalSettings 并拒绝无效可打印宽；主代理独立执行 `node --test tests/*.test.cjs`，141/141通过，含25项适配测试及3例真实pdfmake渲染。该结果仅代表当时树，不代表双仓验收完成。
- 主代理复核发现小计行浮图仍被无条件计入，即使该小计不出现在任何 logicalRows；已派同模型接续任务 `1122ecc8-392b-4813-8a3f-afaaa98a7c74` 用无关联bodyRange等fixture复现并修正，补页脚/标题条件验证。组件正式运行测试任务仍未返回；宿主UI目前只有源码断言，仍需补真实交互验证。
- 宿主小计接续修复以真实 logicalRows/placement 复现无bodyRange小计图、无正文表尾图被错误计宽；主代理独立专项29/29通过（Node缺 Image 使用pdfmake fit fallback，不能当真实浏览器验证）。子任务报告分页高度依赖比例循环和跨页TBODY非空仍为保守近似，可能多计未打印图；尚需评估而非宣称严格精确。
- 组件接续任务完成，真实NGForm/JSDOM发现 computed 在测试环境没有即时触发禁用，已改状态驱动，主代理独立真实交互及保存回读4/4通过（测试有组件重复id和React ref警告）。子任务报告全量558项556通过2项与基线相同；尚未主代理独立复跑全量。宿主同款 computed 的真实交互专项另由 `b1270e84-18bc-46d1-a926-cee0dae51296` 测试，不得假定有效。
- 15:00 用户要求删除宿主 node_modules 按锁文件重装，用户已停止8472服务。普通 `npm ci --dry-run --ignore-scripts` 遇既有 peer 冲突（ng-business-component 6.520.154 依赖 udp-ui ~6.520.146，而宿主锁为7.0.62）；`--legacy-peer-deps` dry-run exit 0，Node18对pdfmake/@utoo需Node20有engine警告。用户明确授权 legacy 方案。宿主测试子任务 b1270e84 因看到依赖被并发清空自行启动 `npm ci --ignore-scripts --legacy-peer-deps`，主代理发现后暂停自身安装避免互相清理，待该进程结束后验证/补执行项目脚本。曾尝试向subagent UUID send_message但工具报告active teammate not found，未假定消息送达。
- 15:05 宿主依赖恢复：用户授权后，子任务完成 `npm ci --ignore-scripts --legacy-peer-deps --no-audit --no-fund`；主代理在无并发安装时使用工作树 `.local-temp` 补跑 `npm rebuild --legacy-peer-deps --no-audit --no-fund` 和 `npm run postinstall`，均 exit 0，pdfmake patch 应用成功、max setup完成。独立验证 ng-business-component 6.520.154、udp-report-table 7.0.30、udp-ui 7.0.62，SingleEmpHelp.js 和 MultipleEmpHelp.js 均存在；原 mock 数据以工作树临时目录经真实 esbuild 转换通过。package-lock无修改；`.local-temp` 用户此前创建且有 core-js-banners，未删除，提醒不提交。未启动8472服务，完整页面启动仍待用户验证；peer兼容风险及Node18不满足部分Node20 engine声明仍存在。
- 宿主UI子任务报告真实交互2/2通过，旧值缺失时表单为未勾选空字符串、规范化层为false；其测试需jsdom，依赖安装完成后必须独立复测并核查干净锁文件可用性。
- 当前：DeepSeek-V4.1-Flash 业务完成后的最终双仓审查仍未完成，不提交发布。
