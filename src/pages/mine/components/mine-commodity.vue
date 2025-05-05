<template>
  <view class="commodity-title">
    <uni-icons type="fire" size="24" color="#c8bfbf" />
    <text>猜你喜欢</text>
    <uni-icons type="fire" size="24" color="#c8bfbf" />
  </view>
  <view class="mine-commodity">
    <view
      v-for="item in commodityList"
      :key="item.appId"
      class="commodity-item"
      :style="{
        background: `url(${item?.image}) no-repeat center center`,
        backgroundSize: 'cover',
      }"
      @click="handleGominiProgram(item)"
    >
      <view class="info">
        <view class="name">{{ item.name }}</view>
        <view class="money" v-if="item.money">{{ item.money }} ¥</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const commodityList = ref([
  {
    appId: '',
    name: '金彩1家人',
    money: '',
    url: 'https://mp.weixin.qq.com/s/KtLlZahgg3zIerJtyxxkIA',
    image:
      'https://mmbiz.qpic.cn/sz_mmbiz_png/31rgBE2rEsdbysOhnJ4S4iczv9MHVyXfuGZbBmDqAhAmM2MquITHUHCDicO8ibRaO3WlMIoNAaNaibcf7DwP0I8vSA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1',
  },
  {
    appId: '',
    name: '榕树洞',
    money: '',
    url: 'https://mp.weixin.qq.com/s/Kyy0tGxCbn7asBtxycGTUA',
    image:
      'https://mmecoa.qpic.cn/mmecoa_png/ricy4CgALmLj1FxU6HfbrVM4OabYC7hyDviauNgOsJq5wdNxhyicYkIxejHhL6XJqCBTQzzOKia12sFhCvJ5hpyiaLw/640?wx_fmt=png&tp=wxpic&wxfrom=10005&wx_lazy=1',
  },
])

// 跳转服务号
const handleGominiProgram = (item: any): void => {
  const { appId, url, name } = item ?? {}
  if (url) {
    uni.navigateTo({
      url: `/mine-subpackage/web-view/index?url=${url}&name=${name}`,
    })
    return
  }
  uni.navigateToMiniProgram({
    appId,
    fail: (err) => {
      console.error('Navigation to mini program failed:', err)
      uni.showToast({ title: '跳转失败', icon: 'none' })
    },
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
