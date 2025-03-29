<template>
  <view class="container">
    <!-- 滚动容器 -->
    <scroll-view class="scroll-view">
      <template>
        <view
          class="avatar"
          @click="onAvatarChange"
          :style="{
            background: `url(${profile?.avatar}) no-repeat center center`,
            backgroundSize: 'cover',
            boxShadow: '0px 7px 14px 0px rgba(0, 0, 0, 0.25)',
          }"
        >
        </view>
        <view class="form">
          <view class="form-item">
            <text>昵称</text>
            <input disabled type="text" placeholder="请填写昵称" v-model="profile.name" />
          </view>
          <view class="form-item">
            <text>性别</text>
            <input disabled type="text" placeholder="请填写昵称" v-model="profile.gender" />
          </view>
          <view class="form-item">
            <text>手机号</text>
            <input disabled type="text" placeholder="请填写昵称" v-model="profile.phone" />
          </view>
          <view class="form-item">
            <text>出生日期</text>
            <input disabled type="text" placeholder="请填写昵称" v-model="profile.birthday" />
          </view>
        </view>
      </template>
    </scroll-view>
    <button @click="onSubmit">退出登录</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const profile = ref({
  // 头像
  avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
  // 昵称
  name: '陈淑雅',
  // 手机号
  phone: '18667****23',
  // 性别
  gender: '女',
  // 生日
  birthday: '1997-12-23',
})

// 退出登录
const onSubmit = async (): Promise<void> => {
  // 如果所有必填项都已填写，则执行保存操作
  console.log(profile, 'values')
  // 这里可以添加保存数据到服务器的逻辑
}

// 上传头像 -  uni.chooseMedia 仅支持微信小程序端
const onAvatarChange = (): void => {
  uni.chooseMedia({
    // 文件个数
    count: 1,
    // 文件类型
    mediaType: ['image'],
    success: (res) => {
      // 本地路径
      const { tempFilePath } = res.tempFiles[0]
      // 上传
      uploadFile(tempFilePath)
    },
  })
}

// 文件上传-兼容小程序端、H5端、App端
const uploadFile = (file: string): void => {
  console.log(file, 'file')

  // 文件上传
  uni.uploadFile({
    url: '/member/profile/avatar',
    name: 'file',
    filePath: file,
    success: (res) => {
      if (res.statusCode === 200) {
        const avatar = JSON.parse(res.data).result.avatar
        // 个人信息页数据更新
        profile.value.avatar = avatar
        // 本地 Store头像更新
        // memberStore.profile!.avatar = avatar
        uni.showToast({ icon: 'success', title: '更新成功' })
      } else {
        uni.showToast({ icon: 'error', title: '出现错误' })
      }
    },
  })
}
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  button {
    width: 86%;
    line-height: 80rpx;
    font-size: 38rpx;
    border-radius: 30px;
    font-family: Roboto;
    letter-spacing: 0.54rpx;
    color: $uni-text-color-inverse;
    background-color: $uni-bg-color;
    margin-bottom: env(safe-area-inset-bottom);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    // 移除默认边框
    &::after {
      border: none; // 确保没有边框
    }
  }
}

.scroll-view {
  flex: 1;
  overflow: hidden;

  .avatar {
    margin: 80rpx auto;
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  // 表单
  .form {
    margin: 0rpx 30rpx;
    padding: 24rpx;
    border-radius: 24rpx;

    &-item {
      font-family: Montserrat;
      font-size: 16px;
      font-weight: 500;
      line-height: 22px;
      letter-spacing: -0.3px;
      display: flex;
      line-height: 46rpx;
      padding: 25rpx 10rpx;
      font-size: 28rpx;
      border-bottom: 2rpx solid $uni-border-color;

      input {
        flex: 1;
        display: block;
        height: 46rpx;
        color: $uni-text-color-placeholder;
      }

      text {
        width: 180rpx;
        color: $uni-text-color-black;
      }
    }
  }
}
</style>
