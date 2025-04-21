import { Base64 } from 'js-base64'
// store
import { useUserInfoStore } from '@/stores'

// 获取本地缓存用户信息
export const getUserInfo = (): { token: string; id: string; avatar: string; nickname: string } => {
  const { userInfo } = useUserInfoStore()
  const base64Toekn = Base64.encode(userInfo.user_token + ':')
  return {
    token: 'Basic ' + base64Toekn,
    id: userInfo._id,
    avatar: userInfo.avatar,
    nickname: userInfo.nickname,
  }
}


