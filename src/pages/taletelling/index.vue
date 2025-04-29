<template>
  <view class="container">
    <scroll-view class="scroll-view" scroll-y>
      <!-- 录音信息 -->
      <record-message :recordList="recordList" />
      <!-- 录音动画 -->
      <voice-animation :isRecording="isRecording" :count="40" :style="{ marginTop: 40 }" />
      <!-- 录音时间 -->
      <view class="recording-time">{{ recordingTime }}</view>
      <!-- 录音操作 -->
      <view class="record">
        <view class="footer">
          <view class="circle-box" @click="startRecording">
            <view :class="{ 'recording-border': isRecording }">
              <uni-icons type="icon-kaiqi" custom-prefix="iconfont" color="#00cec9" size="50" />
            </view>
            <text>开始录音</text>
          </view>
          <view class="circle-box" @click="stopRecording">
            <view>
              <uni-icons
                type="icon-tingzhi"
                custom-prefix="iconfont"
                :color="!isRecording ? '#00cec9' : '#c8bfbf'"
                size="50"
              />
            </view>
            <text>停止录音</text>
          </view>
        </view>
      </view>
    </scroll-view>
    <record-confirm ref="subscribeModalOpen" />
    <tabbar selected="2" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onHide, onShow } from '@dcloudio/uni-app'
// components
import tabbar from '@/components/custom-tab-bar.vue'
import voiceAnimation from '@/components/voice-animation.vue'
import recordMessage from './components/record-message.vue'
import recordConfirm from './components/record-confirm.vue'
// utils
import { useTimeout, useRecorder } from './utils'
// service
import { getRecordListService, getUserCountService } from './service'

const isRecording = ref<boolean>(false)
const recordList = ref<{ src: string; time: string }[]>([])
const recordingTime = ref('00:00')
const subscribeModalOpen = ref<any>(false)
const record_length = ref<number>(0)

const { startRecord, stopRecord }: any = useRecorder(recordList, recordingTime) || {}

// 超时自动停止（5秒后自动停止）
const { start: startTimeout, stop: stopTimeout } = useTimeout(() => {
  if (isRecording.value) {
    stopRecording()
    uni.showToast({ title: '录音已停止', icon: 'none' })
  }
}, 5000)

// 开始录音
const startRecording = (): void => {
  if (isRecording.value) {
    uni.showToast({ title: '正在录音中...', icon: 'none' })
    return
  }

  if (recordList?.value?.length >= record_length.value) {
    // 条数上限
    subscribeModalOpen.value.subscribeModalOpen.open()
    return
  }

  uni.vibrateShort()
  startRecord()
  isRecording.value = true
  startTimeout()
}

// 获取录音列表
const getRecordListData = async (): Promise<void> => {
  const { data } = await getRecordListService()
  recordList.value = data || []
}

// 停止录音
const stopRecording = (): void => {
  if (!isRecording.value) {
    return
  }

  isRecording.value = false
  uni.vibrateShort()
  stopRecord()
  stopTimeout()
}

// 页面隐藏时清理计时器
onHide(() => {
  isRecording.value = false
  recordList.value = []
  stopTimeout()
})

// 获取用户发语音的条数
const getUserCount = async (): Promise<void> => {
  const res = await getUserCountService()
  record_length.value = res.data.record_length
}

onShow(() => {
  getRecordListData()
  getUserCount()
})
</script>

<style lang="scss">
page {
  height: 100vh;
  overflow: hidden;
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
}

.recording-time {
  color: #c8bfbf;
  display: flex;
  align-items: center;
  justify-content: center;
}

.record {
  margin: 40rpx 0rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.circle-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  view {
    width: 70px;
    height: 70px;
    background-color: #ffffff;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: border 0.5s ease-in-out;
    box-sizing: border-box;
    border: 2px solid transparent;
  }

  .recording-border {
    border: 2px solid #c8bfbf;
    border-top-color: transparent;
    border-radius: 50%;
  }

  text {
    margin-top: 18rpx;
    font-size: 24rpx;
    color: #666666;
  }
}
</style>
