const Router = require("koa-router");
const bodyPaser = require("koa-bodyparser");
const fs = require('fs')
const path = require('path')
const { getTodayStatus } = require("./signIn/service");

function routerInit(app, io) {
  const router = new Router();
  let win = new Array(5);

  router.use(bodyPaser());

  router.get("/api/getTodayStatus", async (ctx) => {
    const res = await getTodayStatus();
    ctx.body = res.data;
  });

  router.post("/api/setWin", async (ctx) => {
    // python 传过来的数据怪怪的，转 json 了
    win = JSON.parse(ctx.request.body.win);
    win?.shift(); // 丢去 null
    ctx.body = "success";
    io.emit("update-win", win);
  });

  router.post("/api/setBackground", async (ctx) => {
    const { url } = ctx.request.body
    
    try {
      fs.writeFileSync(
        path.resolve(__dirname, `../public/todayBG.css`),
        `body {background-image: url(${url});}`
      )
      ctx.body = "success";
    } catch (err) {
      console.error(err)
      ctx.body = err;
    }
  });

  router.get("/api/getWin", async (ctx) => {
    ctx.body = win;
  });

  app.use(router.routes()).use(router.allowedMethods());
}

module.exports = routerInit;
