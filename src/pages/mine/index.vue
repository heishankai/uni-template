<template>
  <input type="text" v-model="memberStore.profile" />
  <button @click="onSave">
    保存信息
  </button>
  <button @click="onClear">
    清除信息
  </button>
  <button @click="onGetdata">
    测试请求
  </button>
  <view class="my" v-for="n in 50" :key="n"> my </view>
</template>

<script lang="ts" setup>
import { http } from '@/utils/http'
import { useMemberStore } from '@/stores'
const memberStore = useMemberStore()

const onSave = () => {
  memberStore.setProfile(memberStore.profile)
}

const onClear = () => {
  memberStore.clearProfile()
}

const onGetdata = async () => {
  const res = await http({
    method: 'GET',
    url: '/home/banner',
    header: {},
    success(res) {
      console.log(res); // 处理成功响应
    },
    fail(err) {
      console.error(err); // 处理失败情况
    }
  })
  console.log(res, 'res');

}
</script>

<style scoped>
.my {
  background-color: #ededed;
}
</style>
