import pkg from 'typescript';
const { createSourceFile, ScriptTarget, SyntaxKind } = pkg;
class TypescriptParser {
  constructor(code) {
    const sourceFile = createSourceFile('temp.ts', code, ScriptTarget.Latest);
    this.rootNode = this.getRecursiveFrom(sourceFile, sourceFile);
  }

  getRecursiveFrom(node, sourceFile) {
    const syntaxKind = SyntaxKind[node.kind];
    const nodeText = node.getText(sourceFile);
    const children = [];
    node.forEachChild((child) => {
      children.push(this.getRecursiveFrom(child, sourceFile));
    });
    const getFunc = function () {
      return { get: getFunc };
    };
    const get = function (kind) {
      const all = this.children.filter((el) => el.syntaxKind === kind);
      return all.length === 0 ? { get: getFunc } : all.length === 1 ? all[0] : all;
    };
    return { node, syntaxKind, nodeText, children, get };
  }
}

export default TypescriptParser;
