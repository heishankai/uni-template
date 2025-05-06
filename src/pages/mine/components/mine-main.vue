<template>
  <view class="main-container">
    <view class="card-box">
      <navigator url="/mine-subpackage/collect-list/index" class="card">
        <view>收藏</view>
        <view>快去查看我的收藏吧</view>
        <view>
          <uni-icons type="arrow-right" size="18" color="#6c6c6c" />
          <image src="@/static/copywriter-sbuPages/collect_on.png" mode="aspectFill" />
        </view>
      </navigator>
      <navigator url="/mine-subpackage/praise-list/index" class="card">
        <view>点赞</view>
        <view>快去查看我的点赞吧</view>
        <view>
          <uni-icons type="arrow-right" size="18" color="#6c6c6c" />
          <image src="@/static/copywriter-sbuPages/praise_on.png" mode="aspectFill" />
        </view>
      </navigator>
    </view>
    <!-- <navigator url="/mine-subpackage/order-list/index" class="order-card">
      <view>订单</view>
      <view>快去查看我的订单吧</view>
      <view>
        <uni-icons type="arrow-right" size="18" color="#6c6c6c" />
        <image src="@/static/mine/order.png" mode="aspectFill" />
      </view>
    </navigator> -->
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main-container {
  margin: 0rpx 48rpx;

  .card-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24rpx;

    .card {
      width: 100%;
      padding: 24rpx;
      border-radius: 8rpx;
      background-color: $uni-card-bg-color;

      view:nth-child(1) {
        font-size: 32rpx;
        line-height: 48rpx;
        color: #6c6c6c;
      }

      view:nth-child(2) {
        font-size: 24rpx;
        line-height: 48rpx;
        color: #bbbbbb;
      }

      view:nth-child(3) {
        font-size: 32rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      image {
        width: 62rpx;
        height: 62rpx;
      }
    }
  }

  .order-card {
    margin-top: 24rpx;
    padding: 24rpx;
    border-radius: 8rpx;
    background-color: $uni-card-bg-color;

    view:nth-child(1) {
      font-size: 32rpx;
      line-height: 48rpx;
      color: #6c6c6c;
    }

    view:nth-child(2) {
      font-size: 24rpx;
      line-height: 48rpx;
      color: #bbbbbb;
    }

    view:nth-child(3) {
      font-size: 32rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    image {
      width: 62rpx;
      height: 62rpx;
    }
  }
}
</style>
