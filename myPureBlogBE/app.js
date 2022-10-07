const Koa = require("koa2");
const cors = require("koa2-cors");
const path = require("path");
const static = require("koa-static");
const Router = require("koa-router");
const fs = require("fs");

// post 传参
const koaBody = require("koa-body");
const router = new Router();

const api = require("./router/index");

const app = new Koa();

const port = 8081;

// 允许跨域
app.use(cors());

// 使用post参数
app.use(
  koaBody({
    multipart: true,
  })
);

// 配置vue-router 当404 且是某些路由时返回index.html
app.use(async (ctx, next) => {
  // history 中间件
  const path = "/notFound"; // 需要判断的路径
  await next(); // 等待请求执行完毕
  // console.log(ctx.request.url);
  if (ctx.response.status === 404 && !ctx.request.url.includes(path)) {
    // 判断是否符合条件
    ctx.type = "text/html; charset=utf-8"; // 修改响应类型
    ctx.body = fs.readFileSync("./public/index.html"); // 修改响应体
  }
});

router.use("/api", api.routes(), api.allowedMethods());
app.use(router.routes(), router.allowedMethods());

// 开放静态资源目录
app.use(
  static(path.join(__dirname + "/public"), {
    maxage: 10,
  })
);

// // https
// const https = require("https");
// const sslify = require("koa-sslify").default;
// app.use(sslify());

// const options = {
//   key: fs.readFileSync("./httpskey/privkey.key"),
//   cert: fs.readFileSync("./httpskey/fullchain.pem"),
// };

// https.createServer(options, app.callback()).listen(8081, () => {
//   console.log(`server running success at 8081`);
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// console.log(app);

// 8081端口是https
// 8082端口是http
