<template>
  <view class="container">
    <scroll-view class="scroll-view" scroll-y> 1 </scroll-view>
  </view>
</template>

<script setup lang="ts">

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
</style>
