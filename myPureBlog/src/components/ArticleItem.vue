<template>
  <div class="articleBox" @click="toArticlePage">
    <div class="articleTitle">{{articleData.title}}</div>
    <div class="textnPic">

      <div ref="articleContent" class="articleContent">
          <p>{{contentText}}</p>
      </div>   

      <div v-if=" browsePicSrc!=null " class="browsePicture">
        <img v-if=" browsePicSrc!=null " :src="browsePicSrc"/>
      </div>  

    </div>



    <div class="articleInfo">
      <div class="articleTime">{{articleData.time}}</div>
      <div class="articleClass">{{articleData.class}}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs,ref,computed, watch, onMounted } from 'vue';
import { useRouter } from "vue-router";
let router = useRouter();


let props = defineProps({
  article: {
    type: Object,
  }
})
let { article: articleData} = toRefs(props);
// console.log(articleData.value);
// console.log("articleData.id", articleData.value.id)

let contentText = computed(() => {
  let i = articleData.value.content;
  if (i.length > 300) {
    i = i.slice(0, 300);
  }
  return i;
})

// Ref<Record<string, any>>是个啥？？？
let toArticlePage = () => {
  router.push(`/article?id=${articleData.value.id}`);
}


let articleContent = ref(null);
let browsePicSrc =  computed(() => {
  let i:string = null;
  articleData.value.content.replace(/<img.*?>/ , (s)=> {
    s.replace(/src=".*?"/, (ss) => {
      i=ss.slice(5, -1);

    })
  });
  // console.log(i);
  return i;
})

// 这里写得好怪。。
onMounted(() => {
  // watch(browsePicSrc,() => {
    if (browsePicSrc.value== null) {
      articleContent.value.className+=" articleContentNoPic ";
    } else {
      articleContent.value.className=" articleContent";
    }
  // })
})
watch(browsePicSrc,() => {
  if (browsePicSrc.value== null) {
    articleContent.value.className+=" articleContentNoPic ";
  } else {
    articleContent.value.className=" articleContent";
  }
})


</script>

<style lang="scss" scoped>
.articleBox {
  width: 100%;
  max-width: 670px;
  height: 180px;
  @media all and (max-width: 800px) {
    height:auto;
  }
  z-index: 5;
  @include themeify {
    background-color: themed('box-bg-color') ;
  }

  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
  border-radius: 6px;
  transition: all .4s;
  padding-bottom: 10px;
  padding-top: 5px;
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
  flex-wrap: wrap;
  // overflow-x: scroll;
  height: auto;
  padding-top: 6px;
  padding-bottom: 6px;
  max-width: 90%;
  // overflow-y: hidden;
  text-overflow: ellipsis;
  // white-space: nowrap;
  user-select:none;
}

.textnPic {
  width: 100%;
  flex: 1; // 高度撑起来
  justify-content: space-between;
  @media all and (max-width: 800px) {
    flex-direction: column;
  }
  @media all and (min-width: 800px) {
    flex-direction: row;
  } 
}
.articleContent {
  // flex-grow: 1;
  height: 98px;
  line-height: 140%;
  @media all and (max-width: 800px) {
    width: 100%;
  }
  @media all and (min-width: 800px) {
    width: 84%;
  }
  // margin-bottom: 50px;
  // line-height: 130%;
  /* background-color: rgb(186, 131, 60); */
  overflow: hidden;
  transition: all .5s;
  flex-direction: row;
  cursor: pointer;
  >p{
    transition: all .5s;
    word-break:break-all;
  } 
  >p:hover {
    @include hover-effect;
  }
}

.articleContentNoPic {
  width: 100%;
}
// $browsePicWidth : 64;
.articleContent > p {
  padding: 0px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 15px;
  box-sizing: border-box;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  display: -webkit-inline-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  word-break:break-all;
  user-select:none;
}

.articleInfo {
  height: 26px;
  width: 80%;
  // margin-top: 10px;
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

.browsePicture {
  @media all and (max-width: 800px) {
    display:flex;
    aspect-ratio: 1;
    width: 180px;
    height: 180px;
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    margin-bottom: 15px;
  }
  @media all and (min-width: 800px) {
    display: flex;
    // height: 100%;
    // aspect-ratio: 1;
    width: 96px;
    height: 96px;
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    margin-right: 2px;
  }
  overflow: hidden;

  >img {
    height: 100%;
  }

}

</style>
