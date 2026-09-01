---
tags:
  - ng-config-web
  - database-init-config
  - storage
  - i18n
  - 后端注册
status: current
date: 2026-09-01
updated: 2026-09-01
source: src/pages/SUP/Databaseinitconfig
identity: "16780"
busType: "16780"
locale: zh-CN
format: simple-v1
---

# ng-config-web Databaseinitconfig 后端多语言注册清单

相关：[[00-版本总览]] · [[ng-design-ADR-0003-Attachment中文消息具名占位符协议]] · [[research/2026-09-01-ng-config-web-FilePreview后端多语言注册清单|FilePreview 后端多语言注册清单]] · [[2026-08-14-附件多语言key清单]]

> 页面定位：`src/pages/SUP/Databaseinitconfig/index.tsx` 及 `utils.tsx`（附件存储配置页）。
> **busType：`16780`**，经 `SUP/GetLanguageInfoByBusType`（busTypeCode: `16780`）下发。
> 规范：全量兜底方案，Key 采用无点号扁平小驼峰命名（如 `title`、`save`），单一扁平字典 JSON。

以下 87 条消息用于后端语言资源注册。

| identity | message key | locale | format | 中文模板 | 变量 |
| --- | --- | --- | --- | --- | --- |
| `16780` | `accessKey` | `zh-CN` | `simple-v1` | AccessKey | - |
| `16780` | `accessSecret` | `zh-CN` | `simple-v1` | AccessSecret | - |
| `16780` | `addressType` | `zh-CN` | `simple-v1` | 地址类型 | - |
| `16780` | `addressTypePlaceholder` | `zh-CN` | `simple-v1` | 请选择地址类型 | - |
| `16780` | `adminAccount` | `zh-CN` | `simple-v1` | 管理员账号 | - |
| `16780` | `adminPassword` | `zh-CN` | `simple-v1` | 管理员密码 | - |
| `16780` | `aliyunOssDbDes` | `zh-CN` | `simple-v1` | 输入阿里云Bucket名称 | - |
| `16780` | `aliyunOssDomain` | `zh-CN` | `simple-v1` | 阿里云OSS域名 | - |
| `16780` | `aliyunOssStore` | `zh-CN` | `simple-v1` | 阿里云OSS对象存储 | - |
| `16780` | `aliyunOssUrlExtra1` | `zh-CN` | `simple-v1` | 输入阿里云OSS域名，以华东1（杭州）为例，填写为http://oss-cn-hangzhou.aliyuncs.com | - |
| `16780` | `aliyunOssUrlExtra2` | `zh-CN` | `simple-v1` | 输入自定义域名 | - |
| `16780` | `aliyunOssUrlExtra3` | `zh-CN` | `simple-v1` | 输入专有云或专有域域名 | - |
| `16780` | `aliyunOssUrlExtra4` | `zh-CN` | `simple-v1` | 请根据实际IP地址填写 | - |
| `16780` | `aliyunOssUrlName` | `zh-CN` | `simple-v1` | 阿里云OSS地址 | - |
| `16780` | `aliyunOssUserDes` | `zh-CN` | `simple-v1` | 输入阿里云账号AccessKey。注：阿里云账号拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户 | - |
| `16780` | `apiFailed` | `zh-CN` | `simple-v1` | 接口失败 | - |
| `16780` | `attachFolderName` | `zh-CN` | `simple-v1` | 存放附件的文件夹名称 | - |
| `16780` | `beijing` | `zh-CN` | `simple-v1` | 北京(ap-beijing) | - |
| `16780` | `beijingFsi` | `zh-CN` | `simple-v1` | 北京金融(ap-beijing-fsi) | - |
| `16780` | `bucketName` | `zh-CN` | `simple-v1` | 桶名称 | - |
| `16780` | `bucketNameHelp` | `zh-CN` | `simple-v1` | 输入MinIO的Bucket名称 | - |
| `16780` | `chengdu` | `zh-CN` | `simple-v1` | 成都(ap-chengdu) | - |
| `16780` | `customDomain` | `zh-CN` | `simple-v1` | 自定义域名 | - |
| `16780` | `customSdk` | `zh-CN` | `simple-v1` | 自定义sdk | - |
| `16780` | `customSdkHelp` | `zh-CN` | `simple-v1` | 输入sdk名称，如：iem-oss-sdk | - |
| `16780` | `databaseAddress` | `zh-CN` | `simple-v1` | 数据库地址 | - |
| `16780` | `databaseName` | `zh-CN` | `simple-v1` | 数据库名称 | - |
| `16780` | `enterpriseInfo` | `zh-CN` | `simple-v1` | 企业信息 | - |
| `16780` | `filePath` | `zh-CN` | `simple-v1` | 文件路径 | - |
| `16780` | `generalApiEndpointHelp` | `zh-CN` | `simple-v1` | 用于上传、下载、删除对象等日常操作的访问域名。私有云环境请填写平台管理员提供的基础域名（如 csp.example.com）。 | - |
| `16780` | `guangzhou` | `zh-CN` | `simple-v1` | 广州(ap-guangzhou) | - |
| `16780` | `hongkong` | `zh-CN` | `simple-v1` | 中国香港(ap-hongkong) | - |
| `16780` | `huaweiObsDbDes` | `zh-CN` | `simple-v1` | 输入华为云Bucket名称 | - |
| `16780` | `huaweiObsStore` | `zh-CN` | `simple-v1` | 华为云OBS对象存储 | - |
| `16780` | `huaweiObsUrlExtra` | `zh-CN` | `simple-v1` | 输入华为云OBS域名，以华东1（杭州）为例，填写为http://obsv3.yn-itdc-a.ynjtszh.com | - |
| `16780` | `huaweiObsUrlName` | `zh-CN` | `simple-v1` | 华为云OBS地址 | - |
| `16780` | `huaweiObsUserDes` | `zh-CN` | `simple-v1` | 输入华为云账号AccessKey。注:华为云账号拥有所有API的访问权限，风险很高强烈建议您创建并使用RAM用户进行API访问或日常运维请登录RAM控制台创建RAM用户 | - |
| `16780` | `ipAddress` | `zh-CN` | `simple-v1` | ip地址 | - |
| `16780` | `localDiskStore` | `zh-CN` | `simple-v1` | 本地磁盘文件系统 | - |
| `16780` | `localDiskUrlExtra` | `zh-CN` | `simple-v1` | 存储到文件系统直接写路径 windows服务器例如：D:/ngfile  linux服务器例如：/data/ngfile | - |
| `16780` | `minioDbDes` | `zh-CN` | `simple-v1` | 输入MinIO的Bucket名称 | - |
| `16780` | `minioStore` | `zh-CN` | `simple-v1` | MinIO对象存储（推荐） | - |
| `16780` | `minioUrlName` | `zh-CN` | `simple-v1` | MinIO地址 | - |
| `16780` | `minioUserDes` | `zh-CN` | `simple-v1` | 输入MinIO的AccessKey | - |
| `16780` | `mongodbStore` | `zh-CN` | `simple-v1` | MongoDB数据库（不推荐） | - |
| `16780` | `mongodbUrlExtra` | `zh-CN` | `simple-v1` | MongoDB数据库地址格式为ip:port/实例名 例如127.0.0.1:1433/i8 | - |
| `16780` | `mysqlStore` | `zh-CN` | `simple-v1` | Mysql数据库（不推荐） | - |
| `16780` | `mysqlUrlExtra` | `zh-CN` | `simple-v1` | mysql数据库地址格式为ip:port | - |
| `16780` | `nanjing` | `zh-CN` | `simple-v1` | 南京(ap-nanjing) | - |
| `16780` | `oracleDbFilePathName` | `zh-CN` | `simple-v1` | 文件存放路径示例如F:USER.DBF | - |
| `16780` | `oracleStore` | `zh-CN` | `simple-v1` | Oracle数据库（不推荐） | - |
| `16780` | `oracleSystemUsernameExtra` | `zh-CN` | `simple-v1` | 如果尚未创建用户，请输入数据管理员账号密码 | - |
| `16780` | `oracleUrlExtra` | `zh-CN` | `simple-v1` | Oracle数据库地址格式为ip:port/实例名 例如127.0.0.1:1433/i8 | - |
| `16780` | `oracleUserDes` | `zh-CN` | `simple-v1` | 注意Oracle数据库请填写对应数据库的账号，例如存到ngfile则填写ngfile的账号密码 | - |
| `16780` | `password` | `zh-CN` | `simple-v1` | 密码 | - |
| `16780` | `privateCloud` | `zh-CN` | `simple-v1` | 私有云 | - |
| `16780` | `privateCloudDomain` | `zh-CN` | `simple-v1` | 专有云或专有域域名 | - |
| `16780` | `publicCloud` | `zh-CN` | `simple-v1` | 公有云 | - |
| `16780` | `regionShenzhenFsi` | `zh-CN` | `simple-v1` | 深圳金融(ap-shenzhen-fsi) | - |
| `16780` | `remoteDiskStore` | `zh-CN` | `simple-v1` | 远程磁盘文件系统 | - |
| `16780` | `remoteDiskUrlExtra` | `zh-CN` | `simple-v1` | 存储到远程磁盘，填写服务ip端口加路径，windows服务器例如 10.0.123.123:8080/D:/ngfile linux服务器例如 10.0.123.123:8080/data/ngfile | - |
| `16780` | `requestFailed` | `zh-CN` | `simple-v1` | 请求失败 | - |
| `16780` | `save` | `zh-CN` | `simple-v1` | 保存 | - |
| `16780` | `saveSuccess` | `zh-CN` | `simple-v1` | 保存成功 | - |
| `16780` | `selectStoreType` | `zh-CN` | `simple-v1` | 请选择存储类型 | - |
| `16780` | `serviceApiEndpointHelp` | `zh-CN` | `simple-v1` | 用于获取账号下所有存储桶列表的专用域名。私有云请联系管理员确认（通常为 service.csp.example.com）。 | - |
| `16780` | `sgccndsStore` | `zh-CN` | `simple-v1` | Sgccnds数据库（不推荐） | - |
| `16780` | `sgccndsUrlExtra` | `zh-CN` | `simple-v1` | sgccnds数据库地址格式为ip:port/{database-prefix}{datatabase}{url-params} | - |
| `16780` | `shanghai` | `zh-CN` | `simple-v1` | 上海(ap-shanghai) | - |
| `16780` | `shanghaiFsi` | `zh-CN` | `simple-v1` | 上海金融(ap-shanghai-fsi) | - |
| `16780` | `signVersion` | `zh-CN` | `simple-v1` | 签名类型 | - |
| `16780` | `signVersionHelp` | `zh-CN` | `simple-v1` | 默认请选择V4，如果Minio经过Nginx转发后无法连接，才会使用V2 | - |
| `16780` | `singapore` | `zh-CN` | `simple-v1` | 新加坡(ap-singapore) | - |
| `16780` | `smbStore` | `zh-CN` | `simple-v1` | SMB共享文件 | - |
| `16780` | `smbUrlExtra` | `zh-CN` | `simple-v1` | 若是选择smb共享文件存储，地址格式为ip/sharedName/path，sharedName为共享名,path为指定文件夹路径，示例：10.10.10.10/shardName/parentDir/childDir | - |
| `16780` | `smbUrlName` | `zh-CN` | `simple-v1` | Smb地址 | - |
| `16780` | `smbUserDes` | `zh-CN` | `simple-v1` | 输入具有访问smb共享文件夹权限的用户名对应密码 | - |
| `16780` | `sqlserverStore` | `zh-CN` | `simple-v1` | SqlServer数据库（不推荐） | - |
| `16780` | `sqlserverUrlExtra` | `zh-CN` | `simple-v1` | sqlserver数据库地址格式为ip:port/实例名 例如127.0.0.1:1433/i8 | - |
| `16780` | `storeTypeHelp` | `zh-CN` | `simple-v1` | 存储类型不推荐使用数据库（oracle、sqlserver、mysql），请优先考虑MinIO等其他存储方式 | - |
| `16780` | `tableSpaceName` | `zh-CN` | `simple-v1` | 表空间名称 | - |
| `16780` | `tencentCosDbDes` | `zh-CN` | `simple-v1` | 输入腾讯云Bucket名称 | - |
| `16780` | `tencentCosStore` | `zh-CN` | `simple-v1` | 腾讯云COS对象存储 | - |
| `16780` | `tencentCosUrlExtra` | `zh-CN` | `simple-v1` | 请选择腾讯云COS地域 | - |
| `16780` | `tencentCosUrlName` | `zh-CN` | `simple-v1` | 腾讯云COS地域 | - |
| `16780` | `tencentCosUserDes` | `zh-CN` | `simple-v1` | 输入腾讯云账号AccessKey。注:腾讯云账号拥有所有API的访问权限，风险很高强烈建议您创建并使用子用户进行API访问或日常运维请登录访问管理控制台创建子用户 | - |
| `16780` | `username` | `zh-CN` | `simple-v1` | 用户名 | - |

