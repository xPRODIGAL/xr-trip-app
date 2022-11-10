<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" lazy-render>
      <template v-for="(item, index) in swipeData">
        <van-swipe-item class="item">
          <img :src="item.url" />
        </van-swipe-item>
      </template>

      <template #indicator="{ active, total }">
        <div class="custom-indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
              <span class="title">{{ getName(value[0].title) }}</span>
              <span v-if="swipeData[active]?.enumPictureCategory == key"
                >{{ getGroupIndex(swipeData[active]) }} /
                {{ value.length }}</span
              >
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>

const props = defineProps({
  swipeData: {
    type: Array,
    default: () => []
  }
})

// 根据数组对象中的图片组号为key创建对象转换数据
const swipeGroup = {}
for (const item of props.swipeData) {
  let valueArr = swipeGroup[item.enumPictureCategory]
  if (!valueArr) {
    valueArr = []
    swipeGroup[item.enumPictureCategory] = valueArr
  }
  valueArr.push(item)
}

// 获取索引
const getGroupIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item)
}

// 正则(惰性模式)转换
const nameReg = /【(.*?)】/i
const getName = (name) => {
  const res = nameReg.exec(name)
  return res[1]
}

</script>

<style lang="less" scoped>
.swipe {
  .swipe-list {
    .item {
      img {
        width: 100%;
      }
    }

    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;

      .item {
        margin: 0 3px;

        &.active {
          padding: 0 3px;
          border-radius: 5px;
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
}
</style>
