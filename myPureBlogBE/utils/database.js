let mysql = require("mysql");

let pool = mysql.createPool({
  host: "127.0.0.1",
  // host: "114.132.58.27",
  // 默认端口3306
  // user: "odyssey",
  user: "root",
  password: "123456",
  database: "odyssey",
});
// console.log("mysql pool", pool);
//对数据库进行增删改查操作的基础
function query(sql, callback) {
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (err, rows) {
      callback(err, rows);
      connection.release();
    });
  });
}

exports.query = query;
