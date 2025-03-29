<template>
  <view class="header-container">
    <view class="title">欢迎加入一勺盐</view>
    <view class="hint">欢迎加入一勺盐，欢迎欢迎，热烈欢迎</view>
    <button @click="handeleLogin">登录/注册</button>
  </view>
</template>

<script setup lang="ts">
const handeleLogin = (): void => {
  uni.vibrateShort()
  uni.navigateTo({
    url: '/mine-subpackage/login/index',
  })
}
</script>

<style lang="scss" scoped>
.header-container {
  margin: 48rpx;

  .title {
    font-size: 48rpx;
    color: $uni-text-color;
    font-weight: 500;
    letter-spacing: 0.54rpx;
  }

  .hint {
    font-size: 28rpx;
    color: $uni-text-color-placeholder;
  }

  button {
    width: 30%;
    margin: 48rpx 0rpx 0rpx 0rpx;
    padding: 12rpx;
    font-size: 28rpx;
    font-weight: 500;
    letter-spacing: 0.54rpx;
    border-radius: 50rpx;
    color: $uni-operation-text;
    background-color: $uni-bg-color;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    &::after {
      border: none;
    }
  }
}
</style>
