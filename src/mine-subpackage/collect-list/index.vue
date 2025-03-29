<template>
  <view class="container">
    <!-- 搜索 -->
    <search-navbar />
    <scroll-view class="scroll-view" scroll-y>
      <template>
        <!-- 订单列表 -->
        <view class="order-list">
          <collect-card :collectList="collectList" />
        </view>
      </template>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// components
import searchNavbar from './components/search-navbar.vue'
import collectCard from './components/collect-card.vue'

const collectList = ref([
  {
    yearsWork: 45,
    gender: '男',
    copywriterName: '张三',
    id: 1,
  },
  {
    yearsWork: 40,
    gender: '女',
    copywriterName: '李四',
    id: 2,
  },
  {
    yearsWork: 40,
    gender: '女',
    copywriterName: '王五',
    id: 3,
  },
  {
    yearsWork: 45,
    gender: '男',
    copywriterName: '赵六',
    id: 4,
  },
  {
    yearsWork: 45,
    gender: '男',
    copywriterName: '赵六',
    id: 5,
  },
  {
    yearsWork: 45,
    gender: '男',
    copywriterName: '赵六',
    id: 5,
  },
])
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: $uni-bg-color-grey;
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

.order-list {
  padding: 30rpx;
}
</style>
