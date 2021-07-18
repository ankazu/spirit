<template>
  <Loading :active="isLoading"></Loading>
  <div class="container mb-5 mt-5">
    <div class="row order_box justify-content-center">
      <div class="col-12 col-lg-6">
        <div class="order_inf">訂購人資訊</div>
        <Form ref="form" class="form" v-slot="{ errors }" @submit="createOrder" @change="checkFrom">
          <div class="mb-3">
            <label for="email" class="form-label">Email<span class="font_req"> *</span></label>
            <Field
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'], 'is-valid': form.user.email }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="form.user.email"
            ></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名<span class="font_req"> *</span></label>
            <Field
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'], 'is-valid': form.user.name }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="form.user.name"
            ></Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話<span class="font_req"> *</span></label>
            <Field
              id="tel"
              name="手機號碼"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['手機號碼'], 'is-valid': form.user.tel }"
              placeholder="請輸入手機號碼"
              :rules="checkTel"
              v-model="form.user.tel"
            ></Field>
            <ErrorMessage name="手機號碼" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label"
              >收件人地址<span class="font_req"> *</span></label
            >
            <Field
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'], 'is-valid': form.user.address }"
              placeholder="請輸入地址"
              rules="required"
              v-model="form.user.address"
            ></Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="orderDelivery" class="form-label">
              寄送方式<span class="text-danger fw-bold"> *</span>
            </label>
            <Field
              as="select"
              name="寄送方式"
              id="orderDelivery"
              class="form-control"
              :class="{ 'is-invalid': errors['寄送方式'], 'is-valid': form.user.delivery }"
              rules="required"
              v-model="form.user.delivery"
            >
              <option value="" selected disabled>選擇寄送方式</option>
              <option value="宅配">宅配</option>
              <option value="全家超取">全家</option>
              <option value="7-11 超取">7-11</option>
              <option value="萊爾富超取">萊爾富</option>
              <option value="OK 超取">OK 超取</option>
            </Field>
            <error-message name="寄送方式" class="invalid-feedback mb-1"></error-message>
          </div>

          <div class="mb-3">
            <label for="orderPayment" class="form-label">
              付款方式<span class="text-danger fw-bold"> *</span>
            </label>
            <Field
              as="select"
              name="付款方式"
              id="orderPayment"
              class="form-control"
              :class="{ 'is-invalid': errors['付款方式'], 'is-valid': form.user.payment }"
              rules="required"
              v-model="form.user.payment"
            >
              <option value="" selected disabled>選擇付款方式</option>
              <option value="信用卡">信用卡</option>
              <option value="貨到付款">貨到付款</option>
              <option value="ATM 匯款">ATM 匯款</option>
            </Field>
            <error-message name="付款方式" class="invalid-feedback mb-1"></error-message>
          </div>
          <div class="mb-3 form_message">
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
          <div class="text-start ms-0 w-50">
            <router-link class="btn btn-outline-primary" to="/cart">上一步</router-link>
          </div>
          <div class="text-end w-50">
            <button type="submit" class="btn btn-primary" :disabled="btnStatus">
              送出訂單
            </button>
          </div>
        </Form>
      </div>
      <div class="col-12 col-lg-4">
        <div class="order_dtl">
          <div class="order_del_title">訂單明細</div>
          <div class="order_dtl_list" v-for="item in cart.carts" :key="item.id">
            <div class="order_dtl_list_img" @click="getProduct(item.product_id)">
              <img :src="item.product.imageUrl" :alt="item.product.title" />
            </div>
            <div class="order_dtl_list_title">
              <div class="title_txt">
                {{ item.product.title }}
              </div>
              <div class="order_dtl_list_unit">
                <div v-if="!item.product.price">
                  <span class="price_dlr material-icons">attach_money </span>
                  {{ $filters.currency(item.product.origin_price) }}
                </div>
                <div v-else>
                  <span class="price_dlr material-icons">attach_money </span
                  >{{ $filters.currency(item.product.price) }}
                </div>
                / {{ item.product.unit }}
              </div>
            </div>
            <div class="order_dtl_list_qty">X {{ item.qty }}</div>
          </div>
        </div>
        <div class="shop_pirce">
          <div class="d-flex align-items-end justify-content-end">
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
          <div class="shop_pirce_dtl">
            <div class="d-flex justify-content-end align-items-end">
              <span class="shop_pirce_title">商品金額</span>
              <span class="shop_pirce_total"
                ><span class="material-icons"> attach_money </span
                >{{ $filters.currency(cart.total) }}</span
              >
            </div>
            <div
              class="d-flex justify-content-end align-items-end"
              v-if="cart.final_total !== cart.total"
            >
              <span class="shop_pirce_title">折扣代碼</span>
              <span class="shop_pirce_total text-success"
                ><span class="material-icons"> attach_money </span
                >{{ $filters.currency(cart.final_total - cart.total) }}</span
              >
            </div>
            <div
              class="d-flex justify-content-end align-items-end"
              v-if="cart.final_total !== cart.total"
            >
              <span class="shop_pirce_title">總計</span>
              <span class="shop_pirce_total total_price"
                ><span class="material-icons"> attach_money </span
                >{{ $filters.currency(cart.final_total) }}</span
              >
            </div>
          </div>
        </div>
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
      btnStatus: true,
      coupon_code: 'spirit168',
      cart: {},
      form: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: '',
          delivery: '',
          payment: '',
        },
        message: '',
      },
    };
  },
  created() {
    this.getCart();
  },
  inject: ['swalert'],
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data;
            this.isLoading = false;
          } else {
            this.swalert('error', '取得購物車資料時發生錯誤');
          }
        })
        .catch(() => {
          this.swalert('error', '取得購物車時發生錯誤，請重新整理此頁面');
        });
    },
    addCouponCode() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = { code: this.coupon_code };
      this.$http
        .post(api, { data: coupon })
        .then((res) => {
          if (res.data.success) {
            this.getCart();
            this.isLoading = false;
            this.swalert('success', '使用優惠券');
          } else {
            this.isLoading = false;
            this.swalert('error', '優惠券錯誤');
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.swalert('error', '發生錯誤，請重新整理此頁面');
        });
    },
    checkTel(value) {
      const tel = /^(09)[0-9]{8}$/;
      return tel.test(value) ? true : '請填入正確的"手機"號碼';
    },
    createOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http
        .post(url, { data: order })
        .then((res) => {
          if (res.data.success) {
            this.$refs.form.resetForm();
            this.form.message = '';
            this.isLoading = false;
            this.swalert('success', '表單送出');
            this.$router.push('/checkoutpaid');
          } else {
            this.isLoading = false;
            this.swalert('success', '表單送出失敗');
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.swalert('error', '表單送出時發生錯誤，請重新整理此頁面');
        });
    },
    checkFrom() {
      // 驗證表單是否填寫
      const {
        name, email, tel, address, delivery, payment,
      } = this.form.user;
      if (
        name === ''
        || email === ''
        || tel === ''
        || address === ''
        || delivery === ''
        || payment === ''
      ) {
        this.btnStatus = true;
      } else {
        this.btnStatus = false;
      }
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  & > div {
    width: 48%;
  }
  & > div:nth-of-type(even) {
    margin-left: 4%;
  }
  &_req {
    color: #dc3545;
  }
  & .form_message {
    width: 100%;
  }
}

