<script setup>
import { onShow } from '@dcloudio/uni-app'

// hooks
import { useSetBadge } from '../hooks/useSetBadge'

// =============================
// 购物车上标
// =============================

const { setBadge } = useSetBadge()
onShow(() => {
  setBadge()
})

// =============================
</script>

<template>
  <view></view>
</template>

<style></style>
