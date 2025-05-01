<template>
  <view class="auth-info">
    <view class="describe">{{ describe }}</view>
    <view class="halving-line"></view>
    <view class="content-title"> 权益说明： </view>
    <view class="content-describe">
      <text>1. 推荐权重提升：</text>
      <text>有机会获得公众号头图推送、小程序首页展示等流量支持</text>
    </view>
    <view class="content-describe">
      <text>2. 品牌合作推荐：</text>
      <text>获得平台商业文案合作优先资格，稿件可参与分成计划</text>
    </view>
    <view class="content-describe">
      <text>3. 专属身份标识：</text>
      <text>列表展示“认证撰稿人”标识，提高专业信任度</text>
    </view>
    <view class="halving-line"></view>
    <view class="content-title"> 审核进度： </view>
    <view class="steps">
      <VerticalSteps :steps="stepsList" :active="active" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { describe } from '../utils'
import VerticalSteps from './steps.vue'

defineProps({
  active: {
    type: Number,
    default: 0,
  },
  stepsList: {
    type: Array as () => { title: string; desc: string }[],
    default: () => [],
  },
})
</script>

<style lang="scss" scoped>
.auth-info {
  padding: 48rpx;
}

.steps {
  margin-top: 24rpx;
}

.halving-line {
  margin: 24rpx 0;
  width: 100%;
  height: 1rpx;
  background-color: $uni-text-color-disable;
}

.describe {
  font-size: 32rpx;
  color: $uni-text-color-placeholder;
  line-height: 1.5;
}

.content-title {
  font-size: 32rpx;
  color: $uni-text-color-black;
  line-height: 1.5;
  font-weight: bold;
  position: relative; // 为伪元素定位
  padding-left: 18rpx; // 给文字留出空间

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%); // 垂直居中
    width: 8rpx;
    height: 70%; // 控制竖杠高度
    background-color: $uni-bg-color; // 竖杠颜色
  }
}

.content-describe {
  margin-top: 24rpx;
  font-size: 32rpx;
  color: $uni-text-color-black;
  line-height: 1.5;

  text:nth-child(2) {
    font-size: 32rpx;
    line-height: 48rpx;
    color: $uni-text-color-placeholder;
  }
}
</style>
