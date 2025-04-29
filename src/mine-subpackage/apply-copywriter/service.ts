import { request } from '@/utils/request'

/**
 * 更新用户信息
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const addAndupdateWriterInfoService = (params: any): Promise<any> => {
  return request({
    method: 'POST',
    url: '/addWriter',
    data: params,
  })
}

/**
 * 获取用户信息
 */
export const getWriterInfoService = (params: { openid: string }): Promise<any> => {
  return request({
    method: 'GET',
    url: '/getWriter',
    data: params,
  })
}

/**
 * 支付成为精选撰稿人
 */
export const becomeSelectedWriterService = (params: { orderAmount: number }): Promise<any> => {
  return request({
    method: 'POST',
    url: '/become-selected-writer',
    data: params,
  })
}

/**
 * 核实是否支付成功
 */
export const checkPaymentService = (params: { outTradeNo: string }): Promise<any> => {
  return request({
    method: 'POST',
    url: '/become-selected-writer/success',
    data: params,
  })
}
