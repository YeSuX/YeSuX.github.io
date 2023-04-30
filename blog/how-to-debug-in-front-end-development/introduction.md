# 浅谈前端调试

[[toc]]

## 我可以学会什么？

![iKJvJb.png](https://i.328888.xyz/2023/04/30/iKJvJb.png)

## 什么是调试？

代码运行于某个平台，并通过某种方式将运行时状态暴露给开发工具进行 UI 展示和交互，以帮助开发者排查问题、梳理流程、了解代码运行状态等。

- 平台：浏览器、Node.js、Electron 等任何能执行 JS 代码的平台。
- 暴露的运行时状态：调用栈、执行上下文、DOM 结构或 React 组件结构等。
- 暴露这些数据的方式：通过基于 WebSocket 的调试协议。

## Chrome DevTools原理

Chrome DevTools 分为两个部分：backend 和 frontend。

- backend 与 Chrome 集成，负责将 Chrome 的网页运行时状态通过调试协议暴露出来。
- frontend 是独立的，负责与调试协议对接，进行 UI 的展示和交互。

两者之间的调试协议叫做 Chrome DevTools 协议（CDP），是传输协议数据的方式。有很多种信道，例如当 Chrome DevTools 嵌入在 Chrome 中时，两者通过全局函数进行通信；当 Chrome DevTools 远程调试某个目标的代码时，两者通过 WebSocket 进行通信。

![iKJL5w.png](https://i.328888.xyz/2023/04/30/iKJL5w.png)

## VSCode Debugger原理

VSCode Debugger 的原理和 Chrome DevTools 差不多，也是分为 frontend、backend、调试协议这几部分，只不过它多了一层适配器协议。

因为 VSCode 不是 JavaScript 专用的编辑器，它也可能用于调试 Python 代码、Rust 代码等等。因此，它不能与某种语言的调试协议深度耦合。这就是为什么它需要多一层适配器层的原因。

![iKJazk.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75e91f65d75c483280a90afb0e4818dd~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp?)

## Vue/React DevTools

Content Script 部分可以操作 DOM，监听 DOM Event。

Backgroud 部分可以访问 extension API，与 Content Script 和 DevTools Page 进行通信。

DevTools Page 部分可以访问 devtools API，向当前窗口注入 JavaScript。

这就是 Chrome 插件的基本架构。

![Untitled](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c0ac4a1ae914a9f8487d94d124f3b66~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp?)

经过研究 Chrome DevTools、VSCode Debugger、Vue/React DevTools 的原理，发现它们有一些相同的地方。

它们都有后端部分负责获取运行时信息，前端部分负责渲染和交互，调试协议用于规定不同数据的格式，并且有不同的信道，比如 WebSocket、Chrome 插件的后台转发等。

前端、后端、调试协议和信道是调试工具的四个要素。然而，不同的调试工具都有不同的设计，例如，为了跨语言复用，VSCode Debugger 增加了一个调试适配器层；React DevTools 则有独立的 electron 应用和自定义调试协议，可用于调试 React Native 代码。

## 小结

本文介绍了前端调试的基本概念和 Chrome DevTools、VSCode Debugger、Vue/React DevTools 的原理。这些工具都有后端、前端、调试协议和信道四个要素，但是它们的设计有所不同，例如 VSCode Debugger 增加了一个调试适配器层，React DevTools 有独立的 electron 应用和自定义调试协议。
