<template>
  <view class="title-container">
    <navigator url="/mine-subpackage/personal-data/index" hover-class="navigator-hover">
      <view> 个人资料 </view>
      <uni-icons type="right" size="18" color="#6c6c6c" />
    </navigator>
    <navigator url="/mine-subpackage/apply-copywriter/index" hover-class="navigator-hover">
      <view> 成为撰稿人 </view>
      <uni-icons type="right" size="18" color="#6c6c6c" />
    </navigator>
    <view v-show="isWriter">
      <navigator url="/mine-subpackage/auth-writer/index" hover-class="navigator-hover">
        <view> 认证撰稿人 </view>
        <uni-icons type="right" size="18" color="#6c6c6c" />
      </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
// store
import { useUserInfoStore } from '@/stores'
// service
import { getAuthwriterService } from '../service'

const isWriter = ref<any>(false)

onShow(() => {
  const { userInfo } = useUserInfoStore()
  if (userInfo?.openid) {
    getAuthwriterService({ openid: userInfo?.openid }).then((res: any) => {
      isWriter.value = res.data
    })
  }
})
</script>

<style lang="scss" scoped>
.title-container {
  margin: 0rpx 48rpx 24rpx 48rpx;

  navigator {
    padding: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 0rpx;
    font-size: 32rpx;
    font-weight: 500;
    border-bottom: 1px solid #d2d2e0;
  }

  .navigator-hover {
    background-color: #ffffff;
  }
}
</style>
