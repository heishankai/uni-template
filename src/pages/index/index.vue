<template>
  <view class="content">
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <uni-card @click="handleClick(title === 'hello world' ? '你好 世界' : 'hello world')">
      <text>这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text>
    </uni-card>
    <!-- <custom-tab-bar /> -->
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { onShow } from '@dcloudio/uni-app'
const title = ref<string>('hello world')

const handleClick = (value): void => {
  title.value = value
}


// onShow(() => {
// const curPages = getCurrentPages()[0];  // 获取当前页面实例
// if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
//   curPages.getTabBar().setData({
//     selected: 0
//   });
// }
// })



</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
