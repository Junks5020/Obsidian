---
tags:
  - ng-design
  - attachment
  - i18n
  - 中文文案审计
status: current
date: 2026-08-21
updated: 2026-08-21
source: packages/@newgrand/udp-mobile-ui/src/component/Attachment
---

# ng-design Attachment 中文清单

相关：[[00-版本总览]] · [[ng-design-附件术语表]] · [[ng-design-ADR-0003-Attachment中文消息具名占位符协议]]

## 结论

扫描目录 `packages/@newgrand/udp-mobile-ui/src/component/Attachment`，共检查 49 个文件。47 个文件包含中文，合计 686 行；其中 TypeScript/TSX 语法树识别出 63 条不重复的运行时中文候选，共 102 处。

“运行时中文候选”包括字符串字面量、模板字符串和 JSX 文本，可作为国际化抽离的工作清单；日志、异常消息和接口转换文本也包含在内，是否面向最终用户需要在改造时结合调用链确认。注释、JSDoc 和样式注释不属于运行时文案，但完整保留在文末审计附录中。

## 运行时中文候选

| 中文内容                              | 出现次数 | 源码位置                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------- | ---: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 办理意见中包含敏感字:${...}${...},请修改后重新提交! |    1 | `util.ts:92`                                                                                                                                                                                                                                                                                                                                 |
| 不支持上传：${...} 格式                   |    1 | `upload/validateAttachOptions.ts:39`                                                                                                                                                                                                                                                                                                         |
| 查看文档                              |    1 | `custom-preview.tsx:91`                                                                                                                                                                                                                                                                                                                      |
| 成功                                |    1 | `upload/upload.tsx:607`                                                                                                                                                                                                                                                                                                                      |
| 单据附件未关联表名！                        |    1 | `attachment.tsx:87`                                                                                                                                                                                                                                                                                                                          |
| 当前文件格式不支持预览                       |    3 | `attachment-preview.tsx:271`<br>`attachment-preview.tsx:313`<br>`attachment-preview.tsx:355`                                                                                                                                                                                                                                                 |
| 附件                                |    3 | `attachment-upload.tsx:26`<br>`AttachOffline/upload.tsx:31`<br>`upload/upload.tsx:38`                                                                                                                                                                                                                                                        |
| 附件不存在                             |    1 | `util.ts:220`                                                                                                                                                                                                                                                                                                                                |
| 附件初始化失败                           |    1 | `attachment.tsx:293`                                                                                                                                                                                                                                                                                                                         |
| 附件加载失败                            |    1 | `attachment-preview.tsx:179`                                                                                                                                                                                                                                                                                                                 |
| 附件上传数量已达上限                        |    3 | `attachment-upload.tsx:253`<br>`AttachOffline/upload.tsx:176`<br>`upload/upload.tsx:484`                                                                                                                                                                                                                                                     |
| 附件信息获取失败                          |    1 | `AttachmentView/index.ts:144`                                                                                                                                                                                                                                                                                                                |
| 附件预览地址不存在                         |    2 | `AttachmentView/index.ts:156`<br>`util.ts:242`                                                                                                                                                                                                                                                                                               |
| 附件预览地址获取失败                        |    1 | `AttachmentView/index.ts:106`                                                                                                                                                                                                                                                                                                                |
| 共${...}文件                         |    1 | `attachment-upload.tsx:351`                                                                                                                                                                                                                                                                                                                  |
| 合计                                |    1 | `upload/upload.tsx:621`                                                                                                                                                                                                                                                                                                                      |
| 获取位置失败                            |    1 | `upload/upload.tsx:162`                                                                                                                                                                                                                                                                                                                      |
| 仅支持上传：${...} 格式                   |    1 | `upload/validateAttachOptions.ts:29`                                                                                                                                                                                                                                                                                                         |
| 离线数据${...}                        |    1 | `AttachOffline/OfflineListHelp.tsx:48`                                                                                                                                                                                                                                                                                                       |
| 离线数据查询返回空                         |    1 | `AttachOffline/utils.ts:45`                                                                                                                                                                                                                                                                                                                  |
| 离线数据返回类型异常:                       |    1 | `AttachOffline/utils.ts:54`                                                                                                                                                                                                                                                                                                                  |
| 离线数据解析失败                          |    1 | `AttachOffline/utils.ts:58`                                                                                                                                                                                                                                                                                                                  |
| 离线数据解析失败: query                   |    1 | `AttachOffline/utils.ts:25`                                                                                                                                                                                                                                                                                                                  |
| 离线状态不能初始化                         |    1 | `attachment.tsx:376`                                                                                                                                                                                                                                                                                                                         |
| 连拍                                |    2 | `accept.tsx:28`<br>`upload/accept.tsx:22`                                                                                                                                                                                                                                                                                                    |
| 录像                                |    2 | `accept.tsx:42`<br>`upload/accept.tsx:43`                                                                                                                                                                                                                                                                                                    |
| 没有更多了                             |    1 | `AttachOffline/OfflineListHelp.tsx:181`                                                                                                                                                                                                                                                                                                      |
| 拍照                                |    4 | `accept.tsx:14`<br>`accept.tsx:21`<br>`upload/accept.tsx:15`<br>`upload/accept.tsx:28`                                                                                                                                                                                                                                                       |
| 签名                                |    2 | `accept.tsx:59`<br>`upload/accept.tsx:50`                                                                                                                                                                                                                                                                                                    |
| 请选择来源                             |    3 | `attachment-upload.tsx:332`<br>`AttachOffline/upload.tsx:229`<br>`upload/upload.tsx:571`                                                                                                                                                                                                                                                     |
| 取消                                |    3 | `attachment-upload.tsx:336`<br>`AttachOffline/upload.tsx:250`<br>`upload/upload.tsx:590`                                                                                                                                                                                                                                                     |
| 全部                                |    1 | `attachment-type-list.tsx:64`                                                                                                                                                                                                                                                                                                                |
| 筛选                                |    1 | `AttachOffline/OfflineListHelp.tsx:28`                                                                                                                                                                                                                                                                                                       |
| 删除成功                              |    1 | `AttachOffline/index.tsx:71`                                                                                                                                                                                                                                                                                                                 |
| 删除失败                              |    1 | `api/attachemntDelete/response.ts:21`                                                                                                                                                                                                                                                                                                        |
| 上传初始化中                            |    1 | `upload/upload.tsx:626`                                                                                                                                                                                                                                                                                                                      |
| 上传附件                              |    2 | `attachment-upload.tsx:257`<br>`upload/upload.tsx:488`                                                                                                                                                                                                                                                                                       |
| 上传附件(离线)                          |    1 | `AttachOffline/upload.tsx:180`                                                                                                                                                                                                                                                                                                               |
| 上传前修改时间                           |    1 | `Card.tsx:45`                                                                                                                                                                                                                                                                                                                                |
| 上传前修改时间:                          |    2 | `AttachOffline/Card.tsx:14`<br>`Card.tsx:47`                                                                                                                                                                                                                                                                                                 |
| 上传人:                              |    2 | `AttachOffline/Card.tsx:50`<br>`Card.tsx:76`                                                                                                                                                                                                                                                                                                 |
| 上传失败                              |   11 | `api/attachemntUpload/customizedUploadResponse.ts:25`<br>`upload/api/uploadFileNew/response.ts:28`<br>`upload/upload.tsx:130`<br>`upload/upload.tsx:202`<br>`upload/upload.tsx:246`<br>`upload/upload.tsx:300`<br>`upload/upload.tsx:332`<br>`upload/upload.tsx:367`<br>`upload/util.ts:145`<br>`upload/util.ts:175`<br>`upload/util.ts:180` |
| 上传时间:                             |    1 | `Card.tsx:77`                                                                                                                                                                                                                                                                                                                                |
| 失败                                |    1 | `upload/upload.tsx:614`                                                                                                                                                                                                                                                                                                                      |
| 搜索                                |    1 | `AttachOffline/OfflineListHelp.tsx:148`                                                                                                                                                                                                                                                                                                      |
| 文件                                |    2 | `accept.tsx:49`<br>`upload/accept.tsx:57`                                                                                                                                                                                                                                                                                                    |
| 文件大小不能超过 ${...}MB!                |    1 | `upload/validateAttachOptions.ts:50`                                                                                                                                                                                                                                                                                                         |
| 文件大小已超过 ${...}MB, 是否继续上传!         |    1 | `upload/validateAttachOptions.ts:56`                                                                                                                                                                                                                                                                                                         |
| 文件路径为空，无法删除                       |    1 | `AttachOffline/index.tsx:64`                                                                                                                                                                                                                                                                                                                 |
| 文件路径为空，无法预览                       |    1 | `AttachOffline/index.tsx:44`                                                                                                                                                                                                                                                                                                                 |
| 文件名包含敏感词，请修改后重试                   |    1 | `upload/validateAttachOptions.ts:77`                                                                                                                                                                                                                                                                                                         |
| 文件名格式不符合要求                        |    1 | `upload/validateAttachOptions.ts:66`                                                                                                                                                                                                                                                                                                         |
| 文件预览失败：                           |    1 | `AttachOffline/index.tsx:53`                                                                                                                                                                                                                                                                                                                 |
| 无匹配选项                             |    1 | `AttachOffline/OfflineListHelp.tsx:179`                                                                                                                                                                                                                                                                                                      |
| 相册                                |    2 | `accept.tsx:35`<br>`upload/accept.tsx:36`                                                                                                                                                                                                                                                                                                    |
| 已上传${...}文件                       |    1 | `attachment-upload.tsx:350`                                                                                                                                                                                                                                                                                                                  |
| 已是第一页                             |    1 | `attachment-preview.tsx:117`                                                                                                                                                                                                                                                                                                                 |
| 已是最后一页                            |    1 | `attachment-preview.tsx:131`                                                                                                                                                                                                                                                                                                                 |
| 引用离线数据                            |    1 | `AttachOffline/OfflineListHelp.tsx:99`                                                                                                                                                                                                                                                                                                       |
| 预览失败，请重试                          |    1 | `AttachOffline/index.tsx:54`                                                                                                                                                                                                                                                                                                                 |
| 暂无上传权限                            |    3 | `attachment-upload.tsx:246`<br>`AttachOffline/upload.tsx:169`<br>`upload/upload.tsx:477`                                                                                                                                                                                                                                                     |
| 正在上传                              |    2 | `attachment-upload.tsx:346`<br>`upload/upload.tsx:600`                                                                                                                                                                                                                                                                                       |
| 最大上传数 ${...}                      |    5 | `attachment-upload.tsx:291`<br>`attachment-upload.tsx:312`<br>`AttachOffline/upload.tsx:208`<br>`upload/upload.tsx:519`<br>`upload/upload.tsx:545`                                                                                                                                                                                           |

