<template>
  <view class="rate-bar">
    <view
      v-for="(item, index) in 3"
      :key="index"
      class="item"
      :style="{
        backgroundColor: index < rate ? '#00cec9' : '#808080',
      }"
    ></view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  rate: { type: Number, default: 1 },
})
</script>

<style lang="scss" scoped>
.rate-bar {
  margin: 30rpx;
  display: flex;
  align-items: center;
  gap: 18rpx;

  .item {
    width: 50px;
    height: 15px;
    border-radius: 50px;
  }
}
</style>
