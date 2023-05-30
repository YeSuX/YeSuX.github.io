# 探究 JSX

[[toc]]

## JSX是什么？

JSX是React中一种用于描述UI的语法扩展，它允许开发者在javascript代码中编写类似于HTML的标记语言，以便更直观地描述UI的结构和样式。在JSX中，可以使用类似HTML的标签、属性和表达式，以及一些特殊的语法来描述组件的渲染逻辑。举个例子：

```jsx
function Hello() {
  return <div>Hello, Cooper!</div>;
}
```

在这个例子中，`<div>`和`</div>` 就是JSX标签。在编译时，React会将JSX代码转换成对应的JavaScript代码，以便在浏览器中执行。

那么，jsx是如何被解析为javascript代码的呢？

## Babel解析JSX原理

在React中，JSX代码需要经过Babel转换才能被解析为JavaScript代码。这个转换过程主要是由`@babel/plugin-syntax-jsx` 和`@babel/plugin-transform-react-jsx` 这两个插件完成的。我简单介绍一下这两个插件：

- `@babel/plugin-syntax-jsx` ：该插件能够让Babel有效解析JSX语法。
- `@babel/plugin-transform-react-jsx` ：该插件内部调用了`@babel/plugin-syntax-jsx` ，可以将React JSX转化成javascript代码。

那么具体这两个插件是如何实现JSX解析的呢？

1. 词法分析：Babel会先对JSX代码进行词法分析，将代码分解成一个个的词法单元（Token），例如标识符、运算符、关键字等。
2. 语法分析：Babel会对词法单元进行语法分析，生成一个特定AST，用于表示代码的结构和语义。例如，对于JSX代码`<div className="container">Hello, Cooper!</div>` ，Babel会生成以下AST：

```jsx
{
  "type": "JSXElement",
  "openingElement": {
    "type": "JSXOpeningElement",
    "name": {
      "type": "JSXIdentifier",
      "name": "div"
    },
    "attributes": [
      {
        "type": "JSXAttribute",
        "name": {
          "type": "JSXIdentifier",
          "name": "className"
        },
        "value": {
          "type": "StringLiteral",
          "value": "container"
        }
      }
    ],
    "selfClosing": false
  },
  "closingElement": {
    "type": "JSXClosingElement",
    "name": {
      "type": "JSXIdentifier",
      "name": "div"
    }
  },
  "children": [
    {
      "type": "JSXText",
      "value": "Hello, Cooper!"
    }
  ]
}
```

3. 转换过程：在转换过程中，Babel会调用`React.createElement()` 方法来创建React Element。以上面例子举例，Babel会其转换为以下JavaScript代码：

```jsx
React.createElement("div", { className: "container" }, "Hello, Cooper!");
```

4. 生成代码：Babel会将转换后的JavaScript代码生成到输出文件中，以便在浏览器中运行。

## createElement()实现原理

`React.createElement()` 方法是React中用于创建React Element的方法，它的实现原理可以分为以下几个步骤：

1. 接受元素类型、属性对象和子元素作为参数。
2. 创建一个包含这些信息的对象，并将其称为React Element。
3. 返回这个React Element。

具体来说，`React.createElement()` 方法会将元素类型转换为字符串，并将属性对象和子元素存储在一个对象中。这个对象包含以下属性：

- `type` ：元素类型，例如 `'div'` 等。
- `props` ：属性对象，包含元素的所有属性和事件处理函数。
- `key` ：元素在列表中的唯一标识符，用于优化列表渲染。
- `ref` ：引用对象，用于获取元素的DOM节点或组件实例。

以上面例子举例，它会创建一个包含以下信息的React Element：

```jsx
{
  type: 'div',
  props: {
    className: 'container',
    children: 'Hello, Cooper!'
  }
}
```

当然，需要注意的是，`React.createElement()` 方法并不是直接将JSX代码转换为JavaScript代码的方法，而是在Babel转换JSX代码时自动插入的方法。Babel 会将 JSX 代码转换为对应的 JavaScript 代码，并在其中插入对﻿React.createElement() 方法的调用，以创建 React Element。

## 浅浅聊聊Fiber架构

本文将浅谈Fiber架构。如果展开来讲，就需要写一篇博文了。

当我们创建完React Element后，需要将其渲染和更新到页面上。在React 16之前，React使用Stack Reconciler算法来处理组件的渲染和更新，但是这个算法是基于递归实现的，存在一些性能问题，特别是在组件层级较深或组件数量较多时。

为了解决这个问题，React 16引入了Fiber架构，它是一种基于链表的算法，用于实现组件的渲染和更新。Fiber 架构的主要目标是实现增量渲染，即将渲染工作分解成多个小任务，并在每个任务之间进行调度和优先级处理，以提高渲染的性能和响应能力。

具体来说，Fiber架构将React应用程序拆分成一个个的小任务，称为Fiber节点，每个节点包含了组件的状态、属性和子元素等信息，以及与渲染和更新相关的一些标记和状态，例如任务状态、优先级等。Fiber节点之间通过链表相连，形成一个Fiber树，用于表示组件等渲染和更新过程。在渲染和更新过程中，React会根据优先级和任务状态等信息，动态地调度和执行Fiber节点，以实现增量渲染和高效更新。

因此，Fiber架构的引入，使得React能够更加高效地处理大型应用程序和复杂的用户界面，提高了应用程序的性能和响应能力。

## 小结

本文主要探究了JSX的实现原理。我们了解到，JSX是React中一种用于描述UI的语法扩展，允许开发者在JavaScript代码中编写类似于HTML的标记语言，以便更直观地描述UI的结构和样式。在JSX中，可以使用类似HTML的标签、属性和表达式，以及一些特殊的语法来描述组件的渲染逻辑。在React中，JSX代码需要经过Babel转换才能被解析为JavaScript代码。Fiber架构是一种基于链表的算法，用于实现组件的渲染和更新。它将React应用程序拆分成一个个的小任务，称为Fiber节点，以实现增量渲染和高效更新。
