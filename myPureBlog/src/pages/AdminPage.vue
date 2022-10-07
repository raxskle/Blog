<template>
  <div class="adminContainer">
    <div class="adminTitle">欢迎回来</div>
    <div class="menu">
      <div class="saveToJPEG" @click="savePNG">保存为png</div>      
      <div class="saveToString" @click="saveString">保存至剪切板</div>      
      <div class="saveToDataBase" @click="saveDataBase">保存至数据库</div>      
    </div>
    <div class="mdEditorContainer">
      <div class="mdEditorRaw">
        <div class="articleData">
          <input type="text" placeholder="title" v-model="articleTitle" />
          <input type="text" placeholder="class" v-model="articleClass"/>
          <input type="text" placeholder="tags" v-model="articleTags"/>
        </div>
        <textarea v-model="rawText"></textarea>
      </div>
      <div class="mdEditorHTML"> 
        <div class="mdContentBar" v-html="HTMLText"></div>
      </div>
    </div>

  </div>
</template>

<script setup>
import{ marked} from "marked";
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import html2canvas from 'html2canvas';
import { postArticle } from "../network/postArticle"
import { postTags } from "../network/postTags"
let router = useRouter();

let rawText = ref("");
let HTMLText = ref("");
let articleTitle = ref("");
let articleClass = ref("");
let articleTags = ref("");

let token = sessionStorage.getItem("adminToken");
// 有token就能进入当前页面
// （一次页面会话的时间内应该不会过期吧。。。
if (!token) {
  router.replace("/");
}
console.log(token);

watch(rawText, (newval) => {
  HTMLText.value = marked.parse(newval);
  // console.log(HTMLText.value)
})

let savePNG = () => {
  html2canvas(document.querySelector(".mdContentBar"),{
    useCORS:true,
    allowTaint: true,
    logging: true,
    }).then((canvas)=> {
     	//获得图片的base64
      let dataURL = canvas.toDataURL();
      let dd = document.createElement("a");
      dd.href = dataURL;
      dd.download = "downImg";
      dd.click();
    });
}


let saveString = async () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(HTMLText.value); 
  } else {
    var tag = document.createElement('textarea');
    tag.setAttribute('id', 'cp_jqb_textarea');
    tag.value = HTMLText.value;
    document.getElementsByTagName('body')[0].appendChild(tag);
    document.getElementById('cp_jqb_textarea').select();
    document.execCommand('copy');
    document.getElementById('cp_jqb_textarea').remove();
  }

}

// 保存数据库，带token
let saveDataBase = () => {
  if (!articleTitle.value) {
    console.log("未输入标题");
    return;
  }
  console.log("保存中");
  let date = new Date();
  // console.log(`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`)
  let data = {
    title: articleTitle.value,
    content: HTMLText.value,
    class: articleClass.value,
    tags: articleTags.value,
    time: `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`,
  }
  postArticle(data);
  postTags({
    tag:articleTags.value,
  });

}


</script>

<style lang="scss" scoped>
.adminContainer {
  width: 100vw;
  flex-direction: column;
  align-items: flex-start;
  // z-index: 3;

  .adminTitle {
    font-size: 20px;
    margin: 10px;
  }

  .menu {
    width: 100%;
    >div {
      @include articleData-default;
      width: auto;
      box-sizing: border-box;
      height: 35px;
      width: 150px;
      padding: 5px;
      margin: 5px;
      cursor: pointer;
      &:active {
        border: 3px solid rgb(98, 98, 98);
      }
      &:hover {
        background-color: rgb(185, 185, 185);        
      }
    }
  }
}


.mdEditorContainer {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;



  .mdEditorRaw {
    width: 40%;
    margin-right: 10px;
    height: 600px;
    flex-direction: column;
    .articleData {
      height: 50px;
      width: 100%;
      justify-content: space-evenly;

      >input {
        height: 30px;
        width: 28%;
        border-radius: 15px;
        border: 2px solid rgb(191, 191, 191);
        padding-left: 15px;
        font-size: 16px;
      }
    }
  }

  .mdEditorHTML {
    // margin-top: 20px;
    // margin-bottom: 20px;
    // padding-bottom: 80px;
    width: 40%;
    height:600px;
    overflow: hidden;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .mdContentBar {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
      height: 600px;
      padding-left: 10px;
      overflow-y: scroll;
      @include themeify {
        color: themed('font-color'); 
      }  
      // padding-left: 10px;
    }
  }


}


textarea {
  width: 100%;
  height: 550px;
  box-sizing: border-box;
  resize: none;
  background-color: rgb(246, 246, 246);
  border-radius: 8px;
  border: solid 2px rgb(162, 162, 162);
  padding: 10px;
  // font-family: "MICROSOFT JHENGHEI";
  font-size: 16px;
  
}
</style>