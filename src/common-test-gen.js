import { render } from 'ejs';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { basename, resolve } from 'path';
import { createInterface } from 'readline';
import pkg from 'typescript';
const { SyntaxKind } = pkg;

import TypescriptParser from './typescript-parser.js';
import Util from './util.js';

// convert Typescript-parsed nodes to an array
export function __toArray(el) {
  return Array.isArray(el) ? el : el && el.node ? [el] : [];
}

export function __get(node) {
  node = node.node || node;

  const name = node.name && node.name.escapedText;
  let type;
  if (node.type && node.type.typeName) {
    type = node.type.typeName.escapedText;
  } else if (node.type && node.type.kind) {
    type = SyntaxKind[node.type.kind].replace(/Keyword/, '').toLowerCase();
  }

  let decorator;
  if (node.decorators) {
    const name = node.decorators[0].expression.expression.escapedText;
    const param = (node.decorators[0].expression.arguments[0] || {}).text;
    decorator = { name, param };
  }

  return { type, name, decorator };
}

export function __getKlassDecorator(klass) {
  const klassDecorator = {};
  const props = klass
    .get('Decorator')
    .get('CallExpression')
    .get('ObjectLiteralExpression')
    .get('PropertyAssignment');

  __toArray(props).forEach((el) => {
    const key = el.children[0].node.escapedText;
    const value = el.children[1].node;
    klassDecorator[key] = value;
  });

  return klassDecorator;
}

// all imports info. from typescript
// { Component: { moduleName: xxx, alias: xxx } }
export function getImports() {
  const imports = [];

  const parsed = new TypescriptParser(this.typescript);
  __toArray(parsed.rootNode.get('ImportDeclaration')).map((prop) => {
    const moduleName = prop.node.moduleSpecifier.text;
    const namedImports = prop.get('ImportClause').get('NamedImports');
    const namespaceImport = prop.get('ImportClause').get('NamespaceImport');

    if (namespaceImport.node) {
      const alias = namespaceImport.node.name.escapedText;
      imports.push({ name: '*', alias, moduleName });
    } else if (namedImports.node) {
      namedImports.node.elements.forEach((node) => {
        const name = node.name.escapedText;
        imports.push({ name, alias: undefined, moduleName });
      });
    }
  });

  return imports;
}

export function getKlassProperties() {
  return __toArray(this.klass.get('PropertyDeclaration'))
    .concat(this.klass.get('SetAccessor'))
    .concat(this.klass.get('GetAccessor'))
    .map((prop) => {
      return __get(prop);
    })
    .filter((el) => el.name);
}

export function getKlassSetters() {
  return __toArray(this.klass.get('SetAccessor'));
}
export function getKlassGetters() {
  return __toArray(this.klass.get('GetAccessor'));
}
export function getKlassMethods() {
  return __toArray(this.klass.get('MethodDeclaration'));
}
export function getKlassConstructor() {
  return this.klass.get('Constructor')[0];
}
export function getKlassServices() {
  const constructor = this.klass.get('Constructor');
  if (!constructor) { return {}; }

  var services = {};
  const parameters = __toArray(constructor.get('Parameter'));
  parameters.forEach(node => {
    const identifier = node.get('Identifier').nodeText;
    const typeReferenceNode = node.get('TypeReference');
    services[identifier] = {
      identifier: identifier,
      mockIdentifier: `mock${identifier[0].toUpperCase()}${identifier.slice(1)}`,
      type: typeReferenceNode ? typeReferenceNode.nodeText : 'any'
    }
  });

  return services;
}

export function getKlass() {
  const parsed = new TypescriptParser(this.typescript);
  const fileBasedKlassName = Util.getClassName(this.tsPath);

  const klassDeclarations = __toArray(parsed.rootNode.get('ClassDeclaration'));
  const klass =
    klassDeclarations.find((decl) => decl.node.name.escapedText === fileBasedKlassName) ||
    klassDeclarations[0];

  if (!klass) {
    throw new Error(
      `Error:TypeScriptParser Could not find ` +
        `${fileBasedKlassName || 'a class'} from ${this.tsPath}`,
    );
  }

  return klass;
}

export function getAngularType() {
  return (__get(this.klass).decorator || {}).name;
}

