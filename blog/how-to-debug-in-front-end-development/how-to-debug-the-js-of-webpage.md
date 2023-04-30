# 如何调试网页的JS

首先，初始化一个React项目。

## 利用Chrome Devtools调试

打开Chrome DevTools，在Sources面板中找到src/index.js文件，并打上断点。

![Untitled](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45646ebb9946450c89ab642cd1859b0f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp?)

然后刷新就可以开始调试了：

![Untitled](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98282c6e246344d3b391df2b30bb8970~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp?)

代码会在断点处暂停，右边的窗口会显示当前局部作用域的变量、全局作用域的变量以及调用栈。

有以下几个控制执行的按钮：

1. 恢复执行
2. 单步执行
3. 进入函数调用
4. 跳出函数调用
5. 禁用断点
6. 在异常处暂停

## 使用 VS Code 调试器进行调试

打开项目目录并用 VS Code 创建 .vscode/launch.json 文件。点击右下角的“Add Configuration...”按钮，然后选择“Chrome: launch”。

![Untitled](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e42aeb0f8d44e17964bc1ae03697bbc~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp?)

将访问的 URL 更改为开发服务器启动的地址。然后进入调试窗口，单击启动。您会发现它启动了浏览器并打开了该 URL。在 VSCode 中，还有一排控制执行的按钮。这些控制按钮分别对应恢复执行、单步执行、进入函数调用、跳出函数调用，这与 Chrome DevTools 相同。还可以看到刷新和停止按钮。异常断点的按钮被移到了这里。

![Untitled](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/967c7706bf144cefbf3e854d17aa6513~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp?)

可以在被 catch 的异常处断住，也可以在没有被 catch 的异常处断住。

看起来和 Chrome DevTools 里的调试差不多呀。在 VSCode Debugger 里调试有什么好处呢？

一个好处就是不用在工具之间来回切换。以前，调试在 Chrome DevTools 里，写代码在 VSCode 里。现在，写代码和调试都可以在 VSCode 里完成，这样就可以边调试边写代码。

例如，想要访问 this 的某个属性，可以在 Debug Console 里输入 this 查看它的值，然后再写代码。

如果你使用 TypeScript，可能会收到属性名的提示和属性值类型的提示，但是并不知道属性的值是什么。

如果边调试边写代码，就可以直接知道属性值是什么，以及哪些函数可以调用。

**边调试边写代码是我推荐的写代码方式。**

## 为什么 Chrome DevTools 和 VSCode Debugger 都可以调试网页呢？

这是因为它们都使用相同的调试协议，即 CDP。Chrome DevTools 可以使用 CDP 来调试网页，VSCode Debugger 也可以。只不过，VSCode Debugger 还需要进行 Debug Adapter Protocol 的转换。

![Untitled](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbbc48aafc4c48958a9bc952e6645329~tplv-k3u1fbpfcp-zoom-in-crop-mark:3326:0:0:0.awebp?)
