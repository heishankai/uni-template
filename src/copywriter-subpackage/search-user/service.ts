import { request } from '@/utils/request'

/**
 * 模糊查询撰稿人
 */
export const searchWriterService = (params: {
  page: number
  limit: number
  keyword: string
}): Promise<any> => {
  return request({
    method: 'POST',
    url: '/home/searchUserList',
    data: params,
  })
}
