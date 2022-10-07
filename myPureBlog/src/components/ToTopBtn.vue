<template>
<div  ref="toTopBtn" class="toTopBtn" @click="moveToTop">
  <img class="toTopBtnIcon" src="../assets/image/315-arrow-up2.svg" />
</div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue';

let toTopBtn = ref(null);
let scrollTop:number;
let showToTopBtn = () => {
  if (scrollTop <= window.scrollY) {
    // console.log("下拉");
    if (scrollTop > 400) {
      toTopBtn.value.className = "toTopBtn slide-in-right";
    } 
  } else if (scrollTop > window.scrollY) {
    if (scrollTop > 400) {
      toTopBtn.value.className = "toTopBtn slide-in-right";
    } else {
      toTopBtn.value.className = "toTopBtn slide-out-right";
    }    
  }
  scrollTop = window.scrollY;
}
window.addEventListener("scroll", showToTopBtn)

let moveToTop = () => {
  window.scrollTo({
    top: 0,
    behavior:'smooth'
  })
}

onUnmounted(() => {
  window.removeEventListener("scroll", showToTopBtn)
})

</script>

<style lang="scss" scoped>

.slide-in-right {
	-webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
    opacity: 1;
  }
}
@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
    opacity: 1;
  }
}

.slide-out-right {
	-webkit-animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	        animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@-webkit-keyframes slide-out-right {
  0% {
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
}
@keyframes slide-out-right {
  0% {
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
}

.toTopBtn {
  position: fixed;
  transform: translateX(100px);
  right: 14px;
  bottom: 50px;
  width: 35px;
  height: 35px;
  @include themeify {
    background-color: themed('index-page-bg-color');
    border: 1px solid themed('line-color');    
  }  

  cursor: pointer;
  transition: all .5s;
  border-radius: 25%;
  &:hover {
    @include themeify {
      background-color: themed('btn-hover-color');
    }  

  }
  .toTopBtnIcon {
    width: 60%;
    @include themeify {
      filter: themed('btn-img-filter');    
    }  

  }
}
</style>