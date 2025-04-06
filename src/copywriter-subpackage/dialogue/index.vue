<template>
  <view class="container">
    <scroll-view class="scroll-view" scroll-y>
      <template>
        <dialogue-list
          :oppositeDialogueList="oppositeDialogueList"
          :myDialogueList="myDialogueList"
        />
      </template>
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
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// componets
import dialogueList from './components/dialogue-list.vue'

const searchValue = ref<string>('')
const oppositeDialogueList = ref<any>([
  {
    time: '2021-09-02', // 聊天的时间
    message: 'Right away! Are you free today for a quich catch up with my team?', // 聊天的内容
    id: 1, // 聊天的id
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg', // 聊天的人的头像
  },
])

const myDialogueList = ref<any>([
  {
    time: '2021-09-02', // 聊天的时间
    message: 'Right away! Are you free today for a quich catch up with my team?', // 聊天的内容
    id: 1, // 聊天的id
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg', // 聊天的人的头像
  },
])

// 发送
const handleSend = (): void => {
  if (!searchValue.value) {
    uni.showToast({ title: '请输入内容', icon: 'none' })
    return
  }
  console.log(searchValue.value, 'searchValue')
  uni.vibrateShort()
  myDialogueList.value?.push({
    time: '2021-09-02', // 聊天的时间
    message: searchValue.value,
    id: Date.now(), // 聊天的id
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg', // 聊天的人的头像
  })
  searchValue.value = ''
}

// 页面加载
onLoad((options) => {
  console.log(options, 'options')
  const { name } = options || {}

  uni.setNavigationBarTitle({ title: decodeURIComponent(name) })
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
