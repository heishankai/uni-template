<template>
  <view class="container">
    <scroll-view
      class="scroll-view"
      scroll-y
      scroll-with-animation
      :scroll-into-view="scrollIntoView"
    >
      <dialogue-list :messageListData="messageListData" />
      <!-- 滚动锚点 -->
      <view id="bottom-anchor" style="height: 1px" />
    </scroll-view>

    <view class="search">
      <view class="search-input">
        <input v-model="searchValue" placeholder="发送我的消息" :cursor-spacing="100" />
        <button @click="handleSend">
          <uni-icons type="paperplane" color="#00cec9" size="24" />
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
// utils
import { getUserInfo } from './utils'
// components
import dialogueList from './components/dialogue-list.vue'
// service
import { getMessageListService } from './service'

import { getSocket } from '@/utils/socket'

const socket = getSocket()

const searchValue = ref<string>('')
const toUserid = ref<string>('')
const messageListData = ref<any[]>([])

// scroll-view 滚动锚点控制
const scrollIntoView = ref('')

const scrollToBottom = (): void => {
  scrollIntoView.value = ''
  nextTick(() => {
    scrollIntoView.value = 'bottom-anchor'
  })
}

// 发送消息
const handleSend = (): void => {
  if (!searchValue.value) {
    uni.showToast({ title: '请输入内容', icon: 'none' })
    return
  }
  uni.vibrateShort()

  const msgObj = {
    avatar: getUserInfo().avatar,
    message: searchValue.value,
    nickname: getUserInfo().nickname,
    userid: getUserInfo().id,
    toUserid: toUserid.value,
  }

  socket.emit('userMessage', msgObj)
  messageListData.value.push(msgObj)
  searchValue.value = ''

  nextTick(() => {
    scrollToBottom()
  })
}

// 获取历史消息
const getMessageList = async (toUserid): Promise<void> => {
  uni.showLoading({ title: '加载中...' })
  const { data } = await getMessageListService({ toUserid })
  messageListData.value = data
  nextTick(() => {
    scrollToBottom()
  })
  uni.hideLoading()
}

// 页面加载
onLoad((options) => {
  const { _id, nickname } = options || {}

  toUserid.value = _id
  uni.setNavigationBarTitle({ title: decodeURIComponent(nickname) })
  getMessageList(_id)
})

// 页面展示时初始化 WebSocket
onShow(() => {
  socket.on('wxchat', (data: any) => {
    messageListData.value.push(data)
    nextTick(() => {
      scrollToBottom()
    })
  })
})
</script>

<style lang="scss">
page {
  height: 100vh;
  overflow: hidden;
  background-color: $uni-bg-color-grey;
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

.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 24rpx env(safe-area-inset-bottom) 24rpx;
  background: $uni-text-color-inverse;

  .search-input {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 20rpx;
    letter-spacing: 0.54rpx;
    font-size: 28rpx;
    border-radius: 30px;
    color: $uni-text-color-placeholder;
    border: 1px solid $uni-border-color;

    input {
      margin-left: 48rpx;
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: $uni-text-color;
      font-size: 28rpx;
    }
  }

  button {
    background-color: $uni-text-color-inverse;
    margin: 0rpx;
    line-height: normal;
    padding: 0rpx 48rpx;

    &::after {
      border: none;
    }
  }
}
</style>
