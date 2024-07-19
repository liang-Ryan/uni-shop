<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 组件
import mySearch from '../components/my-search.vue'

// api
import { homeGetFloorListAPI, homeGetNavListAPI, homeGetSwiperListAPI } from '../api/home'

// =============================
// 跳转至商品搜索页
// =============================

const toSearch = () => {
  uni.navigateTo({ url: '/subpackage/search' })
}

// =============================
// 轮播图
// =============================

const swiperList = ref([])
const getSwiperList = async () => {
  const {
    data: { message, meta }
  } = await homeGetSwiperListAPI()

  if (meta.status !== 200) return uni.$showMsg()

  swiperList.value = message
}

onLoad(() => {
  getSwiperList()
})

// =============================
// nav导航
// =============================

// 数据渲染
const navList = ref([])
const getNavList = async () => {
  const {
    data: { message, meta }
  } = await homeGetNavListAPI()

  if (meta.status !== 200) return uni.$showMsg()

  navList.value = message
}
onLoad(() => {
  getNavList()
})

// 点击跳转
const navClickHandle = (item) => {
  switch (item.name) {
    case '分类':
      uni.switchTab({ url: '/pages/category' })
      console.log(item.name)
      break
    default:
      break
  }
}

// =============================
// 楼层区
// =============================

const floorList = ref([])
const getFloorList = async () => {
  const {
    data: { message, meta }
  } = await homeGetFloorListAPI()

  if (meta.status !== 200) return uni.$showMsg()

  floorList.value = message

  message.forEach((floor) => {
    floor.product_list.forEach((item) => {
      item.url = '/subpackage/goods_list?' + item.navigator_url.split('?')[1]
    })
  })
}
onLoad(() => {
  getFloorList()
})

// =============================
</script>

<template>
  <!-- 搜索栏 -->
  <view class="search-body"></view>
  <my-search @toSearch="toSearch"></my-search>

  <!-- 轮播图 -->
  <view>
    <swiper indicator-dots autoplay circular interval="3000" duration="1000">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator :url="`/subpackage/goods_detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src" mode="scaleToFill" />
        </navigator>
      </swiper-item>
    </swiper>
  </view>

  <!-- 导航栏 -->
  <view class="nav-list">
    <dviewiv
      class="nav-list-item"
      v-for="(item, index) in navList"
      :key="index"
      @click="navClickHandle(item)"
    >
      <image :src="item.image_src" />
    </dviewiv>
  </view>

  <!-- 楼层区 -->
  <view class="floor-list">
    <view class="floor-list-item" v-for="(item, index) in floorList" :key="index">
      <!-- 标题 -->
      <image class="floor-title" :src="item.floor_title.image_src" />

      <!-- 图片 -->
      <view class="floor-image-list">
        <!-- 大图 -->
        <navigator :url="item.product_list[0].url">
          <image
            :style="{ width: item.product_list[0].image_width + 'rpx' }"
            class="floor-image-large"
            :src="item.product_list[0].image_src"
            mode="widthFix"
          />
        </navigator>

        <!-- 小图 -->
        <view class="floor-image-small-list">
          <navigator
            v-for="(image, img_index) in item.product_list.slice(1)"
            :key="img_index"
            :url="image.url"
          >
            <image
              :style="{ width: image.image_width + 'rpx' }"
              class="floor-image-small"
              :src="image.image_src"
              mode="widthFix"
            />
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
// 搜索栏
.search-body {
  position: sticky;
  top: 0;
  z-index: 999;
}

// 轮播图
swiper {
  height: 330rpx;

  navigator,
  image {
    width: 100%;
    height: 100%;
  }
}

// 导航栏
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  image {
    width: 128rpx;
    height: 140rpx;
  }
}

// 楼层区
.floor-title {
  width: 100%;
  height: 60rpx;
  display: flex;
}

.floor-image-list {
  display: flex;
  padding: 0 10px;
  // flex-wrap: wrap;

  .floor-image-small-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
