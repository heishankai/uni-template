<template>
  <view class="container">
    <scroll-view class="scroll-view">
      <template>
        <!-- 进度条 -->
        <rate-bar :rate="rate" />
        <!-- 表单 -->
        <form-list :rate="rate" ref="formlistRef" />
      </template>
    </scroll-view>
    <!-- 底部按钮 -->
    <view class="footer">
      <button class="last" @click="lastStep" v-show="rate > 1">
        <uni-icons type="arrow-left" size="36" color="#FFFFFF" />
      </button>
      <button class="next" @click="nextStep" v-show="rate < 3">
        <uni-icons type="arrow-right" size="36" color="#FFFFFF" />
      </button>
      <button class="submit" @click="submit" v-show="rate === 3">提交</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// components
import formList from './components/form-list.vue'
import rateBar from './components/rate-bar.vue'
// utils
import { requiredFields, isEmpty } from './utils'
// services
import { addAndupdateWriterInfoService } from './service'
// store
import { useUserInfoStore } from '@/stores'

const { userInfo } = useUserInfoStore()

const rate = ref(1)
const formlistRef = ref<any>(null)

// 上一步
const lastStep = (): void => {
  if (rate.value <= 1) {
    return
  }
  rate.value--
}

// 下一步
const nextStep = (): void => {
  if (rate.value >= 3) {
    return
  }
  rate.value++
}

// 提交
const submit = async (): Promise<void> => {
  uni.showLoading({ title: '提交中...', mask: true })

  for (const field of requiredFields) {
    const fieldValue = formlistRef.value.profile[field.key]
    if (isEmpty(fieldValue)) {
      uni.showToast({ title: field.message, icon: 'none', duration: 3000 })
      return
    }
  }

  const { data } = await addAndupdateWriterInfoService(formlistRef.value.profile)
  const { userInfoData } = data ?? {}

  userInfo.isWriter = userInfoData?.isWriter
  uni.navigateBack({ delta: 1 })
  uni.hideLoading()
}
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
}

.footer {
  margin-bottom: env(safe-area-inset-bottom);
  position: relative;
  height: 50px;

  .last {
    position: absolute;
    left: 30px;
  }

  .next,
  .submit {
    position: absolute;
    right: 30px;
  }

  .submit,
  .last,
  .next {
    width: 80px;
    height: 50px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $uni-text-color-inverse;
    background-color: $uni-bg-color;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    &::after {
      border: none;
    }
  }

  .submit {
    width: 60%;
  }
}
</style>
