<script setup>
// store
import { useCartStore } from '../store/cart'
const cartStore = useCartStore()
import { useUserStore } from '../store/user'
const userStore = useUserStore()

// api
import { orderCreateOrder, orderUnifiedorder } from '../api/order'

// =============================
// 结算
// =============================

const toPay = () => {
  if (!cartStore.selectedCount) return uni.$showMsg('请选择购买的商品')

  if (!userStore.address) return uni.$showMsg('请选择收货地址')

  if (!userStore.token) {
    return uni.showModal({
      title: '请先登录',
      content: '是否跳转到登录页面？',
      success: ({ confirm }) => {
        if (confirm) {
          cartStore.returnPage = 'cart'

          uni.switchTab({
            url: '/pages/my'
          })
        }
      }
    })
  }

  // 创建订单
  createOrder()
}

// =============================
// 订单支付
// =============================

// 创建订单
const createOrder = async () => {
  const orderInfo = {
    order_price: cartStore.selectedPriceSum, // 商品价格
    consignee_addr: userStore.completeAddress, // 收货地址
    goods: cartStore.selectedList.map((item) => {
      // 商品信息
      return {
        goods_id: item.goods_id,
        goods_number: item.goods_count,
        goods_price: item.goods_price
      }
    })
  }

  // 发起请求
  const {
    data: { message, meta }
  } = await orderCreateOrder(orderInfo)
  if (meta.status !== 200) return uni.$showMsg('订单创建失败')

  // 支付订单
  payOrder(message.order_number)
}

// 支付订单
const payOrder = async (order_number) => {
  const {
    data: { message, meta }
  } = await orderUnifiedorder(order_number)
  if (meta.status !== 200) return uni.$showMsg('订单支付失败')

  const [error, success] = await uni.requestPayment(message.pay)
  if (error) return uni.$showMsg('订单尚未支付')

  // 查询订单
  checkOrder(order_number)
}

// 查询订单
const checkOrder = async (order_number) => {
  const {
    data: { message, meta }
  } = await orderUnifiedorder(order_number)
  if (meta.status !== 200) return uni.$showMsg('订单尚未支付')

  uni.$showToast({
    title: '支付成功',
    icon: 'success'
  })
}

// =============================
</script>

<template>
  <view class="cart-settle">
    <label class="cart-settle-radio" @click="cartStore.setAllSelected">
      <radio color="#C00000" :checked="cartStore.isAllSelected" />全选</label
    >

    <view
      >合计:<text class="cart-settle-price"
        >￥{{ cartStore.selectedPriceSum.toFixed(2) }}</text
      ></view
    >

    <view class="cart-settle-button" @click="toPay">结算({{ cartStore.selectedCount }})</view>
  </view>
</template>

<style lang="scss">
.cart-settle {
  width: 100%;
  height: 50px;
  padding-left: 5px;
  background-color: white;

  position: fixed;
  left: 0;
  bottom: 0;

  font-size: 14px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .cart-settle-radio {
    display: flex;
    align-items: center;
  }

  .cart-settle-price {
    color: #c00000;
  }

  .cart-settle-button {
    min-width: 100px;
    height: 50px;
    padding: 0 10px;
    background-color: #c00000;

    color: white;
    line-height: 50px;
    text-align: center;
  }
}
</style>
