<template>
  <view class="info-data">
    <view class="header">
      <image class="avatar" :src="info.avatar" mode="scaleToFill" />
    </view>
    <view class="info-body">
      <view v-if="info?.nickname">姓名：{{ info?.nickname }}</view>
      <view v-if="info?.gender">性别：{{ info?.gender === '1' ? '男' : '女' }}</view>
      <view v-if="info?.age">年龄：{{ info?.age }}</view>
      <view v-if="info?.city">城市：{{ info?.city }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  info: {
    nickname: string
    _id: string
    avatar: string
    gender: string
    age: number
    city: string
  }
}>()
</script>

<style lang="scss" scoped>
.info-data {
  .header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      flex-shrink: 0;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      margin-top: 48rpx;
    }
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