.order_inf,
.order_del_title {
  font-size: 1.5rem;
  line-height: 2.5rem;
  text-align: left;
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
}
.order_dtl {
  padding: 0 30px;
  &_list {
    display: flex;
    margin-bottom: 15px;
    font-size: 1rem;
    cursor: pointer;
    &_img {
      max-width: 90px;
    }
    &_title {
      padding: 0 15px;
      text-align: left;
      width: calc(100% - 160px);
    }
    &_unit {
      display: flex;
      align-items: center;
      color: #999;
      & > div {
        display: flex;
        align-items: center;
        margin-right: 8px;
      }
    }
    &_qty {
      margin-left: auto;
      width: 30px;
    }
  }
}

.title_txt {
  font-weight: 600;
  word-break: break-all;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
}

.price_dlr {
  font-size: 1rem;
}
.shop_pirce {
  padding: 30px;
  &_dtl {
    margin-top: 30px;
  }
  &_title {
    display: inline-block;
    text-align: right;
    margin-right: 20px;
  }
  &_total {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 72px;
    text-align: right;
  }
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
  width: 180px;
  &:focus {
    outline: none;
  }
}

@media only screen and (max-width: 992px) {
  .order_dtl_box,
  .shop_total {
    padding: 0;
  }
  .order_box {
    flex-direction: column-reverse;
  }
}
</style>
