<template>
<div class="articlePage">
  <TopNav></TopNav>
  <div class="mainWrap">
    <MainArea :articleData="articleData"></MainArea>     
    <RightSideArea :articleCatalogueList="articleCatalogueList" :tags="articleTags"></RightSideArea>
  </div>

  <PageTail></PageTail>
  <ToTopBtn></ToTopBtn>   
  
</div>

</template>

<script lang="ts" setup>
import TopNav from "../components/TopNav.vue";
import ToTopBtn from "../components/ToTopBtn.vue";
import MainArea from "../components/ArticlePage/MainArea.vue";
import PageTail from "../components/PageTail.vue";
import RightSideArea from "../components/ArticlePage/RightSideArea.vue"
import { getArticle } from "../network/getArticle"
import {useRouter} from "vue-router"
import { ref } from "vue";
// import { useStore } from 'vuex'
// import { computed } from 'vue'
// const store = useStore();

// let articlesNum = computed(() => store.state.articlesNum);
let router = useRouter();
let articleData = ref(null);
let articleCatalogueList = ref([]);
let articleTags = ref([]);

// console.log(router.currentRoute.value.path)

let getUrlID = function () {
  let url = location.search;
  class TheRequest {
    id:string
  }
  let theRequest = new TheRequest;
  if (url.indexOf("?") != -1) {
    let str = url.slice(1);
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
    }
  }
  let id = theRequest.id;
  return id;
};

let id = getUrlID();
let params = `id=${id}`;
if (id === "" || id == null ) {
  router.push("/404");
} else {
  getArticle(params).then((res) => {
    // console.log(res.data[0]);
    if (!res.data[0]) {
      // console.log("无内容");
      router.push("/404");
      return;
    }
    // console.log("有内容");
    articleData.value = res.data[0];
    // console.log(res.data[0]);

    // 生成目录
    let rawText = res.data[0].content;
    rawText.replace(/<h2.*?h2>/g, (match) => {
      let catalogue = match.replace(/<.*?>/g, "");
      articleCatalogueList.value.push(catalogue);
    });
    // 生成tags
    if (res.data[0].tags != null) {
      articleTags.value = res.data[0].tags.split(",");  
    }

  });
      
}




</script>

<style lang="scss" scoped>
.articlePage{
  @include themeify {
    background-color: themed("article-page-bg-color");
  }  
  transition: background-color .4s;
  flex-direction: column;  
  width: 100vw ;
  // z-index: 3;
  .mainWrap {
    flex-direction:row;
    align-items: flex-start;
    width: 100%;
    position: relative;
    // background-size: 100vw;
    // background-attachment: fixed;
  }
}




</style>