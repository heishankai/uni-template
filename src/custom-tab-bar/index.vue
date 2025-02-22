<template>
  <cover-view class="custom-tab-bar">
    <cover-view v-for="(item, index) in list" :key="index" class="tab-bar-item" :data-path="item.pagePath"
      :data-index="index" @tap="switchTab">
      <cover-image :src="selected === index ? item.selectedIconPath : item.iconPath" class="cover_image" />
      <cover-view :style="{ color: selected === tableSelected ? selectedColor : color }" class="cover_view">
        {{ item.text }}
      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useTabbarStore } from '@/stores'
const { setSelected, tableSelected } = useTabbarStore()

const selected = ref(0);
const selectedColor = ref('#d81e06')
const color = ref('#2c2c2c')
console.log(selected.value, 'selected');
console.log(tableSelected, 'tableSelected');

const list =
  [
    {
      pagePath: "/pages/index/index",
      iconPath: "/static/tabbar/index.png",
      selectedIconPath: "/static/tabbar/index_on.png",
      text: "首页"
    },
    {
      pagePath: "/pages/classify/index",
      iconPath: "/static/tabbar/classify.png",
      selectedIconPath: "/static/tabbar/classify_on.png",
      text: "分类"
    },
    {
      pagePath: "/pages/scan/index",
      iconPath: "/static/tabbar/scan.png",
      selectedIconPath: "/static/tabbar/scan_on.png",
      text: "扫码"
    },
    {
      pagePath: "/pages/cart/index",
      iconPath: "/static/tabbar/cart.png",
      selectedIconPath: "/static/tabbar/cart_on.png",
      text: "购物车"
    },
    {
      pagePath: "/pages/mine/index",
      iconPath: "/static/tabbar/mine.png",
      selectedIconPath: "/static/tabbar/mine_on.png",
      text: "我的"
    }
  ]


const switchTab = (event) => {

  const data = event.currentTarget.dataset;

  // console.log(selected.value, 'selected.value '); // 0
  console.log(data.index, 'data.index'); // 1

  uni.switchTab({ url: data.path })
  setSelected(data.index)
  // selected.value = data.index;

};
</script>

<style lang="scss" scoped>
.custom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 6px;
  /* 底部安全局 */
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-bar-item .cover_image {
  width: 54rpx;
  height: 54rpx;
  margin: 0 auto;
  margin-bottom: 10rpx;
}

.tab-bar-item .cover_view {
  font-size: 20rpx;
  text-align: center;
  font-weight: 500;
}

.logo {
  position: absolute;
  top: 0;
  left: 50%;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-left: -50rpx;
}
</style>