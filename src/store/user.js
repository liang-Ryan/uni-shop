import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore('userStore', ()=> {
  // =============================
  // 收货地址
  // =============================

  const address = ref(
    uni.getStorageSync('userStore')
     ? JSON.parse(uni.getStorageSync('userStore')).address
     : {}
  )

  const completeAddress = computed(() => {
    if (!address.value.provinceName) return ''
    return (
      address.value.provinceName +
      address.value.cityName +
      address.value.countyName +
      address.value.detailInfo
    )
  })

  // =============================
  // 设置收货地址
  // =============================

  const setAddress = (newAddress) => {
    address.value = newAddress
  }

  // =============================

  return {
    // 收货地址
    address,
    completeAddress,
    // 设置收货地址
    setAddress
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