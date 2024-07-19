export const searchGetSearchResultAPI = (value) => {
  return uni.$http.get('/goods/qsearch', { query: value })
}