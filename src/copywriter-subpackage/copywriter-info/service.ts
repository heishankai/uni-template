import { request } from '@/utils/request'

/**
 * 查询撰稿人
 */
export const getOnewriterService = (params: { openid: string }): Promise<any> => {
  return request({
    method: 'GET',
    url: '/getOnewriter',
    data: params,
  })
}
