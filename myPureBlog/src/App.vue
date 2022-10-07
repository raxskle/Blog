<template>
  <router-view @copy="showPopup(`复制转载内容请注明来源！`)"></router-view>
  <!-- chrome 1535*720 -->
  <!-- edge 1535*707 -->
  <!-- <div class="mousePosition">{{x}}  {{y}}</div> -->
  <div v-if="mask" class="mask"></div>
  <transition  name="popupTrans">
    <Popup v-if="ifShowPopup"  @fadePopup="fadePopup" :content="content"></Popup>
  </transition>
</template>

<script lang="ts" setup>
import { onMounted, ref,computed, watch } from 'vue';
import { useStore } from 'vuex'
import Popup from './components/Popup.vue';
const store = useStore();
let updateBlogData = () => store.dispatch('fetchBlogData');
// 在这里请求数据
updateBlogData();


let x = ref(0);
let y = ref(0);
document.addEventListener("mousemove", (e) => {
  x.value = e.clientX;
  y.value = e.clientY;
});


let mask = ref(true);
onMounted(() => {
  setTimeout(() => {
    mask.value = false;
  }, 800);  
})

let content = ref("");
let likeNums = computed(() => store.state.likes);

let ifShowPopup = ref(false);
let showPopup = (text) => {
  content.value = text;
  ifShowPopup.value = true;
}
let fadePopup = () => {
  ifShowPopup.value = false;
}

watch(likeNums, (newval, oldval) => {
  if (oldval != 0) {
    console.log(likeNums.value);
    showPopup("点赞一次就够了噢");    
  }
})

if (import.meta.env.VITE_APP_NODE_ENV == 'development') {
  console.log("dev");
}
console.log(import.meta.env.VITE_APP_NODE_ENV)
if (import.meta.env.VITE_APP_NODE_ENV == 'production') {
  console.log("pro");
}









</script>

<style lang="scss" scoped>
#app{
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100vw;
}
/*类名属性写在<router-view>组件里 会被<router-view>组件的根标签继承 */

.mousePosition{
  position: fixed;
  z-index: 6;
  top: 0px;
  left: 0px;
}


.mask {
  position: absolute;
  z-index: 100;
  top: 0;
  width: 100vw;
  height: 100%;
  @include themeify {
    background-color: themed('top-nav-bg-color');
  }   

  animation: mask 0.8s ease-in-out forwards;
}

@keyframes mask {
  0%{
    opacity: 100%;
  }
  100% {
    opacity: 0%;
    display: none;
  }
}



.popupTrans-enter-active {
  animation: showPopup .3s ease-out both;
}

@keyframes showPopup {
  0% {
    opacity: 0%;
    transform: translateY(20px);
  }
  100%{
    opacity: 100%;
    transform: translateY(0);
  }
}


.popupTrans-leave-active {
  animation: fadePopup .3s ease both;
}

@keyframes fadePopup {
  0% {
    opacity: 100%;
    transform: translateY(0);
  }
  100%{
    opacity: 0%;
    transform: translateY(-10px);
  }
}

</style>
