"use strict";
/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-07-09 00:36:10
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-09 01:02:33
 */
/** 转换字符串第一个字母大写 */
const upperCaseFirstWord = (str) => {
    const newStr = str[0].toUpperCase() + str.substring(1);
    return newStr;
};
/** classNameToStyles */
const classNameToStyles = (selection) => {
    const transfromedTxt = selection.replace(/className=["|']([\w|-]+)["|']/g, `className={styles.$1}`);
    console.log('transfromedTxt: ', transfromedTxt);
    const camelTransformedTxt = transfromedTxt.replace(/className={styles.(\w+)-(\w+)}/g, function (_word, a, b) {
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
module.exports = {
    cssToCamel,
    classNameToStyles
};
//# sourceMappingURL=index.js.map