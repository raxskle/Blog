import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { getBlogData } from "../network/getBlogData";
import { postAddLikes } from "../network/postAddLikes";

export const useStore = defineStore("store", () => {
  let articlesNum = ref(0);
  let tagsNum = ref(0);
  let likes = ref(0);

  function addLikes() {
    likes.value++;
  }
  
  function updateBlogData(blogData: { articles_num: number; tags_num: number; likes: number; }) {
    articlesNum.value = blogData.articles_num;
    tagsNum.value = blogData.tags_num;
    likes.value = blogData.likes;
  }

  function fetchBlogData() {
    getBlogData().then((res) => {
      updateBlogData(res);
    });
  }

  function toPostAddLikes() {
    postAddLikes();
  }

  return {articlesNum,tagsNum,likes,addLikes,updateBlogData,fetchBlogData,toPostAddLikes, };
});
