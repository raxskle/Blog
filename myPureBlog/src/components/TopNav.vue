<template>
<div class="navWrap">
  <div ref="navContainer" class="navContainer topNavInTop">

    <div class="navLogo"><img class="navLogoImg bounce-in-fwd" src="../assets/image/mie.png"/></div>

    <div class="navCenterBtn">
      <div class="centerBtn" @click="toRoute('/')"><img class="homeIcon" src="../assets/icons/bikini60s_home.svg"/> 首页</div>
      <div class="hasChildBtn"  @mousemove="showClassMenu" @mouseleave="unshowClassMenu">
        <div class="centerBtn classify">
          <img class="classifyIcon" src="../assets/icons/bikini60s_folder.svg"/> 
          分类
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
        </div>   

        <div v-show="isShowClassWindow" class="classWindow">
          <ul class="classList" >
            <li class="articleClass" @click="toRoute('/learning')">学习笔记</li>
            <li class="articleClass" @click="toRoute('/share')">一些东西</li>
            <li class="articleClass" @click="toRoute('/essay')">随笔杂谈</li>
          </ul>
        </div>               
      </div>

    
      <div class="centerBtn" @click="toRoute('/404')"><img class="aboutIcon" src="../assets/icons/bikini60s_user.svg"/> 关于我</div>
    </div>

    <div class="navFunction">
      <div class="searchWrap">
        <transition name="searchBoxAnimate">
          <div v-show="ifShowSearchBox" class="searchBox">
            <input type="text" v-model="searchText" placeholder="搜索文章标题" @focus="showSearchResult" @blur="unshowSearchResult" @input="getSearchResult" />
            <div v-show="ifShowSearchResult" ref="searchResult" class="searchResult searchResultBKcolorTop">
              <div class="searchItem" v-for="( item,index ) of searchResultList" :key="index" @click="toThisArticle">{{item.title}}</div>
              <div v-if="ifShowSearchTips" class="searchTips">{{searchTipsText}}</div>
            </div>
          </div>         
        </transition>
        <div class="searchBtn" @click="changeShowSearchBox"><img class="searchIcon" src="../assets/icons/bikini60s_search.svg"/></div>    
      </div>
      <div class="themeBtn" @click="changeTheme"><img class="themeIcon" src="../assets/icons/bikini60s_saturation.svg"/></div>
      <div class="expandBtn" @click="showMobileMenu"><img class="menuIcon" src="../assets/icons/bikini60s_menu.svg"/></div>
    </div>

    
  </div>  
</div>

