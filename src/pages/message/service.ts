import { request } from '@/utils/request'

/**
 * 获取用户聊天房间
 */
export const getChatRoomListService = (): Promise<any> => {
  return request({
    method: 'POST',
    url: '/getChatRoomList',
  })
}
