<template>
  <view class="container">
    <scroll-view class="scroll-view" scroll-y>
      <template> 11 </template>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import { onShow, onHide } from '@dcloudio/uni-app'

onShow(() => {
  console.log('页面显示')
})
onHide(() => {
  console.log('监听页面隐藏')
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
