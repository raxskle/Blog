<template>
<div class="pageTailWarp">
  <div class="likeBtn">
    <div class="likeBtnImg" @click="zan"></div>
  </div>
  <div class="likeNums">{{likeNums}}</div>
  <div class="tailText">   
    <p>Designed and developed by Raxskle.</p>
    <p>© 2022 &nbsp; raxskle.fun</p>
    <a href="https://beian.miit.gov.cn" target="_blank" >粤ICP备2022123403号</a>
  </div>

</div>
</template>

<script lang="ts" setup>
import { useStore } from '../store/index.js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue'
const store = useStore();
const { likes:likeNums } = storeToRefs(store);
let addLikes = store.addLikes;
let toPostAddLikes = store.toPostAddLikes;

let zanFinish = null;
let zan = (e) => {
  e.target.className = "likeBtnImg rotate-center ";
  if (zanFinish == null) {
    zanFinish = setTimeout(() => {
      e.target.className = "likeBtnImg ";
      addLikes(); 
      toPostAddLikes();
      zanFinish = null;
    }, 2000);    
  }

}


</script>

<style lang="scss" scoped>
.pageTailWarp {
  width: 100vw;
  height: 300px;
  @include themeify {
      background-color: themed('line-color');
    }   
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.likeNums {
  margin-top: 10px;
  margin-bottom: 60px;
  transition: all .5s;
  @include articleData-default;
  width: auto;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid white;
}
.likeBtn {
  border-radius: 50%;
  margin-top: 60px;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  // overflow: hidden;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  .likeBtnImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border:  1px solid white;
    overflow: hidden;
    background-image: url("../assets/image/zan.webp");
    background-size:  100%; 
    
  }

  .rotate-center {
    -webkit-animation: rotate-center 2s ease-in-out both;
            animation: rotate-center 2s ease-in-out both;
  }

  @keyframes rotate-center {
    0% {
      -webkit-transform: rotate(0);
              transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(1440deg);
              transform: rotate(1440deg);
    }
  }
}

.tailText {
  flex-direction: column;
  p , a {
    font-size: 13px;
    margin-bottom: 8px;
  }

  a {
    @include themeify {
      color: themed('font-color');
    } 
    &:hover {
      cursor: default;
    }
  }
}
</style>