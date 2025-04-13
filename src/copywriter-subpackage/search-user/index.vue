<template>
  <view class="container">
    <!-- 搜索 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <view class="title" @click="handleBack">
        <uni-icons type="back" color="#FFFFFF" size="24" />
      </view>
      <view class="tips">搜索用户</view>
      <view class="search">
        <view class="search-input">
          <uni-icons type="search" color="#00cec9" size="24" />
          <input placeholder="请输入名称或城市" @input="handleInputChange" />
        </view>
      </view>
    </view>
    <scroll-view class="scroll-view" scroll-y>
      <!-- 撰稿人列表 -->
      <story-list v-if="storyListData?.length" :storyListData="storyListData" />
      <view v-else class="no-data">
        <uni-icons custom-prefix="iconfont" type="icon-wushuju" color="#808080" size="100" />
        <view>暂无数据</view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { searchWriterService } from './service'
import { debounce } from 'lodash-es'
// components
import storyList from './components/story-list.vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 撰稿人列表数据
const storyListData = ref<any[]>([])

// 搜索
const handleInputChange = debounce(async (e: any): Promise<any> => {
  if (!e.detail.value) {
    storyListData.value = []
    return
  }

  uni.showLoading({ title: '加载中...', mask: true })
  const { data } = await searchWriterService({
    page: 1,
    limit: 10,
    keyword: e.detail.value,
  })

  storyListData.value = data || []
  uni.hideLoading()
}, 500)

// 返回上一页
const handleBack = (): void => {
  uni.navigateBack()
}
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: $uni-operation-text;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;

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
}

.scroll-view {
  flex: 1;
  overflow: hidden;
  padding-bottom: env(safe-area-inset-bottom);

  .no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90%;
    font-size: 28rpx;
    color: $uni-text-color-placeholder;

    uni-icons {
      margin-bottom: 12rpx;
    }
  }
}
</style>
