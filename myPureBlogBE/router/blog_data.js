const Router = require("koa-router");
const jwt = require("jsonwebtoken");
let db = require("../utils/database.js");
const blog_data = new Router();

// 获取所有博客数据
blog_data.get("/", async (ctx) => {
  let data = await new Promise((resolve, reject) => {
    let sql = `select * from blog_data`;
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data); // 返回拿到的数据
    });
  });
  ctx.body = data;
});

// addlikes
blog_data.post("/addLikes", async (ctx) => {
  let data = await new Promise((resolve, reject) => {
    let sql = `UPDATE blog_data SET likes = likes + 1 WHERE ( id = '1');`;
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data); // 返回拿到的数据
    });
  });
  ctx.body = data;
});

// login
blog_data.post("/login", async (ctx) => {
  let data = await new Promise((resolve, reject) => {
    let sql = `select admin , admin_password from blog_data`;
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      }
      let token = {
        token: null,
      };
      if (
        ctx.request.body.account == data[0].admin &&
        ctx.request.body.password == data[0].admin_password
      ) {
        let tt = jwt.sign(
          //携带信息
          {
            user: ctx.request.body.account,
          },
          "secret", //秘钥
          {
            //有效期
            expiresIn: 60 * 60 * 24,
          }
        );
        console.log("tt", tt);
        token.token = tt;
      }
      resolve(token); // 返回拿到的数据
    });
  });

  ctx.body = data;
});

module.exports = blog_data;
