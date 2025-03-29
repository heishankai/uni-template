<template>
  <view class="info-data">
    <image :src="info.avatar" mode="scaleToFill" />
    <view class="info-body">
      <view>姓名：{{ info.name }}</view>
      <view>性别：{{ info.gender }}</view>
      <view>年龄：{{ info.age }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  info: {
    name: string
    id: number
    avatar: string
    gender: string
    age: number
  }
}>()
</script>

<style lang="scss" scoped>
.info-data {
  image {
    width: 100%;
    height: 500rpx;
    display: block;
  }

  .info-body {
    width: 100%;
    box-sizing: border-box;
    border-radius: 50rpx 50rpx 0 0;
    padding: 48rpx;

    view {
      color: $uni-text-color-placeholder;
      line-height: 60rpx;
    }
  }
}
</style>
