<template>
  <view class="order-item" v-for="praiseInfo in praiseList" :key="praiseInfo.orderNumber">
    <view class="item-header">
      <view>
        <text> 订单编号： </text>
        <text>{{ praiseInfo.orderNumber }}</text>
      </view>
    </view>
    <view class="item-body">
      <image src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" />
      <view class="body-info">
        <view>{{ praiseInfo.copywriterName }}</view>
        <view>
          <text>点赞金额：</text>
          <text class="order-time">{{ praiseInfo.money }}￥</text>
        </view>
        <view>
          <text>付款时间：</text>
          <text class="order-time">{{ praiseInfo.time }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  praiseList: Array,
  default: [],
})
</script>

<style lang="scss" scoped>
.order-item {
  padding: 24rpx;
  border-radius: 12rpx;
  background-color: $uni-text-color-inverse;
  margin-bottom: 30rpx;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 32rpx;
  font-weight: 500;
  padding-bottom: 24rpx;
  color: $uni-text-color-placeholder;
  border-bottom: 1rpx solid $uni-border-color;
}

.item-body {
  padding-top: 24rpx;
  display: flex;

  image {
    width: 180rpx;
    height: 180rpx;
    border-radius: 12rpx;
  }

  .body-info {
    margin-left: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    font-size: 32rpx;
    color: $uni-text-color-placeholder;

    .order-time {
      font-size: 28rpx;
    }
  }
}
</style>
