<template>
<div class="mainArea">
  <div  v-if="articleData" class="articleWrap">
    <div class="articleTitleBar">{{articleData.title}}</div>
    <div class="articleDataBar">
      <div class="timeBar">{{articleData.time}}</div>
      <div class="classBar">{{articleData.class}}</div>
    </div>
    <div class="tagsBar" v-if="articleData.tags != '' && articleData.tags != null && articleData.tags != ' ' "> 
      标签：{{articleData.tags}} 
    </div>
    <div class="articleContentBar">
      <!-- <div class="contentBar">
        {{articleMdText}}
      </div> -->
      <div class="mdContentBar" v-html="articleData.content"></div>

    </div>
    
  </div>
  <div class="articleFooter">
    <div ref="prior" class="prior" @click="toArticle(articleData.id+1)">{{priorText}}</div>
    <!-- <div class="footerText">转载本网站所有内容文字资料请注明来源！</div> -->
    <div ref="next" class="next" @click="toArticle(articleData.id-1)">{{nextText}}</div>
  </div>
  <div class="warning footerText">转载本网站所有内容文字资料请注明来源！ </div>
</div>
</template>


<script lang="ts" setup>
import { ref, toRefs, watch, onMounted, onUpdated, } from 'vue';
import { useStore } from '../../store/index.js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue'
import hljs from "highlight.js"

const store = useStore();
const { articlesNum } = storeToRefs(store);
// router push进入同一页面，js代码不会重复执行，数据不会更新

let props = defineProps({
  articleData: {
    type:Object,
  }
})
let { articleData } = toRefs(props);
// 防止还没拿到数据就先渲染报错，在组件写一个v-if="该数据"


let priorText = ref("上一篇");
let nextText = ref("下一篇");

let endPage = ref(0);

watch(articleData, (newval) => {
  if (newval.id == 1) {
    endPage.value = 2;
  } else if (newval.id == articlesNum.value) {
    endPage.value = 1;
  }
})

watch(endPage, (newval) => {
  if (newval == 1) {
    priorText.value = "无更多";   
    
  } else if (newval == 2) {
    nextText.value = "无更多";    
  }
})


let toArticle = (id:number) => {
  if (endPage.value == 0 ||
    (endPage.value == 1 && id == articleData.value.id - 1) ||
    (endPage.value == 2 && id == articleData.value.id + 1) ) {
    window.location.href = `${window.location.origin}${window.location.pathname}?id=${id}`  
  } 
}

let prior = ref(null);
let next = ref(null);

hljs.configure({languages: ["javascript"]});

onUpdated(() => {
  document.querySelectorAll('pre code').forEach(el => {
    hljs.highlightElement(el as HTMLElement);
    // hljs.highlightBlock(el as HTMLElement);
  });

    // 配置 highlight.js
    // hljs.configure({
    //   // 忽略未经转义的 HTML 字符
    //   ignoreUnescapedHTML: true,
    // });
    // 获取到内容中所有的code标签
    // const codes = document.querySelectorAll("pre code");
    // codes.forEach((el) => {
    //   // 让code进行高亮
    //   hljs.highlightElement(el as HTMLElement);
    // });  
})

// onUpdated(() => {
//   hljs.initHighlightingOnLoad();
//   hljs.highlightAll();  
// })


</script>

<style lang="scss" scoped>
.mainArea {
  min-height: 800px;
  width: 70%;
  flex-grow: 1;
  align-items: center;
  flex-direction: column;
  // background-color: rgba(255, 255, 255, 0);
  transition: all 1s;

}

.articleFooter {
  height: 50px;
  width: 90%;
  // background-color: rgb(239, 239, 239);
  border-radius: 15px;
  margin-bottom: 20px;

  justify-content: space-between;
  >.prior , >.next {
    @include themeify {
      color:  themed('font-color');
      background-color: themed('box-bg-color-deep');   
    }
    height: 45px;
    width: 75px;
    min-width: 75px;
    border-radius: 15px;
    cursor: pointer;
    transition: all .4s;
    &:hover{
      @include hover-effect;
    }

  }

}
.footerText {
    flex-grow: 1;
    font-size: .8em;
    max-height: 65px;
    overflow: hidden;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 20px;
    color: rgb(158, 158, 158);
    user-select: none;
  }

@media screen and (max-width: 1000px) {
  .mainArea{
    width: 100%;
  }


}


.articleWrap {
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 60px;
  box-sizing: border-box;
  width: 100%;
  max-width: 900px;
  // margin-left: 30px;
  // margin-right: 30px;
  padding-left: 20px;
  padding-right: 20px;

  min-height: 600px;
  // background-color: rgba(124, 67, 67, 0);
  // border-bottom: 1px solid rgb(220, 220, 220);
  margin-bottom: 40px;
  .articleTitleBar {
    @include articleTitle-default;
    margin-top: 50px;
    padding-bottom: 10px;
    font-size: 28px;
    font-weight: 600;
    // max-width: 80%;
    overflow: hidden;
    height:auto;
  }

  .articleDataBar {
    margin-top: 10px;
    margin-bottom: 10px;
    animation: slide-top-fast 0.5s ease-in-out both;
    .timeBar{
      @include articleData-default;
      margin-right: 20px;
      margin-left: 25px;
      position: relative;
      &::before {
        content: "📅 ";
        position: absolute;
        left: -24px;
        top: 0;
      }
      
    }

    .classBar {
      @include articleData-default;      
      position: relative;
      margin-left: 25px;
      &::before {
        content: "📂 ";
        position: absolute;
        left: -24px;
        top: 0;
      }
    }
    
  }

  .tagsBar {
    animation: slide-top-fast 0.5s ease-in-out both;   
    font-style: italic;
    margin-left: 5px; 
    color: grey;
  }

  

  .articleContentBar {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 80px;
    @include themeify {
      border-bottom: 1px solid themed('box-bg-color-deep');
    }
    
    // padding-left: 10px;
    width: 100%;
    overflow: hidden;
    flex-direction: column;
    // background-color: antiquewhite;
    animation: slide-top-slow 0.8s ease-in-out both;  
  }
}


@keyframes slide-top-fast {
  0% {
    transform: translateY(20px);
    opacity: 40%;
  }
  100% {
    transform: translateY(0);
    opacity: 100%;
  }
}

@keyframes slide-top-slow {
  0% {
    transform: translateY(40px);
    opacity: 40%;
  }
  100% {
    transform: translateY(0);
    opacity: 100%;
  }
}


.mdContentBar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  @include themeify {
    color: themed('font-color'); 
  }  
  // padding-left: 10px;
}


pre code {
  color: antiquewhite;
}

</style>