<transition name="mobileMenuAnimate">
  <div v-if="ifShowMobileMenu" class="mobileMenuWrap" @touchstart="hideMobileMenu">
    <div class="mobileMenu" @touchstart.stop="null"  @touchmove.stop="null" >
      <div class="mobileMenuTop">
        <div class="mobileMenuClose" @click="hideMobileMenu"><img class="closeIcon" src="../assets/icons/272-cross.svg"/></div>
        <div class="mobileMenuTopRight">
          <div class="mobileMenuSearch" @click="showSearchBox"><img class="searchIcon" src="../assets/icons/bikini60s_search.svg"/></div>
          <div class="mobileMenuTheme" @click="changeTheme"><img class="themeIcon" src="../assets/icons/bikini60s_saturation.svg"/></div>
        </div>
      </div>
      <div class="mobileMenuPages"  >
        <div class="mobileMenuPage" @click="toRoute('/')"  @touchend="hideMobileMenu">🏠 首页</div>
        <div class="mobileMenuPage" @click="toRoute('/learning')"  @touchend="hideMobileMenu">📒 学习笔记</div>
        <div class="mobileMenuPage" @click="toRoute('/share')" @touchend="hideMobileMenu">📦 一些东西</div>
        <div class="mobileMenuPage" @click="toRoute('/essay')" @touchend="hideMobileMenu">📜 随笔杂谈</div>
        <div class="mobileMenuPage" @click="toRoute('/404')" @touchend="hideMobileMenu">👻 关于我</div>
      </div>
      <div class="mobileMenuSocial">
        <div class="icon github"  @click="toURL('https://github.com/raxskle')">
          <svg height="26" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </div>

        <div class="icon"  @click="toURL('https://music.163.com/#/user/home?id=1302952801')" >
          <div class="music" >
            <svg height="18" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="background-color: #c20c0c"><path d="M681.557145 0.082986c10.348315 1.684609 20.804511 2.879603 31.036645 5.128515 35.949398 7.916834 68.139544 23.833488 96.545543 47.160763 18.638584 15.30256 26.248371 35.252318 20.854301 58.894939-4.846364 21.252633-18.439419 35.567663-39.4099 41.683708-19.825279 5.784102-37.758485 1.394159-54.040276-11.659488-20.630241-16.539046-43.534289-27.982772-70.985953-25.534695-23.260887 2.074642-45.509348 26.54712-43.509393 48.39725 0.896245 9.775713 4.389943 19.327365 6.871214 28.937107 4.389943 16.987169 8.904364 33.932845 13.368994 50.895119 0.771767 2.929395 1.485444 5.261292 5.576638 5.485354 62.529712 3.41901 118.860393 23.750502 169.06673 61.475793 49.359884 37.0946 89.773911 81.599821 116.860438 137.532171 19.875071 41.044718 31.020048 84.38814 33.966039 129.88919 3.916924 60.455069-3.18665 119.607264-26.721389 175.464927-54.695863 129.77301-150.92606 213.472369-286.201021 251.961128a474.785984 474.785984 0 0 1-157.631303 17.335709c-110.985051-6.31521-207.132263-48.247876-288.134588-124.063595C129.154652 824.280184 79.330049 732.332048 61.99434 624.384273 38.409809 477.566004 74.583268 345.917518 170.249162 231.754115c52.554833-62.71228 118.130119-107.906283 194.601425-137.084049 26.356253-10.057865 55.202076-0.69708 69.66648 22.323149 14.771451 23.501545 11.310948 53.741528-9.161619 72.463097-5.784102 5.286188-13.086842 9.460368-20.389582 12.439554-116.586585 47.600587-193.613895 131.424425-224.202418 253.670634-29.67568 118.619734-3.435607 227.181604 72.338619 322.839199 47.501004 59.965454 108.860618 100.238406 183.132804 120.013894 48.007217 12.779795 96.50405 13.61795 145.407512 6.057955 50.446996-7.800654 97.557968-24.389492 139.814278-53.318301 58.148068-39.808232 99.566222-92.902471 120.279447-160.419623 17.891713-58.314039 18.505807-117.175783-3.601578-175.041699-17.79213-46.571565-49.227107-82.404782-88.661903-111.955984-21.070065-15.783877-43.691962-28.123848-69.483912-34.165205-1.170098-0.273853-2.365092-0.40663-4.497824-0.75517 3.518593 13.50177 6.796527 26.31476 10.182344 39.094555 8.17409 30.83748 16.539046 61.633466 24.580359 92.512438 17.468486 67.110521 0.572601 125.905877-45.642126 176.012632-42.745925 46.339205-97.167935 66.496427-159.598064 60.45507-69.500509-6.730139-119.10935-44.447131-151.482064-105.516295-16.953975-31.982682-24.265013-66.446636-25.61768-102.512213-2.149329-57.426092 11.252859-110.445644 44.148383-157.830469 35.327005-50.903417 84.27196-83.558283 142.088085-103.856582 4.547615-1.593325 9.153321-3.053873 14.4893-4.821468-3.103665-11.808863-6.356703-23.335574-9.153321-34.978465-3.850536-16.007938-8.804781-31.924592-10.738347-48.189785-5.734311-48.081904 9.028842-89.914987 42.248011-124.926646C578.198477 25.592784 611.201883 7.410621 650.727964 1.975059 655.084712 1.377562 659.424863 0.713677 663.765014 0.082986h17.792131zM558.124241 373.394077c-34.239892 10.879423-63.807691 27.484858-85.964868 55.135687-29.667381 37.019913-35.584261 79.541776-26.115594 124.744078 4.912752 23.460052 16.389672 43.550886 36.530297 57.567168 25.186155 17.526576 59.484137 16.771406 85.823792-1.460548 26.920555-18.638584 38.903688-48.704297 31.036646-79.541777-8.613914-33.775173-17.775533-67.417568-26.688196-101.126352l-14.622077-55.318256z" fill="#fff"></path></svg>
          </div>
        </div> 

        <div class="icon"  @click="toURL('https://www.douban.com/')" >
          <div class=" douban">
            <svg height="26"  version="1.1" viewBox="0 0 256 256" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Background_1_" style="enable-background:new    ;"><g id="Background"><g><path d="M249.422,30.68c-2.722-4.986-5.816-9.537-9.794-13.521     c-3.991-3.998-8.708-7.587-13.702-10.314c-8.381-4.576-18.789-6.856-29.002-6.856H59.075c-10.444,0-20.542,2.345-29.265,6.949     c-5.022,2.65-9.588,6.146-13.503,10.126c-3.932,3.998-7.491,8.488-10.046,13.572c-4.289,8.533-6.274,18.478-6.274,28.65v137.43     c0,10.326,1.671,20.678,6.296,29.134c2.68,4.9,6.191,9.861,10.087,13.794c3.934,3.971,8.583,7.226,13.502,9.956     c8.465,4.7,18.842,6.413,29.202,6.413h137.849c10.568,0,20.398-1.523,28.982-6.401c4.739-2.692,9.879-6.113,13.687-9.966     c3.923-3.969,7.2-8.851,9.886-13.798c4.566-8.416,6.533-18.875,6.533-29.132V59.285C256.012,48.978,254.031,39.124,249.422,30.68     z" style="fill-rule:evenodd;clip-rule:evenodd;fill:green;"/></g></g></g><g id="Shape_1_1_" style="enable-background:new    ;"><g id="Shape_1"><g><path d="M204.508,49.25H51.492v18.549h153.016V49.25z      M167.393,188.201l9.441-32.541h18.232c0,0,0-49.249,0-73.869H60.933c0,24.62,0,73.869,0,73.869h17.906l9.767,32.541     c0,0-27.783,0-41.673,0v18.549h162.133v-18.549C195.176,188.201,167.393,188.201,167.393,188.201z M84.048,137.111V100.34h87.903     v36.771H84.048z M148.51,187.876h-41.021l-9.767-32.216h60.23L148.51,187.876z" style="fill-rule:evenodd;clip-rule:evenodd;fill:white;"/></g></g></g></svg>
          </div>
        </div> 


      </div>
      <div class="mobileMenuData">
        <div class="mobileMenuDataA">文章数：{{articlesNum}}</div>
        <div class="mobileMenuDataB">标签数：{{tagsNum}}</div>
      </div>
    </div>
  </div>  
