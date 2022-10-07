const Router = require("koa-router");
let db = require("../utils/database.js");
const router = new Router();

const articles = require("./articles");
const article = require("./article");
const tags = require("./tags");
const blog_data = require("./blog_data");
const search = require("./search");

router.use("/articles", articles.routes(), articles.allowedMethods());
router.use("/article", article.routes(), article.allowedMethods());
router.use("/tags", tags.routes(), tags.allowedMethods());
router.use("/blog_data", blog_data.routes(), blog_data.allowedMethods());
router.use("/search", search.routes(), search.allowedMethods());

module.exports = router;
