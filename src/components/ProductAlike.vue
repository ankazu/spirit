<template>
  <div>
    <Swiper
      :slidesPerView="2"
      :spaceBetween="10"
      :navigation="true"
      :breakpoints="{
        '600': { slidesPerView: 3, spaceBetween: 20 },
        '992': { slidesPerView: 4, spaceBetween: 20 },
      }"
      class="alike ps-0"
    >
      <SwiperSlide class="alike_list" v-for="item in randomProducts" :key="item">
        <div @click="$emit('go-page', item.id)" class="alike_list_img">
          <img :src="item.imageUrl" alt="" />
        </div>
        <div class="alike_list_baking">
          {{ item.baking }}
        </div>
        <div @click="$emit('go-page', item.id)" class="alike_list_title">
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
            class="btn btn-primary"
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
import swalert from '@/methods/swal';
import emitter from '@/methods/eventBus';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';
import SwiperCore, { Navigation } from 'swiper/core';

SwiperCore.use([Navigation]);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default {
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
  methods: {
    getProduct(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(api).then((res) => {
        this.product = res.data.product;
        this.getProducts();
      });
    },
    getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api).then((res) => {
        this.products = res.data.products;
        this.getAlike();
      });
    },
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const cart = { product_id: id, qty };
      this.$http.post(api, { data: cart }).then((res) => {
        if (res.data.success) {
          emitter.emit('updata-cart');
          emitter.emit('render-cart');
          swalert('success', '已加入購物車');
          this.isLoading = false;
        } else {
          console.log(res.data.message);
        }
      });
    },
    getAlike() {
      let category;
      if (this.product === undefined) {
        category = '';
        const filterProducts = this.products.map((item) => item);
        const maxSize = filterProducts.length < 4 ? filterProducts.length : 4;
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

      category = this.product.category;
      const filterProducts = this.products.filter((item) => item.category === category);
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
    &_price {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
    }
    &_price_1 {
      font-size: 1rem;
      margin-bottom: 8px;
      margin-left: auto;
    }
    &_price_2 {
      font-size: 1rem;
      margin-bottom: 8px;
      display: inline-block;
    }
  }
}
del.alike_list_price_2 {
  font-size: 12px;
  display: inline-block;
}
@media only screen and (max-width: 992px) {
  .alike {
    &_list {
      &_price_2 {
        display: block;
        font-size: 14px;
      }
    }
  }
}
del.alike_list_price_2 {
  display: block;
}
</style>