// import statement mocks;
export function getImportMocks() {
  const importMocks = [];
  const klassName = this.klass.node.name.escapedText;
  const moduleName = basename(this.tsPath).replace(/.ts$/, '');

  const imports = {};
  if (['component', 'directive'].includes(this.angularType)) {
    imports[`@angular/core`] = ['Component'];
  }
  imports[`./${moduleName}`] = [klassName];

  if (this.klass.get('Constructor').node) {
    const paremeters = this.klass.get('Constructor').node.parameters;
    paremeters.forEach((param) => {
      const { name, type, decorator } = __get(param);
      const exportName = decorator ? decorator.name : type;
      const emport = this.imports.find((el) => el.name === exportName); // name , alias

      const importStr = emport.alias ? `${exportName} as ${emport.alias}` : exportName;
      if (exportName === 'Inject') {
        // do not import Inject, but import Inject name
        const commonTypes = ['APP_BASE_HREF', 'DOCUMENT', 'LOCATION_INITIALIZED', 'Time'];
        const importLib = commonTypes.includes(decorator.param)
          ? '@angular/common'
          : '@angular/core';
        imports[importLib] = (imports[importLib] || []).concat(decorator.param);
      } else {
        imports[emport.moduleName] = (imports[emport.moduleName] || []).concat(importStr);
      }
    });
  }

  for (var lib in imports) {
    const fileNames = imports[lib].join(', ');
    importMocks.push(`import { ${fileNames} } from '${lib}';`);
  }

  return importMocks;
}

export function getProviderMocks(ctorMockData) {
  const providerMocks = { providers: [], mocks: [], declarations: [], assignments: [] };
  if (!this.klass.get('Constructor').node) {
    return providerMocks;
  }

  const paremeters = this.klass.get('Constructor').node.parameters;
  paremeters.forEach((param) => {
    const { name, type, decorator } = __get(param);
    const injectClassName = decorator && decorator.name === 'Inject' && decorator.param;
    const injectUseStatement =
      injectClassName === 'DOCUMENT'
        ? `useClass: MockDocument`
        : injectClassName === 'PLATFORM_ID'
        ? `useValue: 'browser'`
        : injectClassName === 'LOCALE_ID'
        ? `useValue: 'en'`
        : `useValue: ${injectClassName}`;

    const mockData = ctorMockData[name];
    mockData && delete mockData['undefiend'];
    const mockDataJS = !mockData
      ? []
      : Object.entries(mockData).map(([k, v]) => `${k} = ${Util.objToJS(v)};`);

    const emport = this.imports.find((el) => el.name === type); // name , alias, moduleName
    const emportFromFile = !!(emport && emport.moduleName.match(/^(\.|src\/)/));
    const configMockJS = this.config.providerMocks[type];
    let mockFn;
    if (type !== 'Object' && emportFromFile) {
      mockFn = (mockDataJS || []).concat(configMockJS);
    } else if (configMockJS) {
      mockFn = (mockDataJS || []).concat(configMockJS);
    }

    if (mockFn) {
      providerMocks.mocks.push(Util.indent(`
        @Injectable()
        class Mock${type} {
          ${mockFn.join('\n')}
        }`)
        .replace(/\n\s*?\n/gm, '\n') // remove empty lines
        .replace(/\{\s+?}\s*?/gm, '{}\n') // ...{\n} to ...{}
      );
    }

    // code for providers section at @Component({providers: XXXXXXXXX}
    if (type === 'ActivatedRoute') {
      providerMocks.providers.push(`{
          provide: ActivatedRoute,
          useValue: {
            snapshot: {url: 'url', params: {}, queryParams: {}, data: {}},
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
            fragment: observableOf('fragment'),
            data: observableOf({})
          }
        }`);
    } else if (this.config.providerMocks[type]) {
      // if mock is given from config
      providerMocks.providers.push(`{ provide: ${type}, useClass: Mock${type} }`);
    } else if (emportFromFile) {
      providerMocks.providers.push(`{ provide: ${type}, useClass: Mock${type} }`);
    } else if (injectClassName) {
      providerMocks.providers.push(`{ provide: '${injectClassName}', ${injectUseStatement} }`);
    } else {
      providerMocks.providers.push(type);
    }

    providerMocks.declarations.push(`let ${name}: ${type};`);
    providerMocks.assignments.push(`${name} = TestBed.inject(${type});`);
  });

  return providerMocks;
}

export function getInputMocks() {
  const inputMocks = { html: [], js: [] };
  this.klassProperties.forEach(({ type, name, decorator }) => {
    if (decorator && decorator.name === 'Input') {
      inputMocks.html.push(`[${decorator.param || name}]="${name}"`);
      inputMocks.js.push(`${name}: ${type};`);
    }
  });

  return inputMocks;
}

export function getOutputMocks() {
  const outputMocks = { html: [], js: [] };

  this.klassProperties.forEach(({ type, name, decorator }) => {
    const funcName = `on${name.replace(/^[a-z]/, (x) => x.toUpperCase())}`;
    if (decorator && decorator.name === 'Output') {
      outputMocks.html.push(`(${decorator.param || name})="${funcName}($event)"`);
      outputMocks.js.push(`${funcName}(event): void { /* */ }`);
    }
  });

  return outputMocks;
}

