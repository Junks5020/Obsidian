---
tags: [ng-design, 附件, 排查]
status: investigating
---
# 6.5.1 移动附件 GUID 差异排查

相关：[[00-版本总览]] · [[ng-design-附件术语表]]

以已通过 git ls-remote 核对的远端跟踪引用为准，未 fetch：`origin/6.3sp` 24b5ec01837bc1bda6ed2d39f2d58b221be7fa66；`origin/6.5.1` eaf1524f719025b644048669572b984569df8699。本地 `6.5.1` 为 1af87670fce97ca8a07f1a0cd00c3097bb2485e4。

6.3sp 的 27baace37（合并 0b882ed97）修复移动端单据附件保存时 code 取到 phid：非列附件优先使用初始化返回的 state.guid，回退到从 value 解析的 GUID。

6.5.1 的 `packages/@newgrand/udp-mobile-ui/src/component/Attachment/attachment.tsx` 中，初始化将 asrSessionGuid 写入 state.guid；非列附件 handledValue 若输入含逗号，会用逗号前字段覆盖 state.guid。远端版本只返回该值，本地分支返回该值及 asrCode。故若逗号前是 phid 或过期 GUID，与初始化返回 GUID 不一致，存在错误回写风险；无逗号时优先 state.guid，与 6.3sp 该修复前的行为不同，不能断言必然重现。

用户补充现场为移动端单据，上传完点击送审后附件消失。通过 git ls-remote 已核对以上两个引用与远端分支一致。

静态追踪（路径均相对 packages/@newgrand/udp-mobile-ui/src）：
- 新旧 customForm 明细送审都先 saveData。customFormNew/detail/index.tsx:69–76、392–423、525–564 中取 getFormData、发送保存请求，成功 resetInfo；:40–55 监听 resetInfo 重新加载。实际现场入口未知，不能认定该链路已执行。
- 6.5.1 Attachment/attachment.tsx:214–215 初始化结果写 state.guid；:272–282 上传回调更新 fileList，:328–334 以 effect 异步向表单 onChange({value: handledValue,label:fileList})；upload/upload.tsx:110,155 以 guid 作为上传的 asrSessionGuid。6.3sp 对应 effect 也是异步，不是特有差异，实际上传完成与送审间时序未验证。
- 6.5.1 customFormNew/detail/form.tsx:133–136 在每次渲染遇到数值 asr_flag===1 时直接把 stateData 对象的 code 改成 phid；6.3sp 对应文件无此段。该对象直接来自 stateData，常规 getFormData 从同一 stateData 读取（:103–117）；Form/util.tsx:getInitValues 原样返回传入对象，Form/index.tsx:199–202、243–245 将其作为 defaultValue 并在 onValuesChange 中 deepMerge。中间 HOC 与实际时序未运行验证，不能断定所有页面共享及保存时覆盖。变更源 b4d43129b，原提交同时以 asr_flag 标记附件存在，体现初始化兼容意图，不应简单删除回填。
- 6.5.1 Form/index.tsx:683–711 的 beforeSubmit 对 isCodeAttach 且为 {value,label} 的值调用 getGuidInValue；Attachment/util.ts:104–116 对不含分隔符的纯 GUID 返回空字符串。customForm/detail/form.tsx:38–41 实际调用 getFormatValues → beforeSubmit，因此该旧 customForm 保存路径满足以上条件时会清空字段。6.3sp 的同一解析函数及 code 字段分支也存在此行为，不可直接归因于 6.5.1 独有；两分支表单初始化和 beforeSubmit 的合并方式不同，实际触发取决于表单值形态。customFormNew 常规 getFormData 使用 stateData 与 formatValue，不直接调用此 beforeSubmit，不能混为一谈。
- 6.5.1 Form/index.tsx:148–151 只在 code 为空时用主键填充，6.3sp 的 convertValues 为 code 特殊构造 phid/code_sessionId，初始化值形态不同；不能不经验证认定任一行为错误。
- 6.3sp 与 6.5.1 都没有 initRequestIdRef 竞态保护，不能作为二者差异。6.5.1 另按平台选择 SmartUpload，6.3sp 使用 AttachmentUpload；上传实现不同，尚无证据表明是问题根因。

实际现场入口、字段配置、asr_flag、输入格式、渲染和时序均未知，未执行真实复现。

未运行真实组件及后端端到端复现；尚不知现场是否出现上述逗号输入，也未验证部署版本、后端持久化和文件查询。应收集脱敏 HAR：初始化请求/响应、上传请求会话标识、送审前保存、送审以及消失后的附件查询请求与响应，确认会话标识关联；移除登录令牌和文件正文。未修改仓库代码。
