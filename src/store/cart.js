import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore('cartStore', () => {
  // =============================
  // 购物车列表
  // =============================

  // 购物车列表
  const cartList = ref(
    uni.getStorageSync('cartStore')
     ? JSON.parse(uni.getStorageSync('cartStore')).cartList
     : []
  )
  // 商品总数
  const cartCount = computed(() => {
    return cartList.value.reduce((sum, item) => {
      return sum + item.goods_count
    }, 0)
  })
  
  // =============================
  // 添加到购物车
  // =============================
  
  const addToCart = (newGoods) => {
    const goods = cartList.value.find((item) => {
      return item.goods_id === newGoods.goods_id
    }) 
    goods ? goods.goods_count++ : cartList.value.push(newGoods)
  }
  
  // =============================
  // 选中商品
  // =============================

  // 选中商品列表
  const selectedList = computed(() => {
    return cartList.value.filter((item) => {
      return item.goods_state === true
    })
  })

  // 选中商品总数
  const selectedCount = computed(() => {
    return selectedList.value.reduce((sum, item) => {
      return sum + item.goods_count
    }, 0)
  })

  // 选中商品总价格
  const selectedPriceSum = computed(() => {
    return selectedList.value.reduce((sum, item) => {
      return sum + item.goods_price * item.goods_count
    }, 0)
  })

  // =============================
  // 全选判断
  // =============================

  // 全选 / 反选
  const setAllSelected = () => {
    const temp = !isAllSelected.value
    cartList.value.forEach((item)=> {
      item.goods_state = temp
    })
  }

  // 判断是否全选
  const isAllSelected = computed(()=>{
    return cartCount.value === selectedCount.value
  })

  // =============================

  return {
    // 购物车列表
    cartList,
    cartCount,
    // 添加到购物车
    addToCart,
    // 选中商品
    selectedList,
    selectedCount,
    selectedPriceSum,
    // 全选判断
    setAllSelected,
    isAllSelected
  }
}, {
  persist: {
    storage: {
      getItem(key) {
        return uni.getStorageInfoSync(key)
      },
      setItem(key, all) {
        uni.setStorageSync(key, all)
      }
    }
  }
})