## 源码位置对照

| message key | 中文模板 | 源码位置 | 业务场景说明 |
| --- | --- | --- | --- |
| `save` | 保存 | `index.tsx:109` | 表单底部提交保存按钮 |
| `saveSuccess` | 保存成功 | `index.tsx:93` | 提交保存成功 toast 提示 |
| `requestFailed` | 请求失败 | `index.tsx:95` | 保存失败 message.error 兜底 |
| `apiFailed` | 接口失败 | `index.tsx:19` | 获取账套列表失败 message.error 兜底 |
| `enterpriseInfo` | 企业信息 | `index.tsx:49` | 账套选择字段 label |
| `selectStoreType` | 请选择存储类型 | `utils.tsx:230, 233` | 存储类型选择下拉 label 及 placeholder |
| `storeTypeHelp` | 存储类型不推荐使用数据库（oracle、sqlserver、mysql），请优先考虑MinIO等其他存储方式 | `utils.tsx:238` | 存储类型帮助引导提示 |
| `addressType` | 地址类型 | `utils.tsx:242, 262` | 阿里云/腾讯云地址类型下拉 label |
| `addressTypePlaceholder` | 请选择地址类型 | `utils.tsx:246, 266` | 地址类型下拉 placeholder |
| `customSdk` | 自定义sdk | `utils.tsx:293` | 华为云 OBS 自定义 SDK 输入框 label |
| `customSdkHelp` | 输入sdk名称，如：iem-oss-sdk | `utils.tsx:295` | 自定义 SDK 输入框 help 提示 |
| `signVersion` | 签名类型 | `utils.tsx:344` | MinIO 签名类型单选组 label |
| `signVersionHelp` | 默认请选择V4，如果Minio经过Nginx转发后无法连接，才会使用V2 | `utils.tsx:355` | 签名类型 help 提示 |
| `bucketName` | 桶名称 | `utils.tsx:359` | 对象存储桶名称输入框 label |
| `bucketNameHelp` | 输入MinIO的Bucket名称 | `utils.tsx:362` | 桶名称输入框默认 help 提示 |
| `accessKey` | AccessKey | `utils.tsx:387` | 对象存储 AccessKey label |
| `username` | 用户名 | `utils.tsx:387` | 数据库用户名 label |
| `accessSecret` | AccessSecret | `utils.tsx:401` | 对象存储 AccessSecret label |
| `password` | 密码 | `utils.tsx:401` | 数据库密码 label |
| `tableSpaceName` | 表空间名称 | `utils.tsx:407` | Oracle 表空间名称输入框 label |
| `attachFolderName` | 存放附件的文件夹名称 | `utils.tsx:418` | 附件存放目录输入框 label |
| `adminAccount` | 管理员账号 | `utils.tsx:430` | Oracle 管理员账号输入框 label |
| `adminPassword` | 管理员密码 | `utils.tsx:442` | Oracle 管理员密码输入框 label |
| `generalApiEndpointHelp` | 用于上传、下载、删除对象等日常操作的访问域名。私有云环境请填写平台管理员提供的基础域名（如 csp.example.com）。 | `utils.tsx:25` | 腾讯云专有云 GeneralApiEndpoint help |
| `serviceApiEndpointHelp` | 用于获取账号下所有存储桶列表的专用域名。私有云请联系管理员确认（通常为 service.csp.example.com）。 | `utils.tsx:27` | 腾讯云专有云 ServiceApiEndpoint help |
| `aliyunOssDomain` | 阿里云OSS域名 | `utils.tsx:252` | 阿里云地址类型选项 |
| `customDomain` | 自定义域名 | `utils.tsx:253` | 阿里云地址类型选项 |
| `privateCloudDomain` | 专有云或专有域域名 | `utils.tsx:254` | 阿里云地址类型选项 |
| `ipAddress` | ip地址 | `utils.tsx:255` | 阿里云地址类型选项 |
| `publicCloud` | 公有云 | `utils.tsx:15` | 腾讯云地址类型选项 |
| `privateCloud` | 私有云 | `utils.tsx:16` | 腾讯云地址类型选项 |
| 地域选项（10项） | 北京、南京、上海、广州、成都、深圳金融、上海金融、北京金融、中国香港、新加坡 | `utils.tsx:2-11` | 腾讯云地域下拉选项 |
| 存储类型 Label（12项） | MinIO、远程磁盘、SMB、阿里云OSS、华为云OBS、腾讯云COS、MongoDB、本地磁盘、Mysql、SqlServer、Oracle、Sgccnds | `utils.tsx:101-216` | 各存储方式下拉展示名称 |
| 各存储类型动态说明（28项） | 动态地址名称、桶描述、AccessKey描述、各库连接格式示例等 | `utils.tsx:101-216` | 切换存储类型时动态变化的 label 与 extra 帮助文案 |