export function getComponentProviderMocks() {
  const mocks = [];

  const decorator = __getKlassDecorator(this.klass);
  if (decorator.providers) {
    const klassNames = decorator.providers.elements.map((el) => el.escapedText);
    const providerMocks = klassNames
      .filter((name) => name)
      .map((name) => {
        return `{ provide: ${name}, useClass: Mock${name} }`;
      });
    if (providerMocks.length) {
      mocks.push(`set: { providers: [${providerMocks.join(',\n')}] }`);
    }
  }

  return mocks;
}

export function getDirectiveSelector() {
  const decorator = __getKlassDecorator(this.klass);

  if (decorator.selector) {
    const selectorTxt = decorator.selector.text;
    if (selectorTxt.match(/^\[/)) {
      return { type: 'attribute', value: selectorTxt, name: selectorTxt.match(/[^\[\]]+/)[0] };
    } else if (selectorTxt.match(/^\./)) {
      return { type: 'class', value: selectorTxt, name: selectorTxt.match(/[^\.]+/)[0] };
    } else if (selectorTxt.match(/^[a-z]/i)) {
      return { type: 'element', value: selectorTxt, name: selectorTxt.match(/[a-z-]+/)[0] };
    }
  }
}

export function getExistingTests(ejsData, existingTestCodes) {
  const existingTests = {};
  const allTests = Object.assign({}, ejsData.accessorTests || {}, ejsData.functionTests || {});
  for (var funcName in allTests) {
    // e.g. compoent.myFuncName(any, goes, here);
    const re = new RegExp(`\\S+\.${funcName}\\(?[\\s\\S]*\\)?;`, 'm');
    existingTests[funcName] = !!existingTestCodes.match(re);
  }

  return existingTests;
}

export function getGenerated(ejsData, options) {
  let generated;
  const funcName = options.method;
  const specPath = resolve(this.tsPath.replace(/\.ts$/, '.spec.ts')); 
  const existingTestCodes = existsSync(specPath) && readFileSync(specPath, 'utf8');
  if (funcName) {
    // if user asks to generate only one function
    generated = ejsData.functionTests[funcName] || ejsData.accessorTests[funcName];
  } else if (existingTestCodes && specPath && !options.force && !options.forcePrint) {
    // if there is existing tests, then add only new export function tests at the end
    const existingTests = getExistingTests(ejsData, existingTestCodes);
    const newTests = [];
    const allTests = Object.assign({}, ejsData.accessorTests || {}, ejsData.functionTests || {});
    // get only new tests
    for (var method in existingTests) {
      existingTests[method] !== true && newTests.push('  // new test by ngentest' + allTests[method]);
    }
    if (newTests.length) {
      // add new tests at the end
      const re = /(\s+}\);?\s+)(}\);?\s*)$/;
      const testEndingMatch = existingTestCodes.match(re); // file ending parts
      if (testEndingMatch) {
        generated = existingTestCodes.replace(re, (m0, m1, m2) => {
          const newCodes = newTests.join('\n').replace(/[ ]+$/, '');
          return `${m1}${newCodes}${m2}`;
        });
      }
    } else {
      generated = render(this.template, ejsData).replace(/\n\s+$/gm, '\n');
    }
  } else {
    // if no existing tests
    generated = render(this.template, ejsData).replace(/\n\s+$/gm, '\n');
  }
  return generated;
}

export function writeToSpecFile(specPath, generated) {
  writeFileSync(specPath, generated);
  console.log('Generated unit test to', specPath);
}

export function backupExistingFile(specPath, generated) {
  if (existsSync(specPath)) {
    const backupTime = new Date().toISOString().replace(/[^\d]/g, '').slice(0, -5);
    const backupContents = readFileSync(specPath, 'utf8');
    if (backupContents !== generated) {
      writeFileSync(`${specPath}.${backupTime}`, backupContents, 'utf8'); // write backup
      console.log('Backup the exisiting file to', `${specPath}.${backupTime}`);
    }
  }
}

export function writeGenerated(generated, options) {
  const toFile = options.spec;
  const force = options.force;
  const specPath = resolve(this.tsPath.replace(/\.ts$/, '.spec.ts'));
  generated = generated.replace(/\r\n/g, '\n');

  const specFileExists = existsSync(specPath);

  if (toFile && specFileExists && force) {
    backupExistingFile(specPath, generated);
    writeToSpecFile(specPath, generated);
  } else if (toFile && specFileExists && !force) {
    const rl = createInterface(process.stdin, process.stdout);
    console.warn(
      '\x1b[33m%s\x1b[0m',
      `WARNING!!, Spec file, ${specPath} already exis Overwrite it?`,
    );
    rl.question('Continue? ', (answer) => {
      if (answer.match(/y/i)) {
        backupExistingFile(specPath, generated);
        writeToSpecFile(specPath, generated);
      } else {
        process.stdout.write(generated);
      }
      rl.close();
    });
  } else if (toFile && !specFileExists) {
    backupExistingFile(specPath, generated);
    writeToSpecFile(specPath, generated);
  } else if (!toFile) {
    process.stdout.write(generated);
  }
}
