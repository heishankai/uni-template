<template>
  <view class="title">快来录制我的故事吧...</view>
  <scroll-view scroll-y class="record-message">
    <trumpet-animation
      v-for="(item, index) in recordList"
      :key="index"
      :size="24"
      color="#808080"
      :src="item?.src"
      :time="item?.time"
    />
  </scroll-view>
</template>

<script setup lang="ts">
// components
import trumpetAnimation from '@/components/trumpet-animation.vue'

// props
defineProps<{
  recordList: { time: string; src: string }[]
}>()
</script>

<style lang="scss" scoped>
.title {
  padding: 24rpx;
  background-color: #f8f8f8;
  font-family: Poppins;
  font-size: 30px;
  font-weight: bold;
  line-height: 42px;
  letter-spacing: -0.3px;
  color: $uni-bg-color;
}

.record-message {
  height: 38vh;
  padding: 24rpx;
  overflow-y: scroll;
  background-color: #f8f8f8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}
</style>
