<template>
  <web-view :src="webUrl"></web-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const webUrl = ref('https://example.com')

onLoad((options) => {
  const { url, name } = options || {}
  webUrl.value = url
  uni.setNavigationBarTitle({ title: decodeURIComponent(name) })
})
</script>
