---
id: BUG-20260804-001
type: bug
status: completed
commit: e4e5d3b49e476c2596bf142c59dc769cb38794e5
source_branch: 6.5.2-dev
created: 2026-08-04
updated: 2026-08-12
target_versions: [6.5.1-dev, 6.5.1, 6.5.2-dev, 6.5.2, ljx-7.0]
tags: [version-change, bug, report-web, preview, performance, lifecycle]
---

# BUG-20260804-001：预览表格虚拟化与资源清理回归

相关：[[REQ-20260727-001-qiankun-report-tab-performance]]、[[参考/故障模式]]、[[参考/故障记录]]、[[参考/调试盲区]]

## 问题与修复

- 问题现象：移除预览休眠与行隐藏功能后，打印预览重新全量渲染行列；全局表格注册表没有实例；筛选弹窗可能在卸载后残留；强制分页行标记不再显示。
- 根因：`c6210ffc8b9f67deaafab65d537bdf9cc3fd8832` 删除复合组件代码块时，把与休眠无关的虚拟化、实例注册、卸载清理和分页标记一并删除。
- 修复内容：恢复行列虚拟化、callback ref 注册/注销、筛选弹窗卸载清理和强制分页样式标记；复用共享 `rowHasForcePageBreak`；清理废弃的 `previewRowHideEnabled` 契约并增加回归测试。
- 分支适配：保留 6.5.2 的 `PreviewFloatImageLayer`、打印和 PDF 导出的 `floatImages` 参数，没有直接 cherry-pick 6.5.1 补丁。
- 影响范围：报表预览、打印预览、预览表格生命周期、强制分页视觉提示和相关回归测试；不涉及接口、数据库或持久化数据修复。

## Git 信息

- 6.5.2-dev Commit：`e4e5d3b49e476c2596bf142c59dc769cb38794e5`
- 6.5.1-dev 等价 Commit：`54e9d71ccd7adb6f1cb5cc05dc976289e33b4a4d`
- 回归来源 Commit：`c6210ffc8b9f67deaafab65d537bdf9cc3fd8832`
- 6.5.1-dev 对应回归来源：`7e899e02dac77bedc3b012c750ff050d012739e9`
- 6.5.1 回归移除提交：`9adef8e080f1f009a61275662b7fdb3addc608a4`
- 6.5.1 修复提交：`b7a8499925513072351c215e64013f3cab2e63c5`
- 合并方式：两个开发分支分别形成分支本地适配提交，避免覆盖 6.5.2 浮动图片逻辑。

## 版本同步

| 版本名称 | 是否需要同步 | 当前状态 | 合入 Commit | 验证结果 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 6.5.1-dev | 是 | 验证中 | `54e9d71ccd7adb6f1cb5cc05dc976289e33b4a4d` | 可运行测试及生产构建通过 | 等价修复来源 |
| 6.5.1 | 是 | 已同步 | `9adef8e080f1f009a61275662b7fdb3addc608a4` + `b7a8499925513072351c215e64013f3cab2e63c5` | 10 项聚焦测试、差异检查及生产构建通过 | 本地提交，尚未推送 |
| 6.5.2-dev | 是 | 验证中 | `e4e5d3b49e476c2596bf142c59dc769cb38794e5` | 18 项测试、格式检查、生产构建及双轴审查通过 | 当前提交，仅存在于本地分支，尚未推送 |
| 6.5.2 | 是 | 待同步 | - | - | Git 未包含当前修复 |
| ljx-7.0 | 待确认 | 待关联 | - | - | 预览表实现与 ng-design 组件联动，需单独评估 |

## 验证

- `tests/` 下 18 项 TypeScript 测试全部通过。
- 新增 `tests/preview-table-regression.test.ts`，覆盖虚拟化、生命周期、分页标记、废弃契约移除和浮动图片层保留。
- Prettier 与 `git diff --check` 通过。
- `npm run build`：Webpack 生产构建成功。
- Standards 与 Spec 双轴代码审查均无发现。
- ESLint 受仓库既有缺失依赖 `eslint-config-prettier` 阻塞。
- 未进行真实业务报表的浏览器交互验证；React ref/effect 时序和分页视觉效果仍需页面验收。

## 回归复盘

- 原始目标：删除不稳定的预览休眠和行隐藏功能，同时保留单元格溢出提示。
- 新增回归：误删虚拟化、表格注册与卸载清理、筛选弹窗清理和强制分页标记。
- 分类：遗漏独立不变量、遗漏消费者、复合职责代码块删除范围过大。
- 预防：删除功能前按职责分类代码，并同时断言“旧功能不存在”和“独立保障仍存在”。

## 同步结论

当前修复已同步到 `6.5.1` 本地发布分支，尚未推送；`6.5.2` 仍待同步，7.0 需要按 ng-design 架构另行确认。
