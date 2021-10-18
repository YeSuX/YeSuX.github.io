# webpack学习笔记

## 安装

安装最新版本或特定版本。

```shell
npm install --save-dev webpack
npm install --save-dev webpack@<version>
```

如果你使用 webpack 4+ 版本，你还需要安装 CLI。

```shell
npm install --save-dev webpack-cli
```

对于大多数项目，我们建议本地安装。

```json
"scripts": {
    "start": "webpack --config webpack.config.js"
}
```

## 起步

webpack 用于编译 JavaScript 模块。

### 基本安装

首先我们创建一个目录，初始化 npm，然后 在本地安装 webpack，接着安装 webpack-cli（此工具用于在命令行中运行 webpack）：

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

通过script引用js的方式，去管理 JavaScript 项目会有一些问题：

- 无法立即体现，脚本的执行依赖于外部扩展库(external library)。
- 如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。
- 如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码。

> *在安装一个要打包到生产环境的安装包时，你应该使用* `npm install --save`*，如果你在安装一个用于开发环境的安装包（例如，linter, 测试库等），你应该使用* `npm install --save-dev`*。*

### npm脚本

```json
"scripts": {
      "build": "webpack"
    },
```

## 管理资源

webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader *引入任何其他类型的文件*。也就是说，以上列出的那些 JavaScript 的优点（例如显式依赖），同样可以用来构建网站或 web 应用程序中的所有非 JavaScript 内容。

### 加载CSS

**安装loader**

```shell、
npm install --save-dev style-loader css-loader
```

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```

> *webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，以* `.css` *结尾的全部文件，都将被提供给* `style-loader` *和* `css-loader`*。*

这使你可以在依赖于此样式的文件中 `import './style.css'`。现在，当该模块运行时，含有 CSS 字符串的 `<style>` 标签，将被插入到 html 文件的 `<head>` 中。

### 加载图片

安装loader

```bash
npm install --save-dev file-loader
```

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

> *合乎逻辑下一步是，压缩和优化你的图像。查看* [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) *和* [url-loader](https://www.webpackjs.com/loaders/url-loader)*，以了解更多关于如果增强加载处理图片功能。*

### 加载字体

```diff
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
```

```diff
+ @font-face {
+   font-family: 'MyFont';
+   src:  url('./my-font.woff2') format('woff2'),
+         url('./my-font.woff') format('woff');
+   font-weight: 600;
+   font-style: normal;
+ }

  .hello {
    color: red;
+   font-family: 'MyFont';
    background: url('./icon.png');
  }
```

### 加载数据

```bash
npm install --save-dev csv-loader xml-loader
```

```diff
+       {
+         test: /\.(csv|tsv)$/,
+         use: [
+           'csv-loader'
+         ]
+       },
+       {
+         test: /\.xml$/,
+         use: [
+           'xml-loader'
+         ]
+       }
```

### 全局资源

上述所有内容中最出色之处是，以这种方式加载资源，你可以以**更直观的方式将模块和资源组合在一起**。无需依赖于含有全部资源的 `/assets` 目录，而是将资源与代码组合在一起。例如，类似这样的结构会非常有用：

```diff
- |- /assets
+ |– /components
+ |  |– /my-component
+ |  |  |– index.jsx
+ |  |  |– index.css
+ |  |  |– icon.svg
+ |  |  |– img.png
```

这种配置方式会使你的代码更**具备可移植性**，因为现有的统一放置的方式会造成所有资源紧密耦合在一起。假如你想在另一个项目中使用 `/my-component`，只需将其复制或移动到 `/components` 目录下。只要你已经安装了任何*扩展依赖(external dependencies)*，并且你*已经在配置中定义过相同的 loader*，那么项目应该能够良好运行。

## 管理输出

### html-webpack-plugin

```bash
npm install --save-dev html-webpack-plugin
```

```diff
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Output Management'
+     })
+   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

 `HtmlWebpackPlugin` 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中。

如果你想要了解更多 `HtmlWebpackPlugin` 插件提供的全部功能和选项，那么你就应该多多熟悉 [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin) 仓库。

