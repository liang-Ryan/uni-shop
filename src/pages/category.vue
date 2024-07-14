<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, computed } from 'vue'

// =============================
// 获取分类数据
// =============================

const categoryList = ref([])
const categoryChildren = computed(()=>{
  return categoryList.value[active.value]?.children
})

const getCategoryList = async () => {
  const { data: { message, meta } } = await uni.$http.get('/categories')
  
  if (meta.status !== 200) return uni.$showMsg()
  
  categoryList.value = message
}

onLoad(() => {
  getCategoryList()
})

// =============================
// 激活样式 / 重置滚动条位置
// =============================

const active = ref(0)
const scrollTop = ref(0)

const setCategory = (index) => {
  active.value = index
  scrollTop.value = 0
}

// =============================
// 监听滚动条位置（修复scroll-top不同步的问题）
// =============================

const scrollHandle = (e) => {
  scrollTop.value = e.detail.scrollTop
}

// =============================
// 跳转至商品列表
// =============================

const toGoodsList = (id) => {
  uni.navigateTo({ url: `/subpackage/goods_list?cid=${id}` })
}

// =============================
</script>

<template>
  <view class="scroll-view">
    <!-- 左侧-一级分类 -->
    <scroll-view class="scroll-left" scroll-y style="height: 100vh;">
      <view :class="['scroll-left-item', index === active ? 'active': '']" v-for="(item, index) in categoryList" :key="index" @click="setCategory(index)">
        {{ item.cat_name }}
      </view>
    </scroll-view>

    <scroll-view class="scroll-right" scroll-y :scroll-top="scrollTop" @scroll="scrollHandle" style="height: 100vh;">
      <view class="scroll-right-content" v-for= "(channel, index) in categoryChildren" :key="index">
        <!-- 右侧-二级分类标题 -->
        <view class="scroll-right-title">/ {{ channel.cat_name }} /</view>
        
        <!-- 右侧-三级分类商品 -->
        <view class="scroll-right-list">
          <view class="scroll-right-item" v-for="(item, index) in channel.children" :key="index" @click="toGoodsList(item.cat_id)">
            <image
            :src="item.cat_icon"
            mode="scaleToFill"
          />
          <text>{{ item.cat_name }}</text>
          </view>
        </view>
      </view>
    </scroll-view> 
  </view>
</template>

<style lang="scss">
.scroll-view {
  display: flex;

  .scroll-left {
    width: 120px;

    .scroll-left-item {
      background-color: #F7F7F7;

      font-size: 12px;
      line-height: 60px;
      text-align: center;

      &.active {
        background-color: #ffffff;

        position: relative;

        &::before {
          content: '';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;

          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }

  .scroll-right-title{
    padding: 15px 0;

    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .scroll-right-list {
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;

    .scroll-right-item {
      width: 33.33%;
      
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
}

</style>