<template>
  <div
    class="position-relative inn_banner"
    style="height: 250px; background-size: cover; background-position: center center;
    background-repeat: no-repeat; background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1626702787982.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=CrNQrW8cLRifH7Tcj0el7SaRzWl2AGL0xqWxFf9LkwIt4mKUh9lxR1am9qeksJ0KhJJO%2BnLyk5cN1tDVEJb8c2bl6KFQIAJjZEEZlgubyY%2FY0BewH0FRdYnH90q%2FKkovmhb9SdHF%2B73lymDFCMsimSKW57%2BqxPOPqCha0W8CYvYEWkE17%2BNdKJlNAwnk84jyBW098QOXftCAOY3YjRF8DsvEzlOcBHPgrKsqBzEQi1M6dX0GO68oBChWl8w5%2F7A6VQVipaL3m7l9mOBjlraa%2BIArzwkv6KUDSkgdey1VChhnFxMDe%2BKllroKgpqTGL8dseTvxiHe%2B%2BVo8UQCXedUbg%3D%3D)"
  >
    <div>
      <h1 class="position-absolute start-50 top-50 translate-middle fw-bold text-white">
        {{ pathData.purpose }}
      </h1>
    </div>
  </div>
  <div class="container">
    <Path :path-data="pathData"></Path>
    <div class="process">
      <div class="process_step current" data-num="01">
        確認商品
      </div>
      <div class="process_step current" data-num="02">
        填寫資料
      </div>
      <div class="process_step current" data-num="03">
        訂購完成
      </div>
    </div>
    <div class="mt-4 text-center">
      <span class="material-icons shop_cart_icon">
        local_shipping
      </span>
    </div>
    <div class="text-center">
      <h2 class="my-4">感謝您的訂購！</h2>
      <p>您訂購的商品將在近期安排出貨，請留意簡訊通知或配送人員的電話。</p>

      <div class="mt-4">
        <h4>訂購人資訊</h4>
      </div>
      <table class="checkout_table">
        <tbody>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>購買產品</th>
            <td>
              <ul class="list-unstyled ps-0 mb-0">
                <li v-for="item in order.products" :key="item.id">
                  {{ item.product.title }} * {{ item.qty }}
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>付款金額</th>
            <td>{{ $filters.currency(order.total) }} 元</td>
          </tr>
          <tr>
            <th>取貨方式</th>
            <td>{{ order.user.delivery }}</td>
          </tr>
          <tr>
            <th>付款方式</th>
            <td>{{ order.user.payment }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid" class="text-danger">未付款</span>
              <span v-else class="text-success">已付款</span>
            </td>
          </tr>
          <tr v-if="order.user.payment !== '貨到付款'">
            <th></th>
            <td>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="goToPay(order.id)"
                :disabled="order.is_paid"
                :class="{ 'not-allowed': order.is_paid }"
              >
                點擊付款
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link to="/products" class="btn btn-primary mt-4 mb-5">繼續購物</router-link>
    </div>
  </div>
</template>
<script>
import emitter from '@/methods/eventBus';
import Path from '@/components/Path.vue';

export default {
  data() {
    return {
      isLoading: false,
      pathData: { previous: [{ title: '首頁', url: '/' }], purpose: '訂購完成' },
      order: {
        user: {
          name: '',
          address: '',
          emali: '',
          tel: '',
        },
      },
    };
  },
  inject: ['swalert'],
  components: {
    Path,
  },
  mounted() {
    emitter.emit('updata-cart');
    const { id } = this.$route.params;
    this.getOrder(id);
  },
  methods: {
    getOrder(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}?`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order;
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.swalert('error', `取得訂單發生錯誤。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.swalert('error', `取得訂單時發生錯誤，請重新整理此頁面。 ${err.message}`);
        });
    },
    goToPay(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${id}?`;
      this.$http
        .post(api, id)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            this.swalert('success', '付款成功');
            this.getOrder(id);
          } else {
            this.swalert('error', `付款失敗。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.swalert('error', `發生錯誤請重新整理。 ${err.message}`);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.shop_cart_icon {
  font-size: 180px;
  color: #debc8c;
}
h2 {
  font-size: 32px;
}
.process {
  &::after {
    position: absolute;
    width: 100%;
    z-index: 1;
    content: '';
    height: 3px;
    background-color: #debc8c;
  }
}
.checkout {
  &_table {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    & th {
      border-bottom: 1px solid #ccc;
      width: 120px;
      padding: 13px 10px;
    }
    & td {
      border-bottom: 1px solid #ccc;
      padding: 13px 10px;
    }
  }
}
</style>
