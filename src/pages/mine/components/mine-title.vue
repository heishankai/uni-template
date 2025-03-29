<template>
  <view class="title-container">
    <navigator url="/mine-subpackage/personal-data/index" hover-class="navigator-hover">
      <view> 个人资料 </view>
      <uni-icons type="right" size="18" color="#6c6c6c" />
    </navigator>
    <navigator url="/mine-subpackage/apply-copywriter/index" hover-class="navigator-hover">
      <view> 成为撰稿人 </view>
      <uni-icons type="right" size="18" color="#6c6c6c" />
    </navigator>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.title-container {
  margin: 0rpx 48rpx 24rpx 48rpx;

  navigator {
    padding: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 0rpx;
    font-size: 32rpx;
    font-weight: 500;
    border-bottom: 1px solid #d2d2e0;
  }

  .navigator-hover {
    background-color: #ffffff;
  }
}
</style>
