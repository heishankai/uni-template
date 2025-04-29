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

/**
 * 查询订单是否支付成功
 */
export const topUpRecordLengthSeccessService = (params: {
  outTradeNo: string
  count: number
}): Promise<any> => {
  return request({
    method: 'POST',
    url: '/top-up-record-length/seccess',
    data: params,
  })
}