## 完整中文命中

以下附录覆盖全部 686 个含中文源码行，包含运行时文案、注释、JSDoc 和 LESS 注释。行号以 2026-08-21 当前工作区为准。

<details>
<summary><code>accept.tsx</code>（8 行）</summary>

````text
   6 |  * @Description: 接受文件上传类型枚举
  14 |     name: '拍照',
  21 |     name: '拍照',
  28 |     name: '连拍',
  35 |     name: '相册',
  42 |     name: '录像',
  49 |     name: '文件',
  59 |     name: '签名',
````

</details>

<details>
<summary><code>api/attachemntDelete/customizedDeleteResponse.ts</code>（4 行）</summary>

````text
   6 |  * @Description: 附件删除响应内容6.x
  12 |    * 删除成功文件Id
  18 |    * 错误信息
  24 |    * 响应结果
````

</details>

<details>
<summary><code>api/attachemntDelete/index.ts</code>（1 行）</summary>

````text
   6 |  * @Description: 附件删除接口声明导出
````

</details>

<details>
<summary><code>api/attachemntDelete/request.ts</code>（3 行）</summary>

````text
   6 |  * @Description: 附件删除请求参数
  16 |    * 会话Id
  22 |    * 行为数据 为数据的phId 无值时和sessionGuid统一
````

</details>

<details>
<summary><code>api/attachemntDelete/response.ts</code>（5 行）</summary>

````text
   6 |  * @Description: 附件删除响应内容
  12 |    * 删除成功文件Id
  18 |    * 错误信息
  21 |   @Transform(({ value }) => (value !== 'success' ? '删除失败' : ''), { toClassOnly: true })
  25 |    * 响应结果
````

</details>

<details>
<summary><code>api/attachemntInit/customizedResponse.ts</code>（1 行）</summary>

````text
   6 |  * @Description: 附件初始化响应内容6.x
````

</details>

<details>
<summary><code>api/attachemntInit/index.ts</code>（1 行）</summary>

````text
   6 |  * @Description: 附件初始化接口声明导出
````

</details>

<details>
<summary><code>api/attachemntInit/request.ts</code>（1 行）</summary>

