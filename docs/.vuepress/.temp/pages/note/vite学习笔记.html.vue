<template><h1 id="vite学习笔记" tabindex="-1"><a class="header-anchor" href="#vite学习笔记" aria-hidden="true">#</a> vite学习笔记</h1>
<h2 id="为什么选vite" tabindex="-1"><a class="header-anchor" href="#为什么选vite" aria-hidden="true">#</a> 为什么选vite</h2>
<h3 id="现实问题" tabindex="-1"><a class="header-anchor" href="#现实问题" aria-hidden="true">#</a> 现实问题</h3>
<p>在浏览器支持 ES 模块之前，JavaScript 并没有提供的原生机制让开发者以模块化的方式进行开发。这也正是我们对 “<strong>打包</strong>” 这个概念熟悉的原因：<strong>使用工具抓取、处理并将我们的源码模块串联成可以在浏览器中运行的文件</strong>。</p>
<p>当我们开始构建越来越大型的应用时， 使用 JavaScript 开发的工具通常需要很长时间（甚至是几分钟！）才能启动开发服务器，即使使用 HMR（热更新），文件修改后的效果也需要几秒钟才能在浏览器中反映出来。如此循环往复，迟钝的反馈会极大地影响开发者的开发效率和幸福感。</p>
<p>Vite 旨在利用生态系统中的新进展解决上述问题：<strong>浏览器开始原生支持 ES 模块，且越来越多 JavaScript 工具使用编译型语言编写</strong>。</p>
<h3 id="缓慢的服务器启动" tabindex="-1"><a class="header-anchor" href="#缓慢的服务器启动" aria-hidden="true">#</a> 缓慢的服务器启动</h3>
<p>当冷启动开发服务器时，基于打包器的方式启动必须优先抓取并构建你的整个应用，然后才能提供服务。</p>
<p>Vite 通过在一开始将应用中的模块区分为 <strong>依赖</strong> 和 <strong>源码</strong> 两类，改进了开发服务器启动时间。</p>
<ul>
<li>
<p><strong>依赖</strong> <strong>大多为在开发时不会变动的纯 JavaScript</strong>。一些较大的依赖（例如有上百个模块的组件库）处理的代价也很高。依赖也通常会存在多种模块化格式（例如 ESM 或者 CommonJS）。</p>
<p>Vite 将会使用 <a href="https://esbuild.github.io/" target="_blank" rel="noopener noreferrer">esbuild<OutboundLink/></a> <a href="https://cn.vitejs.dev/guide/dep-pre-bundling.html" target="_blank" rel="noopener noreferrer">预构建依赖<OutboundLink/></a>。Esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。</p>
</li>
<li>
<p><strong>源码</strong> <strong>通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS 或者 Vue/Svelte 组件），时常会被编辑</strong>。同时，并不是所有的源码都需要同时被加载（例如基于路由拆分的代码模块）。</p>
<p>Vite 以 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" target="_blank" rel="noopener noreferrer">原生 ESM<OutboundLink/></a> 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：<strong>Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。</strong></p>
<p><img src="https://cn.vitejs.dev/assets/bundler.37740380.png" alt="基于打包器的开发服务器"></p>
<p><img src="https://cn.vitejs.dev/assets/esm.3070012d.png" alt="基于 ESM 的开发服务器"></p>
</li>
</ul>
<h3 id="缓慢的更新" tabindex="-1"><a class="header-anchor" href="#缓慢的更新" aria-hidden="true">#</a> 缓慢的更新</h3>
<p>基于打包器启动时，重建整个包的效率很低。原因显而易见：因为这样更新速度会随着应用体积增长而直线下降。</p>
<p>**一些打包器的开发服务器将构建内容存入内存，这样它们只需要在文件更改时使模块图的一部分失活，但它也仍需要整个重新构建并重载页面。**这样代价很高，并且重新加载页面会消除应用的当前状态，所以打包器支持了动态模块热重载（HMR）：允许一个模块 “热替换” 它自己，而不会影响页面其余部分。这大大改进了开发体验 —— 然而，在实践中我们发现，即使采用了 HMR 模式，其热更新速度也会随着应用规模的增长而显著下降。</p>
<p>在 Vite 中，HMR 是在原生 ESM 上执行的。<strong>当编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活（大多数时候只是模块本身），使得无论应用大小如何，HMR 始终能保持快速更新。</strong></p>
<p>Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：<strong>源码模块的请求会根据 <code>304 Not Modified</code> 进行协商缓存，而依赖模块请求则会通过 <code>Cache-Control: max-age=31536000,immutable</code> 进行强缓存，因此一旦被缓存它们将不需要再次请求。</strong></p>
<h3 id="为什么生产环境仍需打包" tabindex="-1"><a class="header-anchor" href="#为什么生产环境仍需打包" aria-hidden="true">#</a> 为什么生产环境仍需打包</h3>
<p>尽管原生 ESM 现在得到了广泛支持，但由于嵌套导入会导致额外的网络往返，在生产环境中发布未打包的 ESM 仍然效率低下（即使使用 HTTP/2）。<strong>为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。</strong></p>
<p>要确保开发服务器和生产环境构建之间的最优输出和行为一致并不容易。所以 Vite 附带了一套 <a href="https://cn.vitejs.dev/guide/features.html#build-optimizations" target="_blank" rel="noopener noreferrer">构建优化<OutboundLink/></a> 的 <a href="https://cn.vitejs.dev/guide/build.html" target="_blank" rel="noopener noreferrer">构建命令<OutboundLink/></a>，开箱即用。</p>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<h3 id="总览" tabindex="-1"><a class="header-anchor" href="#总览" aria-hidden="true">#</a> 总览</h3>
<p>Vite（法语意为 &quot;快速的&quot;，发音 <code>/vit/</code>，发音同 &quot;veet&quot;)是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：</p>
<ul>
<li>一个<strong>开发服务器</strong>，它基于 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" target="_blank" rel="noopener noreferrer">原生 ES 模块<OutboundLink/></a> 提供了 <a href="https://cn.vitejs.dev/guide/features.html" target="_blank" rel="noopener noreferrer">丰富的内建功能<OutboundLink/></a>，如速度快到惊人的 <a href="https://cn.vitejs.dev/guide/features.html#hot-module-replacement" target="_blank" rel="noopener noreferrer">模块热更新（HMR）<OutboundLink/></a>。</li>
<li>一套<strong>构建指令</strong>，它使用 <a href="https://rollupjs.org/" target="_blank" rel="noopener noreferrer">Rollup<OutboundLink/></a> 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。</li>
</ul>
<p>Vite 意在提供开箱即用的配置，同时它的 <a href="https://cn.vitejs.dev/guide/api-plugin.html" target="_blank" rel="noopener noreferrer">插件 API<OutboundLink/></a> 和 <a href="https://cn.vitejs.dev/guide/api-javascript.html" target="_blank" rel="noopener noreferrer">JavaScript API<OutboundLink/></a> 带来了高度的可扩展性，并有完整的类型支持。</p>
<h3 id="搭建第一个-vite-项目" tabindex="-1"><a class="header-anchor" href="#搭建第一个-vite-项目" aria-hidden="true">#</a> 搭建第一个 Vite 项目</h3>
<p>兼容性注意</p>
<p>Vite 需要 <a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">Node.js<OutboundLink/></a> 版本 &gt;= 12.0.0。</p>
<p>使用 NPM:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">npm</span> init vite@latest
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>使用 Yarn:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">yarn</span> create vite
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>你还可以通过附加的命令行选项直接指定项目名称和你想要使用的模板。例如，要构建一个 Vite + Vue 项目，运行:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># npm 6.x</span>
<span class="token function">npm</span> init vite@latest my-vue-app --template vue

<span class="token comment"># npm 7+, 需要额外的双横线：</span>
<span class="token function">npm</span> init vite@latest my-vue-app -- --template vue