你还可以看一下 [`html-webpack-template`](https://github.com/jaketrent/html-webpack-template)，除了默认模板之外，还提供了一些额外的功能。

### clean-webpack-plugin

```bash
npm install clean-webpack-plugin --save-dev
```

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
+ const {CleanWebpackPlugin} = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
+     new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

通常，clean-webpack-plugin会在每次构建前清理 `/dist` 文件夹。

## 开发环境构建

### 使用 source map

为了更容易地追踪错误和警告，JavaScript 提供了 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 `b.js`，source map 就会明确的告诉你。

source map 有很多[不同的选项](https://www.webpackjs.com/configuration/devtool)可用，请务必仔细阅读它们，以便可以根据需要进行配置。

对于本指南，我们使用 `inline-source-map` 选项，这有助于解释说明我们的目的（仅解释说明，不要用于生产环境）：

**webpack.config.js**

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

### 选择一个开发工具

webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：

1. webpack's Watch Mode
2. webpack-dev-server
3. webpack-dev-middleware

多数场景中，你可能需要使用 `webpack-dev-server`，但是不妨探讨一下以上的所有选项。

### 使用 webpack-dev-server

```bash
npm install --save-dev webpack-dev-server
```

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',
+   devServer: {},
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

```diff
"scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
+     "start": "webpack-dev-server --open",
      "build": "webpack"
    },
```

`webpack-dev-server` 带有许多可配置的选项。转到[相关文档](https://www.webpackjs.com/configuration/dev-server)以了解更多。

## 模块热更新

启用此功能实际上相当简单。而我们要做的，就是更新 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 的配置，和使用 webpack 内置的 HMR 插件。

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const webpack = require('webpack');

  module.exports = {
    entry: {
-      app: './src/index.js',
-      print: './src/print.js'
+      app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
+     new webpack.NamedModulesPlugin(),
+     new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

注意，我们还添加了 `NamedModulesPlugin`，以便更容易查看要修补(patch)的依赖。

## tree shaking

为了学会使用 *tree shaking*，你必须……

- 使用 ES2015 模块语法（即 `import` 和 `export`）。

- 在项目 `package.json` 文件中，添加一个 "sideEffects" 入口。

  - 如同上面提到的，如果所有代码都不包含副作用，我们就可以简单地将该属性标记为 `false`，来告知 webpack，它可以安全地删除未用到的 export 导出。

    > 「副作用」的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。

    如果你的代码确实有一些副作用，那么可以改为提供一个数组

    > *注意，任何导入的文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似* `css-loader` *并导入 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除：*

- 引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 `UglifyJSPlugin`）。

## 生产环境构建

### 配置

*开发环境(development)*和*生产环境(production)*的构建目标差异很大。在*开发环境*中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在*生产环境*中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写**彼此独立的 webpack 配置**。

虽然，以上我们将*生产环境*和*开发环境*做了略微区分，但是，请注意，我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。为了将这些配置合并在一起，我们将使用一个名为 [`webpack-merge`](https://github.com/survivejs/webpack-merge)nt-specific)的配置中重复代码。

```bash
npm install --save-dev webpack-merge
```

```diff
  webpack-demo
  |- package.json
- |- webpack.config.js
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```

```diff
  {
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
-     "start": "webpack-dev-server --open",
+     "start": "webpack-dev-server --open --config webpack.dev.js",
-     "build": "webpack"
+     "build": "webpack --config webpack.prod.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "clean-webpack-plugin": "^0.1.17",
      "css-loader": "^0.28.4",
      "csv-loader": "^2.1.1",
      "express": "^4.15.3",
      "file-loader": "^0.11.2",
      "html-webpack-plugin": "^2.29.0",
      "style-loader": "^0.18.2",
      "webpack": "^3.0.0",
      "webpack-dev-middleware": "^1.12.0",
      "webpack-dev-server": "^2.9.1",
      "webpack-merge": "^4.1.0",
      "xml-loader": "^1.2.1"
    }
  }
```

### source map

我们鼓励你在生产环境中启用 source map，因为它们对调试源码(debug)和运行基准测试(benchmark tests)很有帮助。虽然有如此强大的功能，然而还是应该针对生成环境用途，选择一个构建快速的推荐配置（具体细节请查看 [`devtool`](https://www.webpackjs.com/configuration/devtool)将在*生产环境*中使用 `source-map` 选项，而不是我们在*开发环境*中用到的 `inline-source-map`：

```diff
  const merge = require('webpack-merge');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
+   devtool: 'source-map',
    plugins: [
-     new UglifyJSPlugin()
+     new UglifyJSPlugin({
+       sourceMap: true
+     })
    ]
  });
```

> 避免在生产中使用 `inline-***` 和 `eval-***`，因为它们可以增加 bundle 大小，并降低整体性能。

### 指定环境

许多 library 将通过与 `process.env.NODE_ENV` 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于*生产环境*中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 `process.env.NODE_ENV === 'production'` 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。

### split css

正如在**管理资源**中最后的 [加载 CSS](https://www.webpackjs.com/guides/asset-management#loading-css) 小节中所提到的，通常最好的做法是使用 `ExtractTextPlugin` 将 CSS 分离成单独的文件。在插件[文档](https://www.webpackjs.com/plugins/extract-text-webpack-plugin)中有一些很好的实现例子。`disable` 选项可以和 `--env` 标记结合使用，以允许在开发中进行内联加载，推荐用于热模块替换和构建速度。

## 代码分离

代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

有三种常用的代码分离方法：

- 入口起点：使用 [`entry`](https://www.webpackjs.com/configuration/entry-context) 配置手动地分离代码。
- 防止重复：使用 [`CommonsChunkPlugin`](https://www.webpackjs.com/plugins/commons-chunk-plugin) 去重和分离 chunk。
- 动态导入：通过模块的内联函数调用来分离代码。

### 防止重复

```diff
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another-module.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
+ optimization:{
+    runtimeChunk:{
+      name:'common'
+    }
  }
};
```

以下是由社区提供的，一些对于代码分离很有帮助的插件和 loaders：

- [`ExtractTextPlugin`](https://www.webpackjs.com/plugins/extract-text-webpack-plugin): 用于将 CSS 从主应用程序中分离。
- [`bundle-loader`](https://www.webpackjs.com/loaders/bundle-loader): 用于分离代码和延迟加载生成的 bundle。
- [`promise-loader`](https://github.com/gaearon/promise-loader): 类似于 `bundle-loader` ，但是使用的是 promises。

[`CommonsChunkPlugin`](https://www.webpackjs.com/plugins/commons-chunk-plugin) 插件还可以通过使用[显式的 vendor chunks](https://www.webpackjs.com/plugins/commons-chunk-plugin/#explicit-vendor-chunk) 功能，从应用程序代码中分离 vendor 模块。

### bundle 分析(bundle analysis)

如果我们以分离代码作为开始，那么就以检查模块作为结束，分析输出结果是很有用处的。[官方分析工具](https://github.com/webpack/analyse) 是一个好的初始选择。下面是一些社区支持(community-supported)的可选工具：

- [webpack-chart](https://alexkuz.github.io/webpack-chart/): webpack 数据交互饼图。
- [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer): 一款分析 bundle 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户。

## 懒加载

懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

**适用场景为含用户交互的场景，若不需要用户的交互——每次加载页面的时候会请求它，这样做并没有什么好处。**

```diff
+ import _ from 'lodash';
+
- async function getComponent() {
+ function component() {
    var element = document.createElement('div');
-   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
+   var button = document.createElement('button');
+   var br = document.createElement('br');

+   button.innerHTML = 'Click me and look at the console!';
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.appendChild(br);
+   element.appendChild(button);
+
+   // Note that because a network request is involved, some indication
+   // of loading would need to be shown in a production-level site/app.
+   button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
+     var print = module.default;
+
+     print();
+   });

    return element;
  }

- getComponent().then(component => {
-   document.body.appendChild(component);
- });
+ document.body.appendChild(component());
```

## 解决缓存问题

我们使用 webpack 来打包我们的模块化后的应用程序，webpack 会生成一个可部署的 `/dist` 目录，然后把打包后的内容放置在此目录中。只要 `/dist` 目录中的内容部署到服务器上，客户端（通常是浏览器）就能够访问网站此服务器的网站及其资源。而最后一步获取资源是比较耗费时间的，这就是为什么浏览器使用一种名为 [缓存](https://searchstorage.techtarget.com/definition/cache) 的技术。可以通过命中缓存，以降低网络流量，使网站加载速度更快，然而，**如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。由于缓存的存在，当你需要获取新的代码时，就会显得很棘手。**

### 输出文件的文件名

将第三方库(library)（例如 `lodash` 或 `react`）提取到单独的 `vendor` chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。因此通过实现以上步骤，利用客户端的长效缓存机制，可以通过命中缓存来消除请求，并减少向服务器获取资源，同时还能保证客户端代码和服务器端代码版本一致。这可以通过使用新的 `entry(入口)` 起点，以及再额外配置一个 `CommonsChunkPlugin` 实例的组合方式来实现：

```diff
  var path = require('path');
  const webpack = require('webpack');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
-   entry: './src/index.js',
+   entry: {
+     main: './src/index.js',
+     vendor: [
+       'lodash'
+     ]
+   },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
+     new webpack.optimize.CommonsChunkPlugin({
+       name: 'vendor'
+     }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      })
    ],
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

### 模板标识符

选择是使用 [`HashedModuleIdsPlugin`](https://www.webpackjs.com/plugins/hashed-module-ids-plugin)

```diff
  const path = require('path');
  const webpack = require('webpack');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      main: './src/index.js',
      vendor: [
        'lodash'
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
+     new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      })
    ],
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

## shimming

`webpack` 编译器(compiler)能够识别遵循 ES2015 模块语法、CommonJS 或 AMD 规范编写的模块。然而，一些第三方的库(library)可能会引用一些全局依赖（例如 `jQuery` 中的 `$`）。这些库也可能创建一些需要被导出的全局变量。这些“不符合规范的模块”就是 *shimming* 发挥作用的地方。

> **我们不推荐使用全局的东西！**在 webpack 背后的整个概念是让前端开发更加模块化。也就是说，需要编写具有良好的封闭性(well contained)、彼此隔离的模块，以及不要依赖于那些隐含的依赖模块（例如，全局变量）。请只在必要的时候才使用本文所述的这些特性。

## 渐进式网络应用程序

渐进式网络应用程序(Progressive Web Application - PWA)，是一种可以提供类似于原生应用程序(native app)体验的网络应用程序(web app)。PWA 可以用来做很多事。其中最重要的是，在**离线(offline)**时应用程序能够继续运行功能。这是通过使用名为 [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/) 的网络技术来实现的。

本章将重点介绍，如何为我们的应用程序添加离线体验。我们将使用名为 [Workbox](https://github.com/GoogleChrome/workbox) 的 Google 项目来实现此目的，该项目提供的工具可帮助我们更轻松地配置 web app 的离线支持。

## Typescript

[TypeScript](https://www.typescriptlang.org/) 是 JavaScript 的超集，为其增加了类型系统，可以编译为普通的 JavaScript 代码。这篇指南里我们将会学习 webpack 是如何跟 TypeScript 进行集成。

### 基础安装

```bash
npm install --save-dev typescript ts-loader
```

**project**

```diff
  webpack-demo
  |- package.json
+ |- tsconfig.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
    |- index.js
+   |- index.ts
  |- /node_modules
```

**tsconfig.json**

这里我们设置一个基本的配置，来支持 JSX，并将 TypeScript 编译到 ES5……

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

### Loader

[`ts-loader`](https://github.com/TypeStrong/ts-loader)

在本指南中，我们使用 `ts-loader`，因为它能够很方便地启用额外的 webpack 功能，例如将其他 web 资源导入到项目中。

### source map

要启用 source map，我们必须配置 TypeScript，以将内联的 source map 输出到编译过的 JavaScript 文件。必须在 TypeScript 配置中添加下面这行：

**tsconfig.json**

```diff
  {
    "compilerOptions": {
      "outDir": "./dist/",
+     "sourceMap": true,
      "noImplicitAny": true,
      "module": "commonjs",
      "target": "es5",
      "jsx": "react",
      "allowJs": true
    }
  }
```

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.ts',
+   devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

### 使用第三方库

当从 npm 安装第三方库时，一定要牢记同时安装这个库的类型声明文件。你可以从 [TypeSearch](http://microsoft.github.io/TypeSearch/) 中找到并安装这些第三方库的类型声明文件。

### 导入其他资源

要在 TypeScript 里使用非代码资源，我们需要告诉 TypeScript 如何兼容这些导入类型。那么首先，我们需要在项目里创建 `custom.d.ts` 文件，这个文件用来编写自定义的类型声明。让我们将 `.svg` 文件进行声明设置：

**custom.d.ts**

```typescript
declare module "*.svg" {
  const content: any;
  export default content;
}
```

这里，我们通过指定任何以 `.svg` 结尾的导入，并将模块的 `content` 定义为 `any`，将 SVG 声明一个新的模块。我们可以通过将类型定义为字符串，来更加显式地将它声明为一个 url。同样的理念适用于其他资源，包括 CSS, SCSS, JSON 等。

## 使用环境变量

webpack 命令行[环境配置](https://www.webpackjs.com/api/cli/#environment-options)中，通过设置 `--env` 可以使你根据需要，传入尽可能多的环境变量。在 `webpack.config.js` 文件中可以访问到这些环境变量。例如，`--env.production` 或 `--env.NODE_ENV=local`。

## 构建性能

## 常规

无论你正在 [development](https://www.webpackjs.com/guides/development) 或构建 [production](https://www.webpackjs.com/guides/production)，以下做法应该帮助到你达到最佳。

#### 保持版本最新

#### Loaders

将 loaders 应用于最少数的必要模块中。而不是:

```js
{
  test: /\.js$/,
  loader: "babel-loader"
}
```

使用 `include` 字段仅将 loader 模块应用在实际需要用其转换的位置中：

```js
{
  test: /\.js$/,
  include: path.resolve(__dirname, "src"),
  loader: "babel-loader"
}
```

#### Bootstrap

每个额外的 loader/plugin 都有启动时间。尽量少使用不同的工具。

#### 解析

以下几步可以提供解析速度:

- 尽量减少 `resolve.modules`, `resolve.extensions`, `resolve.mainFiles`, `resolve.descriptionFiles` 中类目的数量，因为他们会增加文件系统调用的次数。
- 如果你不使用 symlinks ，可以设置 `resolve.symlinks: false` (例如 `npm link` 或者 `yarn link`).
- 如果你使用自定义解析 plugins ，并且没有指定 context 信息，可以设置 `resolve.cacheWithContext: false` 。

#### Dlls

使用 `DllPlugin` 将更改不频繁的代码进行单独编译。这将改善引用程序的编译速度，即使它增加了构建过程的复杂性。

#### Smaller = Faster

减少编译的整体大小，以提高构建性能。尽量保持 chunks 小巧。

- 使用 更少/更小 的库。
- 在多页面应用程序中使用 `CommonsChunksPlugin`。
- 在多页面应用程序中以 `async` 模式使用 `CommonsChunksPlugin` 。
- 移除不使用的代码。
- 只编译你当前正在开发部分的代码。

#### Worker Pool

`thread-loader` 可以将非常消耗资源的 loaders 转存到 worker pool 中。

> 不要使用太多的 workers ，因为 Node.js 的 runtime 和 loader 有一定的启动开销。最小化 workers 和主进程间的模块传输。进程间通讯(IPC)是非常消耗资源的。

#### 持久化缓存

使用 `cache-loader` 启用持久化缓存。使用 `package.json` 中的 `"postinstall"` 清除缓存目录。

#### 自定义 plugins/loaders

这里不对它们配置的性能问题作过多赘述。

## Development

下面步骤对于 *development* 特别有用。

### 增量编译

使用 webpack 的监听模式。不要使用其他工具来监听你的文件和调用 webpack 。在监听模式下构建会记录时间戳并将信息传递给编译让缓存失效。

在某些设置中，监听会回退到轮询模式。有许多监听文件会导致 CPU 大量负载。在这些情况下，你可以使用 `watchOptions.poll` 来增加轮询的间隔。

### 在内存中编译

以下几个实用工具通过在内存中进行代码的编译和资源的提供，但并不写入磁盘来提高性能:

- `webpack-dev-server`
- `webpack-hot-middleware`
- `webpack-dev-middleware`

### Devtool

需要注意的是不同的 `devtool` 的设置，会导致不同的性能差异。

- `"eval"` 具有最好的性能，但并不能帮助你转译代码。
- 如果你能接受稍差一些的 mapping 质量，可以使用 `cheap-source-map` 选项来提高性能
- 使用 `eval-source-map` 配置进行增量编译。

=> 在大多数情况下，`cheap-module-eval-source-map` 是最好的选择。

### 避免在生产环境下才会用到的工具

某些实用工具， plugins 和 loaders 都只能在构建生产环境时才有用。例如，在开发时使用 `UglifyJsPlugin` 来压缩和修改代码是没有意义的。以下这些工具在开发中通常被排除在外:

- `UglifyJsPlugin`
- `ExtractTextPlugin`
- `[hash]`/`[chunkhash]`
- `AggressiveSplittingPlugin`
- `AggressiveMergingPlugin`
- `ModuleConcatenationPlugin`

### 最小化入口 chunk

webpack 只会在文件系统中生成已经更新的 chunk 。对于某些配置选项(HMR, `[name]`/`[chunkhash]` in `output.chunkFilename`, `[hash]`)来说，除了更新的 chunks 无效之外，入口 chunk 也不会生效。

应当在生成入口 chunk 时，尽量减少入口 chunk 的体积，以提高性能。下述代码块将只提取包含 runtime 的 chunk ，*其他 chunk 都作为子模块*:

```js
new CommonsChunkPlugin({
  name: "manifest",
  minChunks: Infinity
})
```

## Production

以下步骤在 *production* 中非常有用。

> **不要为了非常小的性能增益，牺牲你应用程序的质量！** 请注意，优化代码质量在大多数情况下比构建性能更重要。

### 多个编译时

当进行多个编译时，以下工具可以帮助到你:

- [`parallel-webpack`](https://github.com/trivago/parallel-webpack): 它允许编译工作在 worker 池中进行。
- `cache-loader`: 缓存可以在多个编译时之间共享。

### Source Maps

Source maps 真的很消耗资源。你真的需要他们？

## 工具相关问题

下列工具存在某些可能会降低构建性能的问题。

### Babel

- 项目中的 preset/plugins 数量最小化。

### TypeScript

- 在单独的进程中使用 `fork-ts-checker-webpack-plugin` 进行类型检查。
- 配置 loaders 跳过类型检查。
- 使用 `ts-loader` 时，设置 `happyPackMode: true` / `transpileOnly: true`。

### Sass

- `node-sass` 中有个来自 Node.js 线程池的阻塞线程的 bug。 当使用 `thread-loader` 时，需要设置 `workerParallelJobs: 2`。

## 集成

首先我们要消除一个常见的误解。webpack 是一个模块打包器(module bundler)（例如，[Browserify](http://browserify.org/) 或 [Brunch](http://brunch.io/)）。它不是一个任务执行器(task runner)（例如，[Make](https://www.gnu.org/software/make/), [Grunt](https://gruntjs.com/) 或者 [Gulp](https://gulpjs.com/) ）。任务执行器就是用来自动化处理常见的开发任务，例如项目的检查(lint)、构建(build)、测试(test)。相对于*打包器(bundler)*，任务执行器则聚焦在偏重上层的问题上面。你可以得益于，使用上层的工具，而将打包部分的问题留给 webpack。

打包器(bundler)帮助你取得准备用于部署的 JavaScript 和样式表，将它们转换为适合浏览器的可用格式。例如，JavaScript 可以[压缩](https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin)、[拆分 chunk](https://www.webpackjs.com/guides/code-splitting) 和[懒加载](https://www.webpackjs.com/guides/lazy-loading)，以提高性能。打包是 web 开发中最重要的挑战之一，解决此问题可以消除开发过程中的大部分痛点。

### NPM Scripts

通常 webpack 用户使用 npm [`scripts`](https://docs.npmjs.com/misc/scripts) 来作为任务执行器。这是比较好的开始。然而跨平台支持是一个问题，为此有一些解决方案。许多用户，但不是大多数用户，直接使用 npm `scripts` 和各种级别的 webpack 配置和工具，来应对构建任务。

因此，当 webpack 的核心焦点专注于打包时，有多种扩展可以供你使用，可以将其用于任务运行者常见的工作。集成一个单独的工具会增加复杂度，所以一定要权衡集成前后的利弊。

### Grunt

对于那些使用 Grunt 的人，我们推荐使用 [`grunt-webpack`](https://www.npmjs.com/package/grunt-webpack) 包(package)。使用 `grunt-webpack` 你可以将 webpack 或 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 作为一项任务(task)执行，访问[模板标签(template tags)](https://gruntjs.com/api/grunt.template)中的统计信息，拆分开发和生产配置等等。如果你还没有安装过 `grunt-webpack` 和 `webpack`，请先安装它们：

```bash
npm install --save-dev grunt-webpack webpack
```

然后注册一个配置并加载任务：

**Gruntfile.js**

```js
const webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {
  grunt.initConfig({
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: true }, webpackConfig)
    }
  });

  grunt.loadNpmTasks('grunt-webpack');
};
```

获取更多信息，请查看[本仓库](https://github.com/webpack-contrib/grunt-webpack)。

### Gulp

在 [`webpack-stream`](https://github.com/shama/webpack-stream) 包(package)（也称作 `gulp-webpack`） 的帮助下，也可以很简单方便的将 Gulp 与 webpack 集成。在这种情况下，不需要单独安装 `webpack` ，因为它是 `webpack-stream` 直接依赖：

```bash
npm install --save-dev webpack-stream
```

只需要把 `webpack` 替换为 `require('webpack-stream')`，并传递一个配置文件就可以了：

**gulpfile.js**

```js
var gulp = require('gulp');
var webpack = require('webpack-stream');
gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      // 一些配置选项……
    }))
    .pipe(gulp.dest('dist/'));
});
```