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

  <div class="container mb-5">
    <Path :path-data="pathData" />
    <div class="process">
      <div class="process_step current" data-num="01">
        確認商品
      </div>
      <div class="process_step current" data-num="02">
        填寫資料
      </div>
      <div class="process_step" data-num="03">
        訂購完成
      </div>
    </div>
    <div class="row order justify-content-center">
      <div class="col-12 col-lg-7">
        <div class="order_inf">訂購人資訊</div>
        <Form ref="form" class="form" v-slot="{ errors }" @submit="createOrder" @change="checkFrom">
          <div class="mb-3">
            <label for="email" class="form-label">Email<span class="text-danger"> *</span></label>
            <Field
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'], 'is-valid': form.user.email }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="form.user.email"
            />
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">
              收件人姓名<span class="text-danger"> *</span>
            </label>
            <Field
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'], 'is-valid': form.user.name }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="form.user.name"
            />
            <ErrorMessage name="姓名" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">
              收件人電話<span class="text-danger"> *</span>
            </label>
            <Field
              id="tel"
              name="手機號碼"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['手機號碼'], 'is-valid': form.user.tel }"
              placeholder="請輸入手機號碼"
              :rules="checkTel"
              v-model="form.user.tel"
            />
            <ErrorMessage name="手機號碼" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">
              收件人地址<span class="text-danger"> *</span>
            </label>
            <Field
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'], 'is-valid': form.user.address }"
              placeholder="請輸入地址"
              rules="required"
              v-model="form.user.address"
            />
            <ErrorMessage name="地址" class="invalid-feedback" />
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
            <Error-message name="寄送方式" class="invalid-feedback mb-1" />
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
            <Error-message name="付款方式" class="invalid-feedback mb-1" />
          </div>
          <div class="mb-3 form_message">
            <label for="message" class="form-label">留言</label>
            <textarea
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
            <button
              type="submit"
              class="btn btn-secondary"
              :disabled="btnStatus"
              :class="{ 'not-allowed': btnStatus }"
            >
              送出訂單
            </button>
          </div>
        </Form>
      </div>
      <div class="col-12 col-lg-5">
        <div class="order_dtl">
          <div class="order_del_title">訂單明細</div>
          <div class="order_dtl_list" v-for="item in cart.carts" :key="item.id">
            <div class="order_dtl_list_img" @click="getProduct(item.product.id)">
              <img :src="item.product.imageUrl" :alt="item.product.title" />
            </div>
            <div class="order_dtl_list_title">
              <div class="order_dtl_list_title_txt" @click="getProduct(item.product.id)">
                {{ item.product.title }}
              </div>
              <div class="order_dtl_list_unit">
                <div v-if="!item.product.price">
                  <span class="price_dlr material-icons">attach_money </span>
                  {{ $filters.currency(item.product.origin_price) }}
                </div>
                <div v-else>
                  <span class="price_dlr material-icons">attach_money </span>
                  {{ $filters.currency(item.product.price) }}
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
              <button class="btn btn-secondary" type="button" @click="addCouponCode">
                使用優惠碼
              </button>
            </div>
          </div>
          <div class="shop_pirce_dtl">
            <div class="d-flex justify-content-end align-items-end">
              <span class="shop_pirce_title">商品金額</span>
              <span class="shop_pirce_total">
                <span class="material-icons"> attach_money </span>
                {{ $filters.currency(cart.total) }}
              </span>
            </div>
            <div
              class="d-flex justify-content-end align-items-end"
              v-if="cart.final_total !== cart.total"
            >
              <span class="shop_pirce_title">折扣</span>
              <span class="shop_pirce_total text-success">
                <span class="material-icons"> attach_money </span>
                {{ $filters.currency(cart.final_total - cart.total) }}
              </span>
            </div>
            <div
              class="d-flex justify-content-end align-items-end"
              v-if="cart.final_total !== cart.total"
            >
              <span class="shop_pirce_title">總計</span>
              <span class="shop_pirce_total total_price">
                <span class="material-icons"> attach_money </span>
                {{ $filters.currency(cart.final_total) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetCart, apiPostCoupon, apiCheckout } from '@/methods/api';
import emitter from '@/methods/eventBus';

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
      pathData: {
        previous: [{ title: '首頁', url: '/' }],
        purpose: '填寫資料',
      },
    };
  },
  mounted() {
    this.getCart();
  },
  inject: ['swalert'],
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
            this.swalert('error', `取得購物車資料時發生錯誤。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.swalert('error', `取得購物車時發生錯誤，請重新整理此頁面。 ${err.message}`);
        });
    },
    addCouponCode() {
      this.isLoading = true;
      const coupon = { code: this.coupon_code };
      apiPostCoupon({ data: coupon })
        .then((res) => {
          if (res.data.success) {
            this.getCart();
            emitter.emit('updata-cart');
            this.isLoading = false;
            this.swalert('success', '使用優惠券');
          } else {
            this.isLoading = false;
            this.swalert('error', `${res.data.message}`);
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.swalert('error', `發生錯誤，請重新整理此頁面。 ${err.message}`);
        });
    },
    checkTel(value) {
      const tel = /^(09)[0-9]{8}$/;
      return tel.test(value) ? true : '請填入正確的"手機"號碼';
    },
    createOrder() {
      this.isLoading = true;
      const order = this.form;
      apiCheckout({ data: order })
        .then((res) => {
          if (res.data.success) {
            this.$refs.form.resetForm();
            this.form.message = '';
            this.isLoading = false;
            this.swalert('success', '表單送出');
            this.$router.replace(`/checkoutpaid/${res.data.orderId}`);
          } else {
            this.isLoading = false;
            this.swalert('error', `表單送出失敗。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.swalert('error', `表單送出時發生錯誤，請重新整理此頁面。 ${err.message}`);
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
.order {
  @media only screen and (max-width: 992px) {
    flex-direction: column-reverse;
  }
  &_inf,
  &_del_title {
    font-size: 1.5rem;
    line-height: 2.5rem;
    text-align: left;
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
  }
  &_dtl {
    padding: 0 30px;
    @media only screen and (max-width: 992px) {
      padding: 0;
      margin-bottom: 30px;
      &_box {
        padding: 0;
      }
    }
    &_list {
      display: flex;
      margin-bottom: 15px;
      font-size: 1rem;
      &_img {
        max-width: 90px;
        cursor: pointer;
      }
      &_title {
        padding: 0 15px;
        text-align: left;
        width: calc(100% - 160px);
        &_txt {
          cursor: pointer;
          font-weight: 600;
          word-break: break-all;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          display: -webkit-box;
        }
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
}

.price_dlr {
  font-size: 1rem;
}
.shop_pirce {
  padding: 30px;
  @media only screen and (max-width: 992px) {
    padding: 0;
    margin-bottom: 30px;
  }
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
    @media only screen and (max-width: 992px) {
      .shop_total {
        padding: 0;
      }
    }
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
.process {
  &::after {
    position: absolute;
    width: 50%;
    z-index: 1;
    content: '';
    height: 3px;
    background-color: #debc8c;
  }
}
</style>
