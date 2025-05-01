import { request } from '@/utils/request'

/**
 * 获取是否是撰稿人
 */
export const getAuthwriterService = (params: { openid: string }): Promise<any> => {
  return request({
    method: 'GET',
    url: '/get-auth-writer',
    data: params,
  })
}
