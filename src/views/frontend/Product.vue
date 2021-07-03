<template>
  <loading :active="isLoading"></loading>
  <div class="container mt-5 ">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10 ">
        <div class="row">
          <div class="col-12 col-lg-6">
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
          <div class="col-12 col-lg-6">
            <div class="text-start description">
              <h2 class="description_title">{{ tempProduct.title }}</h2>
              <div class="description_detail">
                <div class="description_detail_origin">
                  <span>【 產地 】</span>{{ tempProduct.origin }}
                </div>
                <div class="description_detail_variety">
                  <span>【 品種 】</span>{{ tempProduct.variety }}
                </div>
                <div class="description_baking">
                  <span>【 烘焙度 】</span>{{ tempProduct.baking }}
                </div>
                <div class="description_detail_approach">
                  <span>【 處理法 】</span>{{ tempProduct.approach }}
                </div>
                <div class="description_detail_acidity">
                  <span>【 酸度 】</span>
                  <div class="cube">
                    <div class="cube_black" v-for="item in acidity_one" :key="item"></div>
                    <div class="cube_white" v-for="item in acidity_sec" :key="item"></div>
                  </div>
                </div>
                <div class="description_detail_Bitterness">
                  <span>【 苦度 】</span>
                  <div class="cube">
                    <div class="cube_black" v-for="item in bitterness_one" :key="item"></div>
                    <div class="cube_white" v-for="item in bitterness_sec" :key="item"></div>
                  </div>
                </div>
                <div class="description_detail_flavor">
                  <span>【 風味 】</span> {{ tempProduct.flavor }}，{{ tempProduct.flavor_sec }}
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
      acidity_one: 0,
      acidity_sec: 0,
      bitterness_one: 0,
      bitterness_sec: 0,
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
          this.cubeCount();
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
    cubeCount() {
      const num1 = JSON.parse(this.tempProduct.acidity);
      const num2 = JSON.parse(this.tempProduct.Bitterness);
      this.acidity_one = num1;
      this.acidity_sec = Math.abs(num1 - 5);
      this.bitterness_one = num2;
      this.bitterness_sec = Math.abs(num2 - 5);
      console.log(this.acidity_sec);
    },
  },
};
</script>

<style scoped lang="scss">
img {
  max-width: 100%;
  height: auto;
}
.description {
  &_title {
    margin: 0 0 30px;
  }
  &_detail {
  }
  &_detail > div:not(:first-child) {
    margin-bottom: 10px;
  }
  &_detail_title {
    font-size: 22px;
    margin-bottom: 5px;
  }
  &_detail > div span {
    font-weight: 600;
  }
}
.cube {
  display: inline-block;
  &_black {
    width: 10px;
    height: 10px;
    display: inline-block;
    background: #000;
    margin-left: 5px;
  }
  &_white {
    width: 10px;
    height: 10px;
    border: 1px solid #000;
    display: inline-block;
    background: #fff;
    margin-left: 5px;
  }
}
</style>
