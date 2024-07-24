<script setup>
import { useUserStore } from '../store/user'
const userStore = useUserStore()

// =============================
// 选择/切换 收货地址
// =============================

const switchAddress = async () => {
  const [error, success] = await uni.chooseAddress().catch((err) => err)

  if (error === null && success.errMsg === 'chooseAddress:ok') {
    userStore.setAddress(success)
  }
}

// =============================
</script>

<template>
  <view class="address-choose" v-if="JSON.stringify(userStore.address) === '{}'">
    <button type="primary" size="mini" @click="switchAddress">请选择收货地址</button>
  </view>

  <view class="address-info" @click="switchAddress" v-else>
    <view class="addressee">
      收货人：{{ userStore.address.username }}

      <view class="addressee-phone">
        电话：{{ userStore.address.telNumber }}
        <uni-icons type="arrowright" size="16" />
      </view>
    </view>

    <view class="addressee-address">
      <view class="addressee-address-label">收货地址：</view>
      {{ userStore.completeAddress }}
    </view>
  </view>

  <image src="../static/cart_border@2x.png" class="address-border" />
</template>

<style lang="scss">
.address-choose {
  height: 90px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.address-info {
  height: 90px;
  padding: 0 5px;

  font-size: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  .addressee {
    display: flex;
    justify-content: space-between;

    .addressee-phone {
      display: flex;
      justify-content: space-between;
    }
  }

  .addressee-address {
    display: flex;
    align-items: center;

    .addressee-address-label {
      white-space: nowrap;
    }
  }
}

.address-border {
  display: block;
  width: 100%;
  height: 5px;
}
</style>
