import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useUserInfoStore = defineStore(
  'userInfo',
  () => {
    const userInfo = ref<any>({})

    // 保存
    const set = (val: string): void => {
      userInfo.value = val
    }

    // 清理
    const clear = (): void => {
      userInfo.value = {}
    }

    return {
      userInfo,
      set,
      clear,
    }
  },
  // TODO: 持久化
  {
    // 只能在网页端使用
    // persist: true,
    // 多端使用
    persist: {
      storage: {
        getItem(key: string) {
          return uni.getStorageSync(key)
        },
        setItem(key: string, value: string) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
