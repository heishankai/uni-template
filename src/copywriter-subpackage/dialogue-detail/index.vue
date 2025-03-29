<template>
  <view class="container">
    <scroll-view class="scroll-view" scroll-y>
      <template>
        <info-data :info="info" />
      </template>
    </scroll-view>
    <view class="footer">
      <button @click="handleDialoguePage(info)">发送消息</button>
    </view>
  </view>
</template>

<script setup lang="ts">
// components
import infoData from './components/info-data.vue'

const info = {
  id: 1,
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
  // 年龄
  age: 24,
}

// 跳转到详情页
const handleDialoguePage = (item): void => {
  const { id, name } = item
  uni.vibrateShort()
  uni.navigateTo({
    url: `/copywriter-subpackage/dialogue/index?id=${id}&name=${name}`,
  })
}
</script>

<style lang="scss">
page {
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #00cec9, #b3e5dc, #f0faf9);
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  overflow-y: auto;
}

.footer {
  padding: 48rpx 48rpx env(safe-area-inset-bottom) 48rpx;
}

button {
  border-radius: 30rpx;
  color: $uni-text-color-inverse;
  background-color: $uni-bg-color;

  &::after {
    border: none;
  }
}
</style>
