<template>
  <view class="container">
    <scroll-view class="scroll-view" scroll-y>
      <template>
        <!-- 顶部 -->
        <mine-header />
        <!-- 卡片 -->
        <mine-main />
        <!-- 标题 -->
        <mine-title />
        <!-- 商品 -->
        <mine-commodity />
      </template>
    </scroll-view>
    <tabbar selected="4"></tabbar>
  </view>
</template>

<script setup lang="ts">
// components
import tabbar from '@/components/custom-tab-bar.vue'
import mineHeader from './components/mine-header.vue'
import mineMain from './components/mine-main.vue'
import mineTitle from './components/mine-title.vue'
import mineCommodity from './components/mine-commodity.vue'
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: $uni-text-color-inverse;
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
