<template>
  <div
    class="position-relative inn_banner"
    style="height: 250px; background-size: cover; background-position: center center;
    background-repeat: no-repeat; background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1626702787982.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=CrNQrW8cLRifH7Tcj0el7SaRzWl2AGL0xqWxFf9LkwIt4mKUh9lxR1am9qeksJ0KhJJO%2BnLyk5cN1tDVEJb8c2bl6KFQIAJjZEEZlgubyY%2FY0BewH0FRdYnH90q%2FKkovmhb9SdHF%2B73lymDFCMsimSKW57%2BqxPOPqCha0W8CYvYEWkE17%2BNdKJlNAwnk84jyBW098QOXftCAOY3YjRF8DsvEzlOcBHPgrKsqBzEQi1M6dX0GO68oBChWl8w5%2F7A6VQVipaL3m7l9mOBjlraa%2BIArzwkv6KUDSkgdey1VChhnFxMDe%2BKllroKgpqTGL8dseTvxiHe%2B%2BVo8UQCXedUbg%3D%3D)"
  >
    <div>
      <h1 class="position-absolute start-50 top-50 translate-middle fw-bold text-white">
        {{ pathData.purpose }}
      </h1>
    </div>
  </div>
  <div class="container">
    <Path :path-data="pathData"></Path>
    <div class="process">
      <div class="process_step" data-num="01">
        確認商品
      </div>
      <div class="process_step" data-num="02">
        填寫資料
      </div>
      <div class="process_step current" data-num="03">
        訂購完成
      </div>
    </div>
    <div class="mt-4 text-center">
      <span class="material-icons shop_cart_icon">
        local_shipping
      </span>
    </div>
    <div class="text-center">
      <h2 class="my-4">感謝您的訂購！</h2>
      <p>您訂購的商品將在近期安排出貨，請留意簡訊通知或配送人員的電話。</p>
      <router-link to="/products" class="btn btn-outline-primary mt-4 mb-5">繼續購物</router-link>
    </div>
  </div>
</template>
<script>
import emitter from '@/methods/eventBus';
import Path from '@/components/Path.vue';

export default {
  data() {
    return {
      pathData: { previous: [{ title: '首頁', url: '/' }], purpose: '訂購完成' },
    };
  },
  components: {
    Path,
  },
  mounted() {
    emitter.emit('updata-cart');
  },
};
</script>
<style lang="scss" scoped>
.shop_cart_icon {
  font-size: 180px;
  color: #debc8c;
}
h2 {
  font-size: 32px;
}
</style>
