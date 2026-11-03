---
tags:
  - project/catpic
status: active
updated: 2026-10-29
---

# catpic 索引

宠物照片动漫画平台。产品流程（上传 → 生成 → 出定稿 → 历史 → 发布）先跑通，真实 AI 生成能力以可替换的适配器形式保留；占位期内产物为基于原图的确定性滤镜并显式标注。

相关：[[catpic-术语表]]

## 环境

- Supabase 项目：`qsssxivvjydnpebogheeu`（2026-10-30 已应用迁移 0001–0006）
- 账号：`liujinxu@newgrand.com`（唯一账号，credits = 1000，用于自测）
- 上线前仍需配置：`CRON_SECRET`、`NEXT_PUBLIC_SITE_ORIGIN`；并确认 `/api/cron/reap` 不被中间件 307
- `invites` 表为空：除该账号外无人有额度，邀请码发放方式待定

## 领域

- [[catpic-术语表]]

## 决策记录

- [[catpic-ADR-0001-生成路线由通用大模型主导]]
- [[catpic-ADR-0002-平台骨架先行生成能力以适配器保留]]
- [[catpic-ADR-0003-风格库存于数据库由seed维护不建运营后台]]
- [[catpic-ADR-0004-原图永远私有定稿默认私有需显式发布]]
- [[catpic-ADR-0005-一期不建公开画廊与审核]]
- [[catpic-ADR-0006-一期邀请制公测额度用credits预扣失败退回]]
- [[catpic-ADR-0007-一期部署在Vercel并直连海外模型]]
- [[catpic-ADR-0008-生成走异步任务前端轮询cron兜底]]

## 工作流

- [[catpic-Agent工作流配置]]

## 调研

（暂无）

## 工作项

- [[work-items/platform-skeleton/spec]]
- [[work-items/platform-skeleton/界面视觉改版]]

### platform-skeleton

- [[work-items/platform-skeleton/issues/01-db-migration]]
- [[work-items/platform-skeleton/issues/02-write-security]]
- [[work-items/platform-skeleton/issues/03-private-storage-upload]]
- [[work-items/platform-skeleton/issues/04-auth-invite]]
- [[work-items/platform-skeleton/issues/05-generator-adapter]]
- [[work-items/platform-skeleton/issues/06-home-upload-submit]]
- [[work-items/platform-skeleton/issues/07-task-page]]
- [[work-items/platform-skeleton/issues/08-my-works]]
- [[work-items/platform-skeleton/issues/09-share-page]]
- [[work-items/platform-skeleton/issues/10-reaper]]
- [[work-items/platform-skeleton/issues/11-acceptance]]

## 交接

（暂无）
