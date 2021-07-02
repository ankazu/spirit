<template>
  <loading :active="isLoading"></loading>
  <div class="container">
    <div class="row">
      <div class="col-5">
        <!-- 圖片連結有多張 product.imagesUrl[0]會報錯-->
        <img :src="tempProduct.imageUrl" alt="" />
        <div v-for="(item, index) in tempProduct.imagesUrl" :key="'img' + index">
          <img :src="item" alt="" />
          <!-- {{ item.imagesUrl }} -->
        </div>
      </div>
      <div class="col-7">
        <div class="text-start">
          <h2>{{ tempProduct.title }}</h2>
          <div class="h4">產品描述 {{ tempProduct.decription }}</div>
          <div class="h5" v-if="!tempProduct.price">{{ tempProduct.origin_price }} 元</div>
          <del class="h6" v-if="tempProduct.price">原價 {{ tempProduct.origin_price }} 元</del>
          <div class="h5" v-if="tempProduct.price">現在只要 {{ tempProduct.price }} 元</div>
          <div class="d-flex">
            <input type="number" class="form-control mt-2 me-2" v-model.number="qty" min="1" />
            <button
              :disabled="loadingStatus.loadingItem === tempProduct.id"
              @click.prevent="addToCart(tempProduct.id, qty)"
              type="button"
              class="btn btn-primary mt-2"
            >
              <i
                class="spinner-border spinner-border-sm"
                v-if="loadingStatus.loadingItem === tempProduct.id"
              ></i>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swalert from '@/methods/swal';
import emitter from '@/methods/eventBus';

export default {
  data() {
    return {
      loadingStatus: { loadingItem: '' },
      isLoading: false,
      tempProduct: {},
      qty: 1,
    };
  },
  created() {
    const { id } = this.$route.params;
    this.getProduct(id);
  },
  methods: {
    getProduct(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.tempProduct = res.data.product;
          this.isLoading = false;
        } else {
          console.log(res.data.message);
        }
      });
    },
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.loadingStatus.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(url, { data: cart }).then((res) => {
        if (res.data.success) {
          this.loadingStatus.loadingItem = '';
          emitter.emit('updata-cart');
          swalert('success', '已加入購物車');
          this.isLoading = false;
        } else {
          console.log(res.data.message);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
img {
  max-width: 100%;
  height: auto;
}
.mt-2 {
  max-width: 150px;
}
</style>
