
# GSD 命令参考

**GSD**（Get Shit Done）为 Claude Code 单人代理开发创建分层项目计划。

## 快速开始

1. `/gsd-new-project` - 初始化项目（包含研究、需求、路线图）
2. `/gsd-plan-phase 1` - 为第一个阶段创建详细计划
3. `/gsd-execute-phase 1` - 执行该阶段

## 保持更新

GSD 演进很快，定期更新：

```bash
npx get-shit-done-cc@latest
```

## 核心工作流

```
/gsd-new-project → /gsd-plan-phase → /gsd-execute-phase → 重复
```

### 项目初始化

**`/gsd-new-project`**
通过统一流程初始化新项目。

一条命令从 idea 到可规划状态：
- 深度提问以理解你要构建什么
- 可选的领域研究（启动 4 个并行研究员代理）
- 需求定义，含 v1/v2/超出范围的分级
- 路线图创建，含阶段拆解和成功标准

创建所有 `.planning/` 产物：
- `PROJECT.md` — 项目愿景和需求
- `config.json` — 工作流模式（interactive / yolo）
- `research/` — 领域研究（如选择）
- `REQUIREMENTS.md` — 含 REQ-ID 的分级需求
- `ROADMAP.md` — 映射到需求的阶段
- `STATE.md` — 项目记忆

用法：`/gsd-new-project`

**`/gsd-map-codebase`**
为存量项目映射现有代码库。

- 使用并行 Explore 代理分析代码库
- 在 `.planning/codebase/` 创建 7 份聚焦文档
- 覆盖技术栈、架构、结构、规范、测试、集成、关注点
- 在存量项目上使用 `/gsd-new-project` 之前运行

用法：`/gsd-map-codebase`

### 阶段规划

**`/gsd-discuss-phase <编号>`**
在规划前帮助你明确阶段愿景。

- 捕获你对这个阶段应该是什么样子的想象
- 创建 CONTEXT.md，包含你的愿景、要点和边界
- 当你对某事的呈现/感受有想法时使用
- 可选 `--batch` 一次问 2-5 个相关问题，而不是逐个问

用法：`/gsd-discuss-phase 2`
用法：`/gsd-discuss-phase 2 --batch`
用法：`/gsd-discuss-phase 2 --batch=3`

**`/gsd-research-phase <编号>`**
针对小众/复杂领域的综合生态研究。

- 发现标准技术栈、架构模式、常见陷阱
- 创建 RESEARCH.md，包含"专家如何构建这个"的知识
- 适用于 3D、游戏、音频、着色器、机器学习等专业领域
- 不止于"用哪个库"，深入到生态知识

用法：`/gsd-research-phase 3`

**`/gsd-list-phase-assumptions <编号>`**
在开始之前查看 Claude 打算做什么。

- 显示 Claude 对某个阶段的预期方案
- 让你在 Claude 误解你的愿景时及时纠正
- 不创建文件 — 仅对话输出

用法：`/gsd-list-phase-assumptions 3`

**`/gsd-plan-phase <编号>`**
为特定阶段创建详细执行计划。

- 生成 `.planning/phases/XX-阶段名/XX-YY-PLAN.md`
- 将阶段拆解为具体、可执行的任务
- 包含验证标准和成功度量
- 每个阶段支持多个计划（XX-01、XX-02 等）

用法：`/gsd-plan-phase 1`
结果：创建 `.planning/phases/01-foundation/01-01-PLAN.md`

**PRD 快速路径：** 传入 `--prd path/to/requirements.md` 可完全跳过讨论阶段。你的 PRD 将成为 CONTEXT.md 中锁定的决策。适用于你已有明确验收标准的情况。

### 执行

**`/gsd-execute-phase <阶段编号>`**
执行阶段中的所有计划，或运行特定批次。

- 按批次（wave）对计划分组（来自 frontmatter），按顺序执行各批次
- 每个批次内的计划通过 Task 工具并行运行
- 可选 `--wave N` 标志仅执行第 N 批次并在该批次完成后停止（除非阶段现已完全完成）
- 所有计划完成后验证阶段目标
- 更新 REQUIREMENTS.md、ROADMAP.md、STATE.md

