---
tags: [report-web, bug, commit-tracking, pdf]
status: committed-local
date: 2026-10-24
updated: 2026-10-24
---

# 打印预览 loading、PDF 边框与依赖拖拽补丁提交

相关：[[../01-提交覆盖矩阵]] · [[xzd/版本管理/变更记录/FEATURE-20261021-001-report-border-line-style]] · [[xzd/版本管理/变更记录/BUG-20261023-001-report-dataset-drag-container]]

## 提交与范围

- 仓库：report-web；分支：ljx-7.0。
- 本地提交：`2f76b2944a60563ebae28fd97d109cd183d0e962`，`fix(report-web): 修复打印预览加载与PDF边框样式`。
- 用户授权提交当前宿主业务改动，共 9 文件；ngproxy.ini、.idea/ 保留未提交。当前分支相对已有远端跟踪引用领先 2 个提交，本次只新建上述提交，未推送。

## 问题与实现

- 打印预览宿主传入受控 loading，但请求链结束后未总是关闭，空数组/缺少当前 sheet 也可能抛错。updatePrintData 使用 finally 释放 loading，并对空 sheet/cells 做保护。
- PDF 原先仅写 border/borderColor，无法逐格保留 borderStyle。新增样式码、线宽与线段映射，pdfmake TableProcessor 补丁承接水平/垂直、合并与跨页边框，保留旧数据、隐藏边框和打印网格设置。
- 已安装 udp-report-table 7.0.23 的排序组件错用 getContainer，通过 ESM/CJS 补丁改为 helperContainer。组件源码修复见 ng-design 的 a863d07776b7ed81a8322d625188368a9243d284；此处提交宿主依赖包消费路径，不代表宿主已升级到该源码版本。
- package.json/lock 固定 pdfmake 0.3.10，增加 patch-package 8.0.0 和 postinstall；新增两个补丁及运行时回归测试。

## 验证与边界

- npm run test:architecture：73/73 通过，包含真实 pdfmake PDF/vector 输出检查、分页和合并边框、ESM/CJS 字段拖拽，以及打印 loading 回归。
- 两个补丁在当前已安装依赖上通过 git apply --reverse --check。未重新 npm ci，不能据此声明干净机器安装已实测。
- 源码/测试格式检查通过；源码及配置 git diff --check 通过。补丁文件嵌套 diff 的空白上下文触发普通 diff --check 告警，保留原补丁上下文以保证可应用性。
- npm run build：生产构建成功，退出码 0，输出 dist 与 index.html；日志为 C:/Users/jinxu/AppData/Local/Temp/report-web-build-20261024.log。存在 bundle 体积提示，未阻塞构建。真实业务打印机、浏览器 PDF 视觉效果和后端 Excel 导出未由本次提交流程验证。

## 分支覆盖

| 分支 | 提交 | 状态 |
| --- | --- | --- |
| ljx-7.0 | 2f76b2944a60563ebae28fd97d109cd183d0e962 | 验证中 |
| master | 无 | 待同步 |
| 6.5.1-dev / 6.5.1 / 6.5.2-dev / 6.5.2 | 未审计 | 待关联 |

未授权同步其他分支、推送、发包或部署。PDF 边框扩展关联 FEATURE-20261021-001；打印加载收尾和依赖拖拽为同批缺陷修复。
