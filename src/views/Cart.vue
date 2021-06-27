<template>
  <loading :active="isLoading"></loading>
  <div class="container">
    <div class="row justify-content-center">
      <section v-if="cart.carts?.length === 0">
        購物車空的喔
      </section>
      <section v-else class="col-12">
        <div class="mb-4 mt-4">
          <button
            type="button"
            class="btn btn-outline-danger btn-sm d-flex align-items-center ms-auto"
          >
            <span class="material-icons">
              close
            </span>
            <span>
              清除購物車
            </span>
          </button>
        </div>
        <div class="cart_product_header">
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
            <div class="text-success" v-if="item.coupon">已使用優惠券</div>
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
              <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
              <span class="price_dlr">$ </span> {{ $filters.currency(item.final_total) }}
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
        <div class="shop_total row">
          <div class="col-lg-6 d-flex align-items-start">
            <input
              type="text"
              class="coupon_code"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"
            />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                使用優惠碼
              </button>
            </div>
          </div>
          <div class="col-lg-6 shop_total_dtl">
            <div class="d-flex justify-content-end align-items-end">
              <span class="shop_dtl_total_title">商品金額</span>
              <span class="shop_dtl_total"><span>$ </span>{{ $filters.currency(cart.total) }}</span>
            </div>
            <div
              class="d-flex justify-content-end align-items-end"
              v-if="cart.final_total !== cart.total"
            >
              <span class="shop_dtl_total_title">折扣代碼</span>
              <span class="shop_dtl_total text-success"
                ><span>$ </span>{{ $filters.currency(cart.final_total - cart.total) }}</span
              >
            </div>
            <div
              class="d-flex justify-content-end align-items-end"
              v-if="cart.final_total !== cart.total"
            >
              <span class="shop_dtl_total_title">總計</span>
              <span class="shop_dtl_total total_price"
                ><span>$ </span>{{ $filters.currency(cart.final_total) }}</span
              >
            </div>
          </div>
        </div>
        <div class="cart_continue">
          <button type="button" class="btn btn-secondary btn-lg">繼續購物</button>
          <router-link class="btn btn-primary btn-lg" to="/checkout">下一步</router-link>
        </div>
      </section>
      <div class="col-12 col-sm-6">
        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 110px">數量</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem(item.id)"
                    :disabled="loadingStatus.loadingItem === item.id"
                  >
                    <i
                      class="fas fa-spinner fa-pulse"
                      v-if="loadingStatus.loadingItem === item.id"
                    ></i>
                    移除購物車
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    {{ item.qty }} / {{ item.product.unit }}
                  </div>
                </td>
                <td class="text-end">
                  <small v-if="cart.final_total !== cart.total" class="text-success"
                    >折扣價：</small
                  >
                  {{ item.final_total }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingStatus: { loadingItem: '' },
      isLoading: false,
      cart: {},
      coupon_code: '',
      form: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  inject: ['pushMessage'],
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
    addCouponCode() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = { code: this.coupon_code };
      this.isLoading = true;
      this.$http.post(api, { data: coupon }).then((res) => {
        this.pushMessage(res, '加入優惠券');
        this.getCart();
        this.isLoading = false;
      });
    },
    removeCartItem(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.loadingStatus.loadingItem = id;
      this.$http.delete(url).then((res) => {
        if (res.data.success) {
          this.loadingStatus.loadingItem = '';
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
.cart_product_header {
  width: 100%;
  display: flex;
  padding: 8px 15px;
  margin-bottom: 10px;
  background: #f3f8fb;
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

.cart_product_input {
  width: 40px;
  text-align: center;
  background: #fff;
  border: 1px solid #ddd;
  height: 36px;
  border-right: 0;
  border-left: 0;
  padding: 0;
  display: inline-block;
  vertical-align: bottom;
}
.cart_remove {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.cart_add {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.cart_btn {
  border: 1px solid #ddd;
  background: #fff;
  display: inline-flex;
  width: 40px;
  height: 36px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  display: inline-block;
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
