"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-07-09 00:36:10
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-22 15:43:21
 */
const vscode = require("vscode");
/** 转换字符串第一个字母大写 */
const upperCaseFirstWord = (text) => {
    const newStr = text[0].toUpperCase() + text.substring(1);
    return newStr;
};
// 转换字符串第一个字母小写
function lowerCaseFirstWord(text) {
    const newStr = text[0].toLowerCase() + text.substring(1);
    return newStr;
}
/** classNameToStyles */
const classNameToStyles = (selection) => {
    const transformedTxt = selection.replace(/className=["|']([\w|-]+)["|']/g, `className={styles.$1}`);
    const camelTransformedTxt = transformedTxt.replace(/className={styles.(\w+)-(\w+)}/g, function (_word, a, b) {
        return `className={styles.${a}${upperCaseFirstWord(b)}}`;
    });
    return camelTransformedTxt;
};
/** cssToCamel */
const cssToCamel = (selection) => {
    const camelTransformedTxt = selection.replace(/.(\w+)-(\w+) ?{/g, function (_word, a, b) {
        return `.${a}${upperCaseFirstWord(b)} {`;
    });
    return camelTransformedTxt;
};
/** stylesToClassName */
function stylesToClassName(selection) {
    const transformedTxt = selection.replace(/className={styles.([a-z][a-z|0-9]*)([A-Z][a-z|0-9]*)?}/g, function (_word, a, b) {
        return `className="${a}${b ? `-${lowerCaseFirstWord(b)}` : ''}"`;
    });
    return transformedTxt;
}
/** camelToCss */
function camelToCss(selection) {
    const transformedTxt = selection.replace(/.([a-z][a-z|0-9]*)([A-Z][a-z|0-9]*)? ?{/g, function (_word, a, b) {
        return `.${a}${b ? `-${lowerCaseFirstWord(b)}` : ''} {`;
    });
    return transformedTxt;
}
function transformWordFromMethods(menthod) {
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
//# sourceMappingURL=index.js.map