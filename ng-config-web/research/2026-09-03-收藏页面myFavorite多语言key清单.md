---
tags:
  - ng-config-web
  - 多语言
  - i18n
  - 收藏
status: active
date: 2026-09-03
---

# 收藏页面（myFavorite）多语言 key 清单

相关：[[00-ng-config-web索引]] · [[ng-config-web-术语表]] · [[2026-08-14-附件多语言key清单]]

> 2026-09-03：梳理我的收藏页面的多语言情况。口径：zh-CN 源 + en-US 目标，中文兜底；建议参考附件页面的多语言接入方式。

## 页面定位

| 页面名 | 文件 | 说明 |
|--------|------|------|
| 我的收藏 | `src/pages/myFavorite/MyFavorite.tsx` + `fileList.tsx` + `fileItem.tsx` + `uploadButton.tsx` + `service.tsx` | 展示用户收藏的内容（全部收藏、文件、链接、图片与视频），支持搜索、上传、预览；调用 `/SUP/UserColl/GetCollList`、`/SUP/UserColl/GetAttachmentFile`、`/SUP/UserColl/Add` 等接口 |

## 翻译机制（关键前提）

- **当前实现**：在 `service.tsx` 中定义了 `defaultLang` 对象，包含标签列表、按钮文案等静态配置。
- **建议接入方式**：参考 `src/pages/workFlow/.../language.ts` 的模式，创建 `LangKey` 枚举 + `getLangText(id, defaultText)` 函数，运行时取 `udp.getLang()` 平台语言词典，中文作兜底。
- **语言字典来源**：后端 `SUP/GetLanguageInfoByBusType` 或 `SUP/Language/getLanguageMap?identity=xxx`。
- **key 命名规则**：建议使用 `mf` 前缀（myFavorite 缩写）+ 扁平 camelCase，如 `mfTitle`、`mfUpload` 等。

---

## 一、收藏页面词典（用户可见文案，共 13 条）

### 1. 页面标题与标签

| key | 中文默认值 | English | 出处 |
|-----|-----------|---------|------|
| `mfTitle` | 我的收藏 | My Favorites | `MyFavorite.tsx:69`（Panel title） |
| `mfSearchPlaceholder` | 输入关键字检索 | Enter keywords to search | `MyFavorite.tsx:72`（Search placeholder） |
| `mfTagAll` | 全部收藏 | All Favorites | `service.tsx:12, 15`（标签页第一项） |
| `mfTagFile` | 文件 | Files | `service.tsx:12, 15`（标签页第二项） |
| `mfTagLink` | 链接 | Links | `service.tsx:12, 15`（标签页第三项） |
| `mfTagMedia` | 图片与视频 | Images & Videos | `service.tsx:12, 15`（标签页第四项） |

> **备注**：`tags` 数组中还定义了 `聊天记录`、`收藏单据`、`标签` 三个选项，但未在 `tagList` 中实际使用（L15），暂不纳入翻译范围。如需启用这些标签页，建议增加对应的 key：
> - `mfTagChat` = 聊天记录 / Chat History
> - `mfTagDocument` = 收藏单据 / Saved Documents  
> - `mfTagLabel` = 标签 / Labels

### 2. 按钮与操作

| key | 中文默认值 | English | 出处 |
|-----|-----------|---------|------|
| `mfUpload` | 上传文件 | Upload File | `service.tsx:17`，`uploadButton.tsx:29`（上传按钮文案） |

### 3. 文件列表展示

| key | 中文默认值 | English | 出处 |
|-----|-----------|---------|------|
| `mfFilePreview` | 我的文件预览 | My File Preview | `service.tsx:18`，`fileItem.tsx:45`（打开预览窗口的 AppTitle） |
| `mfNoMore` | 没有更多了！ | No more items! | `service.tsx:19`，`fileItem.tsx:71`（列表加载完毕提示） |
| `mfImgAlt` | 链接 | Link | `service.tsx:20`，`fileItem.tsx:52`（图片 alt 文本） |
| `mfFrom` | 来自: | From: | `service.tsx:21`，`fileItem.tsx:64`（来源标签） |

### 4. 错误提示消息

| key | 中文默认值 | English | 出处 |
|-----|-----------|---------|------|
| `mfPreviewError` | 预览信息获取错误，请稍后重试 | Failed to retrieve preview information. Please try again later. | `MyFavorite.tsx:25`（获取附件信息失败） |
| `mfUploadFailReason` | 上传失败，原因：{0} | Upload failed. Reason: {0} | `service.tsx:129`（上传失败，显示服务端返回的错误信息，`{0}` 为动态参数） |
| `mfUploadFailServer` | 上传失败，原因：服务器错误 | Upload failed. Reason: Server error | `service.tsx:132`（上传异常兜底提示） |

