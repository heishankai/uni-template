<template>
    <view class="container">
      <!-- 滚动容器 -->
      <scroll-view class="scroll-view" scroll-y>
        <template>
          <message-list />
          <input type="text" v-model="memberStore.profile" />
          <button @click="onSave">保存信息</button>
          <button @click="onClear">清除信息</button>
          <button @click="onGetdata">测试请求</button>
        </template>
      </scroll-view>
      <tabbar selected="3"></tabbar>
    </view>
  </template>
  
  <script setup lang="ts">
  // components
  import tabbar from '@/components/custom-tab-bar.vue'
  import messageList from './components/message-list.vue'
  
  // store
  import { http } from '@/utils/http'
  import { useMemberStore } from '@/stores'
  const memberStore = useMemberStore()
  
  const onSave = (): void => {
    memberStore.setProfile(memberStore.profile)
  }
  
  const onClear = (): void => {
    memberStore.clearProfile()
  }
  
  const onGetdata = async (): Promise<void> => {
    const res = await http({
      method: 'GET',
      url: '/home/banner',
      header: {},
      success(res) {
        console.log(res) // 处理成功响应
      },
      fail(err) {
        console.error(err) // 处理失败情况
      },
    })
    console.log(res, 'res')
  }
  </script>
  
  <style lang="scss">
  page {
    height: 100%;
    overflow: hidden;
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
  