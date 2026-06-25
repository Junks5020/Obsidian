# NotePadQuestionBankFE 项目亮点

## 项目概述

Do押题库（NotePadQuestionBankFE），一款嵌入 iOS/Android 原生笔记 App（WebView）的移动端 H5 题库应用。支持真题套卷、专项训练、错题复习、收藏试题等练习模式，涵盖单选、多选、填空、简答、听力、阅读理解（含子题型）共 7+ 种题型。面向百万级用户，采用 React 19 + TypeScript 技术栈。

---

## 技术栈

| 类别 | 技术选型 |
|------|----------|
| 框架 | React 19.2 + TypeScript 5.9 |
| 构建 | Vite 7.3 + React Compiler (babel-plugin-react-compiler) |
| 样式 | Tailwind CSS 4 + postcss-pxtorem (rem 适配) |
| 状态管理 | Zustand 5.0 (8 个独立领域 Store) |
| 路由 | React Router DOM 7.13 (createBrowserRouter) |
| 国际化 | i18next 25 + eager glob 同步加载 |
| 网络层 | Axios + 多层级洋葱拦截器 + 指数退避重试 + 请求去重 |
| 原生桥接 | DSBridge 3.1 |
| 测试 | Vitest + Testing Library (单元) + Playwright (E2E 视觉回归) |
| 编译优化 | React Compiler (babel-plugin-react-compiler) |

---

## 亮点一：四层分层架构 + ESLint 架构约束强制执行

**技术价值**：通过 `contract → data → model → ui` 四层分层架构实现关注点完全分离，并通过 ESLint `no-restricted-imports` 规则在编码阶段强制执行架构边界，杜绝架构腐化。这是一种"架构即代码"的工程化实践。

**实现方式**：
- **contract 层**：定义 ViewModel 类型 + fixture 数据，框架无关，不依赖 React / Axios / Zustand
- **data 层**：API 网关 + 数据映射器，负责调用后端接口并将原始响应转换为 contract 层定义的 ViewModel
- **model 层**：业务编排层，决定数据源切换（预览 fixture vs 真实 API），组合多个 data 层调用
- **ui 层**：纯展示组件，仅接收 ViewModel props 渲染，不得导入 http、bridge、store 或 data 层

**ESLint 硬约束** (`eslint.config.js:79-150`)：
- `features/*/ui/**` 禁止导入 `@/services/http`、`@/services/bridge`、`@/store`、feature data 层
- `features/*/data/**` 禁止导入 feature ui 层（防止反向依赖）
- `features/*/contract/**` 禁止导入 services、store、React
- `pages/**` 禁止导入 http、bridge、feature data 层

**文件结构示例** (`src/features/questionSession/`)：
```
questionSession/
├── contract/      # 题型 ViewModel、答案验证逻辑、时长标签
├── data/          # 答题会话适配器、音频引擎
├── model/         # 预览模式 / 运行时模式模型切换
├── ui/
│   ├── questionTypes/  # 7+ 种题型渲染器（策略模式）
│   ├── blocks/         # 可复用区块（选项组、材料面板、音频面板、答题结果面板）
│   └── shell/          # 外壳组件（底部操作栏、模式切换、进度指示器）
└── index.tsx
```

---

## 亮点二：React 19 + React Compiler 编译时优化

**技术价值**：利用 React 19 的 Compiler 在编译阶段自动分析组件依赖并注入 memoization，无需手动编写 `useMemo` / `useCallback` / `React.memo`，从源头消除人为遗漏导致的性能退化。

**实现方式**：
- 通过 `babel-plugin-react-compiler` 在 Vite 构建流程中启用 React Compiler
- 编译器在构建时自动对组件进行静态分析，识别 props/state 依赖关系
- 生成等价于手动添加 `React.memo` + `useMemo` 的优化代码
- 开发者只需关注业务逻辑，框架保证最优渲染策略

---

## 亮点三：7+ 种题型的策略模式答题引擎

**技术价值**：通过 `QuestionTypeRenderer` 策略分发器 + 共享渲染基础设施，以最小的重复代码支持 7+ 种题型的渲染和交互，同时保持每种题型独立可测试。

