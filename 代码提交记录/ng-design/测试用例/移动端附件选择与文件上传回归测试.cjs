const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');

const repo = path.resolve(process.argv[2]);
const requireRepo = createRequire(path.join(repo, 'package.json'));
const ts = requireRepo('typescript');
const { JSDOM } = requireRepo('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://attachment.test/' });
Object.assign(global, {
  window: dom.window,
  document: dom.window.document,
  navigator: dom.window.navigator,
  HTMLElement: dom.window.HTMLElement,
  IS_REACT_ACT_ENVIRONMENT: true
});
const React = requireRepo('react');
const { createRoot } = requireRepo('react-dom/client');
const hooks = requireRepo('ahooks');
const { act } = React;
const base = path.join(repo, 'packages/@newgrand/udp-mobile-ui/src/component/Attachment');

function componentEnvironment(options) {
  const env = { options, apiCalls: [], pickerCalls: [], signatures: [], notices: [], gesture: false };
  env.input = document.createElement('input');
  env.input.click = () => env.pickerCalls.push({
    gesture: env.gesture, accept: env.input.accept, multiple: env.input.multiple
  });
  const host = (name) => function Host(props) {
    return React.createElement('div', { 'data-part': name, onClick: props.onClick, role: props.role }, props.children);
  };
  const Icon = host('icon');
  for (const name of ['DOCSVG', 'EXLSVG', 'JPGSVG', 'PDFSVG', 'PPTSVG', 'TXTSVG', 'AudioSVG', 'VideoSVG']) {
    Icon[name] = host(name);
  }
  const core = {
    getUser: () => ({ productAdr: 'https://attachment.test' }),
    getBusType: () => 'test-business',
    formatDate: () => '2026-10-08 12:00:00',
    external: { openSignature: (config) => env.signatures.push(config) }
  };
  const NG = {
    getQueryValue: () => options.platform,
    alert: (message) => env.notices.push(message),
    external: {
      ...core.external,
      PlatformAPI: (action, params) => {
        env.apiCalls.push({ action, params, gesture: env.gesture });
        if (action === 'openFileSystem') {
          return options.selection instanceof Error
            ? Promise.reject(options.selection)
            : Promise.resolve(options.selection);
        }
        if (action === 'upload') return Promise.resolve({ Success: 'true', AttachList: [] });
        throw new Error('Unexpected platform call: ' + action);
      }
    }
  };
  const useExtendRef = (ref, methods) => { if (ref) ref.current = methods; };
  const Upload = React.forwardRef(function MockUpload(props, ref) {
    env.uploadProps = props;
    React.useImperativeHandle(ref, () => ({ upload: { uploader: {
      fileInput: env.input, uploadFiles: () => {}
    } } }), []);
    return React.createElement('div', { 'data-part': 'upload' }, props.children);
  });
  const Popup = (props) => {
    env.popupProps = props;
    return React.createElement('div', { 'data-part': 'popup' }, props.children);
  };
  const Modal = (props) => {
    env.modalProps = props;
    return React.createElement('div', { 'data-part': 'modal' }, props.content);
  };
  const Swiper = host('swiper');
  Swiper.Item = host('swiper-item');
  const utilities = {
    sensitiveCommentControl: () => false,
    getFileNameFromUrl: (url) => url.split('/').pop().split('?')[0],
    getUserToken: () => 'test-token',
    dataURLtoFile: () => new dom.window.File(['test'], 'signature.png')
  };
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file).exports;
    const mod = { exports: {} };
    cache.set(file, mod);
    const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      fileName: file,
      reportDiagnostics: true,
      compilerOptions: {
        target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.React, esModuleInterop: true
      }
    });
    const errors = (compiled.diagnostics || []).filter((item) => item.category === ts.DiagnosticCategory.Error);
    assert.equal(errors.length, 0, 'TypeScript transpilation: ' + file);
    const imports = (name) => {
      if (name === 'react') return React;
      if (name === 'ahooks') return hooks;
      if (name === '@newgrand/udp-core') return { core, useExtendRef, PaperClipOutlined: host('paperclip') };
      if (name === '../../../util') return { NG, useExtendRef };
      if (name === 'antd') return { Row: host('row'), Col: host('col'), Progress: host('progress'), Upload };
      if (name === 'antd-mobile') return { Popup, Modal, Swiper, Toast: { show: (value) => env.notices.push(value) } };
      if (name === 'moment') return () => ({ format: () => '2026-10-08 12:00' });
      if (name.endsWith('/icon')) return { Icon };
      if (name === './util' || name === '../util') return utilities;
      if (name.includes('/api/') || name === './api/service') return { uploadFile: async () => ({ Success: 'true' }) };
      if (name === './accept' || name === './types') {
        const stem = path.resolve(path.dirname(file), name);
        return load(fs.existsSync(stem + '.tsx') ? stem + '.tsx' : stem + '.ts');
      }
      throw new Error('Unexpected import ' + name + ' in ' + file);
    };
    vm.runInNewContext('(function(require,module,exports){' + compiled.outputText + '\n})', {
      React, window, document, navigator, console, FormData: dom.window.FormData,
      File: dom.window.File, setTimeout: () => 0
    }, { filename: file })(imports, mod, mod.exports);
    return mod.exports;
  }
  env.component = options.kind === 'web'
    ? load(path.join(base, 'attachment-upload.tsx')).AttachmentUpload
    : load(path.join(base, 'upload/upload.tsx')).Upload;
  return env;
}

