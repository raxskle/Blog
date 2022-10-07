const Router = require("koa-router");
let db = require("../utils/database.js");
const article = new Router();
const { auth } = require("../utils/auth.js");
// 根据id获取单篇完整文章
article.get("/", async (ctx) => {
  let id = ctx.query.id;
  // console.log(id);
  let data = await new Promise((resolve, reject) => {
    let sql = `select  id , title , content , class , time ,  tags  from articles where id='${id}'`;
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data); // 返回拿到的数据
    });
  });
  ctx.body = data;
});

// 增加文章，需要鉴权
article.post("/add", auth, async (ctx) => {
  console.log("init post");
  let data = await new Promise((resolve, reject) => {
    // 获取文章数
    let newId;
    let searchNumsSql = `select * from blog_data;`;
    db.query(searchNumsSql, (err, data) => {
      if (err) {
        reject(err);
      }
      newId = data[0].articles_num + 1;
      console.log(newId);

      // 增加文章
      let sql = `INSERT INTO articles ( id , title , content , class , tags , time ) VALUES ('${newId}', '${ctx.request.body.title}', '${ctx.request.body.content}', '${ctx.request.body.class}', '${ctx.request.body.tags}', '${ctx.request.body.time}');`;
      db.query(sql, (err, data) => {
        if (err) {
          reject(err);
        }

        resolve({
          code: 200,
          data: "succeed",
        });
      });

      resolve(data); // 返回拿到的数据
    });

    // 加文章数
    let addNumsSql = `UPDATE blog_data SET articles_num = articles_num + 1 WHERE (id = '1');`;
    db.query(addNumsSql, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data); // 返回拿到的数据
    });
  });

  ctx.body = data;
});

module.exports = article;
