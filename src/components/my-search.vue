<script setup>
// =============================
// props
// =============================

defineProps({
  bgcolor: {
    type: String,
    default: '#c00000'
  },
  radius: {
    type: Number,
    default: 15
  }
})

// =============================
// emit
// =============================

const emit = defineEmits(['toSearch'])

// =============================
// 获取分类数据
// =============================

const toSearch = () => {
  emit('toSearch')
}

// =============================
</script>

<template>
  <view :style="{ 'background-color': bgcolor }" class="search-body">
    <view :style="{ 'border-radius': radius + 'px' }" class="search-content" @click="toSearch">
      <uni-icons
        type="search"
        size="17"
      />
      <text>搜索</text>
    </view>
  </view>
</template>

<style lang="scss">
.search-body {
  height: 50px;
  padding: 0 10px;

  display: flex;
  align-items: center;

  .search-content {
    width: 100%;
    height: 36px;
    background-color: #ffffff;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    text {
      font-size: 15px;
    }
  }
}
</style>