<template>
<div ref="listContainer" class="listContainer">
  <div class="articleItemWrap">
    <ArticleItem v-for="(article, index) in articlesList.slice(startNum,endNum)" :key="index" :article="article"></ArticleItem>
    <div v-if="articlesList.length ==0" class="noArticle">暂无更多文章</div>
  </div>
  <div class="turnPages"> 
    <div  ref="turnPageBtn" v-for="(pageNum,index) in showPagesNumList" :key="index"  :class="pageNum == '...'? 'turnPageBtnDot':'turnPageBtn'" @click="changePage(pageNum)">{{pageNum}}</div>
  </div>
</div>
</template>

<script lang="ts" setup>
import ArticleItem from './ArticleItem.vue';
import { getBriefArticles } from '../network/getBriefArticles';
import { computed, ComputedRef, onMounted, onUpdated,  ref, toRefs, watch } from 'vue';
import { useRouter } from "vue-router";
import { getUrlPage } from "../utils/getURL";
let router = useRouter();
let props = defineProps({articleListByTag:Object})
let { articleListByTag } = toRefs(props);
// 每次进入或者点击分类，articlesList都是新的[]
let articlesList = ref([]);
let articlesPagesNum = ref<number>(1);    // 总页数
const showPagesNumList: ComputedRef<string[]> = computed((): string[] => {
  let list = [];
  if (articlesPagesNum.value <= 5) {
    for (let i = 1; i <= articlesPagesNum.value; i++){
      list.push(i.toString());
    }
  } else if (curentPage.value == "1" || curentPage.value == "2") {
    list.push("1");
    list.push("2");
    list.push("3");
    list.push("...");
    list.push(articlesPagesNum.value.toString());
  } else if (curentPage.value == "3") {
    list.push("1");
    list.push("2");
    list.push("3");
    list.push("4");
    list.push("...");
    list.push(articlesPagesNum.value.toString());
  } else if (curentPage.value == articlesPagesNum.value.toString() || curentPage.value == (articlesPagesNum.value - 1).toString()) {
    list.push("1");
    list.push("...");
    list.push((articlesPagesNum.value - 2).toString());
    list.push((articlesPagesNum.value - 1).toString());
    list.push(articlesPagesNum.value.toString());
  } else if (curentPage.value == (articlesPagesNum.value - 2).toString()) {
    list.push("1");
    list.push("...");
    list.push((parseInt(curentPage.value)-1).toString());
    list.push(curentPage.value);
    list.push((articlesPagesNum.value-1).toString());
    list.push(articlesPagesNum.value.toString());
  } else {
    list.push("1");
    list.push("...");
    list.push((parseInt(curentPage.value)-1).toString());
    list.push(curentPage.value);
    list.push((parseInt(curentPage.value)+1).toString());
    list.push("...");
    list.push(articlesPagesNum.value.toString());    
  }
  // console.log(list)
  return list;
});   // 放显示的数字


// curentPage 从1开始计
let curentPage = ref(getUrlPage());

// 从0开始计
let startNum = ref(0);
let endNum = ref(6);
startNum.value = (parseInt(curentPage.value) - 1) * 6;
endNum.value = (parseInt(curentPage.value)) * 6;
// console.log(startNum.value, endNum.value)

let listContainer = ref(null);

let getArticlesData = (params: string) => {
  // console.log(params);
  if (params != "/tags") {
    getBriefArticles(params).then((res) => {
      // console.log(res.data);
      if (articlesList.value.length!=0) {
        articlesList.value = [];
      }
      // console.log(res);
      res.forEach((val: any)=> {
        articlesList.value.push(val);
      });
      // console.log(articlesList.value)
      articlesPagesNum.value = Math.ceil(articlesList.value.length / 6);
      // console.log(articlesPagesNum.value);
      // console.log(articlesList.value)
    });
  }
}

let params = router.currentRoute.value.path == '/' ? '/all' : router.currentRoute.value.path;
// 只有all, learning, essay, share, tags
getArticlesData(params);

watch(router.currentRoute, (newval) => {
  let params = newval.path == '/' ? '/all' : newval.path;
  curentPage.value = getUrlPage();
  getArticlesData(params);
})

// console.log(router.currentRoute.value)

// 翻页
let changePage = (index: string) => {
  if (index != "...") {
    if (!(curentPage.value == "1" && index == "1")) {
      if (router.currentRoute.value.path != "/tags") {  
        router.push(`${router.currentRoute.value.path}?page=${index}`);      
      } else {
        router.push(`${router.currentRoute.value.path}?t=${router.currentRoute.value.query.t}&page=${index}`);     
      }   
    }
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

let turnPageBtn = ref(null);

onUpdated(() => {
  // console.log(turnPageBtn.value)    
  turnPageBtn.value.forEach((target: { innerText: string; className: string; }) => {
    // console.log(target.innerText,curentPage.value)
    if (target.innerText == curentPage.value) {
      target.className = "turnPageBtn active";
    } else {
      if (target.innerText == "...") {
        target.className = "turnPageBtnDot";
      } else {
      target.className = "turnPageBtn";        
      }

    }
  })
  // console.log(curentPage.value)

})

// 下面是tags页里使用这个组件的代码
onMounted(() => {
  if (params == "/tags") {
    listContainer.value.style.minHeight = "0px";
  } else {
    if (articlesList.value.length ==0) {
      (document.querySelector(".mainContainer")as HTMLElement).style.width = "96vw";
    }
  }


})
// 在tags页 文章数据以props传进来
watch(articleListByTag, (newval) => {
  if (newval.length != 0) {
    if (articlesList.value.length!=0) {
      articlesList.value = [];
    }
    newval.forEach((val: any) => {
      articlesList.value.push(val);
    });
    articlesPagesNum.value = Math.ceil(articlesList.value.length / 6);    
  }

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
  // min-width: 600px;
  .articleItemWrap {
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    // padding-top: 5px;
  }
}


.noArticle {
  margin-top: 100px;
  height: 200px;
  flex: 1;
}

.turnPages {
  height: 80px;
  width: 80%;
  .turnPageBtn {
    padding: 5px;
    padding-left: 8px;
    padding-right: 8px;
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

  .turnPageBtnDot {
    padding: 5px;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 22px;
    font-weight: 600;  
    margin: 5px;    
  }


}

.active {
  @include themeify {
    color: themed('text-hover-effect-color');
  }  
}
</style>