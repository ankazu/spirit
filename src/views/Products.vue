<template>
  <loading :active="isLoading"></loading>
  <div class="container">
    <div class="row mt-4">
      <div class="col-2 nav_left">
        <ul>
          <li class="bg-secondary">產品種類</li>
          <li @click="getProducts()">全部產品</li>
          <li
            v-for="item in product_category"
            :key="item.id"
            @click="filterCategory(item)"
            :class="{ active: item === productValue }"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="col-12 col-md-10 row ms-auto">
        <div
          class="col-6 col-sm-4 col-xl-3 mb-5 text-start"
          v-for="item in products"
          :key="item.id"
        >
          <div class="product">
            <div class="product_img">
              <div @click.prevent="getProduct(item.id)">
                <img :src="item.imageUrl" alt="" />
              </div>
            </div>
            <div class="product_baking">{{ item.baking }}</div>
            <div class="product_title">{{ item.title }}</div>
            <div class="product_dec">
              {{ item.decription }}
            </div>
            <div class="product_price">
              <div class="product_price_1" v-if="item.price === item.origin_price">
                {{ $filters.currency(item.origin_price) }} 元 / {{ item.unit }}
              </div>
              <del class="product_price_2" v-if="item.price !== item.origin_price"
                >原價 {{ $filters.currency(item.origin_price) }} 元</del
              >
              <div class="product_price_2" v-if="item.price !== item.origin_price">
                特價 {{ $filters.currency(item.price) }} 元 / {{ item.unit }}
              </div>
            </div>
            <div class="d-flex  mt-2">
              <button
                :disabled="loadingStatus.loadingItem === item.id"
                @click="addToCart(item.id)"
                type="button"
                class="btn btn-primary"
              >
                <i
                  class="spinner-border spinner-border-sm"
                  v-if="loadingStatus.loadingItem === item.id"
                ></i>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="page" v-if="products.length <= 10 && pageShow">
        <Pagination :page="pagination" @get-page="getProducts"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import swalert from '@/methods/swal';
import emitter from '@/methods/eventBus';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      loadingStatus: { loadingItem: '' },
      isLoading: false,
      products: [],
      pagination: {},
      product_category: [],
      category: '',
      pageShow: true,
      productValue: '',
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      this.pageShow = true;
      this.productValue = '';
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          console.log(this.products);
          // 篩選種類
          this.products.filter((item) => {
            if (this.product_category.indexOf(item.category) === -1) {
              this.product_category.push(item.category);
            }
            return false;
          });
          this.isLoading = false;
        } else {
          console.log(res.data.message);
        }
      });
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    filterCategory(e) {
      this.isLoading = true;
      this.pageShow = false;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products.filter((product) => {
            if (product.category === e) {
              this.productValue = e;
              return product;
            }
            if (e === undefined) {
              this.productValue = 1;
              return this.products;
            }
            return false;
          });
          this.isLoading = false;
        } else {
          console.log(res.data.message);
        }
      });
    },
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const cart = { product_id: id, qty };
      this.$http
        .post(api, {
          data: cart,
        })
        .then((res) => {
          if (res.data.success) {
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
.page {
  display: flex;
  justify-content: center;
}

.nav_left ul {
  padding: 0;
  margin: 0;
}
.nav_left ul li {
  list-style: none;
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.product {
  padding: 10px;
  transition: all 0.3s ease;
  border-radius: 10px;

  &_img {
    max-width: 100%;
    height: auto;
    transition: all 0.3s;
    margin-bottom: 2px;
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
  }

  &_title {
    font-size: 20px;
    margin-bottom: 8px;
    font-weight: 600;
  }
  &_price {
  }

  &_price_1 {
    font-size: 1rem;
    margin-bottom: 8px;
  }
  &_price_2 {
    font-size: 1rem;
    margin-bottom: 8px;
    display: inline-block;
  }
  &_dec {
    color: #666;
    margin-bottom: 8px;
    max-height: 48px;
    height: 48px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
  }
  &_baking {
    color: #777;
    font-size: 14px;
  }
  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
}
del.product_price_2 {
  font-size: 12px;
  display: inline-block;
  margin-right: 14px;
}

@media only screen and (max-width: 768px) {
}
</style>
