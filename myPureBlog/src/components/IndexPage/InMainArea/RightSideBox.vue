<template>
  <div class="rightBoxContainer">
    <div class="socialMedia">
      <div class="findme">找我</div>
      <div class="githubBar" @click="toURL('https://github.com/raxskle')">
        <div class="icon github"  >
          <svg height="26" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </div>
        <div>Github</div>
      </div>
      <div class="musicBar"  @click="toURL('https://music.163.com/#/user/home?id=1302952801')">
        <div class="icon"  >
          <div class="music">
            <svg height="18" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="background-color: #c20c0c"><path d="M681.557145 0.082986c10.348315 1.684609 20.804511 2.879603 31.036645 5.128515 35.949398 7.916834 68.139544 23.833488 96.545543 47.160763 18.638584 15.30256 26.248371 35.252318 20.854301 58.894939-4.846364 21.252633-18.439419 35.567663-39.4099 41.683708-19.825279 5.784102-37.758485 1.394159-54.040276-11.659488-20.630241-16.539046-43.534289-27.982772-70.985953-25.534695-23.260887 2.074642-45.509348 26.54712-43.509393 48.39725 0.896245 9.775713 4.389943 19.327365 6.871214 28.937107 4.389943 16.987169 8.904364 33.932845 13.368994 50.895119 0.771767 2.929395 1.485444 5.261292 5.576638 5.485354 62.529712 3.41901 118.860393 23.750502 169.06673 61.475793 49.359884 37.0946 89.773911 81.599821 116.860438 137.532171 19.875071 41.044718 31.020048 84.38814 33.966039 129.88919 3.916924 60.455069-3.18665 119.607264-26.721389 175.464927-54.695863 129.77301-150.92606 213.472369-286.201021 251.961128a474.785984 474.785984 0 0 1-157.631303 17.335709c-110.985051-6.31521-207.132263-48.247876-288.134588-124.063595C129.154652 824.280184 79.330049 732.332048 61.99434 624.384273 38.409809 477.566004 74.583268 345.917518 170.249162 231.754115c52.554833-62.71228 118.130119-107.906283 194.601425-137.084049 26.356253-10.057865 55.202076-0.69708 69.66648 22.323149 14.771451 23.501545 11.310948 53.741528-9.161619 72.463097-5.784102 5.286188-13.086842 9.460368-20.389582 12.439554-116.586585 47.600587-193.613895 131.424425-224.202418 253.670634-29.67568 118.619734-3.435607 227.181604 72.338619 322.839199 47.501004 59.965454 108.860618 100.238406 183.132804 120.013894 48.007217 12.779795 96.50405 13.61795 145.407512 6.057955 50.446996-7.800654 97.557968-24.389492 139.814278-53.318301 58.148068-39.808232 99.566222-92.902471 120.279447-160.419623 17.891713-58.314039 18.505807-117.175783-3.601578-175.041699-17.79213-46.571565-49.227107-82.404782-88.661903-111.955984-21.070065-15.783877-43.691962-28.123848-69.483912-34.165205-1.170098-0.273853-2.365092-0.40663-4.497824-0.75517 3.518593 13.50177 6.796527 26.31476 10.182344 39.094555 8.17409 30.83748 16.539046 61.633466 24.580359 92.512438 17.468486 67.110521 0.572601 125.905877-45.642126 176.012632-42.745925 46.339205-97.167935 66.496427-159.598064 60.45507-69.500509-6.730139-119.10935-44.447131-151.482064-105.516295-16.953975-31.982682-24.265013-66.446636-25.61768-102.512213-2.149329-57.426092 11.252859-110.445644 44.148383-157.830469 35.327005-50.903417 84.27196-83.558283 142.088085-103.856582 4.547615-1.593325 9.153321-3.053873 14.4893-4.821468-3.103665-11.808863-6.356703-23.335574-9.153321-34.978465-3.850536-16.007938-8.804781-31.924592-10.738347-48.189785-5.734311-48.081904 9.028842-89.914987 42.248011-124.926646C578.198477 25.592784 611.201883 7.410621 650.727964 1.975059 655.084712 1.377562 659.424863 0.713677 663.765014 0.082986h17.792131zM558.124241 373.394077c-34.239892 10.879423-63.807691 27.484858-85.964868 55.135687-29.667381 37.019913-35.584261 79.541776-26.115594 124.744078 4.912752 23.460052 16.389672 43.550886 36.530297 57.567168 25.186155 17.526576 59.484137 16.771406 85.823792-1.460548 26.920555-18.638584 38.903688-48.704297 31.036646-79.541777-8.613914-33.775173-17.775533-67.417568-26.688196-101.126352l-14.622077-55.318256z" fill="#fff"></path></svg>
          </div>
        </div>  
        <div>网易云</div>      
      </div>

      <div class="doubanBar"  @click="toURL('https://www.douban.com/')">
        <div class="icon"   >
          <div class=" douban">
            <svg height="26"  version="1.1" viewBox="0 0 256 256" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Background_1_" style="enable-background:new    ;"><g id="Background"><g><path d="M249.422,30.68c-2.722-4.986-5.816-9.537-9.794-13.521     c-3.991-3.998-8.708-7.587-13.702-10.314c-8.381-4.576-18.789-6.856-29.002-6.856H59.075c-10.444,0-20.542,2.345-29.265,6.949     c-5.022,2.65-9.588,6.146-13.503,10.126c-3.932,3.998-7.491,8.488-10.046,13.572c-4.289,8.533-6.274,18.478-6.274,28.65v137.43     c0,10.326,1.671,20.678,6.296,29.134c2.68,4.9,6.191,9.861,10.087,13.794c3.934,3.971,8.583,7.226,13.502,9.956     c8.465,4.7,18.842,6.413,29.202,6.413h137.849c10.568,0,20.398-1.523,28.982-6.401c4.739-2.692,9.879-6.113,13.687-9.966     c3.923-3.969,7.2-8.851,9.886-13.798c4.566-8.416,6.533-18.875,6.533-29.132V59.285C256.012,48.978,254.031,39.124,249.422,30.68     z" style="fill-rule:evenodd;clip-rule:evenodd;fill:green;"/></g></g></g><g id="Shape_1_1_" style="enable-background:new    ;"><g id="Shape_1"><g><path d="M204.508,49.25H51.492v18.549h153.016V49.25z      M167.393,188.201l9.441-32.541h18.232c0,0,0-49.249,0-73.869H60.933c0,24.62,0,73.869,0,73.869h17.906l9.767,32.541     c0,0-27.783,0-41.673,0v18.549h162.133v-18.549C195.176,188.201,167.393,188.201,167.393,188.201z M84.048,137.111V100.34h87.903     v36.771H84.048z M148.51,187.876h-41.021l-9.767-32.216h60.23L148.51,187.876z" style="fill-rule:evenodd;clip-rule:evenodd;fill:white;"/></g></g></g></svg>
          </div>
        </div>  
        <div>豆瓣</div>      
      </div>
    </div>
    <div class="blogDataTitleWrap">
      <div class="blogDataTitle">数据</div>      
    </div>

    <div class="blogData">
      <div class="dataBar articlesNumBar">
        <div>文章</div>
        <div>{{articlesNum}}</div>
      </div>
      <div class="dataBar tagsNumBar">
        <div>标签</div>
        <div>{{tagsNum}}</div>
      </div>
      <div class="dataBar classNumBar">
        <div>分类</div>
        <div>3</div>        
      </div>
    </div>


  </div>
