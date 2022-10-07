import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
import "./assets/scss/index.scss";
// import "./assets/scss/variable.scss";
import "./assets/font-awesome-4.7.0/css/font-awesome.min.css";
import router from "./router"; // 引入router

createApp(App).use(router).use(store).mount("#app");
