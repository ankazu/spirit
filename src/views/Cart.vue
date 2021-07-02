<template>
  <loading :active="isLoading"></loading>
  <div class="container">
    <div class="row justify-content-center">
      <section class="section_empty" v-if="cart.carts?.length === 0">
        <div class="empty_cart mt-4">
          <img src="../assets/images/empty_cart.jpg" alt="" />
          <div class="mt-4">
            您的購物車是空的，<br />
            趕快放入喜歡的商品吧！
          </div>
          <router-link class="btn btn-primary btn-lg mt-5" to="/products">繼續購物</router-link>
        </div>
      </section>
      <section v-else class="col-12">
        <div class="mb-4 mt-4">
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
        <div class="cart_product_header bg-primary">
          <span class="cart_product_header_name">產品內容</span>
          <span class="cart_product_header_qty">數量</span>
          <span class="cart_product_header_price">售價</span>
          <span class="cart_product_header_del">刪除</span>
        </div>
        <div class="cart_product_list" v-for="item in cart.carts" :key="item.id">
          <div class="cart_product_img">
            <img :src="item.product.imageUrl" alt="" />
          </div>
          <div class="cart_product_dtl ps-4 pe-2">
            <div class="cart_product_title">
              {{ item.product.title }}
            </div>
            <div class="cart_product_unit">單位 : {{ item.product.unit }}</div>
          </div>
          <div class="cart_product_quantity">
            <button
              type="button"
              class="cart_remove cart_btn"
              :disabled="item.qty === 1"
              @click.prevent="addToCart(item, 'reduce')"
            >
              <span class="material-icons">
                remove
              </span>
            </button>
            <input class="cart_product_input" type="text" disabled="disabled" v-model="item.qty" />
            <button type="button" class="cart_add cart_btn" @click.prevent="addToCart(item, 'add')">
              <span class="material-icons">
                add
              </span>
            </button>
          </div>
          <div class="cart_product_price_box">
            <div class="cart_product_price">
              <!-- <div v-if="!item.product.price">
                {{ $filters.currency(item.product.origin_price) }}
              </div>
              <del v-if="item.product.price">
                <span class="price_dlr">$ </span
                >{{ $filters.currency(item.product.origin_price) }}</del
              >
              <div v-if="item.product.price">
                <span class="price_dlr">$ </span>{{ $filters.currency(item.product.price) }}
              </div> -->
              <span class="price_dlr material-icons">attach_money </span>
              {{ $filters.currency(item.final_total) }}
            </div>
          </div>
          <div class="cart_prodcut_del">
            <button
              type="button"
              class="btn btn-sm d-flex cart_close"
              @click="removeCartItem(item.id)"
              :disabled="loadingStatus.loadingItem === item.id"
            >
              <span class="material-icons">
                close
              </span>
            </button>
          </div>
        </div>

        <div class="cart_continue">
          <router-link class="btn btn-secondary btn-lg" to="/products">繼續購物</router-link>
          <router-link class="btn btn-primary btn-lg" to="/checkout">下一步</router-link>
        </div>
      </section>
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
      cart: {},
    };
  },
  created() {
    this.getCart();
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.cart = res.data.data;
          this.isLoading = false;
        } else {
          console.log(res.data.message);
        }
      });
    },
    addToCart(item, action) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      let num = item.qty;
      if (action === 'reduce') {
        num -= 1;
      }
      if (action === 'add') {
        num += 1;
      }
      this.loadingStatus.loadingItem = item.id;
      const cart = { product_id: item.id, qty: num };
      this.$http
        .put(api, {
          data: cart,
        })
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = '';
            this.getCart();
            this.isLoading = false;
          } else {
            console.log(res.data.message);
          }
        });
    },
    clearCart() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          emitter.emit('updata-cart');
          this.isLoading = false;
          swalert('success', '已清空購物車');
          this.getCart();
        }
      });
    },
    removeCartItem(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.loadingStatus.loadingItem = id;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          this.loadingStatus.loadingItem = '';
          emitter.emit('updata-cart');
          swalert('success', '已刪除商品');
          this.getCart();
        } else {
          console.log(res.data.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.material-icons {
  font-size: 19px;
}
.section_empty {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}
.empty_cart {
  font-size: 28px;
  width: 100%;
}
.empty_cart img {
  border-radius: 20px;
}
.cart_product_header {
  width: 100%;
  display: flex;
  padding: 8px 15px;
  margin-bottom: 10px;
}
.cart_product_header_name {
  display: block;
  flex: 12 0 0;
  text-align: left;
}
.cart_product_header_qty {
  flex: 3 0 0;
  text-align: left;
}
.cart_product_header_price {
  flex: 2 0 0;
}
.cart_product_header_del {
  flex: 2 0 0;
}
.cart_product_list {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #ddd;
}
.cart_product_list {
  padding: 30px 15px;
}
.cart_product_img {
  width: 13%;
}
.cart_product_title {
  font-weight: 600;
  word-break: break-all;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
}
.cart_product_unit {
  font-size: 14px;
  color: #999;
}
.cart_product_dtl {
  width: 42%;
  text-align: left;
}
.cart_product_quantity {
  width: 20%;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cart_product_price_box {
  width: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cart_prodcut_del {
  width: 7%;
  display: flex;
  align-items: center;
}
.price_dlr {
  font-size: 12px;
}
.cart_product_price_box del {
  font-size: 12px;
}
.cart_product_price_box div {
  color: #debc8c;
}
.cart_prodcut_del button {
  color: #aaa;
}
// shop_total
.shop_total {
  padding: 30px 0;
}
.shop_dtl_total_title {
  display: inline-block;
  text-align: right;
  margin-right: 20px;
}
.shop_dtl_total {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 54px;
  text-align: right;
}

.total_price {
  color: #debc8c;
}
.cart_continue {
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
}
.coupon_code {
  border: 0;
  border-bottom: 1px solid #ddd;
  margin-right: 10px;
  padding: 6px;
}
.coupon_code:focus {
  outline: none;
}
@media only screen and (max-width: 992px) {
  .cart_product_header {
    display: none;
  }
  .cart_product_list {
    flex-wrap: wrap;
    position: relative;
  }
  .cart_product_input {
    width: 40px;
    height: 29px;
  }
  .cart_btn {
    width: 26px;
    height: 29px;
  }

  .cart_product_img {
    width: 70px;
  }
  .cart_product_dtl {
    width: calc(100% - 70px);
  }
  .cart_product_quantity {
    width: 96px;
    min-width: unset;
    display: flex;
    align-items: flex-end;
    order: 2;
  }
  .cart_product_price_box {
    width: calc(100% - 96px);
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
  }
  .cart_product_price {
    display: flex;
    align-items: center;
    margin: 0 0 0 96px;
  }
  .cart_product_price del {
    margin-right: 10px;
  }

  .cart_prodcut_del {
    width: 30px;
    position: absolute;
    right: 0;
    top: 0px;
  }
}
@media only screen and (max-width: 600px) {
  .shop_total_dtl {
    margin-top: 30px;
  }
  .coupon_code_box {
    align-items: flex-end;
  }
  .coupon_code {
    width: 180px;
  }
}
</style>
