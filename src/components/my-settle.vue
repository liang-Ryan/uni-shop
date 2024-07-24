<script setup>
import { useCartStore } from '../store/cart'
const cartStore = useCartStore()
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

    <view class="cart-settle-button">结算({{ cartStore.selectedCount }})</view>
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
