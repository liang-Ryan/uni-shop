export const goodsGetGoodsListAPI = (queryObj) => {
  return uni.$http.get('/goods/search', queryObj)
}
