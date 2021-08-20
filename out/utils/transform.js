"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const formatSize_1 = require("./formatSize");
const less = require('less');
// 大写单词首个字母
function upperCaseFirstWord(str) {
    if (!str) {
        return '';
    }
    const newStr = str[0].toUpperCase() + str.substring(1);
    return newStr;
}
// 转换蛇形命名(-)为大驼峰字符串
const upperWordString = (txt) => {
    if (!txt) {
        return '';
    }
    return txt
        .split('-')
        .map((item) => upperCaseFirstWord(item))
        .join('');
};
// 转换驼峰字符串所有大写字母小写并以-连接
const lowerWordString = (txt) => {
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
const classNameToStyles = (selection) => {
    const transformedTxt = selection.replace(/className=["|']([\w|-]+)["|']/g, `className={styles.$1}`);
    const camelTransformedTxt = transformedTxt.replace(/className={styles.(\w+)([-\w+]*)}/g, function (_word, a, b) {
        return `className={styles.${a}${upperWordString(b)}}`;
    });
    return camelTransformedTxt;
};
/** cssToCamel */
const cssToCamel = (selection) => {
    const camelTransformedTxt = selection.replace(/\.(\w+)([-\w+]*)( ?[{|,])/g, function (_word, a, b, c) {
        return `.${a}${upperWordString(b)}${c}`;
    });
    return camelTransformedTxt;
};
/** stylesToClassName */
function stylesToClassName(selection) {
    const transformedTxt = selection.replace(/className={styles.([a-z][a-z|0-9]*)(([A-Z][a-z|0-9]*)*)}/g, function (_word, a, b) {
        return `className="${a}${lowerWordString(b)}"`;
    });
    return transformedTxt;
}
/** camelToCss */
function camelToCss(selection) {
    const transformedTxt = selection.replace(/\.([a-z][a-z|0-9]*)(([A-Z][a-z|0-9]*)*)( ?[{|,])/g, function (_word, a, b, _c, d) {
        return `.${a}${lowerWordString(b)}${d}`;
    });
    return transformedTxt;
}
/** 将单词转换为小驼峰写法 */
const transformToCamel = (text) => {
    return text.replace(/-(\w+)/, function (_word, a) {
        return upperCaseFirstWord(a);
    });
};
/** cssToStyle */
function cssToStyle(selection) {
    let transformedCss = '';
    // 引入 less 编译器
    less.render(selection, (_e, cssObj) => {
        transformedCss = cssObj.css;
    });
    const transformedTxt = transformedCss.replace(/(\.[^\s|\.]*?)\s*\{[\s\n]*([\s\S]*?)[\s\n]*\}/g, function (_word, a, str) {
        const wordList = str.split(';').filter((item) => item !== '');
        const formattedStr = wordList
            .map((item) => {
            const cssArr = item.split(':');
            const cssLabel = cssArr[0].replace(/(^\s*)|(\s*$)|(\t|\r|\n|\s)/g, '');
            const cssValue = cssArr[1].replace(/(^\s*)|(\s*$)|;/g, '');
            const formattedWord = transformToCamel(cssLabel);
            return ` ${formattedWord}: '${cssValue}'`;
        })
            .join(',');
        return `${a}:\nstyle={{${formattedStr}}}`;
    });
    return transformedTxt;
}
/** styleToCss */
function styleToCss(selection) {
    const transformedTxt = selection.replace(/style[\n\s]*=[\n\s]*\{\{\n?([\s\S]*?)\n?\}\}/g, function (_word, str) {
        const wordList = str.split(',').filter((item) => item !== '');
        const formattedStr = wordList
            .map((item) => {
            const cssArr = item.split(':');
            const cssLabel = cssArr[0].replace(/(^\s*)|(\s*$)|(\t|\r|\n|\s)/g, '');
            const cssValue = cssArr[1].replace(/(^\s*)|(\s*$)|'/g, '');
            const formattedCssValue = formatSize_1.formatSize(cssLabel, cssValue);
            const formattedWord = lowerWordString(cssLabel);
            return `  ${formattedWord}: ${formattedCssValue};`;
        })
            .join('\n');
        return `.css {\n${formattedStr}\n}`;
    });
    return transformedTxt;
}
/** objToJsonString */
function objToJsonString(selection) {
    const transformedTxt = selection.replace(/\{\n?(.*)\n?\}/g, function (_word, a, str) {
        // return JSON.stringify(_word);
        return JSON.stringify(eval('(' + _word + ')'));
    });
    return transformedTxt;
}
/** objToAttribute */
function objToAttribute(selection) {
    const transformedTxt = selection.replace(/\{\n?(.*)\n?\}/g, function (_word, str) {
        const wordList = str.split(',').filter((item) => item !== '');
        const formattedStr = wordList
            .map((item) => {
            const arr = item.split(':');
            const label = arr[0].replace(/(^\s*)|(\s*$)|(\t|\r|\n|\s)/g, '');
            const value = arr[1].replace(/(^\s*)|(\s*$)|'/g, '');
            const formattedValue = value.indexOf('"') === 0 ? value : `"${value}"`;
            return `${label}=${formattedValue}`;
        })
            .join('\n');
        return `${formattedStr}`;
    });
    return transformedTxt;
}
function transformWordFromMethods(method) {
    return function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            // Get the word within the selection
            const word = document.getText(selection);
            const transformed = method(word);
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
    cssToStyle,
    styleToCss,
    transformWordFromMethods,
    objToJsonString,
    objToAttribute,
};
//# sourceMappingURL=transform.js.map