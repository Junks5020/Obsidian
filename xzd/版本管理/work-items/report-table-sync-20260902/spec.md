---
tags:
  - report-table
  - functional-sync
  - work-item
status: resolved
date: 2026-09-02
updated: 2026-09-02
upstream_branch: report-web:origin/6.5.2-dev
upstream_sha: 9a7ee9720d472c3b45db371ecb5371e660917d9a
target_branch: ng-design:ljx-7.0
---

# udp-report-table 2026-09-02 功能型同步

相关：[[report-table-同步术语表]] · [[report-table-ADR-0001-跟随上游功能型同步]] · [[report-table-ADR-0005-第一阶段只交付组件库]] · [[report-table-ADR-0009-第一阶段只提供打印数据默认pdfmake消费]] · [[00-版本总览]]

## 已确认范围

本轮以 `report-web:origin/6.5.2-dev@9a7ee9720d472c3b45db371ecb5371e660917d9a` 为固定上游基线，仅同步以下三个具有组件库功能血缘、且目标实现仍缺失的变更：

1. `54f90c9f1ac9499324dd8635e619278a6ae0a17e`：缩小树状预览层级缩进。
2. `a60ce801d8188c97f025aee5f44041f159a78dc0`：修复合并单元格单边框失效。
3. `9e7d48c6ea244d524f4a9eddbe09adfaf44d3498`：右侧选择数据集时补齐 `dataSetSource`。

## 明确排除

- `78f7f0b4f6028a5c554f356ea15f29427e9f8f60` 的打印管理页面按 URL `busphid` 选中业务表单属于 `report-web` 应用层，不进入组件库。
- `8e41a84d1df5318daeeff8007d8b241677865200` 与 `9a7ee9720d472c3b45db371ecb5371e660917d9a` 修改应用侧 PDF 排版引擎；`udp-report-table` 不拥有该引擎，不移植其实现。
- `report-web` 本地 `6.5.2-dev` 领先远端的未推送提交未修改 `src/components/report/**`，不进入本轮范围。

## 已确认验收

- 三个同步项全部补自动化回归测试。
- 合并单元格单边框与右侧数据集 `dataSetSource` 使用行为测试；树状预览缩进验证最终样式值。
- 沿用现有 `node:test` 与 TypeScript 工具链，不引入新测试框架或依赖。
- 完成门槛为：全部现有 `node:test`、`tsconfig.check.json` TypeScript 检查、`udp-report-table` 包构建和 `git diff --check` 全部通过。

## 已确认提交策略

- 按三个上游功能拆成三个本地提交，每个提交同时包含实现与对应回归测试。
- 每个提交正文记录对应的 `report-web` 来源 SHA，便于审计与单独回退。
- 本轮只创建本地提交，不推送分支。

## 已确认发布边界

- 保持 `@newgrand/udp-report-table` 当前版本 `7.0.15` 不变。
- 不修改 `package.json`、锁文件或其他发布元数据；版本发布继续作为独立流程处理。

## 实施顺序

1. 同步树状预览层级缩进并补最终样式值回归测试。
2. 同步合并单元格单边框修复并补非对角合并区域行为测试。
3. 同步右侧数据集选择的 `dataSetSource` 修复并补选择、清空行为测试。
4. 执行完整验收门禁并审计最终差异、提交正文和未跟踪文件。

## 执行结果

| 目标功能 | 上游提交 | ng-design 本地提交 |
| --- | --- | --- |
| 缩小树状预览层级缩进 | `54f90c9f1ac9499324dd8635e619278a6ae0a17e` | `fc43cadd9fb85a30d782448fa7fb49ad93c7ab7f` |
| 修复合并单元格单边框失效 | `a60ce801d8188c97f025aee5f44041f159a78dc0` | `d19f61c6d038eff82758012d13662e2e83fd8ac4` |
| 右侧选择数据集时补齐 `dataSetSource` | `9e7d48c6ea244d524f4a9eddbe09adfaf44d3498` | `0e85e3b21b54f94e480e18fb8c4e42192323c5a6` |

- 7 个现有 `node:test` 文件共 77 项测试全部通过；三个同步项均有新回归覆盖。
- 两条 7 月遗留的 CSS Modules 断言已按 `abbef9c48` 后的当前普通类名行为与 [[report-table-ADR-0010-样式边界与自动加载]] 更新；未修改运行时代码。
- `npx -p typescript@5.6.3 tsc -p tsconfig.check.json --noEmit --pretty false` 通过。仓库内 TypeScript 4.4 无法解析当前 `@types/d3-dispatch`，因此沿用项目既有记录中的 5.6.3 验证方式，不修改依赖。
- `npm run build` 通过，ESM 与 CJS 各生成 311 个文件及声明。
- `git diff --check HEAD~3..HEAD` 通过；相对实施起点恰好 3 个提交，差异仅包含本包 3 个源码文件和 2 个测试文件。
- `@newgrand/udp-report-table` 版本保持 `7.0.15`，`package.json` 与 `package-lock.json` 未变化。
- 未推送。工作树中原有的 `udp-ui` 附件修改保持未暂存、未改动。
