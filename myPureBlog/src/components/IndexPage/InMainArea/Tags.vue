<template>
  <div class="tagContainer">
    <div class="tagText">{{tagText}}</div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

let props = defineProps({
  tagText: {
    type:String,
  }
})
let { tagText } = toRefs(props);

</script>

<style lang="scss" scoped>
.tagContainer{
  width: auto;
  height: $tag-height;
  @include themeify {
    background-color:themed('box-bg-color') ;
  }   
  
  border-radius:$tag-border;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  transition: all .4s;
  &:hover {
    @include themeify {
      background-color: themed('box-bg-color-deep');
    }   

  }


  .tagText {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>