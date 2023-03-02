<template>
  <div class="tagsPageWrap">
    <TopNav></TopNav>
    <div class="headArea">
      <div class="searchTag">当前Tag：“{{tagName}}”</div>
    </div>

    <div class="mainArea">
      <ArticleList v-show="hasArticle" :articleListByTag="articleList"></ArticleList>
      <div class="notFoundTags" v-show="!hasArticle">没有找到该标签对应文章 :(</div>
    </div>

    <div class="allTagsBar">
      <div class="tagsListTitle">所有tags:</div>
      <div class="tagsList">
        <Tags v-for="(tagText,index) in tagsText" :key="index" :tagText="tagText"></Tags>
      </div>
    </div>    
    <PageTail></PageTail>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import TopNav from '../components/TopNav.vue';
import ArticleList from '../components/ArticleList.vue';
import Tags from "../components/Tags.vue"
import PageTail from "../components/PageTail.vue"
import { useRouter } from "vue-router";
import { computed } from '@vue/reactivity';
import { searchByTag } from "../network/search"
import {getTags} from "../network/getTags"
let router = useRouter();

// 首先获取tagName，在这里判断路由query合法性（t=?
let tagName = computed(() => {
  const t = router.currentRoute.value.query.t;
  if (!t) {
    router.push("/404");
  }
  return t;
})

let articleList = ref([]);
// 根据tagName请求后台获取articleList
let getData = async () => {
  let rep = await searchByTag(tagName.value);
  articleList.value = rep.data;
}
getData();
// 判断有无文章
let hasArticle = computed(() => {
  if (articleList.value.length != 0) {
    return true;
  } else {
    return false;
  }
})

// 渲染文章，传数据给list组件

// 获取所有tags
let tagsText = getTags();
// console.log(tagsText.value);

watch(tagName,() => {
  getData();
})

</script>

<style lang="scss" scoped>
.tagsPageWrap {
  width: 100vw;
  flex-direction: column;
  justify-content: flex-start;
  @include themeify {
    background-color: themed("article-page-bg-color");
  }  
}

.headArea{
  width: 100%;
  height: 300px;
  padding-top: 60px;
  @include themeify {
    border-bottom: solid 1px themed("line-color");
  }  
  .searchTag {
    font-size: 30px;
    font-weight: bold;
    word-break:break-all;
    margin: 20px;
  }
}


.allTagsBar {
  width: 100vw;
  padding-top: 20px;
  padding-bottom: 20px;
  flex-direction: column;
  @include themeify {
    background-color: themed("index-page-bg-color");
  }  

  .tagsListTitle {
    font-size: 22px;
    margin: 10px;
    font-style: italic;
    @include themeify {
    color: themed("line-color");
  }  
  }
  .tagsList {
    width: 100%;
    flex-wrap: wrap;
  }
}

.mainArea {
  padding-left: 15px;
  padding-right: 15px;
  width: 100vw;
  box-sizing: border-box;
  @include themeify {
    background-color: themed("index-page-bg-color");
  }  

  .notFoundTags {
    font-size: 22px;
    margin: 40px;
  }
}
</style>