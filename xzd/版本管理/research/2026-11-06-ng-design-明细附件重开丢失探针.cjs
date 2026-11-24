const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const { createRequire } = require('node:module');
const repo = process.argv[2];
const depRepo = process.argv[3];
const revision = process.argv[4] || 'WORKTREE';
const req = createRequire(path.join(depRepo, 'package.json'));
const ts = req('typescript');
const { JSDOM } = req('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://attachment.test/' });
Object.assign(global, { window: dom.window, document: dom.window.document, navigator: dom.window.navigator,
  HTMLElement: dom.window.HTMLElement, IS_REACT_ACT_ENVIRONMENT: true });
const React = req('react');
const { createRoot } = req('react-dom/client');
const hooks = req('ahooks');
const { act } = React;
const base = 'packages/@newgrand/udp-mobile-ui/src/component/';
function source(file) {
  return revision === 'WORKTREE' ? fs.readFileSync(path.join(repo, file), 'utf8')
    : execFileSync('git', ['show', revision + ':' + file], { cwd: repo, encoding: 'utf8' });
}
function transpile(text) {
  const result = ts.transpileModule(text, { compilerOptions: {
    target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true
  }, reportDiagnostics: true });
  assert.equal((result.diagnostics || []).filter(x => x.category === ts.DiagnosticCategory.Error).length, 0);
  return result.outputText;
}
// Extract exact production declarations/methods, not rewritten versions of the business logic.
function declaration(file, name) {
  const sf = ts.createSourceFile(file, source(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let result;
  function walk(node) {
    if (!result && node.name?.getText(sf) === name) {
      if (ts.isFunctionDeclaration(node)) result = node.getText(sf).replace(/^export\s+/, '');
      else if (ts.isVariableDeclaration(node)) result = `const ${node.getText(sf)};`;
      else if (ts.isMethodDeclaration(node)) result = 'function ' + node.getText(sf);
    }
    ts.forEachChild(node, walk);
  }
  walk(sf);
  assert.ok(result, 'Missing production declaration ' + name);
  return result;
}
function evaluate(text, context, expression) {
  return vm.runInNewContext(transpile(text) + '\n' + expression, context);
}
const core = {
  isObject: x => x !== null && typeof x === 'object' && !Array.isArray(x),
  isArray: Array.isArray, isString: x => typeof x === 'string', isFunction: x => typeof x === 'function',
  isNullOrEmpty: x => x === null || x === undefined || x === '', convertData: x => x,
  deepCopy: x => JSON.parse(JSON.stringify(x)), getUser: () => ({ userID: 'user', orgID: 'org' }),
  getBusType: () => 'test-business', getRoot: () => '', getHttpUrl: x => x,
  getPageObserver: () => ({ notify() {} }), batchedUpdates: fn => fn()
};
const utilContext = { baseCore: core, util: core };
core.deepMerge = evaluate(declaration('packages/@newgrand/udp-core/src/util/tool.ts', 'deepMerge'), utilContext, 'deepMerge');
const utilText = ['getRealCode', 'getGuidInValue'].map(n => declaration(base + 'Attachment/util.ts', n)).join('\n');
const attachmentUtil = evaluate(utilText, {}, '({getRealCode, getGuidInValue})');
const formUtil = evaluate(['getInitValues', 'getXtype'].map(n => declaration(base + 'Form/util.tsx', n)).join('\n'),
  { getGlobalConfig: () => ({ componentPrefix: 'NG' }) }, '({getInitValues, getXtype})');
const formHelpers = evaluate(['isValueLabel', 'isCodeAttach', 'getValueType', 'isHelpField', 'convertValues']
  .map(n => declaration(base + 'Form/index.tsx', n)).join('\n'), {
    core, getXtype: formUtil.getXtype, getHelpNameField: n => n + '_name', xtypeRef: {}, ValueTypeEnum: { Number: 'number' },
    getObjValue: (obj, key) => obj[Array.isArray(key) ? key.join('.') : key],
    setObjValue: (obj, key, val) => { obj[Array.isArray(key) ? key.join('.') : key] = val; }
  }, '({isValueLabel, isCodeAttach, convertValues})');
const rowFields = [{ name: 'code', nameField: 'code', xtype: 'Attachment', bindTable: 'p_test_d' }];
function openRow(originalRow, field = 'code', withNameField = true) {
  // These are the same references used by Table.renderForm -> Form.getInitValues -> convertValues.
  const ds = [{ ...originalRow }];
  const updateRef = { current: { formValue: { ...ds[0] }, index: 0 } };
  const fields = (field === 'code' ? rowFields : [{ name: field, nameField: field, xtype: 'Attachment', bindTable: 'p_test_d' }])
    .map(x => withNameField ? x : { ...x, nameField: undefined });
  const defaultValue = formHelpers.convertValues(formUtil.getInitValues({ children: fields }, 'form', updateRef.current.formValue), fields, 'phid');
  assert.equal(defaultValue, updateRef.current.formValue, 'Form must mutate the row reference used when closing the popup');
  const context = { core, ...formHelpers, ...attachmentUtil, defaultValue, fields, props: {
    onValuesChange(v1, v2) { ds[0] = { ...updateRef.current.formValue, ...v1 }; return v2; }
  }, handlers: {}, form: { getFieldsValue: () => defaultValue, setFieldsValue() {} },
    updateComputedDeps() {}, isChange: { current: false }, getFormItem: () => ({}), filterProps: x => x,
    disabledNotify: true, getObjValue: (obj, k) => obj[k], setObjValue: (obj, k, v) => { obj[k] = v; },
    curIndex: 0, updateRef, ds, beforeClose: undefined, afterClose: undefined, validateOnRowChange: false,
    setCurIndex() {}, setDs(rows) { ds.splice(0, ds.length, ...rows); }, formRef: { current: {} }
  };
  const actions = evaluate(['syncValues', 'dealPropsChange', 'handleValuesChange', 'beforeSubmit'].map(n => declaration(base + 'Form/index.tsx', n)).join('\n')
    + '\n' + declaration(base + 'Table/table.tsx', 'onPopupClose'), context,
    '({handleValuesChange, beforeSubmit, onPopupClose})');
  return { get value() { return defaultValue[field]; },
    onChange(value) { actions.handleValuesChange({ [field]: value }, { ...defaultValue, [field]: value }); },
    async close() { actions.onPopupClose(); await Promise.resolve(); return ds[0]; },
    beforeSubmit: actions.beforeSubmit
  };
}
const getData = evaluate(declaration(base + 'Table/table.tsx', 'getData'), { core }, 'getData');
const filterRow = evaluate(declaration(base + 'Table/table.tsx', 'filterRowByBusFields'), attachmentUtil, 'filterRowByBusFields');
function savedCode(row) {
  const props = { dataSource: [row], columns: [{ name: 'code', editor: { xtype: 'Attachment' } }] };
  const stringRow = getData.call({ props })[0];
  return filterRow.call({ props }, stringRow, null, row.phid).code;
}
let seq = 0;
function environment(requireBusinessKey = false) {
  const env = { calls: [], files: [], changes: [], warnings: [] };
  const host = props => React.createElement('div', null, props.children);
  const List = props => { env.files = props.fileList; return React.createElement('div', { 'data-files': props.fileList.length }); };
  const ng = { getQueryValue: key => key ? undefined : ({}) };
  const fakeCore = { ...core, uniqueId: prefix => prefix + '-' + (++seq),
    request: { body: async () => ({ data: { 'file-1': '/file-1.pdf' } }) }, alert: x => env.warnings.push(x) };
  // Default: always return the same file, so the request-regression tests do not assume backend lookup rules.
  // requireBusinessKey=true is an explicit model of the user-reported backend behavior, NOT a live server replay.
  const initFile = async params => {
    env.calls.push(JSON.parse(JSON.stringify(params)));
    const found = !requireBusinessKey || params.value === 'record-phid';
    return { success: 'true', asrSessionGuid: 'session-guid', asrCode: 'record-phid',
      fileList: found ? [{ AsrFid: 'file-1', FilePath: '/file-1.pdf' }] : [] };
  };
  const imported = name => {
    if (name === 'react') return React;
    if (name === 'ahooks') return hooks;
    if (name === 'antd') return { Col: host, Row: host, Skeleton: host };
    if (name === 'antd-mobile') return { Toast: { show: x => env.warnings.push(x) } };
    if (name === '../../util') return { core: fakeCore, NG: ng, getRegisterComponent: () => undefined };
    if (name === './api/service') return { initFile };
    if (name === './attachment-list') return { AttachmentList: List };
    if (name === './attachment-type-list') return { AttachmentTypeList: List };
    if (name === './attachment-preview') return { AttachmentPreview: () => null };
    if (name === './attachment-upload') return { AttachmentUpload: () => null };
    if (name === './upload') return { Upload: () => null };
    if (name === './const') return { MOBILE_PLATFORMS: [] };
    if (name === './upload/util') return { uploadAttachment: async () => { throw Error('unexpected upload'); } };
    if (name === './util') return { ...attachmentUtil, getUserToken: () => 'token', getAttachUrl: x => x };
    throw Error('Unexpected runtime import ' + name);
  };
  const module = { exports: {} };
  vm.runInNewContext('(function(require,module,exports){' + transpile(source(base + 'Attachment/attachment.tsx')) + '\n})',
    { console, React }, { filename: 'production-attachment.tsx' })(imported, module, module.exports);
  env.Component = module.exports.Attachment;
  return env;
}
async function mount(env, row, colAttach = '0', rewrite) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const props = { colAttach, asrtable: colAttach === '0' ? 'p_test_d' : 'system', refreshId: 'row-open-' + (++seq),
    onChange(data) { env.changes.push(data.value); row.onChange(rewrite ? { ...data, value: rewrite(data.value) } : data); } };
  function Controlled() {
    const [value, setValue] = React.useState(row.value);
    return React.createElement(env.Component, { ...props, value, onChange(data) {
      props.onChange(data); setValue(row.value);
    } });
  }
  const unmount = async () => { await act(async () => root.unmount()); container.remove(); };
  try {
    await act(async () => { root.render(React.createElement(Controlled)); });
    assert.equal(env.files.length, 1, 'Initial API fixture file must reach AttachmentList');
    assert.equal(env.calls.length, 1, 'Parent echo must not trigger another initialization in the same mounted session');
    return unmount;
  } catch (e) { await unmount(); throw e; }
}
const tests = [];
const test = (name, fn) => tests.push({ name, fn });
let chain;
test('close/reopen preserves business asrCode in the initialization request', async () => {
  const firstRow = openRow({ phid: 'record-phid', code: 'session-guid,record-phid' });
  const first = environment(); const unmount = await mount(first, firstRow);
  const closed = await firstRow.close(); await unmount();
  const secondRow = openRow(closed); const second = environment();
  const unmount2 = await mount(second, secondRow); await unmount2();
  chain = { input: 'session-guid,record-phid', first: first.calls[0], firstOnChange: first.changes,
    codeAfterClose: closed.code, second: second.calls[0], savedCode: savedCode(closed) };
  console.log('TRACE ' + JSON.stringify(chain));
  assert.equal(second.calls[0].value, 'record-phid', 'Reopening the row changed the business asrCode to its session GUID');
  assert.equal(second.calls[0].sessionGuid, 'session-guid', 'Reopening lost the session GUID parameter');
});
test('minimal row with only phid and no code also loses the business lookup key on reopen', async () => {
  const row = openRow({ phid: 'record-phid' });
  const env = environment(); const unmount = await mount(env, row);
  assert.equal(env.calls[0].value, 'record-phid', 'Form must fill a missing session attachment code from the row primary key');
  const closed = await row.close(); await unmount();
  const second = environment(); const unmount2 = await mount(second, openRow(closed)); await unmount2();
  console.log('MINIMAL ' + JSON.stringify({ first: env.calls[0], onChange: env.changes, second: second.calls[0] }));
  assert.equal(second.calls[0].value, 'record-phid');
});
test('user-reported business-key lookup model: visible file stays visible after reopening', async () => {
  const row = openRow({ phid: 'record-phid', code: 'session-guid,record-phid' });
  const env = environment(true); const unmount = await mount(env, row);
  const closed = await row.close(); await unmount();
  const second = environment(true);
  const unmount2 = await mount(second, openRow(closed)); await unmount2();
});
test('actual Table.getData -> filterRowByBusFields preserves a GUID-only code for saving', async () => {
  const row = openRow({ phid: 'record-phid', code: 'session-guid,record-phid' });
  const env = environment(); const unmount = await mount(env, row);
  const closed = await row.close(); await unmount();
  assert.equal(savedCode(closed), 'session-guid', 'Saving attachment code must preserve the GUID, not erase it');
});
test('Form.beforeSubmit preserves a GUID-only value/label binding', () => {
  const row = openRow({ phid: 'record-phid', code: { value: 'session-guid', label: [] } }, 'code', false);
  assert.equal(row.beforeSubmit().code, 'session-guid', 'Form.getValues/beforeSubmit erased the plain GUID');
});
test('restoring guid,asrCode before closing restores the original initialization query', async () => {
  const row = openRow({ phid: 'record-phid', code: 'session-guid,record-phid' });
  const env = environment(); const unmount = await mount(env, row, '0', () => 'session-guid,record-phid');
  const closed = await row.close(); await unmount();
  const second = environment(); const unmount2 = await mount(second, openRow(closed)); await unmount2();
  assert.equal(second.calls[0].value, 'record-phid');
  assert.equal(second.calls[0].sessionGuid, 'session-guid');
  assert.equal(savedCode(closed), 'session-guid');
});
test('column attachments guid@@count keep their association after reopening', async () => {
  const row = openRow({ phid: 'record-phid', file: 'session-guid@@1' }, 'file');
  const env = environment(); const unmount = await mount(env, row, '1');
  const closed = await row.close(); await unmount();
  const second = environment(); const unmount2 = await mount(second, openRow(closed, 'file'), '1'); await unmount2();
  assert.equal(closed.file.value, 'session-guid@@1');
  assert.equal(second.calls[0].value, 'session-guid');
  assert.equal(second.calls[0].sessionGuid, 'session-guid');
});
(async () => {
  let failures = 0;
  console.log('REVISION ' + revision);
  for (const { name, fn } of tests) {
    try { await fn(); console.log('PASS ' + name); }
    catch (e) { failures++; console.log('FAIL ' + name + '\n  ' + e.message + '\n  actual=' + JSON.stringify(e.actual) + ' expected=' + JSON.stringify(e.expected)); }
  }
  console.log(`RESULT ${tests.length - failures} passed, ${failures} failed`);
  dom.window.close(); process.exitCode = failures ? 1 : 0;
})();
