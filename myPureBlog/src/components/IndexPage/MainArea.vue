<template>
<div class="mainWarp">
  <div class="mainContainer">
    <ArticleList></ArticleList>
    <div class="rightSide">
      <RightSideBox></RightSideBox>
      <RightSideTags></RightSideTags>
    </div>
  </div>  
</div>

</template>

<script lang="ts" setup>
import ArticleList from './InMainArea/ArticleList.vue';
import RightSideBox from './InMainArea/RightSideBox.vue';
import RightSideTags from './InMainArea/RightSideTags.vue';

</script>

<style scoped>


/* 文字超出自动换行 */
/* word-break: break-all;
overflow-y: hidden;
text-overflow:ellipsis; */


.mainWarp{
  width: 100vw;
  flex-direction: row;
  z-index: 2;
}
.mainContainer{
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;  
  flex: 1;  
  max-width: 1000px;
  z-index: 3;
  /* warp撑满屏幕100vw */
  /* flex=1撑满整个warp，但是设置了最大1000px */
  /* marign让屏幕不断缩小时两边的边距保持不变 */
  /* height: 1000px;   */
  margin-left: 20px;
  margin-right: 20px;
  /* background-color: rgb(254, 244, 230); */
} 

.rightSide{
  justify-content: flex-start;
  flex-direction: column;
  width: 35%;
  max-width: 320px;
  margin-left: 20px;
  margin-right: 10px;
  height: atuo;
  /* background-color: rgb(118, 192, 192); */
}


@media all and (max-width: 800px) {
  .rightSide{
    display: none;
  }  
}

@media all and (min-width: 800px) {
  .rightSide{
    display: flex;
  }  
}


</style>