用法：`/gsd-execute-phase 5`
用法：`/gsd-execute-phase 5 --wave 2`

### 智能路由

**`/gsd-do <描述>`**
将自由文本自动路由到正确的 GSD 命令。

- 分析自然语言输入，找到最佳匹配的 GSD 命令
- 作为调度器 — 永远不自己做实际工作
- 通过让你在最佳匹配中选择来解决歧义
- 当你知道你想要什么但不知道运行哪个 `/gsd-*` 命令时使用

用法：`/gsd-do 修复登录按钮`
用法：`/gsd-do 重构认证系统`
用法：`/gsd-do 我想开始一个新的里程碑`

### 快速模式

**`/gsd-quick [--full] [--validate] [--discuss] [--research]`**
执行小型临时任务，具有 GSD 保障但跳过可选代理。

快速模式使用相同的系统但路径更短：
- 只启动规划器 + 执行器（默认跳过研究员、检查器、验证器）
- 快速任务存放在 `.planning/quick/`，与计划阶段分开
- 更新 STATE.md 追踪（不更新 ROADMAP.md）

标志启用额外的质量步骤：
- `--full` — 完整质量流水线：讨论 + 研究 + 计划检查 + 验证
- `--validate` — 仅计划检查（最多 2 轮迭代）和执行后验证
- `--discuss` — 规划前进行轻量讨论以暴露灰色地带
- `--research` — 规划前由聚焦研究代理调研方案

细粒度标志可组合：`--discuss --research --validate` 等同于 `--full`。

用法：`/gsd-quick`
用法：`/gsd-quick --full`
用法：`/gsd-quick --research --validate`
结果：创建 `.planning/quick/NNN-slug/PLAN.md`、`.planning/quick/NNN-slug/SUMMARY.md`

---

**`/gsd-fast [描述]`**
执行一个简单的任务，内联执行 — 无子代理，无计划文件，零开销。

适用于太小以至于不值得规划的任务：拼写修正、配置更改、遗漏的提交、简单添加。在当前上下文中运行，做出更改，提交，并记录到 STATE.md。

- 不创建 PLAN.md 或 SUMMARY.md
- 不启动子代理（内联运行）
- ≤ 3 个文件编辑 — 如果任务不简单，则重定向到 `/gsd-quick`
- 使用 conventional commit 消息进行原子提交

用法：`/gsd-fast "修复 README 中的拼写"`
用法：`/gsd-fast "将 .env 加入 gitignore"`

### 路线图管理

**`/gsd-add-phase <描述>`**
将新阶段添加到当前里程碑末尾。

- 追加到 ROADMAP.md
- 使用下一个顺序编号
- 更新阶段目录结构

用法：`/gsd-add-phase "添加管理后台"`

**`/gsd-insert-phase <之后> <描述>`**
在现有阶段之间以小数编号插入紧急工作。

- 创建中间阶段（例如在 7 和 8 之间插入 7.1）
- 适用于里程碑中途发现的必须完成的工作
- 保持阶段顺序

用法：`/gsd-insert-phase 7 "修复关键认证漏洞"`
结果：创建 Phase 7.1

**`/gsd-remove-phase <编号>`**
删除一个未来阶段并重新编号后续阶段。

- 删除阶段目录及所有引用
- 重新编号所有后续阶段以填补空缺
- 仅适用于未来（未开始）的阶段
- Git 提交保留历史记录

用法：`/gsd-remove-phase 17`
结果：Phase 17 被删除，Phase 18-20 变为 17-19

### 里程碑管理

**`/gsd-new-milestone <名称>`**
通过统一流程开始新的里程碑。

- 深度提问以理解你接下来要构建什么
- 可选的领域研究（启动 4 个并行研究员代理）
- 需求定义及分级
- 路线图创建及阶段拆解
- 可选 `--reset-phase-numbers` 标志从 Phase 1 重新开始编号，并先归档旧阶段目录以确保安全