````text
   6 |  * @Description: 附件初始化请求参数
````

</details>

<details>
<summary><code>api/attachemntInit/response.ts</code>（1 行）</summary>

````text
   6 |  * @Description: 附件初始化响应内容
````

</details>

<details>
<summary><code>api/attachemntUpload/customizedUploadResponse.ts</code>（5 行）</summary>

````text
   6 |  * @Description: 附件上传响应内容
  13 |    * 附件列表
  21 |    * 错误信息
  25 |       return obj.message !== 'success' ? '上传失败' : '';
  32 |    * 是否上传成功
````

</details>

<details>
<summary><code>api/attachemntUpload/index.ts</code>（1 行）</summary>

````text
   6 |  * @Description: 附件上传接口声明导出
````

</details>

<details>
<summary><code>api/attachemntUpload/request.ts</code>（4 行）</summary>

````text
   6 |  * @Description: 附件上传请求参数
   9 |  * @param {File} file - 上传文件
  10 |  * @param {String} filename - 文件名称
  11 |  * @param {String} asrsessionguid - 会话Id
````

</details>

<details>
<summary><code>api/attachemntUpload/response.ts</code>（4 行）</summary>

````text
   6 |  * @Description: 附件上传响应内容
  13 |    * 附件列表
  20 |    * 错误信息
  26 |    * 是否上传成功
````

</details>

<details>
<summary><code>api/attachmentData.ts</code>（16 行）</summary>

````text
   6 |  * @Description: 附件上传返回附件数据格式
  18 |    * 文件Id
  24 |    * 文件Id
  29 |    * 文件代码
  35 |    * 文件代码
  40 |    * 文件名称
  46 |    * 文件名称
  51 |    * 上传人id
  56 |    * 上传人名字
  61 |    * 文件路径
  67 |    * 文件路径
  72 |    * 文件上传时间
  80 |    * 文件生成时间
  85 |    * 文件生成时间
  90 |    * 文件大小
  96 |    * 文件大小
````

</details>

<details>
<summary><code>api/customizedAttachmentData.ts</code>（14 行）</summary>

````text
  11 |    * 文件Id
  17 |    * 文件代码
  23 |    * 文件名称
  29 |    * 明细表名
  34 |    * 上传人id
  39 |    * 上传人名字
  44 |    * 文件路径
  50 |    * 文件上传时间
  56 |    * 文件生成时间
  61 |    * 文件大小
  67 |    * 分类id
  72 |    * 附件是否归档
  77 |    * 分类名
  88 |    * 附件备注信息
````

</details>

<details>
<summary><code>api/service.ts</code>（18 行）</summary>

````text
   6 |  * @Description: 附件接口请求
  30 |  * 附件数据初始化
  45 |  * 上传附件
  51 |     requestType: 'form', // 格式 FormData
  52 |     credentials: 'omit' // 不需要携带cookie cors跨域
  61 |  * 删除附件
  88 |  * 预览接口会根据不同入参调用不同的接口
  90 |  * 最终解释权归 吴红桥 所有
  93 |   *** 根据附件phid获取附件预览接口 ***
  94 |   返回 phid 为印射的对象
 104 |   *** 根据附件 asrFids 获取附件预览接口 ***
 105 |   返回 asrFid 为印射的对象
 115 |   *** 根据附件名称获取附件预览接口 ***
 116 |   返回 名称对应的单个预览地址
 126 |  * 获取某单据所有附件预览链接接口
 138 |  * 根据文件的phid或asrFid下载二进制数据
 148 |  * 获取下载链接接口
 181 |  * 获取附件相关信息
````

</details>

<details>
<summary><code>attachment-list.tsx</code>（4 行）</summary>

````text
   6 |  * @Description: 附件列表展示组件
  34 |    * 删除附件
  37 |     setLoading([...loadingList, data]); // 添加到正在删除列表
  43 |       () => setLoading(loadingList.filter((v) => v.AsrFid !== data.AsrFid)) // 从正在删除列表里移除
````

</details>

<details>
<summary><code>attachment-preview.tsx</code>（19 行）</summary>

````text
   6 |  * @Description: 附件预览展示组件
 109 |    * 上一页
 117 |         content: '已是第一页'
 123 |    * 下一页
 131 |         content: '已是最后一页'
 137 |    * 放大
 145 |    * 缩小
 153 |    * 全屏适应窗口
 160 |    * effect 容器大小变动
 179 |         onLoadError={() => Toast.show({ icon: 'fail', content: '附件加载失败' })}
 237 |    * 预览文件顺序文件类型
 245 |       // 云南能投需求， 如果预览接口返回的是PDF-URL则使用PDF预览
 249 |     // 如果不是PDF 那就走 fileName 的判断
 258 |    * 通过原生/第三方平台方法打开文件
 271 |         content: '当前文件格式不支持预览'
 284 |    * 通过打开外部链接打开Excel
 313 |         content: '当前文件格式不支持预览'
 322 |    * 渲染对应文件类型预览组件
 355 |             content: '当前文件格式不支持预览'
````

</details>

<details>
<summary><code>attachment-type-list.tsx</code>（5 行）</summary>

````text
   6 |  * @Description: 附件列表展示组件
  64 |           name: '全部',
  92 |    * 删除附件
  95 |     setLoading([...loadingList, data]); // 添加到正在删除列表
 101 |       () => setLoading(loadingList.filter((v) => v.AsrFid !== data.AsrFid)) // 从正在删除列表里移除
````

</details>

<details>
<summary><code>attachment-upload.tsx</code>（34 行）</summary>

