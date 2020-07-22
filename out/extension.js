'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const transformMethods = require('./utils/transform');
const { transformWordFromMethods, 
// 使用的转换方法列表
...restMethods } = transformMethods;
function activate(context) {
    const disposableArr = Object.keys(restMethods).map((item) => vscode.commands.registerCommand(`extension.codeReplacer.${item}`, transformWordFromMethods(restMethods[item])));
    // 释放资源
    disposableArr.forEach((item) => {
        context.subscriptions.push(item);
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map