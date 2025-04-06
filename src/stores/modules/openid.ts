import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useOpenidStore = defineStore(
  'openid',
  () => {
    // 会员信息
    const openid = ref<string>('')

    // 保存会员信息，登录时使用
    const setOpenid = (val: string): void => {
      openid.value = val
    }

    // 清理会员信息，退出时使用
    const clearOpenid = (): void => {
      openid.value = ''
    }

    // 记得 return
    return {
      openid,
      setOpenid,
      clearOpenid,
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
