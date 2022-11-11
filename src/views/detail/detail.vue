<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      class="tabs"
      :titles="names"
      ref="tabControlRef"
      v-if="showTabControl"
    />
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
      <detail-infos
        name="描述"
        :ref="getSectionRef"
        :top-infos="mainPart.topModule"
      />
      <detail-facility
        name="设施"
        :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <detail-landlord
        name="房东"
        :ref="getSectionRef"
        :landlord="mainPart.dynamicModule.landlordModule"
      />
      <detail-comment
        name="评论"
        :ref="getSectionRef"
        :comment="mainPart.dynamicModule.commentModule"
      />
      <detail-notice
        name="须知"
        :ref="getSectionRef"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <detail-map
        name="周边"
        :ref="getSectionRef"
        :position="mainPart.dynamicModule.positionModule"
      />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import TabControl from "@/components/tab-control/tab-control.vue"
import DetailSwipePic from './cpns/detail-swipe-pic.vue'
import DetailInfos from './cpns/detail-infos.vue'
import DetailFacility from './cpns/detail-facility.vue'
import DetailLandlord from './cpns/detail-landlord.vue'
import DetailComment from './cpns/detail-comment.vue'
import DetailNotice from './cpns/detail-notice.vue'
import DetailMap from './cpns/detail-map.vue'
import DetailIntro from './cpns/detail-intro.vue'

import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { getDetailInfos } from '@/services'
import useScroll from "@/hooks/useScroll"

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
})

// tabControl处理-获取names
const sectionEls = ref({})
const getSectionRef = (value) => {
  if (!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}
const names = computed(() => {
  return Object.keys(sectionEls.value)
})

// tabControl显示
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})


</script>

<style lang="less" scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}

.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}
</style>
