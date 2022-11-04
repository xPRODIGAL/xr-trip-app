<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabbarData" :key="index">
      <div
        class="tab-bar-item"
        :class="{ active: currentIndex === index }"
        @click="itemClick(index, item)"
      >
        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" />
        <img v-else :src="getAssetURL(item.imageActive)" alt="" />
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import tabbarData from "@/assets/data/tabbar.js"
import router from "@/router";
import { getAssetURL } from "@/utils/load_assets"
import { ref } from "vue";

const currentIndex = ref(0)
const itemClick = (index, item) => {
  currentIndex.value = index
  router.push(item.path)
}

</script>

<style lang="less" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;

  .tab-bar-item {
    display: flex;
    flex: 1;
    // justify-content: center;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #f3f3f3;

    &.active {
      color: var(--primary-color);
    }

    img {
      width: 36px;
    }
    .text {
      font-size: 12px;
      margin-top: 2px;
    }
  }
}
</style>
