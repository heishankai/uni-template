<template>
  <view class="header-container">
    <view class="show-info" v-if="profile.user_token">
      <image class="avatar" :src="profile.avatar" mode='aspectFill' />
      <view class="data" @click="handelePersonal">
        <view class="name">{{ profile.nickname }}</view>
        <view class="hint">修改个人信息</view>
      </view>
    </view>
    <view v-else>
      <view class="title">欢迎加入榕树洞</view>
      <view class="hint">时代巨变，惟故事恒久。</view>
      <button class="login" @click="handeleLogin">登录/注册</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
// store
import { useUserInfoStore } from '@/stores'

const profile = ref({
  // 头像
  avatar: '',
  // 昵称
  nickname: '',
  // tolen
  user_token: '',
})

const handeleLogin = (): void => {
  uni.vibrateShort()
  uni.navigateTo({
    url: '/mine-subpackage/login/index',
  })
}

const handelePersonal = (): void => {
  uni.vibrateShort()
  uni.navigateTo({
    url: '/mine-subpackage/personal-data/index',
  })
}

onShow(() => {
  const { userInfo } = useUserInfoStore()
  profile.value = { ...userInfo }
})
</script>

<style lang="scss" scoped>
.header-container {
  margin: 48rpx;

  .title {
    font-size: 48rpx;
    color: $uni-text-color;
    font-weight: 500;
    letter-spacing: 0.54rpx;
  }

  .hint {
    font-size: 28rpx;
    color: $uni-text-color-placeholder;
  }

  .show-info {
    display: flex;
    align-items: center;

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      flex-shrink: 0;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }

    .data {
      margin-left: 24rpx;
      line-height: 1.6;
    }
  }

  .login {
    width: 30%;
    margin: 48rpx 0rpx 0rpx 0rpx;
    padding: 12rpx;
    font-size: 28rpx;
    font-weight: 500;
    letter-spacing: 0.54rpx;
    border-radius: 50rpx;
    color: $uni-operation-text;
    background-color: $uni-bg-color;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    &::after {
      border: none;
    }
  }
}
</style>
