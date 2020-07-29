import * as vscode from 'vscode';

// 转换蛇形命名(-)为驼峰字符串
const upperWordString = (txt: string) => {
  if (!txt) {
    return '';
  }
  function upperCaseFirstWord(str: string) {
    if (!str) {
      return '';
    }
    const newStr = str[0].toUpperCase() + str.substring(1);
    return newStr;
  }
  return txt
    .split('-')
    .map((item) => upperCaseFirstWord(item))
    .join('');
};

// 转换驼峰字符串所有大写字母小写并以-连接
const lowerWordString = (txt: string) => {
  if (!txt) {
    return '';
  }
  const stringArr = txt.split('');
  const transformedArr = [...stringArr];
  stringArr.forEach((item, idx) => {
    if (item < 'Z' && item > 'A') {
      transformedArr.splice(idx, 1, `-${item.toLowerCase()}`);
    }
  });
  return transformedArr.join('');
};

/** classNameToStyles */
const classNameToStyles = (selection: string) => {
  const transformedTxt = selection.replace(
    /className=["|']([\w|-]+)["|']/g,
    `className={styles.$1}`
  );
  const camelTransformedTxt = transformedTxt.replace(
    /className={styles.(\w+)([-\w+]*)}/g,
    function (_word, a, b) {
      return `className={styles.${a}${upperWordString(b)}}`;
    }
  );
  return camelTransformedTxt;
};

/** cssToCamel */
const cssToCamel = (selection: string) => {
  const camelTransformedTxt = selection.replace(
    /.(\w+)([-\w+]*) ?{/g,
    function (_word, a, b) {
      return `.${a}${upperWordString(b)} {`;
    }
  );
  return camelTransformedTxt;
};

/** stylesToClassName */
function stylesToClassName(selection: string) {
  const transformedTxt = selection.replace(
    /className={styles.([a-z][a-z|0-9]*)(([A-Z][a-z|0-9]*)*)}/g,
    function (_word, a, b) {
      return `className="${a}${lowerWordString(b)}"`;
    }
  );
  return transformedTxt;
}

/** camelToCss */
function camelToCss(selection: string) {
  const transformedTxt = selection.replace(
    /.([a-z][a-z|0-9]*)(([A-Z][a-z|0-9]*)*) ?{/g,
    function (_word, a, b) {
      return `.${a}${lowerWordString(b)} {`;
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