async function mounted(options, run) {
  const env = componentEnvironment(options);
  env.container = document.createElement('div');
  document.body.appendChild(env.container);
  const root = createRoot(env.container);
  try {
    const props = { guid: 'session', count: 0, outRef: { current: null }, onChange: () => {}, ...options.props };
    await act(async () => root.render(React.createElement(env.component, props)));
    env.choices = () => Array.from(env.container.querySelectorAll('[data-part="popup"] [data-part="col"]'))
      .filter((element) => element.querySelector('.ngAccept-item') || element.querySelector('.popup-item'));
    env.clickChoice = async (label) => {
      const choice = env.choices().find((element) => element.textContent === label);
      assert.ok(choice, 'Missing attachment choice ' + label);
      await act(async () => {
        env.gesture = true;
        try { choice.dispatchEvent(new window.MouseEvent('click', { bubbles: true })); }
        finally { env.gesture = false; }
      });
    };
    env.afterClose = () => act(async () => env.popupProps.afterClose());
    await run(env);
  } finally {
    await act(async () => root.unmount());
    env.container.remove();
  }
}

const cases = [];
const test = (name, run) => cases.push({ name, run });
for (const platform of ['android', 'ios', 'harmony', 'wechat', 'ios ']) {
  test('native file choice supported on ' + platform, () => mounted({ platform }, async (env) => {
    assert.ok(env.choices().some((choice) => choice.textContent === '文件'));
  }));
}
for (const platform of ['h5', 'dingding', undefined]) {
  test('unsupported platform hides file choice: ' + platform, async () => {
    for (const props of [{}, { accept: ['file'] }, { accept: [] }]) {
      await mounted({ platform, props }, async (env) => {
        assert.ok(!env.choices().some((choice) => choice.textContent === '文件'));
      });
    }
  });
}
for (const [name, selection] of [
  ['undefined', undefined], ['null', null], ['failed', { isSuccess: false, filePath: '/cancelled.pdf' }],
  ['empty', {}], ['missing path', { fileData: { name: 'missing.pdf' } }], ['rejected', new Error('cancelled')]
]) {
  test('cancelled native selection creates no upload: ' + name, () => mounted({
    platform: 'ios', selection, props: { accept: ['file'] }
  }, async (env) => {
    await env.clickChoice('文件');
    assert.equal(env.apiCalls.length, 1);
    assert.equal(env.apiCalls[0].action, 'openFileSystem');
    assert.equal(env.apiCalls[0].gesture, true, 'Picker must open during the click event');
    await env.afterClose();
    assert.equal(env.apiCalls.length, 1, 'Closing popup must not reopen picker');
    assert.equal(env.modalProps.visible, false, 'Cancellation must not start upload progress');
  }));
}
for (const [name, selection, expectedPath, expectedName] of [
  ['original filename', { filePath: '/opaque-id', fileData: { name: '发票.docx', url: '/other-path' } }, '/opaque-id', '发票.docx'],
  ['metadata path fallback', { fileData: { name: 'budget.xlsx', url: '/native-file' } }, '/native-file', 'budget.xlsx'],
  ['path filename fallback', { filePath: '/documents/report.pdf' }, '/documents/report.pdf', 'report.pdf']
]) {
  test('native file upload preserves file parameters: ' + name, () => mounted({
    platform: 'wechat', selection, props: { accept: ['file'] }
  }, async (env) => {
    await env.clickChoice('文件');
    assert.equal(env.apiCalls[0].gesture, true);
    await env.afterClose();
    assert.equal(env.apiCalls.filter((call) => call.action === 'openFileSystem').length, 1);
    const uploads = env.apiCalls.filter((call) => call.action === 'upload');
    assert.equal(uploads.length, 1);
    assert.equal(uploads[0].params.file.fileURL, expectedPath);
    assert.equal(uploads[0].params.file.fileName, expectedName);
    assert.equal(uploads[0].params.extraParams.fileName, expectedName);
    assert.equal(uploads[0].params.file.mimeType, 'application/octet-stream');
  }));
}
for (const [id, label, multiple, expectedMultiple, expectedAccept] of [
  ['file', '文件', false, false, 'application/pdf'],
  ['file', '文件', true, true, 'application/pdf'],
  ['photos', '连拍', false, true, 'image/*']
]) {
  test('web picker opens once inside click with current attributes: ' + id + '/' + multiple, () => mounted({
    kind: 'web', props: { accept: [id], multiple }
  }, async (env) => {
    await env.clickChoice(label);
    assert.equal(env.pickerCalls.length, 1);
    assert.equal(env.pickerCalls[0].gesture, true);
    assert.equal(env.pickerCalls[0].multiple, expectedMultiple);
    assert.ok(env.pickerCalls[0].accept.startsWith(expectedAccept));
    await env.afterClose();
    assert.equal(env.pickerCalls.length, 1, 'Closing popup must not reopen picker');
  }));
}
test('web signature keeps signature flow after popup close', () => mounted({
  kind: 'web', props: { accept: ['signature'] }
}, async (env) => {
  await env.clickChoice('签名');
  assert.equal(env.pickerCalls.length, 0);
  assert.equal(env.signatures.length, 0);
  await env.afterClose();
  assert.equal(env.signatures.length, 1);
}));
test('web upload ignores missing change payload and missing file list', () => mounted({
  kind: 'web', props: { accept: ['file'] }
}, async (env) => {
  await act(async () => {
    for (const info of [undefined, {}, { file: { name: 'report.pdf', uid: '1' } }]) {
      assert.doesNotThrow(() => env.uploadProps.onChange(info));
    }
  });
  assert.equal(env.modalProps.visible, false);
}));

(async () => {
  for (const item of cases) {
    await item.run();
    console.log('PASS ' + item.name);
  }
  console.log(cases.length + '/' + cases.length + ' attachment interaction cases passed');
  dom.window.close();
})().catch((error) => {
  console.error(error);
  dom.window.close();
  process.exitCode = 1;
});
