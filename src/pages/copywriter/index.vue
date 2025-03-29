<template>
  <view class="container">
    <!-- 顶部导航 -->
    <custom-navbar></custom-navbar>
    <!-- 滚动容器 -->
    <scroll-view
      enable-back-to-top
      refresher-enabled
      @refresherrefresh="onRefresherrefresh"
      :refresher-triggered="isTriggered"
      @scrolltolower="onScrolltolower"
      class="scroll-view"
      scroll-y
    >
      <template>
        <swiper-copywriter />
        <copywriter-list ref="guessRef" />
      </template>
    </scroll-view>
    <tabbar selected="1"></tabbar>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// components
import tabbar from '@/components/custom-tab-bar.vue'
import customNavbar from './components/custom-navbar.vue'
import copywriterList from './components/copywriter-list.vue'
import swiperCopywriter from './components/swiper-copywriter.vue'
// utils
import { useGuessList } from './utils'

// 猜你喜欢组合式函数调用
const { guessRef, onScrolltolower } = useGuessList()

// 当前下拉刷新状态
const isTriggered = ref(false)

// 自定义下拉刷新被触发
const onRefresherrefresh = async (): Promise<void> => {
  // 开始动画
  isTriggered.value = true

  // 加载数据
  guessRef.value?.resetData()

  await guessRef.value?.getMore()

  // 关闭动画
  isTriggered.value = false
}
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  /* background-color: #efefef; */
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
