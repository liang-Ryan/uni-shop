<script setup>
// store
import { useCartStore } from '../store/cart'
const cartStore = useCartStore()
import { useUserStore } from '../store/user'
const userStore = useUserStore()

// =============================
// 登录请求
// =============================

const loginQuery = {
  code: '',
  encryptedData: '',
  iv: '',
  rawData: '',
  signature: ''
}

const getUserInfo = async (e) => {
  loginQuery.encryptedData = e.detail.encryptedData
  loginQuery.iv = e.detail.iv
  loginQuery.rawData = e.detail.rawData
  loginQuery.signature = e.detail.signature

  userStore.userInfo = e.detail.userInfo

  const { code, errMsg } = await uni.login().catch((err) => err)
  if (errMsg !== 'login:ok') return uni.$showMsg('获取用户信息失败')
  loginQuery.code = code

  login(loginQuery)
}

const login = async (query) => {
  const {
    data: { message, meta }
  } = await uni.$http.post('/users/wxlogin', query)
  // if (meta.status !== '200') return uni.$showMsg('登录失败')
  uni.$showMsg('登录成功')
  // userStore.token = message.token
  userStore.token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o'

  if (cartStore.returnPage === 'cart') {
    cartStore.returnPage = ''
    uni.switchTab({
      url: '/pages/cart'
    })
    uni.$showMsg('登录成功')
  }
}

// =============================
</script>

<template>
  <view class="user-login">
    <uni-icons type="contact-filled" color="#afafaf" size="100" />
    <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <view class="user-login-tips">登陆后尽享更多权益</view>
  </view>
</template>

<style lang="scss">
.user-login {
  height: 100vh;
  background-color: #f8f8f8;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  button {
    width: 90%;
    border-radius: 100px;
    background-color: #c00000;
  }

  .user-login-tips {
    font-size: 12px;
    color: gray;
  }
}
</style>
