<template>
  <Loading :active="isLoading" />

  <div
    class="position-relative inn_banner"
    style="height: 250px; background-size: cover; background-position: center center;
    background-repeat: no-repeat; background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1626702787982.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=CrNQrW8cLRifH7Tcj0el7SaRzWl2AGL0xqWxFf9LkwIt4mKUh9lxR1am9qeksJ0KhJJO%2BnLyk5cN1tDVEJb8c2bl6KFQIAJjZEEZlgubyY%2FY0BewH0FRdYnH90q%2FKkovmhb9SdHF%2B73lymDFCMsimSKW57%2BqxPOPqCha0W8CYvYEWkE17%2BNdKJlNAwnk84jyBW098QOXftCAOY3YjRF8DsvEzlOcBHPgrKsqBzEQi1M6dX0GO68oBChWl8w5%2F7A6VQVipaL3m7l9mOBjlraa%2BIArzwkv6KUDSkgdey1VChhnFxMDe%2BKllroKgpqTGL8dseTvxiHe%2B%2BVo8UQCXedUbg%3D%3D)"
  >
    <div>
      <h2 class="position-absolute start-50 top-50 translate-middle fw-bold text-white">
        {{ pathData.purpose }}
      </h2>
    </div>
  </div>

  <div class="container">
    <Path :path-data="pathData" />
    <div class="row justify-content-center">
      <section class="section_empty" v-if="cart.carts?.length === 0">
        <div class="empty_cart mt-4">
          <img
            src="https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1625982813518.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=UdEdP1TSQtLXmXM0WJufbVe%2FTpN3qYJfO4zLwIC91XlsaRVKHAxw0KfYE1Z9Xi6cFdOD%2FCxU4YJvSg3PmXDo5J4GapYbhJY%2BkvZq6N3dJ85hY208ZgK5N%2Bs9W78YVDQNDWT2BeW%2BfyEFh%2BpudIh4vkppsq5MZBE5voyijg3D%2FyGhBgqglnECWX13IPdHjdjEIUu4emBOVVS1YQSU4pEvPtZSYKo9qRM%2FZLEeBwQRFZ31p50yqiAjU%2Fjz8T3TVXjEfCrTIgrjKqXbQVAyEsIeOy4fVm9WmZQPupPjRUm8D0sncBt%2FXsoQnOog5MawD0wXuerVAp2aTyvEcRAJdxMalg%3D%3D"
            alt="您的購物車是空的，趕快放入喜歡的商品吧！"
          />
          <div class="mt-4">
            您的購物車是空的，<br />
            趕快放入喜歡的商品吧！
          </div>
          <router-link class="btn btn-primary btn-lg mt-5" to="/products">繼續購物</router-link>
        </div>
      </section>
      <section v-else>
        <div class="process">
          <div class="process_step current" data-num="01">
            確認商品
          </div>
          <div class="process_step" data-num="02">
            填寫資料
          </div>
          <div class="process_step" data-num="03">
            訂購完成
          </div>
        </div>
        <div class="col-12 justify-content-center">
          <div class="mb-4 mt-4 del_btn">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm d-flex align-items-center ms-auto"
              @click="clearCart()"
            >
              <span class="material-icons">
                close
              </span>
              <span>
                清除購物車
              </span>
            </button>
          </div>
          <div class="cart_product_header bg-secondary">
            <span class="cart_product_header_name">產品內容</span>
            <span class="cart_product_header_qty">數量</span>
            <span class="cart_product_header_price">售價</span>
            <span class="cart_product_header_del">刪除</span>
          </div>
          <div class="cart_product" v-for="item in cart.carts" :key="item.id">
            <div class="cart_product_img" @click="getProduct(item.product.id)">
              <img :src="item.product.imageUrl" :alt="item.product.title" />
            </div>
            <div class="cart_product_dtl ps-4 pe-2">
              <div class="cart_product_title" @click="getProduct(item.product.id)">
                {{ item.product.title }}
              </div>
              <div class="cart_product_unit">單位 : {{ item.product.unit }}</div>
            </div>
            <div class="cart_product_quantity">
              <button
                type="button"
                class="cart_remove cart_btn"
                :class="{ 'not-allowed': item.qty === 1 }"
                :disabled="item.qty === 1"
                @click="addToCart(item, 'reduce')"
              >
                <span class="material-icons">
                  remove
                </span>
              </button>
              <input
                class="cart_product_input"
                type="text"
                disabled="disabled"
                v-model="item.qty"
              />
              <button type="button" class="cart_add cart_btn" @click="addToCart(item, 'add')">
                <span class="material-icons">
                  add
                </span>
              </button>
            </div>
            <div class="cart_product_pricebox">
              <div class="cart_product_price">
                <span class="price_dlr material-icons">attach_money </span>
                {{ $filters.currency(item.final_total) }}
              </div>
            </div>
            <div class="cart_product_del">
              <button
                type="button"
                class="btn btn-sm d-flex cart_close"
                @click="removeCartItem(item.id)"
                :disabled="loadingStatus.loadingItem === item.id"
              >
                <span class="del_btn material-icons">
                  close
                </span>
              </button>
            </div>
          </div>
        </div>

        <div class="cart_continue">
          <router-link class="btn btn-outline-primary btn-lg" to="/products">繼續購物</router-link>
          <router-link class="btn bg-secondary btn-lg" to="/checkout">下一步</router-link>
        </div>
      </section>
      <div class="alike">
        <h2 class="alike_title">你可能會喜歡</h2>
        <ProductAlike @go-page="getProduct" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  apiGetCart, apiUpdateCart, apiClearCart, apiDeleteCart,
} from '@/methods/api';
import emitter from '@/methods/eventBus';
import ProductAlike from '@/components/frontend/ProductAlike.vue';

