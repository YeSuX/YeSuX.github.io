# Node.js Basics
[[toc]]
## How Does The Web Work(Refresher)

So let me quickly refresh our knowledge on how the web works. 

![how-does-the-web-work](https://s3.bmp.ovh/imgs/2022/11/10/ebe69622c8091567.png)

### Http

<span style="color:red;">H</span>yper <span style="color:red;">T</span>ext <span style="color:red;">T</span>ransfer <span style="color:red;">P</span>rotocol
:::tip
A Protocol for Transferring Data which is understood by Browser and Server.
:::

### Https

<span style="color:red;">H</span>yper <span style="color:red;">T</span>ext <span style="color:red;">T</span>ransfer <span style="color:red;">P</span>rotocol <span style="color:red;">S</span>ecure
:::tip
HTTP + Data Encryption(during Transmission)
:::

## Using Node Core Modules

- http -> Launch a server, send requests
- https -> Launch a SSL server
- fs
- path
- os

## Creating a Node.js Server

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
});

server.listen(3000);
```

### event loop

![event loop](https://s3.bmp.ovh/imgs/2022/11/11/9ae0e9c21adb6855.png)

## Working with Requests & Responses(Basics)

## Asychronous Code & The Event Loop