<script setup>
// =============================
// props
// =============================

defineProps({
  good: Object
})

// =============================
// 页面跳转
// =============================

const toDetail = (id) => {
  uni.navigateTo({
    url: `/subpackage/goods_detail?goods_id=${id}`
  })
}

// =============================
</script>

<template>
  <view class="goods-item" @click="toDetail(good.goods_id)">
    <!-- 左侧-商品图片 -->
    <view>
      <image class="goods-item-image" :src="good.goods_small_logo" />
    </view>

    <!-- 右侧-商品详情 -->
    <view class="goods-item-info">
      <view class="goods-item-name">{{ good.goods_name }}</view>
      <view class="goods-item-price">￥{{ good.goods_price.toFixed(2) }}</view>
    </view>
  </view>
</template>

<style lang="scss">
.goods-item {
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  display: flex;
  gap: 5px;

  .goods-item-image {
    display: block;
    width: 100px;
    height: 100px;
  }

  .goods-item-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-item-name {
      font-size: 13px;
    }

    .goods-item-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>