````text
   6 |  * @Description: 附件上传组件
  26 |     label = '附件',
  49 |    * 过滤 acceptList
  65 |    * 生成滑块子项
  83 |    * 生成滑快(默认4个一组)
 103 |    * 打开签名附件 上传签名附件
 115 |    * 处理Popup关闭后回调
 124 |         // 重要 选择完接受文件类型后再打开文件弹框
 131 |    * 处理上传文件的之前的行为
 140 |    * 自定义上传行为
 172 |    * 处理Upload onChange
 181 |     // 之前无正在上传文件 现阶段有待上传文件 => 从头开始上传
 190 |     // 之前有正在上传文件 现阶段有待上传文件 => 更新正在上传文件
 202 |         uploadingPercent: uploadingPercent > percent ? uploadingPercent : percent // 优先取大的进度
 206 |     // 之前有上传文件 现阶段无上传文件 => 上传完成
 212 |       // 隔一定时间关闭进度显示模态框(好歹让人看到进度100%)
 214 |       // 上传完成告诉父组件一下 返回内容为上传后的响应数据
 225 |    * 给进度条添加定时器 使上传进度条更加生动
 246 |           暂无上传权限
 253 |           附件上传数量已达上限
 257 |     return '上传附件';
 267 |       {/* 上传按钮  */}
 271 |         multiple={state.accept === acceptList[1].id ? true : multiple} // 相册默认多选
 274 |         openFileDialogOnClick={!state.popupVisible} // 重要 避免类型选择弹出层和文件选择同时出现
 291 |                   Toast.show(`最大上传数 ${maxCount}`);
 312 |                 Toast.show(`最大上传数 ${maxCount}`);
 323 |       {/* 上传文件类型选择弹出层 */}
 332 |             <span>请选择来源</span>
 336 |             取消
 340 |       {/* 上传进度对话框 */}
 343 |         afterClose={() => setState({ uploadingList: [], uploadingPercent: 0 })} // 关闭后重置
 346 |             <Col>正在上传</Col>
 350 |             <Col>{`已上传${state.uploadingList.filter((v) => v.status === 'done').length}文件`}</Col>
 351 |             <Col>{`共${state.uploadingList.length}文件`}</Col>
````

</details>

<details>
<summary><code>attachment.tsx</code>（38 行）</summary>

````text
   6 |  * @Description: 附件组件
  40 |     asrtable = colAttach === '1' ? 'system' : '', // 列附件默认是 system 表
  87 |     console.error('单据附件未关联表名！');
  91 |    * value 包含数据类型
  96 |    * 单附件 一般 asrCode 就是单据 phid 所以可以只接收一个值
  98 |    * guid 是此附件组件在一次完整的交互过程中需要使用的临时会话id,
  99 |    *  主要用于辅助后端关联临时表中的数据，所以再一次：上传、删除、再上传过程中要保证 guid 不会变更
 100 |    *  取值后可以不需要这个属性
 110 |   // 根据数据获取主键值 asrCode, 没有就使用默认生成的
 114 |       // 原则上不处理分号
 160 |    * 附件绑定字段处理
 162 |    *  不返回带 ; 的数据
 164 |    * 返回格式
 174 |       //使用后端返回的 guid 来做处理
 177 |       // 原逻辑不做修改
 180 |       // `${guid},${asrCode}` 格式入参，初始化时 asrCode 有可能只是 phid
 190 |    * 格式化附件地址
 218 |    * 初始化附件加载
 224 |       sessionGuid: sessionGuid, // 初始化时传入空，然后获取服务端生成的guid
 230 |       // 列附件受控展示分类信息
 293 |         content: '附件初始化失败'
 300 |    * 处理附件上传回调
 303 |     // 处理附件的filePath
 309 |     // 合并数据(需要放到前面)
 311 |     // 依据 maxCount 截取数据
 316 |    * 处理附件删除回调
 324 |    * 处理附件预览回调
 346 |     // FilePath拼接token
 356 |    * effect fileList变动s
 367 |    * 非列附件: colAttach: 0
 368 |    *    需要保证初始化的时候，asrcode 和 guid 同时作为入参，如果优先初始化了 guid 会导致服务端匹配数据出问题，查不出来数据
 369 |    * 列附件: colAttach: 1
 370 |    *    初始化时不会有 guid，再次调用 init 方法（编辑时状态，有value 变更），会记录新的的 guid 和 asrcode, 可以保证服务端的唯一性
 372 |    * 因此 非列附件 需要保持和 列附件一致的初始化方式
 376 |       console.log('离线状态不能初始化');
 418 |         /** 离线附件自动上传 */
 430 |             // uploadAttachment 返回 UploadResponse，需取 AttachList[0] 作为 AttachmentData
 473 |       loading={state.loading} // 这样设置loading避免在点击上传时再初始话显示骨架屏
````

</details>

<details>
<summary><code>AttachmentView/index.ts</code>（9 行）</summary>

````text
  15 |    * @description 附件fid数组
  19 |    * @description 是否不启用水印 0否1是
  24 |    * @description 业务点自定义水印内容
  28 |    * @description 业务类型编码
  32 |    * @description 组件样式
  36 |    * @description 自定义class
 106 |         content: res.message || '附件预览地址获取失败'
 144 |         content: '附件信息获取失败'
 156 |         content: '附件预览地址不存在'
````

</details>

<details>
<summary><code>AttachOffline/Card.tsx</code>（2 行）</summary>

````text
  14 |       return <div>上传前修改时间:{beforeUploadTime || ''}</div>;
  50 |           <div>上传人:{uploader || ''}</div>
````

</details>

<details>
<summary><code>AttachOffline/index.tsx</code>（25 行）</summary>

````text
   6 |  * @Description: 离线附件上传入口组件（整合上传、预览、删除逻辑）
  14 | // 整合后的组件 Props（继承基础上传Props + 列表相关Props）
  17 |     // 已上传的文件列表
  19 |     // 值变更回调（返回最新文件列表）
  26 |   // 本地维护文件列表状态
  29 |   // 同步外部 value 变化（表单初始化/赋值时回显）
  30 |   // 跳过内部操作触发的 value 回传，防止覆盖用户正在进行的本地操作
  38 |    * 预览文件逻辑
  39 |    * @param params 预览参数（文件路径、名称）
  44 |         core.alert('文件路径为空，无法预览');
  47 |       // 调用原生预览接口（根据实际平台API调整）
  53 |       console.error('文件预览失败：', error);
  54 |       core.alert('预览失败，请重试');
  59 |    * 删除文件逻辑
  60 |    * @param params 删除参数（文件路径）
  64 |       core.alert('文件路径为空，无法删除');
  68 |     // 2. 更新本地文件列表
  71 |     core.alert('删除成功');
  75 |    * 处理上传回调（上传组件返回待上传文件列表）
  76 |    * @param uploadList 待上传的文件列表
  83 |   // onChange 仅在用户操作（上传/删除）时主动调用，不在 value 外部同步时触发，
  84 |   // 避免初始化阶段回调导致父组件重置 value 为空
  88 |       {/* 上传按钮组件 */}
  96 |       {/* 已上传文件列表 */}
 102 | // 导出默认组件
````

</details>

<details>
<summary><code>AttachOffline/OfflineListHelp.tsx</code>（22 行）</summary>

