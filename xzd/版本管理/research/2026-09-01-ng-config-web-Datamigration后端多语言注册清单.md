---
tags:
  - ng-config-web
  - data-migration
  - attachment
  - i18n
  - 后端注册
status: current
date: 2026-09-01
updated: 2026-09-01
source: src/pages/SUP/Datamigration
identity: "16781"
busType: "16781"
locale: zh-CN
format: simple-v1
---

# ng-config-web Datamigration 后端多语言注册清单

相关：[[00-版本总览]] · [[ng-design-ADR-0003-Attachment中文消息具名占位符协议]] · [[research/2026-09-01-ng-config-web-Databaseinitconfig后端多语言注册清单|Databaseinitconfig 后端多语言注册清单]] · [[2026-08-14-附件多语言key清单]]

> 页面定位：`src/pages/SUP/Datamigration/index.tsx`（附件数据迁移_ng 页）。
> **busType：`16781`**，经 `SUP/GetLanguageInfoByBusType`（busTypeCode: `16781`）下发。
> 规范：全量兜底方案，Key 采用无点号扁平小驼峰命名（如 `f1`、`refresh`），单一扁平字典 JSON。
> 架构说明：本页除了自身 13 条独有文案外，表单第二步与第三步复用了 `Databaseinitconfig/utils.tsx` 的 `getCommonConfig`，因此共享的 83 条存储字段需在 `16781` 下同样注册生效。

以下 96 条消息用于后端语言资源注册。

