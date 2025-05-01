<template>
  <view class="steps">
    <view v-for="(step, index) in steps" :key="index" class="step-item">
      <view class="circle-line-wrapper">
        <view class="circle" :class="{ active: index <= active }">{{ index + 1 }}</view>
        <view
          v-if="index < steps.length - 1"
          class="line"
          :class="{ active: index < active }"
        ></view>
      </view>
      <view class="step-title" :class="{ active: index <= active }">
        <text>{{ step.title }}</text>
        <view class="desc" v-show="active === 1">{{ step.desc }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  steps: { title: string; desc: string }[]
  active: number
}>()
</script>

<style scoped lang="scss">
.steps {
  display: flex;
  flex-direction: column;
  /* gap: 60rpx; */
}

.step-item {
  display: flex;
  align-items: flex-start;
  position: relative;
}

.circle-line-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 24rpx;
  position: relative;
}

.desc {
  color: $uni-text-color-placeholder;
  font-size: 24rpx;
}

.circle {
  width: 42rpx;
  height: 42rpx;
  border-radius: 50%;
  background-color: #ccc;
  color: #fff;
  font-size: 24rpx;
  line-height: 42rpx;
  text-align: center;
  z-index: 1;

  &.active {
    background-color: $uni-bg-color;
  }
}

.line {
  width: 4rpx;
  height: 60rpx;
  background-color: #ccc;
  margin: 10rpx 0rpx;

  &.active {
    background-color: $uni-bg-color;
  }
}

.step-title {
  font-size: 28rpx;
  color: #999;

  &.active {
    color: $uni-text-color-black;
    font-weight: 500;
  }
}
</style>
