import { request } from '@/utils/request'

/**
 * 创建订单
 */
export const topUpRecordLengthService = (params: {
  orderAmount: number
  count: number
}): Promise<any> => {
  return request({
    method: 'POST',
    url: '/top-up-record-length',
    data: params,
  })
}