镜像 `/gsd-new-project` 流程，适用于存量项目（已有 PROJECT.md）。

用法：`/gsd-new-milestone "v2.0 功能"`
用法：`/gsd-new-milestone --reset-phase-numbers "v2.0 功能"`

**`/gsd-complete-milestone <版本>`**
归档已完成的里程碑并为下一个版本做准备。

- 创建 MILESTONES.md 条目及统计信息
- 将完整详情归档到 milestones/ 目录
- 为发布创建 git tag
- 为下一个版本准备工作区

用法：`/gsd-complete-milestone 1.0.0`

### 进度追踪

**`/gsd-progress`**
检查项目状态并智能路由到下一步操作。

- 显示可视化进度条和完成百分比
- 从 SUMMARY 文件汇总最近工作
- 显示当前位置和下一步
- 列出关键决策和待解决问题
- 提供执行下一个计划或创建缺失计划的选项
- 检测 100% 里程碑完成

用法：`/gsd-progress`

### 会话管理

**`/gsd-resume-work`**
从之前的会话恢复工作，带完整上下文还原。

- 读取 STATE.md 获取项目上下文
- 显示当前位置和最近进度
- 根据项目状态提供下一步操作

用法：`/gsd-resume-work`

**`/gsd-pause-work`**
在阶段中途暂停工作时创建上下文交接文件。

- 创建 .continue-here 文件记录当前状态
- 更新 STATE.md 的会话连续性部分
- 捕获进行中的工作上下文

用法：`/gsd-pause-work`

### 调试

**`/gsd-debug [问题描述]`**
系统化调试，跨上下文重置保持持久状态。

- 通过自适应提问收集症状
- 创建 `.planning/debug/[slug].md` 追踪调查
- 使用科学方法进行调查（证据 → 假设 → 测试）
- 跨 `/clear` 保持 — 不带参数运行 `/gsd-debug` 恢复
- 将已解决的问题归档到 `.planning/debug/resolved/`

用法：`/gsd-debug "登录按钮不工作"`
用法：`/gsd-debug`（恢复活动会话）

### 试探与草图

**`/gsd-spike [想法] [--quick]`**
通过一次性实验快速试探想法以验证可行性。

- 将想法分解为 2-5 个聚焦实验（按风险排序）
- 每个试探回答一个具体的 Given/When/Then 问题
- 构建最小代码，运行它，记录结论（VALIDATED / INVALIDATED / PARTIAL）
- 保存到 `.planning/spikes/`，含 MANIFEST.md 追踪
- 不需要 `/gsd-new-project` — 在任何仓库中均可使用
- `--quick` 跳过分解，立即构建

用法：`/gsd-spike "我们能否通过 WebSocket 流式输出 LLM？"`
用法：`/gsd-spike --quick "测试 pdfjs 是否支持表格提取"`

**`/gsd-sketch [想法] [--quick]`**
通过一次性 HTML 线框图快速勾画 UI/设计想法，支持多变体探索。

- 构建前进行对话式风格/方向采集
- 每个草图生成 2-3 个变体作为带标签页的 HTML 页面
- 用户比较变体，挑选元素，迭代
- 跨草图共享 CSS 主题系统
- 保存到 `.planning/sketches/`，含 MANIFEST.md 追踪
- 不需要 `/gsd-new-project` — 在任何仓库中均可使用
- `--quick` 跳过风格采集，直接构建

用法：`/gsd-sketch "管理后台的仪表板布局"`
用法：`/gsd-sketch --quick "表单卡片分组"`

**`/gsd-spike-wrap-up`**
将试探发现打包为持久项目技能。

- 每次整理一个试探（包含/排除/部分/UAT）
- 按功能区域分组发现
- 生成 `./.claude/skills/spike-findings-[项目]/` 含引用和来源
- 将摘要写入 `.planning/spikes/WRAP-UP-SUMMARY.md`
- 将自动加载路由行添加到项目 CLAUDE.md

用法：`/gsd-spike-wrap-up`

