<script setup>
import { onHide, onLoad, onShow, onUnload } from '@dcloudio/uni-app'

// 组件
import myGood from '../components/my-good.vue'
import myAddress from '../components/my-address.vue'
import mySettle from '../components/my-settle.vue'

// hooks
import { useSetBadge } from '../hooks/useSetBadge'
import { useCartStore } from '../store/cart'
import { ref, watch } from 'vue'
const cartStore = useCartStore()

// =============================
// swiperAction
// =============================

const swipeAction = ref()
const options = [
  {
    text: '删除',
    style: { backgroundColor: '#C00000' }
  }
]

const swiperActionClickHandler = (good) => {
  const index = cartStore.cartList.findIndex((item) => item === good)
  cartStore.cartList.splice(index, 1)
  swipeAction.value.closeAll()
}

// =============================
// 购物车上标
// =============================

const { setBadge } = useSetBadge()
let badgeWatch = null

// 开启监听-动态渲染购物车上标数量
onShow(() => {
  badgeWatch = watch(
    () => cartStore.cartCount,
    () => {
      setBadge()
    },
    {
      immediate: true
    }
  )
})

// 关闭监听-防止在TabBar不存在的页面中报错（如：商品详情页）
onHide(() => {
  badgeWatch()
})

// =============================
// 修改商品选中状态
// =============================

const radioChangeHandler = ({ id, state }) => {
  cartStore.cartList.find((item) => item.goods_id === id).goods_state = state
}

// =============================
// 修改商品数量
// =============================

const countChangeHandler = ({ id, count }) => {
  cartStore.cartList.find((item) => item.goods_id === id).goods_count = count
}

// =============================
</script>

<template>
  <!-- 空购物车 -->
  <view class="cart-empty" v-if="cartStore.cartList.length === 0">
    <image src="../static/cart_empty@2x.png" />
    <text>空空如也</text>
  </view>

  <!-- 购物车内容 -->
  <view class="cart" v-else>
    <!-- 收货地址 -->
    <myAddress></myAddress>

    <!-- 购物车标题 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18" />
      <text>购物车</text>
    </view>

    <!-- 购物车列表 -->
    <uni-swipe-action ref="swipeAction">
      <block v-for="(good, index) in cartStore.cartList" :key="index">
        <uni-swipe-action-item :right-options="options" @click="swiperActionClickHandler(good)">
          <myGood
            :good="good"
            radio
            countBox
            @radio-change="radioChangeHandler"
            @count-change="countChangeHandler"
          ></myGood
        ></uni-swipe-action-item>
      </block>
    </uni-swipe-action>

    <mySettle></mySettle>
  </view>
</template>

<style lang="scss">
// 空购物车
.cart-empty {
  padding-top: 150px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  image {
    width: 90px;
    height: 90px;
  }

  text {
    font-size: 12px;
    color: gray;
  }
}

// 购物车
.cart {
  padding-bottom: 50px;

  // 标题
  .cart-title {
    height: 40px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    font-size: 14px;

    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
