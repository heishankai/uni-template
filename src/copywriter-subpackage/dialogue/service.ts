import { request } from '@/utils/request'

/**
 * 获取用户连天记录
 */
export const getMessageListService = (params: { toUserid: string }): Promise<any> => {
  return request({
    method: 'POST',
    url: '/getMessageList',
    data: params,
  })
}
