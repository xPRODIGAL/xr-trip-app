<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData" :key="index">
        <van-tabbar-item :to="item.path">
          <template #default>
            <span class="text">{{ item.text }}</span>
          </template>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" />
            <img v-else :src="getAssetURL(item.imageActive)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import tabbarData from "@/assets/data/tabbar.js"
import { getAssetURL } from "@/utils/load_assets"
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const currentIndex = ref(0)
const route = useRoute()
// watch(route, (newRoute) => {
//   console.log(newRoute.path)
// })
watch(route, (newRoute) => {
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  if (index === -1) return
  currentIndex.value = index
})

</script>

<style lang="less" scoped>
.tab-bar {
  :deep(.van-tabbar-item__icon) {
    font-size: 50px;
  }

  img {
    height: 26px;
  }
}
</style>
