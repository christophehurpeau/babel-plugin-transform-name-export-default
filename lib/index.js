'use strict';

const path = require('path');
const camelCase = require('lodash.camelcase');

module.exports = ({ types: t }) => {
  const isAnnonFunctionDecl = declaration =>
    (declaration.type === 'FunctionExpression' || declaration.type === 'FunctionDeclaration') &&
    !(declaration.id && declaration.id.name);

  const isAnnonClassDecl = declaration =>
    (declaration.type === 'ClassExpression' || declaration.type === 'ClassDeclaration') &&
    !(declaration.id && declaration.id.name);

  const isArrowFunctionDecl = declaration => declaration.type === 'ArrowFunctionExpression';

  const resolveClashingName = (name, scope) => {
    let index = 0;
    let resolvedName = name;

    while (scope.hasBinding(resolvedName) && index < 100) {
      resolvedName = name + index++;
    }
    if (index > 100) {
      throw Error(`Couldn't resolve clashing name "${name}".`);
    }
    return resolvedName;
  };

  const deduceName = (pluginPass, scope) => {
    const filename =
      pluginPass && pluginPass.file && pluginPass.file.opts && pluginPass.file.opts.filename;

    let name = filename;
    name = name && path.basename(name).replace(/\.jsx?$/, '');
    if (name === 'index') {
      const dirname = path.basename(path.dirname(filename));
      if (dirname && dirname !== '.') name = dirname;
    }
    name = name && camelCase(name);

    if (/^[0-9]/.test(name)) {
      name = `_${name}`;
    }

    if (!t.isValidIdentifier(name)) {
      throw Error(`Invalid identifier "${name}".`);
    }

    return resolveClashingName(name, scope);
  };

  return {
    visitor: {
      ExportDefaultDeclaration(path, pluginPass) {
        const declaration = path.node.declaration;

        if (isAnnonClassDecl(declaration) || isAnnonFunctionDecl(declaration)) {
          // replace
          declaration.id = t.identifier(deduceName(pluginPass, path.scope));
        }

        if (isArrowFunctionDecl(declaration)) {
          path.get('declaration').arrowFunctionToShadowed();
          declaration.id = t.identifier(deduceName(pluginPass, path.scope));
        }

        if (
          pluginPass &&
          pluginPass.opts &&
          pluginPass.opts.compose &&
          t.isCallExpression(declaration) &&
          declaration.arguments.length === 1 &&
          t.isArrowFunctionExpression(declaration.arguments[0])
        ) {
          path.get('declaration.arguments.0').arrowFunctionToShadowed();
          declaration.arguments[0].id = t.identifier(deduceName(pluginPass, path.scope));
        }
      },
    },
  };
};
