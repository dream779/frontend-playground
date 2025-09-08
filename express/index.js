const express = require("express");
const Koa = require("koa");

// const app = express();
const app = new Koa();
const port = 3000;

app.use(async (ctx, next) => {
  console.log("A - start");
//   await next(); // 等待下一个中间件执行完
  console.log("A - end");
});

app.use(async (ctx, next) => {
  console.log("B - start");
  await next();
  console.log("B - end");
});

// app.use((req, res, next) => {
//   console.log("A开始");
//   next(); // 调用 next，进入下一个
//   console.log("A结束");
// });

// app.use((req, res, next) => {
//   console.log("B执行");
//   next();
//   console.log("B结束");
// });

// app.use((req, res, next) => {
//   console.log("C执行");
//   next();
//   console.log("C结束");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