**实现方式**：
- `QuestionTypeRenderer.tsx`：根据题目类型枚举分发到对应题型组件（策略模式）
- 每种题型独立实现（`SingleChoiceQuestion`、`MultipleChoiceQuestion`、`FillInTheBlankQuestion`、`ShortAnswerQuestion`、`ListeningSingleChoiceQuestion`、`ReadingSingleChoiceQuestion`、`ReadingMultipleChoiceQuestion`、`ReadingFillInTheBlankQuestion`、`ReadingShortAnswerQuestion`）
- `shared.tsx`（795 行）：提取共用渲染逻辑（选项高亮、答案状态标记、填空输入处理等），各题型通过组合复用
- `contract/` 层定义答案验证逻辑：统一的 `AnswerVerification` 类型 + 各题型专用验证函数
- 听力题型通过 `data/` 层的音频引擎管理播放、暂停、seek 等交互
- 阅读理解题型通过 `MaterialPanel` + `ReadingQuestionShell` 实现材料区与题目区联动

---

## 亮点四：指纹认证 + 会话生命周期管理

**技术价值**：在 WebView 环境下实现安全的身份认证会话管理，支持正式/游客双账号模式、跨页面会话保持、页面可见性变化时的自动重新验证。

**实现方式**：
- `questionBankAuthSession.ts`：指纹认证核心
  - `AuthFingerprint` 三元组：`{ userId, token, accountType }`
  - `buildCurrentAuthFingerprint()`：从原生桥接获取的 tokenInfo 构建当前指纹
  - `isIdentityFingerprintMatch()`：比较前后指纹是否一致，支持正式/游客身份变更检测
  - `clearAuthSession()`：登出时清理 token、userId、accountType 及作用域
- `App.tsx` 路由守卫：
  - 页面 `visibilitychange`、`focus`、`pageshow` 事件触发 session 重新验证
  - 检测到 token 过期（401 / 40101-40104 业务码）时自动通过 bridge 刷新令牌
  - 非 App 内访问自动重定向至 `/outside-guard` 引导页
- `useLaunchStore.ts`：启动流程编排（vConsole 加载 → bridge 模拟 → rem 初始化 → 语言路由 → 主题恢复 → 授权流程）

---

## 亮点五：企业级 HTTP 层治理（洋葱模型 + 请求去重 + 指数退避重试）

**技术价值**：多层级可组合的 Axios 拦截器形成洋葱模型，配合基于 AbortController 的请求去重和指数退避重试，构建了健壮的企业级网络层。

**实现方式**：

**请求拦截器链（由外向内）**：
1. `apiRequestLogInterceptor` — 请求日志记录
2. `cancelInterceptor` — 基于 `方法 + URL + 参数 + 请求体` 生成请求标识，通过 AbortController 自动取消未完成的重复请求
3. `tokenInterceptor` — 从 localStorage 注入 `Authorization: Bearer` + `x-user-id` + `X-QB-Account-Type`
4. `runtimeEnvironmentInterceptor` — 根据开发/测试/生产环境 + bridge 配置动态注入 baseURL / timeout / retryCount / retryDelay

**响应拦截器链**：
5. `transformInterceptor` — 响应数据标准化
6. `businessErrorInterceptor` — 业务错误码检查（`code !== 0`），401 自动重定向登录页
7. `errorInterceptor` — 统一错误处理

**辅助机制** (`src/services/http/`)：
- `retry.ts`：指数退避重试（`retryDelay * 2^(attempt-1)`），对 408 / 5xx / 网络错误码（`ECONNABORTED`、`ETIMEDOUT` 等）自动重试
- `cancel.ts`：请求去重管理器，pending 中的相同请求自动取消前一个，页面离开时批量取消
- `config.ts`：可重试状态码和错误码集中配置

---

## 亮点六：原生桥接层抽象 + Bridge 开发模拟

**技术价值**：将 DSBridge 原生通信封装为结构化的服务层，3 秒超时保护，开发环境提供完整的 bridge 模拟层，支持脱离原生 App 独立开发调试。

**实现方式** (`src/services/bridge/`)：
- `index.ts`：DSBridge 核心封装
  - `callBridgeMethod<T>()`：泛型桥接方法调用，3 秒超时 + Promise 包装
  - `getTokenInfo()` / `getEnvConfig()`：获取认证信息和运行环境
  - `closePage()` / `goBack()`：WebView 页面导航
  - `statisticalAction()`：埋点/分析上报
  - `onThemeChanged()`：注册原生主题变更回调（接收原生端 PartialThemeConfig）
  - `registerGoBack()` / `registerQuestionBankWillExit()`：注册原生回调
  - `BridgeResponse<T>` 规范化：统一 `{ code, message, data }` 结构
