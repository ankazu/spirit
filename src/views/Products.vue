<template>
  <loading :active="isLoading"></loading>
  <div class="container">
    <div class="row">
      <div class="col-3 mb-4 text-start" v-for="item in products" :key="item.id">
        <div class="img_box">
          <div @click.prevent="getProduct(item.id)">
            <img :src="item.imageUrl" alt="" />
          </div>
        </div>
        <div class="mt-2 h5">{{ item.title }}</div>
        <div>
          <div class="h5" v-if="!item.price">{{ $filters.currency(item.origin_price) }} 元</div>
          <del class="h6" v-if="item.price">原價 {{ $filters.currency(item.origin_price) }} 元</del>
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
      <div class="page">
        <Pagination :page="pagination" @get-page="getProducts"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import swalert from '@/methods/swal';

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
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      // 一頁只能產出10個產品嗎?
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        } else {
          console.log(res.data.message);
        }
      });
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`);
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
.img_box {
  position: relative;
  padding-bottom: 70%;
  overflow: hidden;

  & > div {
    position: absolute;
    display: flex;
    justify-self: start;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
.col-3:hover img {
  opacity: 0.8;
}
</style>
