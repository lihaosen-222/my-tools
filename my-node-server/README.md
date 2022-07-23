# my-node-server
 vite，koa

# 放弃 vite 用回 webpack
- vite 本身就是基于浏览器的 ES Module 写的，这是浏览器的新特性
- 不支持写原生 http，并且 vite 在启动 server 的端口同样启动了一个 socket
- vite-plugin-node 插件并不好用，也得像浏览器一样，不请求该接口就不自信代码，写的是服务器，但是每次热重载都得刷新页面
- 对 node 代码支持不好
