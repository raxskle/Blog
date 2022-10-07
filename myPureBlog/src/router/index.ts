import {
  createRouter,
  // createWebHashHistory,
  createWebHistory,
} from "vue-router";

import IndexPage from "../pages/IndexPage.vue";
import ArticlePage from "../pages/ArticlePage.vue";
import NotFound from "../components/NotFound.vue";
import AdminPage from "../pages/AdminPage.vue";
import LoginPage from "../pages/LoginPage.vue";

const routes = [
  { path: "/", component: IndexPage },
  { path: "/article", component: ArticlePage, name: "articlePage" },
  { path: "/learning", component: IndexPage, name: "learning" },
  { path: "/share", component: IndexPage, name: "share" },
  { path: "/essay", component: IndexPage, name: "essay" },
  { path: "/raxskle/youmuren/login", component: LoginPage, name: "login" },
  { path: "/admin", component: AdminPage, name: "admin" },
  { path: "/:path(.*)", component: NotFound }, // 匹配任意的路由
];

const router = createRouter({
  history: createWebHistory(), //历史模式在后端服务器路由要写一个非匹配任何资源就返回index主页
  routes, // short for `routes: routes`
});

router.beforeEach((to, form, next) => {
  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
  next();
});

export default router;
