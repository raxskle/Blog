<template>
<div class="headAreaWrap">
  <div  class="headAreaMask">

    <div class="headBox">
      <div class="headlineWrap">
        <div class="headline">{{headlineText}}</div>
      </div>
      
      <div class="headText">
        <div class="headText1">欢迎来到我的博客😋</div>    
        <!-- <div class="headText2"><a href="/article?id=1">本站如何搭建→</a></div>  -->
        <div class="headText3">{{time}}</div>
      </div>      
      <div class="box"></div>    
    </div>
      
    <div class="scrollToAIcon" @click="scrollToA"><img src="../../assets/image/324-circle-down.png" /></div>
  </div>  
</div>


</template>

<script setup>
import { onBeforeUnmount,  computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { webURL } from "../../config";

let router = useRouter();

let parallax = (e) => {
  let scrollTop = window.scrollY;
  let rate = scrollTop / window.innerHeight *100;
  // console.log(scrollTop);
  // console.log(window.innerHeight*0.6);
  // console.log('document.querySelector(".headText").style.top :', document.querySelector(".headText").style.top )
  // document.querySelector(".headAreaWrap").style.filter = `opacity(${100 - rate > 0 ? 100 - rate : 0}%) `;
  let mask = document.querySelector(".headAreaMask");
  mask.style.backdropFilter = ` blur(${rate / 4}px)`;
  // mask.style.cssText =`backdropFilter: blur(${rate / 4}px);`;

  // text
  // document.querySelector(".headline").style.position = "absolute";
  // let headlineOldTop = document.querySelector(".headline").offsetTop;
  // console.log(headlineOldTop);
  // let headTextOldTop = 320;
  // document.querySelector(".headline").style.top= `${headlineOldTop - scrollTop*1.5 > 0 ? headlineOldTop - scrollTop*1.5 :0 }px`;

  // document.querySelector(".headText").style.top = `${headTextOldTop + scrollTop*0.3}px`;

  // if (parseInt(document.querySelector(".headText").style.top) > window.innerHeight * 0.65) {
  //   document.querySelector(".headText").style.display = "none";
  //   // console.log("true")
  // } else {
  //   document.querySelector(".headText").style.display = "flex";    
  // }

}


window.addEventListener("scroll", parallax);



onBeforeUnmount(() => {
  window.removeEventListener("scroll", parallax);
  // 恢复headArea原本的样貌
  let mask = document.querySelector(".headAreaMask") ;
  mask.style.backdropFilter = ` blur(0px)`;
  // mask.style.cssText = `backdropFilter: blur(0px);`;
  // document.querySelector(".headText").style.display = "flex";
  // document.querySelector(".headline").style.top= `260px`;

  // document.querySelector(".headText").style.top = `320px`;

})



let time = ref((new Date()).toLocaleString());
setInterval(() => {
  time.value = (new Date()).toLocaleString();
}, 1000);

let scrollToA = () => {
  let newTop = document.querySelector("div.articleBox");
      // console.dir(newTop.offsetTop);
      window.scrollTo({
        top: newTop.offsetTop - 60,
        behavior: 'smooth'
      });    
}

let headlineText = computed(() => {
  let params = router.currentRoute.value.path;
  if (params == "/") {
    return "一个放文字的地方";
  } else if (params == "/learning") {
    return "学习笔记";
  } else if (params == "/share") {
    return "一些东西";
  } else if (params == "/essay") {
    return "随笔杂谈";
  }
})

// 首页图
onMounted(() => {
  let img = new Image();
  // console.log("1",img.complete);
  img.src = `/07.jpg`;
  // console.log("2",img.complete);
  img.addEventListener("load", () => {
    console.log("img loads");
    document.querySelector(".headAreaWrap").style.backgroundImage = "url('/07.jpg')";
    document.querySelector(".headAreaWrap").style.backgroundSize = " 100% auto";
    // document.querySelector(".headAreaWrap").style.backgroundPosition= " 0px 0px";
  })
})



</script>

<style lang="scss" scoped>

.headAreaWrap{
  margin-top: 45px;
  position: relative;
  flex-direction: column;
  background: url("../../assets/image/07ss.jpg");
  // background: url("https://pica.zhimg.com/v2-2fcdb328fc5e2e9933746764134d54d8_r.jpg");
  // background: url("https://pic2.zhimg.com/v2-bb29cc91537992ceb22431dae9f1af2f_r.jpg");
  // background: url("https://pic1.zhimg.com/v2-49eb09f8c139bc852dcb9b34a6ac222c_r.jpg");
  background-size: 100% auto;
  // background-position: 0px 0px;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  transition: background .8s;
  filter: opacity(80%);
  max-height: 75vh;
  @media screen and (min-width: 800px){
    width: 100vw;
    height: 75vh;
    background-position: 0px -100px;
  }
  @media screen and (max-width: 800px){
    width: 100vw;
    height: 60vh;
    // background-size: auto 100% ;
    background-position: 0px 0px;
  }

  // @media screen and (max-width: 1120px){
  //   background-position: -100px 0px;
  // }    

  @media screen and (max-width: 800px){
    
  }  


  
  .headAreaMask{
    height: 100%;
    width: 100%;
    
    // backdrop-filter: blur(20px) ;
    border-radius: 8px;
    flex-direction: column;
    position: relative;
    // background-color: rgba(255, 255, 255, 0);
  
  }

}

// .kenburns-top {
// 	animation: kenburns-top 4s ease-out both;
// }

// @keyframes kenburns-top {
//   0% {
//     transform: scale(1) translateY(0px);
//     // transform-origin: 50% 50%;
//     transform-origin: top;
//   }
//   100% {
//     transform: scale(1.2) translateY(0px);
//     transform-origin: top;
//   }
// }


.typing {
    // width:210px; 
    height: 32px;
    line-height: 32px;
    display: block;
    border-right: 1px solid transparent;
    animation: typing 2.2s steps(8, end), blink-caret .5s step-end 9;
    word-break: break-all;
    overflow: hidden;
}


/* 打印效果 */
@keyframes typing {
    from { width: 0; }
    to { width: 100%;}
}


/* 光标闪动 */
@keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: currentColor; }
}


.headBox {
  height: 100%;
  width: 80%;
  flex-direction: column;
  justify-content: center;
  // backdrop-filter: blur(20px) ;
  transition: all .5s;
  // filter: opacity(100%);
  @include themeify {
    background-color: themed('head-mask-color') ;
    // box-shadow: 0px 0px 8px 1px themed('head-mask-color');
    // background: linear-gradient(to top, #7c7c7c17, themed('head-mask-color'), #7c7c7c17 );
  }   
}

.headlineWrap{
  // width: 210px;
  justify-content: flex-start;
}
.headline {
  @extend .typing;
  // position: absolute;
  // position: relative;
  // top: 250px;
  flex-direction: column;    
  font-size: 26px;
  margin-bottom: 20px;
  // width: 300px;
}
.headText {
  // position: absolute;
  // top: 320px;
  flex-direction: column;        
  font-size: 14px;
  margin-bottom: 20px;
  > div {
    margin: 5px;
  
  }


}   

.scrollToAIcon {
  position: absolute;
  cursor: pointer;
  bottom: 20px;
  width: 30px;
  height: 30px;
  @include themeify {
    filter:  themed('btn-img-filter');   
  }   
  >img {
    width: 100%;
  }
  animation: float 3s infinite ease-in-out both;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

</style>