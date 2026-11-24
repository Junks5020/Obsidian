---
type: "ngh5-react-deploy-single"
operation_id: 6_3SP2-test_20261106-094523_70014_single_react
status: success
version: 6.3SP2-test
created: 2026-11-06T09:45:23+08:00
tags:
  - version-management
  - deployment
  - ngh5
---

# NGH5 发布（单目录 React）：6.3SP2-test

相关：[[../00-版本总览|XZD 版本总览]]

## 操作信息

- 操作 ID：`6_3SP2-test_20261106-094523_70014_single_react`
- 状态：`success`
- 时间：`2026-11-06T09:45:23+08:00`
- 主机：`47.96.237.137, 101.37.16.1`
- 远程路径：`/usr/NGH5/wechat/pages/6.3SP2-test`
- 备份：`React_bak_20261106_70014`（旧构建 umi.eb9c8582.js）
- 切换方式：`renameat2(RENAME_EXCHANGE) 单目录 React`
- JSON 清单：[[清单/6_3SP2-test_20261106-094523_70014_single_react.json|6_3SP2-test_20261106-094523_70014_single_react.json]]
- 本地产物：`react/dist`（417 个文件，17,168,423 字节，新构建 umi.d0fd9e5d.js）

> 注意：本次为用户要求的非标准单目录部署，仅替换 React，未改动 platform_react。

## 主机结果

| 主机 | 状态 | 说明 |
| --- | --- | --- |
| 47.96.237.137 | success | staging 校验 417 文件后原子交换，线上已是新构建 |
| 101.37.16.1 | success | staging 校验 417 文件后原子交换，线上已是新构建 |

## 回滚命令

```bash
python deploy_single_react.py rollback --version 6.3SP2-test --backup-suffix _bak_20261106_70014 --yes
```