</transition>


</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store/index.js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue'
import { search } from "../network/search";
const store = useStore();
const { articlesNum,tagsNum } = storeToRefs(store);

let router = useRouter();
let toRoute = (route: string) => {
  isShowClassWindow.value = false;
  router.push(route);
}

let isShowClassWindow = ref(false);

let showClassMenu = () => {
  if (location.pathname == "/article") {
    isShowClassWindow.value = true;    
  } else {
    if (window.scrollY != 0) {
      isShowClassWindow.value = true;  
    }    
  }
}

let unshowClassMenu = () => {
  isShowClassWindow.value = false;  
}



let toURL = (url:string) => {
  window.open(url);
}


let lastTheme = localStorage.getItem("data-theme");
if (lastTheme == null) {
  window.document.documentElement.setAttribute("data-theme", "light");
  localStorage.setItem("data-theme", "light");
} else {
  window.document.documentElement.setAttribute("data-theme", lastTheme);
}

let changeTheme = () => {
  let newTheme: string;
  if (window.document.documentElement.getAttribute("data-theme") == "light") {
    newTheme = "dark";
  } else {
    newTheme = "light";
  }
  window.document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("data-theme", newTheme);
}

let ifShowMobileMenu = ref(false);
let showMobileMenu = () => {
  ifShowMobileMenu.value = true;
}
let hideMobileMenu = () => {
  ifShowMobileMenu.value = false;
}


