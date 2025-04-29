<script setup lang="ts">
import { ref } from 'vue'
import { tabList } from '../utils'
import { getSocket } from '@/utils/socket'
import { onShow } from '@dcloudio/uni-app'
import { useUserInfoStore } from '@/stores'
const { userInfo } = useUserInfoStore()

const socket = getSocket()

const userData = ref<any>({
  avatar: null,
})

socket?.on('orderinform', (msg) => {
  console.log(msg.data, 'msg.data')
  userData.value = msg.data
})

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

// 跳转到搜索页面
const handleInputChange = (): void => {
  uni.navigateTo({
    url: `/copywriter-subpackage/search-user/index`,
  })
}

// 跳转到人员中心页面
const handleGoinfoData = (): void => {
  console.log(userData.value, 'userData.value')
  const { userid, nickname } = userData.value || {}
  if (!userid) {
    return
  }

  uni.vibrateShort()
  uni.navigateTo({
    url: `/copywriter-subpackage/dialogue-detail/index?_id=${userid}&nickname=${nickname}`,
  })
}

onShow(() => {
  userData.value.avatar = userInfo.avatar
  userData.value.userid = userInfo._id
  userData.value.nickname = userInfo.nickname
})
</script>

<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
    <!-- 头像部分 -->
    <view class="title5">
      <view class="title4">
        <view class="title3">
          <view class="title2">
            <view class="title1">
              <view class="title" @click="handleGoinfoData">
                <image v-if="userData?.avatar" :src="userData?.avatar" mode="scaleToFill" />
                <uni-icons
                  v-if="userData?.avatar"
                  class="smallcircle"
                  custom-prefix="iconfont"
                  type="icon-laba2"
                  color="#509F2C"
                  size="28"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 欢迎语 -->
    <view class="titleTips">
      <view class="tips">欢迎倾听故事</view>
    </view>

    <view class="search">
      <view class="search-input">
        <uni-icons type="search" color="#00cec9" size="24" />
        <input placeholder="搜索用户" disabled @click="handleInputChange" />
      </view>
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

  .search {
    z-index: 1;
    margin: 24rpx 0rpx;
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
      top: 0rpx;
      right: -33rpx;
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

  .titleTips {
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
