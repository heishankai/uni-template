<template>
  <div class="classify">classify</div>
</template>

<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";

onShow(() => {
  const curPages = getCurrentPages()[0];  // 获取当前页面实例  
  // console.log(curPages.getTabBar(),'curPages.getTabBar()')
  if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
    curPages.getTabBar().setData({
      selected: 1
    });
  }
})
</script>

<style scoped></style>