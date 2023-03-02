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

// 根据名字获取单篇完整文章
article.get("/search", async (ctx) => {
  let title = ctx.query.title;
  console.log(title);
  let data = await new Promise((resolve, reject) => {
    let sql = `select  id , title , content , class , time ,  tags  from articles where title='${title}'`;
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
  let data = await new Promise((resolve, reject) => {
    // 获取文章数
    let newId;
    let searchNumsSql = `select * from blog_data;`;
    db.query(searchNumsSql, (err, data) => {
      if (err) {
        reject(err);
      }
      newId = data[0].articles_num + 1;
      // console.log(newId);

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

      // console.log(data);
      resolve("succeed"); // 返回拿到的数据
    });

    // 加文章数
    let addNumsSql = `UPDATE blog_data SET articles_num = articles_num + 1 WHERE (id = '1');`;
    db.query(addNumsSql, (err, data) => {
      if (err) {
        reject(err);
      }
      // console.log(data);
      resolve(data); // 返回拿到的数据
    });
  });

  ctx.body = data;
});

// change 修改文章
article.post("/change", auth, async (ctx) => {
  let id = ctx.query.id;
  let data = await new Promise((resolve, reject) => {
    let sql = `UPDATE articles SET title = '${ctx.request.body.title}', content = '${ctx.request.body.content}', class = '${ctx.request.body.class}', tags = '${ctx.request.body.tags}' WHERE (id = ${id});`;
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve("succeed"); // 返回拿到的数据
    });
  });
  ctx.body = data;
});

// 删除该文章
article.get("/delete", auth, async (ctx) => {
  let id = ctx.query.id;
  let articles_num = await new Promise((resolve, reject) => {
    let get_articles_num = `select articles_num from blog_data`;
    db.query(get_articles_num, (err, data) => {
      if (err) {
        reject(err);
      }
      console.log(".articles_num ", data[0].articles_num);
      resolve(data[0].articles_num); // 返回拿到的数据
    });
  });

  console.log("articles_num", articles_num);

  let data = await new Promise((resolve, reject) => {
    let sql1 = `DELETE FROM articles WHERE (id = ${id});`;
    db.query(sql1, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve("succeed"); // 返回拿到的数据
    });
  });
  console.log("执行完2 await");

  // id+1 到 articles_num 都减1
  console.log("id", id);
  console.log("articles_num", articles_num);
  for (let i = parseInt(id) + 1; i <= articles_num; i++) {
    let j = i - 1;
    let reduceSQL = `UPDATE articles SET id = '${j}' WHERE (id = ${i});`;
    db.query(reduceSQL, (err, data) => {
      if (err) {
        console.log(err);
      }
      // console.log("重排序", reduceSQL, data); !!!!!!!!!!!就是这个id！ 居然是string，还是ts好！！
      // console.log(data); // 返回拿到的数据
    });
  }

  // 减文章数
  let reduceNumsSql = `UPDATE blog_data SET articles_num = articles_num - 1 WHERE (id = '1');`;
  db.query(reduceNumsSql, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log("减文章数");
    // console.log(data); // 返回拿到的数据
  });

  ctx.body = data;
});

module.exports = article;
