<template>
  <view class="commodity-title">
    <uni-icons type="fire" size="24" color="#c8bfbf" />
    <text>猜你喜欢</text>
    <uni-icons type="fire" size="24" color="#c8bfbf" />
  </view>
  <view class="mine-commodity">
    <view
      v-for="item in commodityList"
      :key="item.name"
      class="commodity-item"
      @click="handleGominiProgram(item)"
    >
      <image :src="item?.image" mode="aspectFill" show-menu-by-longpress />
      <view class="info">
        <view class="name">{{ item.name }}</view>
      </view>
      <view class="money" v-if="item.money">{{ item.money }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const commodityList = ref([
  // {
  //   appId: '',
  //   name: '金彩1家人',
  //   money: '长按识别二维码',
  //   image: 'https://yisaoyan.oss-cn-hangzhou.aliyuncs.com/yisaoyan/1746450468719965.jpg',
  // },
  {
    appId: '',
    name: '榕树洞',
    money: '长按识别二维码',
    image: 'https://yisaoyan.oss-cn-hangzhou.aliyuncs.com/yisaoyan/1746450468719965.jpg',
  },
  {
    appId: '',
    name: '大咖小黑板',
    money: '长按识别二维码',
    image: 'https://yisaoyan.oss-cn-hangzhou.aliyuncs.com/yisaoyan/1746450610453918.jpg',
  },
  {
    appId: '',
    name: '实习offer通',
    money: '长按识别二维码',
    image: 'https://yisaoyan.oss-cn-hangzhou.aliyuncs.com/yisaoyan/1746450742755440.jpg',
  },
])

// 跳转服务号
const handleGominiProgram = (item: any): void => {
  const { image } = item ?? {}
  uni.previewImage({
    current: image,
    urls: [image],
  })
}
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

  image {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
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
    padding: 0rpx 12rpx 8rpx 24rpx;
    font-size: 12px;
    color: #e74c3c;
  }
}
</style>
