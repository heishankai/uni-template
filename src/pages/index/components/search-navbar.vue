<script setup lang="ts">
import { tabList } from '../utils'

defineProps({
  selectedTab: {
    type: String,
    default: '0',
  },
})

const emit = defineEmits(['updateSelectTab'])

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 选择 tab 方法
const selectTab = (value: string): void => {
  uni.vibrateShort()
  emit('updateSelectTab', value) // 将 value 作为参数传递
}
</script>

<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
    <!-- 头像部分 -->
    <view class="title5">
      <view class="title4">
        <view class="title3">
          <view class="title2">
            <view class="title1">
              <view class="title">
                <image
                  src="https://yanxuan-item.nosdn.127.net/4aec56f5a1af7c3538e47acf301ad15b.png"
                  mode="scaleToFill"
                />
                <uni-icons
                  class="smallcircle"
                  type="smallcircle-filled"
                  color="#509F2C"
                  size="24"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 欢迎语 -->
    <view class="search">
      <view class="tips">欢迎倾听故事</view>
    </view>

    <!-- Tabs -->
    <view class="tabs">
      <view
        class="tab"
        v-for="item in tabList"
        :key="item.value"
        :class="{ active: selectedTab === item.value }"
        @click="selectTab(item.value)"
      >
        {{ item.label }}
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

  .title5 {
    position: absolute;
    top: -230rpx;
    left: -270rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 760rpx;
    height: 760rpx;
    border-radius: 50%;
    border: 1px solid rgb(227, 229, 233);
  }

  .title4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 600rpx;
    height: 600rpx;
    border-radius: 50%;
    border: 1px solid rgb(227, 229, 233);
  }

  .title3 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 460rpx;
    height: 460rpx;
    border-radius: 50%;
    border: 1px solid rgb(227, 229, 233);
  }

  .title2 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 340rpx;
    height: 340rpx;
    border-radius: 50%;
    border: 1px solid rgb(218, 219, 233);
  }

  .title1 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220rpx;
    height: 220rpx;
    border-radius: 50%;
    border: 1px solid rgb(200, 205, 209);
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .smallcircle {
      position: absolute;
      top: -5rpx;
      right: -20rpx;
      animation: blink 2.5s infinite ease-in-out;
    }

    @keyframes blink {
      0%,
      100% {
        opacity: 0.3;
      }
      50% {
        opacity: 1;
      }
    }

    image {
      width: 110rpx;
      height: 110rpx;
      border-radius: 50%;
      flex-shrink: 0;
      border: 1px solid rgb(161, 171, 178);
    }
  }

  .search {
    z-index: 2;
    margin-top: 200rpx;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .tips {
      font-family: Poppins;
      font-size: 34px;
      font-weight: bold;
      line-height: 42px;
      letter-spacing: -0.3px;
      color: $uni-text-color-black;
    }
  }

  .tabs {
    z-index: 2;
    margin-top: 24rpx;
    display: flex;
    gap: 48rpx;

    .tab {
      padding: 18rpx 28rpx;
      font-size: 26rpx;
      border-radius: 8rpx;
      color: $uni-text-color-placeholder;
      background-color: $uni-text-color-inverse;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background-color: $uni-bg-color;
        color: $uni-text-color-inverse;
      }
    }
  }
}
</style>
