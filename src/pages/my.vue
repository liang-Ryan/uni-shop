<script setup>
import { onShow } from '@dcloudio/uni-app'

// hooks
import { useSetBadge } from '../hooks/useSetBadge'

// 组件
import myLogin from '../components/my-login.vue'
import myUser from '../components/my-user.vue'
import { useUserStore } from '../store/user'

// =============================
// 购物车上标
// =============================

const { setBadge } = useSetBadge()
onShow(() => {
  setBadge()
})

// =============================
// 用户信息
// =============================

const userStore = useUserStore()

// =============================
</script>

<template>
  <view class="my-page">
    <my-login v-if="!userStore.token"></my-login>
    <my-user v-else></my-user>
  </view>
</template>

<style>
.my-page {
  height: 100vh;
  background-color: #f4f4f4;
}
</style>
