<template>
  <view class="container">
    <notice />
    <scroll-view class="scroll-view" scroll-y>
      <template>
        <message-list :messageListData="messageListData" />
      </template>
    </scroll-view>
    <tabbar selected="3"></tabbar>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// components
import tabbar from '@/components/custom-tab-bar.vue'
import messageList from './components/message-list.vue'
import notice from './components/notice.vue'

const messageListData = ref<any>([
  {
    name: '陈淑雅', // 聊天的人
    time: '2021-09-02', // 聊天的时间
    message: '你好啊1212121212', // 聊天的内容
    id: 1, // 聊天的id
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg', // 聊天的人的头像
  },
  {
    name: '张三', // 聊天的人
    time: '2021-09-01', // 聊天的时间
    id: 2, // 聊天的id
    message: '你好啊12121212121212', // 聊天的内容
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg', // 聊天的人的头像
  },
])
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7fa;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
}
</style>
