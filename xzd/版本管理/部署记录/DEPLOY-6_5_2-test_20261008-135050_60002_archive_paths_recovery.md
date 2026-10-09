---
type: "ngh5-react-deploy"
operation_id: "6_5_2-test_20261008-135050_60002_archive_paths_recovery"
status: "success"
version: "6.5.2-test"
created: "2026-10-08T14:32:41.378806+08:00"
tags:
  - version-management
  - deployment
  - ngh5
---

# NGH5 发布：6.5.2-test

相关：[[../00-版本总览|XZD 版本总览]]

## 操作信息

- 操作 ID：`6_5_2-test_20261008-135050_60002_archive_paths_recovery`
- 状态：`success`
- 时间：`2026-10-08T14:32:41.378806+08:00`
- 主机：`47.96.237.137, 101.37.16.1`
- 远程路径：`/usr/NGH5/wechat/pages/6.5.2-test`
- 备份后缀：`_bak_20261008_62094`
- 切换方式：`renameat2(RENAME_EXCHANGE)`
- JSON 清单：[[清单/6_5_2-test_20261008-135050_60002_archive_paths_recovery.json|6_5_2-test_20261008-135050_60002_archive_paths_recovery.json]]

## 产物映射

- `C:\Users\jinxu\workspace\xzd\nova\mobile-web\dist` -> `React`
- `C:\Users\jinxu\workspace\xzd\nova\react\dist` -> `platform_react`

## 主机结果

| 主机 | 状态 | 说明 |
| --- | --- | --- |
| 47.96.237.137 | success | /usr/NGH5/wechat/pages/6.5.2-test |
| 101.37.16.1 | success | /usr/NGH5/wechat/pages/6.5.2-test |

## 回滚命令

```powershell
python "C:/Users/jinxu/.codex/skills/ngh5-react-deploy/scripts/deploy_ngh5.py" rollback --manifest "C:/Users/jinxu/workspace/obsidian/xzd/版本管理/部署记录/清单/6_5_2-test_20261008-135050_60002_archive_paths_recovery.json" --yes
```


恢复方式：通过第二台 SSH 中转上传已核对的压缩包，仅在隐藏暂存目录解压并逐文件校验，随后调用原有服务端原子切换脚本。当前结果见本记录状态及校验清单。
原始记录：[[DEPLOY-6_5_2-test_20261008-135050_60002|部署清单]]；[[DEPLOY-6_5_2-test_20261008-135050_60002_recovery|直接连接恢复清单]]；[[DEPLOY-6_5_2-test_20261008-135050_60002_relay_recovery|逐文件中转恢复清单]]；[[DEPLOY-6_5_2-test_20261008-135050_60002_archive_recovery|压缩包路径校验记录]]。


## 部署验证

完成时间：2026-10-08T14:32:47.623264+08:00。

| 主机 | 目录 | 文件数 | SHA256 与本地 dist | 原版本备份 |
| --- | --- | --- | --- | --- |
| 47.96.237.137 | React | 97 | 全部一致 | 已确认 |
| 47.96.237.137 | platform_react | 429 | 全部一致 | 已确认 |
| 101.37.16.1 | React | 97 | 全部一致 | 已确认 |
| 101.37.16.1 | platform_react | 429 | 全部一致 | 已确认 |
