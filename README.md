# CodeReplacer

一款可以转换 className 和 css 为指定格式的 vscode 插件。

## Demo

### 转换 className

![demo](demo.gif)

### 转换 css 和 styles

![demo1](demo1.gif)
## Usage

先选中需要转换的代码，使用 `shift + command + P`  搜索选择以下指令可以进行对应的 format 操作。

1.classNameToStyles：Transform ClassName To Styles，转换 class-name 为 styles.className 的小驼峰类型，eg:`className='test-name'` => `className={styles.testName}`。

2.stylesToClassName：Transform Styles To ClassName，转换 styles.className 小驼峰为 class-name 的类型，是方法 1 的逆向过程，eg：`className={styles.testName}` => `className='test-name'`。

3.cssToCamel：Transform Css To Camel Style，转换 .css-name 的 类型为 .cssName 小驼峰类型，eg：`.css-name {}` => `.cssName {}`。

4.camelToCss：Transform Camel To Css Style，转换 .cssName 的小驼峰类型为 .css-name 类型，是方法 3 的逆向过程，eg：`.cssName {}` => `.css-name {}`。

5.cssToStyle: Transform Css To Styles，将 css 的格式转换为 JSX 中的 style 格式。

6.styleToCss: Transform Styles To Css，将 JSX 中的 style 的格式转换为 css 的标准格式。
