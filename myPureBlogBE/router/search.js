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

module.exports = search;
