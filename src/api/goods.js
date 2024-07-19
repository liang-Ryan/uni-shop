export const goodsGetGoodsListAPI = (queryObj) => {
  return uni.$http.get('/goods/search', queryObj)
}

export const goodsGetGoodsDetailAPI = (id) => {
  return uni.$http.get('/goods/detail', id)
}