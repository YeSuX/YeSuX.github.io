# 前端规范代码检查工具的最佳实践

[[toc]]

## 浅谈前端团队规范化

前端团队规范化是一个重要的工作，它可以帮助提高团队的生产力，改善代码质量，提高开发效率，并且有助于提高团队的凝聚力。前端团队规范化主要分为三方面：团队沉淀，代码质量，工作流程。

团队沉淀主要为文档规范、技术沉淀。

工作流程主要为工作流规范、前后端协作规范、测试规范。

代码质量主要为技术栈规范、浏览器兼容规范、项目组织规范、异常处理规范、编码规范。

![前端团队规范](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/60bf6967-84d0-480d-b848-81489fce9d66/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230227T021605Z&X-Amz-Expires=86400&X-Amz-Signature=b3d3a91dbb3b70d0166160a9fc9a3f3223b83ea89f0984550673c59ecd54d425&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

其中，代码质量是前端团队规范化中的关键，而编码规范又是代码质量中十分重要的一环。就编码规范而言，我们应该采取有效的措施来确保编码规范的一致性。具体措施主要分为三类：

1. 统一团队成员使用的编码规范。
2. 使用适当的代码检查工具，如ESLint、Prettier等，以确保代码符合编码规范。
3. 经常性进行代码审查，以保证代码质量。

本文将重点展示如何通过代码检查工具保证代码质量规范化的强制执行，以及它们对于团队的重要性，以便帮助团队更好地实现其核心任务。

## 痛点问题

市面上存在许多前端检查工具。总体感觉是杂乱无章的，因为不同的前端规范和框架对应的前端检查工具不尽相同，并且每个前端检查工具的规则也是又多又杂。

我将常用的前端检查工具进行梳理。如下图所示：

![前端规范工具梳理](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/32ffe248-a686-4536-90f8-7ddd8824e561/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230227T021947Z&X-Amz-Expires=86400&X-Amz-Signature=781449ecc02d9dfd9541d629f5df84b94e434a7372a0a3f28f1012144ffcbd38&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

## 检查工具详解

### Git规范

**工具介绍**

1. [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)：git生命周期钩子
2. [cz-git](https://github.com/Zhengqbbb/cz-git)：输出标准格式的 commitizen 适配器和 CLI
3. [commitlint](https://github.com/conventional-changelog/commitlint)：commit信息校验CLI
4. [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)：commit信息校验规范rules

**工具配置**

命令行中安装相应依赖：

```bash
npm install -D @commitlint/{config-conventional,cli} cz-git simple-git-hooks
```

在`package.json` 中添加执行脚本：

```json
{
	"script":{
		"preinstall":"simple-git-hooks",
		"commit":"git add . && czg"
	}
}
```

并且在主目录中添加`.simple-git-hook.js`文件：

```jsx
modules.exports = {
	"commit-msg":"npm exec commitlint --edit $1"
}
```

添加`.commitlintrc.js` 文件：

```jsx
modules.exports = {
	extends:["@commitlint/config-conventional"],
	prompt:{
		useEmoji:false,
		enableMutipleScopess:true,
		scopeEnumSeparator:",",
	}
}
```

### 代码格式化

**工具介绍**

1. [prettier](https://prettier.io/)：自动代码格式化工具。
2. [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)：基于 prettier 代码风格的 eslint 规则，即eslint使用pretter规则来格式化代码。
3. [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)：禁用所有与格式相关的 eslint 规则，解决 prettier 与 eslint 规则冲突，**确保将其放在 extends 队列最后，这样它将覆盖其他配置。**

**工具配置**

命令行中安装相应依赖：

```bash
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

在`package.json` 中添加执行脚本：

```json
{
	"script":{
		"format":"prettier src/**/*.{js,jsx,ts,tsx,json,html,css,scss,less} --write",
	}
}
```

添加`.prettierrc.js` 文件：

```jsx
module.exports = {
  semi: false,
  singleQuote: true,
}
```

### Vscode规范

通过修改vscode配置文件进行配置vscode设置以及插件。

**工具配置**

添加`vscode/setting.json`文件：

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "javascript.suggestionActions.enabled": false,
  "npm.packageManager": "pnpm",
  "editor.fontSize": 14,
  "editor.lineNumbers": "on",
  "editor.formatOnSave": true,
  "editor.suggestSelection": "first",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true,
    "source.fixAll.markdownlint": true,
  },
  "editor.snippetSuggestions": "top",
  "editor.multiCursorModifier": "ctrlCmd",
  "editor.formatOnPaste": false,
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "editor.detectIndentation": true,
  "editor.minimap.enabled": false,
  "editor.largeFileOptimizations": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.probe": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "html",
    "vue",
    "markdown",
    "json",
    "jsonc"
  ],
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "html",
    "vue",
    "markdown",
    "json",
    "jsonc"
  ],

  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "stylelint.enable": true,
  // "stylelint.packageManager": "pnpm",
  "stylelint.validate": ["css", "less", "scss", "sass", "postcss", "vue"],

  "files.autoSave": "afterDelay", // 自动保存
  "files.eol": "\n",
  // 在使用搜索功能时，将这些文件夹/文件排除在外
  "search.exclude": {
    "**/node_modules": true,
    "**/*.log": true,
    "**/*.log*": true,
    "**/bower_components": true,
    "**/dist": true,
    "**/elehukouben": true,
    "**/.git": true,
    "**/.gitignore": true,
    "**/.svn": true,
    "**/.DS_Store": true,
    "**/.idea": true,
    "**/.vscode": false,
    "**/yarn.lock": true,
    "**/pnpm-lock.yaml": true,
    "**/tmp": true,
    "out": true,
    "dist": true,
    "node_modules": true,
    "CHANGELOG.md": true,
    "examples": true,
    "res": true,
    "screenshots": true,
    "yarn-error.log": true,
    "**/.yarn": true
  },
  "files.exclude": {
    "**/.cache": true,
    "**/.editorconfig": true,
    "**/.eslintignore": true,
    "**/.prettierignore": true,
    "**/.stylelintignore": true,
    "**/LICENSE": true,
    "**/.eslintcache": true,
    "**/bower_components": true,
    "**/.idea": true,
    "**/tmp": true,
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/*.meta": true,
    "**/*.*.meta": true,
    "**/*.unity": true,
    "**/*.unityproj": true,
    "**/*.mat": true,
    "**/*.fbx": true,
    "**/*.FBX": true,
    "**/*.tga": true,
    "**/*.cubemap": true,
    "**/*.prefab": true,
    "**/Library": true,
    "**/ProjectSettings": true,
    "**/Temp": true
  },
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/.vscode/**": true,
    "**/node_modules/**": true,
    "**/tmp/**": true,
    "**/bower_components/**": true,
    "**/dist/**": true,
    "**/yarn.lock": true,
    "**/pnpm-lock.yaml": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "DavidAnson.vscode-markdownlint"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

添加`vscode/extensions.json`文件：

```json
{
  "recommendations": [
    "formulahendry.auto-close-tag",
    "formulahendry.auto-complete-tag",
    "steoates.autoimport",
    "formulahendry.auto-rename-tag",
    "pranaygp.vscode-css-peek",
    "mikestead.dotenv",
    "dbaeumer.vscode-eslint",
    "antfu.iconify",
    "wix.vscode-import-cost",
    "xabikos.javascriptsnippets",
    "akamud.vscode-javascript-snippet-pack",
    "obkoro1.korofileheader",
    "mrmlnc.vscode-less",
    "DavidAnson.vscode-markdownlint",
    "leizongmin.node-module-intellisense",
    "christian-kohler.path-intellisense",
    "esbenp.prettier-vscode",
    "mohsen1.prettify-json",
    "2gua.rainbow-brackets",
    "mrmlnc.vscode-scss",
    "stylelint.vscode-stylelint",
    "Vue.volar",
    "Vue.vscode-typescript-vue-plugin",
    "misterj.vue-volar-extention-pack",
    "sdras.vue-vscode-snippets"
  ]
}
```

### 样式代码规范

**工具介绍**

1. [stylelint](https://stylelint.io/): `css`样式lint工具
2. [postcss](https://www.postcss.com.cn/): 转换`css`代码工具
3. [postcss-less](https://github.com/shellscape/postcss-less): 识别`less`语法
4. [postcss-scss](https://github.com/shellscape/postcss-less): 识别`scss`语法
5. [postcss-html](https://github.com/gucong3000/postcss-html): 识别html/vue 中的`<style></style>`标签中的样式
6. [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard): `Stylelint`的标准可共享配置规则，详细可查看官方文档
7. [stylelint-config-recommended-](https://github.com/ssivanatarajan/stylelint-config-recommended-less)vue: `vue`的推荐可共享配置规则，详细可查看官方文档
8. [stylelint-less](https://github.com/ssivanatarajan/stylelint-less): `stylelint-config-recommended-less`的依赖，`less`的`stylelint`规则集合
9. [stylelint-order](https://github.com/hudochenkov/stylelint-order): 指定样式书写的顺序，在`.stylelintrc.js`中`order/properties-order`指定顺序

**工具配置**

命令行中安装相应依赖：

```bash
npm install -D stylelint postcss stylelint-order stylelint-config-standard stylelint-config-recommended
```

vue项目需要安装：

```bash
npm install -D stylelint-config-recommended-vue postcss-html
```

less或scss项目需要分别安装：

```bash
npm install -D postcss-less
```

```bash
npm install -D postcss-scss
```

添加`.stylelintrc.js`文件：

```jsx
module.exports = {
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-html',
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
          // // scss
          // 'at-root',
          // 'use',
          // 'forward',
          // 'return',
        ],
      },
    ],
    'no-empty-source': null,
    'string-quotes': null,
    'named-grid-areas-no-invalid': null,
    'unicode-bom': 'never',
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    // 'declaration-block-trailing-semicolon': 'always',
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          type: 'at-rule',
          name: 'supports',
        },
        {
          type: 'at-rule',
          name: 'media',
        },
        'rules',
      ],
      { severity: 'warning' },
    ],
    'order/properties-order': [
      {
        // Must be first.
        properties: ['all'],
      },
      {
        // Position.
        properties: [
          'position',
          'inset',
          'inset-block',
          'inset-inline',
          'top',
          'right',
          'bottom',
          'left',
          'z-index',
        ],
      },
      {
        // Display mode.
        properties: ['box-sizing', 'display'],
      },
      {
        // Flexible boxes.
        properties: [
          'flex',
          'flex-basis',
          'flex-direction',
          'flex-flow',
          'flex-grow',
          'flex-shrink',
          'flex-wrap',
        ],
      },
      {
        // Grid layout.
        properties: [
          'grid',
          'grid-area',
          'grid-template',
          'grid-template-areas',
          'grid-template-rows',
          'grid-template-columns',
          'grid-row',
          'grid-row-start',
          'grid-row-end',
          'grid-column',
          'grid-column-start',
          'grid-column-end',
          'grid-auto-rows',
          'grid-auto-columns',
          'grid-auto-flow',
          'grid-gap',
          'grid-row-gap',
          'grid-column-gap',
        ],
      },
      {
        // Gap.
        properties: ['gap', 'row-gap', 'column-gap'],
      },
      {
        // Layout alignment.
        properties: [
          'place-content',
          'place-items',
          'place-self',
          'align-content',
          'align-items',
          'align-self',
          'justify-content',
          'justify-items',
          'justify-self',
        ],
      },
      {
        // Order.
        properties: ['order'],
      },
      {
        // Box model.
        properties: [
          'float',
          'width',
          'min-width',
          'max-width',
          'height',
          'min-height',
          'max-height',
          'aspect-ratio',
          'padding',
          'padding-block',
          'padding-block-start',
          'padding-block-end',
          'padding-inline',
          'padding-inline-start',
          'padding-inline-end',
          'padding-top',
          'padding-right',
          'padding-bottom',
          'padding-left',
          'margin',
          'margin-block',
          'margin-block-start',
          'margin-block-end',
          'margin-inline',
          'margin-inline-start',
          'margin-inline-end',
          'margin-top',
          'margin-right',
          'margin-bottom',
          'margin-left',
          'overflow',
          'overflow-x',
          'overflow-y',
          '-webkit-overflow-scrolling',
          '-ms-overflow-x',
          '-ms-overflow-y',
          '-ms-overflow-style',
          'overscroll-behavior',
          'overscroll-behavior-x',
          'overscroll-behavior-y',
          'overscroll-behavior-inline',
          'overscroll-behavior-block',
          'clip',
          'clip-path',
          'clear',
        ],
      },
      {
        // Typography.
        properties: [
          'font',
          'font-family',
          'font-size',
          'font-variation-settings',
          'font-style',
          'font-weight',
          'font-feature-settings',
          'font-optical-sizing',
          'font-kerning',
          'font-variant',
          'font-variant-ligatures',
          'font-variant-caps',
          'font-variant-alternates',
          'font-variant-numeric',
          'font-variant-east-asian',
          'font-variant-position',
          'font-size-adjust',
          'font-stretch',
          'font-effect',
          'font-emphasize',
          'font-emphasize-position',
          'font-emphasize-style',
          '-webkit-font-smoothing',
          '-moz-osx-font-smoothing',
          'font-smooth',
          'hyphens',
          'line-height',
          'color',
          'text-align',
          'text-align-last',
          'text-emphasis',
          'text-emphasis-color',
          'text-emphasis-style',
          'text-emphasis-position',
          'text-decoration',
          'text-decoration-line',
          'text-decoration-thickness',
          'text-decoration-style',
          'text-decoration-color',
          'text-underline-position',
          'text-underline-offset',
          'text-indent',
          'text-justify',
          'text-outline',
          '-ms-text-overflow',
          'text-overflow',
          'text-overflow-ellipsis',
          'text-overflow-mode',
          'text-shadow',
          'text-transform',
          'text-wrap',
          '-webkit-text-size-adjust',
          '-ms-text-size-adjust',
          'letter-spacing',
          'word-break',
          'word-spacing',
          'word-wrap', // Legacy name for `overflow-wrap`
          'overflow-wrap',
          'tab-size',
          'white-space',
          'vertical-align',

          'list-style',
          'list-style-position',
          'list-style-type',
          'list-style-image',

          'src',
          'font-display',
          'unicode-range',
          'size-adjust',
          'ascent-override',
          'descent-override',
          'line-gap-override',
        ],
      },
      {
        // Accessibility & Interactions.
        properties: [
          'pointer-events',
          '-ms-touch-action',
          'touch-action',
          'cursor',
          'visibility',
          'zoom',
          'table-layout',
          'empty-cells',
          'caption-side',
          'border-spacing',
          'border-collapse',
          'content',
          'quotes',
          'counter-reset',
          'counter-increment',
          'resize',
          'user-select',
          'nav-index',
          'nav-up',
          'nav-right',
          'nav-down',
          'nav-left',
        ],
      },
      {
        // Background & Borders.
        properties: [
          'background',
          'background-color',
          'background-image',
          "-ms-filter:\\'progid:DXImageTransform.Microsoft.gradient",
          'filter:progid:DXImageTransform.Microsoft.gradient',
          'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader',
          'filter',
          'background-repeat',
          'background-attachment',
          'background-position',
          'background-position-x',
          'background-position-y',
          'background-clip',
          'background-origin',
          'background-size',
          'background-blend-mode',
          'isolation',
          'border',
          'border-color',
          'border-style',
          'border-width',
          'border-block',
          'border-block-start',
          'border-block-start-color',
          'border-block-start-style',
          'border-block-start-width',
          'border-block-end',
          'border-block-end-color',
          'border-block-end-style',
          'border-block-end-width',
          'border-inline',
          'border-inline-start',
          'border-inline-start-color',
          'border-inline-start-style',
          'border-inline-start-width',
          'border-inline-end',
          'border-inline-end-color',
          'border-inline-end-style',
          'border-inline-end-width',
          'border-top',
          'border-top-color',
          'border-top-style',
          'border-top-width',
          'border-right',
          'border-right-color',
          'border-right-style',
          'border-right-width',
          'border-bottom',
          'border-bottom-color',
          'border-bottom-style',
          'border-bottom-width',
          'border-left',
          'border-left-color',
          'border-left-style',
          'border-left-width',
          'border-radius',
          'border-start-start-radius',
          'border-start-end-radius',
          'border-end-start-radius',
          'border-end-end-radius',
          'border-top-left-radius',
          'border-top-right-radius',
          'border-bottom-right-radius',
          'border-bottom-left-radius',
          'border-image',
          'border-image-source',
          'border-image-slice',
          'border-image-width',
          'border-image-outset',
          'border-image-repeat',
          'outline',
          'outline-width',
          'outline-style',
          'outline-color',
          'outline-offset',
          'box-shadow',
          'mix-blend-mode',
          'filter:progid:DXImageTransform.Microsoft.Alpha(Opacity',
          "-ms-filter:\\'progid:DXImageTransform.Microsoft.Alpha",
          'opacity',
          '-ms-interpolation-mode',
        ],
      },
      {
        // SVG Presentation Attributes.
        properties: [
          'alignment-baseline',
          'baseline-shift',
          'dominant-baseline',
          'text-anchor',
          'word-spacing',
          'writing-mode',

          'fill',
          'fill-opacity',
          'fill-rule',
          'stroke',
          'stroke-dasharray',
          'stroke-dashoffset',
          'stroke-linecap',
          'stroke-linejoin',
          'stroke-miterlimit',
          'stroke-opacity',
          'stroke-width',

          'color-interpolation',
          'color-interpolation-filters',
          'color-profile',
          'color-rendering',
          'flood-color',
          'flood-opacity',
          'image-rendering',
          'lighting-color',
          'marker-start',
          'marker-mid',
          'marker-end',
          'mask',
          'shape-rendering',
          'stop-color',
          'stop-opacity',
        ],
      },
      {
        // Transitions & Animation.
        properties: [
          'transition',
          'transition-delay',
          'transition-timing-function',
          'transition-duration',
          'transition-property',
          'transform',
          'transform-origin',
          'animation',
          'animation-name',
          'animation-duration',
          'animation-play-state',
          'animation-timing-function',
          'animation-delay',
          'animation-iteration-count',
          'animation-direction',
        ],
      },
    ],

    // // scss
    // 'scss/operator-no-newline-after': null,
    // 'block-closing-brace-newline-after': null,
    // 'at-rule-empty-line-before': null,
    // 'function-name-case': null,
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json'],
}
```

在`package.json` 中添加执行脚本：

```json
{
	"script":{
		"lint:style": "stylelint \"./**/*.{css,less,vue,html}\" --fix",
	}
}
```

### 代码语法规范

**工具介绍**

eslint：语法检查工具

**工具配置**

安装依赖：

```bash
pnpm add eslint -D
```

执行eslint初始化命令：

```bash
pnpm eslint --init
```

依次选择初始化选项。随后会安装相关依赖，依赖安装完成后，会生成`.eslintrc.js`配置文件

**angular配置**

angular暂不支持通过eslint脚手架配置。我们可以通过执行脚本进行配置：

```bash
ng add @angular-eslint/schematics
```

## 通过`monorepo`管理检查工具项目

## 搭建检查工具脚手架——傻瓜式配置检查工具

## 个人思考

1. 规范应通过工具进行强制约束