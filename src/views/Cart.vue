<template>
  <loading :active="isLoading"></loading>
  <div class="container">
    <div class="row justify-content-center">
      <section class="col-12 col-sm-10">
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
        <div class="cart_product_list" v-for="item in cart.carts" :key="item.id">
          <div class="cart_product_img">
            <img :src="item.product.imageUrl" alt="" />
          </div>
          <div class="cart_product_dtl ps-4 pe-2">
            <div class="cart_product_title">
              {{ item.product.title }}
            </div>
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
              <div v-if="!item.product.price">{{ item.product.origin_price }}</div>
              <del v-if="item.product.price">
                <span class="price_dlr">$ </span>{{ item.product.origin_price }}</del
              >
              <div v-if="item.product.price">
                <span class="price_dlr">$ </span>{{ item.product.price }}
              </div>
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
        <div class="shop_total">
          <div class="d-flex justify-content-end">
            商品金額 <span>${{ cart.total }}</span>
          </div>
        </div>
        <div class="cart_continue">
          <button type="button" class="btn btn-secondary btn-lg">繼續購物</button>
          <button type="button" class="btn btn-primary btn-lg">下一步</button>
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
      <div class="col-12 col-sm-6 row justify-content-center">
        <Form ref="form" class="" v-slot="{ errors }" @submit="createOrder">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="form.user.email"
            ></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <Field
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="form.user.name"
            ></Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <Field
              id="tel"
              name="電話"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              rules="required"
              v-model="form.user.tel"
            ></Field>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <Field
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="form.user.address"
            ></Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea
              name=""
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-danger">送出訂單</button>
          </div>
        </Form>
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
          console.log(this.cart);
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
      console.log(action);
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
    createOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http.post(url, { data: order }).then((res) => {
        if (res.data.success) {
          this.$refs.form.resetForm();
          this.form.message = '';
          this.pushMessage(res, '表單送出');
          this.getCart();
        } else {
          this.pushMessage(res, '表單送出');
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
.cart_product_list {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #ddd;
}
.cart_product_list {
  padding: 30px 0;
}
.cart_product_img {
  width: 13%;
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
  color: rgb(221, 2, 2);
}
.cart_prodcut_del button {
  color: #aaa;
}
// shop_total
.shop_total {
  padding: 30px 0;
}
.shop_total div span {
  font-size: 24px;
  display: block;
  margin-left: 10px;
}
.cart_continue {
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
}
@media only screen and (max-width: 992px) {
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
</style>
