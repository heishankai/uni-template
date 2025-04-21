// utils/socket.ts
import { BASEURL } from './request'
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

// eslint-disable-next-line
const io = require('./weapp.socket.io.js')

let socket: any = null

export const initSocket = (): void => {
  if (!socket) {
    socket = io(BASEURL, {
      transports: ['websocket'],
      query: {
        authorization: getUserInfo().token,
        userid: getUserInfo().id,
      },
      reconnectionAttempts: 4,
      reconnectionDelay: 2000,
    })

    socket.on('connect', () => {
      console.log('WebSocket 已连接')
    })

    socket.on('reconnect_attempt', () => {
      console.log('正在尝试重连...')
    })

    socket.on('reconnect_failed', (err) => {
      console.log('重连失败', err)
    })

    socket.on('error', (err) => {
      console.log('WebSocket 错误', err)
      if (err === '401') {
        uni.navigateTo({ url: '/pages/login/index' })
      }
    })
  }
  return socket
}

export const getSocket = (): any => {
  return socket
}
