// 创建订单
export const orderCreateOrder = (orderInfo) => {
  return uni.$http.post('/orders/create', orderInfo)
}

// 支付订单
export const orderUnifiedorder = (orderNumber) => {
  return uni.$http.post('/orders/req_unifiedorder', orderNumber)
}

// 查询订单
export const orderCheckOrder = (orderNumber) => {
  return uni.$http.post('/orders/chkOrder', orderNumber)
}