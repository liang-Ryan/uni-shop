import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore('userStore', ()=> {
  // =============================
  // 身份信息
  // =============================

  const userInfo = ref(
    uni.getStorageSync('userStore')
     ? JSON.parse(uni.getStorageSync('userStore')).userInfo
     : {}
  )
  const token = ref(
    uni.getStorageSync('userStore')
     ? JSON.parse(uni.getStorageSync('userStore')).token
     : ''
  )
  // const token = ref('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')

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
    // 身份信息
    userInfo,
    token,
    // 收货地址
    address,
    completeAddress,
    // 设置收货地址
    setAddress
  }
}, {
  // 持久化
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