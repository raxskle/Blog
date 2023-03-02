const Router = require("koa-router");
let db = require("../utils/database.js");
const tags = new Router();
const { auth } = require("../utils/auth.js");
// 获取所有tags
tags.get("/", async (ctx) => {
  let data = await new Promise((resolve, reject) => {
    let sql = `select * from tags`;
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data); // 返回拿到的数据
    });
  });
  console.log("获取所有tags");
  ctx.body = data;
});

let addNewTag = (tagName) => {
  let sql = `INSERT INTO tags ( tag_name) VALUES ('${tagName}');`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log("插入标签错误1", err);
    }
    console.log("插入标签");
  });

  let addNumsSql = `UPDATE blog_data SET tags_num = tags_num + 1 WHERE (id = '1');`;
  db.query(addNumsSql, (err, data) => {
    if (err) {
      console.log("更新标签数错误", err);
    }
  });
};

// 新增tags
tags.post("/addtags", auth, async (ctx) => {
  let data = await new Promise((resolve, reject) => {
    let sql = `select * from tags`;
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      }

      let response = {
        hasNewTags: false,
        addTags: [],
      };
      // console.log(data);
      let tagsList = ctx.request.body.tag.split(",");
      // console.log(tagsList);
      // 检查是否新标签
      for (let tag of tagsList) {
        // console.log(tag);
        let isNewTag = true;
        data.forEach((element) => {
          if (element.tag_name == tag) {
            isNewTag = false;
          }
        });
        if (isNewTag) {
          console.log("得到新标签");
          response.hasNewTags = true;
          response.addTags.push(tag);
          addNewTag(tag);
        }
      }

      resolve(response); // 返回拿到的数据
    });
  });
  ctx.body = data;
});

module.exports = tags;
