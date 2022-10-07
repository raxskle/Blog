<template>
  <div class="rightTagsContainer">
    <div class="rightTags">
      <Tags v-for="(tagText,index) in tagsText" :key="index" :tagText="tagText"></Tags>
    </div>

  </div>
</template>

<script lang="ts" setup>
import Tags from './Tags.vue';
import { getTags } from '../../../network/getTags';
import { ref } from 'vue';

let tagsText = ref([]);

getTags().then((res) => {
  // console.log(res.data);  
  res.data.forEach(val => {
    tagsText.value.push(val.tag_name);
  });
});



</script>

<style lang="scss" scoped>
.rightTagsContainer {
  margin-top: 20px;
  margin-bottom: 20px;
  .rightTags {
    flex-wrap: wrap;    
  }
}
</style>