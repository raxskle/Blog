<template>

    <div class="popup" >
      <div class="content">{{content}}</div>
    </div>


</template>

<script lang="ts" setup>
import { toRefs } from "vue";
let props = defineProps({
  content: {},
  show: {}
})
let { content } = toRefs(props);
let emit = defineEmits(["fadePopup"]);

console.log(content.value);

setTimeout(() => {
  emit("fadePopup");
}, 2000);


</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 60px;
  height: 40px;
  width: 80vw;
  max-width: 300px;
  z-index: 10;
  border-radius: 20px;  
  @include themeify{
    background-color: themed('box-bg-color');
  }
  

}

// .popupTrans-enter-active {
//   animation: showPopup 1s ease-in both;
// }

// @keyframes showPopup {
//   0% {
//     opacity: 0%;
//     transform: translateY(20px);
//   }
//   100%{
//     opacity: 70%;
//     transform: translateY(0);
//   }
// }


// .popupTrans-leave-active {
//   animation: fadePopup 1s ease-in both;
// }

// @keyframes fadePopup {
//   0% {
//     opacity: 70%;
//     transform: translateY(20px);
//   }
//   100%{
//     opacity: 0%;
//     transform: translateY(0);
//   }
// }


</style>