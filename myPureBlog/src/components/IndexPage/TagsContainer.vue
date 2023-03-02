<template>
  <div class="tagsContainer">
    <div class="tagsList">
      <Tags v-for="(tagText,index) in tagsText" :key="index" :tagText="tagText"></Tags>
    </div>

  </div>
</template>

<script lang="ts" setup>
import Tags from '../Tags.vue';
import { getTags } from '../../network/getTags';

let tagsText = getTags();


</script>

<style lang="scss" scoped>
.tagsContainer {
  margin-top: 20px;
  margin-bottom: 20px;
  .tagsList {
    flex-wrap: wrap;    
  }
}
</style>