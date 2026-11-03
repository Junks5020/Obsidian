#!/usr/bin/env node
// Diagnostic probe for Nova's real Upload component source. UI/hooks/native APIs are mocked;
// the component and accept list are transpiled from the supplied workspace and invoked directly.
const fs = require('fs');
const path = require('path');
const root = path.resolve(process.argv[2] || 'C:/Users/jinxu/orca/workspaces/nova/frogfish');
const sourcePath = path.join(root, 'react/src/smart-component/upload/upload.tsx');
const ts = require(require.resolve('typescript', { paths: [path.join(root, 'react')] }));
const React = {
  Fragment: Symbol('Fragment'),
  createElement(type, props, ...children) {
    return { type, props: { ...(props || {}), children: children.length <= 1 ? children[0] : children } };
  },
};
let platform = '';
let globalNavigator = global.navigator;
global.navigator = { userAgent: 'Nova diagnostic probe' };
global.wx = {};
const hooks = {
  useSetState: (initial) => [initial, () => {}],
  useCreation: (factory) => factory(),
  useMemoizedFn: (fn) => fn,
  useInterval: () => {},
  useUpdateEffect: () => {},
};

function loadTs(file) {
  const source = fs.readFileSync(file, 'utf8');
  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.React,
      esModuleInterop: true,
    },
  }).outputText;
  const mod = { exports: {} };
  const localRequire = (id) => {
    if (id === 'react') return React;
    if (id === 'ahooks') return hooks;
    if (id === 'antd') return { Row: 'Row', Col: 'Col', Progress: 'Progress' };
    if (id === 'antd-mobile') return { Popup: 'Popup', Modal: 'Modal', Toast: { show() {} } };
    if (id === '@ant-design/icons') return { PaperClipOutlined: 'PaperClipOutlined' };
    if (id === '@newgrand/udp-mobile-ui') return { Icon: 'Icon', NG: { alert() {} }, useExtendRef() {} };
    if (id === 'moment') return () => ({ format: () => '' });
    if (id === '@/adapter') return { PlatformAPI: async () => ({}) };
    if (id === '@/http/request') return { request: { getProductAdrAndEnterpriseNo: () => '' } };
    if (id === './util') return { dataURLtoFile: () => ({}) };
    if (id === './api/service') return { uploadFile: async () => ({}), getLocation: async () => ({}) };
    if (id === '@/utils/tool') return { getQueryString: () => platform };
    if (id.startsWith('@/assets/')) return path.basename(id);
    if (id === './accept') return loadTs(path.join(path.dirname(file), 'accept.tsx'));
    if (id === './types') return loadTs(path.join(path.dirname(file), 'types.ts'));
    throw new Error(`Unexpected import ${id} from ${file}`);
  };
  new Function('require', 'module', 'exports', js)(localRequire, mod, mod.exports);
  return mod.exports;
}

function spanTexts(node, output = []) {
  if (Array.isArray(node)) {
    node.forEach((item) => spanTexts(item, output));
    return output;
  }
  if (!node || typeof node !== 'object') return output;
  if (node.type === 'span' && typeof node.props?.children === 'string') output.push(node.props.children);
  spanTexts(node.props?.children, output);
  return output;
}

try {
  const { Upload } = loadTs(sourcePath);
  const defaults = {};
  const explicitAccept = {};
  for (const name of ['ios', 'android', 'harmony']) {
    platform = name;
    defaults[name] = spanTexts(Upload({ guid: 'probe', onChange() {} }));
    explicitAccept[name] = spanTexts(Upload({
      guid: 'probe',
      onChange() {},
      accept: ['photo', 'album', 'file'],
    }));
    console.log(`default ${name}: ${JSON.stringify(defaults[name])}`);
    console.log(`explicit accept ${name}: ${JSON.stringify(explicitAccept[name])}`);
  }
  const failures = [];
  for (const name of ['ios', 'android', 'harmony']) {
    if (!defaults[name].includes('文件')) failures.push(`${name}: default menu missing 文件`);
  }
  if (failures.length) {
    console.error(`FAIL: ${failures.join('; ')}`);
    process.exitCode = 1;
  } else {
    console.log('PASS: all platform default menus include 文件');
  }
} finally {
  if (globalNavigator === undefined) delete global.navigator;
  else global.navigator = globalNavigator;
  delete global.wx;
}
