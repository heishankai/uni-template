<template>
  <view class="copywriter-list" v-if="swiperList?.length">
    <view class="title">
      <view>精选撰稿人</view>
    </view>
    <scroll-view scroll-x class="scroll-view">
      <view
        class="item"
        v-for="item in swiperList"
        :key="item.id"
        @click="handleCopywriterPage(item)"
        :style="{
          background: `url(${item?.avatar}) no-repeat center center`,
          backgroundSize: 'cover',
        }"
      >
        <view class="info">
          <view class="name">{{ item.nickname }}</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
// service
import { getAllWriterByTypeService } from '../service'

// 跳转到详情页
const handleCopywriterPage = (item): void => {
  const { openid, nickname } = item ?? {}
  uni.vibrateShort()
  uni.navigateTo({
    url: `/copywriter-subpackage/copywriter-info/index?openid=${openid}&nickname=${nickname}`,
  })
}

const swiperList = ref<any>([])

// 获取数据
const getSwiperList = async (): Promise<void> => {
  // 获取数据
  const { data } = await getAllWriterByTypeService()
  swiperList.value = data || []
}

onShow(() => {
  getSwiperList()
})
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
