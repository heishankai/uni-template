<script setup lang="ts">
import { ref } from 'vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const searchValue = ref<string>('')

console.log(searchValue.value, 'searchValue')

const handleInputChange = (e: any): void => {
  searchValue.value = e.detail.value
}

// 返回上一页
const handleBack = (): void => {
  uni.navigateBack()
}
</script>

<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
    <!-- title -->
    <view class="title" @click="handleBack">
      <uni-icons type="back" color="#FFFFFF" size="24" />
    </view>
    <view class="tips">搜索我的订单</view>
    <!-- 搜索条 -->
    <view class="search">
      <view class="search-input">
        <uni-icons type="search" color="#00cec9" size="24" />
        <input v-model="searchValue" placeholder="请输入撰稿人名称" @input="handleInputChange" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.navbar {
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding: 20rpx 30rpx 30rpx 30rpx;
  background-color: $uni-bg-color;

  .title {
    display: flex;
    align-items: center;
    height: 64rpx;

    text {
      flex: 1;
    }
  }

  .tips {
    margin-top: 20rpx;
    font-family: Poppins;
    font-size: 30px;
    font-weight: bold;
    line-height: 42px;
    letter-spacing: -0.3px;
    color: $uni-text-color-inverse;
  }

  .search {
    margin-top: 40rpx;
    padding-bottom: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search-input {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 20rpx;
      letter-spacing: 0.54rpx;
      font-size: 28rpx;
      border-radius: 30px;
      color: $uni-text-color-placeholder;
      background: $uni-text-color-inverse;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

      uni-icons {
        margin-right: 16rpx;
      }

      input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        color: $uni-text-color;
        font-size: 28rpx;
      }
    }
  }
}
</style>
