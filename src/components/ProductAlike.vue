<template>
  <div>
    <ul class="alike ps-0">
      <li class="alike_list" v-for="item in randomProducts" :key="item">
        <div class="alike_img">
          <img :src="item.imageUrl" alt="" />
        </div>
        <div class="alike_baking">
          {{ item.baking }}
        </div>
        <div class="alike_title">
          {{ item.title }}
        </div>
        <div class="alike_description">
          {{ item.decription }}
        </div>
        <div class="alike_price">
          <div class="alike_price_1" v-if="item.price === item.origin_price">
            {{ $filters.currency(item.origin_price) }} 元 / {{ item.unit }}
          </div>
          <del class="alike_price_2" v-if="item.price !== item.origin_price"
            >原價 {{ $filters.currency(item.origin_price) }} 元</del
          >
          <div class="alike_price_2" v-if="item.price !== item.origin_price">
            特價 {{ $filters.currency(item.price) }} 元 / {{ item.unit }}
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
      </li>
    </ul>
  </div>
</template>

<script>
import swalert from '@/methods/swal';
import emitter from '@/methods/eventBus';

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
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    width: 22%;
    margin: 0 1.5%;
  }
}
</style>
