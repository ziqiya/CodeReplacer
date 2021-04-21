'use strict';

import * as vscode from 'vscode';

const transformMethods = require('./utils/transform');

const {
  transformWordFromMethods,
  // 使用的转换方法列表
  ...restMethods
} = transformMethods;

// 只会在插件激活时执行一次
export function activate(context: vscode.ExtensionContext) {
  const disposableArr = Object.keys(restMethods).map((item) =>
    vscode.commands.registerCommand(
      `codeReplacer.${item}`,
      transformWordFromMethods(restMethods[item])
    )
  );

  // 添加订阅
  disposableArr.forEach((item) => {
    context.subscriptions.push(item);
  });
}

export function deactivate() {}
