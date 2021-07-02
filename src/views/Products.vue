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
        <div class="col-3 mb-4 text-start" v-for="item in products" :key="item.id">
          <div class="img_box">
            <div @click.prevent="getProduct(item.id)">
              <img :src="item.imageUrl" alt="" />
            </div>
          </div>
          <div class="mt-2 h5">{{ item.title }}</div>
          <div>
            <div class="h5" v-if="!item.price">{{ $filters.currency(item.origin_price) }} 元</div>
            <del class="h6" v-if="item.price"
              >原價 {{ $filters.currency(item.origin_price) }} 元</del
            >
            <div class="h5" v-if="item.price">特價 {{ $filters.currency(item.price) }} 元</div>
          </div>
          <div class="d-flex justify-content-center">
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
img {
  max-width: 100%;
  height: auto;
  transition: all 0.3s;
}
.page {
  display: flex;
  justify-content: center;
}
.col-3:hover img {
  opacity: 0.8;
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
@media only screen and (max-width: 768px) {
}
</style>
