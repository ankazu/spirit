<template>
  <loading :active="isLoading"></loading>
  <div class="container">
    <div class="row order_box">
      <div class="col-12 col-lg-7">
        <div class="order_inf">訂購人資訊</div>
        <Form ref="form" class="form" v-slot="{ errors }" @submit="createOrder" @change="checkFrom">
          <div class="mb-3">
            <label for="email" class="form-label">Email<span class="font_req"> *</span></label>
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
            <label for="name" class="form-label">收件人姓名<span class="font_req"> *</span></label>
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
            <label for="tel" class="form-label">收件人電話<span class="font_req"> *</span></label>
            <Field
              id="tel"
              name="電話"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              rules="required"
              v-model="form.user.tel"
            ></Field>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
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
              :class="{ 'is-invalid': errors['地址'] }"
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
              :class="{ 'is-invalid': errors['寄送方式'] }"
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
              :class="{ 'is-invalid': errors['付款方式'] }"
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
            <router-link class="btn btn-secondary" to="/cart">上一步</router-link>
          </div>
          <div class="text-end w-50">
            <button type="submit" class="btn btn-primary" :disabled="btnStatus">
              送出訂單
            </button>
          </div>
        </Form>
      </div>
      <div class="col-12 col-lg-5">
        <div class="order_dtl_box">
          <div class="order_del_title">訂單明細</div>
          <div class="order_dtl_list" v-for="item in cart.carts" :key="item.id">
            <div class="order_dtl_list_img"><img :src="item.product.imageUrl" alt="" /></div>
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
        <div class="shop_total">
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
          <div class="shop_total_dtl">
            <div class="d-flex justify-content-end align-items-end">
              <span class="shop_dtl_total_title">商品金額</span>
              <span class="shop_dtl_total"
                ><span class="material-icons"> attach_money </span
                >{{ $filters.currency(cart.total) }}</span
              >
            </div>
            <div
              class="d-flex justify-content-end align-items-end"
              v-if="cart.final_total !== cart.total"
            >
              <span class="shop_dtl_total_title">折扣代碼</span>
              <span class="shop_dtl_total text-success"
                ><span class="material-icons"> attach_money </span
                >{{ $filters.currency(cart.final_total - cart.total) }}</span
              >
            </div>
            <div
              class="d-flex justify-content-end align-items-end"
              v-if="cart.final_total !== cart.total"
            >
              <span class="shop_dtl_total_title">總計</span>
              <span class="shop_dtl_total total_price"
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
import swalert from '@/methods/swal';

export default {
  data() {
    return {
      loadingStatus: { loadingItem: '' },
      isLoading: false,
      btnStatus: true,
      coupon_code: '',
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
  inject: ['pushMessage'],
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.cart = res.data.data;
          this.isLoading = false;
          console.log(this.cart);
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

    createOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http.post(url, { data: order }).then((res) => {
        if (res.data.success) {
          this.$refs.form.resetForm();
          this.form.message = '';
          swalert('success', '表單送出');
          this.$router.push('/checkoutpaid');
        } else {
          swalert('success', '表單送出失敗');
        }
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
  },
};
</script>

<style lang="scss" scoped>
.form {
  text-align: left;
  display: flex;
  flex-wrap: wrap;
}
.form > div {
  width: 48%;
}
.form > div:nth-of-type(even) {
  margin-left: 4%;
}
.form .form_message {
  width: 100%;
}
.font_req {
  color: #dc3545;
}
.order_inf,
.order_del_title {
  font-size: 1.5rem;
  line-height: 2.5rem;
  text-align: left;
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
}
.order_dtl_box {
  padding: 0 30px;
}
.order_dtl_list {
  display: flex;
  margin-bottom: 15px;
  font-size: 1rem;
}
.order_dtl_list_img {
  max-width: 120px;
}
.order_dtl_list_title {
  padding: 0 15px;
  text-align: left;
  width: calc(100% - 160px);
}
.title_txt {
  font-weight: 600;
  word-break: break-all;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
}
.order_dtl_list_unit {
  display: flex;
  align-items: center;
  color: #999;
}
.order_dtl_list_unit > div {
  display: flex;
  align-items: center;
  margin-right: 8px;
}
.price_dlr {
  font-size: 1rem;
}
.order_dtl_list_qty {
  margin-left: auto;
  width: 30px;
}
.shop_total_dtl {
  margin-top: 30px;
}
.shop_total {
  padding: 30px;
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
  width: 180px;
}
.coupon_code:focus {
  outline: none;
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
