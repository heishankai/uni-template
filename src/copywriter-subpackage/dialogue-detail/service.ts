import { request } from '@/utils/request'

/**
 * 获取首页人员数据
 */
export const getUserInfoByIdServive = (params: { _id: string }): Promise<any> => {
  return request({
    method: 'GET',
    url: '/home/getUserInfoById',
    data: params,
  })
}
