---
id: BUG-20260817-001
type: bug
status: implementation-complete
commit: pending
source_branch: sync_branch
created: 2026-08-17
updated: 2026-08-17
target_versions: [ljx-7.0]
tags: [version-change, bug, report-table, font, select, tooltip]
---

# BUG-20260817-001：字体下拉省略后缺少完整名称提示

相关：[[work-items/report-font-integration/spec]] · [[report-table-同步术语表]]

## 问题与修复

- 问题现象：报表设计器字体下拉的选中名称已经显示省略号，但鼠标悬浮后没有显示完整字体名称；打印页眉页脚字体选择器存在相同行为。
- 根因：Ant Design `Select` 只通过 CSS 提供省略样式，不会自动生成溢出提示；字体标签没有 `title` 或 Tooltip。外层通用工具栏 Tooltip 只显示“字体”，还会与字体名称提示竞争。
- 修复内容：新增共享 `FontOptionLabel`，复用 `@newgrand/udp-ui` 的 `Tooltip overflow`，由标签自身检测实际溢出；报表设计工具栏、未知字体兼容项和打印页眉页脚共同使用该标签；字体选择器关闭外层通用“字体”提示。
- 影响范围：只改变字体名称的悬浮提示，不改变字体选项值、选择回调、Cell 保存契约、字体资源加载或页眉页脚 DTO。

## 验证

- 运行时修复前：选中项 `clientWidth=60`、`scrollWidth=136`，父子节点均无 `title`，没有完整名称提示。
- 运行时修复后：窄选择器标签 `clientWidth=42`、`scrollWidth=118`，悬浮只显示“思源黑体-标准常规”；宽选择器 `clientWidth=198`、`scrollWidth=198`，悬浮不显示 Tooltip；下拉可正常打开。
- `node --test packages/@newgrand/udp-report-table/tests/report-fonts.test.cjs`：6/6 通过。
- `npm run build --prefix packages/@newgrand/udp-report-table`：通过。
- Prettier 检查与 `git diff --check`：通过。

## 环境说明

当前工作树 dumi 已在 `http://localhost:8002` 编译成功。完整设计器依赖的 `http://localhost:8887/reportcenter/reportDesign/findReportDesignDetail` 请求会超时，使工具栏处于加载锁定状态；因此悬浮行为使用同一 dumi 编译产物中的真实 `FontOptionLabel + Select` 最小页面完成验证，临时页面已删除。

## 自检

| 维度 | 分数 | 说明 |
| --- | --- | --- |
| 首次正确性 | 4/5 | 运行时验证识别并消除了外层“字体”Tooltip 竞争 |
| 范围准确性 | 5/5 | 覆盖设计器、未知字体兼容项和打印页眉页脚 |
| 最小改动 | 4/5 | 复用现有 Tooltip，仅增加共享标签和外层提示开关 |
| 副作用预测 | 5/5 | 字体值、回调、保存和加载契约均未改变 |
| 根因深度 | 5/5 | 在实际溢出标签层解决问题，而非依赖 Select 外层尺寸 |
| 合计 | 23/25 | 无已知功能回归 |
