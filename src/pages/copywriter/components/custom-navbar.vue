<script setup lang="ts">
import { ref } from 'vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const searchValue = ref<string>('')

console.log(searchValue.value, 'searchValue')

const handleInputChange = (e: any): void => {
  searchValue.value = e.detail.value
}
</script>

<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
    <view class="title">
      <text>公益1勺盐</text>
    </view>
    <view class="search">
      <view class="search-input">
        <uni-icons type="search" color="#00cec9" size="24" />
        <input v-model="searchValue" placeholder="搜索撰稿人" @input="handleInputChange" />
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
  background-color: $uni-bg-color;

  .title {
    display: flex;
    align-items: center;
    height: 64rpx;
    padding-left: 30rpx;

    text {
      flex: 1;
      line-height: 28rpx;
      color: $uni-text-color-inverse;
      margin: 2rpx 0 0 20rpx;
      font-size: 28rpx;
      letter-spacing: 0.54rpx;
    }
  }

  .search {
    margin: 24rpx;
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
