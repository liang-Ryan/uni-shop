<script setup>
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 组件
import myGood from '../components/my-good.vue'

// api
import { goodsGetGoodsListAPI } from '../api/goods'

// =============================
// 商品列表
// =============================

// 请求参数
const queryObj = {
  query: '',
  cid: 5,
  pagenum: 1,
  pagesize: 10
}

const goods = ref({
  goodsList: [],
  total: 0
})
const getGoods = async (fn) => {
  // 节流
  isLoading = true

  const {
    data: { message, meta }
  } = await goodsGetGoodsListAPI(queryObj)

  if (meta.status !== 200) return uni.$showMsg()

  goods.value.goodsList = [...goods.value.goodsList, ...message.goods]
  goods.value.total = message.total

  isLoading = false

  // 取消下拉动画
  fn && fn()
}

onLoad((options) => {
  queryObj.query = options.query || ''
  queryObj.cid = options.cid || ''
  getGoods()
})

// =============================
// 下拉刷新
// =============================

onPullDownRefresh(() => {
  queryObj.pagenum = 1
  goods.value.goodsList = []
  goods.value.total = 0
  isLoading = false

  getGoods(() => uni.stopPullDownRefresh)
})

// =============================
// 加载更多
// =============================

let isLoading = false

onReachBottom(() => {
  // 节流
  if (isLoading) return

  if (goods.value.goodsList.length < goods.value.total) {
    queryObj.pagenum++
    getGoods()
  }
})

// =============================
</script>

<template>
  <view>
    <my-good v-for="(good, index) in goods.goodsList" :key="index" :good="good"></my-good>
  </view>
</template>

<style></style>
