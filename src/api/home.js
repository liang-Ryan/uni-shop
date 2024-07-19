// 轮播图
export const homeGetSwiperListAPI = () => {
  return uni.$http.get('/home/swiperdata')
}

// nav导航
export const homeGetNavListAPI = () => {
  return uni.$http.get('/home/catitems')
}

// 楼层区
export const homeGetFloorListAPI = () => {
  return uni.$http.get('/home/floordata')
}