## 无需翻译的内容（开发调试与注释）

| 原文 | 源码位置 | 类型 | 说明 |
| --- | --- | --- | --- |
| `// MinIO对象存储（推荐）` 等存储类型注释 | `utils.tsx:102 起` | 行内注释 | 代码结构注释 |
| `// 新的数据库存储参数是不需要初始化数据的` | `utils.tsx:236` | 行内注释 | 业务逻辑注释 |
| `V4`, `V2` | `utils.tsx:348-349` | 单选项 | 行业通用专有名词 |
| `GeneralApiEndpoint`, `ServiceApiEndpoint` | `utils.tsx:320, 332` | 字段 label | 接口端点专用术语标识 |

## 注册字典（扁平 JSON 格式）

```json
{
  "save": "保存",
  "saveSuccess": "保存成功",
  "requestFailed": "请求失败",
  "apiFailed": "接口失败",
  "enterpriseInfo": "企业信息",
  "selectStoreType": "请选择存储类型",
  "storeTypeHelp": "存储类型不推荐使用数据库（oracle、sqlserver、mysql），请优先考虑MinIO等其他存储方式",
  "addressType": "地址类型",
  "addressTypePlaceholder": "请选择地址类型",
  "customSdk": "自定义sdk",
  "customSdkHelp": "输入sdk名称，如：iem-oss-sdk",
  "signVersion": "签名类型",
  "signVersionHelp": "默认请选择V4，如果Minio经过Nginx转发后无法连接，才会使用V2",
  "bucketName": "桶名称",
  "bucketNameHelp": "输入MinIO的Bucket名称",
  "accessKey": "AccessKey",
  "username": "用户名",
  "accessSecret": "AccessSecret",
  "password": "密码",
  "tableSpaceName": "表空间名称",
  "attachFolderName": "存放附件的文件夹名称",
  "adminAccount": "管理员账号",
  "adminPassword": "管理员密码",
  "generalApiEndpointHelp": "用于上传、下载、删除对象等日常操作的访问域名。私有云环境请填写平台管理员提供的基础域名（如 csp.example.com）。",
  "serviceApiEndpointHelp": "用于获取账号下所有存储桶列表的专用域名。私有云请联系管理员确认（通常为 service.csp.example.com）。",
  "aliyunOssDomain": "阿里云OSS域名",
  "customDomain": "自定义域名",
  "privateCloudDomain": "专有云或专有域域名",
  "ipAddress": "ip地址",
  "publicCloud": "公有云",
  "privateCloud": "私有云",
  "beijing": "北京(ap-beijing)",
  "nanjing": "南京(ap-nanjing)",
  "shanghai": "上海(ap-shanghai)",
  "guangzhou": "广州(ap-guangzhou)",
  "chengdu": "成都(ap-chengdu)",
  "shenzhenFsi": "深圳金融(ap-shenzhen-fsi)",
  "shanghaiFsi": "上海金融(ap-shanghai-fsi)",
  "beijingFsi": "北京金融(ap-beijing-fsi)",
  "hongkong": "中国香港(ap-hongkong)",
  "singapore": "新加坡(ap-singapore)",
  "minioStore": "MinIO对象存储（推荐）",
  "remoteDiskStore": "远程磁盘文件系统",
  "smbStore": "SMB共享文件",
  "aliyunOssStore": "阿里云OSS对象存储",
  "huaweiObsStore": "华为云OBS对象存储",
  "tencentCosStore": "腾讯云COS对象存储",
  "mongodbStore": "MongoDB数据库（不推荐）",
  "localDiskStore": "本地磁盘文件系统",
  "mysqlStore": "Mysql数据库（不推荐）",
  "sqlserverStore": "SqlServer数据库（不推荐）",
  "oracleStore": "Oracle数据库（不推荐）",
  "sgccndsStore": "Sgccnds数据库（不推荐）",
  "minioUrlName": "MinIO地址",
  "minioDbDes": "输入MinIO的Bucket名称",
  "minioUserDes": "输入MinIO的AccessKey",
  "filePath": "文件路径",
  "remoteDiskUrlExtra": "存储到远程磁盘，填写服务ip端口加路径，windows服务器例如 10.0.123.123:8080/D:/ngfile linux服务器例如 10.0.123.123:8080/data/ngfile",
  "smbUrlName": "Smb地址",
  "smbUrlExtra": "若是选择smb共享文件存储，地址格式为ip/sharedName/path，sharedName为共享名,path为指定文件夹路径，示例：10.10.10.10/shardName/parentDir/childDir",
  "smbUserDes": "输入具有访问smb共享文件夹权限的用户名对应密码",
  "aliyunOssUrlName": "阿里云OSS地址",
  "aliyunOssUrlExtra1": "输入阿里云OSS域名，以华东1（杭州）为例，填写为http://oss-cn-hangzhou.aliyuncs.com",
  "aliyunOssUrlExtra2": "输入自定义域名",
  "aliyunOssUrlExtra3": "输入专有云或专有域域名",
  "aliyunOssUrlExtra4": "请根据实际IP地址填写",
  "aliyunOssDbDes": "输入阿里云Bucket名称",
  "aliyunOssUserDes": "输入阿里云账号AccessKey。注：阿里云账号拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户",
  "huaweiObsUrlName": "华为云OBS地址",
  "huaweiObsUrlExtra": "输入华为云OBS域名，以华东1（杭州）为例，填写为http://obsv3.yn-itdc-a.ynjtszh.com",
  "huaweiObsDbDes": "输入华为云Bucket名称",
  "huaweiObsUserDes": "输入华为云账号AccessKey。注:华为云账号拥有所有API的访问权限，风险很高强烈建议您创建并使用RAM用户进行API访问或日常运维请登录RAM控制台创建RAM用户",
  "tencentCosUrlName": "腾讯云COS地域",
  "tencentCosUrlExtra": "请选择腾讯云COS地域",
  "tencentCosDbDes": "输入腾讯云Bucket名称",
  "tencentCosUserDes": "输入腾讯云账号AccessKey。注:腾讯云账号拥有所有API的访问权限，风险很高强烈建议您创建并使用子用户进行API访问或日常运维请登录访问管理控制台创建子用户",
  "databaseAddress": "数据库地址",
  "databaseName": "数据库名称",
  "mongodbUrlExtra": "MongoDB数据库地址格式为ip:port/实例名 例如127.0.0.1:1433/i8",
  "localDiskUrlExtra": "存储到文件系统直接写路径 windows服务器例如：D:/ngfile  linux服务器例如：/data/ngfile",
  "mysqlUrlExtra": "mysql数据库地址格式为ip:port",
  "sqlserverUrlExtra": "sqlserver数据库地址格式为ip:port/实例名 例如127.0.0.1:1433/i8",
  "oracleUrlExtra": "Oracle数据库地址格式为ip:port/实例名 例如127.0.0.1:1433/i8",
  "oracleUserDes": "注意Oracle数据库请填写对应数据库的账号，例如存到ngfile则填写ngfile的账号密码",
  "oracleDbFilePathName": "文件存放路径示例如F:USER.DBF",
  "oracleSystemUsernameExtra": "如果尚未创建用户，请输入数据管理员账号密码",
  "sgccndsUrlExtra": "sgccnds数据库地址格式为ip:port/{database-prefix}{datatabase}{url-params}"
}
```
