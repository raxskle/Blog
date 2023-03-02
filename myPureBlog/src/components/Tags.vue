<template>
  <div class="tagContainer" @click="toTags">
    <div class="tagText">{{tagText}}</div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { useRouter } from "vue-router";
let router = useRouter();

let props = defineProps(["tagText"])
let { tagText } = toRefs(props);

let toTags = () => {
  router.push(`/tags?t=${tagText.value}`);
}

</script>

<style lang="scss" scoped>
.tagContainer{
  width: auto;
  height: $tag-height;
  @include themeify {
    background-color:themed('box-bg-color') ;
  }   
  cursor: pointer;
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
    padding-left: 16px;
    padding-right: 16px;
    transition: all .4s;
    &:hover {
      @include hover-effect;    
    }

  }
}
</style>