````text
   7 | // 筛选选项的通用类型
  11 |   count?: number; // 括号里的数量，如“公开招标(6)”
  15 |   // 单选/多选模式切换
  16 |   // 已选中的值（单选传单个，多选传数组）
  18 |   // 选择变化回调
  20 |   // 弹窗标题
  28 |   title = '筛选',
  48 |         label: bill_name || `离线数据${index + 1}`,
  69 |   // 搜索关键词
  72 |   // 过滤后的选项
  78 |   // 单选模式处理
  86 |     // 可选：单选选中后自动关闭弹窗
  99 |         引用离线数据
 106 |         position={position} // 右侧滑出，也可改为bottom
 116 |           {/* 顶部导航栏 */}
 127 |             {/* 关闭箭头 */}
 145 |           {/* 搜索框 */}
 148 |               placeholder="搜索"
 159 |           {/* 选项列表 */}
 177 |             {/* 底部提示 */}
 179 |               <div style={{ textAlign: 'center', color: '#999', padding: '24px 0' }}>无匹配选项</div>
 181 |             <div style={{ textAlign: 'center', color: '#999', padding: '16px 0' }}>没有更多了</div>
````

</details>

<details>
<summary><code>AttachOffline/upload.tsx</code>（35 行）</summary>

````text
   6 |  * @Description: 附件上传组件
  31 |   const { label = '附件', onChange, disabled, maxCount = 9, count = 0 } = props;
  42 |    * 拍照并上传
  45 |     // 拍照
  49 |     // 设置初始状态
  54 |    * 连拍并上传
  57 |     // 连拍
  58 |     // 原则上  urls 和  fileDataList可以通过 索引关联
  65 |     // 设置初始状态
  70 |    * 打开相册并上传
  73 |     // 打开相册
  82 |     // 设置初始状态
  87 |    * 选择文件并上传
  90 |     // 选文件
  93 |     // 设置初始状态
  97 |    * 录像并上传
 100 |     // 录像
 103 |     // 设置初始状态
 108 |    * TODO: 原来上传逻辑直接调用服务端接口
 109 |    *  没有走适配器接口
 110 |    * 需要额外的配套解决方案： 上传下载方式，本地存储方案等等
 111 |    * 本次先不处理
 116 |   //       // 设置初始状态
 131 |    * 处理Popup内选择附件来源后关闭回调
 159 |    * effect 正在上传的文件变动
 169 |           暂无上传权限
 176 |           附件上传数量已达上限
 180 |     return '上传附件(离线)';
 192 |       {/* 上传按钮 */}
 195 |           {`${label}(离线)`}
 208 |               Toast.show(`最大上传数 ${maxCount}`);
 219 |       {/* 附件获取方式弹出层 */}
 222 |         // FIXME: 不知道哪里会在disabled为true的情况 将popupVisible设为true 现在添加disabled判断（后面再看）
 229 |             <span>请选择来源</span>
 250 |           取消
````

</details>

<details>
<summary><code>AttachOffline/utils.ts</code>（7 行）</summary>

````text
  11 | /** 主表：非空对象（明细表为数组） */
  21 |       // 原生桥可能已自动反序列化 cacheData，无需再次 JSON.parse
  25 |     console.error('离线数据解析失败: query', e);
  28 |   // 将主表字段展开到顶层，使列表卡片可通过 cardData[fieldName] 直接访问
  45 |       console.warn('离线数据查询返回空');
  54 |       console.warn('离线数据返回类型异常:', typeof resData);
  58 |     console.error('离线数据解析失败', e);
````

</details>

<details>
<summary><code>Card.tsx</code>（5 行）</summary>

````text
  43 |      * cfgAttach name 属性对应的名称是中文的
  45 |     const show = cfgAttach.find((cfg) => cfg.name === '上传前修改时间')?.show === 1;
  47 |       return <div>上传前修改时间:{beforeUploadTime}</div>;
  76 |           <div>上传人:{uploader || ''}</div>
  77 |           <div>上传时间:{createTime || ''}</div>
````

</details>

<details>
<summary><code>custom-preview.tsx</code>（1 行）</summary>

````text
  91 |               <span style={{ marginRight: 5 }}>查看文档</span>
````

</details>

<details>
<summary><code>display.ts</code>（1 行）</summary>

````text
   4 | /** 格式化附件大小：达到 1MB 后使用 MB，其余使用 KB。 */
````

</details>

<details>
<summary><code>index.less</code>（10 行）</summary>

````text
   1 | // 文件上传按钮
  29 | // 文件接收类型选择弹出层
  80 | // 附件标签
  96 | // 纯图片控件列表卡片
 128 | // 附件列表卡片
 193 | // 附件预览-视频
 201 | // 附件预览-音频
 209 | // 附件预览 - pdf - 容器
 229 |   // 附件预览 - pdf - 顶部栏
 241 |   // 附件预览 - pdf - 工具栏
````

</details>

<details>
<summary><code>index.tsx</code>（1 行）</summary>

````text
   6 |  * @Description: 附件组件相关导出
````

</details>

<details>
<summary><code>types.ts</code>（89 行）</summary>