**`/gsd-sketch-wrap-up`**
将草图设计发现打包为持久项目技能。

- 每次整理一个草图（包含/排除/部分/重新审视）
- 按设计区域分组发现
- 生成 `./.claude/skills/sketch-findings-[项目]/` 含设计决策、CSS 模式、HTML 结构
- 将摘要写入 `.planning/sketches/WRAP-UP-SUMMARY.md`
- 将自动加载路由行添加到项目 CLAUDE.md

用法：`/gsd-sketch-wrap-up`

### 快速笔记

**`/gsd-note <文本>`**
零摩擦想法捕获 — 一条命令，即时保存，无提问。

- 将带时间戳的笔记保存到 `.planning/notes/`（或 `$HOME/.claude/notes/` 全局）
- 三个子命令：append（默认）、list、promote
- promote 将笔记转换为结构化待办事项
- 无需项目即可工作（回退到全局范围）

用法：`/gsd-note 重构钩子系统`
用法：`/gsd-note list`
用法：`/gsd-note promote 3`
用法：`/gsd-note --global 跨项目想法`

### 待办事项管理

**`/gsd-add-todo [描述]`**
从当前对话中捕获想法或任务为待办事项。

- 从对话中提取上下文（或使用提供的描述）
- 在 `.planning/todos/pending/` 创建结构化待办文件
- 从文件路径推断领域以进行分组
- 创建前检查重复
- 更新 STATE.md 的待办计数

用法：`/gsd-add-todo`（从对话推断）
用法：`/gsd-add-todo 添加认证令牌刷新`

**`/gsd-check-todos [领域]`**
列出待办的待办事项并选择一个进行处理。

- 列出所有待办事项，含标题、领域、创建时间
- 可选的领域过滤（如 `/gsd-check-todos api`）
- 加载所选待办事项的完整上下文
- 路由到适当操作（现在处理、添加到阶段、头脑风暴）
- 开始工作时将待办事项移至 done/

用法：`/gsd-check-todos`
用法：`/gsd-check-todos api`

### 用户验收测试

**`/gsd-verify-work [阶段]`**
通过对话式 UAT 验证已构建的功能。

- 从 SUMMARY.md 文件提取可测试交付物
- 每次呈现一个测试（是/否回答）
- 自动诊断失败并创建修复计划
- 如发现问题，可准备重新执行

用法：`/gsd-verify-work 3`

### 发布工作

**`/gsd-ship [阶段]`**
从已完成的阶段工作创建 PR，附带自动生成的内容。

- 推送分支到远程
- 使用 SUMMARY.md、VERIFICATION.md、REQUIREMENTS.md 的摘要创建 PR
- 可选请求代码审查
- 更新 STATE.md 的发布状态

前置条件：阶段已验证，已安装 `gh` CLI 并已认证。

用法：`/gsd-ship 4` 或 `/gsd-ship 4 --draft`

---

**`/gsd-review --phase N [--gemini] [--claude] [--codex] [--coderabbit] [--opencode] [--qwen] [--cursor] [--all]`**
跨 AI 同行评审 — 调用外部 AI CLI 独立评审阶段计划。

- 检测可用的 CLI（gemini、claude、codex、coderabbit）
- 每个 CLI 使用相同的结构化提示独立评审计划
- CodeRabbit 评审当前 git diff（而非提示）— 可能需要最长 5 分钟
- 生成 REVIEWS.md，含每个评审者的反馈和共识摘要
- 将评审反馈输入规划：`/gsd-plan-phase N --reviews`

用法：`/gsd-review --phase 3 --all`

---

**`/gsd-pr-branch [目标分支]`**
通过过滤掉 .planning/ 提交来创建干净的 PR 分支。

- 分类提交：纯代码（包含）、纯规划（排除）、混合（包含但去除 .planning/）
- 将代码提交 cherry-pick 到干净分支
- 评审者只看到代码变更，看不到 GSD 产物

用法：`/gsd-pr-branch` 或 `/gsd-pr-branch main`

---

**`/gsd-plant-seed [想法]`**
捕获前瞻性想法，附带触发条件以便在合适时机自动浮现。

