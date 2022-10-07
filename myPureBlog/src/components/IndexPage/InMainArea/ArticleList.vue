<template>
<div class="listContainer">
  <div class="articleItemWrap">
    <ArticleItem v-for="(article, index) in articlesList.slice(startNum,endNum)" :key="index" :article="article"></ArticleItem>
  </div>
  <div class="turnPages">
    <div  ref="turnPageBtn" v-for="(index) in articlesPagesNum" :key="index" class="turnPageBtn" @click="changePage(index)">{{index}}</div>
  </div>
</div>
</template>

<script lang="ts" setup>
import ArticleItem from './InArticleList/ArticleItem.vue';
import { getBriefArticles } from '../../../network/getBriefArticles';
import { onMounted, onUpdated, ref, watch } from 'vue';
import { useRouter } from "vue-router";
import { getUrlPage } from "../../../utils/getURL";
let router = useRouter();



// interface ArticlesData {
//   title: string,
//   content: string,
//   class: string,
//   tags: string,
//   time: string,
// }
// 每次进入或者点击分类，articlesList都是新的[]
let articlesList = ref([]);
let articlesPagesNum = ref(1);
// curentPage 从1开始计
let curentPage = ref("1");
curentPage.value = getUrlPage();
// console.log(curentPage.value);

// 从0开始计
let startNum = ref(0);
let endNum = ref(6);
startNum.value = (parseInt(curentPage.value) - 1) * 6;
endNum.value = (parseInt(curentPage.value)) * 6;
// console.log(startNum.value, endNum.value)

let getArticlesData = (params:string) => {
  getBriefArticles(params).then((res) => {
    // console.log(res.data);
    if (articlesList.value.length!=0) {
      articlesList.value = [];
    }
    res.data.forEach(val=> {
      articlesList.value.push(val);
    });
    // console.log(articlesList.value)
    articlesPagesNum.value = Math.ceil(articlesList.value.length / 6);
    // console.log(articlesPagesNum.value);
  });
  
}
let params = router.currentRoute.value.path;

if (params == '/') {
  params = '/all'
}
// console.log(params)
getArticlesData(params);



watch(router.currentRoute, (newval) => {
  let params = newval.path == '/' ? '/all' : newval.path;
  // console.log(params);
  curentPage.value = getUrlPage();
  getArticlesData(params);
})


// 翻页
let changePage = ( index ) => {
  if (!(curentPage.value == "1" && index == 1)) {
    router.push(`${router.currentRoute.value.path}?page=${index}`);
  }
}

let lastRoute = router.currentRoute.value.path;
watch(curentPage, (neval) => {
  startNum.value = (parseInt(neval)-1) * 6;
  endNum.value = (parseInt(neval)) * 6;
  // console.log(startNum.value, endNum.value);

  // 滚动高度  
  if (lastRoute == router.currentRoute.value.path) {
    let newTop = document.querySelector("div.articleBox") as HTMLElement;
      // console.dir(newTop.offsetTop);
      window.scrollTo({
        top: newTop.offsetTop - 60,
        behavior: 'smooth'
      });    
  }
  lastRoute = router.currentRoute.value.path;
})

let turnPageBtn=ref(null)
onMounted(() => {
// v-for 生成的节点在onMounted这个生命周期中不能获取到，只能onUpdate
  // let turnPageBtn = document.querySelector(".turnPages");
  // console.log(turnPageBtn.value)  
})
onUpdated(() => {
  // console.log(turnPageBtn.value)    
  turnPageBtn.value.forEach((target) => {
    // console.log(target.innerText,curentPage.value)
    if (target.innerText == parseInt(curentPage.value)) {
      target.className = "turnPageBtn active";
    } else {
      target.className = "turnPageBtn";
    }
  })
  // console.log(curentPage.value)
})


</script>

<style lang="scss" scoped>

.listContainer {
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 100%;
  min-height: 600px;
  margin-top: 20px;
  .articleItemWrap {
    flex-direction: column;
    justify-content: space-between;
  }
}


.turnPages {
  height: 80px;
  width: 80%;
  .turnPageBtn {
    color: grey;
    padding: 5px;
    @include themeify {
        background-color: themed('box-bg-color');
    }  
    font-size: 22px;
    font-weight: 600;  
    margin: 5px;
    border-radius: 6px;
    cursor: pointer;
    transition: all .5s;
    &:hover {
      @include themeify {
        color: themed('text-hover-effect-color');
      }  
    }
  }
}

.active {
  @include themeify {
    color: themed('text-hover-effect-color');
  }  
}
</style>