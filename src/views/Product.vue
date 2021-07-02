<template>
  <loading :active="isLoading"></loading>
  <div class="container mt-5 justify-content-center">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12 col-lg-5">
            <img class="rounded-2 w-100" :src="productImg" :alt="tempProduct.title" />
            <div class="col-12 flex-nowrap py-1 overflow-auto">
              <div class="row flex-nowrap m-0">
                <div class="col-2 pe-1">
                  <img
                    class="w-100 rounded pointer"
                    :src="tempProduct.imageUrl"
                    :alt="tempProduct.title"
                    @click="changeImg(tempProduct.imageUrl)"
                  />
                </div>
                <div
                  class="col-2 pe-1"
                  v-for="(img, key) in tempProduct.imagesUrl"
                  :key="`img_${key}`"
                >
                  <img
                    class="w-100 p-0 rounded pointer"
                    :src="img"
                    :alt="`img_${key}`"
                    @click="changeImg(img)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-7">
            <div class="text-start description">
              <div class="description_baking">{{ tempProduct.baking }}</div>
              <h2 class="description_title">{{ tempProduct.title }}</h2>
              <div class="description_detail">
                <div class="description_detail_title">產品介紹</div>
                <div class="description_detail_flavor">
                  風味 {{ tempProduct.flavor }} {{ tempProduct.flavor_sec }}
                </div>

                {{ tempProduct.decription }}
              </div>
              <div>
                <div class="product_price_1" v-if="tempProduct.price === tempProduct.origin_price">
                  {{ $filters.currency(tempProduct.origin_price) }} 元 / {{ tempProduct.unit }}
                </div>
                <del class="product_price_2" v-if="tempProduct.price !== tempProduct.origin_price"
                  >原價 {{ $filters.currency(tempProduct.origin_price) }} 元</del
                >
                <div class="product_price_2" v-if="tempProduct.price !== tempProduct.origin_price">
                  特價 {{ $filters.currency(tempProduct.price) }} 元 / {{ tempProduct.unit }}
                </div>
              </div>
              <div class="d-flex align-items-center mt-5">
                <div class="d-flex me-3">
                  <button
                    type="button"
                    class="cart_remove cart_btn"
                    :disabled="qty === 1"
                    @click.prevent="changeQty('reduce')"
                  >
                    <span class="material-icons">
                      remove
                    </span>
                  </button>
                  <input class="cart_product_input" type="text" disabled="disabled" v-model="qty" />
                  <button type="button" class="cart_add cart_btn" @click.prevent="changeQty('add')">
                    <span class="material-icons">
                      add
                    </span>
                  </button>
                </div>
                <button
                  :disabled="loadingStatus.loadingItem === tempProduct.id"
                  @click.prevent="addToCart(tempProduct.id, qty)"
                  type="button"
                  class="btn btn-primary"
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
      productImg: '',
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
          this.productImg = this.tempProduct.imageUrl;
          this.isLoading = false;
          console.log(this.tempProduct);
        } else {
          console.log(res.data.message);
        }
      });
    },
    changeImg(img) {
      this.productImg = img;
    },
    addToCart(id, qty) {
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
          this.qty = 1;
        } else {
          console.log(res.data.message);
        }
      });
    },
    changeQty(txt) {
      if (txt === 'add') {
        this.qty += 1;
      }
      if (txt === 'reduce') {
        this.qty -= 1;
      }
    },
  },
};
</script>

<style scoped lang="scss">
img {
  max-width: 100%;
  height: auto;
}
</style>
