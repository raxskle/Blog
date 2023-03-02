const Router = require("koa-router");
let db = require("../utils/database.js");
const articles = new Router();

// 获取所有文章
articles.get("/all", async (ctx) => {
  let data = await new Promise((resolve, reject) => {
    // 倒序查询！！
    let sql = `select id , title , content , class , time ,  tags from articles order by id desc`;
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      }
      let response = data;
      response.forEach((val) => {
        // 去标签化
        val.content = val.content.replace(/<(?!img).*?>/g, "    ");
        // 缩短
        // if (val.content.length > 300) {
        // val.content = val.content.slice(0, 300);
        // }
        // console.log(val.content);
      });
      resolve(response); // 返回拿到的数据
    });
  });

  ctx.set("Cache-control", "max-age=60");
  ctx.body = data;
});

// 获取c1
articles.get("/learning", async (ctx) => {
  let data = await new Promise((resolve, reject) => {
    // 倒序查询！！
    let sql = `select id , title , content , class , time ,  tags from articles where class = 'c1' order by id desc`;
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      }
      let response = data;
      response.forEach((val) => {
        // if (val.content.length > 300) {
        //   val.content = val.content.slice(0, 300);
        // }
        // console.log(val.content);
        val.content = val.content.replace(/<(?!img).*?>/g, "    ");
      });
      resolve(response); // 返回拿到的数据
    });
  });
  ctx.set("Cache-control", "max-age=60");
  ctx.body = data;
});

// 获取c2
articles.get("/share", async (ctx) => {
  let data = await new Promise((resolve, reject) => {
    // 倒序查询！！
    let sql = `select id , title , content , class , time ,  tags from articles where class = 'c2' order by id desc `;
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      }
      let response = data;
      response.forEach((val) => {
        // if (val.content.length > 300) {
        //   val.content = val.content.slice(0, 300);
        // }
        // console.log(val.content);
        val.content = val.content.replace(/<(?!img).*?>/g, "    ");
      });
      resolve(response); // 返回拿到的数据
    });
  });
  ctx.set("Cache-control", "max-age=60");
  ctx.body = data;
});

// 获取c3
articles.get("/essay", async (ctx) => {
  let data = await new Promise((resolve, reject) => {
    // 倒序查询！！
    let sql = `select id , title , content , class , time ,  tags from articles where class = 'c3' order by id desc`;
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      }
      let response = data;
      response.forEach((val) => {
        // if (val.content.length > 300) {
        //   val.content = val.content.slice(0, 300);
        // }
        // console.log(val.content);
        val.content = val.content.replace(/<(?!img).*?>/g, "    ");
      });
      resolve(response); // 返回拿到的数据
    });
  });
  ctx.set("Cache-control", "max-age=60");
  ctx.body = data;
});

module.exports = articles;
