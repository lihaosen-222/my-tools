const Router = require("koa-router");
const bodyPaser = require("koa-bodyparser");
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

  router.get("/api/getWin", async (ctx) => {
    ctx.body = win;
  });

  app.use(router.routes()).use(router.allowedMethods());
}

module.exports = routerInit;
