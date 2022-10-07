<template>
  <div class="articleBox" @click="toArticlePage">
    <div class="articleTitle">{{articleData.title}}</div>
    <div class="articleContent">
      <p>{{articleData.content}}</p>
    </div>

    <div class="articleInfo">
      <div class="articleTime">{{articleData.time}}</div>
      <div class="articleClass">{{articleData.class}}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { useRouter } from "vue-router"
let router = useRouter();


let props = defineProps({
  article: {
    type: Object,
  }
})
let { article: articleData} = toRefs(props);
// console.log(articleData.value);
// console.log("articleData.id", articleData.value.id)


// Ref<Record<string, any>>是个啥？？？
let toArticlePage = () => {
  router.push(`/article?id=${articleData.value.id}`);
}

</script>

<style lang="scss" scoped>
.articleBox {
  width: 100%;
  height: 170px;
  z-index: 5;
  @include themeify {
    background-color: themed('box-bg-color') ;
  }

  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  border-radius: 6px;
  transition: all .4s;
  padding-bottom: 8px;
  padding-top: 4px;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    @include themeify {
      box-shadow: 1px 1px 6px .5px themed('box-shadow-color');
    }
    
  }

}

.articleTitle {
  @include articleTitle-default;
  flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    // text-overflow: ellipsis;
    white-space: nowrap;
}

.articleContent {
  width: 100%;
  height: 64px;
  /* background-color: rgb(186, 131, 60); */
  overflow: hidden;
  transition: all .5s;
  cursor: pointer;
  >p{
    transition: all .5s;
  } 
  >p:hover {
    @include hover-effect;
  }

}

.articleContent p {
  padding: 0px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 15px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
}

.articleInfo {
  height: 26px;
  width: 80%;
  /* background-color: rgb(253, 166, 166); */
  flex-direction: row;
  justify-content: flex-start;
  .articleTime {
    @include  articleData-default;
    margin-right: 26px;
  }  

  .articleClass {
    @include  articleData-default;
  }

}



</style>