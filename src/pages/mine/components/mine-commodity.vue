<template>
  <view class="commodity-title">
    <uni-icons type="fire" size="24" color="#c8bfbf" />
    <text>猜你喜欢</text>
    <uni-icons type="fire" size="24" color="#c8bfbf" />
  </view>
  <view class="mine-commodity">
    <view
      v-for="(item, index) in commodityList"
      :key="index"
      class="commodity-item"
      :style="{
        background: `url(${item?.image}) no-repeat center center`,
        backgroundSize: 'cover',
      }"
    >
      <view class="info">
        <view class="name">{{ item.name }}</view>
        <view class="money">{{ item.money }} ¥</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const commodityList = ref([
  {
    id: 1,
    name: '商品 1',
    money: 192.88,
    image: 'https://img.yzcdn.cn/vant/apple-1.jpg',
  },
  {
    id: 2,
    name: '商品 2',
    money: 192.88,
    image: 'https://img.yzcdn.cn/vant/apple-2.jpg',
  },
  {
    id: 3,
    name: '商品 3',
    money: 192.88,
    image: 'https://img.yzcdn.cn/vant/apple-3.jpg',
  },
  {
    id: 4,
    name: '商品 4',
    money: 192.88,
    image: 'https://img.yzcdn.cn/vant/apple-4.jpg',
  },
])
</script>

<style lang="scss" scoped>
.commodity-title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 24rpx;
  color: $uni-text-color-placeholder;
}

.mine-commodity {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0rpx 48rpx 48rpx 48rpx;
  gap: 24rpx;

  .commodity-item {
    width: 48%;
    aspect-ratio: 4 / 5;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
  }

  .info {
    padding: 24rpx;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .name {
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }

  .money {
    font-size: 14px;
    color: #e74c3c;
    margin-top: 5rpx;
  }
}
</style>
