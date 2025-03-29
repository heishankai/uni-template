<template>
  <view class="copywriter-list">
    <view class="title">
      <view>精选撰稿人</view>
    </view>
    <scroll-view scroll-x class="scroll-view">
      <view
        class="item"
        v-for="item in swiperList"
        :key="item.id"
        @click="handleCopywriterPage(item.id)"
        :style="{
          background: `url(${item?.picture}) no-repeat center center`,
          backgroundSize: 'cover',
        }"
      >
        <view class="info">
          <view class="name">{{ item.name }}</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 跳转到详情页
const handleCopywriterPage = (id): void => {
  uni.vibrateShort()
  uni.navigateTo({
    url: `/copywriter-subpackage/copywriter-info/index?id=${id}`,
  })
}

const swiperList = ref([
  {
    desc: '我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯',
    id: '1477017',
    name: '陈淑雅',
    record: 115,
    yearsWork: 6,
    picture: 'https://yanxuan-item.nosdn.127.net/4aec56f5a1af7c3538e47acf301ad15b.png',
    top: 'TOP1',
    collectNumber: 100,
    praiseNumber: 200,
  },
  {
    desc: '我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯',
    id: '1477017',
    name: '李凯',
    record: 95,
    yearsWork: 7,
    picture: 'https://yanxuan-item.nosdn.127.net/0e1681ab3a4a5aaf185f0bb123f07f99.jpg',
    top: 'TOP2',
    collectNumber: 80,
    praiseNumber: 2020,
  },
  {
    desc: '我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯',
    id: '1477017',
    name: '唐玄奘',
    record: 30,
    yearsWork: 3,
    picture: 'https://yanxuan-item.nosdn.127.net/0d8fe495fe82abbdf8826c4fd1e1e77b.png',
    top: 'TOP3',
    collectNumber: 80,
    praiseNumber: 2020,
  },
])
</script>

<style lang="scss" scoped>
.copywriter-list {
  margin: 24rpx;

  .title {
    font-family: Montserrat;
    font-size: 18px;
    font-weight: bold;
    line-height: 27px;
    letter-spacing: 0.54px;
    color: $uni-text-color-black;
  }

  .scroll-view {
    margin: 24rpx 0rpx;
    white-space: nowrap; // 让子元素不换行
    display: flex; // 让子元素按行排列

    .item {
      flex: 0 0 auto; // 让 item 维持自身宽度
      display: inline-block;
      width: 155px;
      height: 188px;
      border-radius: 20px;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
      margin-right: 24rpx;
      position: relative; // 确保 info 绝对定位有效
      overflow: hidden; // 避免子元素溢出边界

      .info {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 24rpx;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      .name {
        font-size: 16px;
        font-weight: bold;
        color: #000;
        padding-right: 36rpx;
      }
    }
  }
}
</style>
