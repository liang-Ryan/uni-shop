<script setup>
// =============================
// props
// =============================

const props = defineProps({
  good: Object,
  radio: Boolean,
  countBox: Boolean
})

// =============================
// emit
// =============================

const emit = defineEmits(['radioChange', 'countChange'])

// =============================
// 页面跳转
// =============================

const toDetail = (id) => {
  uni.navigateTo({
    url: `/subpackage/goods_detail?goods_id=${id}`
  })
}

// =============================
// 修改商品选中状态
// =============================

const radioChange = () => {
  emit('radioChange', { id: props.good.goods_id, state: !props.good.goods_state })
}

// =============================
// 修改商品数量
// =============================

const countChange = (count) => {
  emit('countChange', { id: props.good.goods_id, count })
}

// =============================
</script>

<template>
  <view class="goods-item">
    <!-- 左侧-商品图片 -->
    <view class="goods-item-left">
      <radio v-if="radio" color="#C00000" :checked="good.goods_state" @click="radioChange" />
      <image class="goods-left-image" :src="good.goods_small_logo" />
    </view>

    <!-- 右侧-商品详情 -->
    <view class="goods-item-info">
      <view class="goods-item-name" @click="toDetail(good.goods_id)">{{ good.goods_name }}</view>

      <view class="goods-item-bottom">
        <view class="goods-item-price">￥{{ good.goods_price.toFixed(2) }}</view>
        <uni-number-box v-if="countBox" :min="1" :value="good.goods_count" @change="countChange" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.goods-item {
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  display: flex;
  gap: 5px;

  .goods-item-left {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .goods-left-image {
      display: block;
      width: 100px;
      height: 100px;
    }
  }

  .goods-item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-item-name {
      font-size: 13px;
    }

    .goods-item-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-item-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
}
</style>