</template>

<script lang="ts" setup>
import { useStore } from '../../../store/index.js';
import { storeToRefs } from 'pinia';
const store = useStore();
const { articlesNum, tagsNum  } = storeToRefs(store);

let toURL = (url:string) => {
  window.open(url);
}

</script>

<style lang="scss" scoped>
.rightBoxContainer{
  height: 400px;
  width: 100%;
  margin-top: 20px;
  transition: all .4s;
  @include themeify {
      background-color: themed('box-bg-color');
    } 
  
  flex-direction: column;
  border-radius: 6px;
  justify-content: space-between;
  
}


.socialMedia {
  width: 90%;
  height: 210px;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  .findme {
    font-size: 20px;
    height: 48px;
    user-select: none;
    @include themeify {
      border-bottom: 2px solid themed('line-color-deep');
    } 
    
    margin-bottom: 10px;


  }
  .githubBar , .musicBar , .doubanBar {
    width: 100%;
    height: 50px;
    justify-content: flex-start;
    @include themeify {
    border-bottom: 1px solid themed('line-color');
    } 

    transition: all .4s;
    cursor: pointer;
    &:hover{
      @include themeify {
        border-bottom: 1px solid themed("index-page-bg-color");      
        box-shadow: 1px 1px 5px 1px themed('box-shadow-color');      
      }   
      border-radius: 4px;
      padding-left: 5px;
    }
  }



}

.blogDataTitleWrap{
  width: 90%;
  justify-content: flex-start;
  .blogDataTitle {
    font-size: 20px;
    height: 48px;   
    user-select: none;
    @include themeify {
      border-bottom: 2px solid themed('line-color-deep');
    }   
    
  }

}
.blogData {
  width: 90%;
  height: 20%;
  justify-content: space-around;
  margin-bottom: 20px;

  .dataBar {
    width: 30%;
    height: 60px;
    // background-color: antiquewhite;
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: 6px;
    transition: all .4s;
    // cursor: pointer;
    user-select: none;
    &:hover {
      @include themeify {
      background-color:  themed('box-bg-color-deep');
    }   
      
    }
  }
}

</style>