<template>
  <div class="container">
    <div class="mt-4">
      <img src="../../../public/images/empty_cart.jpg" alt="" />
    </div>
    <h2 class="mt-5 mb-5">感謝您的訂購！</h2>
    <!-- 記得要改 -->
    <p>您訂購的商品將在近期安排出貨，請留意簡訊通知或配送人員的電話。</p>
    <router-link to="/" class="btn btn-outline-primary mt-4">回首頁</router-link>
  </div>
</template>
<script>
import emitter from '@/methods/eventBus';

export default {
  mounted() {
    emitter.emit('updata-cart');
  },
};
</script>
<style lang="scss" scoped>
img {
  border-radius: 20px;
}
</style>
