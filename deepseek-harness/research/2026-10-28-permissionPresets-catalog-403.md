---
tags:
  - project/deepseek-harness
  - diagnosis
status: blocked
date: 2026-10-28
updated: 2026-10-28
---

# permissionPresets/catalog 返回 HTTP 403：初步诊断

相关：[[00-deepseek-harness索引]]

## 症状

`gateway/internal: client api: permissionPresets/catalog failed: transport failure for /api/permissionPresets/catalog: HTTP 403`

## 已确认

- 检查到本机运行的 DeepSeek Harness Desktop 为 `0.2.1-rc.3`；当时 Gateway 监听 `127.0.0.1:61016`（这是本次检查时的临时端口）。
- `permissionPresets/catalog` 是本机的权限预设目录 Remote，不是 DeepSeek 模型/API 调用，因此目前没有证据指向模型 Key、模型配额或上游服务。
- 安装包内的 Client 传输层对非 2xx 只生成 `transport failure ... HTTP <status>`，丢弃响应正文；单看报错无法判断 403 是哪一层发出的。
- 不带桌面会话认证的只读 GET 返回 401，而非用户报告的 403；这只是验证服务和认证存在，不是原问题复现。
- Desktop 的 `dsh-app://app` 协议处理器把 API 请求交给 `forwardWebRequest`。它在 HTTP 转发前检查 `Origin`：非空且不等于 `dsh-app://app` 时直接回空正文 403；通过时移除 renderer 的 Host/Origin/Cookie/Sec-Fetch-Site，再附加 Host 会话 Cookie 转发。安装包位置：`AppData/Local/Programs/DeepSeek Harness/resources/app.asar`，相关 bundled code 约 3999775–9805、4003913–3920 行。
- Gateway admission 另有 Host/Origin/`Sec-Fetch-Site` 信任校验；不可信请求会返回 403，缺少有效会话认证则返回 401。bundled code 约 421106–115、421608–615 行。
- 当前 UI 检查时停在新会话主页，没有显示该错误；尝试打开 DevTools 失败于窗口焦点限制。未取得真实失败请求的头信息或响应正文。曾尝试只读查询 Cookie 数据库元数据，但数据库无法打开；未取得或解密 Cookie 值。

## 当前判断（未确认）

最值得优先验证的是 Desktop HTTP 转发器实际收到的 `Origin` 是否异常；其次是转发至 Gateway 后的 Host/Origin 信任校验。由于没有失败请求的实际响应正文和请求头，不能断言具体是哪一个分支，也不能宣称根因已找到。未修改应用配置、安装包或安全校验，未重启；曾恢复应用窗口并尝试 GUI 操作，但未触发会话或其他业务动作。

## 完成诊断所需证据

复现时从 DevTools Network 提供该 POST 请求的 URL/路径、状态、响应正文、`Origin`、`Host`、`Sec-Fetch-Site`，以及触发步骤。请删除/遮挡 `Cookie`、`Authorization`、令牌和敏感请求正文。响应正文可作为定位线索（例如 Desktop 转发器会返回空 403，Gateway 信任拒绝会返回 `forbidden`），但单凭正文仍不能确证来源。
