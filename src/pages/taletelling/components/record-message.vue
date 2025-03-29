<template>
  <!-- 录音消息 -->
  <scroll-view scroll-y class="record-message">
    <view class="title"> 快来录制我的故事吧... </view>
    <view
      @click="handlePlay(item)"
      class="message"
      v-for="(item, index) in props?.recordList"
      :key="index"
    >
      <trumpet-animation :size="24" :isPlay="item.isPlay" color="#808080" />
      <text class="time">{{ item?.time }}</text>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// components
import trumpetAnimation from '@/components/trumpet-animation.vue'
// utils
import { useMultiAudioPlayer } from '../utils'

const props = defineProps<{
  recordList: { time: string; src: string; isPlay: boolean }[]
}>()

console.log('recordList', props.recordList)

const isRecording = ref<boolean>(false)
const { play } = useMultiAudioPlayer()

// 播放录音
const handlePlay = (item): void => {
  play(item, props.recordList)
  isRecording.value = true

  // 长录音播放
  // const bgAudioManager = uni.getBackgroundAudioManager()
  // bgAudioManager.title = '致爱丽丝'
  // bgAudioManager.singer = '暂无'
  // bgAudioManager.coverImgUrl = 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png'
  // bgAudioManager.src = url
}
</script>

<style lang="scss" scoped>
.record-message {
  height: 40vh;
  padding: 24rpx;
  overflow-y: scroll;
  background-color: #f8f8f8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .title {
    font-family: Poppins;
    font-size: 30px;
    font-weight: bold;
    line-height: 42px;
    letter-spacing: -0.3px;
    color: $uni-bg-color;
  }

  .message {
    width: 200rpx;
    padding: 10rpx;
    margin: 24rpx 0rpx;
    border-radius: 10rpx;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    position: relative;

    .time {
      margin-left: 12rpx;
      color: $uni-text-color-placeholder;
    }

    &::before {
      content: '';
      position: absolute;
      left: -20rpx;
      top: 50%;
      transform: translateY(-50%);
      border-width: 10rpx;
      border-style: solid;
      border-color: transparent #ffffff transparent transparent;
    }
  }
}
</style>
