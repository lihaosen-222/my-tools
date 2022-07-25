require('./signIn')
require('./crawler')
const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')
const http = require('http')
const socketInit = require('./socket')
const routerInit = require('./router')

const app = new Koa()

// app.listen(...) creat 加 listen 的语法糖
const server = http.createServer(app.callback())

app.use(
  koaStatic(path.join(__dirname, '../public'), {
    setHeaders(res, path, stats) {
      // 12小时的缓存
      res.setHeader('cache-control', `max-age=${60 * 60 * 12}`)
      const ifModifiedSince = res.req.headers['if-modified-since']
      const lastModified = stats.mtime.toGMTString()
      if (ifModifiedSince === lastModified) {
        res.writeHead(304) // 虽然不建议但我还是用了
      } else {
        res.setHeader('Last-Modified', lastModified)
      }
    },
  })
)

const io = socketInit(server)
routerInit(app, io)

server.listen(8007, () => {
  console.log('run at http://localhost:8007/')
})
