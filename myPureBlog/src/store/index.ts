import { createStore } from "vuex";
import { getBlogData } from "../network/getBlogData.js";
// import { login } from "../network/login.js";
import { postAddLikes } from "../network/postAddLikes.js";
let store = createStore({
  state() {
    // 存储的单一状态
    return {
      articlesNum: 0,
      tagsNum: 0,
      likes: 0,
      // isLogined: false,
    };
  },
  getters: {},
  mutations: {
    addLikes(state) {
      state.likes++;
    },
    updateBlogData(state, blogData) {
      state.articlesNum = blogData.articles_num;
      state.tagsNum = blogData.tags_num;
      state.likes = blogData.likes;
    },
    // changeLoginState(state) {
    //   state.isLogined = true;
    // },
  },
  actions: {
    fetchBlogData(context) {
      getBlogData().then((res) => {
        console.log(res);
        context.commit("updateBlogData", res.data[0]);
      });
    },
    toPostAddLikes() {
      postAddLikes();
    },
    // toLogin(data) {
    //   login(data);
    // },
  },
});

export default store;