let ifShowSearchBox = ref(false);
let ifShowSearchResult = ref(false);
let searchText = ref("");
let searchResultList = ref<any[]>([]);
let searchTipsText = ref("暂无你想要的内容");
let ifShowSearchTips = ref(false);

let changeShowSearchBox = () => {
  ifShowSearchBox.value = !ifShowSearchBox.value ;
}
let showSearchBox = () => {
  ifShowMobileMenu.value = false;
  ifShowSearchBox.value = true;
}
let showSearchResult = () => {
  ifShowSearchResult.value = true ;
}
let unshowSearchResult = () => {
  setTimeout(() => {
    ifShowSearchResult.value = false ;  
  }, 200);

}


let searchLimitation:any = null;
let getSearchResult = () => {
  clearTimeout(searchLimitation);
  if (searchText.value) {
    searchLimitation = setTimeout(() => {
      search(searchText.value).then((res) => {
        // console.log(res);
        searchResultList.value = res;
        // console.log("searchResultList.value", searchResultList.value)
        // console.log("res", res)
        if (res.length == 0) {
          ifShowSearchTips.value = true;
        } else {
          ifShowSearchTips.value = false;
        }
      });          
    }, 500);

  } else {
    searchResultList.value = [];
    ifShowSearchTips.value = false;
  }

}

interface Event {
  target:any
}
let toThisArticle = (e:Event) => {
  // console.log(e.target);
  let i = 0;
  for (; i < e.target.parentNode.children.length; i++){
    if (e.target.parentNode.children[i] == e.target) {
      break;
    }
  }
  // console.log(i);
  // console.log(searchResultList.value[i]);
  router.push(`/article?id=${searchResultList.value[i].id}`);
}

let lastPath = router.currentRoute.value.path;
let lastFullPath = router.currentRoute.value.fullPath;
// console.log("lastPath", lastPath);
// console.log("lastFullPath", lastFullPath);
watch(router.currentRoute, (newval) => {
  if (newval.path=="/article"  && lastPath == newval.path && lastFullPath != newval.fullPath) {
    location.reload();
  }
  lastPath = router.currentRoute.value.path;
  lastFullPath = router.currentRoute.value.fullPath;
})

// 透明和不透明
// console.log(window.scrollY)
// watch(,(newval) => {
//   console.log(newval);
// })
let navContainer = ref(null);
let searchResult = ref(null);
let topNavAnimation =  () => {
  if (location.pathname != "/article") {
    if(window.scrollY == 0 ){
      navContainer.value.className = "navContainer topNavInTop";
      searchResult.value.className = "searchResult searchResultBKcolorTop";
      if (isShowClassWindow.value == true) {
        isShowClassWindow.value = false;
      }
    } else {
      navContainer.value.className = "navContainer topNavNotInTop";
      searchResult.value.className = "searchResult searchResultBKcolor";
    }    
  }
}

onMounted(() => {
  window.addEventListener("scroll", topNavAnimation);
  if (location.pathname != "/article") {
    navContainer.value.className = "navContainer topNavInTop";    
    searchResult.value.className = "searchResult searchResultBKcolorTop";
  } else {
    navContainer.value.className = "navContainer topNavNotInTop";    
    searchResult.value.className = "searchResult searchResultBKcolor";
  }
})

