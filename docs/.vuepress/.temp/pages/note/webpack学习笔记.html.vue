<template><h1 id="webpack学习笔记" tabindex="-1"><a class="header-anchor" href="#webpack学习笔记" aria-hidden="true">#</a> webpack学习笔记</h1>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<p>安装最新版本或特定版本。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev webpack
<span class="token function">npm</span> <span class="token function">install</span> --save-dev webpack@<span class="token operator">&lt;</span>version<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>如果你使用 webpack 4+ 版本，你还需要安装 CLI。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev webpack-cli
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>对于大多数项目，我们建议本地安装。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"start"</span><span class="token operator">:</span> <span class="token string">"webpack --config webpack.config.js"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="起步" tabindex="-1"><a class="header-anchor" href="#起步" aria-hidden="true">#</a> 起步</h2>
<p>webpack 用于编译 JavaScript 模块。</p>
<h3 id="基本安装" tabindex="-1"><a class="header-anchor" href="#基本安装" aria-hidden="true">#</a> 基本安装</h3>
<p>首先我们创建一个目录，初始化 npm，然后 在本地安装 webpack，接着安装 webpack-cli（此工具用于在命令行中运行 webpack）：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> webpack-demo <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> webpack-demo
<span class="token function">npm</span> init -y
<span class="token function">npm</span> <span class="token function">install</span> webpack webpack-cli --save-dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>通过script引用js的方式，去管理 JavaScript 项目会有一些问题：</p>
<ul>
<li>无法立即体现，脚本的执行依赖于外部扩展库(external library)。</li>
<li>如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。</li>
<li>如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码。</li>
</ul>
<blockquote>
<p><em>在安装一个要打包到生产环境的安装包时，你应该使用</em> <code>npm install --save</code><em>，如果你在安装一个用于开发环境的安装包（例如，linter, 测试库等），你应该使用</em> <code>npm install --save-dev</code><em>。</em></p>
</blockquote>
<h3 id="npm脚本" tabindex="-1"><a class="header-anchor" href="#npm脚本" aria-hidden="true">#</a> npm脚本</h3>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"webpack"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="管理资源" tabindex="-1"><a class="header-anchor" href="#管理资源" aria-hidden="true">#</a> 管理资源</h2>
<p>webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader <em>引入任何其他类型的文件</em>。也就是说，以上列出的那些 JavaScript 的优点（例如显式依赖），同样可以用来构建网站或 web 应用程序中的所有非 JavaScript 内容。</p>
<h3 id="加载css" tabindex="-1"><a class="header-anchor" href="#加载css" aria-hidden="true">#</a> 加载CSS</h3>
<p><strong>安装loader</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev style-loader css-loader
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>webpack.config.js</strong></p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const path = require('path');
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> module.exports = {
</span><span class="token prefix unchanged"> </span><span class="token line">   entry: './src/index.js',
</span><span class="token prefix unchanged"> </span><span class="token line">   output: {
</span><span class="token prefix unchanged"> </span><span class="token line">     filename: 'bundle.js',
</span><span class="token prefix unchanged"> </span><span class="token line">     path: path.resolve(__dirname, 'dist')
</span><span class="token prefix unchanged"> </span><span class="token line">   },
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   module: {
</span><span class="token prefix inserted">+</span><span class="token line">     rules: [
</span><span class="token prefix inserted">+</span><span class="token line">       {
</span><span class="token prefix inserted">+</span><span class="token line">         test: /\.css$/,
</span><span class="token prefix inserted">+</span><span class="token line">         use: [
</span><span class="token prefix inserted">+</span><span class="token line">           'style-loader',
</span><span class="token prefix inserted">+</span><span class="token line">           'css-loader'
</span><span class="token prefix inserted">+</span><span class="token line">         ]
</span><span class="token prefix inserted">+</span><span class="token line">       }
</span><span class="token prefix inserted">+</span><span class="token line">     ]
</span><span class="token prefix inserted">+</span><span class="token line">   }
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> };
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><blockquote>
<p><em>webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，以</em> <code>.css</code> <em>结尾的全部文件，都将被提供给</em> <code>style-loader</code> <em>和</em> <code>css-loader</code><em>。</em></p>
</blockquote>
<p>这使你可以在依赖于此样式的文件中 <code>import './style.css'</code>。现在，当该模块运行时，含有 CSS 字符串的 <code>&lt;style&gt;</code> 标签，将被插入到 html 文件的 <code>&lt;head&gt;</code> 中。</p>
<h3 id="加载图片" tabindex="-1"><a class="header-anchor" href="#加载图片" aria-hidden="true">#</a> 加载图片</h3>
<p>安装loader</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev file-loader
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const path = require('path');
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> module.exports = {
</span><span class="token prefix unchanged"> </span><span class="token line">   entry: './src/index.js',
</span><span class="token prefix unchanged"> </span><span class="token line">   output: {
</span><span class="token prefix unchanged"> </span><span class="token line">     filename: 'bundle.js',
</span><span class="token prefix unchanged"> </span><span class="token line">     path: path.resolve(__dirname, 'dist')
</span><span class="token prefix unchanged"> </span><span class="token line">   },
</span><span class="token prefix unchanged"> </span><span class="token line">   module: {
</span><span class="token prefix unchanged"> </span><span class="token line">     rules: [
</span><span class="token prefix unchanged"> </span><span class="token line">       {
</span><span class="token prefix unchanged"> </span><span class="token line">         test: /\.css$/,
</span><span class="token prefix unchanged"> </span><span class="token line">         use: [
</span><span class="token prefix unchanged"> </span><span class="token line">           'style-loader',
</span><span class="token prefix unchanged"> </span><span class="token line">           'css-loader'
</span><span class="token prefix unchanged"> </span><span class="token line">         ]
</span><span class="token prefix unchanged"> </span><span class="token line">       },
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       {
</span><span class="token prefix inserted">+</span><span class="token line">         test: /\.(png|svg|jpg|gif)$/,
</span><span class="token prefix inserted">+</span><span class="token line">         use: [
</span><span class="token prefix inserted">+</span><span class="token line">           'file-loader'
</span><span class="token prefix inserted">+</span><span class="token line">         ]
</span><span class="token prefix inserted">+</span><span class="token line">       }
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">     ]
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> };
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><blockquote>
<p><em>合乎逻辑下一步是，压缩和优化你的图像。查看</em> <a href="https://github.com/tcoopman/image-webpack-loader" target="_blank" rel="noopener noreferrer">image-webpack-loader<OutboundLink/></a> <em>和</em> <a href="https://www.webpackjs.com/loaders/url-loader" target="_blank" rel="noopener noreferrer">url-loader<OutboundLink/></a><em>，以了解更多关于如果增强加载处理图片功能。</em></p>
</blockquote>
<h3 id="加载字体" tabindex="-1"><a class="header-anchor" href="#加载字体" aria-hidden="true">#</a> 加载字体</h3>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       {
</span><span class="token prefix inserted">+</span><span class="token line">         test: /\.(woff|woff2|eot|ttf|otf)$/,
</span><span class="token prefix inserted">+</span><span class="token line">         use: [
</span><span class="token prefix inserted">+</span><span class="token line">           'file-loader'
</span><span class="token prefix inserted">+</span><span class="token line">         ]
</span><span class="token prefix inserted">+</span><span class="token line">       }
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> @font-face {
</span><span class="token prefix inserted">+</span><span class="token line">   font-family: 'MyFont';
</span><span class="token prefix inserted">+</span><span class="token line">   src:  url('./my-font.woff2') format('woff2'),
</span><span class="token prefix inserted">+</span><span class="token line">         url('./my-font.woff') format('woff');
</span><span class="token prefix inserted">+</span><span class="token line">   font-weight: 600;
</span><span class="token prefix inserted">+</span><span class="token line">   font-style: normal;
</span><span class="token prefix inserted">+</span><span class="token line"> }
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> .hello {
</span><span class="token prefix unchanged"> </span><span class="token line">   color: red;
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   font-family: 'MyFont';
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   background: url('./icon.png');
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="加载数据" tabindex="-1"><a class="header-anchor" href="#加载数据" aria-hidden="true">#</a> 加载数据</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev csv-loader xml-loader
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       {
</span><span class="token prefix inserted">+</span><span class="token line">         test: /\.(csv|tsv)$/,
</span><span class="token prefix inserted">+</span><span class="token line">         use: [
</span><span class="token prefix inserted">+</span><span class="token line">           'csv-loader'
</span><span class="token prefix inserted">+</span><span class="token line">         ]
</span><span class="token prefix inserted">+</span><span class="token line">       },
</span><span class="token prefix inserted">+</span><span class="token line">       {
</span><span class="token prefix inserted">+</span><span class="token line">         test: /\.xml$/,
</span><span class="token prefix inserted">+</span><span class="token line">         use: [
</span><span class="token prefix inserted">+</span><span class="token line">           'xml-loader'
</span><span class="token prefix inserted">+</span><span class="token line">         ]
</span><span class="token prefix inserted">+</span><span class="token line">       }
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="全局资源" tabindex="-1"><a class="header-anchor" href="#全局资源" aria-hidden="true">#</a> 全局资源</h3>
<p>上述所有内容中最出色之处是，以这种方式加载资源，你可以以<strong>更直观的方式将模块和资源组合在一起</strong>。无需依赖于含有全部资源的 <code>/assets</code> 目录，而是将资源与代码组合在一起。例如，类似这样的结构会非常有用：</p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> |- /assets
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> |– /components
</span><span class="token prefix inserted">+</span><span class="token line"> |  |– /my-component
</span><span class="token prefix inserted">+</span><span class="token line"> |  |  |– index.jsx
</span><span class="token prefix inserted">+</span><span class="token line"> |  |  |– index.css
</span><span class="token prefix inserted">+</span><span class="token line"> |  |  |– icon.svg
</span><span class="token prefix inserted">+</span><span class="token line"> |  |  |– img.png
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>这种配置方式会使你的代码更<strong>具备可移植性</strong>，因为现有的统一放置的方式会造成所有资源紧密耦合在一起。假如你想在另一个项目中使用 <code>/my-component</code>，只需将其复制或移动到 <code>/components</code> 目录下。只要你已经安装了任何<em>扩展依赖(external dependencies)</em>，并且你<em>已经在配置中定义过相同的 loader</em>，那么项目应该能够良好运行。</p>
<h2 id="管理输出" tabindex="-1"><a class="header-anchor" href="#管理输出" aria-hidden="true">#</a> 管理输出</h2>
<h3 id="html-webpack-plugin" tabindex="-1"><a class="header-anchor" href="#html-webpack-plugin" aria-hidden="true">#</a> html-webpack-plugin</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev html-webpack-plugin
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const path = require('path');
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> const HtmlWebpackPlugin = require('html-webpack-plugin');
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> module.exports = {
</span><span class="token prefix unchanged"> </span><span class="token line">   entry: {
</span><span class="token prefix unchanged"> </span><span class="token line">     app: './src/index.js',
</span><span class="token prefix unchanged"> </span><span class="token line">     print: './src/print.js'
</span><span class="token prefix unchanged"> </span><span class="token line">   },
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   plugins: [
</span><span class="token prefix inserted">+</span><span class="token line">     new HtmlWebpackPlugin({
</span><span class="token prefix inserted">+</span><span class="token line">       title: 'Output Management'
</span><span class="token prefix inserted">+</span><span class="token line">     })
</span><span class="token prefix inserted">+</span><span class="token line">   ],
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   output: {
</span><span class="token prefix unchanged"> </span><span class="token line">     filename: '[name].bundle.js',
</span><span class="token prefix unchanged"> </span><span class="token line">     path: path.resolve(__dirname, 'dist')
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> };
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p><code>HtmlWebpackPlugin</code> 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中。</p>
<p>如果你想要了解更多 <code>HtmlWebpackPlugin</code> 插件提供的全部功能和选项，那么你就应该多多熟悉 <a href="https://github.com/jantimon/html-webpack-plugin" target="_blank" rel="noopener noreferrer"><code>HtmlWebpackPlugin</code><OutboundLink/></a> 仓库。</p>
<p>你还可以看一下 <a href="https://github.com/jaketrent/html-webpack-template" target="_blank" rel="noopener noreferrer"><code>html-webpack-template</code><OutboundLink/></a>，除了默认模板之外，还提供了一些额外的功能。</p>
<h3 id="clean-webpack-plugin" tabindex="-1"><a class="header-anchor" href="#clean-webpack-plugin" aria-hidden="true">#</a> clean-webpack-plugin</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> clean-webpack-plugin --save-dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const path = require('path');
</span><span class="token prefix unchanged"> </span><span class="token line"> const HtmlWebpackPlugin = require('html-webpack-plugin');
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> const {CleanWebpackPlugin} = require('clean-webpack-plugin');
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> module.exports = {
</span><span class="token prefix unchanged"> </span><span class="token line">   entry: {
</span><span class="token prefix unchanged"> </span><span class="token line">     app: './src/index.js',
</span><span class="token prefix unchanged"> </span><span class="token line">     print: './src/print.js'
</span><span class="token prefix unchanged"> </span><span class="token line">   },
</span><span class="token prefix unchanged"> </span><span class="token line">   plugins: [
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">     new CleanWebpackPlugin(),
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">     new HtmlWebpackPlugin({
</span><span class="token prefix unchanged"> </span><span class="token line">       title: 'Output Management'
</span><span class="token prefix unchanged"> </span><span class="token line">     })
</span><span class="token prefix unchanged"> </span><span class="token line">   ],
</span><span class="token prefix unchanged"> </span><span class="token line">   output: {
</span><span class="token prefix unchanged"> </span><span class="token line">     filename: '[name].bundle.js',
</span><span class="token prefix unchanged"> </span><span class="token line">     path: path.resolve(__dirname, 'dist')
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> };
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>通常，clean-webpack-plugin会在每次构建前清理 <code>/dist</code> 文件夹。</p>
<h2 id="开发环境构建" tabindex="-1"><a class="header-anchor" href="#开发环境构建" aria-hidden="true">#</a> 开发环境构建</h2>
<h3 id="使用-source-map" tabindex="-1"><a class="header-anchor" href="#使用-source-map" aria-hidden="true">#</a> 使用 source map</h3>
<p>为了更容易地追踪错误和警告，JavaScript 提供了 <a href="http://blog.teamtreehouse.com/introduction-source-maps" target="_blank" rel="noopener noreferrer">source map<OutboundLink/></a> 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 <code>b.js</code>，source map 就会明确的告诉你。</p>
<p>source map 有很多<a href="https://www.webpackjs.com/configuration/devtool" target="_blank" rel="noopener noreferrer">不同的选项<OutboundLink/></a>可用，请务必仔细阅读它们，以便可以根据需要进行配置。</p>
<p>对于本指南，我们使用 <code>inline-source-map</code> 选项，这有助于解释说明我们的目的（仅解释说明，不要用于生产环境）：</p>
<p><strong>webpack.config.js</strong></p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const path = require('path');
</span><span class="token prefix unchanged"> </span><span class="token line"> const HtmlWebpackPlugin = require('html-webpack-plugin');
</span><span class="token prefix unchanged"> </span><span class="token line"> const CleanWebpackPlugin = require('clean-webpack-plugin');
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> module.exports = {
</span><span class="token prefix unchanged"> </span><span class="token line">   entry: {
</span><span class="token prefix unchanged"> </span><span class="token line">     app: './src/index.js',
</span><span class="token prefix unchanged"> </span><span class="token line">     print: './src/print.js'
</span><span class="token prefix unchanged"> </span><span class="token line">   },
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   devtool: 'inline-source-map',
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   plugins: [
</span><span class="token prefix unchanged"> </span><span class="token line">     new CleanWebpackPlugin(['dist']),
</span><span class="token prefix unchanged"> </span><span class="token line">     new HtmlWebpackPlugin({
</span><span class="token prefix unchanged"> </span><span class="token line">       title: 'Development'
</span><span class="token prefix unchanged"> </span><span class="token line">     })
</span><span class="token prefix unchanged"> </span><span class="token line">   ],
</span><span class="token prefix unchanged"> </span><span class="token line">   output: {
</span><span class="token prefix unchanged"> </span><span class="token line">     filename: '[name].bundle.js',
</span><span class="token prefix unchanged"> </span><span class="token line">     path: path.resolve(__dirname, 'dist')
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> };
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="选择一个开发工具" tabindex="-1"><a class="header-anchor" href="#选择一个开发工具" aria-hidden="true">#</a> 选择一个开发工具</h3>
<p>webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：</p>
<ol>
<li>webpack's Watch Mode</li>
<li>webpack-dev-server</li>
<li>webpack-dev-middleware</li>
</ol>
<p>多数场景中，你可能需要使用 <code>webpack-dev-server</code>，但是不妨探讨一下以上的所有选项。</p>
<h3 id="使用-webpack-dev-server" tabindex="-1"><a class="header-anchor" href="#使用-webpack-dev-server" aria-hidden="true">#</a> 使用 webpack-dev-server</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev webpack-dev-server
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const path = require('path');
</span><span class="token prefix unchanged"> </span><span class="token line"> const HtmlWebpackPlugin = require('html-webpack-plugin');
</span><span class="token prefix unchanged"> </span><span class="token line"> const CleanWebpackPlugin = require('clean-webpack-plugin');
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> module.exports = {
</span><span class="token prefix unchanged"> </span><span class="token line">   entry: {
</span><span class="token prefix unchanged"> </span><span class="token line">     app: './src/index.js',
</span><span class="token prefix unchanged"> </span><span class="token line">     print: './src/print.js'
</span><span class="token prefix unchanged"> </span><span class="token line">   },
</span><span class="token prefix unchanged"> </span><span class="token line">   devtool: 'inline-source-map',
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   devServer: {},
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   plugins: [
</span><span class="token prefix unchanged"> </span><span class="token line">     new CleanWebpackPlugin(['dist']),
</span><span class="token prefix unchanged"> </span><span class="token line">     new HtmlWebpackPlugin({
</span><span class="token prefix unchanged"> </span><span class="token line">       title: 'Development'
</span><span class="token prefix unchanged"> </span><span class="token line">     })
</span><span class="token prefix unchanged"> </span><span class="token line">   ],
</span><span class="token prefix unchanged"> </span><span class="token line">   output: {
</span><span class="token prefix unchanged"> </span><span class="token line">     filename: '[name].bundle.js',
</span><span class="token prefix unchanged"> </span><span class="token line">     path: path.resolve(__dirname, 'dist')
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> };
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code>"scripts": {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">     "test": "echo \"Error: no test specified\" &amp;&amp; exit 1",
</span><span class="token prefix unchanged"> </span><span class="token line">     "watch": "webpack --watch",
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">     "start": "webpack-dev-server --open",
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">     "build": "webpack"
</span><span class="token prefix unchanged"> </span><span class="token line">   },
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><code>webpack-dev-server</code> 带有许多可配置的选项。转到<a href="https://www.webpackjs.com/configuration/dev-server" target="_blank" rel="noopener noreferrer">相关文档<OutboundLink/></a>以了解更多。</p>
<h2 id="模块热更新" tabindex="-1"><a class="header-anchor" href="#模块热更新" aria-hidden="true">#</a> 模块热更新</h2>
<p>启用此功能实际上相当简单。而我们要做的，就是更新 <a href="https://github.com/webpack/webpack-dev-server" target="_blank" rel="noopener noreferrer">webpack-dev-server<OutboundLink/></a> 的配置，和使用 webpack 内置的 HMR 插件。</p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const path = require('path');
</span><span class="token prefix unchanged"> </span><span class="token line"> const HtmlWebpackPlugin = require('html-webpack-plugin');
</span><span class="token prefix unchanged"> </span><span class="token line"> const CleanWebpackPlugin = require('clean-webpack-plugin');
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> const webpack = require('webpack');
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> module.exports = {
</span><span class="token prefix unchanged"> </span><span class="token line">   entry: {
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">      app: './src/index.js',
</span><span class="token prefix deleted">-</span><span class="token line">      print: './src/print.js'
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">      app: './src/index.js'
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   },
</span><span class="token prefix unchanged"> </span><span class="token line">   devtool: 'inline-source-map',
</span><span class="token prefix unchanged"> </span><span class="token line">   devServer: {
</span><span class="token prefix unchanged"> </span><span class="token line">     contentBase: './dist',
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">     hot: true
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   },
</span><span class="token prefix unchanged"> </span><span class="token line">   plugins: [
</span><span class="token prefix unchanged"> </span><span class="token line">     new CleanWebpackPlugin(['dist']),
</span><span class="token prefix unchanged"> </span><span class="token line">     new HtmlWebpackPlugin({
</span><span class="token prefix unchanged"> </span><span class="token line">       title: 'Hot Module Replacement'
</span><span class="token prefix unchanged"> </span><span class="token line">     }),
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">     new webpack.NamedModulesPlugin(),
</span><span class="token prefix inserted">+</span><span class="token line">     new webpack.HotModuleReplacementPlugin()
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   ],
</span><span class="token prefix unchanged"> </span><span class="token line">   output: {
</span><span class="token prefix unchanged"> </span><span class="token line">     filename: '[name].bundle.js',
</span><span class="token prefix unchanged"> </span><span class="token line">     path: path.resolve(__dirname, 'dist')
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> };
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>注意，我们还添加了 <code>NamedModulesPlugin</code>，以便更容易查看要修补(patch)的依赖。</p>
<h2 id="tree-shaking" tabindex="-1"><a class="header-anchor" href="#tree-shaking" aria-hidden="true">#</a> tree shaking</h2>
<p>为了学会使用 <em>tree shaking</em>，你必须……</p>
<ul>
<li>
<p>使用 ES2015 模块语法（即 <code>import</code> 和 <code>export</code>）。</p>
</li>
<li>
<p>在项目 <code>package.json</code> 文件中，添加一个 &quot;sideEffects&quot; 入口。</p>
<ul>
<li>
<p>如同上面提到的，如果所有代码都不包含副作用，我们就可以简单地将该属性标记为 <code>false</code>，来告知 webpack，它可以安全地删除未用到的 export 导出。</p>
<blockquote>
<p>「副作用」的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。</p>
</blockquote>
<p>如果你的代码确实有一些副作用，那么可以改为提供一个数组</p>
<blockquote>
<p><em>注意，任何导入的文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似</em> <code>css-loader</code> <em>并导入 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除：</em></p>
</blockquote>
</li>
</ul>
</li>
<li>
<p>引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 <code>UglifyJSPlugin</code>）。</p>
</li>
</ul>
<h2 id="生产环境构建" tabindex="-1"><a class="header-anchor" href="#生产环境构建" aria-hidden="true">#</a> 生产环境构建</h2>
<h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3>
<p><em>开发环境(development)<em>和</em>生产环境(production)<em>的构建目标差异很大。在</em>开发环境</em>中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在<em>生产环境</em>中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写<strong>彼此独立的 webpack 配置</strong>。</p>
<p>虽然，以上我们将<em>生产环境</em>和<em>开发环境</em>做了略微区分，但是，请注意，我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。为了将这些配置合并在一起，我们将使用一个名为 <a href="https://github.com/survivejs/webpack-merge" target="_blank" rel="noopener noreferrer"><code>webpack-merge</code><OutboundLink/></a>nt-specific)的配置中重复代码。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev webpack-merge
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> webpack-demo
</span><span class="token prefix unchanged"> </span><span class="token line"> |- package.json
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> |- webpack.config.js
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> |- webpack.common.js
</span><span class="token prefix inserted">+</span><span class="token line"> |- webpack.dev.js
</span><span class="token prefix inserted">+</span><span class="token line"> |- webpack.prod.js
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> |- /dist
</span><span class="token prefix unchanged"> </span><span class="token line"> |- /src
</span><span class="token prefix unchanged"> </span><span class="token line">   |- index.js
</span><span class="token prefix unchanged"> </span><span class="token line">   |- math.js
</span><span class="token prefix unchanged"> </span><span class="token line"> |- /node_modules
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> {
</span><span class="token prefix unchanged"> </span><span class="token line">   "name": "development",
</span><span class="token prefix unchanged"> </span><span class="token line">   "version": "1.0.0",
</span><span class="token prefix unchanged"> </span><span class="token line">   "description": "",
</span><span class="token prefix unchanged"> </span><span class="token line">   "main": "webpack.config.js",
</span><span class="token prefix unchanged"> </span><span class="token line">   "scripts": {
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">     "start": "webpack-dev-server --open",
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">     "start": "webpack-dev-server --open --config webpack.dev.js",
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">     "build": "webpack"
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">     "build": "webpack --config webpack.prod.js"
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   },
</span><span class="token prefix unchanged"> </span><span class="token line">   "keywords": [],
</span><span class="token prefix unchanged"> </span><span class="token line">   "author": "",
</span><span class="token prefix unchanged"> </span><span class="token line">   "license": "ISC",
</span><span class="token prefix unchanged"> </span><span class="token line">   "devDependencies": {
</span><span class="token prefix unchanged"> </span><span class="token line">     "clean-webpack-plugin": "^0.1.17",
</span><span class="token prefix unchanged"> </span><span class="token line">     "css-loader": "^0.28.4",
</span><span class="token prefix unchanged"> </span><span class="token line">     "csv-loader": "^2.1.1",
</span><span class="token prefix unchanged"> </span><span class="token line">     "express": "^4.15.3",
</span><span class="token prefix unchanged"> </span><span class="token line">     "file-loader": "^0.11.2",
</span><span class="token prefix unchanged"> </span><span class="token line">     "html-webpack-plugin": "^2.29.0",
</span><span class="token prefix unchanged"> </span><span class="token line">     "style-loader": "^0.18.2",
</span><span class="token prefix unchanged"> </span><span class="token line">     "webpack": "^3.0.0",
</span><span class="token prefix unchanged"> </span><span class="token line">     "webpack-dev-middleware": "^1.12.0",
</span><span class="token prefix unchanged"> </span><span class="token line">     "webpack-dev-server": "^2.9.1",
</span><span class="token prefix unchanged"> </span><span class="token line">     "webpack-merge": "^4.1.0",
</span><span class="token prefix unchanged"> </span><span class="token line">     "xml-loader": "^1.2.1"
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h3 id="source-map" tabindex="-1"><a class="header-anchor" href="#source-map" aria-hidden="true">#</a> source map</h3>
<p>我们鼓励你在生产环境中启用 source map，因为它们对调试源码(debug)和运行基准测试(benchmark tests)很有帮助。虽然有如此强大的功能，然而还是应该针对生成环境用途，选择一个构建快速的推荐配置（具体细节请查看 <a href="https://www.webpackjs.com/configuration/devtool" target="_blank" rel="noopener noreferrer"><code>devtool</code><OutboundLink/></a>将在<em>生产环境</em>中使用 <code>source-map</code> 选项，而不是我们在<em>开发环境</em>中用到的 <code>inline-source-map</code>：</p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const merge = require('webpack-merge');
</span><span class="token prefix unchanged"> </span><span class="token line"> const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
</span><span class="token prefix unchanged"> </span><span class="token line"> const common = require('./webpack.common.js');
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> module.exports = merge(common, {
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   devtool: 'source-map',
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   plugins: [
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">     new UglifyJSPlugin()
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">     new UglifyJSPlugin({
</span><span class="token prefix inserted">+</span><span class="token line">       sourceMap: true
</span><span class="token prefix inserted">+</span><span class="token line">     })
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   ]
</span><span class="token prefix unchanged"> </span><span class="token line"> });
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><blockquote>
<p>避免在生产中使用 <code>inline-***</code> 和 <code>eval-***</code>，因为它们可以增加 bundle 大小，并降低整体性能。</p>
</blockquote>
<h3 id="指定环境" tabindex="-1"><a class="header-anchor" href="#指定环境" aria-hidden="true">#</a> 指定环境</h3>
<p>许多 library 将通过与 <code>process.env.NODE_ENV</code> 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于<em>生产环境</em>中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 <code>process.env.NODE_ENV === 'production'</code> 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。</p>
<h3 id="split-css" tabindex="-1"><a class="header-anchor" href="#split-css" aria-hidden="true">#</a> split css</h3>
<p>正如在<strong>管理资源</strong>中最后的 <a href="https://www.webpackjs.com/guides/asset-management#loading-css" target="_blank" rel="noopener noreferrer">加载 CSS<OutboundLink/></a> 小节中所提到的，通常最好的做法是使用 <code>ExtractTextPlugin</code> 将 CSS 分离成单独的文件。在插件<a href="https://www.webpackjs.com/plugins/extract-text-webpack-plugin" target="_blank" rel="noopener noreferrer">文档<OutboundLink/></a>中有一些很好的实现例子。<code>disable</code> 选项可以和 <code>--env</code> 标记结合使用，以允许在开发中进行内联加载，推荐用于热模块替换和构建速度。</p>
<h2 id="代码分离" tabindex="-1"><a class="header-anchor" href="#代码分离" aria-hidden="true">#</a> 代码分离</h2>
<p>代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。</p>
<p>有三种常用的代码分离方法：</p>
<ul>
<li>入口起点：使用 <a href="https://www.webpackjs.com/configuration/entry-context" target="_blank" rel="noopener noreferrer"><code>entry</code><OutboundLink/></a> 配置手动地分离代码。</li>
<li>防止重复：使用 <a href="https://www.webpackjs.com/plugins/commons-chunk-plugin" target="_blank" rel="noopener noreferrer"><code>CommonsChunkPlugin</code><OutboundLink/></a> 去重和分离 chunk。</li>
<li>动态导入：通过模块的内联函数调用来分离代码。</li>
</ul>
<h3 id="防止重复" tabindex="-1"><a class="header-anchor" href="#防止重复" aria-hidden="true">#</a> 防止重复</h3>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code>const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> entry: {
</span><span class="token prefix unchanged"> </span><span class="token line">   index: './src/index.js',
</span><span class="token prefix unchanged"> </span><span class="token line">   another: './src/another-module.js'
</span><span class="token prefix unchanged"> </span><span class="token line"> },
</span><span class="token prefix unchanged"> </span><span class="token line"> plugins: [
</span><span class="token prefix unchanged"> </span><span class="token line">   new HTMLWebpackPlugin({
</span><span class="token prefix unchanged"> </span><span class="token line">     title: 'Code Splitting'
</span><span class="token prefix unchanged"> </span><span class="token line">   }),
</span><span class="token prefix unchanged"> </span><span class="token line"> ],
</span><span class="token prefix unchanged"> </span><span class="token line"> output: {
</span><span class="token prefix unchanged"> </span><span class="token line">   filename: '[name].bundle.js',
</span><span class="token prefix unchanged"> </span><span class="token line">   path: path.resolve(__dirname, 'dist')
</span><span class="token prefix unchanged"> </span><span class="token line"> },
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> optimization:{
</span><span class="token prefix inserted">+</span><span class="token line">    runtimeChunk:{
</span><span class="token prefix inserted">+</span><span class="token line">      name:'common'
</span><span class="token prefix inserted">+</span><span class="token line">    }
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>};
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>以下是由社区提供的，一些对于代码分离很有帮助的插件和 loaders：</p>
<ul>
<li><a href="https://www.webpackjs.com/plugins/extract-text-webpack-plugin" target="_blank" rel="noopener noreferrer"><code>ExtractTextPlugin</code><OutboundLink/></a>: 用于将 CSS 从主应用程序中分离。</li>
<li><a href="https://www.webpackjs.com/loaders/bundle-loader" target="_blank" rel="noopener noreferrer"><code>bundle-loader</code><OutboundLink/></a>: 用于分离代码和延迟加载生成的 bundle。</li>
<li><a href="https://github.com/gaearon/promise-loader" target="_blank" rel="noopener noreferrer"><code>promise-loader</code><OutboundLink/></a>: 类似于 <code>bundle-loader</code> ，但是使用的是 promises。</li>
</ul>
<p><a href="https://www.webpackjs.com/plugins/commons-chunk-plugin" target="_blank" rel="noopener noreferrer"><code>CommonsChunkPlugin</code><OutboundLink/></a> 插件还可以通过使用<a href="https://www.webpackjs.com/plugins/commons-chunk-plugin/#explicit-vendor-chunk" target="_blank" rel="noopener noreferrer">显式的 vendor chunks<OutboundLink/></a> 功能，从应用程序代码中分离 vendor 模块。</p>
<h3 id="bundle-分析-bundle-analysis" tabindex="-1"><a class="header-anchor" href="#bundle-分析-bundle-analysis" aria-hidden="true">#</a> bundle 分析(bundle analysis)</h3>
<p>如果我们以分离代码作为开始，那么就以检查模块作为结束，分析输出结果是很有用处的。<a href="https://github.com/webpack/analyse" target="_blank" rel="noopener noreferrer">官方分析工具<OutboundLink/></a> 是一个好的初始选择。下面是一些社区支持(community-supported)的可选工具：</p>
<ul>
<li><a href="https://alexkuz.github.io/webpack-chart/" target="_blank" rel="noopener noreferrer">webpack-chart<OutboundLink/></a>: webpack 数据交互饼图。</li>
<li><a href="https://chrisbateman.github.io/webpack-visualizer/" target="_blank" rel="noopener noreferrer">webpack-visualizer<OutboundLink/></a>: 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。</li>
<li><a href="https://github.com/webpack-contrib/webpack-bundle-analyzer" target="_blank" rel="noopener noreferrer">webpack-bundle-analyzer<OutboundLink/></a>: 一款分析 bundle 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户。</li>
</ul>
<h2 id="懒加载" tabindex="-1"><a class="header-anchor" href="#懒加载" aria-hidden="true">#</a> 懒加载</h2>
<p>懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。</p>
<p><strong>适用场景为含用户交互的场景，若不需要用户的交互——每次加载页面的时候会请求它，这样做并没有什么好处。</strong></p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> import _ from 'lodash';
</span><span class="token prefix inserted">+</span><span class="token line">
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> async function getComponent() {
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> function component() {
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   var element = document.createElement('div');
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   var button = document.createElement('button');
</span><span class="token prefix inserted">+</span><span class="token line">   var br = document.createElement('br');
</span></span>
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   button.innerHTML = 'Click me and look at the console!';
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   element.appendChild(br);
</span><span class="token prefix inserted">+</span><span class="token line">   element.appendChild(button);
</span><span class="token prefix inserted">+</span><span class="token line">
</span><span class="token prefix inserted">+</span><span class="token line">   // Note that because a network request is involved, some indication
</span><span class="token prefix inserted">+</span><span class="token line">   // of loading would need to be shown in a production-level site/app.
</span><span class="token prefix inserted">+</span><span class="token line">   button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
</span><span class="token prefix inserted">+</span><span class="token line">     var print = module.default;
</span><span class="token prefix inserted">+</span><span class="token line">
</span><span class="token prefix inserted">+</span><span class="token line">     print();
</span><span class="token prefix inserted">+</span><span class="token line">   });
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   return element;
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>
<span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> getComponent().then(component => {
</span><span class="token prefix deleted">-</span><span class="token line">   document.body.appendChild(component);
</span><span class="token prefix deleted">-</span><span class="token line"> });
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> document.body.appendChild(component());
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="解决缓存问题" tabindex="-1"><a class="header-anchor" href="#解决缓存问题" aria-hidden="true">#</a> 解决缓存问题</h2>
<p>我们使用 webpack 来打包我们的模块化后的应用程序，webpack 会生成一个可部署的 <code>/dist</code> 目录，然后把打包后的内容放置在此目录中。只要 <code>/dist</code> 目录中的内容部署到服务器上，客户端（通常是浏览器）就能够访问网站此服务器的网站及其资源。而最后一步获取资源是比较耗费时间的，这就是为什么浏览器使用一种名为 <a href="https://searchstorage.techtarget.com/definition/cache" target="_blank" rel="noopener noreferrer">缓存<OutboundLink/></a> 的技术。可以通过命中缓存，以降低网络流量，使网站加载速度更快，然而，<strong>如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。由于缓存的存在，当你需要获取新的代码时，就会显得很棘手。</strong></p>
<h3 id="输出文件的文件名" tabindex="-1"><a class="header-anchor" href="#输出文件的文件名" aria-hidden="true">#</a> 输出文件的文件名</h3>
<p>将第三方库(library)（例如 <code>lodash</code> 或 <code>react</code>）提取到单独的 <code>vendor</code> chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。因此通过实现以上步骤，利用客户端的长效缓存机制，可以通过命中缓存来消除请求，并减少向服务器获取资源，同时还能保证客户端代码和服务器端代码版本一致。这可以通过使用新的 <code>entry(入口)</code> 起点，以及再额外配置一个 <code>CommonsChunkPlugin</code> 实例的组合方式来实现：</p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> var path = require('path');
</span><span class="token prefix unchanged"> </span><span class="token line"> const webpack = require('webpack');
</span><span class="token prefix unchanged"> </span><span class="token line"> const CleanWebpackPlugin = require('clean-webpack-plugin');
</span><span class="token prefix unchanged"> </span><span class="token line"> const HtmlWebpackPlugin = require('html-webpack-plugin');
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> module.exports = {
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">   entry: './src/index.js',
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   entry: {
</span><span class="token prefix inserted">+</span><span class="token line">     main: './src/index.js',
</span><span class="token prefix inserted">+</span><span class="token line">     vendor: [
</span><span class="token prefix inserted">+</span><span class="token line">       'lodash'
</span><span class="token prefix inserted">+</span><span class="token line">     ]
</span><span class="token prefix inserted">+</span><span class="token line">   },
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   plugins: [
</span><span class="token prefix unchanged"> </span><span class="token line">     new CleanWebpackPlugin(['dist']),
</span><span class="token prefix unchanged"> </span><span class="token line">     new HtmlWebpackPlugin({
</span><span class="token prefix unchanged"> </span><span class="token line">       title: 'Caching'
</span><span class="token prefix unchanged"> </span><span class="token line">     }),
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">     new webpack.optimize.CommonsChunkPlugin({
</span><span class="token prefix inserted">+</span><span class="token line">       name: 'vendor'
</span><span class="token prefix inserted">+</span><span class="token line">     }),
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">     new webpack.optimize.CommonsChunkPlugin({
</span><span class="token prefix unchanged"> </span><span class="token line">       name: 'manifest'
</span><span class="token prefix unchanged"> </span><span class="token line">     })
</span><span class="token prefix unchanged"> </span><span class="token line">   ],
</span><span class="token prefix unchanged"> </span><span class="token line">   output: {
</span><span class="token prefix unchanged"> </span><span class="token line">     filename: '[name].[chunkhash].js',
</span><span class="token prefix unchanged"> </span><span class="token line">     path: path.resolve(__dirname, 'dist')
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> };
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h3 id="模板标识符" tabindex="-1"><a class="header-anchor" href="#模板标识符" aria-hidden="true">#</a> 模板标识符</h3>
<p>选择是使用 <a href="https://www.webpackjs.com/plugins/hashed-module-ids-plugin" target="_blank" rel="noopener noreferrer"><code>HashedModuleIdsPlugin</code><OutboundLink/></a></p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const path = require('path');
</span><span class="token prefix unchanged"> </span><span class="token line"> const webpack = require('webpack');
</span><span class="token prefix unchanged"> </span><span class="token line"> const CleanWebpackPlugin = require('clean-webpack-plugin');
</span><span class="token prefix unchanged"> </span><span class="token line"> const HtmlWebpackPlugin = require('html-webpack-plugin');
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> module.exports = {
</span><span class="token prefix unchanged"> </span><span class="token line">   entry: {
</span><span class="token prefix unchanged"> </span><span class="token line">     main: './src/index.js',
</span><span class="token prefix unchanged"> </span><span class="token line">     vendor: [
</span><span class="token prefix unchanged"> </span><span class="token line">       'lodash'
</span><span class="token prefix unchanged"> </span><span class="token line">     ]
</span><span class="token prefix unchanged"> </span><span class="token line">   },
</span><span class="token prefix unchanged"> </span><span class="token line">   plugins: [
</span><span class="token prefix unchanged"> </span><span class="token line">     new CleanWebpackPlugin(['dist']),
</span><span class="token prefix unchanged"> </span><span class="token line">     new HtmlWebpackPlugin({
</span><span class="token prefix unchanged"> </span><span class="token line">       title: 'Caching'
</span><span class="token prefix unchanged"> </span><span class="token line">     }),
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">     new webpack.HashedModuleIdsPlugin(),
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">     new webpack.optimize.CommonsChunkPlugin({
</span><span class="token prefix unchanged"> </span><span class="token line">       name: 'vendor'
</span><span class="token prefix unchanged"> </span><span class="token line">     }),
</span><span class="token prefix unchanged"> </span><span class="token line">     new webpack.optimize.CommonsChunkPlugin({
</span><span class="token prefix unchanged"> </span><span class="token line">       name: 'manifest'
</span><span class="token prefix unchanged"> </span><span class="token line">     })
</span><span class="token prefix unchanged"> </span><span class="token line">   ],
</span><span class="token prefix unchanged"> </span><span class="token line">   output: {
</span><span class="token prefix unchanged"> </span><span class="token line">     filename: '[name].[chunkhash].js',
</span><span class="token prefix unchanged"> </span><span class="token line">     path: path.resolve(__dirname, 'dist')
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> };
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h2 id="shimming" tabindex="-1"><a class="header-anchor" href="#shimming" aria-hidden="true">#</a> shimming</h2>
<p><code>webpack</code> 编译器(compiler)能够识别遵循 ES2015 模块语法、CommonJS 或 AMD 规范编写的模块。然而，一些第三方的库(library)可能会引用一些全局依赖（例如 <code>jQuery</code> 中的 <code>$</code>）。这些库也可能创建一些需要被导出的全局变量。这些“不符合规范的模块”就是 <em>shimming</em> 发挥作用的地方。</p>
<blockquote>
<p>**我们不推荐使用全局的东西！**在 webpack 背后的整个概念是让前端开发更加模块化。也就是说，需要编写具有良好的封闭性(well contained)、彼此隔离的模块，以及不要依赖于那些隐含的依赖模块（例如，全局变量）。请只在必要的时候才使用本文所述的这些特性。</p>
</blockquote>
<h2 id="渐进式网络应用程序" tabindex="-1"><a class="header-anchor" href="#渐进式网络应用程序" aria-hidden="true">#</a> 渐进式网络应用程序</h2>
<p>渐进式网络应用程序(Progressive Web Application - PWA)，是一种可以提供类似于原生应用程序(native app)体验的网络应用程序(web app)。PWA 可以用来做很多事。其中最重要的是，在**离线(offline)**时应用程序能够继续运行功能。这是通过使用名为 <a href="https://developers.google.com/web/fundamentals/primers/service-workers/" target="_blank" rel="noopener noreferrer">Service Workers<OutboundLink/></a> 的网络技术来实现的。</p>
<p>本章将重点介绍，如何为我们的应用程序添加离线体验。我们将使用名为 <a href="https://github.com/GoogleChrome/workbox" target="_blank" rel="noopener noreferrer">Workbox<OutboundLink/></a> 的 Google 项目来实现此目的，该项目提供的工具可帮助我们更轻松地配置 web app 的离线支持。</p>
<h2 id="typescript" tabindex="-1"><a class="header-anchor" href="#typescript" aria-hidden="true">#</a> Typescript</h2>
<p><a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript<OutboundLink/></a> 是 JavaScript 的超集，为其增加了类型系统，可以编译为普通的 JavaScript 代码。这篇指南里我们将会学习 webpack 是如何跟 TypeScript 进行集成。</p>
<h3 id="基础安装" tabindex="-1"><a class="header-anchor" href="#基础安装" aria-hidden="true">#</a> 基础安装</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev typescript ts-loader
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>project</strong></p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> webpack-demo
</span><span class="token prefix unchanged"> </span><span class="token line"> |- package.json
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> |- tsconfig.json
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> |- webpack.config.js
</span><span class="token prefix unchanged"> </span><span class="token line"> |- /dist
</span><span class="token prefix unchanged"> </span><span class="token line">   |- bundle.js
</span><span class="token prefix unchanged"> </span><span class="token line">   |- index.html
</span><span class="token prefix unchanged"> </span><span class="token line"> |- /src
</span><span class="token prefix unchanged"> </span><span class="token line">   |- index.js
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   |- index.ts
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> |- /node_modules
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>tsconfig.json</strong></p>
<p>这里我们设置一个基本的配置，来支持 JSX，并将 TypeScript 编译到 ES5……</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"compilerOptions"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"outDir"</span><span class="token operator">:</span> <span class="token string">"./dist/"</span><span class="token punctuation">,</span>
    <span class="token property">"noImplicitAny"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">"module"</span><span class="token operator">:</span> <span class="token string">"es6"</span><span class="token punctuation">,</span>
    <span class="token property">"target"</span><span class="token operator">:</span> <span class="token string">"es5"</span><span class="token punctuation">,</span>
    <span class="token property">"jsx"</span><span class="token operator">:</span> <span class="token string">"react"</span><span class="token punctuation">,</span>
    <span class="token property">"allowJs"</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>webpack.config.js</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  entry<span class="token operator">:</span> <span class="token string">'./src/index.ts'</span><span class="token punctuation">,</span>
  module<span class="token operator">:</span> <span class="token punctuation">{</span>
    rules<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.tsx?$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        use<span class="token operator">:</span> <span class="token string">'ts-loader'</span><span class="token punctuation">,</span>
        exclude<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  resolve<span class="token operator">:</span> <span class="token punctuation">{</span>
    extensions<span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">'.tsx'</span><span class="token punctuation">,</span> <span class="token string">'.ts'</span><span class="token punctuation">,</span> <span class="token string">'.js'</span> <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  output<span class="token operator">:</span> <span class="token punctuation">{</span>
    filename<span class="token operator">:</span> <span class="token string">'bundle.js'</span><span class="token punctuation">,</span>
    path<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'dist'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="loader" tabindex="-1"><a class="header-anchor" href="#loader" aria-hidden="true">#</a> Loader</h3>
<p><a href="https://github.com/TypeStrong/ts-loader" target="_blank" rel="noopener noreferrer"><code>ts-loader</code><OutboundLink/></a></p>
<p>在本指南中，我们使用 <code>ts-loader</code>，因为它能够很方便地启用额外的 webpack 功能，例如将其他 web 资源导入到项目中。</p>
<h3 id="source-map-1" tabindex="-1"><a class="header-anchor" href="#source-map-1" aria-hidden="true">#</a> source map</h3>
<p>要启用 source map，我们必须配置 TypeScript，以将内联的 source map 输出到编译过的 JavaScript 文件。必须在 TypeScript 配置中添加下面这行：</p>
<p><strong>tsconfig.json</strong></p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> {
</span><span class="token prefix unchanged"> </span><span class="token line">   "compilerOptions": {
</span><span class="token prefix unchanged"> </span><span class="token line">     "outDir": "./dist/",
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">     "sourceMap": true,
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">     "noImplicitAny": true,
</span><span class="token prefix unchanged"> </span><span class="token line">     "module": "commonjs",
</span><span class="token prefix unchanged"> </span><span class="token line">     "target": "es5",
</span><span class="token prefix unchanged"> </span><span class="token line">     "jsx": "react",
</span><span class="token prefix unchanged"> </span><span class="token line">     "allowJs": true
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>webpack.config.js</strong></p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const path = require('path');
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> module.exports = {
</span><span class="token prefix unchanged"> </span><span class="token line">   entry: './src/index.ts',
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   devtool: 'inline-source-map',
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   module: {
</span><span class="token prefix unchanged"> </span><span class="token line">     rules: [
</span><span class="token prefix unchanged"> </span><span class="token line">       {
</span><span class="token prefix unchanged"> </span><span class="token line">         test: /\.tsx?$/,
</span><span class="token prefix unchanged"> </span><span class="token line">         use: 'ts-loader',
</span><span class="token prefix unchanged"> </span><span class="token line">         exclude: /node_modules/
</span><span class="token prefix unchanged"> </span><span class="token line">       }
</span><span class="token prefix unchanged"> </span><span class="token line">     ]
</span><span class="token prefix unchanged"> </span><span class="token line">   },
</span><span class="token prefix unchanged"> </span><span class="token line">   resolve: {
</span><span class="token prefix unchanged"> </span><span class="token line">     extensions: [ '.tsx', '.ts', '.js' ]
</span><span class="token prefix unchanged"> </span><span class="token line">   },
</span><span class="token prefix unchanged"> </span><span class="token line">   output: {
</span><span class="token prefix unchanged"> </span><span class="token line">     filename: 'bundle.js',
</span><span class="token prefix unchanged"> </span><span class="token line">     path: path.resolve(__dirname, 'dist')
</span><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> };
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="使用第三方库" tabindex="-1"><a class="header-anchor" href="#使用第三方库" aria-hidden="true">#</a> 使用第三方库</h3>
<p>当从 npm 安装第三方库时，一定要牢记同时安装这个库的类型声明文件。你可以从 <a href="http://microsoft.github.io/TypeSearch/" target="_blank" rel="noopener noreferrer">TypeSearch<OutboundLink/></a> 中找到并安装这些第三方库的类型声明文件。</p>
<h3 id="导入其他资源" tabindex="-1"><a class="header-anchor" href="#导入其他资源" aria-hidden="true">#</a> 导入其他资源</h3>
<p>要在 TypeScript 里使用非代码资源，我们需要告诉 TypeScript 如何兼容这些导入类型。那么首先，我们需要在项目里创建 <code>custom.d.ts</code> 文件，这个文件用来编写自定义的类型声明。让我们将 <code>.svg</code> 文件进行声明设置：</p>
<p><strong>custom.d.ts</strong></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">"*.svg"</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> content<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
  <span class="token keyword">export</span> <span class="token keyword">default</span> content<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这里，我们通过指定任何以 <code>.svg</code> 结尾的导入，并将模块的 <code>content</code> 定义为 <code>any</code>，将 SVG 声明一个新的模块。我们可以通过将类型定义为字符串，来更加显式地将它声明为一个 url。同样的理念适用于其他资源，包括 CSS, SCSS, JSON 等。</p>
<h2 id="使用环境变量" tabindex="-1"><a class="header-anchor" href="#使用环境变量" aria-hidden="true">#</a> 使用环境变量</h2>
<p>webpack 命令行<a href="https://www.webpackjs.com/api/cli/#environment-options" target="_blank" rel="noopener noreferrer">环境配置<OutboundLink/></a>中，通过设置 <code>--env</code> 可以使你根据需要，传入尽可能多的环境变量。在 <code>webpack.config.js</code> 文件中可以访问到这些环境变量。例如，<code>--env.production</code> 或 <code>--env.NODE_ENV=local</code>。</p>
<h2 id="构建性能" tabindex="-1"><a class="header-anchor" href="#构建性能" aria-hidden="true">#</a> 构建性能</h2>
<h2 id="常规" tabindex="-1"><a class="header-anchor" href="#常规" aria-hidden="true">#</a> 常规</h2>
<p>无论你正在 <a href="https://www.webpackjs.com/guides/development" target="_blank" rel="noopener noreferrer">development<OutboundLink/></a> 或构建 <a href="https://www.webpackjs.com/guides/production" target="_blank" rel="noopener noreferrer">production<OutboundLink/></a>，以下做法应该帮助到你达到最佳。</p>
<h4 id="保持版本最新" tabindex="-1"><a class="header-anchor" href="#保持版本最新" aria-hidden="true">#</a> 保持版本最新</h4>
<h4 id="loaders" tabindex="-1"><a class="header-anchor" href="#loaders" aria-hidden="true">#</a> Loaders</h4>
<p>将 loaders 应用于最少数的必要模块中。而不是:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
  loader<span class="token operator">:</span> <span class="token string">"babel-loader"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>使用 <code>include</code> 字段仅将 loader 模块应用在实际需要用其转换的位置中：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
  include<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"src"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  loader<span class="token operator">:</span> <span class="token string">"babel-loader"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="bootstrap" tabindex="-1"><a class="header-anchor" href="#bootstrap" aria-hidden="true">#</a> Bootstrap</h4>
<p>每个额外的 loader/plugin 都有启动时间。尽量少使用不同的工具。</p>
<h4 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h4>
<p>以下几步可以提供解析速度:</p>
<ul>
<li>尽量减少 <code>resolve.modules</code>, <code>resolve.extensions</code>, <code>resolve.mainFiles</code>, <code>resolve.descriptionFiles</code> 中类目的数量，因为他们会增加文件系统调用的次数。</li>
<li>如果你不使用 symlinks ，可以设置 <code>resolve.symlinks: false</code> (例如 <code>npm link</code> 或者 <code>yarn link</code>).</li>
<li>如果你使用自定义解析 plugins ，并且没有指定 context 信息，可以设置 <code>resolve.cacheWithContext: false</code> 。</li>
</ul>
<h4 id="dlls" tabindex="-1"><a class="header-anchor" href="#dlls" aria-hidden="true">#</a> Dlls</h4>
<p>使用 <code>DllPlugin</code> 将更改不频繁的代码进行单独编译。这将改善引用程序的编译速度，即使它增加了构建过程的复杂性。</p>
<h4 id="smaller-faster" tabindex="-1"><a class="header-anchor" href="#smaller-faster" aria-hidden="true">#</a> Smaller = Faster</h4>
<p>减少编译的整体大小，以提高构建性能。尽量保持 chunks 小巧。</p>
<ul>
<li>使用 更少/更小 的库。</li>
<li>在多页面应用程序中使用 <code>CommonsChunksPlugin</code>。</li>
<li>在多页面应用程序中以 <code>async</code> 模式使用 <code>CommonsChunksPlugin</code> 。</li>
<li>移除不使用的代码。</li>
<li>只编译你当前正在开发部分的代码。</li>
</ul>
<h4 id="worker-pool" tabindex="-1"><a class="header-anchor" href="#worker-pool" aria-hidden="true">#</a> Worker Pool</h4>
<p><code>thread-loader</code> 可以将非常消耗资源的 loaders 转存到 worker pool 中。</p>
<blockquote>
<p>不要使用太多的 workers ，因为 Node.js 的 runtime 和 loader 有一定的启动开销。最小化 workers 和主进程间的模块传输。进程间通讯(IPC)是非常消耗资源的。</p>
</blockquote>
<h4 id="持久化缓存" tabindex="-1"><a class="header-anchor" href="#持久化缓存" aria-hidden="true">#</a> 持久化缓存</h4>
<p>使用 <code>cache-loader</code> 启用持久化缓存。使用 <code>package.json</code> 中的 <code>&quot;postinstall&quot;</code> 清除缓存目录。</p>
<h4 id="自定义-plugins-loaders" tabindex="-1"><a class="header-anchor" href="#自定义-plugins-loaders" aria-hidden="true">#</a> 自定义 plugins/loaders</h4>
<p>这里不对它们配置的性能问题作过多赘述。</p>
<h2 id="development" tabindex="-1"><a class="header-anchor" href="#development" aria-hidden="true">#</a> Development</h2>
<p>下面步骤对于 <em>development</em> 特别有用。</p>
<h3 id="增量编译" tabindex="-1"><a class="header-anchor" href="#增量编译" aria-hidden="true">#</a> 增量编译</h3>
<p>使用 webpack 的监听模式。不要使用其他工具来监听你的文件和调用 webpack 。在监听模式下构建会记录时间戳并将信息传递给编译让缓存失效。</p>
<p>在某些设置中，监听会回退到轮询模式。有许多监听文件会导致 CPU 大量负载。在这些情况下，你可以使用 <code>watchOptions.poll</code> 来增加轮询的间隔。</p>
<h3 id="在内存中编译" tabindex="-1"><a class="header-anchor" href="#在内存中编译" aria-hidden="true">#</a> 在内存中编译</h3>
<p>以下几个实用工具通过在内存中进行代码的编译和资源的提供，但并不写入磁盘来提高性能:</p>
<ul>
<li><code>webpack-dev-server</code></li>
<li><code>webpack-hot-middleware</code></li>
<li><code>webpack-dev-middleware</code></li>
</ul>
<h3 id="devtool" tabindex="-1"><a class="header-anchor" href="#devtool" aria-hidden="true">#</a> Devtool</h3>
<p>需要注意的是不同的 <code>devtool</code> 的设置，会导致不同的性能差异。</p>
<ul>
<li><code>&quot;eval&quot;</code> 具有最好的性能，但并不能帮助你转译代码。</li>
<li>如果你能接受稍差一些的 mapping 质量，可以使用 <code>cheap-source-map</code> 选项来提高性能</li>
<li>使用 <code>eval-source-map</code> 配置进行增量编译。</li>
</ul>
<p>=&gt; 在大多数情况下，<code>cheap-module-eval-source-map</code> 是最好的选择。</p>
<h3 id="避免在生产环境下才会用到的工具" tabindex="-1"><a class="header-anchor" href="#避免在生产环境下才会用到的工具" aria-hidden="true">#</a> 避免在生产环境下才会用到的工具</h3>
<p>某些实用工具， plugins 和 loaders 都只能在构建生产环境时才有用。例如，在开发时使用 <code>UglifyJsPlugin</code> 来压缩和修改代码是没有意义的。以下这些工具在开发中通常被排除在外:</p>
<ul>
<li><code>UglifyJsPlugin</code></li>
<li><code>ExtractTextPlugin</code></li>
<li><code>[hash]</code>/<code>[chunkhash]</code></li>
<li><code>AggressiveSplittingPlugin</code></li>
<li><code>AggressiveMergingPlugin</code></li>
<li><code>ModuleConcatenationPlugin</code></li>
</ul>
<h3 id="最小化入口-chunk" tabindex="-1"><a class="header-anchor" href="#最小化入口-chunk" aria-hidden="true">#</a> 最小化入口 chunk</h3>
<p>webpack 只会在文件系统中生成已经更新的 chunk 。对于某些配置选项(HMR, <code>[name]</code>/<code>[chunkhash]</code> in <code>output.chunkFilename</code>, <code>[hash]</code>)来说，除了更新的 chunks 无效之外，入口 chunk 也不会生效。</p>
<p>应当在生成入口 chunk 时，尽量减少入口 chunk 的体积，以提高性能。下述代码块将只提取包含 runtime 的 chunk ，<em>其他 chunk 都作为子模块</em>:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">CommonsChunkPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"manifest"</span><span class="token punctuation">,</span>
  minChunks<span class="token operator">:</span> <span class="token number">Infinity</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="production" tabindex="-1"><a class="header-anchor" href="#production" aria-hidden="true">#</a> Production</h2>
<p>以下步骤在 <em>production</em> 中非常有用。</p>
<blockquote>
<p><strong>不要为了非常小的性能增益，牺牲你应用程序的质量！</strong> 请注意，优化代码质量在大多数情况下比构建性能更重要。</p>
</blockquote>
<h3 id="多个编译时" tabindex="-1"><a class="header-anchor" href="#多个编译时" aria-hidden="true">#</a> 多个编译时</h3>
<p>当进行多个编译时，以下工具可以帮助到你:</p>
<ul>
<li><a href="https://github.com/trivago/parallel-webpack" target="_blank" rel="noopener noreferrer"><code>parallel-webpack</code><OutboundLink/></a>: 它允许编译工作在 worker 池中进行。</li>
<li><code>cache-loader</code>: 缓存可以在多个编译时之间共享。</li>
</ul>
<h3 id="source-maps" tabindex="-1"><a class="header-anchor" href="#source-maps" aria-hidden="true">#</a> Source Maps</h3>
<p>Source maps 真的很消耗资源。你真的需要他们？</p>
<h2 id="工具相关问题" tabindex="-1"><a class="header-anchor" href="#工具相关问题" aria-hidden="true">#</a> 工具相关问题</h2>
<p>下列工具存在某些可能会降低构建性能的问题。</p>
<h3 id="babel" tabindex="-1"><a class="header-anchor" href="#babel" aria-hidden="true">#</a> Babel</h3>
<ul>
<li>项目中的 preset/plugins 数量最小化。</li>
</ul>
<h3 id="typescript-1" tabindex="-1"><a class="header-anchor" href="#typescript-1" aria-hidden="true">#</a> TypeScript</h3>
<ul>
<li>在单独的进程中使用 <code>fork-ts-checker-webpack-plugin</code> 进行类型检查。</li>
<li>配置 loaders 跳过类型检查。</li>
<li>使用 <code>ts-loader</code> 时，设置 <code>happyPackMode: true</code> / <code>transpileOnly: true</code>。</li>
</ul>
<h3 id="sass" tabindex="-1"><a class="header-anchor" href="#sass" aria-hidden="true">#</a> Sass</h3>
<ul>
<li><code>node-sass</code> 中有个来自 Node.js 线程池的阻塞线程的 bug。 当使用 <code>thread-loader</code> 时，需要设置 <code>workerParallelJobs: 2</code>。</li>
</ul>
<h2 id="集成" tabindex="-1"><a class="header-anchor" href="#集成" aria-hidden="true">#</a> 集成</h2>
<p>首先我们要消除一个常见的误解。webpack 是一个模块打包器(module bundler)（例如，<a href="http://browserify.org/" target="_blank" rel="noopener noreferrer">Browserify<OutboundLink/></a> 或 <a href="http://brunch.io/" target="_blank" rel="noopener noreferrer">Brunch<OutboundLink/></a>）。它不是一个任务执行器(task runner)（例如，<a href="https://www.gnu.org/software/make/" target="_blank" rel="noopener noreferrer">Make<OutboundLink/></a>, <a href="https://gruntjs.com/" target="_blank" rel="noopener noreferrer">Grunt<OutboundLink/></a> 或者 <a href="https://gulpjs.com/" target="_blank" rel="noopener noreferrer">Gulp<OutboundLink/></a> ）。任务执行器就是用来自动化处理常见的开发任务，例如项目的检查(lint)、构建(build)、测试(test)。相对于<em>打包器(bundler)</em>，任务执行器则聚焦在偏重上层的问题上面。你可以得益于，使用上层的工具，而将打包部分的问题留给 webpack。</p>
<p>打包器(bundler)帮助你取得准备用于部署的 JavaScript 和样式表，将它们转换为适合浏览器的可用格式。例如，JavaScript 可以<a href="https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin" target="_blank" rel="noopener noreferrer">压缩<OutboundLink/></a>、<a href="https://www.webpackjs.com/guides/code-splitting" target="_blank" rel="noopener noreferrer">拆分 chunk<OutboundLink/></a> 和<a href="https://www.webpackjs.com/guides/lazy-loading" target="_blank" rel="noopener noreferrer">懒加载<OutboundLink/></a>，以提高性能。打包是 web 开发中最重要的挑战之一，解决此问题可以消除开发过程中的大部分痛点。</p>
<h3 id="npm-scripts" tabindex="-1"><a class="header-anchor" href="#npm-scripts" aria-hidden="true">#</a> NPM Scripts</h3>
<p>通常 webpack 用户使用 npm <a href="https://docs.npmjs.com/misc/scripts" target="_blank" rel="noopener noreferrer"><code>scripts</code><OutboundLink/></a> 来作为任务执行器。这是比较好的开始。然而跨平台支持是一个问题，为此有一些解决方案。许多用户，但不是大多数用户，直接使用 npm <code>scripts</code> 和各种级别的 webpack 配置和工具，来应对构建任务。</p>
<p>因此，当 webpack 的核心焦点专注于打包时，有多种扩展可以供你使用，可以将其用于任务运行者常见的工作。集成一个单独的工具会增加复杂度，所以一定要权衡集成前后的利弊。</p>
<h3 id="grunt" tabindex="-1"><a class="header-anchor" href="#grunt" aria-hidden="true">#</a> Grunt</h3>
<p>对于那些使用 Grunt 的人，我们推荐使用 <a href="https://www.npmjs.com/package/grunt-webpack" target="_blank" rel="noopener noreferrer"><code>grunt-webpack</code><OutboundLink/></a> 包(package)。使用 <code>grunt-webpack</code> 你可以将 webpack 或 <a href="https://github.com/webpack/webpack-dev-server" target="_blank" rel="noopener noreferrer">webpack-dev-server<OutboundLink/></a> 作为一项任务(task)执行，访问<a href="https://gruntjs.com/api/grunt.template" target="_blank" rel="noopener noreferrer">模板标签(template tags)<OutboundLink/></a>中的统计信息，拆分开发和生产配置等等。如果你还没有安装过 <code>grunt-webpack</code> 和 <code>webpack</code>，请先安装它们：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev grunt-webpack webpack
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后注册一个配置并加载任务：</p>
<p><strong>Gruntfile.js</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> webpackConfig <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./webpack.config.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">grunt</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  grunt<span class="token punctuation">.</span><span class="token function">initConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    webpack<span class="token operator">:</span> <span class="token punctuation">{</span>
      options<span class="token operator">:</span> <span class="token punctuation">{</span>
        stats<span class="token operator">:</span> <span class="token operator">!</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">||</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">'development'</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      prod<span class="token operator">:</span> webpackConfig<span class="token punctuation">,</span>
      dev<span class="token operator">:</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span> watch<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> webpackConfig<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  grunt<span class="token punctuation">.</span><span class="token function">loadNpmTasks</span><span class="token punctuation">(</span><span class="token string">'grunt-webpack'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>获取更多信息，请查看<a href="https://github.com/webpack-contrib/grunt-webpack" target="_blank" rel="noopener noreferrer">本仓库<OutboundLink/></a>。</p>
<h3 id="gulp" tabindex="-1"><a class="header-anchor" href="#gulp" aria-hidden="true">#</a> Gulp</h3>
<p>在 <a href="https://github.com/shama/webpack-stream" target="_blank" rel="noopener noreferrer"><code>webpack-stream</code><OutboundLink/></a> 包(package)（也称作 <code>gulp-webpack</code>） 的帮助下，也可以很简单方便的将 Gulp 与 webpack 集成。在这种情况下，不需要单独安装 <code>webpack</code> ，因为它是 <code>webpack-stream</code> 直接依赖：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev webpack-stream
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>只需要把 <code>webpack</code> 替换为 <code>require('webpack-stream')</code>，并传递一个配置文件就可以了：</p>
<p><strong>gulpfile.js</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> gulp <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'gulp'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack-stream'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
gulp<span class="token punctuation">.</span><span class="token function">task</span><span class="token punctuation">(</span><span class="token string">'default'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> gulp<span class="token punctuation">.</span><span class="token function">src</span><span class="token punctuation">(</span><span class="token string">'src/entry.js'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span><span class="token function">webpack</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// 一些配置选项……</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>gulp<span class="token punctuation">.</span><span class="token function">dest</span><span class="token punctuation">(</span><span class="token string">'dist/'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></template>
