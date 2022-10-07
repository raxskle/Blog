<template>
<div v-if="!showRightSideArea" class="btn-hidden" @click="show"><img  src="../../assets/image/325-circle-left.svg"/></div>
<div v-if="showRightSideArea" ref="rightSideArea" class="rightSideArea">
<div class="btn" @click="hide"><img src="../../assets/image/323-circle-right.svg"/></div>
  <div class="catalogue">
    <div class="title">目录</div>
    <div class="itemWrap">
      <div class="catalogueItem" v-for="(catalogue, index) in articleCatalogueList" :key="index" @click="toH2posi"  >{{catalogue}}</div>
    </div>
  </div>
  <div class="moreArticles">
    <div class="title">标签</div>
    <Tags v-for="(tag,index) in tags" :key="index" :tagText="tag"></Tags>
  </div>
</div>


</template>

<script lang="ts" setup>
import {  ref, toRefs, } from 'vue';
// import { marked } from 'marked';
// import RightSideTags from "../IndexPage/InMainArea/RightSideTags.vue"
import Tags from "../IndexPage/InMainArea/Tags.vue"

let props = defineProps({
  articleCatalogueList: {},
  tags:{},
})
let { articleCatalogueList,tags } = toRefs(props);

let toH2posi = (e) => {
  // console.log(e.target.parentNode.children[3] == e.target);
  let i = 0;
  for (; i < e.target.parentNode.children.length; i++){
    if (e.target.parentNode.children[i] == e.target) {
      break;
    }
  }
  if (i < e.target.parentNode.children.length) {
    console.log(i);
    let h2List = document.querySelectorAll(".mdContentBar >h2") as NodeListOf<HTMLElement>;
    console.dir(h2List[i]);
    window.scrollTo({
      top: h2List[i].offsetTop,
      behavior: 'smooth'
    });

    
  }
  
}

let rightSideArea = ref(null);
let showRightSideArea = ref(true);
let hide = () => {
  console.log(rightSideArea.value);
  rightSideArea.value.style.transform = "translateX(22vw)";
  setTimeout(() => {
    showRightSideArea.value = false;  
  }, 500);
}
let show = () => {
  console.log(rightSideArea.value);
  showRightSideArea.value = true;  
}

</script>

<style lang="scss" scoped>

.btn {
  width: 35px;
  height: 35px;
  border-radius: 25%;
  @include themeify {
  background-color:  themed('index-page-bg-color');
  border: 1px solid themed('line-color');    
  }

  position: absolute;
  top: 300px;
  left: -44px;
  opacity: 0%;
  cursor: pointer;
  transition: all .5s;
  &:hover {
    opacity: 100%;
    @include themeify {
      background-color: themed('btn-hover-color');        
    }

  }

  > img {
    width: 60%;
    @include themeify {
    filter: themed('btn-img-filter');      
    }

  }
}

.btn-hidden {
  width: 35px;
  height: 35px;
  border-radius: 25%;
  @include themeify {
    background-color: themed('index-page-bg-color');
    border: 1px solid themed('line-color');
  }  
  
  
  position: sticky;
  top: 345px;
  right: 14px;
  cursor: pointer;
  transition: all .5s;
  &:hover {
    opacity: 100%;
    @include themeify {
    background-color: themed('btn-hover-color');  
  }  
  
  }
  
  > img {
    width: 60%;
    @include themeify {
      filter: themed('btn-img-filter');  
    }  

  }
}
.rightSideArea {
  position: sticky;
  flex-direction: column;
  justify-content: flex-start;
  top: 45px;
  min-height: 800px;  
  width: 20VW;
  min-width: 250px;
  margin-top: 45px;
  margin-right: 10px;
  transition: all .4s;
  transition-property:transform;
  transition-duration: .6s;
  @include themeify {
  border-left: .5px solid themed('line-color');      
    }    
  background-color: rgba(129, 129, 129, 0.05);  

}

@media screen and (max-width: 1000px) {
  .rightSideArea{
    display: none;
  }

  .btn-hidden {
    display: none;   
  }
}

.catalogue {
  width: 100%;
  height: 350px;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-bottom: 10px;




  .itemWrap{
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: auto;  
    overflow-x: hidden;  
    width: 90%;
    padding: 5px;
    padding-left: 7px;
    flex-grow: 1;
    align-items: center;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 2px;
      height: 2px;  
      @include themeify {
        background-color: themed(catalogue-scroll);
      }     
      
    }

    &::-webkit-scrollbar-thumb {
      @include themeify {
        background-color: themed(catalogue-thumb);
      }     
      border-radius: 5px;
    } 




    .catalogueItem {

      // min-width: 80%;
      margin: 5px;
      box-sizing: border-box;
      padding-bottom: 5px;
      padding-top: 5px;
      padding-left: 15px;
      width: 90%;
      justify-content: flex-start;
      // background-color: white;
      // height: 50px;
      @include themeify {
        border-bottom: solid 1px themed('box-bg-color-deep');
      }      
      
      transition: all .5s;     
      
      &:hover {
        @include hover-effect;
        cursor: pointer;
        @include themeify {
        background-color: themed('box-bg-color-deep');
        }     
        
        border-radius: 8px; 
      }
    }    
  }

}


.title {
    // border-top: solid 1px rgb(213, 213, 213);
    // border-bottom: solid 1px rgb(213, 213, 213);
    @include themeify {
    background-color: themed('box-bg-color-deep');
    }   
    border-radius: 10px;
    padding-top: 4px;
    padding-bottom: 4px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 60%;
  }

.moreArticles {
  width: 100%;
  // height: 300px;
  flex-grow: 1;
  overflow: hidden;
  border-top: .5px  dashed rgba(189, 189, 189, 0.322);
  justify-content: flex-start;
  flex-direction: column;
  // @include themeify {
  //   background-color:themed('head-mask-color') ;
  // }   
}

</style>