onUnmounted(() => {
  window.removeEventListener("scroll",topNavAnimation);
})

</script>

<style lang="scss" scoped>
.navWrap{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 10;
  transition: background-color .4s;
}
.navContainer{
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all .2s ease-in;
}

.topNavNotInTop{
  @include themeify {
    background-color: themed('top-nav-bg-color');
    box-shadow: 0px 0px 0.8px 0.4px  themed('line-color');    
  }   
  height: 45px;
}

.topNavInTop {
  height: 60px;
  background-color: transparent;
  box-shadow: transparent;  
}

.navLogo {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 0;
  margin-left: 5px;
  cursor: pointer;
    .vibrate-3 {
    -webkit-animation: vibrate-3 0.5s linear infinite both;
            animation: vibrate-3 0.5s linear infinite both;
    } 
    @-webkit-keyframes vibrate-3 {
    0% {
      -webkit-transform: translate(0);
              transform: translate(0);
    }
    10% {
      -webkit-transform: translate(-2px, -2px);
              transform: translate(-2px, -2px);
    }
    20% {
      -webkit-transform: translate(2px, -2px);
              transform: translate(2px, -2px);
    }
    30% {
      -webkit-transform: translate(-2px, 2px);
              transform: translate(-2px, 2px);
    }
    40% {
      -webkit-transform: translate(2px, 2px);
              transform: translate(2px, 2px);
    }
    50% {
      -webkit-transform: translate(-2px, -2px);
              transform: translate(-2px, -2px);
    }
    60% {
      -webkit-transform: translate(2px, -2px);
              transform: translate(2px, -2px);
    }
    70% {
      -webkit-transform: translate(-2px, 2px);
              transform: translate(-2px, 2px);
    }
    80% {
      -webkit-transform: translate(-2px, -2px);
              transform: translate(-2px, -2px);
    }
    90% {
      -webkit-transform: translate(2px, -2px);
              transform: translate(2px, -2px);
    }
    100% {
      -webkit-transform: translate(0);
              transform: translate(0);
    }
    }
    @keyframes vibrate-3 {
      0% {
        -webkit-transform: translate(0);
                transform: translate(0);
      }
      10% {
        -webkit-transform: translate(-2px, -2px);
                transform: translate(-2px, -2px);
      }
      20% {
        -webkit-transform: translate(2px, -2px);
                transform: translate(2px, -2px);
      }
      30% {
        -webkit-transform: translate(-2px, 2px);
                transform: translate(-2px, 2px);
      }
      40% {
        -webkit-transform: translate(2px, 2px);
                transform: translate(2px, 2px);
      }
      50% {
        -webkit-transform: translate(-2px, -2px);
                transform: translate(-2px, -2px);
      }
      60% {
        -webkit-transform: translate(2px, -2px);
                transform: translate(2px, -2px);
      }
      70% {
        -webkit-transform: translate(-2px, 2px);
                transform: translate(-2px, 2px);
      }
      80% {
        -webkit-transform: translate(-2px, -2px);
                transform: translate(-2px, -2px);
      }
      90% {
        -webkit-transform: translate(2px, -2px);
                transform: translate(2px, -2px);
      }
      100% {
        -webkit-transform: translate(0);
                transform: translate(0);
      }
    }
  .navLogoImg{
    height: 85%;
    &:hover{
      @extend .vibrate-3;
    }    
  }

  .bounce-in-fwd {
    animation: bounce-in-fwd 1.1s both;
  }

  @keyframes bounce-in-fwd {
    0% {
      -webkit-transform: scale(0);
              transform: scale(0);
      -webkit-animation-timing-function: ease-in;
              animation-timing-function: ease-in;
      opacity: 0;
    }
    38% {
      -webkit-transform: scale(1);
              transform: scale(1);
      -webkit-animation-timing-function: ease-out;
              animation-timing-function: ease-out;
      opacity: 1;
    }
    55% {
      -webkit-transform: scale(0.7);
              transform: scale(0.7);
      -webkit-animation-timing-function: ease-in;
              animation-timing-function: ease-in;
    }
    72% {
      -webkit-transform: scale(1);
              transform: scale(1);
      -webkit-animation-timing-function: ease-out;
              animation-timing-function: ease-out;
    }
    85% {
      -webkit-transform: scale(0.84);
              transform: scale(0.84);
      -webkit-animation-timing-function: ease-in;
              animation-timing-function: ease-in;
    }
    100% {
      -webkit-transform: scale(1);
              transform: scale(1);
      -webkit-animation-timing-function: ease-out;
              animation-timing-function: ease-out;
    }
  }



}

