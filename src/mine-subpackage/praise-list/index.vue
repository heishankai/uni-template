<template>
  <view class="container">
    <!-- 搜索 -->
    <search-navbar />
    <scroll-view class="scroll-view" scroll-y>
      <template>
        <!-- 订单列表 -->
        <view class="praise-list">
          <praise-card :praiseList="praiseList" />
        </view>
      </template>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// components
import searchNavbar from './components/search-navbar.vue'
import praiseCard from './components/praise-card.vue'

const praiseList = ref([
  {
    time: '2025-06-01 12:00:00',
    copywriterName: '张三',
    orderNumber: '1234567890',
    money: 100,
  },
  {
    time: '2025-06-01 13:00:00',
    copywriterName: '李四',
    orderNumber: '1234567891',
    money: 400,
  },
  {
    time: '2025-06-04 08:00:00',
    copywriterName: '王五',
    orderNumber: '1234567892',
    money: 10000,
  },
  {
    time: '2025-06-04 08:00:00',
    copywriterName: '赵六',
    orderNumber: '1234567893',
    money: 30000,
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

.praise-list {
  padding: 30rpx;
}
</style>
