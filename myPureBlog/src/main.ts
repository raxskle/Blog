import { createApp } from "vue";
import Vue from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import "./assets/scss/index.scss";
// import "./assets/scss/variable.scss";
import "./assets/font-awesome-4.7.0/css/font-awesome.min.css";
import router from "./router"; // 引入router

const store = createPinia();

// import "highlight.js/styles/devibeans.css"; // 导入代码高亮样式
import "highlight.js/styles/github.css"; // 导入代码高亮样式
// import "highlight.js/styles/gradient-dark.css"; // 导入代码高亮样式


createApp(App).use(router).use(store).mount("#app");



