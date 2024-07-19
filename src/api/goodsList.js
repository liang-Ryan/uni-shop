export const goodListGetGoodslistAPI = (queryObj) => {
  return uni.$http.get('/goods/search', queryObj)
}