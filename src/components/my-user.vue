<script setup>
import { useUserStore } from '../store/user'
const userStore = useUserStore()

// =============================
// 退出登录
// =============================

const logout = () => {
  uni.showModal({
    title: '提示',
    content: '确认退出登录吗？',
    success: ({ confirm }) => {
      if (confirm) {
        userStore.userInfo = {}
        userStore.token = ''
        userStore.address = {}

        uni.$showMsg('退出登录成功')
      }
    }
  })
}

// =============================
</script>

<template>
  <view class="user">
    <!-- 用户信息 -->
    <view class="user-top">
      <image :src="userStore.userInfo.avatarUrl" />
      <view class="user-name">{{ userStore.userInfo.nickName }}</view>
    </view>

    <!-- mypage功能区 -->
    <view class="user-panel">
      <!-- 第一功能区 -->
      <view class="user-panel-list">
        <view class="user-panel-item">
          <text>8</text>
          <text>收藏的店铺</text>
        </view>
        <view class="user-panel-item">
          <text>14</text>
          <text>收藏的商品</text>
        </view>
        <view class="user-panel-item">
          <text>18</text>
          <text>关注的商品</text>
        </view>
        <view class="user-panel-item">
          <text>84</text>
          <text>足迹</text>
        </view>
      </view>

      <!-- 第二功能区 -->
      <view class="user-panel-list">
        <view class="user-panel-title">我的订单</view>
        <view class="user-panel-item">
          <image src="../static/my-icons/icon1.png"></image>
          <text>待付款</text>
        </view>
        <view class="user-panel-item">
          <image src="../static/my-icons/icon2.png"></image>
          <text>待收货</text>
        </view>
        <view class="user-panel-item">
          <image src="../static/my-icons/icon3.png"></image>
          <text>退款/收货</text>
        </view>
        <view class="user-panel-item">
          <image src="../static/my-icons/icon4.png"></image>
          <text>全部订单</text>
        </view>
      </view>

      <!-- 第三功能区 -->
      <view class="user-panel-list">
        <view class="user-panel-button">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15" />
        </view>
        <view class="user-panel-button">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15" />
        </view>
        <view class="user-panel-button" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15" />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
// 用户信息
.user-top {
  height: 400rpx;
  background-color: #c00000;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  image {
    width: 90px;
    height: 90px;
    border: 2px solid #fff;
    border-radius: 45px;
    box-shadow: 0 1px 5px black;
  }

  .user-name {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }
}

// mypage功能区
.user-panel {
  padding: 0 10px;

  position: relative;
  top: -10px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  .user-panel-list {
    border-radius: 3px;
    background-color: #fff;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .user-panel-title {
      flex-basis: 100%;
      padding-left: 10px;
      border: 1px solid #f4f4f4;

      font-size: 15px;
      line-height: 45px;
    }

    .user-panel-item {
      padding: 10px 0;

      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      font-size: 13px;

      image {
        width: 35px;
        height: 35px;
      }
    }

    .user-panel-button {
      flex-basis: 100%;
      padding: 0 10px;

      font-size: 15px;
      line-height: 45px;

      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
