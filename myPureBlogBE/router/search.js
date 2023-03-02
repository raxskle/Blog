const Router = require("koa-router");
let db = require("../utils/database.js");
const search = new Router();

search.get("/", async (ctx) => {
  let text = ctx.query.text;
  // console.log(text);
  let data = await new Promise((resolve, reject) => {
    let searchSql =
      "select id , title  from articles where title like " +
      "'" +
      "%" +
      text +
      "%" +
      "'";
    db.query(searchSql, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data); // 返回拿到的数据
    });
  });
  ctx.body = data;
});

// 根据tag查询
search.get("/tags", async (ctx) => {
  let text = ctx.query.text;
  console.log("tag:", text);
  let data = await new Promise((resolve, reject) => {
    let searchSql =
      "select id , title , content , class , time ,  tags  from articles where tags like " +
      "'" +
      "%" +
      text +
      "%" +
      "'" +
      " order by id desc ";
    db.query(searchSql, (err, data) => {
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
  ctx.body = data;
});

module.exports = search;
