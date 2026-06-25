# NotePadTemplateMarketFE 项目亮点

## 项目概述

NotePad 模板市集前端 SPA，一款嵌入 iOS/Android 原生 App（WebView）的移动端数字商品商城。支持模板、贴纸、字体、调色板四类数字商品的浏览、搜索、购买（原生 IAP 内购）和下载使用。适配 iPad (1194px) 和 iPhone (393px) 双端设计稿。

---

## 技术栈

| 类别 | 技术选型 |
|------|----------|
| 框架 | React 19.2 + TypeScript 5.9 |
| 构建 | Vite 7.3 |
| 样式 | Tailwind CSS 3.4 + postcss-pxtorem |
| 状态管理 | Zustand 5.0 (14 个独立领域 Store) |
| 路由 | React Router DOM 7.13 |
| 国际化 | i18next 25 + eager glob 同步加载 |
| 网络层 | Axios + 7 层洋葱拦截器 + AES-256 加密 |
| 原生桥接 | DSBridge 3.1 |
| 测试 | Vitest + Testing Library |
| 编译优化 | React Compiler (babel-plugin-react-compiler) |

---

## 亮点一：React 19 + React Compiler 编译时优化

**技术价值**：利用 React 19 的 Compiler 在编译阶段自动分析组件依赖并注入 memoization，无需手动编写 `useMemo` / `useCallback` / `React.memo`，从源头消除人为遗漏导致的性能退化。

**实现方式**：
- 通过 `babel-plugin-react-compiler` 在 Vite 构建流程中启用 React Compiler
- 编译器在构建时自动对组件进行静态分析，识别 props/state 依赖关系
- 生成等价于手动添加 `React.memo` + `useMemo` 的优化代码
- 开发者只需关注业务逻辑，框架保证最优渲染策略

---

## 亮点二：AES-256 全链路加密通信

**技术价值**：在 WebView 嵌入式场景下，所有 HTTP 请求体和响应体均经过 AES-256-ECB 加密，防止中间人抓包获取明文数据，保障数字商品交易和用户数据安全。

**实现方式**：
- `services/http/aesCipher.ts`：基于 crypto-js 实现 AES-256-ECB + PKCS7 填充的加解密核心
- `services/http/aesBinary.ts`：提供声明式 API 端点定义框架，每个端点自定义 `buildPayload` / `encodeRequest` / `decodeResponse`
- **双模式编码**：中国区使用 Base64 字符串传输（text responseType），国际区使用二进制 ArrayBuffer 传输
- 在 Axios 拦截器链中通过 `aesBodyEncryptInterceptor` 自动加密请求体，通过 `transformInterceptor` 自动解密响应
- 原生桥接获取的 `x-d-i` 动态加密头（`xDiHeaderInterceptor`）进一步增强安全性

---

## 亮点三：洋葱模型拦截器架构 + 请求治理

**技术价值**：7 层可组合的 Axios 请求/响应拦截器形成洋葱模型，实现关注点完全分离；配合指数退避重试和基于 AbortController 的请求去重，构建了企业级网络层。

**实现方式**：

**请求拦截器链（由外向内）**：
1. `runtimeEnvironmentInterceptor` — 根据原生桥接环境动态注入 baseURL / timeout / retry 配置
2. `tokenInterceptor` — 从 localStorage 注入 Bearer Token
3. `xDiHeaderInterceptor` — 从原生桥接获取设备指纹加密头 `x-d-i`
4. `cancelInterceptor` — 基于请求 URL+方法+参数 生成缓存 key，通过 AbortController 取消重复请求
5. `aesBodyEncryptInterceptor` — 请求体 AES-256 加密
6. `apiRequestLogInterceptor` — 请求日志记录

**响应拦截器链（由内向外）**：
7. `transformInterceptor` → `businessErrorInterceptor` → `errorInterceptor`

**辅助机制**：
- `services/http/retry.ts`：指数退避重试，对 408 / 5xx / 网络错误自动重试
- `services/http/cancel.ts`：请求去重，pending 中的相同请求自动取消前一个

---

## 亮点四：稳定的 Zustand 状态快照合并

**技术价值**：解决分页数据加载时整个列表引用变化导致的全量重渲染问题。当新数据到达时，通过 JSON 快照对每个 item 进行深度比较，保留未变化 item 的引用，确保只有真正变更的 item 触发渲染。

