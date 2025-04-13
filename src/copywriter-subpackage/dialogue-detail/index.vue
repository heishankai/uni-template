<template>
  <view class="container">
    <scroll-view class="scroll-view" scroll-y>
      <template>
        <info-data :info="info" />
      </template>
    </scroll-view>
    <view class="footer">
      <button @click="handleDialoguePage">发送消息</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
// components
import infoData from './components/info-data.vue'
// service
import { getUserInfoByIdServive } from './service'

const info = ref<any>({})

// 获取用户详情数据
const getInfoData = async (_id: string): Promise<void> => {
  const { data } = await getUserInfoByIdServive({ _id })
  info.value = data?.data
}

onLoad((options) => {
  const { _id, nickname } = options ?? {}
  uni.setNavigationBarTitle({ title: decodeURIComponent(nickname) })
  // 获取详情数据
  getInfoData(_id)
})

// 跳转到详情页
const handleDialoguePage = (): void => {
  uni.vibrateShort()
  const { _id, nickname } = info.value ?? {}
  uni.navigateTo({
    url: `/copywriter-subpackage/dialogue/index?_id=${_id}&nickname=${nickname}`,
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
