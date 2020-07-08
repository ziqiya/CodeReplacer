'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const transformMethods = require('./utils/transform');
const { classNameToStyles, cssToCamel } = transformMethods;
function activate(context) {
    const classNameToStylesDisposable = vscode.commands.registerCommand('extension.codeReplacer.classNameToStyles', function () {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            // Get the word within the selection
            const word = document.getText(selection);
            const transformed = classNameToStyles(word);
            editor.edit(editBuilder => {
                editBuilder.replace(selection, transformed);
                vscode.window.showInformationMessage('className 转换成功!');
            });
        }
    });
    const cssToCamelDisposable = vscode.commands.registerCommand('extension.codeReplacer.cssToCamel', function () {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            // Get the word within the selection
            const word = document.getText(selection);
            const transformed = cssToCamel(word);
            editor.edit(editBuilder => {
                editBuilder.replace(selection, transformed);
                vscode.window.showInformationMessage('css 转换成功!');
            });
        }
    });
    // 释放资源
    context.subscriptions.push(classNameToStylesDisposable);
    context.subscriptions.push(cssToCamelDisposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map