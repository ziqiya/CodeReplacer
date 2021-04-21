'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const transformMethods = require('./utils/transform');
const { transformWordFromMethods, 
// 使用的转换方法列表
...restMethods } = transformMethods;
// 只会在插件激活时执行一次
function activate(context) {
    const disposableArr = Object.keys(restMethods).map((item) => vscode.commands.registerCommand(`codeReplacer.${item}`, transformWordFromMethods(restMethods[item])));
    // 添加订阅
    disposableArr.forEach((item) => {
        context.subscriptions.push(item);
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map