export default {
  inject: ['swalert'],
  data() {
    return {
      loadingStatus: { loadingItem: '' },
      isLoading: false,
      cart: {},
      pathData: {
        previous: [{ title: '首頁', url: '/' }],
        purpose: '購物車',
      },
    };
  },
  components: {
    ProductAlike,
  },
  mounted() {
    this.getCart();
    emitter.on('render-cart', () => {
      this.getCart();
    });
  },
  unmounted() {
    emitter.off('render-cart', () => {
      this.getCart();
    });
  },
  methods: {
    getCart() {
      this.isLoading = true;
      apiGetCart()
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data;
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.swalert('error', `取得購物清單時發生錯誤。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.swalert('error', `取得購物車時發生錯誤，請重新整理此頁面。 ${err.message}`);
        });
    },
    addToCart(item, action) {
      this.isLoading = true;
      let num = item.qty;
      if (action === 'reduce') {
        num -= 1;
      }
      if (action === 'add') {
        num += 1;
      }
      this.loadingStatus.loadingItem = item.id;
      const cart = { product_id: item.id, qty: num };
      apiUpdateCart(item.id, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = '';
            this.isLoading = false;
            emitter.emit('updata-cart');
            this.getCart();
          } else {
            this.isLoading = false;
            this.swalert('error', `修改失敗。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.swalert('error', `修改時發生錯誤，請重新整理此頁面。 ${err.message}`);
        });
    },
    clearCart() {
      this.isLoading = true;
      apiClearCart()
        .then((res) => {
          if (res.data.success) {
            emitter.emit('updata-cart');
            this.isLoading = false;
            this.getCart();
            this.swalert('success', '已清空購物車');
          } else {
            this.isLoading = false;
            this.swalert('success', `清除失敗。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.swalert('error', `清除購物車時發生錯誤，請重新整理此頁面。 ${err.message}`);
        });
    },
    removeCartItem(id) {
      this.isLoading = true;
      this.loadingStatus.loadingItem = id;
      apiDeleteCart(id)
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = '';
            this.isLoading = false;
            emitter.emit('updata-cart');
            this.getCart();
            this.swalert('success', '已刪除商品');
          } else {
            this.isLoading = false;
            this.swalert('success', `刪除商品失敗。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.swalert('error', `刪除商品時發生錯誤，請重新整理此頁面。 ${err.message}`);
        });
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.del_btn {
  font-size: 26px;
  opacity: 0.4;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
}

.section_empty {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  text-align: center;
}

.empty_cart {
  font-size: 28px;
  width: 100%;
  & img {
    border-radius: 20px;
  }
}

.cart_product_header {
  width: 100%;
  display: flex;
  padding: 8px 15px;
  margin-bottom: 10px;
  @media only screen and (max-width: 992px) {
    display: none;
  }
  &_name {
    display: block;
    flex: 12 0 0;
    text-align: left;
  }
  &_qty {
    flex: 3 0 0;
    text-align: left;
  }
  &_price {
    flex: 2 0 0;
    text-align: center;
  }
  &_del {
    flex: 2 0 0;
    text-align: center;
  }
}

.cart_product {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #dbd0be;
  padding: 20px 15px;
  @media only screen and (max-width: 992px) {
    flex-wrap: wrap;
    position: relative;
  }
  &_img {
    width: 13%;
    cursor: pointer;
    @media only screen and (max-width: 992px) {
      width: 70px;
    }
  }
  &_title {
    font-weight: 600;
    cursor: pointer;
    word-break: break-all;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
  }
  &_unit {
    font-size: 14px;
    color: #999;
  }
  &_dtl {
    width: 42%;
    text-align: left;
    @media only screen and (max-width: 992px) {
      width: calc(100% - 70px);
    }
  }
  &_quantity {
    width: 20%;
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 992px) {
      width: 96px;
      min-width: unset;
      display: flex;
      align-items: flex-end;
      order: 2;
    }
  }
  &_pricebox {
    width: 18%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 992px) {
      width: calc(100% - 96px);
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
    }
    & del {
      font-size: 12px;
    }
    & div {
      color: #debc8c;
      display: flex;
      align-items: center;
    }
  }
  &_del {
    width: 7%;
    display: flex;
    align-items: center;
    @media only screen and (max-width: 992px) {
      width: 30px;
      position: absolute;
      right: 0;
      top: 0px;
    }
    & button {
      color: #aaa;
    }
  }
  @media only screen and (max-width: 992px) {
    &_input {
      width: 40px;
      height: 29px;
    }
    &_price {
      display: flex;
      align-items: center;
      margin: 0 0 0 96px;
      & del {
        margin-right: 10px;
      }
    }
    .cart_btn {
      width: 26px;
      height: 29px;
    }
  }
}

.price_dlr {
  font-size: 18px;
}

.cart_continue {
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
}

.alike {
  margin: 80px 0 40px;
  padding: 20px 0;
  &_title {
    font-size: 32px;
    text-align: center;
    font-weight: 600;
    margin-bottom: 40px;
  }
}
</style>
