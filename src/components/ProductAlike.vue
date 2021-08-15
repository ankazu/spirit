<template>
  <Loading :active="isLoading" />
  <div>
    <Swiper
      :slidesPerView="2"
      :spaceBetween="10"
      :navigation="true"
      :breakpoints="{
        '600': { slidesPerView: 3, spaceBetween: 20 },
        '992': { slidesPerView: 4, spaceBetween: 20 },
      }"
      :autoplay="{ delay: 4000, disableOnInteraction: false }"
      class="alike ps-0"
    >
      <SwiperSlide class="alike_list" v-for="item in randomProducts" :key="item">
        <div @click="goProduct(item.id)" class="alike_list_img stretched-link">
          <img :src="item.imageUrl" :alt="item.title" />
        </div>
        <div class="alike_list_baking" v-if="item.baking">
          {{ item.baking }}
        </div>
        <div class="alike_list_baking_1" v-else></div>
        <div class="alike_list_title">
          {{ item.title }}
        </div>
        <div class="alike_list_desc">
          {{ item.decription }}
        </div>
        <div class="alike_list_price">
          <div class="alike_list_price_1" v-if="item.price === item.origin_price">
            {{ $filters.currency(item.origin_price) }} 元 / {{ item.unit }}
          </div>
          <del class="alike_list_price_2" v-if="item.price !== item.origin_price"
            >原價 {{ $filters.currency(item.origin_price) }} 元</del
          >
          <div class="alike_list_price_2" v-if="item.price !== item.origin_price">
            特價 {{ $filters.currency(item.price) }} 元 / {{ item.unit }}
          </div>
        </div>
        <div class="d-flex  mt-2">
          <button
            :disabled="loadingStatus.loadingItem === item.id"
            @click="addToCart(item.id)"
            type="button"
            class="btn btn-secondary w-100"
          >
            <i
              class="spinner-border spinner-border-sm"
              v-if="loadingStatus.loadingItem === item.id"
            ></i>
            加入購物車
          </button>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import emitter from '@/methods/eventBus';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';
import SwiperCore, { Autoplay, Navigation } from 'swiper/core';

SwiperCore.use([Navigation, Autoplay]);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default {
  inject: ['swalert'],
  data() {
    return {
      product: {},
      products: [],
      randomProducts: [],
      loadingStatus: { loadingItem: '' },
      isLoading: false,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  mounted() {
    const { id } = this.$route.params;
    this.getProduct(id);
  },
  emits: ['go-page'],
  methods: {
    getProduct(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(api)
        .then((res) => {
          this.product = res.data.product;
          this.getProducts();
        })
        .catch((err) => {
          this.swalert('error', `取得產品時發生錯誤，請重新整理此頁面。 ${err.message}`);
        });
    },
    getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.products;
          this.getAlike();
        })
        .catch((err) => {
          this.swalert('error', `取得全部產品時發生錯誤，請重新整理此頁面。 ${err.message}`);
        });
    },
    goProduct(id) {
      this.$router.push(`/product/${id}`);
      this.$emit('go-page', id);
    },
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const cart = { product_id: id, qty };
      this.$http
        .post(api, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            emitter.emit('updata-cart');
            emitter.emit('render-cart');
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
    getAlike() {
      let category;

      // 首頁、購物車頁
      if (this.product === undefined) {
        category = '';
        const filterProducts = this.products.map((item) => item);
        const maxSize = filterProducts.length < 6 ? filterProducts.length : 6;
        const arrSet = new Set([]);
        for (let index = 0; arrSet.size < maxSize; index + 1) {
          const num = getRandomInt(filterProducts.length);
          arrSet.add(num);
        }
        arrSet.forEach((i) => {
          this.randomProducts.push(filterProducts[i]);
        });
        return;
      }

      // 產品詳細頁
      category = this.product.category;
      // 過濾同名產品
      const { title } = this.product;
      const filterProducts = this.products.filter((item) => {
        if (item.title === title) {
          return false;
        }
        return item.category === category;
      });

      // 會出現與產品詳細頁相同名稱產品
      // const filterProducts = this.products.filter((item) => item.category === category);
      const maxSize = filterProducts.length < 4 ? filterProducts.length : 4;
      const arrSet = new Set([]);
      getRandomInt();
      for (let index = 0; arrSet.size < maxSize; index + 1) {
        const num = getRandomInt(filterProducts.length);
        arrSet.add(num);
      }
      arrSet.forEach((i) => {
        this.randomProducts.push(filterProducts[i]);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.alike {
  display: flex;
  &_list {
    list-style: none;
    padding: 10px;
    width: 22%;
    // margin: 0 1.5% !important;
    background-color: #f9f2e8;
    transition: all 0.3s;
    text-align: left;
    &:hover {
      background-color: #f5eadb;
      & img {
        transform: scale(1.1);
      }
    }
    &_img {
      overflow: hidden;
      cursor: pointer;
      & img {
        transition: all 0.3s;
      }
    }
    &_baking {
      color: #777;
      font-size: 14px;
      margin-top: 5px;
      &_1 {
        height: 21px;
        margin-top: 5px;
      }
    }
    &_title {
      font-size: 20px;
      margin-bottom: 8px;
      font-weight: 600;
      cursor: pointer;
    }
    &_desc {
      color: #666;
      margin-bottom: 8px;
      max-height: 48px;
      height: 48px;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      display: -webkit-box;
    }
    &_price_1 {
      font-size: 1rem;
      margin-bottom: 8px;
      margin-top: 26px;
    }
    &_price_2 {
      font-size: 1rem;
      margin-bottom: 8px;
      display: block;
      @media only screen and (max-width: 992px) {
        display: block;
        font-size: 14px;
        line-height: 1.65;
      }
    }
  }
  & .btn {
    z-index: 2;
  }
}

del.alike_list_price_2 {
  font-size: 12px;
  display: block;
  margin-bottom: 0;
}
</style>
