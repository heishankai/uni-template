<template>
  <view class="container">
    <search-navbar />
    <scroll-view class="scroll-view" scroll-y>
      <template>
        <story-list />
      </template>
    </scroll-view>
    <tabbar selected="0"></tabbar>
    <custom-popup ref="subscribeModalRef" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// services
import { getHomeGetRecommendService } from './service'

// components
import tabbar from '@/components/custom-tab-bar.vue'
import searchNavbar from './components/search-navbar.vue'
import customPopup from './components/custom-popup.vue'
import storyList from './components/story-list.vue'

const subscribeModalRef = ref()

// 获取推荐轮博数据
const getHomeGetRecommendData = async (): Promise<void> => {
  const res = await getHomeGetRecommendService()
  console.log('获取推荐轮博数据', res)
}

// const handleSubscribe = (): void => {
//   subscribeModalRef.value.subscribeModalOpen.open()
// }

onLoad(() => {
  getHomeGetRecommendData()
})
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background: linear-gradient(to bottom, #f0faf9, #b3e5dc, #b3e5dc);
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
}
</style>