- Seed 保留 WHY、WHEN 要浮现以及相关代码的路径
- 在 `/gsd-new-milestone` 期间当触发条件匹配时自动浮现
- 优于延期条目 — 触发条件会被检查，而不是被遗忘

用法：`/gsd-plant-seed "当我们构建事件系统时添加实时通知"`

---

**`/gsd-audit-uat`**
跨阶段审计所有未完成的 UAT 和验证项目。
- 扫描每个阶段，查找待处理、已跳过、已阻止和需人工处理的项目
- 与代码库交叉引用以检测过时的文档
- 生成按可测试性分组的优先级人工测试计划
- 在开始新里程碑前使用，以清理验证债务

用法：`/gsd-audit-uat`

### 里程碑审计

**`/gsd-audit-milestone [版本]`**
依据原始目标审计里程碑完成情况。

- 读取所有阶段的 VERIFICATION.md 文件
- 检查需求覆盖
- 启动集成检查器检查跨阶段连接
- 创建 MILESTONE-AUDIT.md 含差距和技术债务

用法：`/gsd-audit-milestone`

**`/gsd-plan-milestone-gaps`**
创建阶段以填补审计发现的所有差距。

- 读取 MILESTONE-AUDIT.md 并将差距分组为阶段
- 按需求优先级排序（必须/应该/可选）
- 将差距填补阶段添加到 ROADMAP.md
- 准备好后对新增阶段使用 `/gsd-plan-phase`

用法：`/gsd-plan-milestone-gaps`

### 配置

**`/gsd-settings`**
交互式配置工作流开关和模型配置。

- 开关研究员、计划检查器、验证器代理
- 选择模型配置（quality / balanced / budget / inherit）
- 更新 `.planning/config.json`

用法：`/gsd-settings`

**`/gsd-set-profile <配置>`**
快速切换 GSD 代理的模型配置。

- `quality` — 除验证外全部使用 Opus
- `balanced` — 规划用 Opus，执行用 Sonnet（默认）
- `budget` — 编写用 Sonnet，研究/验证用 Haiku
- `inherit` — 所有代理使用当前会话模型（OpenCode `/model`）

用法：`/gsd-set-profile budget`

### 实用命令

**`/gsd-cleanup`**
归档已完成里程碑中积累的阶段目录。

- 识别仍在 `.planning/phases/` 中的已完成里程碑的阶段
- 在移动任何内容前显示预览摘要
- 将阶段目录移至 `.planning/milestones/v{X.Y}-phases/`
- 在多个里程碑后使用以减少 `.planning/phases/` 的杂乱

用法：`/gsd-cleanup`

**`/gsd-help`**
显示本命令参考。

**`/gsd-update`**
更新 GSD 到最新版本并预览更新日志。

- 显示已安装版本与最新版本的对比
- 展示你错过的版本的更新日志
- 高亮破坏性变更
- 运行安装前确认
- 比原生 `npx get-shit-done-cc` 更好

用法：`/gsd-update`

**`/gsd-join-discord`**
加入 GSD Discord 社区。

- 获取帮助，分享你正在构建的东西，保持更新
- 与其他 GSD 用户交流

用法：`/gsd-join-discord`

## 文件与结构