````text
   6 |  * @Description: 附件组件声明文件
  16 |  * @description 附件配置项（APP端专用）
  20 |    * @description 附件上传提醒大小 单位（MB），上传文件达到此大小弹出提示
  25 |    * @description 附件上传最大大小 单位（MB），上传文件达到此大小阻断上传
  30 |    * @description 上传的文件名不允许包含的特殊字符列表
  35 |    * @description 文件黑名单，即不允许上传的文件类型
  40 |    * @description 文件白名单，即只允许上传的文件类型，白名单优先
  45 |    * @description 附件控件的提示信息
  50 |    * @description 附件名称不允许包含的敏感词，多个用英文逗号分隔
  57 |    * @description 签名附件
  64 |    * @description 初始化
  68 |    * @description 删除
  75 |    * @description 配置索引字段
  79 |    * @description 选择文字
  83 |    * @description 选择图标
  87 |    * @description 接受文件类型字段
  91 |    * @description 捕获图像或视频数据的源
  99 |    * @description 图片
 103 |    * @description 视频
 107 |    * @description 音频
 127 |    * @description 文本
 131 |    * @description 未知类型
 138 |    * @description 文件类型
 142 |    * @description 卡片展示图标
 146 |    * @description 文件名后缀
 154 |    * @description 唯一Id 作为asrsessionguid使用
 158 |    * @description 上传文件改变时回调
 162 |    * @description 附件加载初始化方法(当父组件已经调用过时无需给属性赋值)
 166 |    * @description 附件上传组件的外部ref
 170 |    * @description 当前已上传附件个数(结合 maxCount 控制是否能继续上传)
 174 |    * @description 是否开启自定义表单水印
 178 |    * @description 自定义表单水印类型
 182 |    * @description 敏感词
 186 |    * @description 单独渲染的label
 198 |    * @description 接受文件类型字段
 202 |    * @description 选择文件类型弹出层显隐
 206 |    * @description 上传进度模态框显隐
 210 |    * @description 正在上传的文件列表
 214 |    * @description 正在上传的百分比进度
 221 |    * @description 唯一Id 作为asrsessionguid使用
 225 |    * @description 展示的文件列表
 229 |    * @description 是否只能选图片
 234 |    * @description 点击预览文件时的回调
 238 |    * @description 点击移除文件时的回调
 242 |    * @description 呼出上传附件的弹窗
 271 |    * @description 组件显隐
 275 |    * @description 关闭预览回调
 279 |    * @description 预览的文件
 288 |    * @description 业务表
 292 |    * @description 业务附件表
 297 |    * @description 回调函数
 301 |    * @description 会话id
 305 |    * @description 数据Id 初始化时获取已上传附件列表
 309 |    * @description 接受上传的文件类型,不传列举所有,详见Accept
 314 |    * @description 是否只能选图片
 319 |    * @description 是否支持多选文件
 324 |    * @description 最大上传数
 329 |    * @description 只读状态 不可删除上传
 334 |    * @description 组件样式
 338 |    * @description 是否单附件
 342 |    * @description 刷新Id
 346 |    * @description 是否开启自定义表单水印
 350 |    * @description 自定义表单水印类型
 354 |    * @description 初始化前的参数补充
 358 |    * @description 上传前的参数补充
 362 |    * @description 是否在自定义表单中
 366 |    * @description 是否是列附件
 380 |    * @description 文件列表
 384 |    * @description 预览的附件
 388 |    * @description 预览组件显隐
 400 |    * @description 总页数
 404 |    * @description 当前页数
 408 |    * @description pdf宽度尺寸
 414 |   /** 业务表 */
 416 |   /** 附件code */
 418 |   /** 附件名称 */
 420 |   /** 查看格式 */
 422 |   /** 附件phId */
 424 |   /** 业务类型code */
 429 |   wmDisabled: '1' | '0'; // 是否开启水印
 444 |   asrCode: string | number; //单据主键
 445 |   asrTable: string; //单据表名
 446 |   asrName: string; //文件名
 449 |   asrCode: string; //下载文件的phid
 473 |   asrFid: string; //下载文件的fid
 478 |   asrFids: string[]; //下载文件的fid
 482 |   phid: string; //下载文件的phid
 487 |   asrCode: string; //下载文件的phid
 498 |   asrFid?: string; //下载文件的fid
````

</details>

<details>
<summary><code>upload/accept.tsx</code>（8 行）</summary>

````text
   6 |  * @Description: 文件类型选择
  15 |     name: '拍照',
  22 |     name: '连拍',
  28 |     name: '拍照',
  36 |     name: '相册',
  43 |     name: '录像',
  50 |     name: '签名',
  57 |     name: '文件',
````

</details>

<details>
<summary><code>upload/api/service.ts</code>（4 行）</summary>

````text
   6 |  * @Description: 上传组件相关http方法
  15 |  * 附件上传
  22 |     requestType: 'form', // 格式 FormData
  23 |     credentials: 'omit' // 不需要携带cookie cors跨域
````

</details>

<details>
<summary><code>upload/api/uploadFileNew/fileData.ts</code>（16 行）</summary>

````text
   6 |  * @Description: 附件上传返回附件信息
  18 |    * 文件Id
  24 |    * 文件代码
  30 |    * 文件名称
  36 |    * 明细表名
  42 |    * 文件名
  47 |    * 上传人id
  52 |    * 上传人名字
  57 |    * 文件路径
  63 |    * 文件上传时间
  69 |    * 文件生成时间
  74 |    * 文件大小
  80 |    * 分类id
  85 |    * 附件是否归档
  90 |    * 分类名
 101 |    * 附件备注信息
````

</details>

<details>
<summary><code>upload/api/uploadFileNew/index.ts</code>（1 行）</summary>

````text
   6 |  * @Description: 附件上传相关导出
````

</details>

<details>
<summary><code>upload/api/uploadFileNew/request.ts</code>（4 行）</summary>

````text
   6 |  * @Description: 附件上传请求参数
   9 |  * @param {File} file - 上传文件
  10 |  * @param {String} filename - 文件名称
  11 |  * @param {String} asrsessionguid - 会话Id
````

</details>

<details>
<summary><code>upload/api/uploadFileNew/response.ts</code>（5 行）</summary>

````text
   6 |  * @Description: 附件上传响应内容
  16 |    * 附件列表
  24 |    * 错误信息
  28 |       return obj.message !== 'success' ? '上传失败' : '';
  35 |    * 是否上传成功
````

</details>

<details>
<summary><code>upload/base.less</code>（69 行）</summary>

