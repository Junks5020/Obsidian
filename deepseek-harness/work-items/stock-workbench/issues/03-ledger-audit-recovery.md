---
tags:
  - project/deepseek-harness
  - work-item
  - stocks
status: implemented
date: 2026-09-09
updated: 2026-09-09
---

# 03 — 账本审计与恢复

相关：[[../spec]] · [[../试点方案]]

**What to build:** 每次手动变更账户、持仓、现金或自选都记录前后值与时间，可查看且不冒充真实交易流水；删除的对象进入 30 天最近删除，可恢复或立即清空；用户可导出密码加密备份并在同一 Windows 用户环境恢复，错误密码被拒绝。

**Blocked by:** 02

**Status:** implemented

- [x] 每次手动变更（账户/持仓/现金/自选）记录前后值和时间，可在界面查看
- [x] 变更记录明确标识为手动编辑，不冒充真实交易流水
- [x] 删除的账户/持仓/自选进入 30 天最近删除，可恢复
- [x] 用户可立即清空最近删除，永久移除对象及其变更记录
- [x] 用户可导出密码加密备份，并在同一 Windows 用户环境恢复
- [x] 错误密码恢复备份被拒绝
- [x] 导出前显示「忘记密码不可恢复」的明确提示

## Comments

- 2026-09-09：`storage-domain` 的逐表写入不提供跨表事务；账户/持仓/自选主数据、审计和回收记录必须由同一个加密账本 envelope 的单次原子提交共同发布，或在实现前提供等价的受控事务机制。不能把串行写队列称为事务。
- 2026-09-09：`stock-ledger` 以单 `mutationId` 在一次受保护快照提交内发布所有变更/回收记录；30 天回收、冲突拒绝、`emptyTrash`、Host-only scrypt+AES-256-GCM 备份/恢复均已落地。见 `.agents/notes/implemented/architecture/2026-09-09-stock-ledger-audit-recycle-backup.md`。

