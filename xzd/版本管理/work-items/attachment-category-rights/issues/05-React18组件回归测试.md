---
tags:
  - ng-design
  - work-item
  - testing
status: done
delivery: excluded-from-final-patch
date: 2026-08-14
updated: 2026-08-14
---

# 05 — React 18 组件回归测试

> 最终交付调整：测试基础设施、依赖、配置、脚本和测试文件不进入最终补丁；本 ticket 暴露的五类真实运行时修正继续保留在附件源码白名单内。见 [[ng-design-ADR-0002-附件权限补丁限定源码目录]]。

Parent: [[work-items/attachment-category-rights/spec]]

**What to build:** 建立与 React 18 组件匹配的 Jest 29/jsdom/Testing Library 测试入口，验证 01–04 的呈现、事件、异步初始化和 API 防线。

**Blocked by:** [[work-items/attachment-category-rights/issues/01-权限核心与纯函数测试]] · [[work-items/attachment-category-rights/issues/02-初始化与公共API]] · [[work-items/attachment-category-rights/issues/03-Table与共享链接入]] · [[work-items/attachment-category-rights/issues/04-Form-Label-Image接入]]

## Scope

- 在根 package scripts 提供 npm test；显式引入 Jest 29、jest-environment-jsdom 29 和 React 18 兼容的 Testing Library。纯权限测试继续用显式 tsx 并由统一入口调用。
- 不复用旧 umi-test 带入的 Jest 24 和 React 16 Enzyme；测试配置须明确 jsdom、模块转换和可重复的 mock 清理。
- 为 AttachmentButton、Toolbar、Table 行/批量操作、formAttachment list/tags/image、Label、Image 和初始化状态写组件测试。
- mock tableAttachInit、labelAttachInit、来源/工作流接口和上传/下载服务，断言未授权路径不请求资源、不写下载日志、不启动轮询。
- 覆盖 StrictMode、异步失败、重载清理、tab/typeId 切换、同一上下文快照、临时撤销、审批后删除、disabled 和 ZIP 永远隐藏。

## Checklist

- [ ] 将现有 attachment-permission.regression.ts 的旧 delete 提升断言改为独立撤销与既有删除两组断言。
- [ ] 对每个按钮值跑 0/1/2/缺失矩阵，断言 DOM、disabled、点击回调和服务调用。
- [ ] 断言 visible=0/1 不改变区域、列表、资源请求或授权结果。
- [ ] 断言 controlByType 全部类型/具体类型的逐记录判权、缺 typeId 按 0、ZIP 永远隐藏。
- [ ] 断言初始化 pending 清旧状态、failed 只提示一次、handleValid 拒绝确认。
- [ ] 让 npm test 在干净安装中一次通过，并保留测试命令和环境说明。

## Acceptance

- 根目录 npm test 同时通过纯逻辑和 React 18 组件测试；测试不依赖真实后端账号。
- 任何按钮的 2 都不在 DOM，0 在 DOM 但 disabled，1 可执行；handler 直接调用也不能越权。
- 资源、下载信息、下载日志和轮询在 view/download 不足时均不发生。
- React 18 StrictMode 下无重复保存、重复提示或状态泄漏，异步初始化顺序可重复。
- 旧 Jest/Enzyme 测试不被误认为本需求的通过标准。

## Implementation (2026-08-14)

- 依赖：jest@29.7、jest-environment-jsdom@29.7、ts-jest@29、@testing-library/react@16、
  @testing-library/dom@10、@testing-library/jest-dom@6、@types/jest@29、tsx@3 加入根 devDependencies；
  不复用 umi-test 带入的 Jest 24/Enzyme。
- 根 `npm test`（scripts/run-tests.js 统一入口）：先跑 attachment-permission（40 例）与
  attachment-init-state（6 例）tsx 回归，再跑 Jest 组件回归；任一步失败即整体失败。
- jest.config.js：jsdom、ts-jest（test/component/tsconfig.json）、moduleNameMapper 将
  @newgrand/udp-core 指向确定性 mock、less/css 桩、clearMocks；setup.ts 引入 jest-dom 与 act 环境标记。
- 组件测试 7 个文件 55 例：AttachmentButton 0/1/2 矩阵；Toolbar 按钮矩阵与 handler 防线
  （混合删除整体拒绝、临时撤销上下文、下载仅实际发起写日志、行级编辑/预览）；
  baseApi handlers（删除/下载/预览/保存/校验/编辑分类/共享配置/init failed）；
  NGTableAttachment 三态初始化与 StrictMode 去重、换单清理、过期初始化不落地、tab 快照切换；
  formAttachment failed 不渲染、聚合态行级判权、visible 不消费、disabled 锁；
  NGLabelAttachment 审批删除保护、临时撤销、下载门控、handleSave 不绑定 add；
  UploadImage view=0/2 不取 URL、不伪装 uploading、行级删除。
- 测试暴露并修复的真实缺陷：NGTableAttachment StrictMode 双初始化（重复请求/重复失败提示）与
  过期响应覆盖新会话；formAttachment failed 未整体不渲染；NGLabelAttachment 每次 getLabelAttach
  清空 provenance 导致临时撤销永远失效；baseApi handleValid 不处理数组分类树（必填校验失效）；
  UploadImage 无权限记录 url 为 undefined。
- 环境说明：Node 24 / npm 11；`npm test` 为唯一入口，外置流水线执行同一命令；
  组件测试不依赖真实后端账号，全部使用本地 mock。

相关：[[work-items/attachment-category-rights/issues/01-权限核心与纯函数测试]] · [[work-items/attachment-category-rights/issues/02-初始化与公共API]] · [[work-items/attachment-category-rights/issues/06-dumi验收与6-5-2登记]]