**实现方式**：
- `store/snapshotUtils.ts` 提供 `mergeStableArrayByKey` 和 `mergeStableArrayByIndex` 两个工具函数
- 以 `mergeStableArrayByKey` 为例：
  - 对旧数据和新数据每个 item 做 `JSON.stringify` 快照对比
  - 若快照相同，保留旧 item 的引用（React 认为未变化，跳过渲染）
  - 若快照不同，使用新 item（触发对应组件渲染）
  - 新增或删除的 item 正确处理
- 在 `useColumnHomePageStore`、`useStickerStore` 等分页数据 Store 中广泛使用
- 配合 React 的引用相等性比较，实现零额外开销的细粒度更新

---

## 亮点五：自定义 KeepAlive 布局 + 路由级滚动恢复

**技术价值**：在 React Router 原生不支持 KeepAlive 的条件下，实现了"首页保活 + 详情页切换"的类原生导航体验，同时自研滚动位置恢复系统解决 WebView 中浏览器原生 `scrollRestoration` 不可靠的问题。

**实现方式**：

**KeepAlive 布局**（`components/layout/RootKeepAliveLayout.tsx`）：
- 首页通过 `position: fixed; visibility: hidden; pointerEvents: none` 隐藏但不卸载
- 保留所有组件状态、滚动位置和 DOM 节点
- 退出详情页时移除隐藏样式，配合 `useLayoutEffect` 精确恢复滚动位置

**滚动恢复系统**（`hooks/useHistoryEntryScrollRestoration.ts`）：
- 以路由 pathname + search + state key 作为 entry key
- 离开页面时通过 `getBoundingClientRect` 捕获滚动位置
- 返回页面时通过 `requestAnimationFrame` 轮询 + 超时兜底机制恢复滚动
- 处理 navigation type（POP vs PUSH）、history 返回追踪
- 与 KeepAlive 布局的 `skipNextCleanup` 机制协作，避免竞态条件
- 支持 window 和自定义元素两种滚动容器

---

## 亮点六：原生桥接层抽象 + IAP 购买流程

**技术价值**：将原生通信（DSBridge）、IAP 内购、下载管理等复杂跨端逻辑封装为清晰的服务层，对业务层屏蔽 WebView 环境和多平台差异。

**实现方式**：
- `services/bridge.ts`：封装 DSBridge 双向通信
  - 支持同步/异步方法调用
  - Payload 规范化（snake_case → camelCase）
  - WebView 运行时环境检测
  - 原生能力检测（`hasNativeMethod`）
  - 多种资源类型映射（Web type → Native type → Bridge type，"colorCard" → "palette" 等术语翻译）
- `services/purchase.ts`：IAP 购买流程编排
  - 调用原生 `purchaseResource` 方法
  - SKU 价格查询支持双通道（同步/异步桥接方法）
  - 购买状态追踪（`activeKey` + pending/completed 确认）
- `services/downloadAction.ts`：下载状态管理
  - 进度追踪持久化（跨会话恢复）
  - 下载完成后的创建意图恢复（`resourceAction.ts`）
- `services/bridgeDevMock.ts`：开发环境原生桥接 Mock，支持脱离原生 App 独立开发调试

---

## 亮点七：构建时条件编译（vConsole 防护 + 主题预注入）

**技术价值**：通过构建时机制确保调试工具和生产代码的彻底隔离，并消除页面加载时的主题闪烁（FOUC）。

**实现方式**：
- **vConsole 防护**（Vite 插件 `createMasterVConsoleGuardPlugin`）：
  - 自定义 Vite 插件在 `writeBundle` 阶段检查产物
  - 若检测到 master 分支构建中包含 vConsole 代码，直接抛出构建错误
  - 双重保险：`vconsole` 模块在 master 构建中被 alias 到空 Stub 模块
  
- **主题预注入**（`index.html` 内联脚本）：
  - 在 `<head>` 末尾内联 `<script>` 读取 localStorage 中的主题配置
  - 在首帧渲染前将 CSS 变量注入 `:root`，消除亮/暗模式切换时的闪烁
  - 同时内联 WebView 崩溃恢复检测脚本

---

## 亮点八：多环境构建矩阵

**技术价值**：一套代码支持 10+ 种构建变体，覆盖不同地区、环境、平台和展示模式的组合，且通过配置驱动而非代码分支。