<span class="token comment"># yarn</span>
<span class="token function">yarn</span> create vite my-vue-app --template vue
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>支持的模板预设包括：</p>
<ul>
<li><code>vanilla</code></li>
<li><code>vanilla-ts</code></li>
<li><code>vue</code></li>
<li><code>vue-ts</code></li>
<li><code>react</code></li>
<li><code>react-ts</code></li>
<li><code>preact</code></li>
<li><code>preact-ts</code></li>
<li><code>lit</code></li>
<li><code>lit-ts</code></li>
<li><code>svelte</code></li>
<li><code>svelte-ts</code></li>
</ul>
<p>查看 <a href="https://github.com/vitejs/vite/tree/main/packages/create-vite" target="_blank" rel="noopener noreferrer">create-vite<OutboundLink/></a> 以获取每个模板的更多细节。</p>
<h3 id="index-html-与项目根目录" tabindex="-1"><a class="header-anchor" href="#index-html-与项目根目录" aria-hidden="true">#</a> <code>index.html</code> 与项目根目录</h3>
<p>在一个 Vite 项目中，<code>index.html</code> 在项目最外层而不是在 <code>public</code> 文件夹内。这是有意而为之的：在开发期间 Vite 是一个服务器，而 <code>index.html</code> 是该 Vite 项目的入口文件。</p>
<p>Vite 将 <code>index.html</code> 视为源码和模块图的一部分。Vite 解析 <code>&lt;script type=&quot;module&quot; src=&quot;...&quot;&gt;</code> ，这个标签指向你的 JavaScript 源码。甚至内联引入 JavaScript 的 <code>&lt;script type=&quot;module&quot;&gt;</code> 和引用 CSS 的 <code>&lt;link href&gt;</code> 也能利用 Vite 特有的功能被解析。另外，<code>index.html</code> 中的 URL 将被自动转换，因此不再需要 <code>%PUBLIC_URL%</code> 占位符了。</p>
<p>与静态 HTTP 服务器类似，Vite 也有 “根目录” 的概念，即服务文件的位置，在接下来的文档中你将看到它会以 <code>&lt;root&gt;</code> 代称。源码中的绝对 URL 路径将以项目的 “根” 作为基础来解析，因此你可以像在普通的静态文件服务器上一样编写代码（并且功能更强大！）。Vite 还能够处理依赖关系，解析处于根目录外的文件位置，这使得它即使在基于 monorepo 的方案中也十分有用。</p>
<p>Vite 也支持多个 <code>.html</code> 作入口点的 <a href="https://cn.vitejs.dev/guide/build.html#multi-page-app" target="_blank" rel="noopener noreferrer">多页面应用模式<OutboundLink/></a>。</p>
<h4 id="指定替代根目录" tabindex="-1"><a class="header-anchor" href="#指定替代根目录" aria-hidden="true">#</a> 指定替代根目录</h4>
<p><code>vite</code> 以当前工作目录作为根目录启动开发服务器。你也可以通过 <code>vite serve some/sub/dir</code> 来指定一个替代的根目录。</p>
<h3 id="命令行界面" tabindex="-1"><a class="header-anchor" href="#命令行界面" aria-hidden="true">#</a> 命令行界面</h3>
<p>在安装了 Vite 的项目中，可以在 npm scripts 中使用 <code>vite</code> 可执行文件，或者直接使用 <code>npx vite</code> 运行它。下面是通过脚手架创建的 Vite 项目中默认的 npm scripts：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"dev"</span><span class="token operator">:</span> <span class="token string">"vite"</span><span class="token punctuation">,</span> <span class="token comment">// 启动开发服务器</span>
    <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"vite build"</span><span class="token punctuation">,</span> <span class="token comment">// 为生产环境构建产物</span>
    <span class="token property">"serve"</span><span class="token operator">:</span> <span class="token string">"vite preview"</span> <span class="token comment">// 本地预览生产构建产物</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>可以指定额外的命令行选项，如 <code>--port</code> 或 <code>--https</code>。运行 <code>npx vite --help</code> 获得完整的命令行选项列表。</p>
