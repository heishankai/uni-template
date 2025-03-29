<template>
  <view class="notice">
    <view class="notice-avatar">
      <uni-icons type="notification" color="#FFFFFF" size="28" />
    </view>
    <view class="notice-text">消息记录只能保存7天哟</view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  messageListData: [],
})
</script>

<style lang="scss" scoped>
.notice {
  margin: 24rpx;
  padding: 24rpx;
  border-radius: 30rpx;
  background-color: $uni-text-color-inverse;
  display: flex;
  align-items: center;

  .notice-avatar {
    width: 100rpx;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: $uni-bg-color;
  }

  .notice-text {
    margin-left: 24rpx;
    color: $uni-text-color-placeholder;
  }
}
</style>
