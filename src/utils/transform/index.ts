import * as vscode from 'vscode';

/** 转换字符串第一个字母大写 */
const upperCaseFirstWord = (text: string) => {
  const newStr = text[0].toUpperCase() + text.substring(1);
  return newStr;
};

// 转换字符串第一个字母小写
function lowerCaseFirstWord(text: string) {
  const newStr = text[0].toLowerCase() + text.substring(1);
  return newStr;
}

/** classNameToStyles */
const classNameToStyles = (selection: string) => {
  const transformedTxt = selection.replace(
    /className=["|']([\w|-]+)["|']/g,
    `className={styles.$1}`
  );
  const camelTransformedTxt = transformedTxt.replace(
    /className={styles.(\w+)-(\w+)}/g,
    function (_word, a, b) {
      return `className={styles.${a}${upperCaseFirstWord(b)}}`;
    }
  );
  return camelTransformedTxt;
};

/** cssToCamel */
const cssToCamel = (selection: string) => {
  const camelTransformedTxt = selection.replace(/.(\w+)-(\w+) ?{/g, function (
    _word,
    a,
    b
  ) {
    return `.${a}${upperCaseFirstWord(b)} {`;
  });
  return camelTransformedTxt;
};

/** stylesToClassName */
function stylesToClassName(selection: string) {
  const transformedTxt = selection.replace(
    /className={styles.([a-z][a-z|0-9]*)([A-Z][a-z|0-9]*)?}/g,
    function (_word, a, b) {
      return `className="${a}${b ? `-${lowerCaseFirstWord(b)}` : ''}"`;
    }
  );
  return transformedTxt;
}

/** camelToCss */
function camelToCss(selection: string) {
  const transformedTxt = selection.replace(
    /.([a-z][a-z|0-9]*)([A-Z][a-z|0-9]*)? ?{/g,
    function (_word, a, b) {
      return `.${a}${b ? `-${lowerCaseFirstWord(b)}` : ''} {`;
    }
  );
  return transformedTxt;
}

function transformWordFromMethods(menthod: (selection: string) => string) {
  return function () {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const document = editor.document;
      const selection = editor.selection;

      // Get the word within the selection
      const word = document.getText(selection);
      const transformed = menthod(word);
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, transformed);
        vscode.window.showInformationMessage('转换成功!');
      });
    }
  };
}

module.exports = {
  cssToCamel,
  camelToCss,
  classNameToStyles,
  stylesToClassName,
  transformWordFromMethods,
};
