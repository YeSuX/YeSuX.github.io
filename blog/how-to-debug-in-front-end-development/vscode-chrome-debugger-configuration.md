# VSCode Chrome Debugger配置详解

[[toc]]

如何使用 VSCode Debugger 调试网页上的 JavaScript？实际上，它还有很多有用的配置选项。首先，调试配置文件不需要自己创建，只需在 Debug 窗口中单击 `create a launch.json file` 即可快速创建。

## Launch/Attach模式

创建 Chrome Debug 配置有两种方式：launch 和 attach。它们之间的区别在于 request 的配置不同：

![iLI73Z.png](https://i.328888.xyz/2023/05/01/iLI73Z.png)

launch 的意思是启动 URL 对应的网页，指定调试端口，然后frontend自动attach到这个端口。

但如果你已经有一个在调试模式下运行的浏览器，那么直接连接就可以了，此时就直接attach即可。

举个例子：我们可以手动启动 Chrome，并将调试端口 remote-debugging-port 指定为 9222，将用户数据保存目录 user-data-dir 指定为你自己创建的目录。在命令行中执行以下命令：

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir=你自己创建的某个目录
```

Chrome跑起来之后，可以打开几个网页，比如百度和掘金。然后访问localhost:9222/json，你就会发现所有的WebSocket服务地址了。

![iLIxD8.png](https://i.328888.xyz/2023/05/01/iLIxD8.png)

**为什么每个页面都有单独的 WebSocket 服务呢？**

这是很正常的，每个页面的调试都是独立的，因此需要单独的 WebSocket 服务。

启动 Chrome 调试后，您将看到 VSCode 调试器与每个页面的 WebSocket 调试服务建立链接。

![iLIXJ5.png](https://i.328888.xyz/2023/05/01/iLIXJ5.png)

比如访问之前的 React 项目，就可以进行调试了.

并且它可以同时调试多个页面，每个页面都有独立的调试上下文。

### 小结

- Launch方式会在VSCode中启动一个新的Chrome实例，并通过WebSocket连接到调试器。这种方式的优点是方便调试页面中的所有代码，包括页面本身和引入的所有脚本文件。此外，Launch方式还允许在VSCode中进行源代码的编辑和保存。
- Attach方式则是在已经打开的Chrome实例中连接调试器。这种方式的优点是可以直接在已经打开的页面中进行调试，而不需要重新加载页面，因此可以节省时间。并且能够同时调试多个页面，每个页面都有独立的调试上下文。但是，使用Attach方式时需要确保已经在浏览器中打开了要调试的页面，并且必须手动启用调试器。

## 配置Chrome数据目录

在手动启动 Chrome 时，需要指定调试端口 remote-debugging-port 和用户数据目录 user-data-dir。

**user-data-dir是什么呢？**

用户数据目录是保存用户数据的地方，包括浏览记录、cookies、插件、书签、网站数据等，如果在 macOS 下，用户数据目录保存在以下位置：

```bash
~/Library/Application\ Support/Google/Chrome
```

**为什么要指定用户数据目录呢？**

用户数据目录的一个特点是，只能被一个 Chrome 实例访问。如果您之前启动了 Chrome 并使用了该默认的用户数据目录，则无法再启动另一个 Chrome 实例并使用该目录。

如果已经有一个 Chrome 实例在运行该用户数据目录，再次运行会出现以下错误：

![iLIBXy.png](https://i.328888.xyz/2023/05/01/iLIBXy.png)

launch 的配置项里也有 userDataDir 的配置：

![iLIp03.png](https://i.328888.xyz/2023/05/01/iLIp03.png)

默认情况下，该值为 true，表示创建一个临时目录来保存用户数据。

但也可以将其设置为 false，以使用默认的用户数据目录启动 Chrome。此外，还可以指定自定义路径，以便将用户数据保存在该目录下。

这样做的好处是可以保存登录状态和历史记录等信息。更重要的是，你安装的 React DevTools 和 Vue DevTools 插件都在默认的用户数据目录中。如果使用临时数据目录进行调试，这些插件可能就无法使用了。将 userDataDir 设置为 false 后，安装过的插件都可以直接使用。

但是平时除了用于调试之外，也会使用 Chrome。如果同一个 user data dir 只能运行一个 Chrome 实例，那么就会产生冲突了。

这个问题可以有两种方法可以解决。

### 第一种方法

要调试网页的 JavaScript，需要先启动 Chrome 浏览器。默认情况下启动的是 Google Chrome，但实际上它还有另外一个版本叫做 Canary。

Canary 是面向开发人员的每日构建版，能够快速体验新特性，但不够稳定。而 Google Chrome 则是面向普通用户的比较稳定的版本。

这两个版本是独立的，相互之间没有影响，可以使用同一个用户数据目录启动。

你可以在[官网](https://link.juejin.cn/?target=https%3A%2F%2Fwww.google.com%2Fintl%2Fzh-CN%2Fchrome%2Fcanary%2F)下载 Canary。

然后，将 runtimeExecutable 设为 canary 并使用默认的用户数据目录启动即可。

![iLIcav.png](https://i.328888.xyz/2023/05/01/iLIcav.png)

当然，runtimeExecutable 还可以指定用别的浏览器跑。

您可以选择稳定版本的 Google Chrome（stable），或者每日构建版的 Google Chrome Canary（canary）。如果需要自定义浏览器，可以通过 CHROME_PATH 环境变量来指定其地址。

不过，通常使用的是 Chrome 和 Canary，您也可以尝试近期比较流行的Arc浏览器。

### 第二种方法

Chrome可以创建多个用户，其中一个用户可以专门用于调试。该用户的用户数据目录是干净的，可以安装插件，只需安装一次即可一直使用。

以下步骤适用于Mac，我没有在Windows上试过。

1. 点击Chrome右上角的头像 -> 添加 -> 填写用户名“测试专用”，选择一个与默认用户不同的颜色以便区分。
2. 杀死Chrome进程。
3. 在终端上输入`cd /Applications/Google Chrome.app/Contents/MacOS。`
4. 再次输入`./Google\ Chrome --remote-debugging-port=9222`。
5. 在弹出窗口中选择使用的Chrome用户“测试专用”，将自动打开一个Chrome。
6. 在这个Chrome中打开要调试的项目地址。
7. 打开`chrome://inspect/#devices`，勾选上面第二个选框并检查后面的配置是否有`localhost:9222`，如果没有则添加一个。
8. 查看remote Target中是否有你的项目地址，如果有则表示成功。
9. 配置launch.json：

```json
{
  "name": "attach to Chrome (附加到Chrome)",
    "port": 9222,
    "request": "attach",
    "type": "chrome",
    "webRoot": "${workspaceFolder}",
    "urlFilter": "[<http://你的项目地址/#/.*>](<http://xn--6qq53qnb431rfpa732n/#/.*>)" //urlFilter的作用是只调试这个url（你也可以不写这个配置）
}

```

使用的路由是Hash模式时，必须将urlFilter写成`http://你的项目地址/#/.*`才能启动，否则会卡住。如果使用的是History模式，则直接写成`http://你的项目地址/.*`即可。

## 启动参数配置

启动 Chrome 的时候，可以指定启动参数。

- 每次打开网页都默认调起 Chrome DevTools——`--auto-open-devtools-for-tabs`
- 无痕模式启动——`--incognito`

## 调试映射代码修改

代码是经过编译打包后在浏览器中运行的，但是我们可以直接调试源代码。这是通过 sourcemap 实现的。

在启用 `sourcemap` 的情况下，使用 Chrome DevTools 可以看到，源文件的路径为 `/static/js/bundle.js`。

![iLIRzU.png](https://i.328888.xyz/2023/05/01/iLIRzU.png)

被 `sourcemap` 到了 `/Users/guang/code/test-react-debug/src/index.js`。

![iLI3Op.png](https://i.328888.xyz/2023/05/01/iLI3Op.png)

在 VSCode 中，这个路径对应一个文件。因此，它会打开相应的文件编辑器，使得您可以在调试时边修改代码。但有时候，源代码映射到的文件路径无法在本地找到。这样，您的代码就只能读取，因为没有地方保存。

![iLIrZL.png](https://i.328888.xyz/2023/05/01/iLIrZL.png)

在这种情况下，需要对 SourceMap 映射到的路径再进行一次映射。

![iLII5k.png](https://i.328888.xyz/2023/05/01/iLII5k.png)

那么可以通过 sourceMapPathOverrides 这个配置项解决。

![iLI8rx.png](https://i.328888.xyz/2023/05/01/iLI8rx.png)

这里将以 meteor 和 webpack 开头的路径映射到本地目录。其中，`?:*` 表示匹配任意字符，但不进行映射，而 `*` 用于匹配字符并映射。例如，最后一个 `webpack://?:*/*` 到 `${workspaceFolder}/*`的映射，将 `webpack://` 开头、接着任意字符和`/`，然后是任意字符的路径映射到本地项目目录。（workspaceFolder 是一个内置变量，代表项目根目录）

## 调试静态文件

除了启动开发服务器并通过 URL 进行调试，还可以直接指定某个文件，VSCode Debugger 将启动静态服务器以提供服务。

![iLIjAa.png](https://i.328888.xyz/2023/05/01/iLIjAa.png)

同样，要修改调试的内容需要将 URL 映射到本地文件才行，因此需要进行 pathMapping 的配置。

![iLIOJw.png](https://i.328888.xyz/2023/05/01/iLIOJw.png)

## 总结

本节我们讲解了 VSCode Chrome Debugger 的配置：

- launch：调试模式启动浏览器，访问某个 URL，然后连上进行调试。
- attach：连接某个已经在调试模式启动的 URL 进行调试。
- userDataDir：user data dir 是保存用户数据的地方，比如浏览历史、cookie 等，一个数据目录只能跑一个 Chrome，所以默认会创建临时用户数据目录。想使用默认目录，可以将此配置设为 false。
- runtimeExecutable：切换调试用的浏览器，可以是 stable、canary 或者自定义的。
- runtimeArgs：启动浏览器时传递的启动参数。
- sourceMapPathOverrides：对 sourcemap 到的文件路径做一次映射，映射到 VSCode workspace 下的文件，这样调试的文件就可以修改了。
- file：可以直接指定某个文件，然后启动调试。