- `bridgeDevMock.ts`：开发环境模拟层，注入假的 tokenInfo / envConfig / 主题回调，无需原生容器即可全功能开发

---

## 亮点七：移动端 rem 适配 + 视口高度 Polyfill

**技术价值**：解决移动端 WebView 中 `100vh` 不可靠的经典问题，通过动态 rem 适配 + 运行时视口高度 CSS 变量，确保在 iOS/Android 不同设备上的一致性体验。

**实现方式** (`src/utils/flexible.ts`)：
- **动态 rem**：根据 `document.documentElement.clientWidth`（上限 470px）按 393px 设计稿基准设置 `<html>` font-size（rootValue = 100，即 100px = 1rem）
- **运行时视口高度**：通过 `--app-viewport-height` CSS 变量解决移动端浏览器工具栏遮挡问题
  - 优先使用 `window.visualViewport?.height`（最准确，能感知键盘弹出）
  - 回退到 `window.innerHeight`
  - 再回退到 `document.documentElement.clientHeight`
  - 在 `resize` 和 `orientationchange` 事件中更新
- `postcss-pxtorem`：构建时将 px 转为 rem（rootValue: 100），`border` 属性黑名单不转换
- **iOS 键盘适配**：`useQuestionSessionIosKeyboardViewport` 钩子处理 iOS WebView 键盘弹出时的视口调整

---

## 亮点八：自包含主题系统 + Figma 设计对齐

**技术价值**：构建了独立的主题子系统，支持浅色/深色模式切换、14+ 个派生 CSS 变量自动计算、Figma 设计 token 直接映射，且通过 CSS 自定义属性 + Tailwind v4 `@theme` 指令无侵入式集成。

**实现方式** (`src/theme/`)：
- `types.ts`：`ThemeConfig` 类型定义（`primaryColor` / `backgroundColor` / `textColor` / `isDarkMode`）
- `defaults.ts`：浅色/深色默认值
- `validators.ts`：HEX 颜色验证（#RGB / #RRGGBB）、规范化、与默认值合并
- `applier.ts`：CSS 变量注入核心
  - 将主题字段映射为 CSS 自定义属性（`--theme-primary`、`--theme-bg-base`、`--theme-text-primary`）
  - 从主色计算 14+ 个派生变量（`--theme-bg-subtle`、`--theme-bg-muted`、`--theme-text-secondary`、`--theme-border-default` 等），通过 HEX → RGB 转换 + 色值混合公式生成
  - 管理 `light` / `dark` CSS 类名切换
- `figmaColors.ts`：从 Figma 设计文件提取的原始颜色常量
- `useThemeStore.ts`：Zustand + persist 中间件持久化，支持版本迁移（v1 → v2），注册原生主题变更回调
- Tailwind v4 集成：通过 `@theme` 指令将 CSS 变量映射为工具类（`--theme-bg-base` → `bg-bg-base`）

---

## 亮点九：同步国际化方案 + 多级语言回退

**技术价值**：不同于主流 i18next 的 HTTP 异步懒加载方案，采用 Vite `import.meta.glob` eager 模式将所有语言包在构建时打包进 JS Bundle，消除运行时网络请求，确保 WebView 离线场景下国际化正常工作。

**实现方式**：
- `locales/index.ts`：使用 `import.meta.glob('./locales/**/*.json', { eager: true })` 同步加载所有语言文件
- 语言切换通过 URL query 参数 `?lang=` 驱动，`fallbackLng: "zh-CN"`
- `utils/langRouting.ts`：`useNavigateWithLanguage` 钩子确保语言参数在页面跳转时不丢失
- `utils/i18n.ts`：`resolveI18nText()` 解析后端返回的多语言对象，支持多级回退链（当前语言 → 英文 → 中文 → 首个可用值）

---

## 亮点十：全栈测试体系

**技术价值**：构建了覆盖单元测试（Vitest + Testing Library）、E2E 视觉回归测试（Playwright）和后端 API 测试（Python pytest）的三层测试体系。