.navCenterBtn{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;  

  .hasChildBtn{
    position: relative;
  }

  .centerBtn{
    width: auto;
    height: 45px;
    box-sizing: border-box;
    // background-color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
    margin-right: 15px;
    cursor: pointer;
    transition: all .3s;

  }

  .centerBtn:hover {
    @include hover-effect;
  }

  @media screen and (max-width: 800px) {
    display: none;
  }

}

.homeIcon , .classifyIcon , .aboutIcon , .searchIcon , .menuIcon , .themeIcon , .closeIcon {
  @include themeify {
    filter:  themed('btn-img-filter');   
  }   
  height: 20px;
  // 改变图标颜色
  margin: 5px;
  transition:all .4s;
}


.fa-chevron-down{
  margin-left: 2px;
  font-size: small;
  filter: opacity(65%);    
}

.classify {
  position: relative;
}

.classWindow {
  position: absolute;
  border-radius: 0px 0px 10px 10px;
  @include themeify {
    background-color: themed('top-nav-bg-color');
  }   
  
  top: 45px;
  left: 6px;
  // width: 100px;
  @include themeify {
    border: 1px solid  themed('line-color') ;
  }   
  animation: Showclasswindow 0.5s;

  @keyframes  Showclasswindow {
    0%{
      opacity: 0;
    }
    100% {
      opacity: 100%;
    }
  }

  .classList {
    width: 100px;
    height: 120px;
    border-radius: 0px 0px 10px 10px;
    // &:hover {
    //   color: black;
    // }

    .articleClass {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      border-radius: 0px 0px 10px 10px;
      cursor: pointer;
      transition: all .4s;
      &:hover {
        @include hover-effect;        
      }

    }
  }
}



.navFunction {
  height: 100%;
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 0;
  margin-right: 10px;
}

%navBtn {
  width: 30px;
  height: 30px;  
  margin-right: 10px;  
  border-radius: 25%;
  transition: all .4s;
  cursor: pointer;
  &:hover {
    @include themeify {
      background-color: themed('btn-hover-color');
    }   
    
  }
}


