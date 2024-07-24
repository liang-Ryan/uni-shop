import { useCartStore } from "../store/cart"
const cartStore = useCartStore()

export const useSetBadge = () => {

  // =============================
  // 加载购物车上标
  // =============================
  const setBadge = () => {
    if (cartStore.cartCount > 0) {
      uni.setTabBarBadge({
        index: 2,
        text: cartStore.cartCount + ''
      })
    }
  }

  // =============================

  return {
    setBadge
  }
}