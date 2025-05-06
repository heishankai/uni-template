<template>
  <view class="tab-bar">
    <view
      v-for="(item, index) in tabList"
      :key="index"
      :class="['tab-bar-item', { center: index === 2 }]"
      @click="switchTab(item)"
    >
      <image :src="selected === item?.selected ? item?.selectedIconPath : item?.iconPath" />
      <text :style="{ color: selected === item?.selected ? selectedColor : color }">
        {{ item.text }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
const color = '#C8BFBF'
const selectedColor = '#151515'

defineProps({
  selected: {
    type: String,
    default: '0',
  },
})

const tabList = [
  {
    selected: '0',
    pagePath: '/pages/index/index',
    iconPath: '../static/tabbar/index.png',
    selectedIconPath: '../static/tabbar/index_on.png',
    text: '讲出来',
  },
  {
    selected: '1',
    pagePath: '/pages/copywriter/index',
    iconPath: '../static/tabbar/copywriter.png',
    selectedIconPath: '../static/tabbar/copywriter_on.png',
    text: '我来写',
  },
  {
    selected: '2',
    pagePath: '/pages/taletelling/index',
    iconPath: '../static/tabbar/taletelling.png',
    selectedIconPath: '../static/tabbar/taletelling_on.png',
    text: '',
  },
  {
    selected: '3',
    pagePath: '/pages/message/index',
    iconPath: '../static/tabbar/order.png',
    selectedIconPath: '../static/tabbar/order_on.png',
    text: '订单',
  },
  {
    selected: '4',
    pagePath: '/pages/mine/index',
    iconPath: '../static/tabbar/mine.png',
    selectedIconPath: '../static/tabbar/mine_on.png',
    text: '我的',
  },
]

// 跳转 tabBar 菜单栏
const switchTab = (item): void => {
  uni.vibrateShort()
  uni.switchTab({ url: item?.pagePath })
}
</script>

<style lang="scss" scoped>
.tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  padding: 10rpx 10rpx env(safe-area-inset-bottom) 10rpx;
}

.tab-bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  image {
    width: 48rpx;
    height: 48rpx;
  }

  text {
    padding-top: 10rpx;
    font-size: 22rpx;
    font-weight: 400;
  }
}

/* 中间的 tab 设置为圆形并上浮，同时增加白色外边框 */
.tab-bar-item.center {
  flex: none; /* 取消父级的 flex: 1 影响 */
  z-index: 9999;
  margin-top: -50rpx; /* 上浮效果 */
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background-color: $uni-bg-color;
  border: 20rpx solid #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  image {
    width: 80rpx;
    height: 80rpx;
  }
}
</style>
