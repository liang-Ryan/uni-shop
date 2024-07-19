export const categoryGetCategoryListAPI = () => {
  return uni.$http.get('/categories')
}