| identity | message key | locale | format | 中文模板 | 变量 |
| --- | --- | --- | --- | --- | --- |
| `16781` | `f1` | `zh-CN` | `simple-v1` | 第一步：选择账套 | - |
| `16781` | `f2` | `zh-CN` | `simple-v1` | 第二步：输入原文件二进制数据存储库连接参数 | - |
| `16781` | `f3` | `zh-CN` | `simple-v1` | 第三步：输入新的数据库存储参数 | - |
| `16781` | `refresh` | `zh-CN` | `simple-v1` | 刷新 | - |
| `16781` | `startMigration` | `zh-CN` | `simple-v1` | 开始迁移 | - |
| `16781` | `pauseMigration` | `zh-CN` | `simple-v1` | 暂停迁移 | - |
| `16781` | `panelMigrationHistory` | `zh-CN` | `simple-v1` | 迁移日志历史 | - |
| `16781` | `panelMigrationProgress` | `zh-CN` | `simple-v1` | 迁移进度 | - |
| `16781` | `columnMigrationResult` | `zh-CN` | `simple-v1` | 迁移结果 | - |
| `16781` | `pauseSuccess` | `zh-CN` | `simple-v1` | 暂停迁移 | - |
| `16781` | `pauseFailed` | `zh-CN` | `simple-v1` | 暂停失败{{errorMessage}} | `errorMessage` |
| `16781` | `migrationStart` | `zh-CN` | `simple-v1` | 开始迁移 | - |
| `16781` | `migrationFailed` | `zh-CN` | `simple-v1` | 迁移失败{{errorMessage}} | `errorMessage` |
| `16781` | `accessKey` | `zh-CN` | `simple-v1` | AccessKey | - |
| `16781` | `accessSecret` | `zh-CN` | `simple-v1` | AccessSecret | - |
| `16781` | `addressType` | `zh-CN` | `simple-v1` | 地址类型 | - |
| `16781` | `addressTypePlaceholder` | `zh-CN` | `simple-v1` | 请选择地址类型 | - |
| `16781` | `adminAccount` | `zh-CN` | `simple-v1` | 管理员账号 | - |
| `16781` | `adminPassword` | `zh-CN` | `simple-v1` | 管理员密码 | - |
| `16781` | `aliyunOssDbDes` | `zh-CN` | `simple-v1` | 输入阿里云Bucket名称 | - |
| `16781` | `aliyunOssDomain` | `zh-CN` | `simple-v1` | 阿里云OSS域名 | - |
| `16781` | `aliyunOssStore` | `zh-CN` | `simple-v1` | 阿里云OSS对象存储 | - |
| `16781` | `aliyunOssUrlExtra1` | `zh-CN` | `simple-v1` | 输入阿里云OSS域名，以华东1（杭州）为例，填写为http://oss-cn-hangzhou.aliyuncs.com | - |
| `16781` | `aliyunOssUrlExtra2` | `zh-CN` | `simple-v1` | 输入自定义域名 | - |
| `16781` | `aliyunOssUrlExtra3` | `zh-CN` | `simple-v1` | 输入专有云或专有域域名 | - |
| `16781` | `aliyunOssUrlExtra4` | `zh-CN` | `simple-v1` | 请根据实际IP地址填写 | - |
| `16781` | `aliyunOssUrlName` | `zh-CN` | `simple-v1` | 阿里云OSS地址 | - |
| `16781` | `aliyunOssUserDes` | `zh-CN` | `simple-v1` | 输入阿里云账号AccessKey。注：阿里云账号拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户 | - |
| `16781` | `attachFolderName` | `zh-CN` | `simple-v1` | 存放附件的文件夹名称 | - |
| `16781` | `beijing` | `zh-CN` | `simple-v1` | 北京(ap-beijing) | - |
| `16781` | `beijingFsi` | `zh-CN` | `simple-v1` | 北京金融(ap-beijing-fsi) | - |
| `16781` | `bucketName` | `zh-CN` | `simple-v1` | 桶名称 | - |
| `16781` | `bucketNameHelp` | `zh-CN` | `simple-v1` | 输入MinIO的Bucket名称 | - |
| `16781` | `chengdu` | `zh-CN` | `simple-v1` | 成都(ap-chengdu) | - |
| `16781` | `customDomain` | `zh-CN` | `simple-v1` | 自定义域名 | - |
| `16781` | `customSdk` | `zh-CN` | `simple-v1` | 自定义sdk | - |
| `16781` | `customSdkHelp` | `zh-CN` | `simple-v1` | 输入sdk名称，如：iem-oss-sdk | - |
| `16781` | `databaseAddress` | `zh-CN` | `simple-v1` | 数据库地址 | - |
| `16781` | `databaseName` | `zh-CN` | `simple-v1` | 数据库名称 | - |
| `16781` | `enterpriseInfo` | `zh-CN` | `simple-v1` | 企业信息 | - |
| `16781` | `filePath` | `zh-CN` | `simple-v1` | 文件路径 | - |
| `16781` | `generalApiEndpointHelp` | `zh-CN` | `simple-v1` | 用于上传、下载、删除对象等日常操作的访问域名。私有云环境请填写平台管理员提供的基础域名（如 csp.example.com）。 | - |
| `16781` | `guangzhou` | `zh-CN` | `simple-v1` | 广州(ap-guangzhou) | - |
| `16781` | `hongkong` | `zh-CN` | `simple-v1` | 中国香港(ap-hongkong) | - |
| `16781` | `huaweiObsDbDes` | `zh-CN` | `simple-v1` | 输入华为云Bucket名称 | - |
| `16781` | `huaweiObsStore` | `zh-CN` | `simple-v1` | 华为云OBS对象存储 | - |
| `16781` | `huaweiObsUrlExtra` | `zh-CN` | `simple-v1` | 输入华为云OBS域名，以华东1（杭州）为例，填写为http://obsv3.yn-itdc-a.ynjtszh.com | - |
| `16781` | `huaweiObsUrlName` | `zh-CN` | `simple-v1` | 华为云OBS地址 | - |
| `16781` | `huaweiObsUserDes` | `zh-CN` | `simple-v1` | 输入华为云账号AccessKey。注:华为云账号拥有所有API的访问权限，风险很高强烈建议您创建并使用RAM用户进行API访问或日常运维请登录RAM控制台创建RAM用户 | - |
| `16781` | `ipAddress` | `zh-CN` | `simple-v1` | ip地址 | - |
| `16781` | `localDiskStore` | `zh-CN` | `simple-v1` | 本地磁盘文件系统 | - |
| `16781` | `localDiskUrlExtra` | `zh-CN` | `simple-v1` | 存储到文件系统直接写路径 windows服务器例如：D:/ngfile  linux服务器例如：/data/ngfile | - |
| `16781` | `minioDbDes` | `zh-CN` | `simple-v1` | 输入MinIO的Bucket名称 | - |
| `16781` | `minioStore` | `zh-CN` | `simple-v1` | MinIO对象存储（推荐） | - |
| `16781` | `minioUrlName` | `zh-CN` | `simple-v1` | MinIO地址 | - |
| `16781` | `minioUserDes` | `zh-CN` | `simple-v1` | 输入MinIO的AccessKey | - |
| `16781` | `mongodbStore` | `zh-CN` | `simple-v1` | MongoDB数据库（不推荐） | - |
| `16781` | `mongodbUrlExtra` | `zh-CN` | `simple-v1` | MongoDB数据库地址格式为ip:port/实例名 例如127.0.0.1:1433/i8 | - |
| `16781` | `mysqlStore` | `zh-CN` | `simple-v1` | Mysql数据库（不推荐） | - |
| `16781` | `mysqlUrlExtra` | `zh-CN` | `simple-v1` | mysql数据库地址格式为ip:port | - |
| `16781` | `nanjing` | `zh-CN` | `simple-v1` | 南京(ap-nanjing) | - |
| `16781` | `oracleDbFilePathName` | `zh-CN` | `simple-v1` | 文件存放路径示例如F:USER.DBF | - |
| `16781` | `oracleStore` | `zh-CN` | `simple-v1` | Oracle数据库（不推荐） | - |
| `16781` | `oracleSystemUsernameExtra` | `zh-CN` | `simple-v1` | 如果尚未创建用户，请输入数据管理员账号密码 | - |
| `16781` | `oracleUrlExtra` | `zh-CN` | `simple-v1` | Oracle数据库地址格式为ip:port/实例名 例如127.0.0.1:1433/i8 | - |
| `16781` | `oracleUserDes` | `zh-CN` | `simple-v1` | 注意Oracle数据库请填写对应数据库的账号，例如存到ngfile则填写ngfile的账号密码 | - |
| `16781` | `password` | `zh-CN` | `simple-v1` | 密码 | - |
| `16781` | `privateCloud` | `zh-CN` | `simple-v1` | 私有云 | - |
| `16781` | `privateCloudDomain` | `zh-CN` | `simple-v1` | 专有云或专有域域名 | - |
| `16781` | `publicCloud` | `zh-CN` | `simple-v1` | 公有云 | - |
| `16781` | `regionShenzhenFsi` | `zh-CN` | `simple-v1` | 深圳金融(ap-shenzhen-fsi) | - |
| `16781` | `remoteDiskStore` | `zh-CN` | `simple-v1` | 远程磁盘文件系统 | - |
| `16781` | `remoteDiskUrlExtra` | `zh-CN` | `simple-v1` | 存储到远程磁盘，填写服务ip端口加路径，windows服务器例如 10.0.123.123:8080/D:/ngfile linux服务器例如 10.0.123.123:8080/data/ngfile | - |
| `16781` | `selectStoreType` | `zh-CN` | `simple-v1` | 请选择存储类型 | - |
| `16781` | `serviceApiEndpointHelp` | `zh-CN` | `simple-v1` | 用于获取账号下所有存储桶列表的专用域名。私有云请联系管理员确认（通常为 service.csp.example.com）。 | - |
| `16781` | `sgccndsStore` | `zh-CN` | `simple-v1` | Sgccnds数据库（不推荐） | - |
| `16781` | `sgccndsUrlExtra` | `zh-CN` | `simple-v1` | sgccnds数据库地址格式为ip:port/{database-prefix}{datatabase}{url-params} | - |
| `16781` | `shanghai` | `zh-CN` | `simple-v1` | 上海(ap-shanghai) | - |
| `16781` | `shanghaiFsi` | `zh-CN` | `simple-v1` | 上海金融(ap-shanghai-fsi) | - |
| `16781` | `signVersion` | `zh-CN` | `simple-v1` | 签名类型 | - |
| `16781` | `signVersionHelp` | `zh-CN` | `simple-v1` | 默认请选择V4，如果Minio经过Nginx转发后无法连接，才会使用V2 | - |
| `16781` | `singapore` | `zh-CN` | `simple-v1` | 新加坡(ap-singapore) | - |
| `16781` | `smbStore` | `zh-CN` | `simple-v1` | SMB共享文件 | - |
| `16781` | `smbUrlExtra` | `zh-CN` | `simple-v1` | 若是选择smb共享文件存储，地址格式为ip/sharedName/path，sharedName为共享名,path为指定文件夹路径，示例：10.10.10.10/shardName/parentDir/childDir | - |
| `16781` | `smbUrlName` | `zh-CN` | `simple-v1` | Smb地址 | - |
| `16781` | `smbUserDes` | `zh-CN` | `simple-v1` | 输入具有访问smb共享文件夹权限的用户名对应密码 | - |
| `16781` | `sqlserverStore` | `zh-CN` | `simple-v1` | SqlServer数据库（不推荐） | - |
| `16781` | `sqlserverUrlExtra` | `zh-CN` | `simple-v1` | sqlserver数据库地址格式为ip:port/实例名 例如127.0.0.1:1433/i8 | - |
| `16781` | `storeTypeHelp` | `zh-CN` | `simple-v1` | 存储类型不推荐使用数据库（oracle、sqlserver、mysql），请优先考虑MinIO等其他存储方式 | - |
| `16781` | `tableSpaceName` | `zh-CN` | `simple-v1` | 表空间名称 | - |
| `16781` | `tencentCosDbDes` | `zh-CN` | `simple-v1` | 输入腾讯云Bucket名称 | - |
| `16781` | `tencentCosStore` | `zh-CN` | `simple-v1` | 腾讯云COS对象存储 | - |
| `16781` | `tencentCosUrlExtra` | `zh-CN` | `simple-v1` | 请选择腾讯云COS地域 | - |
| `16781` | `tencentCosUrlName` | `zh-CN` | `simple-v1` | 腾讯云COS地域 | - |
| `16781` | `tencentCosUserDes` | `zh-CN` | `simple-v1` | 输入腾讯云账号AccessKey。注:腾讯云账号拥有所有API的访问权限，风险很高强烈建议您创建并使用子用户进行API访问或日常运维请登录访问管理控制台创建子用户 | - |
| `16781` | `username` | `zh-CN` | `simple-v1` | 用户名 | - |