```
.planning/
├── PROJECT.md            # 项目愿景
├── ROADMAP.md            # 当前阶段拆解
├── STATE.md              # 项目记忆和上下文
├── RETROSPECTIVE.md      # 持续回顾（每个里程碑更新）
├── config.json           # 工作流模式和开关
├── todos/                # 已捕获的想法和任务
│   ├── pending/          # 等待处理的待办事项
│   └── done/             # 已完成的待办事项
├── spikes/               # 试探实验（/gsd-spike）
│   ├── MANIFEST.md       # 试探清单和结论
│   └── NNN-名称/         # 各个试探目录
├── sketches/             # 设计草图（/gsd-sketch）
│   ├── MANIFEST.md       # 草图清单和优胜者
│   ├── themes/           # 共享 CSS 主题文件
│   └── NNN-名称/         # 各个草图目录（HTML + README）
├── debug/                # 活动调试会话
│   └── resolved/         # 已归档的已解决问题
├── milestones/
│   ├── v1.0-ROADMAP.md       # 已归档的路线图快照
│   ├── v1.0-REQUIREMENTS.md  # 已归档的需求
│   └── v1.0-phases/          # 已归档的阶段目录（通过 /gsd-cleanup 或 --archive-phases）
│       ├── 01-foundation/
│       └── 02-core-features/
├── codebase/             # 代码库地图（存量项目）
│   ├── STACK.md          # 语言、框架、依赖
│   ├── ARCHITECTURE.md   # 模式、分层、数据流
│   ├── STRUCTURE.md      # 目录布局、关键文件
│   ├── CONVENTIONS.md    # 编码规范、命名
│   ├── TESTING.md        # 测试设置、模式
│   ├── INTEGRATIONS.md   # 外部服务、API
│   └── CONCERNS.md       # 技术债务、已知问题
└── phases/
    ├── 01-foundation/
    │   ├── 01-01-PLAN.md
    │   └── 01-01-SUMMARY.md
    └── 02-core-features/
        ├── 02-01-PLAN.md
        └── 02-01-SUMMARY.md
```

## 工作流模式

在 `/gsd-new-project` 期间设置：

**交互模式（Interactive）**

- 确认每个重大决策
- 在检查点暂停等待批准
- 全程更多指导

**YOLO 模式**

- 自动批准大多数决策
- 无需确认直接执行计划
- 仅在关键检查点停止

随时编辑 `.planning/config.json` 切换。

## 规划配置

在 `.planning/config.json` 中配置规划产物的管理方式：

**`planning.commit_docs`**（默认：`true`）
- `true`：规划产物提交到 git（标准工作流）
- `false`：规划产物仅保存在本地，不提交

当 `commit_docs: false` 时：
- 将 `.planning/` 添加到 `.gitignore`
- 适用于开源贡献、客户项目或保持规划私密
- 所有规划文件仍正常工作，只是在 git 中不跟踪

**`planning.search_gitignored`**（默认：`false`）
- `true`：在全局 ripgrep 搜索中添加 `--no-ignore`
- 仅当 `.planning/` 被 gitignore 且你希望项目级搜索包含它时需要

配置示例：
```json
{
  "planning": {
    "commit_docs": false,
    "search_gitignored": true
  }
}
```

## 常见工作流

**开始新项目：**

```
/gsd-new-project        # 统一流程：提问 → 研究 → 需求 → 路线图
/clear
/gsd-plan-phase 1       # 为第一个阶段创建计划
/clear
/gsd-execute-phase 1    # 执行阶段中的所有计划
```

**休息后恢复工作：**

```
/gsd-progress  # 查看上次做到哪里了，然后继续
```

**添加紧急的里程碑中期工作：**

```
/gsd-insert-phase 5 "关键安全修复"
/gsd-plan-phase 5.1
/gsd-execute-phase 5.1
```

**完成里程碑：**

```
/gsd-complete-milestone 1.0.0
/clear
/gsd-new-milestone  # 开始下一个里程碑（提问 → 研究 → 需求 → 路线图）
```

**工作中捕获想法：**

```
/gsd-add-todo                    # 从对话上下文捕获
/gsd-add-todo 修复模态框层级     # 带明确描述捕获
/gsd-check-todos                 # 查看并处理待办事项
/gsd-check-todos api             # 按领域过滤
```

**调试问题：**

```
/gsd-debug "表单提交静默失败"  # 启动调试会话
# ... 调查进行中，上下文逐渐填满 ...
/clear
/gsd-debug                                    # 从上一次离开的地方恢复
```

## 获取帮助

- 阅读 `.planning/PROJECT.md` 了解项目愿景
- 阅读 `.planning/STATE.md` 了解当前上下文
- 查看 `.planning/ROADMAP.md` 了解阶段状态
- 运行 `/gsd-progress` 查看当前进度