'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const transformMethods = require('../utils/transform');
const { classNameToStyles, cssToCamel } = transformMethods;
function activate(context) {
    vscode.commands.registerCommand('extension.codeReplacer.classNameToStyles', function () {
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
            });
        }
    });
    vscode.commands.registerCommand('extension.codeReplacer.cssToCamel', function () {
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
            });
        }
    });
    // context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map