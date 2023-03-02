import {
  createRouter,
  // createWebHashHistory,
  createWebHistory,
} from "vue-router";

import IndexPage from "../pages/IndexPage.vue";
import ArticlePage from "../pages/ArticlePage.vue";
import NotFound from "../components/NotFound.vue";
import TagsPage from "../pages/TagsPage.vue";

const routes = [
  { path: "/", component: IndexPage },
  { path: "/article", component: ArticlePage, name: "articlePage" },
  { path: "/learning", component: IndexPage, name: "learning" },
  { path: "/share", component: IndexPage, name: "share" },
  { path: "/essay", component: IndexPage, name: "essay" },
  { path: "/tags", component: TagsPage, name: "tags" },
  { path: "/:path(.*)", component: NotFound }, // 匹配任意的路由
];

const router = createRouter({
  history: createWebHistory(), //历史模式在后端服务器路由要写一个非匹配任何资源就返回index主页
  routes, // short for `routes: routes`
});

router.beforeEach((to, form, next) => {
  window.scrollTo({
    top: 0,
    behavior: router.currentRoute.value.path == "/tags"?"smooth":"auto",
  });    
  

  next();
});

export default router;
