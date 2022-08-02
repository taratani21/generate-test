import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const klassTemplate = readFileSync(join(__dirname, 'src', 'class', 'class.template.ts.ejs'), 'utf8');
const componentTemplate = readFileSync(join(__dirname, 'src', 'component', 'component.template.ts.ejs'), 'utf8');
const directiveTemplate = readFileSync(join(__dirname, 'src', 'directive', 'directive.template.ts.ejs'), 'utf8');
const injectableTemplate = readFileSync(join(__dirname, 'src', 'injectable', 'injectable.template.ts.ejs'), 'utf8');
const pipeTemplate = readFileSync(join(__dirname, 'src', 'pipe', 'pipe.template.ts.ejs'), 'utf8');

export const framework = 'karma';
export const templates = {
  klass: klassTemplate,
  component: componentTemplate,
  directive: directiveTemplate,
  injectable: injectableTemplate,
  pipe: pipeTemplate
};
export const directives = [];
export const pipes = [];
export const replacements = [
  { from: 'require\\("html-custom-element"\\)', to: '{}' },
  { from: '^\\S+\\.define\\(.*\\);', to: '' } // some commands causes error
];
export const providerMocks = {
  ElementRef: ['nativeElement = {};'],
  Router: ['navigate() {};'],
  Document: ['querySelector() {};'],
  HttpClient: ['post() {};'],
  TranslateService: ['translate() {};'],
  EncryptionService: [],
  CartService: ['getShippingPrices() {};']
};
export const includeMatch = [/(component|directive|pipe|service).ts/];
export const excludeMatch = [];
