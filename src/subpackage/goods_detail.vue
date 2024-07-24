<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// api
import { goodsGetGoodsDetailAPI } from '../api/goods'

// store
import { useCartStore } from '../store/cart'
const cartStore = useCartStore()

// =============================
// 商品详情
// =============================

const goodsDetail = ref({})
const getGoodsDetail = async (id) => {
  const {
    data: { message, meta }
  } = await goodsGetGoodsDetailAPI(id)

  if (meta.status !== 200) return uni.$showMsg()

  // 商品详情图片处理
  message.goods_introduce = message.goods_introduce.replace(
    /<img /g,
    '<img style="display: block;" '
  )

  goodsDetail.value = message
}

onLoad((options) => {
  getGoodsDetail(options)
})

// =============================
// 图片预览
// =============================

const imagePreview = (index) => {
  uni.previewImage({
    current: index,
    urls: goodsDetail.value.pics.map((item) => {
      return item.pics_big
    })
  })
}

// =============================
// 底部导航
// =============================

const navOptions = ref([
  {
    icon: 'shop',
    text: '店铺'
  },
  {
    icon: 'cart',
    text: '购物车',
    info: cartStore.cartCount
  }
])
const navButtonGroup = [
  {
    text: '加入购物车',
    backgroundColor: '#ff0000',
    color: '#fff'
  },
  {
    text: '立即购买',
    backgroundColor: '#ffa200',
    color: '#fff'
  }
]

const onClick = (e) => {
  if (e.content.text === '店铺') {
    uni.showToast({
      title: e.content.text,
      icon: 'none'
    })
  } else if (e.content.text === '购物车') {
    uni.switchTab({ url: '/pages/cart' })
  }
}

// 加入购物车 / 立即购买
const buttonClick = (e) => {
  if (e.content.text === '加入购物车') {
    const goods = {
      goods_id: goodsDetail.value.goods_id,
      goods_name: goodsDetail.value.goods_name,
      goods_price: goodsDetail.value.goods_price,
      goods_count: 1,
      goods_small_logo: goodsDetail.value.goods_small_logo,
      goods_state: true // 商品勾选状态
    }

    cartStore.addToCart(goods)
    navOptions.value[1].info = cartStore.cartCount
  }

  uni.showToast({
    title: e.content.text,
    icon: 'none'
  })
}

// =============================
</script>

<template>
  <!-- 轮播图 -->
  <swiper indicator-dots autoplay circular interval="3000" duration="500">
    <swiper-item v-for="(item, index) in goodsDetail.pics" :key="index">
      <image :src="item.pics_big" @click="imagePreview(index)" />
    </swiper-item>
  </swiper>

  <!-- 商品信息 -->
  <view class="goods-info">
    <view class="goods-info-price">￥{{ goodsDetail.goods_price }}</view>

    <view class="goods-info-box">
      <view class="info-box-name">{{ goodsDetail.goods_name }}</view>
      <view class="info-box-favorite">
        <uni-icons type="star" color="gray" size="18" />
        <text>收藏</text>
      </view>
    </view>

    <view class="goods-info-freight">快递：免运费</view>

    <!-- 商品详情 -->
    <rich-text class="goods-introduce" :nodes="goodsDetail.goods_introduce"></rich-text>
  </view>

  <view class="goods-nav">
    <uni-goods-nav
      fill
      :options="navOptions"
      :button-group="navButtonGroup"
      @click="onClick"
      @button-click="buttonClick"
    />
  </view>
</template>

<style lang="scss">
// 轮播图
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}

// 商品信息
.goods-info {
  padding: 10px;
  padding-bottom: 50px;

  .goods-info-price {
    margin: 10px 0;

    font-size: 18px;
    color: #c00000;
  }

  .goods-info-box {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    .info-box-name {
      font-size: 13px;
    }
    .info-box-favorite {
      width: 120px;
      border-left: 1px solid #efefef;

      font-size: 12px;
      color: gray;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .goods-info-freight {
    margin: 10px 0;

    font-size: 12px;
    color: gray;
  }
}

.goods-nav {
  width: 100%;

  position: fixed;
  bottom: 0;
}
</style>
