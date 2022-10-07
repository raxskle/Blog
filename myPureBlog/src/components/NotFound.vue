<template>
<div class="notFound">
  <div class="p404">404</div>
  <div>Page not found</div>
  <div  class="imgWrap"><img ref="box1" @click.prevent="null"  class="img" src="../assets/image/404.png" /></div>
  <div>你已登陆火星</div>
  <div class="toHomeBtn" @click="toHome">返回地球</div>
</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onBeforeUnmount, onMounted,   ref } from 'vue';
let router = useRouter();
let toHome = () => {
  router.push("/")
}

let box1 = ref(null);
let centerX:number;
let centerY:number;
let top1:number;
let left1:number;
let parallax = (e) => {
  // 除以不同系数使不同box偏移量不同，形成视差
  let ex1 = (e.clientX - centerX) / 15;
  let ey1 = (e.clientY - centerY)/15;

  // 原位置加上偏移量就跟随鼠标，减去偏移量就躲避鼠标
  box1.value.style.left = left1 - ex1 + "px";
  box1.value.style.top = top1 - ey1 + "px";
};

onMounted(() => {
  // 以center为中心，box跟随鼠标偏移
  centerX = document.body.clientWidth/2;
  centerY = document.body.clientHeight/2;
  top1 = box1.value.offsetTop;
  left1 = box1.value.offsetLeft;
  document.addEventListener("mousemove", parallax);
})


onBeforeUnmount(() => {
  document.removeEventListener("mousemove", parallax);
})


</script>

<style lang="scss" scoped>
  .notFound {
    width: 100vw;
    flex-direction: column;
    background-color: white;
    z-index: 3;
    .p404 {
      font-size: 8vh;
      color:black;
      + div {
        color:black;
      }
    }

  }

.toHomeBtn {
  @include articleData-default;
  transition: all .4s;
  &:hover {
    cursor: pointer;
    @include hover-effect;
  }
  margin: 10px;
}
.imgWrap {
  height: 50vh;
  width: 100vw;
  position: relative;

  > img {
    position: absolute;
    top: 10vh;
    height: 30vh;
    width: 35vh;
    z-index: -1;

  }

  +div {
    color:black;
  }
}
</style>