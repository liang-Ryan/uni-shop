<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// =============================
// 搜索建议
// =============================

// 搜索结果
const searchInput = ref('')
const searchResult = ref([])

let timer = '' // 防抖计时器

const getSearchResult = () => {
  clearTimeout(timer)

  // 防抖
  timer = setTimeout(async () => {
    if (searchInput.value.trim() === '') {
      searchResult.value = []
    } else {
      const {
        data: { message, meta }
      } = await uni.$http.get('/goods/qsearch', { query: searchInput.value.trim() })

      if (meta.status !== 200) return uni.$showMsg()

      searchResult.value = message

      // 存储搜索历史
      setSearchHistory()
    }
  }, 500)
}

// =============================
// 搜索历史
// =============================

const searchHistory = ref([])
const setSearchHistory = () => {
  const index = searchHistory.value.findIndex((item) => {
    return item === searchInput.value.trim()
  })

  if (index !== -1) searchHistory.value.splice(index, 1)

  searchHistory.value.unshift(searchInput.value.trim())

  // 持久化
  uni.setStorageSync('search_history', JSON.stringify(searchHistory.value))
}

// 读取本地记录
onLoad(() => {
  searchHistory.value = JSON.parse(uni.getStorageSync('search_history') || '[]')
})

// 点击搜索历史
const clickHistoryHandle = (text) => {
  searchInput.value = text
}

// 删除历史记录
const clearHistory = () => {
  searchHistory.value = []
  uni.removeStorageSync('search_history')
}

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
  <!-- 搜索栏 -->
  <uni-search-bar
    v-model="searchInput"
    @input="getSearchResult"
    :radius="100"
    :focus="true"
    cancelButton="none"
  />

  <!-- 搜索历史 -->
  <view class="history-body" v-show="searchResult.length === 0 && searchHistory.length > 0">
    <!-- 标题 -->
    <view class="history-title">
      <text>搜索历史</text>
      <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
    </view>

    <!-- 历史列表 -->
    <view class="history-list">
      <uni-tag
        v-for="(item, index) in searchHistory"
        :key="index"
        :text="item"
        @click="clickHistoryHandle(item)"
      />
    </view>
  </view>

  <!-- 搜索建议 -->
  <view class="suggest-list" v-show="searchResult.length > 0">
    <view
      class="suggest-item"
      v-for="item in searchResult"
      :key="item.goods_id"
      @click="toDetail(item.goods_id)"
    >
      <view class="suggest-item-name">{{ item.goods_name }}</view>
      <uni-icons type="arrowright" size="16" />
    </view>
  </view>
</template>

<style lang="scss">
// 搜索栏
uni-search-bar {
  padding: 16rpx;
  background-color: #c00000;

  // position: relative;
  position: sticky;
  top: 0;
  z-index: 999;

  display: flex;

  .uni-searchbar {
    width: 100%;
  }
}

// 搜索历史
.history-body {
  padding: 0 5px;

  .history-title {
    height: 40px;
    border-bottom: 1px solid #efefef;

    font-size: 13px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .history-list {
    padding-top: 5px;

    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
}

// 搜索建议
.suggest-list {
  padding: 0 5px;

  .suggest-item {
    padding: 13px 0;
    border-bottom: 1px solid #efefef;

    font-size: 12px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .suggest-item-name {
      margin-right: 3px;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