**实现方式**：
- **单元测试**（Vitest + Testing Library + jsdom）：
  - `src/tests/setup.ts`：全局 Mock（HTMLMediaElement、ResizeObserver、matchMedia）
  - 测试文件与被测源文件同目录（`*.test.ts` / `*.test.tsx`）
  - 覆盖率通过 `@vitest/coverage-v8` 收集
- **E2E 测试**（Playwright）：
  - 目标设备：Pixel 5（393×852 视口，与设计稿对齐）
  - 失败时自动重试 2 次并保存 trace
  - 视觉回归快照位于 `tests/e2e/__snapshots__/`
- **后端测试**：Python pytest（`server/tests/`）
- **lint-staged + husky**：提交前自动运行 `eslint --fix`

---

## 简历项目经历

> **Do押题库（NotePadQuestionBankFE）· 前端开发**  
> *202X.XX — 至今*
>
> 负责 Do押题库 H5 应用的前端架构设计与核心功能开发。项目为 React 19 + TypeScript SPA，嵌入 iOS/Android 原生笔记 App WebView，支持真题套卷、专项训练、错题复习等多种练习模式，面向百万级用户。
>
> - **技术栈**：React 19 (Compiler) + TypeScript + Vite + Zustand + Tailwind CSS + i18next + DSBridge
> - 设计 **四层分层架构**（contract → data → model → ui），并通过 ESLint `no-restricted-imports` 规则强制执行架构边界，实现"架构即代码"的工程化约束
> - 基于 **策略模式** 实现支持 7+ 种题型的可扩展答题引擎（单选/多选/填空/简答/听力/阅读理解），通过共享渲染基础设施 + 独立题型组件实现高复用低耦合
> - 构建 **指纹认证 + 会话生命周期管理**系统，支持正式/游客双账号模式、跨页面会话保持，页面可见性变化时自动重新验证
> - 设计 **多层洋葱模型 HTTP 拦截器链**，集成请求去重（AbortController）、指数退避重试、Token 自动刷新，构建企业级网络层
> - 封装 **原生桥接抽象层**（DSBridge），3 秒超时保护 + 结构化响应规范化；开发环境提供完整 bridge 模拟层，支持脱离原生 App 独立开发
> - 自研 **移动端 rem 适配 + 视口高度 Polyfill** 方案，解决 iOS/Android WebView 中 `100vh` 不可靠的经典问题
> - 构建 **自包含主题系统**，支持浅色/深色模式、14+ 个自动派生 CSS 变量、Figma 设计 token 直接映射，通过 CSS 自定义属性 + Tailwind v4 无侵入集成
> - 采用 **同步国际化方案**（eager glob），所有语言包构建时打包，保障 WebView 离线场景下多语言可用性
> - 建立 **三层测试体系**：Vitest 单元测试 + Playwright E2E 视觉回归 + Python pytest 后端测试

---

## 核心文件索引

| 文件 | 说明 |
|------|------|
| `src/main.tsx` | 应用入口：启动引导、vConsole 初始化、rem 适配、i18n、主题恢复 |
| `src/App.tsx` | 根组件：路由守卫、session 验证、非 App 内重定向 |
| `src/app/router/index.tsx` | 路由配置（createBrowserRouter） |
| `eslint.config.js` | ESLint 分层架构约束规则 |
| `src/features/questionSession/ui/questionTypes/QuestionTypeRenderer.tsx` | 题型策略分发器 |
| `src/features/questionSession/ui/questionTypes/shared.tsx` | 题型共享渲染基础设施 |
| `src/services/http/index.ts` | HTTP 实例创建 + 拦截器链注册 |
| `src/services/http/retry.ts` | 指数退避重试 |
| `src/services/http/cancel.ts` | 请求去重（AbortController） |
| `src/services/bridge/index.ts` | DSBridge 原生桥接封装 |
| `src/services/questionBankAuthSession.ts` | 指纹认证 + Session 管理 |
| `src/store/useLaunchStore.ts` | 启动流程编排 |
| `src/theme/applier.ts` | CSS 变量应用与 14+ 派生变量计算 |
| `src/utils/flexible.ts` | 动态 rem + 视口高度 Polyfill |
| `src/utils/i18n.ts` | 多语言解析 + 多级回退 |
| `src/services/appEnvironment.ts` | 多环境运行时配置 |
| `src/tests/setup.ts` | Vitest 全局 Mock 设置 |
| `server/` | FastAPI 后端（Uvicorn + SQLAlchemy + Redis） |
