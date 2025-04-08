import { request } from '@/utils/request'

/**
 * 获取首页轮播数据
 */
export const wxLoginService = (params: { code: string }): Promise<any> => {
  return request({
    method: 'POST',
    url: '/wxlogin',
    data: params,
  })
}