**实现方式**：
- 环境维度：dev / staging / production
- 地区维度：CN（中国区）/ Global（国际区）
- 展示维度：标准 Web / iframe 嵌入
- 平台维度：iOS / Android Mock
- 通过 `scripts/dev.mjs` 智能启动脚本 + Vite `mode` + 环境变量组合驱动
- 每个环境的 API 基础 URL、超时、重试配置在 `services/appEnvironment.ts` 中集中管理
- 支持从原生桥接自动检测实际运行环境（TestFlight / IPA / Debug）

---

## 亮点九：同步国际化方案

**技术价值**：不同于主流 i18next 的 HTTP 异步懒加载方案，采用 Vite `import.meta.glob` eager 模式将所有语言包在构建时打包进 JS Bundle，消除运行时网络请求，确保 WebView 离线场景下国际化正常工作。

**实现方式**：
- `locales/index.ts` 使用 `import.meta.glob('./locales/**/*.json', { eager: true })` 同步加载所有语言文件
- 语言切换通过 URL query 参数 `?lang=` 驱动
- `utils/i18n.ts` 提供 `resolveI18nText` 函数处理后端返回的多语言文本对象（含多级回退）
- 路由导航辅助函数 `withLanguageSearch` 确保语言参数在页面跳转时不丢失

---

## 简历项目经历

> **NotePad 模板市集 · 前端开发**  
> *202X.XX — 至今*
> 
> 负责 NotePad 数字商品商城（模板/贴纸/字体/调色板）的前端架构设计与开发。项目为 React 19 + TypeScript SPA，嵌入 iOS/Android 原生 App WebView，面向百万级用户。
> 
> - **技术栈**：React 19 (Compiler) + TypeScript + Vite + Zustand + Tailwind CSS + i18next + DSBridge
> - 基于 **React Compiler** 实现编译时自动渲染优化，消除手动 memoization 的人为遗漏风险
> - 设计 **AES-256 全链路加密通信**架构，请求/响应体均经 ECB 加密，支持 Base64 / 二进制双模式传输，保障交易数据安全
> - 构建 **7 层洋葱模型 Axios 拦截器链**，实现动态环境注入、Token 管理、设备指纹加密头、请求去重（AbortController）、AES 加解密、指数退避重试，形成可组合的企业级网络层
> - 自研 **Zustand 快照合并算法**，对分页数据做 item 级 JSON 快照对比，保留未变化引用，消除全量列表重渲染
> - 实现 **自定义 KeepAlive 布局** + **路由级滚动恢复系统**，解决 WebView 中浏览器原生 scrollRestoration 不可靠的问题，提供类原生导航体验
> - 封装 **原生桥接抽象层**（DSBridge），统一 IAP 购买、下载管理、环境检测等跨端通信，对业务层屏蔽 WebView 平台差异
> - 设计 **多环境构建矩阵**（dev/staging/prod × CN/Global × web/iframe），配置驱动 10+ 构建变体，配合构建时 vConsole 条件编译防护确保生产安全
> - 采用 **同步国际化方案**（eager glob），所有语言包构建时打包，保障 WebView 离线场景下国际化可用性

---

## 核心文件索引

| 文件 | 说明 |
|------|------|
| `src/main.tsx` | 应用入口：启动引导、vConsole 初始化、rem 适配、原生桥接、主题恢复 |
| `src/router/index.tsx` | 路由配置：懒加载 + Suspense + KeepAlive 布局 |
| `src/services/http/interceptors.ts` | 7 层洋葱拦截器实现 |
| `src/services/http/aesCipher.ts` | AES-256-ECB 加解密核心 |
| `src/services/http/aesBinary.ts` | AES 二进制端点定义框架 |
| `src/services/http/retry.ts` | 指数退避重试 |
| `src/services/http/cancel.ts` | 请求去重（AbortController） |
| `src/store/snapshotUtils.ts` | 稳定快照合并算法 |
| `src/components/layout/RootKeepAliveLayout.tsx` | KeepAlive 布局 |
| `src/hooks/useHistoryEntryScrollRestoration.ts` | 路由级滚动恢复 |
| `src/services/bridge.ts` | DSBridge 原生桥接封装 |
| `src/services/purchase.ts` | IAP 购买流程 |
| `src/theme/applier.ts` | CSS 变量应用与派生 |
| `src/locales/index.ts` | 同步 i18n 初始化 |
| `src/services/appEnvironment.ts` | 多环境运行时配置解析 |
| `scripts/dev.mjs` | 智能开发启动脚本 |
| `index.html` | 主题预注入 + WebView 崩溃恢复内联脚本 |
