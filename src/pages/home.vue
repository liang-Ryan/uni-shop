<script setup>
import { onLoad } from "@dcloudio/uni-app"
import { ref } from "vue"

// =============================
// 轮播图
// =============================

const swiperList = ref([])
const getSwiperList = async () => {
  const { data: { message, meta } } = await uni.$http.get('/home/swiperdata')

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
  const {data: { message, meta }} = await uni.$http.get('/home/catitems')

  if (meta.status !== 200) return uni.$showMsg()
  
  navList.value = message
}
onLoad(()=> {
  getNavList()
})

// 点击跳转
const navClickHandle = (item) => {
  switch(item.name) {
    case '分类':
      uni.switchTab({ url: '/pages/category'})
      console.log(item.name);
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
  const { data: { message, meta }} = await uni.$http.get('/home/floordata')

  if (meta.status !== 200) return uni.$showMsg()

  floorList.value = message

  message.forEach(floor => {
    floor.product_list.forEach(item => {
      item.url = '/subpackage/goods_list?' + item.navigator_url.split('?')[1]
    })
  })
  console.log(message);
}
onLoad(()=> {
  getFloorList()
})

// export default {
//   components: {},
//   data() {
//     return {}
//   },
//   computed: {},
//   methods: {},
//   watch: {},

//   // 页面周期函数--监听页面加载
//   onLoad() { },
//   // 页面周期函数--监听页面初次渲染完成
//   onReady() { },
//   // 页面周期函数--监听页面显示(not-nvue)
//   onShow() { },
//   // 页面周期函数--监听页面隐藏
//   onHide() { },
//   // 页面周期函数--监听页面卸载
//   onUnload() { },
//   // 页面处理函数--监听用户下拉动作
//   // onPullDownRefresh() { uni.stopPullDownRefresh(); },
//   // 页面处理函数--监听用户上拉触底
//   // onReachBottom() {},
//   // 页面处理函数--监听页面滚动(not-nvue)
//   // onPageScroll(event) {},
//   // 页面处理函数--用户点击右上角分享
//   // onShareAppMessage(options) {},
// }
</script>

<template>
  <!-- 轮播图 -->
  <div>
    <swiper indicator-dots autoplay circular interval="3000" duration="1000">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator :url="`/subpackage/goods_detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src" mode="scaleToFill" />
        </navigator>
      </swiper-item>
    </swiper>
  </div>

  <!-- 导航栏 -->
  <div class="nav-list">
    <div class="nav-list-item" v-for="(item, index) in navList" :key="index" @click="navClickHandle(item)">
      <image :src="item.image_src" />
    </div>
  </div>

  <!-- 楼层区 -->
  <div class="floor-list">
    <div class="floor-list-item" v-for="(item, index) in floorList" :key="index">
      <!-- 标题 -->
      <image
        class="floor-title"
        :src="item.floor_title.image_src"
      />

      <!-- 图片 -->
      <div class="floor-image-list">
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
        <div class="floor-image-small-list">
          <navigator v-for="(image, img_index) in item.product_list.slice(1)" :key="img_index" :url="image.url">
            <image
              :style="{ width: image.image_width + 'rpx' }"
              class="floor-image-small"
              :src="image.image_src"
              mode="widthFix"
            />
          </navigator>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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