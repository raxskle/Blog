<template>
<div class="indexPage">
  <!-- 问题：indexPage直接由router-view显示
  当我需要控制mainSection居中页面时，似乎不知道把css写在哪里
  解决：加一个根标签，然后在这里或者在router-view写css都可以
  -->
  <TopNav></TopNav>
  <HeadArea></HeadArea>
  <MainArea></MainArea>
  <PageTail></PageTail>

  <ToTopBtn></ToTopBtn>
</div>


</template>

<script lang="ts" setup>
import TopNav from "../components/TopNav.vue";
import HeadArea from "../components/IndexPage/HeadArea.vue"
import MainArea from "../components/IndexPage/MainArea.vue";
import PageTail from "../components/PageTail.vue";
import ToTopBtn from "../components/ToTopBtn.vue";
</script>

<style lang="scss" scoped>

.indexPage{
  @include themeify {
    background-color: themed("index-page-bg-color");
  }  

  flex-direction: column;  
  width: 100%;
}
</style>