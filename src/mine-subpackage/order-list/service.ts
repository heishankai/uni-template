import { request } from '@/utils/request'

/**
 * 获取我的已支付订单
 */
export const getReserveOrderService = (): Promise<any> => {
  return request({
    method: 'GET',
    url: '/reserve-order/list-paid',
  })
}