.searchWrap {
  display: flex;
  flex-direction: row;
  .searchBox {
    width: 200px;
    height: 45px;
    position: relative;
    // background-color: antiquewhite;

    > input {
      height: 30px;
      width: 180px;
      border-radius: 15px;
      box-sizing: border-box;
      padding-left: 12px;
      padding-right: 12px;
      font-family:  "MICROSOFT JHENGHEI";
      @include themeify {
        border: 1px solid themed("line-color");
        background-color: themed('top-nav-bg-color');
        color: themed('font-color');
      }   
      &:focus {
        @include themeify {
          border: 1px solid themed("line-color-deep");
          outline:none;
        }   
      }
      
    }



    .searchResultBKcolorTop {
      background-color: transparent;
    }
    .searchResultBKcolor {
      @include themeify {
        background-color: themed('index-page-bg-color');
        box-shadow: 0px 0.5px 0.8px 0.4px  themed('line-color');
      }   
    }

    .searchResult {
      position: absolute;
      width: 200px;
      padding-bottom: 10px;
      border-radius: 0px 0px 5px 5px;
      height: auto;

      transition: all .4s;

      top: 45px;
      flex-direction: column;

      .searchItem {
        // @include themeify {
          // background-color: themed('index-page-bg-color');
          // border-bottom: 1px solid themed('line-color');          
        // }   
        box-sizing: border-box;
        width: 100%;
        padding: 5px;
        padding-left: 15px;
        justify-content: flex-start;
        font-size: 14px;

        cursor: pointer;
        &:hover {
          @include themeify {
            background-color: themed('box-bg-color');
          }            
        }
      }

      .searchTips {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
  }  
  .searchBtn {
    @extend %navBtn;

  }  
}





.themeBtn{
  @extend %navBtn;

  @media screen and (max-width: 800px){
    display: none;
  }
}

.expandBtn{
  @extend %navBtn;
  display: none;

  @media screen and (max-width: 800px){
    display: flex;
  }
}



.mobileMenuWrap {
  // display: none;
  position: fixed;
  right: 0;
  top: 0;
  width: 200vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(128, 128, 128, 0.205);
  justify-content: flex-end;
  transition: all .2s;

  .mobileMenu {
  width: 75vw;
  height: 100vh;    
  border-radius: 15px 0px 0px 15px ;
  transition: all .2s;
  position: fixed;
  top: 0;
  right: 0;
  @include themeify {
    background-color: themed('index-page-bg-color');
    box-shadow: -5px 0px 20px 4px themed('box-shadow-color');
  } 
  justify-content: flex-start;
  flex-direction: column;
  }
}

.mobileMenuTop {
  height: 45px;
  width: 100%;
  justify-content: space-between;

  .mobileMenuClose {
    margin-left: 10px;
    @extend %navBtn;
  }

  .mobileMenuTopRight {
    margin-right: 10px;
    .mobileMenuSearch {
      @extend %navBtn;
    }
    .mobileMenuTheme {
      @extend %navBtn;
    }    
  }
}

.mobileMenuPages{
  height: 45vh;
  width: 90%;
  box-sizing: border-box;
  margin-top: 6vh;
  margin-bottom: 4vh;
  @include themeify {
    background-color: themed('index-page-bg-color');
    border-bottom: .5px solid themed('line-color');
  } 
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 6vh;
  transition: all .2s;

  .mobileMenuPage{
    height: 15%;
    width: 100%;
    @include themeify {
      background-color: themed('box-bg-color');
    } 
    cursor: pointer;
    border-radius: 8px;
    transition: all .4s;
    &:hover {
      @include hover-effect;
      @include themeify {
        background-color: themed('box-bg-color-deep');
      }       
    }
  }
}

.mobileMenuSocial {
  height: 60px;
  width: 80%;
  margin-bottom: 2vh;
}
.mobileMenuData {
  // height: 15%;
  flex-grow: 1;
  width: 90%;
  @include themeify {
    border-top: .5px solid themed('line-color');
  } 
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 4vh;
  // .mobileMenuDataA {

  // }
}



.mobileMenuAnimate-enter-active {
  animation: slide-in .5s both;
}

@keyframes slide-in {
  0% {
    transform: translateX(80vw);
    opacity: 10%;
  }
  100%{
    transform: translateX(0);   
    opacity: 100%;
  }
}

.mobileMenuAnimate-leave-active {
  animation: slide-out ease-in-out .5s both;
}

@keyframes slide-out {
  0% {
    transform: translateX(0);
    opacity: 100%;
  }
  100%{
    transform: translateX(80vw);   
    opacity: 10%;
  }
}

.searchBoxAnimate-enter-active {
  animation: show  .5s  forwards;
}

@keyframes show {
  0% {
    opacity: 0%;
  }
  100%{
    opacity: 100%;
  }
}

.searchBoxAnimate-leave-active {
  animation: unshow  .5s  forwards;
}

@keyframes unshow {
  0% {
    opacity: 100%;
  }
  100%{
    opacity: 0%;
  }
}
</style>