> **动态文案说明**：`mfUploadFailReason` 中的 `{0}` 占位符用于插入服务端返回的具体错误信息（`msg` 或 `Msg` 字段），运行时需配合字符串格式化函数（如 `formatStringForArgs`）替换占位符。

---

## 二、不翻译清单（仅开发可见，保持中文即可）

| 原文 | 页面 | 位置 | 类型 |
|------|------|------|------|
| `获取收藏条目` | service.tsx | L36 注释 | JSDoc 注释 |
| `获取可选标签` | service.tsx | L56 注释 | JSDoc 注释 |
| `获取收藏文件预览数据` | service.tsx | L70 注释 | JSDoc 注释 |
| `获取收藏文件预览初始化` | service.tsx | L82 注释 | JSDoc 注释 |
| `上传文件` | service.tsx | L114 注释 | JSDoc 注释 |
| `我的收藏` | MyFavorite.tsx | L2 注释 | 文件头注释 |

---

## 三、代码注释（API 参数说明，保持中文）

以下为 `service.tsx` 中的函数参数注释，供开发者理解接口字段含义，无需翻译：

```typescript
/**
 * type 条目类型
 * pageIndex  页码
 * labelName  标签
 * keyWord  搜索关键字
 */
```

```typescript
/**
 * @param data fill 操作员编码
 */
```

---

## 四、接口与数据结构

### 1. 相关接口

| 接口 | 说明 | 调用位置 |
|------|------|---------|
| `/SUP/UserColl/GetCollList` | 获取收藏条目列表 | `service.tsx:46` |
| `/SUP/UserColl/GetDetail` | 获取可选标签（collId=0） | `service.tsx:61` |
| `/SUP/UserColl/GetAttachmentFile` | 获取收藏文件预览数据 | `service.tsx:75` |
| `/JFileSrv/file/init?FielPreviewInit` | 获取文件预览初始化（注：接口名有拼写错误 `Fiel` 应为 `File`） | `service.tsx:89` |
| `/SUP/UserColl/Add` | 上传文件到收藏 | `service.tsx:122` |

### 2. 数据类型定义

**LangType**（`service.tsx:3-11`）：
```typescript
export interface LangType {
  tagList: Record<string, any>[];      // 标签列表（label + key）
  labelTagIndex: number;                // '标签' 选项卡所在序号（当前为 -1，未启用）
  Upload: string;                       // 上传按钮文案
  FilePreview: string;                  // 文件预览窗口标题
  NoMore: string;                       // 无更多数据提示
  ImgAlt: string;                       // 图片 alt
  From: string;                         // 来源标签
}
```

**FileListState**（`service.tsx:26-34`）：
```typescript
export interface FileListState {
  dataList: { collId }[];              // 收藏条目列表
  keyWord: string;                      // 搜索关键字
  isRequesting: boolean;                // 防止重复请求标志
  isEnd: boolean;                       // 是否无可加载内容
  tagsData: { labelName }[];            // 标签数据
  pageIndex: number;                    // 当前页码
  selectedTag: string;                  // 当前选中标签
}
```

---

## 五、结论与建议

1. **当前状态**：收藏页面的文案已集中在 `service.tsx` 的 `defaultLang` 对象中，但尚未接入平台多语言系统。

2. **接入路径**：
   - 参考 `src/pages/workFlow/.../language.ts`，新建 `src/pages/myFavorite/language.ts`。
   - 定义 `LangKey` 枚举（包含上述 13 个 `mf*` key）。
   - 实现 `getLangText(key, defaultText)` 函数，运行时调用 `udp.getLang()` 查询平台词典，中文兜底。
   - 将 `defaultLang` 的静态值替换为 `getLangText()` 调用。

3. **后端登记**：需在平台语言包中为 `mf*` 前缀的 key 注册中英文翻译（busType 待确认，可能需要新增或复用现有 identity）。

4. **动态文案处理**：`mfUploadFailReason` 的 `{0}` 占位符需配合格式化函数使用，参考 `workFlow` 页面的 `formatStringForArgs` 实现。

5. **未启用标签**：`聊天记录`、`收藏单据`、`标签` 三个标签页定义了但未使用，如需启用请同步添加对应的多语言 key。

6. **图标文件**：`src/pages/myFavorite/icons/` 目录下的图标（Common、Exl、JPG、PDF、PNG、ppt、record、TXT、video、Word）无需翻译。
