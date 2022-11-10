<template>
  <div class="detail top-page" ref="detailRef">
    <van-nav-bar
      title="民宿详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 主体内容 -->
    <div class="main" v-if="mainPart">
      <detail-swipe-pic
        :swipe-data="mainPart.topModule.housePicture.housePics"
      />
    </div>
  </div>
</template>

<script setup>
import DetailSwipePic from './cpns/detail-swipe-pic.vue'
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { getDetailInfos } from '@/services'

const router = useRouter()
const onClickLeft = () => {
  router.back()
}

const route = useRoute()
const houseId = route.params.id

// 网络请求
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
  console.log(res.data)
})

</script>

<style lang="less" scoped>
</style>
