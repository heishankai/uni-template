<template>
  <view class="container">
    <view class="content">
      <image
        class="avatar"
        src="https://yisaoyan.oss-cn-hangzhou.aliyuncs.com/yisaoyan/1746449553614272.jpg"
        mode="scaleToFill"
      />
      <button class="submit" @click="handleLogin">一键登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
// service
import { wxLoginService } from './service'
// store
import { useUserInfoStore } from '@/stores'
const userInfoStore = useUserInfoStore()

// 登录
const handleLogin = async (): Promise<void> => {
  uni.showLoading({ title: '登录中', mask: true })

  // 调用 uni.login 获取登录凭证
  const { code } = await new Promise<{ code: string }>((resolve, reject) => {
    uni.login({
      success: (res) => resolve(res),
      fail: (err) => reject(err),
    })
  })

  const { data } = await wxLoginService({ code })
  userInfoStore.set(data)

  // 登录成功，返回上一页
  uni.navigateBack({ delta: 1 })
}
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background: linear-gradient(to bottom, #b3e5dc, #b3e5dc, #b3e5dc, #b3e5dc);
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50rpx;
}

.avatar {
  margin-bottom: 90rpx;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.submit {
  width: 70%;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 38rpx;
  letter-spacing: 0.54rpx;
  color: $uni-text-color-inverse;
  background-color: $uni-bg-color;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  &::after {
    border: none;
  }
}
</style>
