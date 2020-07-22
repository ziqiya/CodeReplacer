'use strict';

import * as vscode from 'vscode';

const transformMethods = require('./utils/transform');

const {
  transformWordFromMethods,
  // 使用的转换方法列表
  ...restMethods
} = transformMethods;

export function activate(context: vscode.ExtensionContext) {
  const disposableArr = Object.keys(restMethods).map((item) =>
    vscode.commands.registerCommand(
      `extension.codeReplacer.${item}`,
      transformWordFromMethods(restMethods[item])
    )
  );

  // 释放资源
  disposableArr.forEach((item) => {
    context.subscriptions.push(item);
  });
}