<h2 id="功能" tabindex="-1"><a class="header-anchor" href="#功能" aria-hidden="true">#</a> 功能</h2>
<p>对非常基础的使用来说，使用 Vite 开发和使用一个静态文件服务器并没有太大区别。然而，Vite 还通过原生 ESM 导入提供了许多主要用于打包场景的增强功能。</p>
<h3 id="npm-依赖解析和预构建" tabindex="-1"><a class="header-anchor" href="#npm-依赖解析和预构建" aria-hidden="true">#</a> NPM 依赖解析和预构建</h3>
<p>原生 ES 导入不支持下面这样的裸模块导入：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> someMethod <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'my-dep'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>上面的代码会在浏览器中抛出一个错误。Vite 将会检测到所有被加载的源文件中的此类裸模块导入，并执行以下操作:</p>
<ol>
<li><a href="https://cn.vitejs.dev/guide/dep-pre-bundling.html" target="_blank" rel="noopener noreferrer">预构建<OutboundLink/></a> 它们可以提高页面加载速度，并将 CommonJS / UMD 转换为 ESM 格式。预构建这一步由 <a href="http://esbuild.github.io/" target="_blank" rel="noopener noreferrer">esbuild<OutboundLink/></a> 执行，这使得 Vite 的冷启动时间比任何基于 JavaScript 的打包器都要快得多。</li>
<li>重写导入为合法的 URL，例如 <code>/node_modules/.vite/my-dep.js?v=f3sf2ebd</code> 以便浏览器能够正确导入它们。</li>
</ol>
<p><strong>依赖是强缓存的</strong></p>
<p>Vite 通过 HTTP 头来缓存请求得到的依赖，所以如果你想要编辑或调试一个依赖，请按照 <a href="https://cn.vitejs.dev/guide/dep-pre-bundling.html#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98" target="_blank" rel="noopener noreferrer">这里<OutboundLink/></a> 的步骤操作。</p>
<h3 id="模块热重载" tabindex="-1"><a class="header-anchor" href="#模块热重载" aria-hidden="true">#</a> 模块热重载</h3>
<p>Vite 提供了一套原生 ESM 的 <a href="https://cn.vitejs.dev/guide/api-hmr.html" target="_blank" rel="noopener noreferrer">HMR API<OutboundLink/></a>。 具有 HMR 功能的框架可以利用该 API 提供即时、准确的更新，而无需重新加载页面或清除应用程序状态。Vite 内置了 HMR 到 <a href="https://github.com/vitejs/vite/tree/main/packages/plugin-vue" target="_blank" rel="noopener noreferrer">Vue 单文件组件（SFC）<OutboundLink/></a> 和 <a href="https://github.com/vitejs/vite/tree/main/packages/plugin-react" target="_blank" rel="noopener noreferrer">React Fast Refresh<OutboundLink/></a> 中。</p>
<p>注意，你不需要手动设置这些 —— 当你通过 <a href="https://cn.vitejs.dev/guide/" target="_blank" rel="noopener noreferrer"><code>create-vite</code><OutboundLink/></a> 创建应用程序时，所选模板已经为你预先配置了这些。</p>
<h3 id="typescript" tabindex="-1"><a class="header-anchor" href="#typescript" aria-hidden="true">#</a> TypeScript</h3>
<p>Vite 天然支持引入 <code>.ts</code> 文件。</p>
<p>Vite 仅执行 <code>.ts</code> 文件的转译工作，并 <strong>不</strong> 执行任何类型检查。并假设类型检查已经被你的 IDE 或构建过程接管了（你可以在构建脚本中运行 <code>tsc --noEmit</code> 或者安装 <code>vue-tsc</code> 然后运行 <code>vue-tsc --noEmit</code> 来对你的 <code>*.vue</code> 文件做类型检查）。</p>
<p>Vite 使用 <a href="https://github.com/evanw/esbuild" target="_blank" rel="noopener noreferrer">esbuild<OutboundLink/></a> 将 TypeScript 转译到 JavaScript，约是 <code>tsc</code> 速度的 20~30 倍，同时 HMR 更新反映到浏览器的时间小于 50ms。</p>
<h4 id="typescript-编译器选项" tabindex="-1"><a class="header-anchor" href="#typescript-编译器选项" aria-hidden="true">#</a> TypeScript 编译器选项</h4>
<p><code>tsconfig.json</code> 中 <code>compilerOptions</code> 下的一些配置项需要特别注意。</p>
<h5 id="isolatedmodules" tabindex="-1"><a class="header-anchor" href="#isolatedmodules" aria-hidden="true">#</a> <code>isolatedModules</code></h5>
<p>应该设置为 <code>true</code>。</p>
<p>这是因为 <code>esbuild</code> 只执行没有类型信息的转译，它并不支持某些特性，如 <code>const enum</code> 和隐式类型导入。</p>
<p>你必须在 <code>tsconfig.json</code> 中的 <code>compilerOptions</code> 下设置 <code>&quot;isolatedModules&quot;: true</code>。如此做，TS 会警告你不要使用隔离（isolated）转译的功能。</p>
<h5 id="usedefineforclassfields" tabindex="-1"><a class="header-anchor" href="#usedefineforclassfields" aria-hidden="true">#</a> <code>useDefineForClassFields</code></h5>
<p>从 Vite v2.5.0 开始，如果 TypeScript 的 target 是 <code>ESNext</code>，此选项默认值则为 <code>true</code>。</p>
<p>如果你正在使用一个严重依赖 class fields 的库，请注意该库对此选项的预期设置。</p>
<p>大多数库都希望 <code>&quot;useDefineForClassFields&quot;: true</code>，如 <a href="https://mobx.js.org/installation.html#use-spec-compliant-transpilation-for-class-properties" target="_blank" rel="noopener noreferrer">MobX<OutboundLink/></a>，<a href="https://github.com/vuejs/vue-class-component/issues/465" target="_blank" rel="noopener noreferrer">Vue Class Components 8.x<OutboundLink/></a> 等。</p>
<p>但是有几个库还没有兼容这个新的默认值，其中包括 <a href="https://github.com/lit/lit-element/issues/1030" target="_blank" rel="noopener noreferrer"><code>lit-element</code><OutboundLink/></a>。如果遇到这种情况，请将 <code>useDefineForClassFields</code> 设置为 <code>false</code>。</p>
<h4 id="客户端类型" tabindex="-1"><a class="header-anchor" href="#客户端类型" aria-hidden="true">#</a> 客户端类型</h4>
<p>Vite 默认的类型定义是写给它的 Node.js API 的。要将其补充到一个 Vite 应用的客户端代码环境中，请添加一个 <code>d.ts</code> 声明文件：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">/// &lt;reference types="vite/client" /></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>同时，你也可以将 <code>vite/client</code> 添加到 <code>tsconfig</code> 中的 <code>compilerOptions.types</code> 下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token punctuation">{</span>
  <span class="token string">"compilerOptions"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string">"types"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"vite/client"</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这将会提供以下类型定义补充：</p>
<ul>
<li>资源导入 (例如：导入一个 <code>.svg</code> 文件)</li>
<li><code>import.meta.env</code> 上 Vite 注入的环境变量的类型定义</li>
<li><code>import.meta.hot</code> 上的 <a href="https://cn.vitejs.dev/guide/api-hmr.html" target="_blank" rel="noopener noreferrer">HMR API<OutboundLink/></a> 类型定义</li>
</ul>
<h3 id="vue" tabindex="-1"><a class="header-anchor" href="#vue" aria-hidden="true">#</a> Vue</h3>
<p>Vite 为 Vue 提供第一优先级支持：</p>
<ul>
<li>Vue 3 单文件组件支持：<a href="https://github.com/vitejs/vite/tree/main/packages/plugin-vue" target="_blank" rel="noopener noreferrer">@vitejs/plugin-vue<OutboundLink/></a></li>
<li>Vue 3 JSX 支持：<a href="https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx" target="_blank" rel="noopener noreferrer">@vitejs/plugin-vue-jsx<OutboundLink/></a></li>
<li>Vue 2 支持：<a href="https://github.com/underfin/vite-plugin-vue2" target="_blank" rel="noopener noreferrer">underfin/vite-plugin-vue2<OutboundLink/></a></li>
</ul>
<h3 id="jsx" tabindex="-1"><a class="header-anchor" href="#jsx" aria-hidden="true">#</a> JSX</h3>
<p><code>.jsx</code> 和 <code>.tsx</code> 文件同样开箱即用。JSX 的转译同样是通过 <a href="https://esbuild.github.io/" target="_blank" rel="noopener noreferrer">esbuild<OutboundLink/></a>，默认为 React 16 风格。</p>
<p>Vue 用户应使用官方提供的 <a href="https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx" target="_blank" rel="noopener noreferrer">@vitejs/plugin-vue-jsx<OutboundLink/></a> 插件，它提供了 Vue 3 特性的支持，包括 HMR，全局组件解析，指令和插槽。</p>
<p>如果不是在 React 或 Vue 中使用 JSX，自定义的 <code>jsxFactory</code> 和 <code>jsxFragment</code> 可以使用 <a href="https://cn.vitejs.dev/config/#esbuild" target="_blank" rel="noopener noreferrer"><code>esbuild</code> 选项<OutboundLink/></a> 进行配置。例如对 Preact：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// vite.config.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  esbuild<span class="token operator">:</span> <span class="token punctuation">{</span>
    jsxFactory<span class="token operator">:</span> <span class="token string">'h'</span><span class="token punctuation">,</span>
    jsxFragment<span class="token operator">:</span> <span class="token string">'Fragment'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>你可以使用 <code>jsxInject</code>（这是一个仅在 Vite 中使用的选项）为 JSX 注入 helper，以避免手动导入：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// vite.config.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  esbuild<span class="token operator">:</span> <span class="token punctuation">{</span>
    jsxInject<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">import React from 'react'</span><span class="token template-punctuation string">`</span></span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="css" tabindex="-1"><a class="header-anchor" href="#css" aria-hidden="true">#</a> CSS</h3>
<p>导入 <code>.css</code> 文件将会把内容插入到 <code>&lt;style&gt;</code> 标签中，同时也带有 HMR 支持。也能够以字符串的形式检索处理后的、作为其模块默认导出的 CSS。</p>
<h4 id="import-内联和变基" tabindex="-1"><a class="header-anchor" href="#import-内联和变基" aria-hidden="true">#</a> <code>@import</code> 内联和变基</h4>
<p>Vite 通过 <code>postcss-import</code> 预配置支持了 CSS <code>@import</code> 内联，Vite 的路径别名也遵从 CSS <code>@import</code>。换句话说，所有 CSS <code>url()</code> 引用，即使导入的文件在不同的目录中，也总是自动变基，以确保正确性。</p>
<p>Sass 和 Less 文件也支持 <code>@import</code> 别名和 URL 变基。</p>
<h4 id="postcss" tabindex="-1"><a class="header-anchor" href="#postcss" aria-hidden="true">#</a> PostCSS</h4>
<p>如果项目包含有效的 PostCSS 配置 (任何受 <a href="https://github.com/postcss/postcss-load-config" target="_blank" rel="noopener noreferrer">postcss-load-config<OutboundLink/></a> 支持的格式，例如 <code>postcss.config.js</code>)，它将会自动应用于所有已导入的 CSS。</p>
<h4 id="css-modules" tabindex="-1"><a class="header-anchor" href="#css-modules" aria-hidden="true">#</a> CSS Modules</h4>
<p>任何以 <code>.module.css</code> 为后缀名的 CSS 文件都被认为是一个 <a href="https://github.com/css-modules/css-modules" target="_blank" rel="noopener noreferrer">CSS modules 文件<OutboundLink/></a>。导入这样的文件会返回一个相应的模块对象：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/* example.module.css */</span>
<span class="token selector">.red</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> classes <span class="token keyword">from</span> <span class="token string">'./example.module.css'</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>className <span class="token operator">=</span> classes<span class="token punctuation">.</span>red
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>CSS modules 行为可以通过 <a href="https://cn.vitejs.dev/config/#css-modules" target="_blank" rel="noopener noreferrer"><code>css.modules</code> 选项<OutboundLink/></a> 进行配置。</p>
<p>如果 <code>css.modules.localsConvention</code> 设置开启了 camelCase 格式变量名转换（例如 <code>localsConvention: 'camelCaseOnly'</code>），你还可以使用按名导入。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// .apply-color -> applyColor</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> applyColor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./example.module.css'</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>className <span class="token operator">=</span> applyColor
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="css-预处理器" tabindex="-1"><a class="header-anchor" href="#css-预处理器" aria-hidden="true">#</a> CSS 预处理器</h4>
<p>由于 Vite 的目标仅为现代浏览器，<strong>因此建议使用原生 CSS 变量和实现 CSSWG 草案的 PostCSS 插件</strong>（例如 <a href="https://github.com/jonathantneal/postcss-nesting" target="_blank" rel="noopener noreferrer">postcss-nesting<OutboundLink/></a>）来编写简单的、符合未来标准的 CSS。</p>
<p>话虽如此，但 Vite 也同时提供了对 <code>.scss</code>, <code>.sass</code>, <code>.less</code>, <code>.styl</code> 和 <code>.stylus</code> 文件的内置支持。没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># .scss and .sass</span>
<span class="token function">npm</span> <span class="token function">install</span> -D sass

<span class="token comment"># .less</span>
<span class="token function">npm</span> <span class="token function">install</span> -D <span class="token function">less</span>

<span class="token comment"># .styl and .stylus</span>
<span class="token function">npm</span> <span class="token function">install</span> -D stylus
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>如果是用的是单文件组件，可以通过 <code>&lt;style lang=&quot;sass&quot;&gt;</code>（或其他预处理器）自动开启。</p>
<p>Vite 为 Sass 和 Less 改进了 <code>@import</code> 解析，以保证 Vite 别名也能被使用。另外，<code>url()</code> 中的相对路径引用的，与根文件不同目录中的 Sass/Less 文件会自动变基以保证正确性。</p>
<p>由于 Stylus API 限制，<code>@import</code> 别名和 URL 变基不支持 Stylus。</p>
<p>你还可以通过在文件扩展名前加上 <code>.module</code> 来结合使用 CSS modules 和预处理器，例如 <code>style.module.scss</code>。</p>
<h3 id="静态资源处理" tabindex="-1"><a class="header-anchor" href="#静态资源处理" aria-hidden="true">#</a> 静态资源处理</h3>
<p>导入一个静态资源会返回解析后的 URL：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> imgUrl <span class="token keyword">from</span> <span class="token string">'./img.png'</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'hero-img'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>src <span class="token operator">=</span> imgUrl
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>添加一些特殊的查询参数可以更改资源被引入的方式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 显式加载资源为一个 URL</span>
<span class="token keyword">import</span> assetAsURL <span class="token keyword">from</span> <span class="token string">'./asset.js?url'</span>
<span class="token comment">// 以字符串形式加载资源</span>
<span class="token keyword">import</span> assetAsString <span class="token keyword">from</span> <span class="token string">'./shader.glsl?raw'</span>
<span class="token comment">// 加载为 Web Worker</span>
<span class="token keyword">import</span> Worker <span class="token keyword">from</span> <span class="token string">'./worker.js?worker'</span>
<span class="token comment">// 在构建时 Web Worker 内联为 base64 字符串</span>
<span class="token keyword">import</span> InlineWorker <span class="token keyword">from</span> <span class="token string">'./worker.js?worker&amp;inline'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>更多细节请见 <a href="https://cn.vitejs.dev/guide/assets.html" target="_blank" rel="noopener noreferrer">静态资源处理<OutboundLink/></a>。</p>
<h3 id="json" tabindex="-1"><a class="header-anchor" href="#json" aria-hidden="true">#</a> JSON</h3>
<p>JSON 可以被直接导入 —— 同样支持具名导入：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 导入整个对象</span>
<span class="token keyword">import</span> json <span class="token keyword">from</span> <span class="token string">'./example.json'</span>
<span class="token comment">// 对一个根字段使用具名导入 —— 有效帮助 treeshaking！</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> field <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./example.json'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="构建优化" tabindex="-1"><a class="header-anchor" href="#构建优化" aria-hidden="true">#</a> 构建优化</h3>
<blockquote>
<p>下面所罗列的功能会自动应用为构建过程的一部分，除非你想禁用它们，否则没有必要显式配置。</p>
</blockquote>
<h4 id="css-代码分割" tabindex="-1"><a class="header-anchor" href="#css-代码分割" aria-hidden="true">#</a> CSS 代码分割</h4>
<p>Vite 会自动地将一个异步 chunk 模块中使用到的 CSS 代码抽取出来并为其生成一个单独的文件。这个 CSS 文件将在该异步 chunk 加载完成时自动通过一个 <code>&lt;link&gt;</code> 标签载入，该异步 chunk 会保证只在 CSS 加载完毕后再执行，避免发生 [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content#:~:text=A flash of unstyled content,before all information is retrieved.) 。</p>
<p>如果你更倾向于将所有的 CSS 抽取到一个文件中，你可以通过设置 <a href="https://cn.vitejs.dev/config/#build-csscodesplit" target="_blank" rel="noopener noreferrer"><code>build.cssCodeSplit</code><OutboundLink/></a> 为 <code>false</code> 来禁用 CSS 代码分割。</p>
<h4 id="预加载指令生成" tabindex="-1"><a class="header-anchor" href="#预加载指令生成" aria-hidden="true">#</a> 预加载指令生成</h4>
<p>Vite 会为入口 chunk 和它们在打包出的 HTML 中的直接引入自动生成 <code>&lt;link rel=&quot;modulepreload&quot;&gt;</code> 指令。</p>
<h4 id="异步-chunk-加载优化" tabindex="-1"><a class="header-anchor" href="#异步-chunk-加载优化" aria-hidden="true">#</a> 异步 Chunk 加载优化</h4>
<p>在实际项目中，Rollup 通常会生成 “共用” chunk —— 被两个或以上的其他 chunk 共享的 chunk。与动态导入相结合，会很容易出现下面这种场景：</p>
<p><img src="https://cn.vitejs.dev/assets/graph.8f2f36b7.png" alt="graph"></p>
<p>在无优化的情境下，当异步 chunk <code>A</code> 被导入时，浏览器将必须请求和解析 <code>A</code>，然后它才能弄清楚它也需要共用 chunk <code>C</code>。这会导致额外的网络往返：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Entry ---> A ---> C
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Vite 将使用一个预加载步骤自动重写代码，来分割动态导入调用，以实现当 <code>A</code> 被请求时，<code>C</code> 也将 <strong>同时</strong> 被请求：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Entry ---> (A + C)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><code>C</code> 也可能有更深的导入，在未优化的场景中，这会导致更多的网络往返。Vite 的优化会跟踪所有的直接导入，无论导入的深度如何，都能够完全消除不必要的往返。</p>
<h2 id="使用插件" tabindex="-1"><a class="header-anchor" href="#使用插件" aria-hidden="true">#</a> 使用插件</h2>
<p>Vite 可以使用插件进行扩展，这得益于 Rollup 优秀的插件接口设计和一部分 Vite 独有的额外选项。这意味着 Vite 用户可以利用 Rollup 插件的强大生态系统，同时根据需要也能够扩展开发服务器和 SSR 功能。</p>
<h3 id="添加一个插件" tabindex="-1"><a class="header-anchor" href="#添加一个插件" aria-hidden="true">#</a> 添加一个插件</h3>
<p>若要使用一个插件，需要将它添加到项目的 <code>devDependencies</code> 并在 <code>vite.config.js</code> 配置文件中的 <code>plugins</code> 数组中引入它。例如，要想为传统浏览器提供支持，可以按下面这样使用官方插件 <a href="https://github.com/vitejs/vite/tree/main/packages/plugin-legacy" target="_blank" rel="noopener noreferrer">@vitejs/plugin-legacy<OutboundLink/></a>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">npm</span> i -D @vitejs/plugin-legacy
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// vite.config.js</span>
<span class="token keyword">import</span> legacy <span class="token keyword">from</span> <span class="token string">'@vitejs/plugin-legacy'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vite'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">legacy</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      targets<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'defaults'</span><span class="token punctuation">,</span> <span class="token string">'not IE 11'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><code>plugins</code> 也可以接受包含多个插件作为单个元素的预设。这对于使用多个插件实现的复杂特性（如框架集成）很有用。该数组将在内部被扁平化。</p>
<p>Falsy 虚值的插件将被忽略，可以用来轻松地启用或停用插件。</p>
<h3 id="查找插件" tabindex="-1"><a class="header-anchor" href="#查找插件" aria-hidden="true">#</a> 查找插件</h3>
<p>注意</p>
<p>Vite 旨在为常见的 Web 开发范式提供开箱即用的支持。在寻找一个 Vite 或兼容的 Rollup 插件之前，请先查看 <a href="https://cn.vitejs.dev/guide/features.html" target="_blank" rel="noopener noreferrer">功能指引<OutboundLink/></a>。大量在 Rollup 项目中需要使用插件的用例在 Vite 中已经覆盖到了。</p>
<p>查看 <a href="https://cn.vitejs.dev/plugins/" target="_blank" rel="noopener noreferrer">Plugins 章节<OutboundLink/></a> 获取官方插件信息。社区插件列表请参见 <a href="https://github.com/vitejs/awesome-vite#plugins" target="_blank" rel="noopener noreferrer">awesome-vite<OutboundLink/></a>。而对于兼容的 Rollup 插件，请查看 <a href="https://vite-rollup-plugins.patak.dev/" target="_blank" rel="noopener noreferrer">Vite Rollup 插件<OutboundLink/></a> 获取一个带使用说明的兼容 Rollup 官方插件列表，若列表中没有找到，则请参阅 <a href="https://cn.vitejs.dev/guide/api-plugin.html#rollup-plugin-compatibility" target="_blank" rel="noopener noreferrer">Rollup 插件兼容性章节<OutboundLink/></a>。</p>
<p>你也可以使用此 <a href="https://www.npmjs.com/search?q=vite-plugin&amp;ranking=popularity" target="_blank" rel="noopener noreferrer">npm Vite 插件搜索链接<OutboundLink/></a> 来找到一些遵循了 <a href="https://cn.vitejs.dev/guide/api-plugin.html#conventions" target="_blank" rel="noopener noreferrer">推荐约定<OutboundLink/></a> 的 Vite 插件，或者通过 <a href="https://www.npmjs.com/search?q=rollup-plugin&amp;ranking=popularity" target="_blank" rel="noopener noreferrer">npm Rollup 插件搜索链接<OutboundLink/></a> 获取 Rollup 插件。</p>
<h3 id="强制插件排序" tabindex="-1"><a class="header-anchor" href="#强制插件排序" aria-hidden="true">#</a> 强制插件排序</h3>
<p>为了与某些 Rollup 插件兼容，可能需要强制执行插件的顺序，或者只在构建时使用。这应该是 Vite 插件的实现细节。可以使用 <code>enforce</code> 修饰符来强制插件的位置:</p>
<ul>
<li><code>pre</code>：在 Vite 核心插件之前调用该插件</li>
<li>默认：在 Vite 核心插件之后调用该插件</li>
<li><code>post</code>：在 Vite 构建插件之后调用该插件</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// vite.config.js</span>
<span class="token keyword">import</span> image <span class="token keyword">from</span> <span class="token string">'@rollup/plugin-image'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vite'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token operator">...</span><span class="token function">image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      enforce<span class="token operator">:</span> <span class="token string">'pre'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="按需应用" tabindex="-1"><a class="header-anchor" href="#按需应用" aria-hidden="true">#</a> 按需应用</h3>
<p>默认情况下插件在开发 (serve) 和生产 (build) 模式中都会调用。如果插件在服务或构建期间按需使用，请使用 <code>apply</code> 属性指明它们仅在 <code>'build'</code> 或 <code>'serve'</code> 模式时调用：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// vite.config.js</span>
<span class="token keyword">import</span> typescript2 <span class="token keyword">from</span> <span class="token string">'rollup-plugin-typescript2'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vite'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token operator">...</span><span class="token function">typescript2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      apply<span class="token operator">:</span> <span class="token string">'build'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="创建插件" tabindex="-1"><a class="header-anchor" href="#创建插件" aria-hidden="true">#</a> 创建插件</h3>
<p>阅读 <a href="https://cn.vitejs.dev/guide/api-plugin.html" target="_blank" rel="noopener noreferrer">插件 API 指引<OutboundLink/></a> 文档了解如何创建插件。</p>
<h2 id="依赖预构建" tabindex="-1"><a class="header-anchor" href="#依赖预构建" aria-hidden="true">#</a> 依赖预构建</h2>
<p>当你首次启动 <code>vite</code> 时，你可能会注意到打印出了以下信息：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Optimizable dependencies detected: （侦测到可优化的依赖：）
react, react-dom
Pre-bundling them to speed up dev server page load...（将预构建它们以提升开发服务器页面加载速度）
(this will be run only when your dependencies have changed)（这将只会在你的依赖发生变化时执行）
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="原因" tabindex="-1"><a class="header-anchor" href="#原因" aria-hidden="true">#</a> 原因</h3>
<p>这就是 Vite 执行的所谓的“依赖预构建”。这个过程有两个目的:</p>
<ol>
<li>
<p><strong>CommonJS 和 UMD 兼容性:</strong> 开发阶段中，Vite 的开发服务器将所有代码视为原生 ES 模块。因此，Vite 必须先将作为 CommonJS 或 UMD 发布的依赖项转换为 ESM。</p>
<p>当转换 CommonJS 依赖时，Vite 会执行智能导入分析，这样即使导出是动态分配的（如 React），按名导入也会符合预期效果：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 符合预期</span>
<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p><strong>性能：</strong> Vite 将有许多内部模块的 ESM 依赖关系转换为单个模块，以提高后续页面加载性能。</p>
<p>一些包将它们的 ES 模块构建作为许多单独的文件相互导入。例如，<a href="https://unpkg.com/browse/lodash-es/" target="_blank" rel="noopener noreferrer"><code>lodash-es</code> 有超过 600 个内置模块<OutboundLink/></a>！当我们执行 <code>import { debounce } from 'lodash-es'</code> 时，浏览器同时发出 600 多个 HTTP 请求！尽管服务器在处理这些请求时没有问题，但大量的请求会在浏览器端造成网络拥塞，导致页面的加载速度相当慢。</p>
<p>通过预构建 <code>lodash-es</code> 成为一个模块，我们就只需要一个 HTTP 请求了！</p>
</li>
</ol>
<h3 id="自动依赖搜寻" tabindex="-1"><a class="header-anchor" href="#自动依赖搜寻" aria-hidden="true">#</a> 自动依赖搜寻</h3>
<p>如果没有找到相应的缓存，Vite 将抓取你的源码，并自动寻找引入的依赖项（即 &quot;bare import&quot;，表示期望从 <code>node_modules</code> 解析），并将这些依赖项作为预构建包的入口点。预构建通过 <code>esbuild</code> 执行，所以它通常非常快。</p>
<p>在服务器已经启动之后，如果遇到一个新的依赖关系导入，而这个依赖关系还没有在缓存中，Vite 将重新运行依赖构建进程并重新加载页面。</p>
<h3 id="monorepo-和链接依赖" tabindex="-1"><a class="header-anchor" href="#monorepo-和链接依赖" aria-hidden="true">#</a> Monorepo 和链接依赖</h3>
<p>在一个 monorepo 启动中，该仓库中的某个依赖可能会成为另一个包的依赖。Vite 会自动侦测没有从 <code>node_modules</code> 解析的依赖项，并将链接的依赖视为源码。它不会尝试打包被链接的依赖，而是会分析被链接依赖的依赖列表。</p>
<blockquote>
<p>由于依赖关系的处理方式不同，链接的依赖关系在最终构建时可能无法正常工作。 使用 <code>npm package</code> 代替所有本地依赖，以避免最终的 bundle 问题。</p>
</blockquote>
<h3 id="自定义行为" tabindex="-1"><a class="header-anchor" href="#自定义行为" aria-hidden="true">#</a> 自定义行为</h3>
<p>默认的依赖项发现为启发式可能并不总是可取的。在你想要显式地从列表中包含/排除依赖项的情况下, 请使用 <a href="https://cn.vitejs.dev/config/#dep-optimization-options" target="_blank" rel="noopener noreferrer"><code>optimizeDeps</code> 配置项<OutboundLink/></a>。</p>
<p>当你遇到不能直接在源码中发现的 import 时，<code>optimizeDeps.include</code> 或 <code>optimizeDeps.exclude</code> 就是典型的用例。例如，import 可能是插件转换的结果。这意味着 Vite 无法在初始扫描时发现 import —— 它只能在浏览器请求文件时转换后才能发现。这将导致服务器在启动后立即重新打包。</p>
<p><code>include</code> 和 <code>exclude</code> 都可以用来处理这个问题。如果依赖项很大（包含很多内部模块）或者是 CommonJS，那么你应该包含它；如果依赖项很小，并且已经是有效的 ESM，则可以排除它，让浏览器直接加载它。</p>
<h3 id="缓存" tabindex="-1"><a class="header-anchor" href="#缓存" aria-hidden="true">#</a> 缓存</h3>
<h4 id="文件系统缓存" tabindex="-1"><a class="header-anchor" href="#文件系统缓存" aria-hidden="true">#</a> 文件系统缓存</h4>
<p>Vite 会将预构建的依赖缓存到 <code>node_modules/.vite</code>。它根据几个源来决定是否需要重新运行预构建步骤:</p>
<ul>
<li><code>package.json</code> 中的 <code>dependencies</code> 列表</li>
<li>包管理器的 lockfile，例如 <code>package-lock.json</code>, <code>yarn.lock</code>，或者 <code>pnpm-lock.yaml</code></li>
<li>可能在 <code>vite.config.js</code> 相关字段中配置过的</li>
</ul>
<p>只有在上述其中一项发生更改时，才需要重新运行预构建。</p>
<p>如果出于某些原因，你想要强制 Vite 重新构建依赖，你可以用 <code>--force</code> 命令行选项启动开发服务器，或者手动删除 <code>node_modules/.vite</code> 目录。</p>
<h4 id="浏览器缓存" tabindex="-1"><a class="header-anchor" href="#浏览器缓存" aria-hidden="true">#</a> 浏览器缓存</h4>
<p>解析后的依赖请求会以 HTTP 头 <code>max-age=31536000,immutable</code> 强缓存，以提高在开发时的页面重载性能。一旦被缓存，这些请求将永远不会再到达开发服务器。如果安装了不同的版本（这反映在包管理器的 lockfile 中），则附加的版本 query 会自动使它们失效。如果你想通过本地编辑来调试依赖项，你可以:</p>
<ol>
<li>通过浏览器调试工具的 Network 选项卡暂时禁用缓存；</li>
<li>重启 Vite dev server，并添加 <code>--force</code> 命令以重新构建依赖；</li>
<li>重新载入页面。</li>
</ol>
<h2 id="静态资源处理-1" tabindex="-1"><a class="header-anchor" href="#静态资源处理-1" aria-hidden="true">#</a> 静态资源处理</h2>
<ul>
<li>相关: <a href="https://cn.vitejs.dev/guide/build.html#public-base-path" target="_blank" rel="noopener noreferrer">公共基础路径<OutboundLink/></a></li>
<li>相关: <a href="https://cn.vitejs.dev/config/#assetsinclude" target="_blank" rel="noopener noreferrer"><code>assetsInclude</code> 配置项<OutboundLink/></a></li>
</ul>
<h3 id="将资源引入为-url" tabindex="-1"><a class="header-anchor" href="#将资源引入为-url" aria-hidden="true">#</a> 将资源引入为 URL</h3>
<p>服务时引入一个静态资源会返回解析后的公共路径：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> imgUrl <span class="token keyword">from</span> <span class="token string">'./img.png'</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'hero-img'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>src <span class="token operator">=</span> imgUrl
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>例如，<code>imgUrl</code> 在开发时会是 <code>/img.png</code>，在生产构建后会是 <code>/assets/img.2d8efhg.png</code>。</p>
<p>行为类似于 Webpack 的 <code>file-loader</code>。区别在于导入既可以使用绝对公共路径（基于开发期间的项目根路径），也可以使用相对路径。</p>
<ul>
<li><code>url()</code> 在 CSS 中的引用也以同样的方式处理。</li>
<li>如果 Vite 使用了 Vue 插件，Vue SFC 模板中的资源引用都将自动转换为导入。</li>
<li>常见的图像、媒体和字体文件类型被自动检测为资源。你可以使用 <a href="https://cn.vitejs.dev/config/#assetsinclude" target="_blank" rel="noopener noreferrer"><code>assetsInclude</code> 选项<OutboundLink/></a> 扩展内部列表。</li>
<li>引用的资源作为构建资源图的一部分包括在内，将生成散列文件名，并可以由插件进行处理以进行优化。</li>
<li>较小的资源体积小于 <a href="https://cn.vitejs.dev/config/#build-assetsinlinelimit" target="_blank" rel="noopener noreferrer"><code>assetsInlineLimit</code> 选项值<OutboundLink/></a> 则会被内联为 base64 data URL。</li>
</ul>
<h4 id="显式-url-引入" tabindex="-1"><a class="header-anchor" href="#显式-url-引入" aria-hidden="true">#</a> 显式 URL 引入</h4>
<p>未被包含在内部列表或 <code>assetsInclude</code> 中的资源，可以使用 <code>?url</code> 后缀显式导入为一个 URL。这十分有用，例如，要导入 <a href="https://houdini.how/usage" target="_blank" rel="noopener noreferrer">Houdini Paint Worklets<OutboundLink/></a> 时：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> workletURL <span class="token keyword">from</span> <span class="token string">'extra-scalloped-border/worklet.js?url'</span>
<span class="token constant">CSS</span><span class="token punctuation">.</span>paintWorklet<span class="token punctuation">.</span><span class="token function">addModule</span><span class="token punctuation">(</span>workletURL<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="将资源引入为字符串" tabindex="-1"><a class="header-anchor" href="#将资源引入为字符串" aria-hidden="true">#</a> 将资源引入为字符串</h4>
<p>资源可以使用 <code>?raw</code> 后缀声明作为字符串引入。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> shaderString <span class="token keyword">from</span> <span class="token string">'./shader.glsl?raw'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="导入脚本作为-worker" tabindex="-1"><a class="header-anchor" href="#导入脚本作为-worker" aria-hidden="true">#</a> 导入脚本作为 Worker</h4>
<p>脚本可以通过 <code>?worker</code> 或 <code>?sharedworker</code> 后缀导入为 web worker。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 在生产构建中将会分离出 chunk</span>
<span class="token keyword">import</span> Worker <span class="token keyword">from</span> <span class="token string">'./shader.js?worker'</span>
<span class="token keyword">const</span> worker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Worker</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// sharedworker</span>
<span class="token keyword">import</span> SharedWorker <span class="token keyword">from</span> <span class="token string">'./shader.js?sharedworker'</span>
<span class="token keyword">const</span> sharedWorker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SharedWorker</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 内联为 base64 字符串</span>
<span class="token keyword">import</span> InlineWorker <span class="token keyword">from</span> <span class="token string">'./shader.js?worker&amp;inline'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>查看 <a href="https://cn.vitejs.dev/guide/features.html#web-workers" target="_blank" rel="noopener noreferrer">Web Worker 小节<OutboundLink/></a> 获取更多细节。</p>
<h4 id="public-目录" tabindex="-1"><a class="header-anchor" href="#public-目录" aria-hidden="true">#</a> <code>public</code> 目录</h4>
<p>如果你有下列这些资源：</p>
<ul>
<li>不会被源码引用（例如 <code>robots.txt</code>）</li>
<li>必须保持原有文件名（没有经过 hash）</li>
<li>...或者你压根不想引入该资源，只是想得到其 URL。</li>
</ul>
<p>那么你可以将该资源放在指定的 <code>public</code> 目录中，它应位于你的项目根目录。该目录中的资源在开发时能直接通过 <code>/</code> 根路径访问到，并且打包时会被完整复制到目标目录的根目录下。</p>
<p>目录默认是 <code>&lt;root&gt;/public</code>，但可以通过 <a href="https://cn.vitejs.dev/config/#publicdir" target="_blank" rel="noopener noreferrer"><code>publicDir</code> 选项<OutboundLink/></a> 来配置。</p>
<p>请注意：</p>
<ul>
<li>引入 <code>public</code> 中的资源永远应该使用根绝对路径 —— 举个例子，<code>public/icon.png</code> 应该在源码中被引用为 <code>/icon.png</code>。</li>
<li><code>public</code> 中的资源不应该被 JavaScript 文件引用。</li>
</ul>
<h3 id="new-url-url-import-meta-url" tabindex="-1"><a class="header-anchor" href="#new-url-url-import-meta-url" aria-hidden="true">#</a> new URL(url, import.meta.url)</h3>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta" target="_blank" rel="noopener noreferrer">import.meta.url<OutboundLink/></a> 是一个 ESM 的原生功能，会暴露当前模块的 URL。将它与原生的 <a href="https://developer.mozilla.org/en-US/docs/Web/API/URL" target="_blank" rel="noopener noreferrer">URL 构造器<OutboundLink/></a> 组合使用，在一个 JavaScript 模块中，通过相对路径我们就能得到一个被完整解析的静态资源 URL：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> imgUrl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">'./img.png'</span><span class="token punctuation">,</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span>href

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'hero-img'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>src <span class="token operator">=</span> imgUrl
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这在现代浏览器中能够原生使用 - 实际上，Vite 并不需要在开发阶段处理这些代码！</p>
<p>这个模式同样还可以通过字符串模板支持动态 URL：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getImageUrl</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">./dir/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.png</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span>href
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在生产构建时，Vite 才会进行必要的转换保证 URL 在打包和资源哈希后仍指向正确的地址。</p>
<blockquote>
<p>注意：无法在 SSR 中使用</p>
<p>如果你正在以服务端渲染模式使用 Vite 则此模式不支持，因为 <code>import.meta.url</code> 在浏览器和 Node.js 中有不同的语义。服务端的产物也无法预先确定客户端主机 URL。</p>
</blockquote>
<h2 id="构建生产版本" tabindex="-1"><a class="header-anchor" href="#构建生产版本" aria-hidden="true">#</a> 构建生产版本</h2>
<p>当需要将应用部署到生产环境时，只需运行 <code>vite build</code> 命令。默认情况下，它使用 <code>&lt;root&gt;/index.html</code> 作为其构建入口点，并生成能够静态部署的应用程序包。请查阅 <a href="https://cn.vitejs.dev/guide/static-deploy.html" target="_blank" rel="noopener noreferrer">部署静态站点<OutboundLink/></a> 获取常见服务的部署指引。</p>
<h3 id="浏览器兼容性" tabindex="-1"><a class="header-anchor" href="#浏览器兼容性" aria-hidden="true">#</a> 浏览器兼容性</h3>
<p>默认情况下，Vite 的目标浏览器是指能够 <a href="https://caniuse.com/es6-module" target="_blank" rel="noopener noreferrer">支持原生 ESM script 标签<OutboundLink/></a> 和 <a href="https://caniuse.com/es6-module-dynamic-import" target="_blank" rel="noopener noreferrer">支持原生 ESM 动态导入<OutboundLink/></a> 的。你也可以通过 <a href="https://cn.vitejs.dev/config/#build-target" target="_blank" rel="noopener noreferrer"><code>build.target</code> 配置项<OutboundLink/></a> 指定构建目标，最低支持 <code>es2015</code>。</p>
<p>请注意，默认情况下 Vite 只处理语法转译，且 <strong>默认不包含任何 polyfill</strong>。你可以前往 <a href="https://polyfill.io/v3/" target="_blank" rel="noopener noreferrer">Polyfill.io<OutboundLink/></a> 查看，这是一个基于用户浏览器 User-Agent 字符串自动生成 polyfill 包的服务。</p>
<h3 id="公共基础路径" tabindex="-1"><a class="header-anchor" href="#公共基础路径" aria-hidden="true">#</a> 公共基础路径</h3>
<ul>
<li>相关内容：<a href="https://cn.vitejs.dev/guide/assets.html" target="_blank" rel="noopener noreferrer">静态资源处理<OutboundLink/></a></li>
</ul>
<p>如果你需要在嵌套的公共路径下部署项目，只需指定 <a href="https://cn.vitejs.dev/config/#base" target="_blank" rel="noopener noreferrer"><code>base</code> 配置项<OutboundLink/></a>，然后所有资源的路径都将据此配置重写。这个选项也可以通过命令行参数指定，例如 <code>vite build --base=/my/public/path/</code>。</p>
<p>由 JS 引入的资源 URL，CSS 中的 <code>url()</code> 引用以及 <code>.html</code> 文件中引用的资源在构建过程中都会自动调整，以适配此选项。</p>
<p>当然，情况也有例外，当访问过程中需要使用动态连接的 url 时，可以使用全局注入的 <code>import.meta.env.BASE_URL</code> 变量，它的值为公共基础路径。注意，这个变量在构建时会被静态替换，因此，它必须按 <code>import.meta.env.BASE_URL</code> 的原样出现（例如 <code>import.meta.env['BASE_URL']</code> 是无效的）</p>
<h3 id="自定义构建" tabindex="-1"><a class="header-anchor" href="#自定义构建" aria-hidden="true">#</a> 自定义构建</h3>
<p>构建过程可以通过多种 <a href="https://cn.vitejs.dev/config/#build-options" target="_blank" rel="noopener noreferrer">构建配置选项<OutboundLink/></a> 来自定义构建。具体来说，你可以通过 <code>build.rollupOptions</code> 直接调整底层的 <a href="https://rollupjs.org/guide/en/#big-list-of-options" target="_blank" rel="noopener noreferrer">Rollup 选项<OutboundLink/></a>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// vite.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  build<span class="token operator">:</span> <span class="token punctuation">{</span>
    rollupOptions<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// https://rollupjs.org/guide/en/#big-list-of-options</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>例如，你可以使用仅在构建期间应用的插件来指定多个 Rollup 输出。</p>
<h3 id="文件变化时重新构建" tabindex="-1"><a class="header-anchor" href="#文件变化时重新构建" aria-hidden="true">#</a> 文件变化时重新构建</h3>
<p>你可以使用 <code>vite build --watch</code> 来启用 rollup 的监听器。或者，你可以直接通过 <code>build.watch</code> 调整底层的 <a href="https://rollupjs.org/guide/en/#watch-options" target="_blank" rel="noopener noreferrer"><code>WatcherOptions</code><OutboundLink/></a> 选项：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// vite.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  build<span class="token operator">:</span> <span class="token punctuation">{</span>
    watch<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// https://rollupjs.org/guide/en/#watch-options</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="多页面应用模式" tabindex="-1"><a class="header-anchor" href="#多页面应用模式" aria-hidden="true">#</a> 多页面应用模式</h3>
<p>假设你有下面这样的项目文件结构</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>├── package.json
├── vite.config.js
├── index.html
├── main.js
└── nested
    ├── index.html
    └── nested.js
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>在开发过程中，简单地导航或链接到 <code>/nested/</code> - 将会按预期工作，与正常的静态文件服务器表现一致。</p>
<p>在构建过程中，你只需指定多个 <code>.html</code> 文件作为入口点即可：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// vite.config.js</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> resolve <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vite'</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  build<span class="token operator">:</span> <span class="token punctuation">{</span>
    rollupOptions<span class="token operator">:</span> <span class="token punctuation">{</span>
      input<span class="token operator">:</span> <span class="token punctuation">{</span>
        main<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'index.html'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        nested<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'nested/index.html'</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>如果你指定了另一个根目录，请记住，在解析输入路径时，<code>__dirname</code> 的值将仍然是 vite.config.js 文件所在的目录。因此，你需要把对应入口文件的 <code>root</code> 的路径添加到 <code>resolve</code> 的参数中。</p>
<h3 id="库模式" tabindex="-1"><a class="header-anchor" href="#库模式" aria-hidden="true">#</a> 库模式</h3>
<p>当你开发面向浏览器的库时，你可能会将大部分时间花在该库的测试/演示页面上。在 Vite 中你可以使用 <code>index.html</code> 获得如丝般顺滑的开发体验。</p>
<p>当这个库要进行发布构建时，请使用 <a href="https://cn.vitejs.dev/config/#build-lib" target="_blank" rel="noopener noreferrer"><code>build.lib</code> 配置项<OutboundLink/></a>，以确保将那些你不想打包进库的依赖进行外部化处理，例如 <code>vue</code> 或 <code>react</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// vite.config.js</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vite'</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  build<span class="token operator">:</span> <span class="token punctuation">{</span>
    lib<span class="token operator">:</span> <span class="token punctuation">{</span>
      entry<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'lib/main.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      name<span class="token operator">:</span> <span class="token string">'MyLib'</span><span class="token punctuation">,</span>
      <span class="token function-variable function">fileName</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">format</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">my-lib.</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>format<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.js</span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    rollupOptions<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 确保外部化处理那些你不想打包进库的依赖</span>
      external<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'vue'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      output<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量</span>
        globals<span class="token operator">:</span> <span class="token punctuation">{</span>
          vue<span class="token operator">:</span> <span class="token string">'Vue'</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>使用如上配置运行 <code>vite build</code> 时，将会使用一套面向库的 Rollup 预设，并且将为该库提供两种构建格式：<code>es</code> 和 <code>umd</code> (可在 <code>build.lib</code> 中配置)：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ vite build
building <span class="token keyword">for</span> production<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>write<span class="token punctuation">]</span> my-lib.es.js <span class="token number">0</span>.08kb, brotli: <span class="token number">0</span>.07kb
<span class="token punctuation">[</span>write<span class="token punctuation">]</span> my-lib.umd.js <span class="token number">0</span>.30kb, brotli: <span class="token number">0</span>.16kb
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>推荐在你库的 <code>package.json</code> 中使用如下格式：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token string">"name"</span><span class="token builtin class-name">:</span> <span class="token string">"my-lib"</span>,
  <span class="token string">"files"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">"dist"</span><span class="token punctuation">]</span>,
  <span class="token string">"main"</span><span class="token builtin class-name">:</span> <span class="token string">"./dist/my-lib.umd.js"</span>,
  <span class="token string">"module"</span><span class="token builtin class-name">:</span> <span class="token string">"./dist/my-lib.es.js"</span>,
  <span class="token string">"exports"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">"."</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">"import"</span><span class="token builtin class-name">:</span> <span class="token string">"./dist/my-lib.es.js"</span>,
      <span class="token string">"require"</span><span class="token builtin class-name">:</span> <span class="token string">"./dist/my-lib.umd.js"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="环境变量和模式" tabindex="-1"><a class="header-anchor" href="#环境变量和模式" aria-hidden="true">#</a> 环境变量和模式</h2>
<h3 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h3>
<p>Vite 在一个特殊的 <strong><code>import.meta.env</code></strong> 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量：</p>
<ul>
<li><strong><code>import.meta.env.MODE</code></strong>: {string} 应用运行的<a href="https://cn.vitejs.dev/guide/env-and-mode.html#modes" target="_blank" rel="noopener noreferrer">模式<OutboundLink/></a>。</li>
<li><strong><code>import.meta.env.BASE_URL</code></strong>: {string} 部署应用时的基本 URL。他由<a href="https://cn.vitejs.dev/config/#base" target="_blank" rel="noopener noreferrer"><code>base</code> 配置项<OutboundLink/></a>决定。</li>
<li><strong><code>import.meta.env.PROD</code></strong>: {boolean} 应用是否运行在生产环境。</li>
<li><strong><code>import.meta.env.DEV</code></strong>: {boolean} 应用是否运行在开发环境 (永远与 <code>import.meta.env.PROD</code>相反)。</li>
</ul>
<h4 id="生产环境替换" tabindex="-1"><a class="header-anchor" href="#生产环境替换" aria-hidden="true">#</a> 生产环境替换</h4>
<p>在生产环境中，这些环境变量会在构建时被<strong>静态替换</strong>，因此，在引用它们时请使用完全静态的字符串。动态的 key 将无法生效。例如，动态 key 取值 <code>import.meta.env[key]</code> 是无效的。</p>
<p>它还将替换出现在 JavaScript 和 Vue 模板中的字符串。这本应是非常少见的，但也可能是不小心为之的。在这种情况下你可能会看到类似 <code>Missing Semicolon</code> 或 <code>Unexpected token</code> 等错误，例如当 <code>&quot;process.env.NODE_ENV&quot;</code> 被替换为 <code>&quot;&quot;development&quot;: &quot;</code>。有一些方法可以避免这个问题：</p>
<ul>
<li>对于 JavaScript 字符串，你可以使用 unicode 零宽度空格 <strong><code>\u200b</code></strong> (一个看不见的分隔符)来分割这个字符串，例如： <code>'import.meta\u200b.env.MODE'</code>。</li>
<li>对于 Vue 模板或其他编译到 JavaScript 字符串的 HTML，你可以使用 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr" target="_blank" rel="noopener noreferrer">`` 标签<OutboundLink/></a>，例如：<code>import.meta.&lt;wbr&gt;env.MODE</code>。</li>
</ul>
<h3 id="env-文件" tabindex="-1"><a class="header-anchor" href="#env-文件" aria-hidden="true">#</a> <code>.env</code> 文件</h3>
<p>Vite 使用 <a href="https://github.com/motdotla/dotenv" target="_blank" rel="noopener noreferrer">dotenv<OutboundLink/></a> 从你的 <a href="https://cn.vitejs.dev/config/#envdir" target="_blank" rel="noopener noreferrer">环境目录<OutboundLink/></a> 中的下列文件加载额外的环境变量：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>加载的环境变量也会通过 <code>import.meta.env</code> 暴露给客户端源码。</p>
<p>为了防止意外地将一些环境变量泄漏到客户端，只有以 <code>VITE_</code> 为前缀的变量才会暴露给经过 vite 处理的代码。例如下面这个文件中：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>DB_PASSWORD=foobar
VITE_SOME_KEY=123
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>只有 <code>VITE_SOME_KEY</code> 会被暴露为 <code>import.meta.env.VITE_SOME_KEY</code> 提供给客户端源码，而 <code>DB_PASSWORD</code> 则不会。</p>
<p>如果你想自定义 env 变量的前缀，请参阅 <a href="https://cn.vitejs.dev/config/index.html#envprefix" target="_blank" rel="noopener noreferrer">envPrefix<OutboundLink/></a>。</p>
<p>安全注意事项</p>
<ul>
<li><code>.env.*.local</code> 文件应是本地的，可以包含敏感变量。你应该将 <code>.local</code> 添加到你的 <code>.gitignore</code> 中，以避免它们被 git 检入。</li>
<li>由于任何暴露给 Vite 源码的变量最终都将出现在客户端包中，<code>VITE_*</code> 变量应该不包含任何敏感信息。</li>
</ul>
<h4 id="智能提示" tabindex="-1"><a class="header-anchor" href="#智能提示" aria-hidden="true">#</a> 智能提示</h4>
<p>默认情况下，Vite 为 <code>import.meta.env</code> 提供了类型定义。随着在 <code>.env[mode]</code> 文件中自定义了越来越多的环境变量，你可能想要在代码中获取这些以 <code>VITE_</code> 为前缀的用户自定义环境变量的 TypeScript 智能提示。</p>
<p>要想做到这一点，你可以在 <code>src</code> 目录下创建一个 <code>env.d.ts</code> 文件，接着按下面这样增加 <code>ImportMetaEnv</code> 的定义：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>interface ImportMetaEnv extends Readonly&lt;Record&lt;string, string>> {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="模式" tabindex="-1"><a class="header-anchor" href="#模式" aria-hidden="true">#</a> 模式</h3>
<p>默认情况下，开发服务器 (<code>dev</code> 命令) 运行在 <code>development</code> (开发) 模式，而 <code>build</code> 以及 <code>serve</code> 命令则运行在 <code>production</code> (生产) 模式。</p>
<p>这意味着当执行 <code>vite build</code> 时，它会自动加载 <code>.env.production</code> 中可能存在的环境变量：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># .env.production
VITE_APP_TITLE=My App
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>在你的应用中，你可以使用 <code>import.meta.env.VITE_APP_TITLE</code> 渲染标题。</p>
<p>然而，重要的是要理解 <strong>模式</strong> 是一个更广泛的概念，而不仅仅是开发和生产。一个典型的例子是，你可能希望有一个 “staging” (预发布|预上线) 模式，它应该具有类似于生产的行为，但环境变量与生产环境略有不同。</p>
<p>你可以通过传递 <code>--mode</code> 选项标志来覆盖命令使用的默认模式。例如，如果你想为我们假设的 staging 模式构建应用：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>vite build --mode staging
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>为了使应用实现预期行为，我们还需要一个 <code>.env.staging</code> 文件：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># .env.staging
NODE_ENV=production
VITE_APP_TITLE=My App (staging)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>现在，你的 staging 应用应该具有类似于生产的行为，但显示的标题与生产环境不同。</p>
</template>
