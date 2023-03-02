<template>
<div class="mainWarp">
  <div class="mainContainer">
    <ArticleList></ArticleList>
    <div class="rightSide">
      <RightSideBox></RightSideBox>
      <div class="tagsListTitle">所有tags:</div>
      <TagsContainer></TagsContainer>
    </div>
  </div>  

  <div class="allTagsBar">
    <div class="tagsListTitle">所有tags:</div>
    <TagsContainer></TagsContainer>
  </div>  

</div>

</template>

<script lang="ts" setup>
import ArticleList from '../ArticleList.vue';
import RightSideBox from './InMainArea/RightSideBox.vue';
import TagsContainer from './TagsContainer.vue';

</script>

<style lang="scss" scoped>


/* 文字超出自动换行 */
/* word-break: break-all;
overflow-y: hidden;
text-overflow:ellipsis; */


.mainWarp{
  width: 100vw;
  flex-direction: column;
  z-index: 2;
}
.mainContainer{
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;  
  flex: 1;  
  max-width: 1000px;
  /* max-width: 65%; */
  z-index: 3;
  /* warp撑满屏幕100vw */
  /* flex=1撑满整个warp，但是设置了最大1000px */
  /* marign让屏幕不断缩小时两边的边距保持不变 */
  /* height: 1000px;   */
  margin-left: 15px;
  margin-right: 15px;
  /* background-color: rgb(254, 244, 230); */
} 

.rightSide{
  justify-content: flex-start;
  flex-direction: column;
  width: 35%;
  max-width: 300px;
  margin-left: 20px;
  margin-right: 10px;
  height: atuo;
  /* background-color: rgb(118, 192, 192); */
}


.allTagsBar {
  width: 100vw;
  padding-top: 20px;
  padding-bottom: 20px;
  box-sizing: content-box;
  flex-direction: column;
  @include themeify {
    background-color: themed("index-page-bg-color");
    border-top: dashed themed("line-color") 1px;
  }  

}
.tagsListTitle {
  font-size: 22px;
  margin-top: 20px;
  font-style: italic;
  @include themeify {
    color: themed("line-color");
  }  
}

@media all and (max-width: 800px) {
  .rightSide{
    display: none;
  }  

  .allTagsBar {
    display: flex;
  }

}

@media all and (min-width: 800px) {
  .rightSide{
    display: flex;
  }  
  .allTagsBar {
    display: none;
  }
}


</style>