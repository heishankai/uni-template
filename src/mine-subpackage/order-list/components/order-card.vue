<template>
  <view class="order-list">
    <view class="order-item" v-for="orderInfo in orderInfoList" :key="orderInfo.orderNumber">
      <view class="item-header">
        <view>
          <text>订单编号：</text>
          <text>{{ orderInfo.orderNumber }}</text>
        </view>
        <view>{{ orderInfo.paymentStatus === '002' ? '已支付' : '' }}</view>
      </view>
      <view class="item-body">
        <image :src="orderInfo.copywriter_avatar" mode="scaleToFill" />
        <view class="body-info">
          <view>
            <text>撰稿人名称：</text>
            <text class="order-time">{{ orderInfo.copywriter_name }}</text>
          </view>
          <view>
            <text>订单金额：</text>
            <text class="order-time">{{ orderInfo.orderAmount }}￥</text>
          </view>
          <view>
            <text>下单时间：</text>
            <text class="order-time">{{ orderInfo.orderTime }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  orderInfoList: {
    orderNumber: string
    paymentStatus: string
    copywriter_name: string
    orderAmount: number
    orderTime: string
    orderTimePeriod: [] // 预约时间段
    copywriter_avatar: string
  }[]
}>()
</script>

<style lang="scss" scoped>
.order-list {
  margin: 24rpx;
}
.order-item {
  padding: 24rpx;
  border-radius: 12rpx;
  background-color: #f7f7fa;
  margin-bottom: 30rpx;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
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
