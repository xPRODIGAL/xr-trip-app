<template>
  <div class="home" ref="homeRef">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box />
    <home-categories />
    <home-content />
  </div>
</template>

<script>
  export default { name: "home" }
</script>
<script setup>
import useHomeStore from '@/stores/modules/home';
import HomeNavBar from './cpns/home-nav-bar.vue';
import HomeSearchBox from './cpns/home-search-box.vue'
import HomeCategories from './cpns/home-categories.vue'
import HomeContent from './cpns/home-content.vue'
import { ref } from 'vue';
import useScroll from '@/hooks/useScroll';

// 发送请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()

// 监听滚动
const homeRef = ref()
useScroll(() => {
  homeStore.fetchHouselistData()
})

</script>

<style lang="less" scoped>
.home {
  // height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;

  .banner {
    img {
      width: 100%;
    }
  }
}
</style>
