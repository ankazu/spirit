<template>
  <Loading :active="isLoading"></Loading>
  <!-- banner -->
  <div
    class="position-relative inn_banner"
    style="background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1626702470408.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ZuqNZWkgZBvbuQu3515xnP5l%2Bh5x1jGih70wSKtxcdMTQgNWxM0WF5AdK11nyRG3Qe02U8a4Ijyphjm6xIKzs17C5O6pXl7zt0yGU8pPyIC%2Fouy7kCDPE9bOmNx8NnD64mY4zdcBq7g7aR54DvMcaLMdPXKdzgPiy1NPjhantn6uEVmk%2Frf%2FQTDiWwjkGK8rU19hO6qLK44Li8MD%2FaPS0dnZMOOSN9C%2BBHBzCrn6G4xlfEQnpzBGLh3%2Fcj9%2BIjwpMrPcj%2FELpzOZpGLOmvcIcFaM5yzbrFcS4zM4WHNj42BqI1n2f72s5zJ%2FfkOFSXld697HdYuhORB0eop%2F0C9npg%3D%3D)"
  >
    <div>
      <h2 class="position-absolute start-50 top-50 translate-middle fw-bold text-white">
        {{ pathData.purpose }}
      </h2>
    </div>
  </div>
  <!-- content -->
  <div class="container ">
    <Path :path-data="pathData"></Path>
    <div class="row justify-content-center mt-4">
      <div class="col-12 col-lg-10 ">
        <div class="row">
          <div class="col-12 col-lg-6">
            <img class="rounded-2 w-100" :src="productImg" :alt="tempProduct.title" />
            <div class="col-12 flex-nowrap py-1 overflow-auto">
              <div class="row flex-nowrap m-0">
                <a class="col-2 pe-1" href="javascript:void(0);">
                  <img
                    class="w-100 rounded"
                    :src="tempProduct.imageUrl"
                    :alt="tempProduct.title"
                    @click="changeImg(tempProduct.imageUrl)"
                  />
                </a>
                <a
                  href="javascript:void(0);"
                  class="col-2 pe-1"
                  v-for="(img, key) in tempProduct.imagesUrl"
                  :key="`img_${key}`"
                >
                  <img
                    class="w-100 p-0 rounded"
                    :src="img"
                    :alt="`img_${key}`"
                    @click="changeImg(img)"
                  />
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="text-start description ps-lg-5">
              <h2 class="description_title">{{ tempProduct.title }}</h2>
              <div class="description_detail">
                <div class="description_detail_origin">
                  <span>【 產地 】</span>{{ tempProduct.origin }}
                </div>
                <div class="description_detail_variety" v-if="tempProduct.variety">
                  <span>【 品種 】</span>{{ tempProduct.variety }}
                </div>
                <div class="description_baking" v-if="tempProduct.baking">
                  <span>【 烘焙度 】</span>{{ tempProduct.baking }}
                </div>
                <div class="description_detail_approach" v-if="tempProduct.approach">
                  <span>【 處理法 】</span>{{ tempProduct.approach }}
                </div>
                <div class="description_detail_acidity" v-if="tempProduct.acidity">
                  <span>【 酸度 】</span>
                  <div class="cube">
                    <div class="cube_black" v-for="item in acidity_one" :key="item"></div>
                    <div class="cube_white" v-for="item in acidity_sec" :key="item"></div>
                  </div>
                </div>
                <div class="description_detail_Bitterness" v-if="tempProduct.Bitterness">
                  <span>【 苦度 】</span>
                  <div class="cube">
                    <div class="cube_black" v-for="item in bitterness_one" :key="item"></div>
                    <div class="cube_white" v-for="item in bitterness_sec" :key="item"></div>
                  </div>
                </div>
                <div
                  class="description_detail_flavor"
                  v-if="tempProduct.flavor && tempProduct.flavor_sec"
                >
                  <span>【 風味 】</span> {{ tempProduct.flavor }}，{{ tempProduct.flavor_sec }}
                </div>
              </div>
              <div class="mt-5">
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
              <div class="d-flex align-items-center mt-2">
                <div class="d-flex me-3">
                  <button
                    type="button"
                    class="cart_remove cart_btn"
                    :class="{ 'not-allowed': qty === 1 }"
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
                  class="btn btn-secondary"
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
    <section class="section border-bottom border-primary">
      <div class="row">
        <div class="detail col-12 col-lg-10 m-auto">
          <h3 class="detail_title">風味特性</h3>
          <p class="detail_txt">{{ tempProduct.decription }}</p>
          <h3 class="detail_title">產品敘述</h3>
          <p class="detail_txt">{{ tempProduct.content }}</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="related">
        <h2 class="text-center">相關產品</h2>
        <ProductAlike @go-page="getProduct"></ProductAlike>
      </div>
    </section>
  </div>
</template>

<script>
import emitter from '@/methods/eventBus';
import ProductAlike from '@/components/ProductAlike.vue';
import Path from '@/components/Path.vue';

export default {
  inject: ['swalert'],
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
      pathData: {
        previous: [
          { title: '首頁', url: '/' },
          { title: '產品列表', url: '/products' },
        ],
        purpose: '',
      },
    };
  },
  components: {
    ProductAlike,
    Path,
  },
  created() {
    const { id } = this.$route.params;
    this.getProduct(id);
  },
  methods: {
    getProduct(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.tempProduct = res.data.product;
            this.productImg = this.tempProduct.imageUrl;
            this.pathData.purpose = this.tempProduct.title;
            this.cubeCount();
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.swalert('error', `取得產品發生錯誤。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.swalert('error', `取得產品時發生錯誤，請重新整理此頁面。 ${err.message}`);
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
      this.$http
        .post(url, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = '';
            emitter.emit('updata-cart');
            this.isLoading = false;
            this.qty = 1;
            this.swalert('success', '已加入購物車');
          } else {
            this.isLoading = false;
            this.swalert('error', `加入失敗。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.swalert('error', `加入購物車時發生錯誤，請重新整理此頁面。 ${err.message}`);
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
      const num1 = parseInt(this.tempProduct.acidity, 10);
      const num2 = parseInt(this.tempProduct.Bitterness, 10);
      this.acidity_one = num1;
      this.acidity_sec = Math.abs(num1 - 5);
      this.bitterness_one = num2;
      this.bitterness_sec = Math.abs(num2 - 5);
    },
  },
};
</script>

<style scoped lang="scss">
.inn_banner {
  height: 250px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  @media only screen and (max-width: 600px) {
    background-position: 63% center;
  }
}
.description {
  &_title {
    margin: 0 0 30px;
    font-size: 2.25rem;
    @media only screen and (max-width: 992px) {
      margin: 40px 0 20px;
    }
    @media only screen and (max-width: 600px) {
      margin: 30px 0 15px;
    }
  }
  &_detail > div {
    margin-bottom: 10px;
  }
  &_detail_title {
    font-size: 24px;
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

.detail {
  &_title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  &_txt {
    margin-bottom: 30px;
    line-height: 1.6;
    // white-space: pre;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.section {
  padding: 80px 0;
}

.related {
  & h2 {
    font-size: 2.25rem;
    font-weight: 600;
    margin-bottom: 40px;
  }
}
</style>