````text
   1 | @global-font: PingFangSC-Regular, sans-serif, monospace; // 全局字体
  22 | // ***** 全局颜色定义 *******
  23 | @color-primary: @blue; // 主色调 eg.如功能性按钮、提示性icon
  25 | @color-brand: @orange; // 品牌色 eg.强调性⽂案
  26 | @color-bubble: @orange-light; // 辅助色 eg.我⽅聊天⽓泡背景⾊
  27 | @color-link: @orange-light; // 链接色 eg.⽤于超链接⽂案、按钮
  28 | @color-error: @red; // 辅助色 eg.红⾊_错误信息提示
  30 | // ***** 背景颜色定义 *******
  31 | @color-fill-grey-inverse: @blank; // 空白色
  32 | @color-divider-background: @grey-divider; // ⼤⾯积使⽤，⽤于背景存托
  33 | @color-control-background: @grey; // 备注、事由等控件背景⾊
  35 | // ***** 文字颜色定义 *******
  36 | @color-text-primary: @blue; // 主色 如功能操作性按钮
  37 | @color-text-on-primary: @white; // 主色背景色上使用的字体颜色
  38 | @color-text-primary-light: @blank-light; // 主色-浅 默认标签⽂案
  39 | @color-text-warning: @red; // 警告色 红⾊_错误信息提示
  40 | @color-text-title: @black; // 主标题 ⿊⾊_标题、正⽂、等常规性⽂字
  41 | @color-text-subtitle: @grey-sub; // 副标题 深灰_辅助、默认状态⽂字
  42 | @color-text-weak: @grey-weak; // 弱文案 灰⾊_失效、辅助⽂字
  44 | // ***** 分割线颜色定义 *******
  47 | // ***** 遮罩层颜色定义 *******
  50 | // ***** 字体大小定义 *******
  51 | @font-size-navigation-title: 20px; // 导航栏字号
  52 | @font-size-notice-title: 18px; // 新闻、公告、通知等标题
  53 | @font-size-list: 16px; // 列表
  54 | @font-size-normal: 14px; // 常规内容
  55 | @font-size-normal-secondary: 12px; // 次常规内容
  56 | @font-size-normal-weak: 11px; // 弱化内容和弱辅助⽂案
  58 | // ***** 圆⻆定义 *******
  63 | // ***** 间距定义 *******
  64 | @h-spacing-standard: 8px; // 水平间距
  65 | @h-spacing-large: 16px; // 水平间距-大
  66 | @v-spacing-standard: 8px; // 垂直间距
  67 | @v-spacing-large: 16px; // 垂直间距-大
  68 | @global-padding: 15px; // 统一的内边距
  70 | // ***** 组件颜色定义 *******
  77 | // 规范2.0
  79 | // ***** 字体定义 ********
  80 | @font-size-extra-large: 0.22rem; // 用于特大标题
  81 | @font-size-title: 0.16rem; // 用于页面内的小标题
  82 | @font-size-text: 0.14rem; // 常规的字号
  83 | @font-size-small: 0.12rem; // 次级元素/角标的字号
  85 | // ***** 字体颜色预设 ******
  87 | @font-color-title: rgba(0, 0, 0, 0.86); // 用于页面内的小标题
  88 | @font-color-text: rgba(0, 0, 0, 0.7); // 常规的字号
  89 | @font-color-small: rgba(0, 0, 0, 0.4); // 次级元素/角标的字号
  91 | // ***** 行高 ********
  97 | // ****** 间距 *********
 105 | // ****** 字体 *********
 106 | @font-family-medium: PingFangSC-Medium, PingFangSC-Regular, sans-serif, monospace; // 全局字体
 107 | @font-family-regular: PingFangSC-Regular, sans-serif, monospace; // 全局字体
 110 | // ui-style.less --- 颜色
 119 | @primary-color: @nova-blue-1; // 主题色
 120 | @primary-color-variant: @blue-blue-2; // 点击事件颜色
 121 | @primary-color-deactive: @nova-blue-3; // 禁用状态颜色
 122 | @success-color: @nova-green-1; // 操作正确反馈色
 123 | @alert-color: @nova-red-1; // 警觉色
 124 | @warning-color: @nova-orange-1; // 系统通知色
 141 | // 全局背景色
 143 | // 弹框遮罩
 145 | // 表单分割线
 147 | // 聊天详情背景
 150 | // ***** 文字相关的全局语义化
 151 | // 基础值
 158 | // 全局语义
 164 | // 特殊场景
 169 | // ***** 间距相关的全局语义化
 170 | // 基础值 (如出现设计稿间距出现奇数,则为错误数值,请及时与常亮沟通)
 179 | // 局部语义
````

</details>

<details>
<summary><code>upload/index.less</code>（7 行）</summary>

````text
  12 | // 上传按钮
  14 |   // 图标
  20 |   // 提示语
  28 | // 附件来源选择弹出层
  86 | // 上传进度模态框
  88 |   // 成功数
  92 |   // 失败数
````

</details>

<details>
<summary><code>upload/index.tsx</code>（1 行）</summary>

````text
   6 |  * @Description: 附件上传组件导出
````

</details>

<details>
<summary><code>upload/types.ts</code>（67 行）</summary>

````text
   6 |  * @Description: 上传组件声明文件
  12 |  * @description 附件获取方式
  15 |   /** 拍照 */
  17 |   /** 连拍 */
  19 |   /** 相册 */
  21 |   /** 录像 */
  23 |   /** 签名 */
  25 |   /** 文件 */
  43 |  * @description 附件获取方式展示
  46 |   /** 主键 */
  48 |   /** 动作 */
  50 |   /** 名称 */
  52 |   /** 图标 */
  54 |   /** 类型 */
  59 |  * @description 平台调用拍照返回
  62 |   /** 调用成功状态 */
  64 |   /** 图片路径 */
  69 |  * @description 平台调用连拍返回
  72 |   /** 调用成功状态 */
  74 |   /** 图片路径 */
  79 |  * @description 平台调用相册返回
  82 |   /** 调用成功状态 */
  84 |   /** 数据 */
  92 |  * @description 平台调用录像返回
  95 |   /** 调用成功状态 */
  97 |   /** 视频路径 */
 102 |  * 平台调用上传参数
 105 |   /** 文件信息 */
 107 |     /** 文件路径(原生) */
 109 |     /** 文件类型 */
 111 |     /** 文件名称 */
 113 |     /** 媒体类型 */
 116 |   /** 请求路径 */
 118 |   /** 额外参数 */
 123 |  * @description 平台调用附件上传返回
 126 |   /** 上传状态 */
 128 |   /** 错误信息 */
 130 |   /** 附件列表 */
 135 |  * @description 上传组件Props
 139 |    * @description 敏感词
 143 |   /** 作为asrsessionguid使用 */
 145 |   /** 回调函数 */
 148 |    * @description 上传前的参数补充
 151 |   /** 附件获取方式限制 详见acceptList id */
 153 |   /** 附件加载初始化方法(当父组件已经调用过时无需给属性赋值) */
 155 |   /** 只读状态 不可上传 */
 157 |   /** 最大上传数量 */
 159 |   /** 当前已上传数量 */
 161 |   /** 组件实例获取 */
 164 |    * @description 是否开启自定义表单水印
 168 |    * @description 自定义表单水印类型
 188 |   /** 回调函数 */
 190 |   /** 只读状态 不可上传 */
 192 |   /** 最大上传数量 */
 194 |   /** 当前已上传数量 */
 199 |  * @description 上传组件State
 202 |   /** 附件获取方式 */
 204 |   /** 附件获取方式选择弹出层显隐 */
 206 |   /** 附件上传进度模态框显隐 */
 208 |   /** 正在上传的文件列表 */
 210 |     /** 上传状态 */
 212 |     /** 文件路径原生地址 */
 214 |     /** 上传完成后响应数据 */
 218 |   /** 上传百分比进度 */
 227 |  * @description 平台调用选择文件返回
 230 |   /** 调用成功状态 */
 232 |   /** 视频路径 */