## 源码位置对照（数据迁移独有部分）

| message key | 中文模板 | 源码位置 | 业务场景说明 |
| --- | --- | --- | --- |
| `f1` | 第一步：选择账套 | `index.tsx:109` | FormSet 字段集 1 标题（itemId: 'f1', langKey: 'f1'） |
| `f2` | 第二步：输入原文件二进制数据存储库连接参数 | `index.tsx:124` | FormSet 字段集 2 标题（itemId: 'f2', langKey: 'f2'） |
| `f3` | 第三步：输入新的数据库存储参数 | `index.tsx:130` | FormSet 字段集 3 标题（itemId: 'f3', langKey: 'f3'） |
| `refresh` | 刷新 | `index.tsx:96` | Panel 操作栏刷新按钮 |
| `startMigration` | 开始迁移 | `index.tsx:184` | 表单操作栏开始迁移按钮 |
| `pauseMigration` | 暂停迁移 | `index.tsx:193` | 表单操作栏暂停迁移按钮 |
| `panelMigrationHistory` | 迁移日志历史 | `index.tsx:198` | 右侧上方 Panel 标题 |
| `panelMigrationProgress` | 迁移进度 | `index.tsx:203` | 右侧下方 Panel 标题 |
| `columnMigrationResult` | 迁移结果 | `index.tsx:209` | 迁移进度表格列头 |
| `pauseSuccess` | 暂停迁移 | `index.tsx:146` | 暂停成功 toast 提示 |
| `pauseFailed` | 暂停失败{{errorMessage}} | `index.tsx:148` | 暂停失败 toast 提示（带服务端错误信息） |
| `migrationStart` | 开始迁移 | `index.tsx:158` | 启动迁移成功 toast 提示 |
| `migrationFailed` | 迁移失败{{errorMessage}} | `index.tsx:161` | 启动迁移失败 toast 提示（带服务端错误信息） |

## 无需翻译的内容（开发调试）

| 原文 | 源码位置 | 类型 | 说明 |
| --- | --- | --- | --- |
| `原密码` | `index.tsx:32` | console.log | 开发调试日志参数 |

## 注册字典（扁平 JSON 格式）

```json
{
  "f1": "第一步：选择账套",
  "f2": "第二步：输入原文件二进制数据存储库连接参数",
  "f3": "第三步：输入新的数据库存储参数",
  "refresh": "刷新",
  "startMigration": "开始迁移",
  "pauseMigration": "暂停迁移",
  "panelMigrationHistory": "迁移日志历史",
  "panelMigrationProgress": "迁移进度",
  "columnMigrationResult": "迁移结果",
  "pauseSuccess": "暂停迁移",
  "pauseFailed": "暂停失败{{errorMessage}}",
  "migrationStart": "开始迁移",
  "migrationFailed": "迁移失败{{errorMessage}}",
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
