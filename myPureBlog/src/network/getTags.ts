import { ref } from "vue";
import axios from "./axios";

function getTags() {
  const requireTags = new Promise<any>((resolve, reject) => {
    axios
      .get(`/tags`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  
  let tagsText = ref([]);
  requireTags.then((res) => {
    res.forEach((val: { tag_name: string; }) => {
      tagsText.value.push(val.tag_name);
    });
  });
  // console.log(tagsText.value)
  return tagsText;
}

export { getTags };
