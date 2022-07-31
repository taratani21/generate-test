import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

import { getKlass, getImports, getAngularType, getKlassProperties, getKlassGetters, getKlassSetters, getKlassMethods, getProviderMocks, getGenerated, writeGenerated, getImportMocks, getInputMocks, getOutputMocks, getComponentProviderMocks, getDirectiveSelector } from '../common-test-gen.js';

class DirectiveTestGen {
  constructor (tsPath, config) {
    if (tsPath && existsSync(tsPath)) {
      this.tsPath = tsPath;
      this.config = config;
    } else {
      throw new Error(`Error. invalid typescript file. e.g., Usage $0 ${tsPath} [options]`);
    }

    this.tsPath = tsPath;
    this.typescript = readFileSync(resolve(tsPath), 'utf8');
    this.template = config.templates.directive;

    this.klass = getKlass.bind(this)();
    this.imports = getImports.bind(this)();
    this.angularType = getAngularType.bind(this)().toLowerCase();
    this.klassProperties = getKlassProperties.bind(this)();
    this.klassGetters = getKlassGetters.bind(this)(),
    this.klassSetters = getKlassSetters.bind(this)(),
    this.klassMethods = getKlassMethods.bind(this)(),

    this.getProviderMocks = getProviderMocks.bind(this);
    this.getGenerated = getGenerated.bind(this);
    this.writeGenerated = writeGenerated.bind(this);
  }

  getData () {
    const ejsData = {
      className: this.klass.node.name.escapedText,
      importMocks: getImportMocks.bind(this)(),
      inputMocks: getInputMocks.bind(this)(),
      outputMocks: getOutputMocks.bind(this)(),
      componentProviderMocks: getComponentProviderMocks.bind(this)(),
      selector: getDirectiveSelector.bind(this)(),

      ctorParamJs: undefined, // declarition only, will be set from mockData
      providerMocks: undefined, //  declarition only, will be set from mockData
      accessorTests: undefined, //  declarition only, will be set from mockData
      functionTests: undefined //  declarition only, will be set from mockData
    }

    return {ejsData};
  }
}

export default DirectiveTestGen;