````

</details>

<details>
<summary><code>upload/upload.tsx</code>（70 行）</summary>

````text
   6 |  * @Description: 附件上传组件
  38 |     label = '附件',
  43 |       // 是否微信
  45 |       // 微信环境需要 api 支持录像
  48 |         // 安卓、iOS、鸿蒙允许选文件，其它平台不允许
  51 |       // 其它默认支持
  76 |    * 过滤 acceptList
  91 |    * 获取平台调用上传参数
 106 |    * 处理上传之前默认行为
 114 |    * 平台调用上传
 130 |       throw new Error('上传失败');
 135 |    * http上传
 160 |         // 如果获取位置失败，直接阻塞，并进行提示
 162 |           NG.alert('获取位置失败');
 178 |    * 拍照并上传
 182 |     // 水印获取失败(如定位失败)时，中断后续流程
 184 |     // 拍照
 192 |     // 设置初始状态
 194 |     // 上传
 202 |         NG.alert(res.Error || '上传失败');
 216 |    * 连拍并上传
 220 |     // 水印获取失败(如定位失败)时，中断后续流程
 222 |     // 连拍
 223 |     // 原则上  urls 和  fileDataList可以通过 索引关联
 227 |       url: v || fileDataList?.[index]?.url, // 兼容新的数据格式
 230 |     // 设置初始状态
 232 |     // 上传前默认行为(批量上传需要提前执行)
 234 |     // 上传
 246 |           NG.alert(res.Error || '上传失败');
 270 |    * 打开相册并上传
 273 |     // 打开相册
 282 |     // 设置初始状态
 284 |     // 上传前默认行为(批量上传需要提前执行)
 286 |     // 上传
 300 |           NG.alert(res.Error || '上传失败');
 311 |    * 选择文件并上传
 314 |     // 选文件
 322 |     // 设置初始状态
 324 |     // 上传
 332 |         NG.alert(res.Error || '上传失败');
 345 |    * 录像并上传
 348 |     // 录像
 356 |     // 设置初始状态
 358 |     // 上传
 367 |         NG.alert(res.Error || '上传失败');
 380 |    * 获取签名并上传
 385 |         // 设置初始状态
 396 |           // 更新状态
 412 |    * 处理Popup内选择附件来源后关闭回调
 440 |    * 给进度条添加定时器
 453 |    * effect 正在上传的文件变动
 460 |     // 隔一定时间关闭进度显示模态框(好歹让人看到进度100%)
 462 |     // 通知父组件
 477 |           暂无上传权限
 484 |           附件上传数量已达上限
 488 |     return '上传附件';
 500 |       {/* 上传按钮 */}
 519 |                 Toast.show(`最大上传数 ${maxCount}`);
 545 |                 Toast.show(`最大上传数 ${maxCount}`);
 561 |       {/* 附件获取方式弹出层 */}
 564 |         // FIXME: 不知道哪里会在disabled为true的情况 将popupVisible设为true 现在添加disabled判断（后面再看）
 571 |             <span>请选择来源</span>
 590 |           取消
 593 |       {/* 上传进度模态框 */}
 597 |         afterClose={() => setState({ uploadiList: [], uploadingPercent: 0 })} // 关闭后重置
 600 |             <Col>正在上传</Col>
 607 |                   成功
 614 |                     失败
 621 |                   合计
 626 |               <Col>上传初始化中</Col>
````

</details>

<details>
<summary><code>upload/util.ts</code>（13 行）</summary>

````text
  43 |  * @Description: 工具函数
  46 |   // 获取到base64编码
  48 |   // 获取文件类型
  50 |   // 将base64编码转为字符串
  52 |   // 创建初始化为0的，包含length个元素的无符号整型数组
  71 |   // 离线数据无此参数
  73 |   // 离线数据无此参数
 111 |        * 转换成毫秒时间戳， * 1000， 要是发现不对需要查看后端发挥是否发生更改
 129 |  * 平台调用上传
 145 |     throw new Error('上传失败');
 156 |   // 离线数据无此参数
 175 |       NG.alert(res.Error || '上传失败');
 180 |     NG.alert('上传失败');
````

</details>

<details>
<summary><code>upload/validateAttachOptions.ts</code>（8 行）</summary>

````text
   5 |  * 附件上传全量校验。
   6 |  * 原生平台可能只返回文件地址，因此仅在对应元数据存在时执行校验。
  29 |         message: `仅支持上传：${fileWhiteList} 格式`
  39 |         message: `不支持上传：${fileFormatRestrictUpload} 格式`
  50 |         message: `文件大小不能超过 ${attachmentMaxSize}MB!`
  56 |         message: `文件大小已超过 ${attachmentWarnSize}MB, 是否继续上传!`
  66 |         message: '文件名格式不符合要求'
  77 |         message: '文件名包含敏感词，请修改后重试'
````

</details>

<details>
<summary><code>util.ts</code>（19 行）</summary>

````text
   6 |  * @Description: 工具函数
  35 |   // 获取到base64编码
  37 |   // 获取文件类型
  39 |   // 将base64编码转为字符串
  41 |   // 创建初始化为0的，包含length个元素的无符号整型数组
  56 |   // 40P2后有效
  69 | // 敏感词相关逻辑控制
  92 |       core.alert(`办理意见中包含敏感字:${words.join(',')}${suffix},请修改后重新提交!`);
 124 |  * 格式化附件地址
 149 |  * 判断是否为公司Nova项目浏览器
 154 |  * 判断是否为安卓
 159 |  * 判断是否为苹果
 164 |  * 判断是否为微信
 169 |  * 判断是否为鸿蒙
 174 |  * 判断是否是钉钉
 220 |     message: res.code === 200 && !success ? '附件不存在' : res.message,
 242 |     message: res.code === 200 && !success ? '附件预览地址不存在' : res.message,
 248 |   // 方法1: 使用URL对象（推荐）
 258 |       // 移除查询参数和锚点
````

</details>

## 扫描口径

- 中文行：使用 Unicode Han Script（`\p{Script=Han}`）逐行检测目录内全部文件。
- 运行时候选：使用仓库当前 TypeScript 编译器解析 `.ts` / `.tsx`，提取字符串字面量、无替换模板字符串、模板表达式和 JSX 文本。
- 未自动修改源码；本文是抽离清单，不代表已经完成 i18n 接入。
