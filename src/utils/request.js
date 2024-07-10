// 网络请求
import { $http } from "@escook/request-miniprogram";
uni.$http = $http
// 基地址
$http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
// 提示消息
uni.$showMsg = (title = '数据加载失败！', duration = 1500) => {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}
// 请求拦截器
$http.beforeRequest = (options) => {
  uni.showLoading({
    title: '数据加载中...'
  })
}
// 响应拦截器
$http.afterRequest = () => {
  uni.hideLoading()
}

export default uni