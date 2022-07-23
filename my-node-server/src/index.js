require("./signIn");
const path = require("path");
const Koa = require("koa");
const koaStatic = require("koa-static");
const http = require("http");
const socketInit = require("./socket");
const routerInit = require("./router");

const app = new Koa();

// app.listen(...) creat 加 listen 的语法糖
const server = http.createServer(app.callback());

app.use(koaStatic(path.join(__dirname, "../public")));

const io = socketInit(server);
routerInit(app, io);

server.listen(8007, () => {
  console.log("run at http://localhost:8007/");
});
